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
    <v-card>
      <v-card-title class="text-h5 justify-center grey lighten-2">
        Scan this QR code to check in!
      </v-card-title>

      <qrcode-vue
        class="d-flex justify-center align-center pa-12"
        :value="qrvalue"
        size="250"
        level="H"
      />

      <v-card-actions>
        <v-card-text
          class="
            text-subtitle-2
            d-flex
            justify-center
            mt-n7
            text-decoration-underline
          "
          >Your attendance will only be counted if you scan this
          code!</v-card-text
        >
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import QrcodeVue from "qrcode.vue";
export default {
  components: {
    QrcodeVue,
  },

  props: ["autonId"],
  data() {
    return {
      uri: "",
      qrvalue: "http://www.google.com",
    };
  },
  created() {
    this.createCheckInLink();
  },
  methods: {
    async createCheckInLink() {
      const autonWrapper = await this.$invoke("auton:getByID", {
        id: this.autonId,
      });

      const auton = autonWrapper.result;

      let autonName = auton.autonProfile.name;
      autonName = autonName.replaceAll(/ /g, "_");

      // get the host of the current page via nuxt
      const host = window.location.host;

      this.qrvalue =
        `http://${host}/auton/` + autonName + "?uuid=" + auton.lesson.uuid;
    },
  },
};
</script>
<style lang=""></style>
