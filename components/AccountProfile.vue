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
    <Keypress key-event="keyup"
              :key-code="13"
              @success="next"
              v-if="valid"
    />

    <v-card width="700">
      <v-card-text>
        <div class="text-h4 primary--text d-flex justify-center mt-2">
          Register your personal profile
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
            Provide your <code>name</code> and an <code>username</code> in order
            to successfully join the Kalipo platform.
          </div>
        </div>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-text>
        <v-form v-model="valid" @submit.prevent>
          <v-row class="register-personal-profile">
            <v-col cols="12" md="6">
              <v-text-field
                v-model="nameInput"
                :rules="[rules.required, rules.min, rules.maxName]"
                counter
                solo
                placeholder="Name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="usernameInput"
                :rules="[
                  rules.required,
                  rules.min,
                  rules.maxUsername,
                  rules.noSpaces,
                ]"
                :error-messages="usernameErrorMessage"
                counter
                solo
                placeholder="Username"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>

        <v-divider class="my-4"></v-divider>
        <v-row>
          <v-col cols="6">
            <v-btn @click="$nuxt.$emit('IAH-showEncryptionPassword')"
              >Go back</v-btn
            >
          </v-col>
          <v-col cols="6">
            <div class="d-flex justify-end">
              <v-btn color="accent" @click="next" :disabled="!valid"
                >Next</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { cryptography, passphrase } from "@liskhq/lisk-client";
export default {
  components: {
    Keypress: () => import('vue-keypress')
  },
  props: ["name", "username", "passphrase", "publicKey", "address"],
  computed: {
    nameInput: {
      get: function () {
        return this.name;
      },
      set: function (newValue) {
        this.$emit("update:name", newValue);
      },
    },
    usernameInput: {
      get: function () {
        return this.username;
      },
      set: function (newValue) {
        this.$emit("update:username", newValue);
      },
    },
  },
  data: () => ({
    valid: false,
    usernameErrorMessage: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 2 || "Min 2 characters",
      maxName: (v) => v.length <= 64 || "Max 64 characters",
      maxUsername: (v) => v.length <= 16 || "Max 16 characters",
      noSpaces: (v) => v.indexOf(" ") == -1 || "Cannot contain any spaces",
    },
  }),
  methods: {
    async next() {
      const existingAccoundIdWrapper = await this.$invoke(
        "kalipoAccount:getAccountIdByUsername",
        {
          username: this.usernameInput,
        }
      );
      
      if (existingAccoundIdWrapper.result !== null) {
        this.usernameErrorMessage = "Username is already taken";
        setTimeout(() => {
          this.usernameErrorMessage = "";
        }, 3000);
      } else {
        $nuxt.$emit("IAH-showEncryptionPin");
      }
    },
  },
};
</script>
<style>
</style>
