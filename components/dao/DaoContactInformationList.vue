<!-- Kalipo B.V. - the DAO platform for business & societal impact
 * Copyright (C) 2022 Peter Nobels and Matthias van Dijk
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

<template>
  <v-row>
    <div>
      <v-card-text>
        {{ services.length }} available services
        <v-row v-for="(item, i) in contactInformationList" :key="i" class="my-0" dense>

          <v-col class="d-flex" cols="12" sm="5">
            <!-- <v-select :items="services" label="Social" solo v-model="social.social" hide-details></v-select> -->

            <v-combobox v-model="item.service" :items="services" :filter="customFilter" hide-selected :label="label"
              :rules="rules" :search-input.sync="item.search" persistent-hint item-text="service" solo hide-details>
              <template v-slot:item="data">
                <template>
                  <v-list-item-icon>
                    <v-icon v-if="cat_map[data.item.category]" v-text="cat_map[data.item.category]"></v-icon>
                    <v-icon v-if="!cat_map[data.item.category]">mdi-share-variant</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.service"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.category"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      No results matching.
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-combobox>
          </v-col>

          <v-col class="d-flex align-center" cols="12" sm="7">
            <v-text-field label="Link" placeholder="https://" solo v-model="item.link" hide-details></v-text-field>
            <v-btn fab small class="ml-2" color="error" outlined @click="deleteSocial(i)"><v-icon
                dark>mdi-delete</v-icon></v-btn>
          </v-col>
        </v-row>

      </v-card-text>
    </div>
  </v-row>
</template>

