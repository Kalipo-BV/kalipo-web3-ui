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
      <v-card-text v-if="step == 0">
        <AutonStepperHeader
          title="Issue a poa"
          subtitle="Choose a poa which is available to issue"
        ></AutonStepperHeader>

        <AvailablePoasIssue
          v-if="!isFetching"
          :poas="auton.poas"
          :member="member"
          :selected.sync="selected"
        ></AvailablePoasIssue>
      </v-card-text>

      <AccountSign
        :transaction="transaction"
        v-if="step == 1"
        :uri="uri"
        title="Issuing a poa"
      ></AccountSign>

      <v-divider v-if="step !== 1"></v-divider>

      <v-card-text v-if="step !== 1">
        <div class="d-flex align-center justify-space-between">
          <v-spacer></v-spacer>
          <v-btn color="accent" v-if="step == 0" @click="nextStep">
            sign <v-icon class="ml-2" small>mdi-draw-pen</v-icon>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import AvailablePoasIssue from "./AvailablePoasIssue.vue";
export default {
  components: {
    AvailablePoasIssue,
  },
  props: {
    member: Object,
    autonId: String,
  },
  data() {
    return {
      step: 0,
      name: null,
      image: null,
      selected: null,
      uri: "",
      isFetching: true,
      transaction: {
        moduleId: 1009,
        assetId: 0,
        assets: {},
      },
      auton: null,
    };
  },
  async mounted() {
    const autonWrapper = await this.$invoke("auton:getByID", {
      id: this.autonId,
    });
    this.auton = autonWrapper.result;
    this.isFetching = false;
  },
  computed: {},
  methods: {
    async nextStep() {
      this.step++;

      if (this.step == 1) {
        this.uri = `/auton/${this.auton.autonProfile.name.replace(
          " ",
          "_"
        )}/poas`;

        const poaIds = [];

        for (let i = 0; i < this.selected.length; i++) {
          poaIds.push(this.selected[i].id);
        }

        const asset = {
          receiverAddress: this.member.accountId,
          poaIds: poaIds,
        };

        this.transaction.assets = asset;
      }
    },
  },
};
</script>
