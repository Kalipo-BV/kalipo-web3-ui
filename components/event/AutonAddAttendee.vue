<template>
  <div class="">
    <v-card>
      <v-card-text v-if="step == 'invite-attendees'">
        <AutonStepperHeader
          :title="title"
          subtitle="Select profiles you want to invite"
        ></AutonStepperHeader>
        <AutonUserSelect
          :selectedFounderIds.sync="selectedFounderIds"
          class="mt-4"
        ></AutonUserSelect>
      </v-card-text>

      <AccountSign
        :transaction="transaction"
        :uri="uri"
        callback="autonAddStudentBack"
        v-if="step == 'sign'"
        title="Adding members"
      ></AccountSign>

      <v-card-text v-if="step !== 'sign'">
        <div class="d-flex align-right justify-space-between">
          <v-spacer></v-spacer>
          <v-btn color="accent" @click="nextStep">
            next <v-icon class="ml-2" small>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  props: ["autonId", "title"],
  data() {
    return {
      step: "invite-attendees",
      selectedFounderIds: [],
      uri: "",
      transaction: {
        moduleId: 1002,
        assetId: 2,
        assets: {},
      },
    };
  },
  mounted() {
    this.$nuxt.$on("autonAddStudentBack", () => {
      this.step = "invite-attendees";
    });
  },
  methods: {
    prevStep() {
      if (this.step == "") {
        this.step = "select-proposal-type";
      }
    },
    async nextStep() {
      if (this.step == "invite-attendees") {
        this.step = "sign";
      }

      if (this.step == "sign") {
        const autonWrapper = await this.$invoke("auton:getByID", {
          id: this.autonId,
        });

        const auton = autonWrapper.result;

        this.uri = `/auton/${auton.autonProfile.name.replace(" ", "_")}`;

        const asset = {
          receiverAddresses: this.selectedFounderIds,
          autonId: this.autonId,
        };

        this.transaction.assets = asset;
      }
    },
  },
};
</script>
<style lang=""></style>