<script>
export default {
  props: {
    country: {
      type: String,
    },
    label: {
      type: String,
      default: "Select service"
    },
    rules: {
      type: Array,
    }
  },
  methods: {
    update() {
      this.transaction.assets.contactInformationList = [];
      for (let index = 0; index < this.contactInformationList.length; index++) {
        const social = this.contactInformationList[index];
        if (social.service.length > 0 && social.link.length > 0) {
          this.transaction.assets.contactInformationList.push(social);
        }
      }
    },
    deleteSocial(index) {
      if (index == 0) {
        this.contactInformationList[index] = { service: "", link: "" };
      } else {
        this.contactInformationList.splice(index, 1);
      }
      this.forceRerender();
    },
    forceRerender() {
      // Remove my-component from the DOM
      this.renderComponent = false;

      // If you like promises better you can
      // also use nextTick this way
      this.$nextTick().then(() => {
        // Add the component back in
        this.renderComponent = true;
      });
    },
    customFilter(item, queryText, itemText) {
      const textOne = item.service.toLowerCase()
      const textTwo = item.category.toLowerCase()
      const searchText = queryText.toLowerCase()

      return textOne.indexOf(searchText) > -1 ||
        textTwo.indexOf(searchText) > -1
    },
  },
  computed: {
    countryValue: {
      get: function () {
        return this.country;
      },
      set: function (newValue) {
        this.$emit("update:country", newValue);
      },
    },
  },
  watch: {
    model(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop());
      }
    },
    search(val) {

    },
    contactInformationList: {
      handler(val) {
        const latestEntry = val[val.length - 1];
        console.log(this.contactInformationList)

        if (
          typeof latestEntry.service === 'object' &&
          latestEntry.service.service.length > 0 &&
          latestEntry.link.length > 0 &&
          val.length < 5
        ) {
          this.contactInformationList.push({ service: "", link: "" });
        }

        if (latestEntry.search != undefined && latestEntry.search.length > 0 && latestEntry.search != null && latestEntry.search.length > 1) {
          for (let index = 0; index < this.services.length; index++) {
            const element = this.services[index];
            if (latestEntry.search.toLowerCase() == element.service.toLowerCase() || element.category.toLowerCase().includes(latestEntry.search.toLowerCase())) {
              this.countryValue = element;
            }
          }
        }
      },
      deep: true,
    },
  },
  data: () => ({
    uri: "/dashboard",
    transaction: {
      moduleId: 1001,
      assetId: 4,
      assets: {
        contactInformationList: null,
      },
    },
    chipText: "",
    contactInformationList: [{ service: "", link: "" }],
    dialog: false,
    renderComponent: true,
    search: "",
    services: [
      {
        "service": "email",
        "category": "communication",
        "regex": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
      },
      {
        "service": "website",
        "category": "general",
        "regex": "^(https?|ftp):\\/\\/[^\\s/$.?#].[^\\s]*$"
      },
      {
        "service": "facebook",
        "category": "social_media",
        "regex": "^https?:\\/\\/www\\.facebook\\.com\\/[^/]+\\/?$"
      },
      {
        "service": "twitter",
        "category": "social_media",
        "regex": "^https?:\\/\\/twitter\\.com\\/(?!\\#)([a-zA-Z0-9_]{1,15})$"
      },
      {
        "service": "youtube",
        "category": "video_sharing",
        "regex": "^https?:\\/\\/(www\\.)?youtube\\.com\\/channel\\/UC[a-zA-Z0-9-_]{22}$"
      },
      {
        "service": "vimeo",
        "category": "video_sharing",
        "regex": "^https?:\\/\\/vimeo\\.com\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "twitch",
        "category": "live_streaming",
        "regex": "^https?:\\/\\/www\\.twitch\\.tv\\/([a-zA-Z0-9_]{4,25})$"
      },
      {
        "service": "linkedin",
        "category": "professional_network",
        "regex": "^https?:\\/\\/([a-z]{2,3}\\.)?linkedin\\.com\\/(company|in)\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "instagram",
        "category": "social_media",
        "regex": "^https?:\\/\\/www\\.instagram\\.com\\/([a-zA-Z0-9_]{1,30})\\/?$"
      },
      {
        "service": "pinterest",
        "category": "social_media",
        "regex": "^https?:\\/\\/www\\.pinterest\\.com\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "snapchat",
        "category": "social_media",
        "regex": "^https?:\\/\\/www\\.snapchat\\.com\\/add\\/([a-zA-Z0-9-_]{3,15})$"
      },
      {
        "service": "tiktok",
        "category": "social_media",
        "regex": "^https?:\\/\\/www\\.tiktok\\.com\\/@([a-zA-Z0-9-_]{2,24})\\/?$"
      },
      {
        "service": "reddit",
        "category": "social_news",
        "regex": "^https?:\\/\\/www\\.reddit\\.com\\/user\\/([a-zA-Z0-9-_]{3,20})$"
      },
      {
        "service": "whatsapp",
        "category": "messaging",
        "regex": "^https?:\\/\\/wa\\.me\\/([0-9]{6,14})$"
      },
      {
        "service": "telegram",
        "category": "messaging",
        "regex": "^https?:\\/\\/t\\.me\\/([a-zA-Z0-9_]{5,32})$"
      },
      {
        "service": "wechat",
        "category": "messaging",
        "regex": "^https?:\\/\\/weixin\\.qq\\.com\\/qr\\/code\\/([a-zA-Z0-9]{27})$"
      },
      {
        "service": "line",
        "category": "messaging",
        "regex": "^https?:\\/\\/line\\.me\\/ti\\/p\\/@([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "viber",
        "category": "messaging",
        "regex": "^https?:\\/\\/chats\\.viber\\.com\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "skype",
        "category": "communication",
        "regex": "^https?:\\/\\/join\\.skype\\.com\\/invite\\/[a-zA-Z0-9]{27}$"
      },
      {
        "service": "slack",
        "category": "team_collaboration",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.slack\\.com\\/?$"
      },
      {
        "service": "discord",
        "category": "team_collaboration",
        "regex": "^https?:\\/\\/discord\\.gg\\/[a-zA-Z0-9-_]{2,16}$"
      },
      {
        "service": "github",
        "category": "developer_tools",
        "regex": "^https?:\\/\\/github\\.com\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "gitlab",
        "category": "developer_tools",
        "regex": "^https?:\\/\\/gitlab\\.com\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "bitbucket",
        "category": "developer_tools",
        "regex": "^https?:\\/\\/bitbucket\\.org\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "dribbble",
        "category": "design",
        "regex": "^https?:\\/\\/dribbble\\.com\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "behance",
        "category": "design",
        "regex": "^https?:\\/\\/www\\.behance\\.net\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "medium",
        "category": "blogging",
        "regex": "^https?:\\/\\/medium\\.com\\/@?([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "blogger",
        "category": "blogging",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.blogspot\\.com\\/?$"
      },
      {
        "service": "wordpress",
        "category": "blogging",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.wordpress\\.com\\/?$"
      },
      {
        "service": "tumblr",
        "category": "blogging",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.tumblr\\.com\\/?$"
      },
      {
        "service": "soundcloud",
        "category": "audio_sharing",
        "regex": "^https?:\\/\\/soundcloud\\.com\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "spotify",
        "category": "music_streaming",
        "regex": "^https?:\\/\\/open\\.spotify\\.com\\/user\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "apple_music",
        "category": "music_streaming",
        "regex": "^https?:\\/\\/music\\.apple\\.com\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "deezer",
        "category": "music_streaming",
        "regex": "^https?:\\/\\/www\\.deezer\\.com\\/[a-zA-Z0-9-_\\/]+\\/?$"
      },
      {
        "service": "trello",
        "category": "project_management",
        "regex": "^https?:\\/\\/trello\\.com\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "asana",
        "category": "project_management",
        "regex": "^https?:\\/\\/app\\.asana\\.com\\/[a-zA-Z0-9-_\\/]+\\/?$"
      },
      {
        "service": "basecamp",
        "category": "project_management",
        "regex": "^https?:\\/\\/3\\.basecamp\\.com\\/([a-zA-Z0-9]+)\\/?$"
      },
      {
        "service": "stackoverflow",
        "category": "developer_community",
        "regex": "^https?:\\/\\/stackoverflow\\.com\\/users\\/([0-9]+)\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "angellist",
        "category": "startup_network",
        "regex": "^https?:\\/\\/angel\\.co\\/[a-zA-Z0-9-_\\/]+\\/?$"
      },
      {
        "service": "crunchbase",
        "category": "business_information",
        "regex": "^https?:\\/\\/www\\.crunchbase\\.com\\/([a-zA-Z0-9-_\\/]+)\\/?$"
      },
      {
        "service": "glassdoor",
        "category": "employment",
        "regex": "^https?:\\/\\/www\\.glassdoor\\.com\\/([a-zA-Z0-9-_\\/]+)\\/?$"
      },
      {
        "service": "xing",
        "category": "professional_network",
        "regex": "^https?:\\/\\/www\\.xing\\.com\\/profile\\/([a-zA-Z0-9-_\\/]+)\\/?$"
      },
      {
        "service": "viadeo",
        "category": "professional_network",
        "regex": "^https?:\\/\\/www\\.viadeo\\.com\\/([a-zA-Z0-9-_\\/]+)\\/?$"
      },
      {
        "service": "flickr",
        "category": "photo_sharing",
        "regex": "^https?:\\/\\/www\\.flickr\\.com\\/photos\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "500px",
        "category": "photo_sharing",
        "regex": "^https?:\\/\\/500px\\.com\\/p\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "ello",
        "category": "social_media",
        "regex": "^https?:\\/\\/ello\\.co\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "clubhouse",
        "category": "social_audio",
        "regex": "^https?:\\/\\/www\\.joinclubhouse\\.com\\/(@[a-zA-Z0-9-_]{2,16})$"
      },
      {
        "service": "quora",
        "category": "social_qa",
        "regex": "^https?:\\/\\/www\\.quora\\.com\\/profile\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "yelp",
        "category": "local_search",
        "regex": "^https?:\\/\\/www\\.yelp\\.com\\/biz\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "tripadvisor",
        "category": "travel",
        "regex": "^https?:\\/\\/www\\.tripadvisor\\.com\\/([a-zA-Z0-9-_\\/]+)\\/?$"
      },
      {
        "service": "foursquare",
        "category": "local_search",
        "regex": "^https?:\\/\\/foursquare\\.com\\/v\\/[a-zA-Z0-9-_\\/]+\\/?$"
      },
      {
        "service": "swarm",
        "category": "location_based",
        "regex": "^https?:\\/\\/www\\.swarmapp\\.com\\/c\\/[a-zA-Z0-9-_\\/]+\\/?$"
      },
      {
        "service": "google_my_business",
        "category": "local_search",
        "regex": "^https?:\\/\\/g\\.page\\/[a-zA-Z0-9-_\\/]+\\/?$"
      },
      {
        "service": "badoo",
        "category": "social_media",
        "regex": "^https?:\\/\\/badoo\\.com\\/([a-zA-Z0-9-_\\/]+)\\/?$"
      },
      {
        "service": "hubspot",
        "category": "marketing_automation",
        "regex": "^https?:\\/\\/app\\.hubspot\\.com\\/contacts\\/([0-9]+)\\/?$"
      },
      {
        "service": "mailchimp",
        "category": "email_marketing",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.us[0-9]+\\.list-manage\\.com\\/subscribe\\/?$"
      },
      {
        "service": "last_fm",
        "category": "music_streaming",
        "regex": "^https?:\\/\\/www\\.last\\.fm\\/user\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "vkontakte",
        "category": "social_media",
        "regex": "^https?:\\/\\/vk\\.com\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "odnoklassniki",
        "category": "social_media",
        "regex": "^https?:\\/\\/ok\\.ru\\/profile\\/([0-9]+)$"
      },
      {
        "service": "houzz",
        "category": "home_design",
        "regex": "^https?:\\/\\/www\\.houzz\\.com\\/pro\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "etsy",
        "category": "ecommerce",
        "regex": "^https?:\\/\\/www\\.etsy\\.com\\/shop\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "shopify",
        "category": "ecommerce",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.myshopify\\.com\\/?$"
      },
      {
        "service": "zillow",
        "category": "real_estate",
        "regex": "^https?:\\/\\/www\\.zillow\\.com\\/profile\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "trulia",
        "category": "real_estate",
        "regex": "^https?:\\/\\/www\\.trulia\\.com\\/profile\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "realtor",
        "category": "real_estate",
        "regex": "^https?:\\/\\/www\\.realtor\\.com\\/realestateagents\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "zoom",
        "category": "video_conferencing",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.zoom\\.us\\/([a-zA-Z0-9-_\\/]+)\\/?$"
      },
      {
        "service": "teams",
        "category": "team_collaboration",
        "regex": "^https?:\\/\\/teams\\.microsoft\\.com\\/l\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "webex",
        "category": "video_conferencing",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.webex\\.com\\/meet\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "gotomeeting",
        "category": "video_conferencing",
        "regex": "^https?:\\/\\/global\\.gotomeeting\\.com\\/join\\/([0-9]{9,10})$"
      },
      {
        "service": "pixiv",
        "category": "illustration",
        "regex": "^https?:\\/\\/www\\.pixiv\\.net\\/users\\/([0-9]+)$"
      },
      {
        "service": "mastodon",
        "category": "social_media",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.mastodon\\.social\\/@([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "gab",
        "category": "social_media",
        "regex": "^https?:\\/\\/gab\\.com\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "minds",
        "category": "social_media",
        "regex": "^https?:\\/\\/www\\.minds\\.com\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "goodreads",
        "category": "book_reviews",
        "regex": "^https?:\\/\\/www\\.goodreads\\.com\\/user\\/show\\/([0-9]+)$"
      },
      {
        "service": "artstation",
        "category": "art_portfolio",
        "regex": "^https?:\\/\\/www\\.artstation\\.com\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "pinterest",
        "category": "image_sharing",
        "regex": "^https?:\\/\\/www\\.pinterest\\.com\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "evernote",
        "category": "note_taking",
        "regex": "^https?:\\/\\/www\\.evernote\\.com\\/pub\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "onedrive",
        "category": "cloud_storage",
        "regex": "^https?:\\/\\/1drv\\.ms\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "google_drive",
        "category": "cloud_storage",
        "regex": "^https?:\\/\\/drive\\.google\\.com\\/drive\\/folders\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "dropbox",
        "category": "cloud_storage",
        "regex": "^https?:\\/\\/www\\.dropbox\\.com\\/sh\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "icloud",
        "category": "cloud_storage",
        "regex": "^https?:\\/\\/www\\.icloud\\.com\\/([a-zA-Z0-9-_\\/]+)\\/?$"
      },
      {
        "service": "box",
        "category": "cloud_storage",
        "regex": "^https?:\\/\\/app\\.box\\.com\\/s\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "dribbble",
        "category": "design_portfolio",
        "regex": "^https?:\\/\\/dribbble\\.com\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "behance",
        "category": "design_portfolio",
        "regex": "^https?:\\/\\/www\\.behance\\.net\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "skype",
        "category": "instant_messaging",
        "regex": "^skype:([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "telegram",
        "category": "instant_messaging",
        "regex": "^https?:\\/\\/t\\.me\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "signal",
        "category": "instant_messaging",
        "regex": "^sgnl:\\/\\/addme\\?phone=([0-9]+)$"
      },
      {
        "service": "viber",
        "category": "instant_messaging",
        "regex": "^viber:\\/\\/add\\?number=([0-9]+)$"
      },
      {
        "service": "line",
        "category": "instant_messaging",
        "regex": "^http(?:s)?:\\/\\/line\\.me\\/ti\\/p\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "weibo",
        "category": "social_media",
        "regex": "^https?:\\/\\/www\\.weibo\\.com\\/u\\/([0-9]+)$"
      },
      {
        "service": "tiktok",
        "category": "short_video",
        "regex": "^https?:\\/\\/www\\.tiktok\\.com\\/@([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "bitly",
        "category": "url_shortening",
        "regex": "^https?:\\/\\/bit\\.ly\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "tinyurl",
        "category": "url_shortening",
        "regex": "^https?:\\/\\/tinyurl\\.com\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "medium",
        "category": "blogging",
        "regex": "^https?:\\/\\/medium\\.com\\/@([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "substack",
        "category": "newsletter",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.substack\\.com\\/?$"
      },
      {
        "service": "revue",
        "category": "newsletter",
        "regex": "^https?:\\/\\/www\\.getrevue\\.co\\/profile\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "ghost",
        "category": "blogging",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.ghost\\.io\\/?$"
      },
      {
        "service": "wix",
        "category": "website_builder",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.wixsite\\.com\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "weebly",
        "category": "website_builder",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.weebly\\.com\\/?$"
      },
      {
        "service": "squarespace",
        "category": "website_builder",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.squarespace\\.com\\/?$"
      },
      {
        "service": "snapchat",
        "category": "social_media",
        "regex": "^https?:\\/\\/www\\.snapchat\\.com\\/add\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "kik",
        "category": "instant_messaging",
        "regex": "^kik:\\/\\/users\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "slack",
        "category": "team_collaboration",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.slack\\.com\\/?$"
      },
      {
        "service": "discord",
        "category": "gaming_community",
        "regex": "^https?:\\/\\/discord\\.gg\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "trello",
        "category": "project_management",
        "regex": "^https?:\\/\\/trello\\.com\\/b\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "asana",
        "category": "project_management",
        "regex": "^https?:\\/\\/app\\.asana\\.com\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "basecamp",
        "category": "project_management",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.basecamphq\\.com\\/?$"
      },
      {
        "service": "airtable",
        "category": "spreadsheet_database",
        "regex": "^https?:\\/\\/airtable\\.com\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "notion",
        "category": "note_taking",
        "regex": "^https?:\\/\\/www\\.notion\\.so\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "coda",
        "category": "document_editor",
        "regex": "^https?:\\/\\/coda\\.io\\/d\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "quip",
        "category": "document_editor",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.quip\\.com\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "nextdoor",
        "category": "local_community",
        "regex": "^https?:\\/\\/nextdoor\\.com\\/pages\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "xing",
        "category": "professional_networking",
        "regex": "^https?:\\/\\/www\\.xing\\.com\\/profile\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "viadeo",
        "category": "professional_networking",
        "regex": "^https?:\\/\\/www\\.viadeo\\.com\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "ello",
        "category": "social_media",
        "regex": "^https?:\\/\\/ello\\.co\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "imgur",
        "category": "image_sharing",
        "regex": "^https?:\\/\\/imgur\\.com\\/user\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "reddit",
        "category": "social_news",
        "regex": "^https?:\\/\\/www\\.reddit\\.com\\/user\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "giphy",
        "category": "gif_sharing",
        "regex": "^https?:\\/\\/giphy\\.com\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "tenor",
        "category": "gif_sharing",
        "regex": "^https?:\\/\\/tenor\\.com\\/users\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "hubspot",
        "category": "marketing_automation",
        "regex": "^https?:\\/\\/app\\.hubspot\\.com\\/contacts\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "mailchimp",
        "category": "email_marketing",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.mailchimpapp\\.net\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "zendesk",
        "category": "customer_support",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.zendesk\\.com\\/agent\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "freshdesk",
        "category": "customer_support",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.freshdesk\\.com\\/a\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "salesforce",
        "category": "customer_relationship_management",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.salesforce\\.com\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "zoho",
        "category": "business_software_suite",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.zoho\\.com\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "docusign",
        "category": "document_signing",
        "regex": "^https?:\\/\\/www\\.docusign\\.net\\/member\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "evernote",
        "category": "note_taking",
        "regex": "^https?:\\/\\/www\\.evernote\\.com\\/pub\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "onedrive",
        "category": "cloud_storage",
        "regex": "^https?:\\/\\/onedrive\\.live\\.com\\/?([a-zA-Z0-9-_\\/?=&]+)$"
      },
      {
        "service": "yammer",
        "category": "enterprise_social_network",
        "regex": "^https?:\\/\\/www\\.yammer\\.com\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "microsoft_teams",
        "category": "team_collaboration",
        "regex": "^https?:\\/\\/teams\\.microsoft\\.com\\/l\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "google_meet",
        "category": "video_conferencing",
        "regex": "^https?:\\/\\/meet\\.google\\.com\\/?([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "google_drive",
        "category": "cloud_storage",
        "regex": "^https?:\\/\\/drive\\.google\\.com\\/([a-zA-Z0-9-_\\/?=&]+)$"
      },
      {
        "service": "google_docs",
        "category": "document_editor",
        "regex": "^https?:\\/\\/docs\\.google\\.com\\/([a-zA-Z0-9-_\\/?=&]+)$"
      },
      {
        "service": "google_sheets",
        "category": "spreadsheet",
        "regex": "^https?:\\/\\/sheets\\.google\\.com\\/([a-zA-Z0-9-_\\/?=&]+)$"
      },
      {
        "service": "google_slides",
        "category": "presentation",
        "regex": "^https?:\\/\\/slides\\.google\\.com\\/([a-zA-Z0-9-_\\/?=&]+)$"
      },
      {
        "service": "google_forms",
        "category": "survey",
        "regex": "^https?:\\/\\/forms\\.google\\.com\\/([a-zA-Z0-9-_\\/?=&]+)$"
      },
      {
        "service": "google_calendar",
        "category": "calendar",
        "regex": "^https?:\\/\\/calendar\\.google\\.com\\/([a-zA-Z0-9-_\\/?=&]+)$"
      },
      {
        "service": "google_maps",
        "category": "mapping",
        "regex": "^https?:\\/\\/maps\\.google\\.com\\/?([a-zA-Z0-9-_\\/?=&]+)$"
      },
      {
        "service": "pinterest",
        "category": "image_sharing",
        "regex": "^https?:\\/\\/www\\.pinterest\\.com\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "bandcamp",
        "category": "music_sharing",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.bandcamp\\.com\\/?$"
      },
      {
        "service": "soundcloud",
        "category": "music_sharing",
        "regex": "^https?:\\/\\/soundcloud\\.com\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "spotify",
        "category": "music_streaming",
        "regex": "^https?:\\/\\/open\\.spotify\\.com\\/user\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "lastfm",
        "category": "music_recommendation",
        "regex": "^https?:\\/\\/www\\.last\\.fm\\/user\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "reverbnation",
        "category": "music_promotion",
        "regex": "^https?:\\/\\/www\\.reverbnation\\.com\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "mixcloud",
        "category": "music_sharing",
        "regex": "^https?:\\/\\/www\\.mixcloud\\.com\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "deezer",
        "category": "music_streaming",
        "regex": "^https?:\\/\\/www\\.deezer\\.com\\/([a-zA-Z0-9-_\\/]+)\\/?$"
      },
      {
        "service": "tidal",
        "category": "music_streaming",
        "regex": "^https?:\\/\\/listen\\.tidal\\.com\\/artist\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "vimeo",
        "category": "video_sharing",
        "regex": "^https?:\\/\\/vimeo\\.com\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "dailymotion",
        "category": "video_sharing",
        "regex": "^https?:\\/\\/www\\.dailymotion\\.com\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "tiktok",
        "category": "short_video",
        "regex": "^https?:\\/\\/www\\.tiktok\\.com\\/@([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "dribbble",
        "category": "design",
        "regex": "^https?:\\/\\/dribbble\\.com\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "behance",
        "category": "design",
        "regex": "^https?:\\/\\/www\\.behance\\.net\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "medium",
        "category": "blogging",
        "regex": "^https?:\\/\\/medium\\.com\\/@([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "deviantart",
        "category": "art_community",
        "regex": "^https?:\\/\\/www\\.deviantart\\.com\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "artstation",
        "category": "art_community",
        "regex": "^https?:\\/\\/www\\.artstation\\.com\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "itch_io",
        "category": "game_platform",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.itch\\.io\\/?$"
      },
      {
        "service": "gamejolt",
        "category": "game_platform",
        "regex": "^https?:\\/\\/gamejolt\\.com\\/@([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "steam",
        "category": "game_platform",
        "regex": "^https?:\\/\\/steamcommunity\\.com\\/id\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "epic_games",
        "category": "game_platform",
        "regex": "^https?:\\/\\/www\\.epicgames\\.com\\/site\\/en-US\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "gumroad",
        "category": "digital_product_sales",
        "regex": "^https?:\\/\\/gumroad\\.com\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "etsy",
        "category": "e-commerce",
        "regex": "^https?:\\/\\/www\\.etsy\\.com\\/shop\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "society6",
        "category": "e-commerce",
        "regex": "^https?:\\/\\/society6\\.com\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "redbubble",
        "category": "e-commerce",
        "regex": "^https?:\\/\\/www\\.redbubble\\.com\\/people\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "teespring",
        "category": "e-commerce",
        "regex": "^https?:\\/\\/teespring\\.com\\/stores\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "shopify",
        "category": "e-commerce",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.myshopify\\.com\\/?$"
      },
      {
        "service": "bigcartel",
        "category": "e-commerce",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.bigcartel\\.com\\/?$"
      },
      {
        "service": "storenvy",
        "category": "e-commerce",
        "regex": "^https?:\\/\\/www\\.storenvy\\.com\\/stores\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "ebay",
        "category": "e-commerce",
        "regex": "^https?:\\/\\/www\\.ebay\\.com\\/usr\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "amazon",
        "category": "e-commerce",
        "regex": "^https?:\\/\\/www\\.amazon\\.com\\/shops\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "walmart",
        "category": "e-commerce",
        "regex": "^https?:\\/\\/www\\.walmart\\.com\\/cp\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "aliexpress",
        "category": "e-commerce",
        "regex": "^https?:\\/\\/www\\.aliexpress\\.com\\/store\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "taobao",
        "category": "e-commerce",
        "regex": "^https?:\\/\\/shop(\\d+)\\.taobao\\.com\\/?$"
      },
      {
        "service": "twitch",
        "category": "live_streaming",
        "regex": "^https?:\\/\\/www\\.twitch\\.tv\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "youtube",
        "category": "video_sharing",
        "regex": "^https?:\\/\\/www\\.youtube\\.com\\/user\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "flickr",
        "category": "photo_sharing",
        "regex": "^https?:\\/\\/www\\.flickr\\.com\\/people\\/([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "unsplash",
        "category": "photo_sharing",
        "regex": "^https?:\\/\\/unsplash\\.com\\/@([a-zA-Z0-9-_]+)\\/?$"
      },
      {
        "service": "zoom",
        "category": "video_conferencing",
        "regex": "^https?:\\/\\/zoom\\.us\\/(?:j|my)\\/([a-zA-Z0-9-_]+)$"
      },
      {
        "service": "cisco_webex",
        "category": "video_conferencing",
        "regex": "^https?:\\/\\/([a-zA-Z0-9-_]+)\\.webex\\.com\\/([a-zA-Z0-9-_\\/]+)$"
      },
      {
        "service": "skype",
        "category": "communication",
        "regex": "^https?:\\/\\/join\\.skype\\.com\\/([a-zA-Z0-9-_\\/]+)$"
      }],
    cat_map: {
      "email": "mdi-email",
      "website": "mdi-web",
      "social_media": "mdi-account-group",
      "finance": "mdi-currency-usd",
      "agriculture": "mdi-tractor",
      "education": "mdi-school",
      "e-commerce": "mdi-cart",
      "information_technology": "mdi-server",
      "healthcare": "mdi-hospital-box",
      "investing": "mdi-trending-up",
      "consumer_services": "mdi-customer-service",
      "real_estate": "mdi-home-city",
      "energy": "mdi-lightning-bolt",
      "image_sharing": "mdi-image",
      "music_sharing": "mdi-music",
      "music_streaming": "mdi-playlist-music",
      "music_recommendation": "mdi-music-circle",
      "music_promotion": "mdi-music-note",
      "video_sharing": "mdi-video",
      "short_video": "mdi-video-outline",
      "design": "mdi-palette",
      "art_community": "mdi-brush",
      "game_platform": "mdi-gamepad",
      "digital_product_sales": "mdi-download",
      "live_streaming": "mdi-video-wireless",
      "photo_sharing": "mdi-camera",
      "video_conferencing": "mdi-video-account",
      "communication": "mdi-phone",
      "team_collaboration": "mdi-account-multiple",
      "file_sharing": "mdi-folder",
      "project_management": "mdi-file-document-box-check",
      "task_management": "mdi-check-box-multiple-outline",
      "document_collaboration": "mdi-file-document-edit",
      "knowledge_base": "mdi-book-open",
      "customer_support": "mdi-headset",
      "code_hosting": "mdi-code-tags",
      "code_collaboration": "mdi-code-brackets",
      "code_review": "mdi-code-not-equal",
      "continuous_integration": "mdi-sync",
      "app_development": "mdi-cellphone",
      "platform_as_a_service": "mdi-cloud",
      "infrastructure_as_a_service": "mdi-server-network",
      "software_as_a_service": "mdi-desktop-classic",
      "business_intelligence": "mdi-chart-bar",
      "analytics": "mdi-chart-pie",
      "data_visualization": "mdi-chart-line",
      "machine_learning": "mdi-robot",
      "artificial_intelligence": "mdi-brain",
      "augmented_reality": "mdi-glasses",
      "virtual_reality": "mdi-vr",
      "location_based_services": "mdi-map-marker",
      "event_management": "mdi-calendar",
      "appointment_scheduling": "mdi-clock",
      "content_management_system": "mdi-file-document-box",
      "digital_marketing": "mdi-bullhorn",
      "email_marketing": "mdi-email-newsletter",
      "social_media_management": "mdi-share-variant",
      "customer_relationship_management": "mdi-account-box",
      "human_resources": "mdi-account-tie",
      "recruiting": "mdi-account-search",
      "learning_management_system": "mdi-book-open-variant",
      "elearning": "mdi-laptop",
      "ebook": "mdi-book",
      "online_courses": "mdi-teach",
      "webinars": "mdi-webcam",
      "podcasts": "mdi-podcast",
      "news": "mdi-newspaper",
      "media": "mdi-radio-tower",
      "journalism": "mdi-account-badge-horizontal",
      "crowdfunding": "mdi-cash-multiple",
      "payment_processing": "mdi-credit-card",
      "cryptocurrency": "mdi-currency-btc",
      "blockchain": "mdi-link-variant",
      "internet_of_things": "mdi-radiator",
      "smart_home": "mdi-home-automation",
      "wearables": "mdi-watch",
      "drone": "mdi-drone",
      "3d_printing": "mdi-printer-3d",
      "travel": "mdi-airplane",
      "accommodation": "mdi-hotel",
      "transportation": "mdi-car",
      "food_delivery": "mdi-food",
      "ride_sharing": "mdi-car-sharing",
      "car_rental": "mdi-rent-a-car",
      "ticketing": "mdi-ticket",
      "sports": "mdi-soccer",
      "fitness": "mdi-dumbbell",
      "entertainment": "mdi-filmstrip",
      "gaming": "mdi-gamepad-variant",
      "movies": "mdi-movie",
      "television": "mdi-television-classic",
      "books": "mdi-library",
      "magazines": "mdi-book-open-page-variant",
      "comics": "mdi-book-open-variant",
      "publishing": "mdi-file-export",
      "nonprofit": "mdi-hand-heart",
      "charity": "mdi-heart",
      "environment": "mdi-leaf",
      "animal_welfare": "mdi-dog",
      "community": "mdi-account-group-outline",
      "networking": "mdi-account-network",
      "dating": "mdi-heart-multiple",
      "freelancing": "mdi-account-cash",
      "job_board": "mdi-briefcase-search",
      "marketplace": "mdi-store",
      "peer_to_peer": "mdi-share",
      "auction": "mdi-gavel",
      "legal": "mdi-gavel",
      "insurance": "mdi-shield",
      "safety": "mdi-security",
      "security": "mdi-lock",
      "privacy": "mdi-eye-off",
      "vpn": "mdi-vpn",
      "domain_registration": "mdi-domain",
      "web_hosting": "mdi-server",
      "cloud_storage": "mdi-cloud-upload",
      "file_backup": "mdi-sync",
      "remote_desktop": "mdi-desktop-mac",
      "remote_access": "mdi-remote-desktop",
      "password_management": "mdi-key",
      "authentication": "mdi-fingerprint",
      "language_translation": "mdi-translate",
      "language_learning": "mdi-alphabetical",
      "mobile_app_development": "mdi-cellphone-link",
      "web_app_development": "mdi-web",
      "desktop_app_development": "mdi-desktop-tower",
      "animation": "mdi-animation",
      "graphic_design": "mdi-image-filter-frames",
      "photography": "mdi-camera-outline",
      "video_production": "mdi-video-vintage",
      "audio_production": "mdi-music-clef-treble",
      "illustration": "mdi-drawing",
      "3d_modeling": "mdi-cube",
      "user_interface_design": "mdi-vector-rectangle",
      "user_experience_design": "mdi-gesture-tap",
      "web_design": "mdi-web",
      "app_design": "mdi-cellphone",
      "branding": "mdi-format-color-fill",
      "logos": "mdi-shape",
      "print_design": "mdi-printer",
      "packaging_design": "mdi-package-variant",
      "product_design": "mdi-cube-outline",
      "interior_design": "mdi-sofa",
      "architecture": "mdi-home-city",
      "landscape_design": "mdi-image-filter-hdr",
      "industrial_design": "mdi-factory",
      "fashion_design": "mdi-hanger",
      "jewelry_design": "mdi-ring",
      "furniture_design": "mdi-sofa-outline",
      "game_design": "mdi-gamepad",
      "motion_graphics": "mdi-animation-play",
      "digital_art": "mdi-brush",
      "sculpture": "mdi-hammer-screwdriver",
      "painting": "mdi-palette",
      "drawing": "mdi-pencil",
      "calligraphy": "mdi-fountain-pen",
      "ceramics": "mdi-pot",
      "glass_blowing": "mdi-glass-cocktail",
      "woodworking": "mdi-saw-blade",
      "metalworking": "mdi-hammer-wrench",
      "textile_design": "mdi-textile",
      "fiber_art": "mdi-needle",
      "embroidery": "mdi-needle",
      "sewing": "mdi-sewing-machine",
      "quilting": "mdi-patch",
      "knitting": "mdi-needle",
      "crochet": "mdi-needle",
      "music_production": "mdi-music",
      "songwriting": "mdi-music-note",
      "musical_instruments": "mdi-guitar-acoustic",
      "djing": "mdi-disc-player",
      "dance": "mdi-dance-pump",
      "theater": "mdi-drama-masks",
      "film_production": "mdi-filmstrip-box",
      "screenwriting": "mdi-script-text",
      "acting": "mdi-account-star",
      "directing": "mdi-video-vintage",
      "cinematography": "mdi-camera",
      "makeup": "mdi-face",
      "costume_design": "mdi-tshirt-crew",
      "set_design": "mdi-home-floor",
      "sound_design": "mdi-waveform",
      "lighting_design": "mdi-lightbulb-on-outline",
      "performing_arts": "mdi-drama-masks",
      "stand_up_comedy": "mdi-microphone-variant",
      "magic": "mdi-cards-playing-outline",
      "circus": "mdi-tent",
      "puppetry": "mdi-puppet",
      "mime": "mdi-account-tie",
      "event_planning": "mdi-calendar-check",
      "wedding_planning": "mdi-cake",
      "party_planning": "mdi-balloon",
      "catering": "mdi-food",
      "wine": "mdi-wine-glass",
      "cocktails": "mdi-glass-cocktail",
      "craft_beer": "mdi-beer",
      "cooking": "mdi-stove"
    },
    categories: [
      {
        "category": "email",
        "icon": "mdi-email"
      },
      {
        "category": "website",
        "icon": "mdi-web"
      },
      {
        "category": "social_media",
        "icon": "mdi-account-group"
      },
      {
        "category": "finance",
        "icon": "mdi-currency-usd"
      },
      {
        "category": "agriculture",
        "icon": "mdi-tractor"
      },
      {
        "category": "education",
        "icon": "mdi-school"
      },
      {
        "category": "e-commerce",
        "icon": "mdi-cart"
      },
      {
        "category": "information_technology",
        "icon": "mdi-server"
      },
      {
        "category": "healthcare",
        "icon": "mdi-hospital-box"
      },
      {
        "category": "investing",
        "icon": "mdi-trending-up"
      },
      {
        "category": "consumer_services",
        "icon": "mdi-customer-service"
      },
      {
        "category": "real_estate",
        "icon": "mdi-home-city"
      },
      {
        "category": "energy",
        "icon": "mdi-lightning-bolt"
      },
      {
        "category": "image_sharing",
        "icon": "mdi-image"
      },
      {
        "category": "music_sharing",
        "icon": "mdi-music"
      },
      {
        "category": "music_streaming",
        "icon": "mdi-playlist-music"
      },
      {
        "category": "music_recommendation",
        "icon": "mdi-music-circle"
      },
      {
        "category": "music_promotion",
        "icon": "mdi-music-note"
      },
      {
        "category": "video_sharing",
        "icon": "mdi-video"
      },
      {
        "category": "short_video",
        "icon": "mdi-video-outline"
      },
      {
        "category": "design",
        "icon": "mdi-palette"
      },
      {
        "category": "art_community",
        "icon": "mdi-brush"
      },
      {
        "category": "game_platform",
        "icon": "mdi-gamepad"
      },
      {
        "category": "digital_product_sales",
        "icon": "mdi-download"
      },
      {
        "category": "live_streaming",
        "icon": "mdi-video-wireless"
      },
      {
        "category": "photo_sharing",
        "icon": "mdi-camera"
      },
      {
        "category": "video_conferencing",
        "icon": "mdi-video-account"
      },
      {
        "category": "communication",
        "icon": "mdi-phone"
      },
      {
        "category": "team_collaboration",
        "icon": "mdi-account-multiple"
      },
      {
        "category": "file_sharing",
        "icon": "mdi-folder"
      },
      {
        "category": "project_management",
        "icon": "mdi-file-document-box-check"
      },
      {
        "category": "task_management",
        "icon": "mdi-check-box-multiple-outline"
      },
      {
        "category": "document_collaboration",
        "icon": "mdi-file-document-edit"
      },
      {
        "category": "knowledge_base",
        "icon": "mdi-book-open"
      },
      {
        "category": "customer_support",
        "icon": "mdi-headset"
      },
      {
        "category": "code_hosting",
        "icon": "mdi-code-tags"
      },
      {
        "category": "code_collaboration",
        "icon": "mdi-code-brackets"
      },
      {
        "category": "code_review",
        "icon": "mdi-code-not-equal"
      },
      {
        "category": "continuous_integration",
        "icon": "mdi-sync"
      },
      {
        "category": "app_development",
        "icon": "mdi-cellphone"
      },
      {
        "category": "platform_as_a_service",
        "icon": "mdi-cloud"
      },
      {
        "category": "infrastructure_as_a_service",
        "icon": "mdi-server-network"
      },
      {
        "category": "software_as_a_service",
        "icon": "mdi-desktop-classic"
      },
      {
        "category": "business_intelligence",
        "icon": "mdi-chart-bar"
      },
      {
        "category": "analytics",
        "icon": "mdi-chart-pie"
      },
      {
        "category": "data_visualization",
        "icon": "mdi-chart-line"
      },
      {
        "category": "machine_learning",
        "icon": "mdi-robot"
      },
      {
        "category": "artificial_intelligence",
        "icon": "mdi-brain"
      },
      {
        "category": "augmented_reality",
        "icon": "mdi-glasses"
      },
      {
        "category": "virtual_reality",
        "icon": "mdi-vr"
      },
      {
        "category": "location_based_services",
        "icon": "mdi-map-marker"
      },
      {
        "category": "event_management",
        "icon": "mdi-calendar"
      },
      {
        "category": "appointment_scheduling",
        "icon": "mdi-clock"
      },
      {
        "category": "content_management_system",
        "icon": "mdi-file-document-box"
      },
      {
        "category": "digital_marketing",
        "icon": "mdi-bullhorn"
      },
      {
        "category": "email_marketing",
        "icon": "mdi-email-newsletter"
      },
      {
        "category": "social_media_management",
        "icon": "mdi-share-variant"
      },
      {
        "category": "customer_relationship_management",
        "icon": "mdi-account-box"
      },
      {
        "category": "human_resources",
        "icon": "mdi-account-tie"
      },
      {
        "category": "recruiting",
        "icon": "mdi-account-search"
      },
      {
        "category": "learning_management_system",
        "icon": "mdi-book-open-variant"
      },
      {
        "category": "elearning",
        "icon": "mdi-laptop"
      },
      {
        "category": "ebook",
        "icon": "mdi-book"
      },
      {
        "category": "online_courses",
        "icon": "mdi-teach"
      },
      {
        "category": "webinars",
        "icon": "mdi-webcam"
      },
      {
        "category": "podcasts",
        "icon": "mdi-podcast"
      },
      {
        "category": "news",
        "icon": "mdi-newspaper"
      },
      {
        "category": "media",
        "icon": "mdi-radio-tower"
      },
      {
        "category": "journalism",
        "icon": "mdi-account-badge-horizontal"
      },
      {
        "category": "crowdfunding",
        "icon": "mdi-cash-multiple"
      },
      {
        "category": "payment_processing",
        "icon": "mdi-credit-card"
      },
      {
        "category": "cryptocurrency",
        "icon": "mdi-currency-btc"
      },
      {
        "category": "blockchain",
        "icon": "mdi-link-variant"
      },
      {
        "category": "internet_of_things",
        "icon": "mdi-radiator"
      },
      {
        "category": "smart_home",
        "icon": "mdi-home-automation"
      },
      {
        "category": "wearables",
        "icon": "mdi-watch"
      },
      {
        "category": "drone",
        "icon": "mdi-drone"
      },
      {
        "category": "3d_printing",
        "icon": "mdi-printer-3d"
      },
      {
        "category": "travel",
        "icon": "mdi-airplane"
      },
      {
        "category": "accommodation",
        "icon": "mdi-hotel"
      },
      {
        "category": "transportation",
        "icon": "mdi-car"
      },
      {
        "category": "food_delivery",
        "icon": "mdi-food"
      },
      {
        "category": "ride_sharing",
        "icon": "mdi-car-sharing"
      },
      {
        "category": "car_rental",
        "icon": "mdi-rent-a-car"
      },
      {
        "category": "ticketing",
        "icon": "mdi-ticket"
      },
      {
        "category": "sports",
        "icon": "mdi-soccer"
      },
      {
        "category": "fitness",
        "icon": "mdi-dumbbell"
      },
      {
        "category": "entertainment",
        "icon": "mdi-filmstrip"
      },
      {
        "category": "gaming",
        "icon": "mdi-gamepad-variant"
      },
      {
        "category": "movies",
        "icon": "mdi-movie"
      },
      {
        "category": "television",
        "icon": "mdi-television-classic"
      },
      {
        "category": "books",
        "icon": "mdi-library"
      },
      {
        "category": "magazines",
        "icon": "mdi-book-open-page-variant"
      },
      {
        "category": "comics",
        "icon": "mdi-book-open-variant"
      },
      {
        "category": "publishing",
        "icon": "mdi-file-export"
      },
      {
        "category": "nonprofit",
        "icon": "mdi-hand-heart"
      },
      {
        "category": "charity",
        "icon": "mdi-heart"
      },
      {
        "category": "environment",
        "icon": "mdi-leaf"
      },
      {
        "category": "animal_welfare",
        "icon": "mdi-dog"
      },
      {
        "category": "community",
        "icon": "mdi-account-group-outline"
      },
      {
        "category": "networking",
        "icon": "mdi-account-network"
      },
      {
        "category": "dating",
        "icon": "mdi-heart-multiple"
      },
      {
        "category": "freelancing",
        "icon": "mdi-account-cash"
      },
      {
        "category": "job_board",
        "icon": "mdi-briefcase-search"
      },
      {
        "category": "marketplace",
        "icon": "mdi-store"
      },
      {
        "category": "peer_to_peer",
        "icon": "mdi-share"
      },
      {
        "category": "auction",
        "icon": "mdi-gavel"
      },
      {
        "category": "legal",
        "icon": "mdi-gavel"
      },
      {
        "category": "insurance",
        "icon": "mdi-shield"
      },
      {
        "category": "safety",
        "icon": "mdi-security"
      },
      {
        "category": "security",
        "icon": "mdi-lock"
      },
      {
        "category": "privacy",
        "icon": "mdi-eye-off"
      },
      {
        "category": "vpn",
        "icon": "mdi-vpn"
      },
      {
        "category": "domain_registration",
        "icon": "mdi-domain"
      },
      {
        "category": "web_hosting",
        "icon": "mdi-server"
      },
      {
        "category": "cloud_storage",
        "icon": "mdi-cloud-upload"
      },
      {
        "category": "file_backup",
        "icon": "mdi-sync"
      },
      {
        "category": "remote_desktop",
        "icon": "mdi-desktop-mac"
      },
      {
        "category": "remote_access",
        "icon": "mdi-remote-desktop"
      },
      {
        "category": "password_management",
        "icon": "mdi-key"
      },
      {
        "category": "authentication",
        "icon": "mdi-fingerprint"
      },
      {
        "category": "language_translation",
        "icon": "mdi-translate"
      },
      {
        "category": "language_learning",
        "icon": "mdi-alphabetical"
      },
      {
        "category": "mobile_app_development",
        "icon": "mdi-cellphone-link"
      },
      {
        "category": "web_app_development",
        "icon": "mdi-web"
      },
      {
        "category": "desktop_app_development",
        "icon": "mdi-desktop-tower"
      },
      {
        "category": "animation",
        "icon": "mdi-animation"
      },
      {
        "category": "graphic_design",
        "icon": "mdi-image-filter-frames"
      },
      {
        "category": "photography",
        "icon": "mdi-camera-outline"
      },
      {
        "category": "video_production",
        "icon": "mdi-video-vintage"
      },
      {
        "category": "audio_production",
        "icon": "mdi-music-clef-treble"
      },
      {
        "category": "illustration",
        "icon": "mdi-drawing"
      },
      {
        "category": "3d_modeling",
        "icon": "mdi-cube"
      },
      {
        "category": "user_interface_design",
        "icon": "mdi-vector-rectangle"
      },
      {
        "category": "user_experience_design",
        "icon": "mdi-gesture-tap"
      },
      {
        "category": "web_design",
        "icon": "mdi-web"
      },
      {
        "category": "app_design",
        "icon": "mdi-cellphone"
      },
      {
        "category": "branding",
        "icon": "mdi-format-color-fill"
      },
      {
        "category": "logos",
        "icon": "mdi-shape"
      },
      {
        "category": "print_design",
        "icon": "mdi-printer"
      },
      {
        "category": "packaging_design",
        "icon": "mdi-package-variant"
      },
      {
        "category": "product_design",
        "icon": "mdi-cube-outline"
      },
      {
        "category": "interior_design",
        "icon": "mdi-sofa"
      },
      {
        "category": "architecture",
        "icon": "mdi-home-city"
      },
      {
        "category": "landscape_design",
        "icon": "mdi-image-filter-hdr"
      },
      {
        "category": "industrial_design",
        "icon": "mdi-factory"
      },
      {
        "category": "fashion_design",
        "icon": "mdi-hanger"
      },
      {
        "category": "jewelry_design",
        "icon": "mdi-ring"
      },
      {
        "category": "furniture_design",
        "icon": "mdi-sofa-outline"
      },
      {
        "category": "game_design",
        "icon": "mdi-gamepad"
      },
      {
        "category": "motion_graphics",
        "icon": "mdi-animation-play"
      },
      {
        "category": "digital_art",
        "icon": "mdi-brush"
      },
      {
        "category": "sculpture",
        "icon": "mdi-hammer-screwdriver"
      },
      {
        "category": "painting",
        "icon": "mdi-palette"
      },
      {
        "category": "drawing",
        "icon": "mdi-pencil"
      },
      {
        "category": "calligraphy",
        "icon": "mdi-fountain-pen"
      },
      {
        "category": "ceramics",
        "icon": "mdi-pot"
      },
      {
        "category": "glass_blowing",
        "icon": "mdi-glass-cocktail"
      },
      {
        "category": "woodworking",
        "icon": "mdi-saw-blade"
      },
      {
        "category": "metalworking",
        "icon": "mdi-hammer-wrench"
      },
      {
        "category": "textile_design",
        "icon": "mdi-textile"
      },
      {
        "category": "fiber_art",
        "icon": "mdi-needle"
      },
      {
        "category": "embroidery",
        "icon": "mdi-needle"
      },
      {
        "category": "sewing",
        "icon": "mdi-sewing-machine"
      },
      {
        "category": "quilting",
        "icon": "mdi-patch"
      },
      {
        "category": "knitting",
        "icon": "mdi-needle"
      },
      {
        "category": "crochet",
        "icon": "mdi-needle"
      },
      {
        "category": "music_production",
        "icon": "mdi-music"
      },
      {
        "category": "songwriting",
        "icon": "mdi-music-note"
      },
      {
        "category": "musical_instruments",
        "icon": "mdi-guitar-acoustic"
      },
      {
        "category": "djing",
        "icon": "mdi-disc-player"
      },
      {
        "category": "dance",
        "icon": "mdi-dance-pump"
      },
      {
        "category": "theater",
        "icon": "mdi-drama-masks"
      },
      {
        "category": "film_production",
        "icon": "mdi-filmstrip-box"
      },
      {
        "category": "screenwriting",
        "icon": "mdi-script-text"
      },
      {
        "category": "acting",
        "icon": "mdi-account-star"
      },
      {
        "category": "directing",
        "icon": "mdi-video-vintage"
      },
      {
        "category": "cinematography",
        "icon": "mdi-camera"
      },
      {
        "category": "makeup",
        "icon": "mdi-face"
      },
      {
        "category": "costume_design",
        "icon": "mdi-tshirt-crew"
      },
      {
        "category": "set_design",
        "icon": "mdi-home-floor"
      },
      {
        "category": "sound_design",
        "icon": "mdi-waveform"
      },
      {
        "category": "lighting_design",
        "icon": "mdi-lightbulb-on-outline"
      },
      {
        "category": "performing_arts",
        "icon": "mdi-drama-masks"
      },
      {
        "category": "stand_up_comedy",
        "icon": "mdi-microphone-variant"
      },
      {
        "category": "magic",
        "icon": "mdi-cards-playing-outline"
      },
      {
        "category": "circus",
        "icon": "mdi-tent"
      },
      {
        "category": "puppetry",
        "icon": "mdi-puppet"
      },
      {
        "category": "mime",
        "icon": "mdi-account-tie"
      },
      {
        "category": "event_planning",
        "icon": "mdi-calendar-check"
      },
      {
        "category": "wedding_planning",
        "icon": "mdi-cake"
      },
      {
        "category": "party_planning",
        "icon": "mdi-balloon"
      },
      {
        "category": "catering",
        "icon": "mdi-food"
      },
      {
        "category": "wine",
        "icon": "mdi-wine-glass"
      },
      {
        "category": "cocktails",
        "icon": "mdi-glass-cocktail"
      },
      {
        "category": "craft_beer",
        "icon": "mdi-beer"
      },
      {
        "category": "cooking",
        "icon": "mdi-stove"
      }
    ],
    groups: [
      {
        "group": "Business",
        "icon": "mdi-briefcase",
        "categories": [
          "finance",
          "investing",
          "accounting",
          "tax",
          "real_estate",
          "consulting",
          "human_resources",
          "supply_chain_management",
          "project_management",
          "data_analysis",
          "market_research",
          "writing",
          "translation",
          "legal",
          "insurance",
          "safety",
          "security",
          "privacy",
          "vpn",
          "domain_registration",
          "web_hosting",
          "cloud_storage",
          "file_backup"
        ]
      },
      {
        "group": "Technology",
        "icon": "mdi-cellphone",
        "categories": [
          "information_technology",
          "software_development",
          "mobile_app_development",
          "web_app_development",
          "desktop_app_development",
          "animation",
          "graphic_design",
          "photography",
          "video_production",
          "audio_production",
          "illustration",
          "3d_modeling",
          "user_interface_design",
          "user_experience_design",
          "web_design",
          "app_design",
          "product_design",
          "game_design",
          "motion_graphics",
          "digital_art",
          "calligraphy"
        ]
      },
      {
        "group": "Creative",
        "icon": "mdi-palette",
        "categories": [
          "magazines",
          "comics",
          "publishing",
          "music_production",
          "songwriting",
          "musical_instruments",
          "djing",
          "dance",
          "theater",
          "film_production",
          "screenwriting",
          "acting",
          "directing",
          "cinematography",
          "makeup",
          "costume_design",
          "set_design",
          "sound_design",
          "lighting_design",
          "performing_arts",
          "stand_up_comedy",
          "magic",
          "circus",
          "puppetry",
          "mime",
          "animation",
          "graphic_design",
          "photography",
          "video_production",
          "audio_production",
          "illustration",
          "3d_modeling",
          "user_interface_design",
          "user_experience_design",
          "web_design",
          "app_design",
          "product_design",
          "game_design",
          "motion_graphics",
          "digital_art",
          "calligraphy",
          "ceramics",
          "glass_blowing",
          "woodworking",
          "metalworking",
          "textile_design",
          "fiber_art",
          "embroidery",
          "sewing",
          "quilting",
          "knitting",
          "crochet",
          "sculpture",
          "painting",
          "drawing"
        ]
      },
      {
        "group": "Education",
        "icon": "mdi-school",
        "categories": [
          "online_courses",
          "tutoring",
          "test_prep",
          "language_learning",
          "music_lessons",
          "art_lessons",
          "coding_bootcamps",
          "career_advice"
        ]
      },
      {
        "group": "E-commerce",
        "icon": "mdi-cart",
        "categories": [
          "marketplaces",
          "online_shopping",
          "subscriptions",
          "digital_downloads",
          "payment_processing",
          "shipping",
          "fulfillment",
          "inventory_management",
          "point_of_sale",
          "bookkeeping",
          "tax_compliance",
          "customer_service",
          "reviews",
          "affiliate_programs",
          "dropshipping"
        ]
      },
      {
        "group": "Social",
        "icon": "mdi-account-group",
        "categories": [
          "social_networking",
          "dating",
          "professional_networking",
          "online_forums",
          "discussion_boards",
          "community_building",
          "online_marketplaces",
          "crowdfunding",
          "collaboration_tools",
          "virtual_reality"
        ]
      },
      {
        "group": "Productivity",
        "icon": "mdi-thumb-up-outline",
        "categories": [
          "email",
          "calendar",
          "productivity_tools",
          "note_taking",
          "document_management",
          "file_conversion",
          "file_compression",
          "password_management",
          "task_management",
          "time_tracking",
          "project_management",
          "team_collaboration",
          "virtual_meetings",
          "webinars",
          "video_conferencing",
          "online_presentations",
          "mind_mapping",
          "bookkeeping",
          "customer_relationship_management",
          "sales_management",
          "human_resources_management",
          "workflow_automation",
          "file_sharing",
          "cloud_storage",
          "file_backup",
          "vpn",
          "website_building",
          "content_management_systems",
          "wordpress",
          "coda",
          "salesforce",
          "google_maps",
          "behance",
          "bigcartel",
          "substack"
        ]
      },
      {
        "group": "Books",
        "icon": "mdi-book",
        "categories": [
          "ebooks",
          "audiobooks",
          "book_recommendations",
          "book_clubs"
        ]
      },
      {
        "group": "Art",
        "icon": "mdi-palette",
        "categories": [
          "drawing",
          "painting",
          "sculpture",
          "photography",
          "graphic_design",
          "digital_art",
          "animation",
          "motion_graphics",
          "illustration",
          "3d_modeling",
          "calligraphy",
          "ceramics",
          "glass_blowing",
          "woodworking",
          "metalworking",
          "textile_design",
          "fiber_art",
          "embroidery",
          "sewing",
          "quilting",
          "knitting",
          "crochet"
        ]
      },
      {
        "group": "Entertainment",
        "icon": "mdi-emoticon-cool-outline",
        "categories": [
          "video_streaming",
          "music_streaming",
          "podcasts",
          "online_gaming",
          "board_games",
          "card_games",
          "casual_games"
        ]
      },

    ]
  }),
};
</script>

<style></style>
