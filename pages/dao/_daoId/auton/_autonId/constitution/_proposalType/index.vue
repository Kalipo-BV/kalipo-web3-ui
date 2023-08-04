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
    <v-container>
      <v-row class="">
        <v-col cols="12" md="7">
          <div class="d-flex align-center">
            <v-btn
              fab
              x-small
              class="ml-xl-n16"
              absolute
              @click="$router.go(-1)"
              ><v-icon>mdi-arrow-left</v-icon></v-btn
            >
            <div class="ml-12 ml-xl-0">
              <div class="text-h6 primary--text">Proposal type</div>
              <div class="text-h4 primary--text">{{ proposalType }}</div>
            </div>
          </div>
          <v-divider class="my-4"></v-divider>
          <ProposalParameterSettings
            :mandatoryAttendence.sync="mandatoryAttendence"
            :acceptence.sync="acceptence"
            :dialogWindow.sync="dialogWindow"
            :votingWindow.sync="votingWindow"
            :executeWhenFinal.sync="executeWhenFinal"
          ></ProposalParameterSettings>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  layout: "auton",
  data: () => ({
    selected: 0,
    slider: 45,
    executeWhenFinal: false,
    autondId: null,
    auton: null,
    proposalType: null,
    acceptence: 0,
    mandatoryAttendence: 0,
    dialogWindow: 1,
    votingWindow: 1,
    execAfterEnd: false,
  }),
  async mounted() {
    this.$nuxt.$emit("Auton-setPage", "constitution");

    const autonIdParam = this.$route.params.autonId.replaceAll("_", " ");
    this.proposalType = this.$route.params.proposalType;

    const autonIdWrapper = await this.$invoke("auton:getAutonIdByName", {
      name: autonIdParam,
    });

    this.autondId = autonIdWrapper.result.id;
    const autonWrapper = await this.$invoke("auton:getByID", {
      id: autonIdWrapper.result.id,
    });
    this.auton = autonWrapper.result;
    console.log(this.auton);

    let provisionId = null;
    for (let index = 0; index < this.auton.constitution.length; index++) {
      const proposalTypeWrapper = this.auton.constitution[index];
      if (
        this.proposalType == proposalTypeWrapper.type &&
        proposalTypeWrapper.provisions.length > 0
      ) {
        provisionId =
          proposalTypeWrapper.provisions[
            proposalTypeWrapper.provisions.length - 1
          ];
      }
    }
    if (provisionId != null) {
      const provisionWrapper = await this.$invoke("auton:getProvisionByID", {
        id: provisionId,
      });
      this.acceptence = provisionWrapper.result.acceptance;
      this.mandatoryAttendence = provisionWrapper.result.attendance;
      if (provisionWrapper.result.campaigning == 0) {
        this.dialogWindow = 0;
      } else {
        this.dialogWindow = Number(
          Math.ceil(provisionWrapper.result.campaigning / 60 / 24)
        );
      }
      this.votingWindow = Number(
        Math.ceil(provisionWrapper.result.votingWindow / 60 / 24)
      );
      this.executeWhenFinal = !provisionWrapper.result.execAfterEnd;
    }
  },
};
</script>
<style>
.percentage-votes .v-slider__thumb-label {
  height: 0px !important;
}
</style>