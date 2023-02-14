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
        <v-list-item two-line dark class="my-2" >
          <v-list-item-avatar class="v-card--link" @click="$router.push('/')">
            <img src="/Kalipo_Logo_512x512.png" />
          </v-list-item-avatar>

          <v-list-item-content class="v-card--link" @click="$router.push('/')">
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
            <v-list-item
              v-for="page in navItems"
              :key="page.title"
              v-if="
                !page.hide &&
                (page.showIfUnlocked === unlocked ||
                  page.showIfUnlocked === undefined)
              "
              @click="$router.push(page.to)"
              link
            >
              <v-list-item-icon class="pl-1">
                <v-icon color="white">{{ page.icon }}</v-icon>
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
        <SignInButton :account="account"></SignInButton>
      </template>

    </v-navigation-drawer>

    <!--    Everything beneath this is for the hamburger menu (mobile nav-drawe)-->
    <v-app-bar
      v-if="this.$vuetify.breakpoint.width < 1264"
      app
      color="primary"
      elevation="2"
      class=""
    >
      <router-link to="/">
        <v-img
          src="/Kalipo_Logo_512x512.png"
          max-width="40"
          max-height="100"
        ></v-img>
      </router-link>
      <div
        @click="$router.push('/')"
        class="text-h3 white--text ml-2 v-chip--clickable"
      >
        Kalipo
      </div>

      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        color="white"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
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
            <v-img
              src="/Kalipo_Logo_512x512.png"
              max-width="40"
              max-height="40"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <div class="text-h3 white--text">Kalipo</div>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="page in navItems"
            :key="page.title"
            v-if="
              !page.hide &&
              (page.showIfUnlocked === unlocked ||
                page.showIfUnlocked === undefined)
            "
          >
            <v-list-item-title
              class="text-h6 font-weight-medium white--text"
              @click="$router.push(page.to)"
            >
              <v-icon color="white" class="mr-4"> {{ page.icon }}</v-icon>
              {{ page.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <SignInButton :account="account"></SignInButton>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import SignInButton from "~/components/account/SignInButton";
export default {
  components: {SignInButton},
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
          to: "/",
          showIfUnlocked: false,
          selectedItem: 0,
          unlockedSelectedItem: -1,
        },
        {
          icon: "mdi-monitor-dashboard",
          title: "Dashboard",
          showIfUnlocked: true,
          to: "/dashboard",
          selectedItem: null, //dashboard is only visible when logged in
          unlockedSelectedItem: 0,
        },
        {
          icon: "mdi-account",
          title: "My profile",
          showIfUnlocked: true,
          to: this.getAccount()
            ? `/account/${this.getAccount().username}`
            : "/account",
          selectedItem: null, //profile is only visible when logged in
          unlockedSelectedItem: 1,
        },
        {
          icon: "mdi-file-sign",
          title: "Petitions",
          to: "/petitions",
          hide: true,
          selectedItem: -1, // these are yet to be implemented
          unlockedSelectedItem: -1,
        },
        {
          icon: "mdi-web",
          title: "Autons",
          to: "/autons",
          selectedItem: 1,
          unlockedSelectedItem: 2,
        },
        {
          icon: "mdi-account-multiple",
          title: "Users",
          to: `/users`,
          selectedItem: 2,
          unlockedSelectedItem: 3,
        },
        {
          icon: "mdi-account-cog",
          title: "Account settings",
          to: "account_settings",
          hide: true,
          showIfUnlocked: true,
          selectedItem: -1, //yet to be implemented
          unlockedSelectedItem: -1,
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

      // emits for setMenu have to be done in lowercase so that they can match with the title of  navItems
      for (let navItem of this.navItems) {
        if (navItem.title.toLowerCase() === page) {

          if (this.unlocked) {
            this.selectedItem = navItem.unlockedSelectedItem;
          } else {
            this.selectedItem = navItem.selectedItem;
          }

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
