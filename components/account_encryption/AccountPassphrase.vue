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

<template >

  <v-container >

    <!--    Key code 13 is Enter key-->
      <Keypress key-event="keyup"
                :key-code="13"
                @success="$nuxt.$emit('IAH-showEncryptionPassword')"
      />
    <v-card width="700" >
      <v-btn
        fab
        outlined
        absolute
        x-small
        right
        class="mt-3 mr-n1"
        @click="$nuxt.$emit('IAH-showChooseOperation')"
      ><v-icon>mdi-close</v-icon></v-btn
      >
      <v-card-text>
        <div class="text-h4 primary--text d-flex justify-center mt-2">
          Creating a new account
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
            This is your <code>passphrase</code> it resembles your private key.
            Please carefully write down these 12 words and store them in a safe
            place.
          </div>
        </div>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-text>
        <v-row class="passphrase">
          <v-col cols="4" md="2" v-for="(word, index) in words" :key="index">
            <v-text-field
              filled
              :label="index + 1 + '.'"
              disabled
              v-model="words[index]"
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="d-flex justify-center mt-6">
          <v-btn @click="copy"
            >Copy <v-icon small class="ml-1">mdi-content-copy</v-icon></v-btn
          >
        </div>

        <v-divider class="my-4"></v-divider>
        <v-btn
          block
          color="accent"
          @click="$nuxt.$emit('IAH-showEncryptionPassword')"
          >I saved this key somewhere safe</v-btn
        >
      </v-card-text>
    </v-card>
  </v-container>

</template>
<script>
export default {
  props: ["passphrase"],
  components: {
    Keypress: () => import("vue-keypress"),
  },
  data() {
    return {
      words: [],
    };
  },
  mounted: function () {
    this.words = this.passphrase.split(" ");
  },
  methods: {
    async copy() {
      try {
        let pass = "";
        for (let index = 0; index < this.words.length; index++) {
          const element = this.words[index];
          pass += element;
          if (index + 1 < this.words.length) {
            pass += " ";
          }
        }

        await navigator.clipboard.writeText(pass);
        alert("Copied");
      } catch ($e) {
        alert("Cannot copy");
      }
    },
  },
};
</script>
<style>
.passphrase .v-text-field__details {
  display: none;
}
.passphrase .v-input__slot {
  margin-bottom: 0px;
}
</style>
