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


            <v-list-item v-for="page in navItems"
                         :key="page.title"
                         v-if="!page.hide && (page.showIfUnlocked === unlocked || page.showIfUnlocked === undefined)"
                         @click="$router.push(page.to)"
                         link>
              <v-list-item-icon class="pl-1">
                <v-icon color="white">{{page.icon}}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <div
                  class="text-h6 font-weight-medium white--text"
                  style="margin-top: -1px"
                >
                  {{ page.title }}
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


<!--    Everything beneath this is for the hamburger menu (mobile nav-drawe)-->
    <v-app-bar v-if="this.$vuetify.breakpoint.width < 1264" app
               color="primary" elevation="2"
              class="">

      <router-link to="/">
        <v-img src="/Kalipo_logo_512x512.png" max-width="40" max-height="100"></v-img>
      </router-link>
      <div @click="$router.push('/')" class="text-h3 white--text ml-2 v-chip--clickable">Kalipo</div>

      <v-spacer></v-spacer>
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>


    <v-navigation-drawer
      id="navbar-drawer"
      fixed
      v-model="drawer"
      color="primary"
    >


      <template v-slot:prepend class="primary">
        <v-list-item two-line dark class="primary">

          <v-list-item-avatar>
            <v-img src="/Kalipo_logo_512x512.png" max-width="40" max-height="40"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <div class="text-h3 white--text">Kalipo</div>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-list >
        <v-list-item-group>
          <v-list-item v-for="page in navItems" :key="page.title"
                       v-if="!page.hide && (page.showIfUnlocked === unlocked || page.showIfUnlocked === undefined)">

            <v-list-item-title
              class="text-h6 font-weight-medium white--text"
               @click="$router.push(page.to)">
                <v-icon color="white" class="mr-4"> {{page.icon}}</v-icon>
              {{page.title}}
            </v-list-item-title>
          </v-list-item>
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
      drawer: false,
      miniVariant: false,
      selectedItem: 1,
      navItems: [
        {
          icon: "mdi-home-city",
          title: "Home",
          to: "/"
        },
        {
          icon: "mdi-monitor-dashboard",
          title: "Dashboard",
          showIfUnlocked: true,
          to: "/dashboard",
        },
        {
          icon: "mdi-account",
          title: "My profile",
          showIfUnlocked: true,
          to: this.getAccount() ? `/account/${this.getAccount().username}` : "/account"
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
          to: "/autons",
        },
        {
          icon: "mdi-account-multiple",
          title: "Users",
          to: `/users`
        },
        {
          icon: "mdi-account-cog",
          title: "Account settings",
          to: "account_settings",
          hide: true,
          showIfUnlocked: true,
        },
      ],
    };
  },
  created() {
    this.$nuxt.$on("MainMenu-setPage", (page) => this.setMenu(page));
  },
  methods: {
    getAccount() {
      return this.$store.state.wallet.account;
    },

    setMenu(page) {
      if (!this.unlocked) { // unlocked means logged in (probably)
        if (page === "home") {
          this.selectedItem = 0;
        } else if (page === "autons") {
          this.selectedItem = 1;
        } else if (page === "users") {
          this.selectedItem = 2;
        } else {
          this.selectedItem = -1;
        }
      } else {
        console.log(page)
        if (page === "home") {
          this.selectedItem = 0;
        } else if (page === "dashboard") {
          this.selectedItem = 1;
        } else if (page === "my-profile") {
          this.selectedItem = 2;
        } else if (page === "autons") {
          this.selectedItem = 3;
        } else if (page === "users") {
          this.selectedItem = 4;
        } else {
          this.selectedItem = -1;
        }
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
  mounted() {},
};
</script>
