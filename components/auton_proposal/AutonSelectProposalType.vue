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
    <div>
      <div class="d-flex justify-start text-h4 primary--text mt-4 mb-4">
        Memberships & Roles
      </div>
      <v-row justify="start">
        <v-col cols="12" md="6">
          <div @click="selectedProposalTypeInput = 'membership-invitation'">
            <ProposalTypeCard
              icon="mdi-account-plus"
              title="Membership invitation"
              :active="selectedProposalTypeInput == 'membership-invitation'"
            ></ProposalTypeCard>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div>
            <ProposalTypeCard
              icon="mdi-account-minus"
              title="Membership termination"
              disabled="true"
            ></ProposalTypeCard>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div>
            <ProposalTypeCard
              icon="mdi-account-settings"
              title="Description of roles"
              disabled="true"
            ></ProposalTypeCard>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div>
            <ProposalTypeCard
              icon="mdi-format-list-bulleted"
              title="Role assignment"
              disabled="true"
            ></ProposalTypeCard>
          </div>
        </v-col>
      </v-row>
      <div class="d-flex justify-start text-h4 primary--text mt-4 mb-4">
        Initiatives
      </div>
      <v-row justify="start">
        <v-col cols="12" md="6">
          <div>
            <ProposalTypeCard
              icon="mdi-file-document-plus-outline"
              title="Improvement Proposal"
              disabled="true"
            ></ProposalTypeCard>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div>
            <ProposalTypeCard
              icon="mdi-calendar-star"
              title="Comunity Event"
              disabled="true"
            ></ProposalTypeCard>
          </div>
        </v-col>
      </v-row>
      <div class="d-flex justify-start text-h4 primary--text mt-4 mb-4">
        Polls & Questionnaires
      </div>
      <v-row justify="start">
        <v-col cols="12" md="6">
          <div>
            <ProposalTypeCard
              icon="mdi-poll"
              title="Poll"
              disabled="true"
            ></ProposalTypeCard>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div>
            <ProposalTypeCard
              icon="mdi-file-question"
              title="Questionnaire"
              disabled="true"
            ></ProposalTypeCard>
          </div>
        </v-col>
      </v-row>
      <div class="d-flex justify-start text-h4 primary--text mt-4 mb-4">
        Organisational Structures
      </div>
      <v-row justify="start">
        <v-col cols="12" md="6">
          <div @click="selectedProposalTypeInput = 'auton-creation'">
            <ProposalTypeCard
              icon="mdi-web-plus"
              title="Unit Creation"
              :active="selectedProposalTypeInput == 'auton-creation'"
            ></ProposalTypeCard>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div>
            <ProposalTypeCard
              icon="mdi-folder-plus"
              title="Project Creation"
              disabled="true"
            ></ProposalTypeCard>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div>
            <ProposalTypeCard
              icon="mdi-vector-difference-ab"
              title="Subsidiary Creation"
              disabled="true"
            ></ProposalTypeCard>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div>
            <ProposalTypeCard
              icon="mdi-vector-intersection"
              title="Joint Venture Creation"
              disabled="true"
            ></ProposalTypeCard>
          </div>
        </v-col>
      </v-row>
      <div class="d-flex justify-start text-h4 primary--text mt-4 mb-4">
        Profile
      </div>
      <v-row justify="start">
        <v-col cols="12" md="6">
          <div>
            <ProposalTypeCard
              icon="mdi-form-textbox"
              title="Name change"
              disabled="true"
            ></ProposalTypeCard>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div>
            <ProposalTypeCard
              icon="mdi-tag"
              title="Tag change"
              disabled="true"
            ></ProposalTypeCard>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div>
            <ProposalTypeCard
              icon="mdi-bullseye-arrow"
              title="Mission change"
              disabled="true"
            ></ProposalTypeCard>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div>
            <ProposalTypeCard
              icon="mdi-eye"
              title="Vision change"
              disabled="true"
            ></ProposalTypeCard>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div>
            <ProposalTypeCard
              icon="mdi-image-size-select-actual"
              title="Logo change"
              disabled="true"
            ></ProposalTypeCard>
          </div>
        </v-col>
      </v-row>
      <div class="d-flex justify-start text-h4 primary--text mt-4 mb-4">
        Constitution management
      </div>
      <v-row justify="start">
        <v-col cols="12" md="6">
          <div @click="selectedProposalTypeInput = 'terms-and-conditions'">
            <ProposalTypeCard
              icon="mdi-scale-balance"
              title="Terms and Conditions Bill"
              :active="selectedProposalTypeInput == 'terms-and-conditions'"
            ></ProposalTypeCard>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div @click="selectedProposalTypeInput = 'proposal-type-bill'">
            <ProposalTypeCard
              icon="mdi-tune"
              title="Proposal Type Setting Bill"
              :active="selectedProposalTypeInput == 'proposal-type-bill'"
            ></ProposalTypeCard>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div>
            <ProposalTypeCard
              icon="mdi-cogs"
              title="Policy Alteration Bill"
              disabled="true"
            ></ProposalTypeCard>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div>
            <ProposalTypeCard
              icon="mdi-map-marker"
              title="Legal Entity Alteration"
              disabled="true"
            ></ProposalTypeCard>
          </div>
        </v-col>
      </v-row>
      <v-divider class="mt-8"></v-divider>
    </div>
  </div>
</template>

<script>
export default {
  props: ["selectedProposalType"],
  computed: {
    selectedProposalTypeInput: {
      get: function () {
        return this.selectedProposalType;
      },
      set: function (newValue) {
        this.$emit("update:selectedProposalType", newValue);
      },
    },
  },
  data: () => ({
    selected: null,
  }),
};
</script>

<style></style>