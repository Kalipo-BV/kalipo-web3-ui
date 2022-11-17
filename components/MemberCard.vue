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
  <div>
    <v-card
      flat
      link
      @click="$router.push('/account/' + member.account.username)"
    >
      <v-card-text>
        <div class="d-flex justify-center">
          <v-avatar size="90" color="primary" class="white--text text-h2">{{
            getInitials(member.account.name)
          }}</v-avatar>
        </div>
        <div class="d-flex justify-center text-h4 text--primary mt-2">
          {{ member.account.name }}
        </div>

        <div class="d-flex justify-center text-caption text--primary mt-2">
          Full-Member
        </div>
      </v-card-text>
      <v-divider v-if="member.started"></v-divider>

      <v-card-text v-if="member.started">
        <div
          class="d-flex justify-center text-caption text--primary"
          v-if="userLang"
        >
          Joined:
          {{
            new Date(parseInt(member.started) * 1000).toLocaleDateString(
              userLang,
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )
          }}
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text>
        <div class="d-flex justify-center">
          <div v-for="(social, z) in member.account.socials" :key="z">
            <v-btn color="accent" fab x-small class="mr-1"
              ><v-icon small>{{ getIcon(social.social) }}</v-icon></v-btn
            >
          </div>
          <div v-if="member.account.socials.length == 0" class="py-1">
            No socials found
            <div class="mt-1"></div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  props: ["member"],
  data: () => ({
    userLang: null,
  }),
  methods: {
    getInitials(parseStr) {
      if (parseStr != undefined) {
        const nameList = parseStr.split(" ");
        let result = "";
        for (let index = 0; index < nameList.length; index++) {
          if (index < 3) {
            const element = nameList[index];
            result += element[0].toUpperCase();
          } else {
            break;
          }
        }
        return result;
      }
    },
    getIcon(socialName) {
      socialName = socialName.toLowerCase();
      if (socialName == "twitter") {
        return "mdi-twitter";
      }
      if (socialName == "facebook") {
        return "mdi-facebook";
      }

      if (socialName == "linkedin") {
        return "mdi-linkedin";
      }

      if (socialName == "discord") {
        return "mdi-discord";
      }

      if (socialName == "youtube") {
        return "mdi-youtube";
      }

      if (socialName == "google") {
        return "mdi-google";
      }
    },
  },

  mounted() {
    this.userLang = navigator.language || navigator.userLanguage;
  },
};
</script>