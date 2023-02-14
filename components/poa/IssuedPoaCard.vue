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
    <v-card color="white" @click.stop="dialog = true">
      <v-img :src="getImage(poa.staticImageId)" height="200px"></v-img>
      <v-card-title class="black--text">{{ poa.name }}</v-card-title>
      <v-card-text>
        <v-row class="mx-0 mb-2" v-if="!isFetching">
          <div class="d-flex align-start">
            This POA was created during {{ auton.autonProfile.name }}!
            <v-icon small class="mr-2 pl-5">{{ "mdi-trophy" }}</v-icon>
          </div>
        </v-row>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
    </v-card>

    <v-dialog v-model="dialog" width="550">
      <v-card>
        <v-card-title class="text-h5 white--text primary">
          <span class="ml-4">POA information</span>
          <v-spacer></v-spacer>
          <v-icon class="white--text">{{ "mdi-trophy" }}</v-icon>
        </v-card-title>

        <div class="ml-5 mr-12">
          <v-card-text>
            <v-icon>mdi-folder-text</v-icon>
            <span class="ml-2">Name:</span>
            <span class="float-right">{{ poa.name }}</span>
          </v-card-text>
        </div>
        <v-divider></v-divider>
        <div class="ml-5 mr-12">
          <v-card-text>
            <v-icon>mdi-clipboard-text-clock</v-icon>
            <span class="ml-2">Issue date:</span>
            <span class="float-right">{{ issueDate }}</span>
          </v-card-text>
        </div>
        <v-divider></v-divider>
        <div class="ml-5 mr-12">
          <v-card-text>
            <v-icon>mdi-image</v-icon>
            <span class="ml-2">Image URL:</span>
            <a
              class="float-right"
              target="_blank"
              :href="getImage(poa.staticImageId)"
              >Link to image</a
            >
          </v-card-text>
        </div>
        <v-divider></v-divider>
        <div class="ml-5 mr-12">
          <v-card-text>
            <v-icon>mdi-calendar</v-icon>
            <span class="ml-2">Origin:</span>
            <a
              class="float-right"
              style="text-decoration: underline"
              v-if="!isFetching"
              @click="$router.push(`/auton/${auton.autonProfile.name}`)"
              >{{ auton.autonProfile.name }}</a
            >
          </v-card-text>
        </div>
        <v-divider></v-divider>
        <div class="ml-5 mr-12">
          <v-card-text>
            <v-icon>mdi-crown</v-icon>
            <span class="ml-2">Owner:</span>
            <a
              class="float-right"
              style="text-decoration: underline"
              v-if="!isFetching"
              @click="$router.push(`/account/${account.name}`)"
              >{{ account.name }}</a
            >
          </v-card-text>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn class="ml-1" color="primary" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "IssuedPoaCard",
  props: {
    poa: Object,
  },
  data() {
    return {
      dialog: false,
      auton: {},
      account: {},
      issueDate: "",
      isFetching: true,
    };
  },
  async beforeMount() {
    const autonWrapper = await this.$invoke("auton:getByID", {
      id: this.poa.autonId,
    });

    this.auton = autonWrapper.result;

    const accountWrapper = await this.$invoke("kalipoAccount:getByID", {
      id: this.poa.accountId,
    });

    this.account = accountWrapper.result;

    const date = new Date(parseInt(this.poa.issueDate));

    this.issueDate =
      date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

    this.isFetching = false;
  },
  methods: {
    getImage(id) {
      return `/poa_images/${id}.png`;
    },
  },
};
</script>
<style scoped></style>
