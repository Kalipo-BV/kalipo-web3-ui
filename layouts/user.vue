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
  <v-app id="user-layout">

    <v-main class="primary">
      <v-toolbar v-if="xs||sm" elevation="0">
        <v-spacer></v-spacer>
        <v-btn class="white" elevation="0" v-if="xs||sm" @click="open=!open">
          <v-icon>
            mdi-menu
          </v-icon>
        </v-btn>
      </v-toolbar>
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

          <template v-slot:extension>
            <v-row>
              <v-container
                ><v-tabs>
                  <v-tabs-slider color="primary"></v-tabs-slider>

                  <v-tab v-for="(item, idx) in tabItems" :key="idx">
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
    <MainMenu
      :open.sync="open"
    ></MainMenu>
  </v-app>
</template>

<script>
export default {
  computed: {
    account() {
      return this.$store.state.wallet.account;
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
      open: false,
      miniVariant: false,
      selectedItem: 0,
      tabItems: [
        {
          icon: "mdi-monitor-dashboard",
          title: "Dashboard",
          to: "/",
        },
      ],
    };
  },
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
  },
};
</script>
<style>
</style>
