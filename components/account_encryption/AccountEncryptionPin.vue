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
    <v-card width="700">
      <v-card-text>
        <div class="text-h4 primary--text d-flex justify-center mt-2">
          Provide a PIN
        </div>
        <div
          class="
            text-body-1
            primary--text
            d-flex
            justify-center
            mt-2
            text-center
          "
        >
          <div style="max-width: 300px">
            Your passphrase is also protected by a PIN. This PIN is used to sign
            all transactions.
          </div>
        </div>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-text>
        <v-otp-input
          v-model="pinInput"
          :type="show ? 'text' : 'password'"
          length="6"
        ></v-otp-input>
        <div class="d-flex justify-center">
          <v-btn @click="show = !show"
            ><v-icon v-text="show ? 'mdi-eye' : 'mdi-eye-off'"></v-icon
          ></v-btn>
        </div>

        <v-divider class="my-4"></v-divider>
        <v-row>
          <v-col cols="6">
            <v-btn @click="$nuxt.$emit('IAH-showProfile')">Go back</v-btn>
          </v-col>
          <v-col cols="6">
            <div class="d-flex justify-end">
              <v-btn
                color="accent"
                @click="create"
                :disabled="pinInput.length !== 6"
                >Create</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  props: ["pin"],
  computed: {
    pinInput: {
      get: function () {
        return this.pin;
      },
      set: function (newValue) {
        this.$emit("update:pin", newValue);
      },
    },
  },
  data: () => ({
    show: false,
  }),
  methods: {
    create() {
      // $nuxt.$emit("IAH-showSelectionAndCreateAccount");
      $nuxt.$emit("IAH-showCreation");
    },
  },
};
</script>
