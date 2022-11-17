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
  <v-row align="center" justify="center" style="height: 100%">
    <div>
      <div class="text-h2 mb-2">Manage your account</div>
      <v-card width="400">
        <v-card-text>
          <div class="d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <v-avatar
                color="accent"
                class="white--text text-caption mr-2"
                size="35"
              >
                {{ getInitials(account.name) }}
              </v-avatar>
              <div>
                <div class="text-caption">{{ account.name }}</div>
                <div class="text-caption">@{{ account.username }}</div>
              </div>
            </div>
            <div>
              <v-btn color="accent" @click="lockAccount"
                >Sign out
                <v-icon dark class="ml-2" small>mdi-lock-open</v-icon></v-btn
              >
            </div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-list class="py-0">
          <v-list-item-group color="primary">
            <v-list-item disabled>
              <v-list-item-content>
                <div class="text-body-1">Name</div>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item disabled>
              <v-list-item-content>
                <div class="text-body-1">Username</div>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="$router.push('/account_settings/socials')">
              <v-list-item-content>
                <div class="text-body-1">Socials</div>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
  </v-row>
</template>

<script>
export default {
  computed: {
    account() {
      return this.$store.state.wallet.account;
    },
  },
  mounted() {
    this.$nuxt.$emit("MainMenu-setPage", "account_settings");
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
    lockAccount() {
      this.$store.commit("wallet/lock");
      this.$router.push("/wallet");
    },
  },
};
</script>

<style>
</style>