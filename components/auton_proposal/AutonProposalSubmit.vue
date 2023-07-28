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
      <v-card-text v-if="step == 'select-proposal-type'">
        <AutonStepperHeader
          title="Submitting a new proposal"
          subtitle="First choose the desired type that suits your proposal"
        ></AutonStepperHeader>

        <AutonSelectProposalType
          :selectedProposalType.sync="selectedProposalType"
        ></AutonSelectProposalType>
      </v-card-text>

      <v-card-text v-if="step == 'proposal-profile'">
        <AutonStepperHeader
          title="Submitting a new proposal"
          subtitle="Describe your proposal by providing a title and description"
        ></AutonStepperHeader>

        <AutonProposalProfile
          :disabledNext.sync="disabledNext"
          :title.sync="proposalTitle"
          :description.sync="proposalDescription"
        ></AutonProposalProfile>
      </v-card-text>

      <v-card-text v-if="step == 'membership-invitation'">
        <AutonStepperHeader
          title="Submitting a new proposal"
          subtitle="Please select the user you'd like to invite and supply an invitation message"
        ></AutonStepperHeader>

        <AutonProposalMembershipInvitation
          :selectedAccountId.sync="selectedAccountId"
          :invitationMessage.sync="invitationMessage"
          class="mt-4"
          :autonId="autonId"
        ></AutonProposalMembershipInvitation>
      </v-card-text>

      <AutonCreate
        v-if="step == 'auton-creation'"
        :autonCreationArguments.sync="autonCreationArguments"
        :parentPrev="prevStep"
        :parentNext="nextStep"
      ></AutonCreate>

      <TermsAndConditionsCreate
        v-if="step == 'terms-and-conditions'"
      ></TermsAndConditionsCreate>

      <ProposalParameterSettingsEdit
        v-if="step == 'proposal-type-bill'"
        @prevStep="prevStep"
        @nextStep="nextStep"
      ></ProposalParameterSettingsEdit>

      <AccountSign
        :transaction="transaction"
        :uri="uri"
        callback="AutonProposalSubmit-PrevStep"
        callbackFinish="AutonProposalSubmit-Finish"
        v-if="step == 'sign'"
        title="Submitting proposal"
      ></AccountSign>

      <v-card-text
        v-if="
          step !== 'sign' &&
          step != 'auton-creation' &&
          step != 'terms-and-conditions' &&
          !hideNavigation
        "
      >
        <div class="d-flex align-center justify-space-between">
          <v-btn :disabled="step == 0" @click="prevStep">
            <v-icon class="mr-2" small>mdi-arrow-left</v-icon> previous
          </v-btn>
          <v-btn
            color="accent"
            @click="nextStep"
            :disabled="disabledNext || selectedProposalType == null"
          >
            next <v-icon class="ml-2" small>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  props: ["autonId", "daoName", "autonName", "callbackFinish"],
  data: () => ({
    step: "select-proposal-type",
    disabledNext: false,
    selectedProposalType: null,
    selectedAccountId: null,
    invitationMessage: "",
    proposalTitle: "",
    proposalDescription: "",
    autonCreationArguments: null,
    hideNavigation: false,
    uri: "",
    transaction: {
      moduleId: -1,
      assetId: 0,
      assets: {},
    },
  }),
  created() {
    this.$nuxt.$on(
      "AutonProposalSubmit-NextDisabled",
      ($event) => (this.disabledNext = $event)
    );
    this.$nuxt.$on("AutonProposalSubmit-PrevStep", ($event) => this.prevStep());
    this.$nuxt.$on("AutonProposalSubmit-Finish", ($event) => this.finish());
    this.$nuxt.$on("AutonProposalSubmit-HideNavigation", ($event) => {
      this.hideNavigation = $event;
    });
  },
  methods: {
    prevStep() {
      if (this.step == "proposal-profile") {
        this.step = "select-proposal-type";
      } else if (this.step == "membership-invitation") {
        this.step = "proposal-profile";
      } else if (this.step == "auton-creation") {
        this.step = "proposal-profile";
      } else if (this.step == "terms-and-conditions") {
        this.step = "proposal-profile";
      } else if (this.step == "proposal-type-bill") {
        this.step = "proposal-profile";
        this.hideNavigation = false;
      } else if (this.step == "sign") {
        if (this.selectedProposalType == "membership-invitation") {
          this.step = "membership-invitation";
        } else if (this.selectedProposalType == "auton-creation") {
          this.step = "auton-creation";
        } else if (this.selectedProposalType == "terms-and-conditions") {
          this.step = "terms-and-conditions";
        }
      }
    },
    finish() {
      if (this.callbackFinish) {
        this.$nuxt.$emit(this.callbackFinish, true);

        this.step = "select-proposal-type";
        this.disabledNext = false;
        this.selectedProposalType = null;
        this.selectedAccountId = null;
        this.invitationMessage = "";
        this.proposalTitle = "";
        this.proposalDescription = "";
        (this.uri = ""),
          (this.transaction = {
            moduleId: -1,
            assetId: 0,
            assets: {},
          });
      }
    },
    async nextStep() {
      console.log(this.selectedProposalType);
      if (this.step == "select-proposal-type") {
        this.step = "proposal-profile";
      } else if (this.step == "proposal-profile") {
        if (this.selectedProposalType == "membership-invitation") {
          this.step = "membership-invitation";
        } else if (this.selectedProposalType == "auton-creation") {
          this.step = "auton-creation";
        } else if (this.selectedProposalType == "terms-and-conditions") {
          this.step = "terms-and-conditions";
        } else if (this.selectedProposalType == "proposal-type-bill") {
          this.step = "proposal-type-bill";
          this.hideNavigation = true;
        }
      } else if (
        this.step == "membership-invitation" ||
        this.step == "auton-creation" ||
        this.step == "terms-and-conditions"
      ) {
        this.step = "sign";
      }

      // The transaction prop interface:
      // {
      //   moduleId: 0,
      //   assetId: 0,
      //   assets: {};
      // }
      if (this.step == "sign") {
        const autonWrapper = await this.$invoke("auton:getByID", {
          id: this.autonId,
        });
        this.uri = `/dao/${this.daoName.replace(
          " ",
          "_"
        )}/auton/${this.autonName.replace(" ", "_")}/proposal/${
          autonWrapper.result.proposals.length + 1
        }/campaigning`;

        if (this.selectedProposalType == "membership-invitation") {
          const asset = {
            title: this.proposalTitle,
            campaignComment: this.proposalDescription,
            proposalType: this.selectedProposalType,
            autonId: this.autonId,
            accountIdToInvite: this.selectedAccountId,
            invitationMessage: this.invitationMessage,
          };
          this.transaction.moduleId = 1004;
          this.transaction.assetId = 0;
          this.transaction.assets = asset;
        } else if (this.selectedProposalType == "auton-creation") {
          const asset = {
            title: this.proposalTitle,
            campaignComment: this.proposalDescription,
            proposalType: this.selectedProposalType,
            autonId: this.autonId,
            autonCreationArguments: this.autonCreationArguments,
          };
          this.transaction.moduleId = 1004;
          this.transaction.assetId = 1;
          this.transaction.assets = asset;
        }
      }
    },
  },
};
</script>
<style></style>
