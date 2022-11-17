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
  <v-container>
    <v-row v-if="account">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="mt-2" flat>
              <v-card-text>
                <div class="text-h6 primary--text">About me</div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text>
                <div class="text-body-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Pariatur dolorem assumenda exercitationem. Autem porro eum
                  voluptatibus a, laborum deserunt suscipit, cumque, dolor
                  maxime unde quos amet doloribus error nisi velit?
                </div>
              </v-card-text>
            </v-card>

            <v-card class="mt-2" v-if="account.socials.length > 0" flat>
              <v-card-text>
                <div class="text-h6 primary--text">My Socials</div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text class="d-flex align-center">
                <div v-for="(social, z) in account.socials" :key="z">
                  <v-btn color="accent" fab x-small class="mr-1"
                    ><v-icon small>{{
                      getSocialIcon(social.social)
                    }}</v-icon></v-btn
                  >
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "account",
  data() {
    return {
      account: null,
    };
  },

  async mounted() {
    this.$nuxt.$emit("Account-setPage", "profile");

    let accountIdParam = this.$route.params.accountId;
    if (accountIdParam.indexOf("@") == 0) {
      accountIdParam = accountIdParam.replace("@", "");
    }
    const accountIdWrapper = await this.$invoke(
      "kalipoAccount:getAccountIdByUsername",
      {
        username: accountIdParam,
      }
    );

    if (accountIdWrapper.result) {
      const accountWrapper = await this.$invoke("kalipoAccount:getByID", {
        id: accountIdWrapper.result.id,
      });

      this.account = accountWrapper.result;
    }
  },
  methods: {
    getSocialIcon(socialName) {
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
};
</script>

<style>
</style>