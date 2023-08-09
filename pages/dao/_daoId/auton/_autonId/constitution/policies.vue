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
      <div>Not implemented yet</div>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "auton",
  data: () => ({
    selectedItem: 2,
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