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
    <v-card width="400">
      <v-card-text>
        <div class="d-flex justify-space-between align-center">
          <div class="text-h4 primary--text">Kalipo Accounts</div>
          <div>
            <v-btn
              color="accent"
              @click="$nuxt.$emit('IAH-showChooseOperation')"
              >Add to this device
              <v-icon dark class="" small>mdi-plus</v-icon></v-btn
            >
          </div>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-list class="py-0">
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, publicKey, i) in accountsValue"
            :key="i"
            @click="$nuxt.$emit('IAH-showUnlock', publicKey)"
          >
            <v-avatar
              color="primary"
              class="white--text text-caption mr-2"
              size="35"
            >
              {{ getInitials(item.name) }}
            </v-avatar>
            <v-list-item-content>
              <div class="text-caption" v-text="item.name"></div>
              <div class="text-caption">@{{ item.username }}</div>
            </v-list-item-content>

            <v-list-item-action>
              <div class="d-flex align-center">
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="accent"
                      class="mr-1"
                      fab
                      x-small
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      ><v-icon>mdi-cog</v-icon></v-btn
                    >
                  </template>
                  <v-list>
                    <v-list-item
                      @click="$nuxt.$emit('IAH-changePassword', publicKey)"
                    >
                      <v-list-item-title>Change password</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      @click="$nuxt.$emit('IAH-changePin', publicKey)"
                    >
                      <v-list-item-title>Change PIN</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      @click="$nuxt.$emit('IAH-deleteAccount', publicKey)"
                    >
                      <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-progress-linear
        indeterminate
        color="accent"
        v-if="progress"
      ></v-progress-linear>
    </v-card>
  </div>
</template>
<script>
export default {
  props: ["accounts", "progress"],
  computed: {
    accountsValue: {
      get: function () {
        return this.accounts;
      },
      set: function (newValue) {
        this.$emit("update:accounts", newValue);
      },
    },
  },
  data: () => ({}),
  methods: {
    getInitials(parseStr) {
      if (parseStr != undefined) {
        const nameList = parseStr.split(" ");
        let result = "";
        for (let index = 0; index < nameList.length; index++) {
          if (index < 3) {
            const element = nameList[index];
            if (!element) break // if value is empty it gets skipped

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
