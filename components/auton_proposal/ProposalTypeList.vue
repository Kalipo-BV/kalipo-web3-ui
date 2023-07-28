<template>
  <div>
    <div v-for="(item, i) in types" :key="i">
      <div :class="i == 0 ? 'text-h5' : 'text-h5 mt-4'" v-if="item.heading">
        {{ item.heading }}
      </div>
      <v-card
        v-if="!item.heading"
        :color="
          item.type == selected && !item.disabled
            ? 'accent'
            : item.disabled
            ? 'grey lighten-2'
            : ''
        "
        :ripple="!item.disabled"
        :flat="item.disabled"
        class="mt-2"
        @click="item.disabled ? '' : (selected = item.type)"
        :link="!item.disabled"
        :style="item.disabled ? 'cursor: default !important;' : ''"
      >
        <v-card-text>
          <div class="d-flex align-center">
            <v-avatar
              :color="
                item.type == selected && !item.disabled
                  ? 'white'
                  : item.disabled
                  ? 'grey'
                  : 'primary'
              "
              size="30px"
            >
              <v-icon
                small
                :color="item.type == selected ? 'accent' : 'white'"
                >{{ item.icon }}</v-icon
              >
            </v-avatar>
            <div class="ml-2 text-body-1">
              <span
                :class="
                  item.type == selected && !item.disabled
                    ? 'white--text'
                    : item.disabled
                    ? 'grey--text'
                    : ''
                "
                >{{ item.title }}</span
              >
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: ["selectedProposalType"],
  data: () => ({
    types: [
      { heading: "Memberships & Roles" },
      {
        type: "membership-invitation",
        title: "Membership invitation",
        icon: "mdi-account-plus",
      },
      {
        type: "membership-termination",
        title: "Membership termination",
        icon: "mdi-account-minus",
        disabled: true,
      },
      {
        type: "role-description",
        title: "Description of roles",
        icon: "mdi-account-settings",
        disabled: true,
      },
      {
        type: "role-asignment",
        title: "Role asignment",
        icon: "mdi-format-list-bulleted",
        disabled: true,
      },
      { heading: "Initiatives" },
      {
        type: "imporvement-proposal",
        title: "Improvement proposal",
        icon: "mdi-file-document-plus-outline",
        disabled: true,
      },
      {
        type: "comunity-event",
        title: "Comunity event",
        icon: "mdi-calendar-star",
        disabled: true,
      },
      { heading: "Polls & Questionnaires" },
      {
        type: "poll",
        title: "Poll",
        icon: "mdi-poll",
        disabled: true,
      },
      {
        type: "questionnaire",
        title: "Questionnaire",
        icon: "mdi-file-question",
        disabled: true,
      },
      { heading: "Organisational Structures" },
      {
        type: "auton-creation",
        title: "Unit creation",
        icon: "mdi-web-plus",
      },
      {
        type: "folder-creation",
        title: "Project creation",
        icon: "mdi-folder-plus",
        disabled: true,
      },
      {
        type: "subsidiary-creation",
        title: "Subsidiary creation",
        icon: "mdi-vector-difference-ab",
        disabled: true,
      },
      {
        type: "joint-venture-creation",
        title: "Joint Venture creation",
        icon: "mdi-vector-intersection",
        disabled: true,
      },
      { heading: "Profile" },
      {
        type: "name-change",
        title: "Name change",
        icon: "mdi-form-textbox",
        disabled: true,
      },
      {
        type: "tag-change",
        title: "Tag change",
        icon: "mdi-tag",
        disabled: true,
      },
      {
        type: "mission-change",
        title: "Mission change",
        icon: "mdi-bullseye-arrow",
        disabled: true,
      },
      {
        type: "vision-change",
        title: "Vision change",
        icon: "mdi-eye",
        disabled: true,
      },
      {
        type: "logo-change",
        title: "Logo change",
        icon: "mdi-image-size-select-actual",
        disabled: true,
      },
      { heading: "Constitution Management" },
      {
        type: "terms-and-conditions-bill",
        title: "Terms and conditions bill",
        icon: "mdi-scale-balance",
      },
      {
        type: "proposal-type-settings-bill",
        title: "Proposal type setting bill",
        icon: "mdi-tune",
      },
      {
        type: "policy-alteration-bill",
        title: "Policy alteration bill",
        icon: "mdi-cogs",
        disabled: true,
      },
    ],
  }),
  computed: {
    selected: {
      get: function () {
        return this.selectedProposalType;
      },
      set: function (newValue) {
        if (newValue != this.selectedProposalType) {
          this.$emit("update:selectedProposalType", newValue);
        } else {
          this.$emit("update:selectedProposalType", null);
        }
      },
    },
  },
};
</script>

<style>
</style>