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
  <v-app id="account-layout">
    <v-main class="primary" v-if="account">
      <div style="height: 100%; background: #eef1f6">
        <v-app-bar height="85px" color="white" flat>
          <v-row>
            <v-container class="">
              <v-row no-gutters class="d-flex align-center">
                <v-col class="">
                  <div class="d-flex align-start">
                    <v-avatar
                      color="primary"
                      size="40"
                      class="white--text mr-1 mt-1"
                      ><div class="text-caption font-weight-medium">
                        {{ getInitials(this.account.name) }}
                      </div></v-avatar
                    >
                    <div class="ml-2">
                      <div class="text-h3 primary--text">
                        {{ this.account.name }}
                      </div>
                      <div class="d-flex align-center text-caption">
                        <v-avatar
                          size="12"
                          color="success"
                          class="mr-1"
                        ></v-avatar>
                        <div>online</div>
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col class="d-flex justify-end"> </v-col>
              </v-row>
            </v-container>
          </v-row>
          <v-btn fab class="float-end" v-if="xs||sm" @click="open=!open">
            <v-icon>
              mdi-menu
            </v-icon>
          </v-btn>
          <template v-slot:extension>
            <v-row>
              <v-container
                ><v-tabs v-model="selectedItem">
                  <v-tabs-slider color="primary"></v-tabs-slider>

                  <v-tab
                    v-for="(item, idx) in tabItems"
                    :key="idx"
                    @click="navigate(item.to)"
                  >
                    <v-icon small class="mr-2">{{ item.icon }}</v-icon>
                    {{ item.title }}
                  </v-tab>
                </v-tabs></v-container
              ></v-row
            >
          </template>
        </v-app-bar>
        <Nuxt class="mt-n2" />
      </div>
    </v-main>
    <v-main v-if="account == 404">
      <v-row align="center" justify="center" style="height: 100%">
        <div>
          <div class="d-flex justify-center">
            <v-icon large color="error">mdi-alert-circle</v-icon>
          </div>
          <div class="text-body-2 mt-2">Account not found</div>
        </div>
      </v-row>
    </v-main>
    <MainMenu
      :open.sync="open"
    ></MainMenu>
  </v-app>
</template>

<script>
export default {
  computed: {
    xs() {
      return this.$vuetify.breakpoint.xs;
    },
    sm() {
      return this.$vuetify.breakpoint.sm;
    },
    md() {
      return this.$vuetify.breakpoint.md;
    },
  },
  data() {
    return {
      open: false,
      miniVariant: false,
      selectedItem: 0,
      account: null,
      tabItems: [
        {
          icon: "mdi-account-box",
          title: "Profile",
          to: "/",
        },
        {
          icon: "mdi-web",
          title: "Personal autons",
          to: "autons",
        },
        {
          icon: "mdi-tray-full",
          title: "Personal proposals",
          to: "proposals",
        },
        {
          icon: "mdi-vote",
          title: "Personal votes",
          to: "votes",
        },
      ],
    };
  },
  created() {
    this.$nuxt.$on("Account-setPage", (page) => this.setMenu(page));
  },
  methods: {
    navigate(to) {
      if (to == "/") {
        this.$router.push(`/account/${this.$route.params.accountId}`);
      } else {
        this.$router.push(`/account/${this.$route.params.accountId}/${to}/`);
      }
    },
    setMenu(page) {
      if (page === "profile") {
        this.selectedItem = 0;
      } else if (page === "autons") {
        this.selectedItem = 1;
      } else if (page === "proposals") {
        this.selectedItem = 2;
      } else if (page === "votes") {
        this.selectedItem = 3;
      } else if (page === "comments") {
        this.selectedItem = 4;
      }
    },
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
  },
  async mounted() {
    this.$nuxt.$emit("MainMenu-setPage", "users");

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
    } else {
      this.account = 404;
    }
  },
};
</script>
<style>
</style>
