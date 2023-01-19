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
      <!-- <v-card-text v-if="step == 'yes-no'">
        <AutonStepperHeader
          title="Creating a poll"
          subtitle="Give us your title and describe why you're creating a poll"
        ></AutonStepperHeader>
        <ProposalChoicesOverview

        ></ProposalChoicesOverview>
      </v-card-text> -->

      <v-card-text v-if="step == 'title-description'">
        <AutonStepperHeader
        :title="title"
        :subtitle="subTitle"
        ></AutonStepperHeader>

        <AutonProposalTitleDescription
        :titleMessage.sync="titleMessage"
        :descriptionMessage.sync="descriptionMessage"
        class="mt-4"
        :autonId="autonId"
        ></AutonProposalTitleDescription>
      </v-card-text>

      <v-card-text v-if="step == 'parameter'">
        <AutonStepperHeader
        title="Parameters"
        subtitle="These are the parameters for your poll"
        ></AutonStepperHeader>

        <AutonProposalParameter
        class="mt-4"
        :autonId="autonId"
        :selectedProposalType="selectedProposalType"
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
        :selectedProposalType="selectedProposalType"
        @data:choices="getChoicesMessage"
        ></AutonProposalChoices>
      </v-card-text>

      <v-card-text v-if="step == 'questions'">
        <AutonStepperHeader
        title="Questions"
        subtitle="Give a clear description of your choices"
        ></AutonStepperHeader>

        <AutonProposalQuestions
        class="mt-4"
        :autonId="autonId"
        :selectedProposalType="selectedProposalType"
        @data:choices="getChoicesMessage"
        ></AutonProposalQuestions>
      </v-card-text>

      <v-card-text v-if="step == 'question-answer'">
        <AutonStepperHeader
        title="Questions"
        subtitle=""
        ></AutonStepperHeader>

        <AutonProposalQuestionOptionField
        class="mt-4"
        :autonId="autonId"
        :selectedProposalType="selectedProposalType"
        :question="currentChoiceMessage"
        @data:answers="getAnswerMessage"
        ></AutonProposalQuestionOptionField>
      </v-card-text>

      <v-card-text v-if="step == 'check-out'">
        <AutonStepperHeader
        :title="title"
        :subtitle="subTitle"
        ></AutonStepperHeader>

        <AutonProposalCheckout
        class="mt-4"
        :autonId="autonId"
        :questions="choicesAnswer"
        :selectedProposalType="selectedProposalType"
        ></AutonProposalCheckout>
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
          <v-btn :disabled="step == 'select-proposal-type'" @click="prevStep">
            <v-icon class="mr-2" small>mdi-arrow-left</v-icon>
            previous
          </v-btn>
          <v-btn color="accent" @click="nextStep" :disabled="disabledNext || selectedProposalType == null">
            next
            <v-icon class="ml-2" small>mdi-arrow-right</v-icon>
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
    // statementMessage: "",
    subTitle: "",
    title: "",
    titleMessage: "",
    // addedValueMessage: "",
    descriptionMessage: "",
    proposalTitle: "",
    proposalDescription: "",

    answersMessage: "",
    choicesMessage: "",
    currentChoiceMessage: "",
    questionStep: 0,
    choicesAnswer: [],

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
      this.currentChoiceMessage = this.choicesMessage[0]
    },
    getAnswerMessage(value) {
      this.answersMessage = value;
    },

    buildNextQuestion() {
      this.choicesAnswer.push({"question": this.currentChoiceMessage, "options": this.answersMessage});
      this.questionStep ++;
      this.currentChoiceMessage = this.choicesMessage[this.questionStep];
    },
    buildPreviousQuestion() {
      //should be used to go back to previous questions to change them.
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
        this.titleMessage = "";
        this.addedValueMessage = "";
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
      // else if (this.step == "yes-no" && this.selectedProposalType == "yes-no") {
      //   this.step = "parameter";
      // }
      // else if (this.step == "choices" && this.selectedProposalType == "yes-no") {
      //   this.step = "yes-no"
      // }
      // else if (this.step == "sign" && (this.selectedProposalType == "yes-no" || this.selectedProposalType == "multi-choice")) {
      //   this.step = "choices";
      // }
      else if (this.step == "title-description" && this.selectedProposalType == "multi-choice") {
        this.step = "parameter";
      }
      else if (this.step == "choices" && this.selectedProposalType == "multi-choice") {
        this.step = "title-description";
      }
      else if (this.step == "sign" && this.selectedProposalType == "multi-choice") {
        this.step = "choices";
      }
      else if (this.step == "title-description" && this.selectedProposalType == "questionnaire") {
        this.step = "parameter";
      }
      else if (this.step == "questions" && this.selectedProposalType == "questionnaire") {
        this.step = "title-description";
      }
      else if (this.step == "question-answer" && this.selectedProposalType == "questionnaire") {
        this.step = "questions"
      }
      else if (this.step == "check-out" && this.selectedProposalType == "questionnaire") {
        this.step = "question-answer"
      }
      else if (this.step == "sign" && this.selectedProposalType == "questionnaire") {
        this.step = "check-out";
      }
    },
    async nextStep() {
      if (this.step == "select-proposal-type" && this.selectedProposalType == "multi-choice") {
        this.step = "parameter";
      }
      // else if (this.step == "select-proposal-type" && this.selectedProposalType == "yes-no") {
      //   this.step = "parameter";
      // }
      else if (this.step == "select-proposal-type" && this.selectedProposalType == "questionnaire") {
        this.step = "parameter";
      }
      else if (this.step == "select-proposal-type" && this.selectedProposalType == "membership-invitation") {
        this.step = "proposal-profile";
      }
      else if (this.step == "proposal-profile" && this.selectedProposalType == "membership-invitation") {
        this.step = "membership-invitation";
      }
      else if (this.step == "parameter" && this.selectedProposalType == "questionnaire") {
        this.step = "title-description";
        this.title = "Questionnaire";
        this.subTitle = "Describe your statement by providing a title and description";
      }
      else if (this.step == "parameter" && this.selectedProposalType == "multi-choice") {
        this.step = "title-description";
        this.title = "Creating a poll";
        this.subTitle = "Give us your title and describe why you're creating a poll";
      }
      else if (this.step == "title-description" && this.selectedProposalType == "multi-choice") {
        this.step = "choices";
      }
      else if (this.step == "title-description" && this.selectedProposalType == "questionnaire") {
        this.step = "questions";
      }
      else if (this.step == "questions" && this.selectedProposalType == "questionnaire") {
        this.step = "question-answer"
      }
      else if (this.step == "question-answer" && this.selectedProposalType == "questionnaire" &&  this.currentChoiceMessage != null) {
        this.buildNextQuestion()
        if (this.questionStep == this.choicesMessage.length) { this.step = "check-out" } else { this.step = "question-answer" }
      }
      else if (this.step == "question-answer" && this.selectedProposalType == "questionnaire") {
        this.step = "check-out";
        this.title = "Are you sure?";
        this.subTitle = "";
      }
      // else if (this.step == "parameter" && this.selectedProposalType == "yes-no") {
      //   this.step = "yes-no";
      // }
      // else if (this.step == "membership-invitation" || this.step == "yes-no" || this.step == "choices") {
      //   this.step = "sign";
      // }
      else if (this.step == "membership-invitation" || this.step == "choices" || this.step == "check-out") {
        this.step = "sign";
      }
      // the membership-invitation data that gets send when chosen:
      if (this.step == "sign" && this.selectedProposalType == "membership-invitation") {
        const autonWrapper = await this.$invoke("auton:getByID", { id: this.autonId });
        this.uri = `/auton/${this.autonName.replace(" ", "_")}/proposal/${autonWrapper.result.proposals.length + 1}/campaigning`;
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
      }
      // the multiple choice data that gets send when chosen:
      else if (this.step == "sign" && this.selectedProposalType == "multi-choice") {
        const autonWrapper = await this.$invoke("auton:getByID", { id: this.autonId });
        this.uri = `/auton/${this.autonName.replace(" ", "_")}/proposal/${autonWrapper.result.proposals.length + 1}/campaigning`;
        const asset = {
          title: this.titleMessage,
          campaignComment: this.descriptionMessage,
          proposalType: "multi-choice-poll",
          autonId: this.autonId,
          question: this.titleMessage,
          answers: this.choicesMessage,
        };
        this.transaction.moduleId = 1004;
        this.transaction.assetId = 1;
        this.transaction.assets = asset;
      }
      //questionnaire data that gets send when chosen:
      else if (this.step == "sign" && this.selectedProposalType == "questionnaire") {
        const autonWrapper = await this.$invoke("auton:getByID", { id: this.autonId });
        this.uri = `/auton/${this.autonName.replace(" ", "_")}/proposal/${autonWrapper.result.proposals.length + 1}/campaigning`;
        const asset = {
          title: this.titleMessage,
          campaignComment: this.descriptionMessage,
          proposalType: "questionnaire",
          autonId: this.autonId,
          question: this.titleMessage,
          answers: this.choicesMessage,
        };
        this.transaction.moduleId = 1004;
        this.transaction.assetId = 2;
        this.transaction.assets = asset;
      }
    },
  },
};

</script>

<style>

</style>