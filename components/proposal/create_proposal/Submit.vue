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
      <v-card-text v-if="steps.includes('select-proposal-type')">
        <StepperHeader
          title="Submitting a new proposal"
          subtitle="First choose the desired type that suits your proposal"
        ></StepperHeader>

        <ProposalType
          :selectedProposalType.sync="selectedProposalType"
        ></ProposalType>
      </v-card-text>

      <v-card-text v-if="steps.includes('title')">
        <StepperHeader
          title="Title"
          subtitle="Write down the title for the proposal"
        ></StepperHeader>

        <Title
          :title.sync="proposalTitle"
        ></Title>
      </v-card-text>

      <v-card-text v-if="steps.includes('proposal-profile')">
        <StepperHeader
          title="Submitting a new proposal"
          subtitle="Describe your proposal by providing a title and description"
        ></StepperHeader>

        <Profile
          :disabledNext.sync="disabledNext"
          :title.sync="proposalTitle"
          :description.sync="proposalDescription"
        ></Profile>
      </v-card-text>

      <v-card-text v-if="steps.includes('membership-invitation')">
        <StepperHeader
          title="Submitting a new proposal"
          subtitle="Please select the user you'd like to invite and supply an invitation message"
        ></StepperHeader>

        <MembershipInvitation
          :selectedAccountId.sync="selectedAccountId"
          :invitationMessage.sync="invitationMessage"
          class="mt-4"
          :autonId="autonId"
        ></MembershipInvitation>
      </v-card-text>

      <v-card-text v-if="steps.includes('abstract')">
        <StepperHeader
          title="Abstract"
          subtitle="Write down the abstract for the proposal"
        ></StepperHeader>

        <Abstract
          :abstract.sync="abstract"
        ></Abstract>
      </v-card-text>

      <v-card-text v-if="steps.includes('motivation')">
        <StepperHeader
          title="Motivation"
          subtitle="Please write a motivation for your improvement proposal"
        ></StepperHeader>

        <Motivation
          :motivation.sync="motivation"
          class="mt-4"
          :autonId="autonId"
        ></Motivation>
      </v-card-text>

      <v-card-text v-if="steps.includes('specification')">
        <StepperHeader
          title="Specification"
          subtitle="Please write a specification for your improvement proposal"
        ></StepperHeader>

        <Specification
          :specification.sync="specification"
        ></Specification>
      </v-card-text>

      <v-card-text v-if="steps.includes('references')">
        <StepperHeader
          title="References (Optional)"
          subtitle="Write down the references that could be useful for your improvement proposal"
        ></StepperHeader>

        <References
          :references.sync="references"
        ></References>
      </v-card-text>

      <v-card-text v-if="steps.includes('budget')">
        <StepperHeader
          title="Budget (Optional)"
          subtitle="Write down the budget for the proposal"
        ></StepperHeader>

        <Budget
          :budget.sync="budget"
        ></Budget>
      </v-card-text>

      <v-card-text v-if="steps.includes('execution-roles')">
        <StepperHeader
          title="Execution roles (Optional)"
          subtitle="Write down the execution roles for the proposal"
        ></StepperHeader>

        <ExecutionRoles
          :executionRoles.sync="executionRoles"
        ></ExecutionRoles>
      </v-card-text>

      <v-card-text v-if="steps.includes('time-constraints')">
        <StepperHeader
          title="Time constraints (Optional)"
          subtitle="Write down the time constraints for the proposal"
        ></StepperHeader>

        <TimeConstraints
          :timeBasedConstraint.sync="timeBasedConstraint"
        ></TimeConstraints>
      </v-card-text>

      <v-card-text v-if="steps.includes('extraOptions')">
        <StepperHeader
          title="Expert advice and agreement (Optional)"
          subtitle="Check expert advice and agreement if needed"
        ></StepperHeader>

        <ApprovalAndAgreement
          :approval-and-agreement.sync="approvalAndAgreement"
        ></ApprovalAndAgreement>
      </v-card-text>

      <AccountSign
        :transaction="transaction"
        :uri="uri"
        callback="AutonProposalSubmit-PrevStep"
        callbackFinish="AutonProposalSubmit-Finish"
        v-if="steps.includes('sign')"
        title="Submitting proposal"
      ></AccountSign>

  <!--  Buttons previous, next or sign    -->
      <v-card-text v-if="!steps.includes('sign')">
        <div class="d-flex align-center justify-space-between">
          <v-btn :disabled="this.currentPage === 0" @click="prevStep">
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
import Abstract from "~/components/proposal/create_proposal/improvement_proposal/Abstract.vue";
import ApprovalAndAgreement from "~/components/proposal/create_proposal/improvement_proposal/ApprovalAndAgreement.vue";
import approvalAndAgreement from "~/components/proposal/create_proposal/improvement_proposal/ApprovalAndAgreement.vue";

