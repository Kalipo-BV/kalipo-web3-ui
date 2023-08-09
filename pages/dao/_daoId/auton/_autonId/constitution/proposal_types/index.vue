<template>
  <div>
    <v-container class="py-0 px-0 px-lg-3 white">
      <v-divider></v-divider>

      <v-tabs show-arrows v-model="selectedItem" color="primary">
        <v-tab
          v-for="(item, idx) in tabItemsDefault"
          :key="idx"
          @click="navigate(item.to)"
        >
          <v-icon small class="mr-2">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-tab>
      </v-tabs>
    </v-container>
    <v-container>
      <div>
        <div>
          <div class="d-flex justify-start text-h4 primary--text mt-8 mb-8">
            Memberships & roles
          </div>
          <v-row justify="start">
            <v-col
              cols="12"
              md="3"
              @click="$router.push('membership-invitation')"
            >
              <ProposalTypeCard
                icon="mdi-account-plus"
                title="Membership invitation"
              ></ProposalTypeCard>
            </v-col>
            <v-col cols="12" md="3">
              <ProposalTypeCard
                icon="mdi-account-minus"
                title="Membership termination"
                disabled="true"
              ></ProposalTypeCard>
            </v-col>
            <v-col cols="12" md="3">
              <ProposalTypeCard
                icon="mdi-account-settings"
                title="Role assignment"
                disabled="true"
              ></ProposalTypeCard>
            </v-col>
            <v-col cols="12" md="3">
              <ProposalTypeCard
                icon="mdi-format-list-bulleted"
                title="Role management"
                disabled="true"
              ></ProposalTypeCard>
            </v-col>
          </v-row>
          <v-divider class="mt-8"></v-divider>
        </div>

        <div>
          <div class="d-flex justify-start text-h4 primary--text mt-8 mb-8">
            Initiatives
          </div>
          <v-row justify="start">
            <v-col cols="12" md="3">
              <ProposalTypeCard
                icon="mdi-file-document-plus-outline"
                title="Improvement proposal"
                disabled="true"
              ></ProposalTypeCard>
            </v-col>
            <v-col cols="12" md="3">
              <ProposalTypeCard
                icon="mdi-calendar-star"
                title="Comunity event"
                disabled="true"
              ></ProposalTypeCard>
            </v-col>
          </v-row>
          <v-divider class="mt-8"></v-divider>
        </div>

        <div>
          <div class="d-flex justify-start text-h4 primary--text mt-8 mb-8">
            Polls & Questionnaires
          </div>
          <v-row justify="start">
            <v-col cols="12" md="3">
              <ProposalTypeCard
                icon="mdi-poll"
                title="Poll"
                disabled="true"
              ></ProposalTypeCard>
            </v-col>
            <v-col cols="12" md="3">
              <ProposalTypeCard
                icon="mdi-file-question"
                title="Questionnaire"
                disabled="true"
              ></ProposalTypeCard>
            </v-col>
          </v-row>
          <v-divider class="mt-8"></v-divider>
        </div>

        <div>
          <div class="d-flex justify-start text-h4 primary--text mt-8 mb-8">
            Organisational Structures
          </div>
          <v-row justify="start">
            <v-col cols="12" md="3" @click="$router.push('auton-creation')">
              <ProposalTypeCard
                icon="mdi-web-plus"
                title="Unit creation"
              ></ProposalTypeCard>
            </v-col>
            <v-col cols="12" md="3">
              <ProposalTypeCard
                icon="mdi-folder-plus"
                title="Project creation"
                disabled="true"
              ></ProposalTypeCard>
            </v-col>
            <v-col cols="12" md="3">
              <ProposalTypeCard
                icon="mdi-vector-difference-ab"
                title="Subsidiary creation"
                disabled="true"
              ></ProposalTypeCard>
            </v-col>
            <v-col cols="12" md="3">
              <ProposalTypeCard
                icon="mdi-vector-intersection"
                title="Joint Venture creation"
                disabled="true"
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
                disabled="true"
              ></ProposalTypeCard>
            </v-col>
            <v-col cols="12" md="3">
              <ProposalTypeCard
                icon="mdi-tag"
                title="Tag change"
                disabled="true"
              ></ProposalTypeCard>
            </v-col>
            <v-col cols="12" md="3">
              <ProposalTypeCard
                icon="mdi-bullseye-arrow"
                title="Mission change"
                disabled="true"
              ></ProposalTypeCard>
            </v-col>
            <v-col cols="12" md="3">
              <ProposalTypeCard
                icon="mdi-eye"
                title="Vision change"
                disabled="true"
              ></ProposalTypeCard>
            </v-col>
            <v-col cols="12" md="3">
              <ProposalTypeCard
                icon="mdi-image"
                title="Icon change"
                disabled="true"
              ></ProposalTypeCard>
            </v-col>
            <v-col cols="12" md="3">
              <ProposalTypeCard
                icon="mdi-image-size-select-actual"
                title="Logo change"
                disabled="true"
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
            <v-col
              cols="12"
              md="3"
              @click="$router.push('terms-and-conditions-bill')"
            >
              <ProposalTypeCard
                icon="mdi-scale-balance"
                title="Terms and conditions bill"
              ></ProposalTypeCard>
            </v-col>
            <v-col
              cols="12"
              md="3"
              @click="$router.push('proposal-type-settings-bill')"
            >
              <ProposalTypeCard
                icon="mdi-tune"
                title="Proposal type setting bill"
              ></ProposalTypeCard>
            </v-col>
            <v-col cols="12" md="3">
              <ProposalTypeCard
                icon="mdi-cogs"
                title="Policy alteration bill"
                disabled="true"
              ></ProposalTypeCard>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "auton",
  data: () => ({
    selectedItem: 1,
    tabItemsDefault: [
      {
        icon: "mdi-scale-balance",
        title: "Terms & Conditions",
        to: "terms_and_conditions",
      },
      {
        icon: "mdi-email-newsletter",
        title: "Proposal types",
        to: "proposal_types",
      },
      {
        icon: "mdi-cog",
        title: "Policies",
        to: "policies",
      },
    ],
  }),
  methods: {
    navigate(to) {
      this.$router.push(
        `/dao/${this.$route.params.daoId}/auton/${this.$route.params.autonId}/constitution/${to}/`
      );
    },
  },
};
</script>

<style>
</style>