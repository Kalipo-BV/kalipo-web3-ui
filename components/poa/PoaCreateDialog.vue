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
<template lang="">
  <div>
    <v-card>
      <v-card-text v-if="step == 0">
        <AutonStepperHeader
          title="Creating a new poa template"
          subtitle="First choose a name and static image id"
        ></AutonStepperHeader>

        <PoaNameImage :name.sync="name" :image.sync="image"></PoaNameImage>
      </v-card-text>

      <AccountSign
        :transaction="transaction"
        v-if="step == 1"
        :uri="uri"
        title="Creating poa template"
      ></AccountSign>

      <v-divider v-if="step !== 1"></v-divider>

      <v-card-text v-if="step !== 1">
        <div class="d-flex align-center justify-space-between">
          <v-btn :disabled="step == 0" @click="step--">
            <v-icon class="mr-2" small>mdi-arrow-left</v-icon> previous
          </v-btn>
          <v-btn color="accent" v-if="step == 0" @click="nextStep">
            sign <v-icon class="ml-2" small>mdi-draw-pen</v-icon>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    autonId: String,
    auton: Object,
  },
  data() {
    return {
      step: 0,
      name: null,
      image: null,
      uri: "",

      transaction: {
        moduleId: 1008,
        assetId: 0,
        assets: {},
      },
    };
  },
  mounted() {},
  computed: {},
  methods: {
    nextStep() {
      this.step++;

      if (this.step == 1) {
        this.uri = `/auton/${this.auton.autonProfile.name.replace(" ", "_")}/`;

        const asset = {
          autonId: this.autonId,
          name: this.name,
          staticImageId: this.image,
        };

        this.transaction.assets = asset;
      }
    },
  },
};
</script>
