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
    <v-navigation-drawer
      :mini-variant="sm"
      app
      clipped
      color="primary"
      v-if="!xs"
    >
      <template v-slot:prepend>
        <v-list-item two-line dark class="my-2">
          <v-list-item-avatar>
            <img src="/Kalipo_Logo_512x512.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <div class="text-h3">Kalipo</div>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-list class="mt-n2">
        <v-list-item-group
          :value="selectedItem"
          color="white"
          :mandatory="selectedItem > -1"
        >
          <div>
            <v-list-item link v-if="!unlocked" @click="$router.push('/')">
              <v-list-item-icon class="pl-1">
                <v-icon color="white">mdi-home-city</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <div
                  class="text-h6 font-weight-medium white--text"
                  style="margin-top: -1px"
                >
                  Home
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              link
              v-if="unlocked"
              @click="$router.push('/dashboard')"
            >
              <v-list-item-icon class="pl-1">
                <v-icon color="white">mdi-monitor-dashboard</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <div
                  class="text-h6 font-weight-medium white--text"
                  style="margin-top: -1px"
                >
                  Dashboard
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="$router.push('/autons')">
              <v-list-item-icon class="pl-1">
                <v-icon color="white">mdi-web</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <div
                  class="text-h6 font-weight-medium white--text"
                  style="margin-top: -1px"
                >
                  Autons
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="$router.push('/users')">
              <v-list-item-icon class="pl-1">
                <v-icon color="white">mdi-account-multiple</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <div
                  class="text-h6 font-weight-medium white--text"
                  style="margin-top: -1px"
                >
                  Users
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon class="pl-1">
                <v-icon color="white">mdi-text-search</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <div
                  class="text-h6 font-weight-medium white--text"
                  style="margin-top: -1px"
                >
                  Logs
                </div>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-4">
          <v-card
            link
            flat
            color="primary lighten-1"
            v-if="unlocked"
            @click="$router.push('/account_settings')"
          >
            <v-card-text>
              <div class="d-flex align-center justify-space-between">
                <div class="d-flex align-center">
                  <v-avatar color="white" size="35"
                    ><div class="text-caption">
                      {{ getInitials(account.name) }}
                    </div></v-avatar
                  >
                  <div class="white--text ml-2">
                    <div class="text-body-caption">{{ account.name }}</div>
                    <div class="text-caption">@{{ account.username }}</div>
                  </div>
                </div>
                <v-btn fab x-small color="white" @click="lockAccount"
                  ><v-icon color="primary lighten-1"
                    >mdi-lock-open</v-icon
                  ></v-btn
                >
              </div>
            </v-card-text>
          </v-card>
          <v-card
            link
            flat
            color="primary lighten-1"
            v-if="!unlocked"
            @click="$router.push('/wallet')"
          >
            <v-card-text>
              <div
                class="d-flex align-center justify-center text-h6 white--text"
              >
                Sign-in
              </div>
            </v-card-text>
          </v-card>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  computed: {
    account() {
      return this.$store.state.wallet.account;
    },
    unlocked() {
      return this.$store.state.wallet.unlocked;
    },
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
      miniVariant: false,
      selectedItem: 1,
      navItems: [
        {
          icon: "mdi-home-city",
          title: "Home",
          to: "/",
        },
        {
          icon: "mdi-file-sign",
          title: "Petitions",
          to: "/petitions",
          hide: true,
        },
        {
          icon: "mdi-web",
          title: "Autons",
          to: "/proposals",
        },
        {
          icon: "mdi-account-multiple",
          title: "Users",
          to: "/users",
        },
        {
          icon: "mdi-text-search",
          title: "Logs",
          to: "/logs",
        },
        {
          icon: "mdi-monitor-dashboard",
          title: "Dashboard",
          to: "/proposals",
        },
        {
          icon: "mdi-account-cog",
          title: "Account settings",
          to: "/account",
        },
      ],
    };
  },
  created() {
    this.$nuxt.$on("MainMenu-setPage", (page) => this.setMenu(page));
  },
  methods: {
    setMenu(page) {
      if (page === "home") {
        this.selectedItem = 0;
      } else if (page === "autons") {
        this.selectedItem = 1;
      } else if (page === "users") {
        this.selectedItem = 2;
      } else if (page === "logs") {
        this.selectedItem = 3;
      } else if (page === "wallet") {
        this.selectedItem = -1;
      } else if (page === "account_settings") {
        this.selectedItem = -1;
      }
    },
    lockAccount() {
      this.$store.commit("wallet/lock");
      this.$router.push("/wallet");
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
};
</script>