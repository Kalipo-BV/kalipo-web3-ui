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
    <Keypress key-event="keyup" :key-code="13" @success="next" v-if="valid" />
    <v-card width="700">
      <v-card-text>
        <div class="text-h4 primary--text d-flex justify-center mt-2">
          Encrypt your passphrase
        </div>
        <div
          class="text-body-1 primary--text d-flex justify-center mt-2 text-center"
        >
          <div style="max-width: 300px">
            Your passphrase is going to be saved in this browser. It needs a
            <code>strong password</code> to protect it with
            <code>AES-256</code> encryption.
          </div>
        </div>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-text>
        <v-form v-model="valid" @submit.prevent>
          <v-text-field
            v-model="passwordInput"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min, rules.max]"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            hint="At least 12 characters"
            counter
            solo
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-form>

        <v-divider class="my-4"></v-divider>
        <v-row>
          <v-col cols="6">
            <v-btn @click="$nuxt.$emit('IAH-showPassphrase')">Go back</v-btn>
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
export default {
  components: {
    Keypress: () => import("vue-keypress"),
  },
  props: ["password"],
  computed: {
    passwordInput: {
      get: function () {
        return this.password;
      },
      set: function (newValue) {
        this.$emit("update:password", newValue);
      },
    },
  },
  data: () => ({
    valid: false,
    show1: false,
    rules: {
      required: (value) => !!value || "Required",
      min: (v) => v.length >= 12 || "Min 12 characters",
      max: (v) => v.length <= 256 || "Max 256 characters",
    },
  }),
  methods: {
    next() {
      $nuxt.$emit("IAH-showProfile");
      // $nuxt.$emit("IAH-storePassword", this.passwordInput);
    },
  },
};
</script>