export default {
  name: "AutonProposalSubmit",
  computed: {
    approvalAndAgreement() {
      return approvalAndAgreement
    }
  },
  components: {ApprovalAndAgreement, Abstract},
  props: ["autonId", "autonName", "callbackFinish"],
  data: () => ({
    steps: "select-proposal-type",
    disabledNext: false,
    selectedProposalType: "",
    selectedAccountId: "",
    invitationMessage: "",
    proposalTitle: "Test",
    proposalDescription: "",
    uri: "",
    proposers: [],
    abstract: "abstract",
    motivation: "mot",
    specification: "spec",
    references: "ref",
    budget: "bud is vies",
    executionRoles: "ROLEEEES",
    timeBasedConstraint: "tijd is geld nou gappie gooi wat tijd op me.",
    transaction: {
      moduleId: -1,
      assetId: 1,
      assets: {},
    },
    currentPage: 0,
    membershipScreenList: ['proposal-profile', 'membership-invitation'],
    improvementScreenList: ['title', 'abstract', 'proposers', 'motivation', 'specification',
      'references', 'budget', 'execution-roles', 'time-constraints'],
    extraOptionBoxList: ['extraOptions','agreement', 'expertAdvice']
  }),
  created() {
    this.$nuxt.$on(
      "AutonProposalSubmit-NextDisabled",
      ($event) => (this.disabledNext = $event)
    );
    this.$nuxt.$on("AutonProposalSubmit-PrevStep", ($event) => this.prevStep());
    this.$nuxt.$on("AutonProposalSubmit-Finish", ($event) => this.finish());
  },
  methods: {
    prevStep() {
      if(this.currentPage > 0){
        this.currentPage -= 1;
      }
      // Set the currentPage number
      switch(this.currentPage){
        case 0:
          this.steps = ['select-proposal-type'];
          break;
        case 1:
          switch(this.selectedProposalType) {
            // Set the inputs of the page to contain the ones in the list from 'data'
            // If there is a new type of proposal, add a list of screen names above and add a new case.
            case 'membership-invitation':
              this.steps = this.membershipScreenList;
              break;
            case 'improvement-proposal':
              this.steps = this.improvementScreenList;
              break;
          }
          break;
        case 2:
          this.steps = this.extraOptionBoxList;
      }
    },
    async nextStep() {
      // Set the currentPage
      this.currentPage += 1;
      // Set the inputs of the page to contain the ones in the list from 'data'
      // If there is a new type of proposal, add a list of screen names above and add a new case.
      switch(this.currentPage){
        case 1:
          switch(this.selectedProposalType) {
          case 'membership-invitation':
            if(this.currentPage )
              this.steps = this.membershipScreenList;
            break;
          case 'improvement-proposal':
            this.steps = this.improvementScreenList;
            break;
        }
        break;
        case 2:
          switch(this.selectedProposalType) {
            case 'membership-invitation':
              this.steps = ['sign'];
              break;
            case 'improvement-proposal':
              this.steps = this.extraOptionBoxList;
              break;
          }
        break;
        default:
          this.steps = ['sign']
      }

      if (this.steps === ['sign']) {
        const autonWrapper = await this.$invoke("auton:getByID", {
          id: this.autonId,
        });
        this.uri = `/auton/${this.autonName.replace(" ", "_")}/proposal/${
          autonWrapper.result.proposals.length + 1
        }/campaigning`;

        let asset;
        switch (this.selectedProposalType){
          case "improvement-proposal":
            asset = {
              title: this.proposalTitle,
              campaignComment: this.proposalDescription,
              proposalType: this.selectedProposalType,
              autonId: this.autonId,
              proposers: this.proposers,
              abstract: this.abstract,
              motivation: this.motivation,
              specification: this.specification,
              references: this.references,
              budget: this.budget,
              executionRoles: this.executionRoles,
              timeBasedConstraint: this.timeBasedConstraint
            };
            this.transaction.assetId = 1;
            break;

          case "membership-invitation":
            asset = {
              title: this.proposalTitle,
              campaignComment: this.proposalDescription,
              proposalType: this.selectedProposalType,
              autonId: this.autonId,
              accountIdToInvite: this.selectedAccountId,
              invitationMessage: this.invitationMessage,
            };
            this.transaction.assetId = 0;
            break;
        }
        this.transaction.moduleId = 1004;
        this.transaction.assets = asset;

        // console.log(
        //   this.proposalTitle + "\n" + this.proposalDescription + "\n" + this.selectedProposalType + "\n" + this.autonId + "\n" + this.abstract + "\n" + this.timeBasedConstraint
        // )
      }
    },
    finish() {
      if (this.callbackFinish) {
        this.$nuxt.$emit(this.callbackFinish, true);

        this.steps = ["select-proposal-type"];
        this.disabledNext = false;
        this.selectedProposalType = "";
        this.selectedAccountId = "";
        this.invitationMessage = "";
        this.proposalTitle = "";
        this.proposalDescription = "";
        this.uri = "";
        this.proposers = [];
        this.abstract = "";
        this.motivation = "";
        this.specification = "";
        this.references = "";
        this.budget = "";
        this.executionRoles = "";
        this.timeBasedConstraint = "";
        (this.transaction = {
          moduleId: -1,
          assetId: 0,
          assets: {},
        });
        this.currentPage = 0;
      }
    },
  },
};
</script>
<style></style>
