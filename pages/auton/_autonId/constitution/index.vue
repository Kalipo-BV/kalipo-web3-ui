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
  <v-container>
    <div class="mt-8">
      <div class="d-flex justify-start align-center">
        <v-avatar color="accent" size="60px"
          ><v-icon large dark>mdi-bank</v-icon></v-avatar
        >
        <div class="text-h2 accent--text ml-2">Constitution</div>
      </div>
      <div class="d-flex justify-start mt-2"></div>

      <div class="mt-2 text-body-1">
        Formed on
        <v-chip color="" class="" small>12 dec. 2021</v-chip>, based on
        <v-chip color="" class="" small>starter template</v-chip>
      </div>

      <div class="mt-2 text-body-1">
        <v-chip color="" class="" small>26</v-chip>
        changes have been made so far
      </div>
      <v-row justify="start" class="mt-4">
        <v-col cols="12" md="4">
          <v-text-field
            solo
            label="Search"
            append-icon="mdi-magnify"
            class="mt-4"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <div>
      <div class="d-flex justify-start text-h4 primary--text mt-8 mb-8">
        Memberships & roles
      </div>
      <v-row justify="start">
        <v-col cols="12" md="3">
          <ProposalTypeCard
            icon="mdi-account-plus"
            title="Membership invitation"
          ></ProposalTypeCard>
        </v-col>
        <v-col cols="12" md="3">
          <ProposalTypeCard
            icon="mdi-account-minus"
            title="Membership termination"
          ></ProposalTypeCard>
        </v-col>
        <v-col cols="12" md="3">
          <ProposalTypeCard
            icon="mdi-account-settings"
            title="Role assignment"
          ></ProposalTypeCard>
        </v-col>
        <v-col cols="12" md="3">
          <ProposalTypeCard
            icon="mdi-format-list-bulleted"
            title="Role management"
          ></ProposalTypeCard>
        </v-col>
      </v-row>
      <v-divider class="mt-8"></v-divider>
    </div>

    <div>
      <div class="d-flex justify-start text-h4 primary--text mt-8 mb-8">
        Polls
      </div>
      <v-row justify="start">
        <v-col cols="12" md="3">
          <ProposalTypeCard
            icon="mdi-ballot"
            title="Yes / No"
          ></ProposalTypeCard>
        </v-col>
        <v-col cols="12" md="3">
          <ProposalTypeCard
            icon="mdi-view-list-outline"
            title="Multi option"
          ></ProposalTypeCard>
        </v-col>
      </v-row>
      <v-divider class="mt-8"></v-divider>
    </div>

    <div>
      <div class="d-flex justify-start text-h4 primary--text mt-8 mb-8">
        Profile
      </div>
      <v-row justify="start">
        <v-col cols="12" md="3">
          <ProposalTypeCard
            icon="mdi-form-textbox"
            title="Name change"
          ></ProposalTypeCard>
        </v-col>
        <v-col cols="12" md="3">
          <ProposalTypeCard
            icon="mdi-tag"
            title="Tag change"
          ></ProposalTypeCard>
        </v-col>
        <v-col cols="12" md="3">
          <ProposalTypeCard
            icon="mdi-bullseye-arrow"
            title="Mission change"
          ></ProposalTypeCard>
        </v-col>
        <v-col cols="12" md="3">
          <ProposalTypeCard
            icon="mdi-eye"
            title="Vision change"
          ></ProposalTypeCard>
        </v-col>
        <v-col cols="12" md="3">
          <ProposalTypeCard
            icon="mdi-image"
            title="Icon change"
          ></ProposalTypeCard>
        </v-col>
        <v-col cols="12" md="3">
          <ProposalTypeCard
            icon="mdi-image-size-select-actual"
            title="Logo change"
          ></ProposalTypeCard>
        </v-col>
      </v-row>
      <v-divider class="mt-8"></v-divider>
    </div>

    <div>
      <div class="d-flex justify-start text-h4 primary--text mt-8 mb-8">
        Constitution
      </div>
      <v-row justify="start">
        <v-col cols="12" md="3">
          <ProposalTypeCard icon="mdi-bank" title="Bill"></ProposalTypeCard>
        </v-col>
        <v-col cols="12" md="3" @click="() => {this.$router.push('/contract/select-template');}">
          <ProposalTypeCard icon="" title="Contract"/>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
export default {
  layout: "auton",
  data: () => ({
    dialog: true,
  }),
  mounted() {
    this.$nuxt.$emit("Auton-setPage", "constitution");
  },
};
</script>