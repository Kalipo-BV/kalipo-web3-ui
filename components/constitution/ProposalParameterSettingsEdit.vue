<template>
  <div>
    <div v-if="step == 0">
      <v-card-text>
        <AutonStepperHeader
          title="Bill to change propsal type settings"
          subtitle="Select proposal type"
        >
        </AutonStepperHeader>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <ProposalTypeList
          :selectedProposalType.sync="selectedProposalType"
        ></ProposalTypeList>
      </v-card-text>
    </div>

    <div v-if="step == 1">
      <v-card-text>
        <AutonStepperHeader
          title="Bill to change propsal type settings"
          subtitle="Edit proposal type"
        >
        </AutonStepperHeader>
      </v-card-text>
      <v-divider></v-divider>
      <ProposalParameterSettings
        class="mt-1"
        editMode="true"
      ></ProposalParameterSettings>
    </div>

    <v-divider></v-divider>

    <v-card-text v-if="step !== 'sign' && !hideNavigation">
      <div class="d-flex align-center justify-space-between">
        <v-btn @click="prevStep">
          <v-icon class="mr-2" small>mdi-arrow-left</v-icon> previous
        </v-btn>
        <v-btn
          color="accent"
          @click="nextStep"
          :disabled="selectedProposalType == null"
        >
          next <v-icon class="ml-2" small>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </v-card-text>
  </div>
</template>

<script>
export default {
  data: () => ({
    step: 0,
    hideNavigation: false,
    selectedProposalType: null,
  }),
  mounted() {},
  methods: {
    prevStep() {
      if (this.step <= 0) {
        this.$emit("prevStep");
        this.step = 0;
      }
      this.step--;
    },
    nextStep() {
      this.step++;
    },
  },
};
</script>

<style>
</style>