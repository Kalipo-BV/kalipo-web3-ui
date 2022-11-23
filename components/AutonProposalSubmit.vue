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

      <!-- ADDED STUF -->
      <v-card-text v-if="step == 'yes-no'">
        <AutonStepperHeader
          title="Creating a poll"
          subtitle="Give us your title and describe why you're creating a poll"
        ></AutonStepperHeader>

<!--        :selectedAccountId.sync="selectedAccountId"-->
<!--        :invitationMessage.sync="invitationMessage"-->
<!--        class="mt-4"-->
<!--        :autonId="autonId"-->
        <ProposalChoicesOverview

        ></ProposalChoicesOverview>
      </v-card-text>

      <v-card-text v-if="step == 'multi-choice'">
        <AutonStepperHeader
          title="Creating a poll"
          subtitle="Give us your title and describe why you're creating a poll"
        ></AutonStepperHeader>

        <AutonProposalMultiChoice
          :statementMessage.sync="statementMessage"
          :addedValueMessage.sync="addedValueMessage"
          :descriptionMessage.sync="descriptionMessage"
          class="mt-4"
          :autonId="autonId"
        ></AutonProposalMultiChoice>
      </v-card-text>

      <v-card-text v-if="step == 'parameter'">
        <AutonStepperHeader
          title="Parameters"
          subtitle="These are the parameters for your poll"
        ></AutonStepperHeader>

        <AutonProposalParameter
          class="mt-4"
          :autonId="autonId"
          :selectedProposalType = "selectedProposalType"
        ></AutonProposalParameter>
      </v-card-text>

      <v-card-text v-if="step == 'choices'">
        <AutonStepperHeader
          title="Multiple choice"
          subtitle="Give a clear description of your choices"
        ></AutonStepperHeader>

        <AutonProposalChoices
          class="mt-4"
          :autonId="autonId"
          :selectedProposalType = "selectedProposalType"
          @data:choices="getChoicesMessage"
        ></AutonProposalChoices>
      </v-card-text>

      <AccountSign
        :transaction="transaction"
        :uri="uri"
        callback="AutonProposalSubmit-PrevStep"
        callbackFinish="AutonProposalSubmit-Finish"
        v-if="step == 'sign'"
        title="Submitting proposal"
      ></AccountSign>

      <v-card-text v-if="step !== 'sign'">
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
    props: ["autonId", "autonName", "callbackFinish"],
    data: () => ({
        step: "select-proposal-type",
        disabledNext: false,
        selectedProposalType: null,
        selectedAccountId: null,
        invitationMessage: "",
        statementMessage: "",
        addedValueMessage: "",
        descriptionMessage: "",
        proposalTitle: "",
        proposalDescription: "",
        choicesMessage: "",
        uri: "",
        transaction: {
            moduleId: -1,
            assetId: 0,
            assets: {},
        },
    }),
    created() {
        this.$nuxt.$on("AutonProposalSubmit-NextDisabled", ($event) => (this.disabledNext = $event));
        this.$nuxt.$on("AutonProposalSubmit-PrevStep", ($event) => this.prevStep());
        this.$nuxt.$on("AutonProposalSubmit-Finish", ($event) => this.finish());
    },
    methods: {

      getChoicesMessage(value) {
        this.choicesMessage = value;
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
          this.statementMessage =  "";
          this.addedValueMessage =  "";
          this.descriptionMessage = "";
          (this.uri = ""),
            (this.transaction = {
              moduleId: -1,
              assetId: 0,
              assets: {},
            });
        }
      },

      prevStep() {
          if (this.step == "proposal-profile" || this.step == "parameter") {
            this.step = "select-proposal-type";
          }
          else if (this.step == "membership-invitation" && this.selectedProposalType == "membership-invitation") {
            this.step = "proposal-profile";
          }
          else if (this.step == "sign" && this.selectedProposalType == "membership-invitation") {
            this.step = "membership-invitation";
          }
          else if (this.step == "yes-no" && this.selectedProposalType == "yes-no") {
            this.step = "parameter";
          }
          else if (this.step == "choices" && this.selectedProposalType == "yes-no") {
            this.step = "yes-no"
          }
          else if (this.step == "multi-choice" && this.selectedProposalType == "multi-choice"){
            this.step = "parameter";
          }
          else if (this.step == "choices" && this.selectedProposalType == "multi-choice") {
            console.log("hello")
            this.step = "multi-choice"
          }
          else if (this.step == "sign" && (this.selectedProposalType == "yes-no" || this.selectedProposalType == "multi-choice")) {
            this.step = "choices";
          }
      },


      async nextStep() {
          if (this.step == "select-proposal-type" && this.selectedProposalType == "multi-choice") {
            this.step = "parameter";
          }
          else if (this.step == "select-proposal-type" && this.selectedProposalType == "yes-no") {
            this.step = "parameter";
          }
          else if (this.step == "select-proposal-type" && this.selectedProposalType == "membership-invitation") {
            this.step = "proposal-profile";
          }
          else if (this.step == "proposal-profile" && this.selectedProposalType == "membership-invitation") {
            this.step = "membership-invitation";
          }
          else if (this.step == "parameter" && this.selectedProposalType == "multi-choice") {
            this.step = "multi-choice";
          }
          else if (this.step == "multi-choice" && this.selectedProposalType == "multi-choice") {
            this.step = "choices";
          }
          else if (this.step == "parameter" && this.selectedProposalType == "yes-no") {
            this.step = "yes-no";
          }
          else if (this.step == "membership-invitation" || this.step == "yes-no" || this.step == "choices") {
            this.step = "sign";
          }


        // the membership-invitation data that gets send when chosen:
        if (this.step == "sign" && this.selectedProposalType == "membership-invitation") {
              const autonWrapper = await this.$invoke("auton:getByID", {id: this.autonId });
              this.uri = `/auton/${this.autonName.replace(" ", "_")}/proposal/${autonWrapper.result.proposals.length + 1}/campaigning`;

              const asset = {
                  title: this.proposalTitle,
                  campaignComment: this.proposalDescription,
                  proposalType: this.selectedProposalType,
                  autonId: this.autonId,
                  accountIdToInvite: this.selectedAccountId,
                  invitationMessage: this.invitationMessage,
              };

              console.log("asset membership");
              console.log(asset);
              this.transaction.moduleId = 1004;
              this.transaction.assetId = 0;
              this.transaction.assets = asset;
          }

          // the multiple choice data that gets send when chosen:
          else if (this.step == "sign" && this.selectedProposalType == "multi-choice") {
              const autonWrapper = await this.$invoke("auton:getByID", {id: this.autonId });
              this.uri = `/auton/${this.autonName.replace(" ", "_")}/proposal/${autonWrapper.result.proposals.length + 1}/campaigning`;

              const asset = {
                title: this.statementMessage,
                campaignComment: this.descriptionMessage,
                proposalType: "multi-choice-poll",
                autonId: this.autonId,
                question: this.statementMessage,
                answers: this.choicesMessage,
              };

              this.transaction.moduleId = 1004;
              this.transaction.assetId = 1;
              this.transaction.assets = asset;
          }
      },
  },
};

</script>

<style>
</style>
