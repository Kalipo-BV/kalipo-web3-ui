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
    <div v-if="step == 0">
      <v-card-text>
        <AutonStepperHeader
          title="Bill to change propsal type settings"
          subtitle="Select proposal type"
        >
        </AutonStepperHeader>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <ProposalTypeList
          :selectedProposalType.sync="transaction.assets.proposalType"
        ></ProposalTypeList>
      </v-card-text>
    </div>

    <div v-if="step == 1">
      <v-card-text>
        <AutonStepperHeader
          title="Bill to change propsal type settings"
          subtitle="Edit proposal type"
        >
        </AutonStepperHeader>
      </v-card-text>
      <v-divider></v-divider>
      <ProposalParameterSettings
        class="mt-1"
        editMode="true"
        :mandatoryAttendence.sync="transaction.assets.mandatoryAttendence"
        :acceptence.sync="transaction.assets.acceptence"
        :dialogWindow.sync="dialogWindow"
        :votingWindow.sync="votingWindow"
        :executeWhenFinal.sync="transaction.assets.executeWhenFinal"
      ></ProposalParameterSettings>
    </div>

    <AccountSign
      :transaction="transaction"
      :uri="uri"
      callback="ProposalParameterSettings-PrevStep"
      callbackFinish="ProposalParameterSettings-Finish"
      v-if="step == 2"
      title="Submitting new parameters"
    ></AccountSign>

    <v-divider></v-divider>

    <v-card-text v-if="step !== 2 && !hideNavigation">
      <div class="d-flex align-center justify-space-between">
        <v-btn @click="prevStep">
          <v-icon class="mr-2" small>mdi-arrow-left</v-icon> previous
        </v-btn>
        <v-btn
          color="accent"
          @click="nextStep"
          :disabled="transaction.assets.proposalType == null"
        >
          next <v-icon class="ml-2" small>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </v-card-text>
  </div>
</template>

<script>
export default {
  data: () => ({
    step: 0,
    hideNavigation: false,
    auton: null,
    uri: "",
    dialogWindow: 1,
    votingWindow: 1,
    transaction: {
      moduleId: 1004,
      assetId: 3,
      assets: {
        autonId: null,
        proposalType: null,
        mandatoryAttendence: 0,
        acceptence: 0,
        dialogWindow: 1,
        votingWindow: 1,
        executeWhenFinal: false,
      },
    },
  }),
  created() {
    this.$nuxt.$on("ProposalParameterSettings-PrevStep", ($event) =>
      this.prevStep()
    );
    // this.$nuxt.$on("ProposalParameterSettings-Finish", ($event) => console.log(this.finish()));
  },
  async mounted() {
    const autonIdParam = this.$route.params.autonId.replaceAll("_", " ");

    const autonIdWrapper = await this.$invoke("auton:getAutonIdByName", {
      name: autonIdParam,
    });
    this.transaction.assets.autonId = autonIdWrapper.result.id;

    const autonWrapper = await this.$invoke("auton:getByID", {
      id: this.transaction.assets.autonId,
    });
    this.auton = autonWrapper.result;
  },
  methods: {
    prevStep() {
      if (this.step <= 0) {
        this.$emit("prevStep");
        this.step = 0;
      }
      this.step--;
    },
    async nextStep() {
      if (this.step == 0) {
        if (this.auton) {
          let foundProvisionId = null;
          for (let index = 0; index < this.auton.constitution.length; index++) {
            const proposalTypeWrapper = this.auton.constitution[index];
            console.log("proposalTypeWrapper");
            console.log(proposalTypeWrapper);
            if (
              proposalTypeWrapper.type ==
                this.transaction.assets.proposalType &&
              proposalTypeWrapper.provisions.length > 0
            ) {
              foundProvisionId =
                proposalTypeWrapper.provisions[
                  proposalTypeWrapper.provisions.length - 1
                ];
            }
          }

          if (foundProvisionId != null) {
            console.log("foundProvisionId");
            console.log(foundProvisionId);
            const provisionWrapper = await this.$invoke(
              "auton:getProvisionByID",
              {
                id: foundProvisionId,
              }
            );
            console.log(provisionWrapper);
            this.transaction.assets.acceptence =
              provisionWrapper.result.acceptance;
            this.transaction.assets.mandatoryAttendence =
              provisionWrapper.result.attendance;
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
            this.transaction.assets.executeWhenFinal =
              !provisionWrapper.result.execAfterEnd;
          } else {
            console.log("Proposal type & Provision not found");
            this.transaction.assets.acceptence = 1;
            this.transaction.assets.mandatoryAttendence = 1;

            this.transaction.assets.dialogWindow = 0;
            this.transaction.assets.votingWindow = 1;
            this.transaction.assets.executeWhenFinal = false;
          }
        }
      }
      if (this.step == "1") {
        this.transaction.assets.dialogWindow = this.dialogWindow * 60 * 24;
        this.transaction.assets.votingWindow = this.votingWindow * 60 * 24;
      }
      this.step++;
    },
  },
};
</script>

<style>
</style>