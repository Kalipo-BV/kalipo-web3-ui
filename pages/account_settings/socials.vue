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
      <div class="text-h2 mb-2">Manage your socials</div>
      <v-card width="400" v-if="renderComponent">
        <v-card-text>
          <v-row v-for="(social, i) in socials" :key="i" class="my-0" dense>
            <v-col class="d-flex" cols="5" sm="4">
              <v-select
                :items="socialTypes"
                label="Social"
                solo
                v-model="social.social"
                hide-details
              ></v-select>
            </v-col>

            <v-col class="d-flex align-center" cols="7" sm="8">
              <v-text-field
                label="Link"
                placeholder="https://"
                solo
                v-model="social.link"
                hide-details
              ></v-text-field>
              <v-btn
                fab
                small
                class="ml-2"
                color="error"
                outlined
                @click="deleteSocial(i)"
                ><v-icon dark>mdi-delete</v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          <div class="d-flex justify-space-between align-ceneter">
            <v-btn @click="$router.push('/account_settings/')"
              ><v-icon small class="pr-2">mdi-arrow-left</v-icon> Back</v-btn
            >
            <v-btn color="accent" @click="update">Update</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <v-dialog v-model="dialog" max-width="500">
      <GenericTransaction
        title="Changing account socials"
        subtitle="You are about to change your public socials"
        actionText="Your account will have"
        :chipText="chipText"
        :uri="uri"
        :transaction="transaction"
      ></GenericTransaction>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  computed: {
    account() {
      return this.$store.state.wallet.account;
    },
  },
  data: () => ({
    dialog: false,
    renderComponent: true,
    socialTypes: [
      "LinkedIn",
      "Twitter",
      "Discord",
      "Facebook",
      "Youtube",
      "Google",
    ],
    uri: "/dashboard",
    transaction: {
      moduleId: 1001,
      assetId: 4,
      assets: {
        socials: null,
      },
    },
    chipText: "",
    socials: [{ social: "", link: "" }],
  }),
  watch: {
    socials: {
      handler(val) {
        const latestEntry = val[val.length - 1];
        if (
          latestEntry.social.length > 0 &&
          latestEntry.link.length > 0 &&
          val.length < 5
        ) {
          this.socials.push({ social: "", link: "" });
        }
      },
      deep: true,
    },
  },
  async mounted() {
    this.$nuxt.$emit("MainMenu-setPage", "account_settings");

    const accountWrapper = await this.$invoke("kalipoAccount:getByID", {
      id: this.account.accountId,
    });

    const account = accountWrapper.result;
    if (account.socials.length > 0) {
      this.socials = account.socials;
    }
    
  },
  methods: {
    update() {
      this.transaction.assets.socials = [];
      for (let index = 0; index < this.socials.length; index++) {
        const social = this.socials[index];
        if (social.social.length > 0 && social.link.length > 0) {
          this.transaction.assets.socials.push(social);
        }
      }
      this.chipText = this.transaction.assets.socials.length + " social";
      if (this.transaction.assets.socials.length != 1) {
        this.chipText += "s";
      }
      this.dialog = true;
    },
    deleteSocial(index) {
      if (index == 0) {
        this.socials[index] = { social: "", link: "" };
      } else {
        this.socials.splice(index, 1);
      }
      this.forceRerender();
    },
    forceRerender() {
      // Remove my-component from the DOM
      this.renderComponent = false;

      // If you like promises better you can
      // also use nextTick this way
      this.$nextTick().then(() => {
        // Add the component back in
        this.renderComponent = true;
      });
    },
  },
};
</script>

<style>
</style>
