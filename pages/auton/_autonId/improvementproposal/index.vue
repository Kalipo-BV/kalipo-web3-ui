<template>
  <v-container>
    <div class="d-flex mt-3 ml-1">
      <improvementproposal></improvementproposal>
      <improvementproposal></improvementproposal>
      <improvementproposal></improvementproposal>
    </div>
  </v-container>
    
  </template>
  <script>
import improvementproposal from '~/components/improvement_proposal/improvementProposalCard.vue';

  export default {
    layout: "auton",
    data() {
        return {};
    },
    mounted() {
        this.$nuxt.$emit("Auton-setPage", "improvementproposal");
    },
    components: { improvementproposal }
};
  </script>