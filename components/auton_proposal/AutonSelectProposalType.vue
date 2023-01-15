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
      <div class="d-flex justify-start text-h4 primary--text mt-8 mb-8">
        Memberships & roles
      </div>
      <v-row justify="start">
        <v-col cols="12" md="6">
          <div @click="selectedProposalTypeInput = 'membership-invitation'">
            <ProposalTypeCard icon="mdi-account-plus" title="Membership invitation"
              :active="selectedProposalTypeInput == 'membership-invitation'"></ProposalTypeCard>
          </div>
        </v-col>
      </v-row>

      <v-divider class="mt-8"></v-divider>
      <!-- I ADDED STUFF -->
      <div class="d-flex justify-start text-h4 primary--text mt-8 mb-8">
        Polls & questionnaires
      </div>
      <v-row justify="start" >
          <!-- <v-col cols="12" md="6">
            <div @click="selectedProposalTypeInput = 'yes-no'">
              <ProposalTypeCard 
              icon="mdi-format-list-checks" 
              title="Yes/No"
              :active="selectedProposalTypeInput == 'yes-no'"></ProposalTypeCard>
            </div>
          </v-col> -->
          <v-col cols="12" md="6">
            <div @click="selectedProposalTypeInput = 'multi-choice'">
              <ProposalTypeCard 
              icon="mdi-format-list-checkbox" 
              title="Multi choice"
              :active="selectedProposalTypeInput == 'multi-choice'"></ProposalTypeCard>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div @click="selectedProposalTypeInput = 'questionnaire'">
              <ProposalTypeCard 
              icon="mdi-frequently-asked-questions" 
              title="Questionnaire"
              :active="selectedProposalTypeInput == 'questionnaire'"></ProposalTypeCard>
            </div>
          </v-col>
      </v-row>

      <v-divider class="mt-8"></v-divider>
      <!-- END -->
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

<style>

</style>