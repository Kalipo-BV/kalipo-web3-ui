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
  <div class="">
    <v-card>
      <v-card-text v-if="step == 'invite-attendees'">
        <AutonStepperHeader
          :title="title"
          subtitle="Select profiles you want to invite"
        ></AutonStepperHeader>
        <AutonUserSelect
          :selectedFounderIds.sync="selectedFounderIds"
          class="mt-4"
        ></AutonUserSelect>
      </v-card-text>

      <AccountSign
        :transaction="transaction"
        :uri="uri"
        callback="autonAddStudentBack"
        v-if="step == 'sign'"
        title="Adding members"
      ></AccountSign>

      <v-card-text v-if="step !== 'sign'">
        <div class="d-flex align-right justify-space-between">
          <v-spacer></v-spacer>
          <v-btn color="accent" @click="nextStep">
            next <v-icon class="ml-2" small>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  props: ["autonId", "title"],
  data() {
    return {
      step: "invite-attendees",
      selectedFounderIds: [],
      uri: "",
      transaction: {
        moduleId: 1002,
        assetId: 2,
        assets: {},
      },
    };
  },
  mounted() {
    this.$nuxt.$on("autonAddStudentBack", () => {
      this.step = "invite-attendees";
    });
  },
  methods: {
    prevStep() {
      if (this.step == "") {
        this.step = "select-proposal-type";
      }
    },
    async nextStep() {
      if (this.step == "invite-attendees") {
        this.step = "sign";
      }

      if (this.step == "sign") {
        const autonWrapper = await this.$invoke("auton:getByID", {
          id: this.autonId,
        });

        const auton = autonWrapper.result;

        this.uri = `/auton/${auton.autonProfile.name.replace(" ", "_")}`;

        const asset = {
          receiverAddresses: this.selectedFounderIds,
          autonId: this.autonId,
        };

        this.transaction.assets = asset;
      }
    },
  },
};
</script>
<style lang=""></style>
