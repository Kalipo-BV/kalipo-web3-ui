<template>
  <div class="">
    <v-card>
      <v-card-text v-if="step == 'invite-attendees'">
        <AutonStepperHeader
          title="Inviting attendees"
          subtitle="Select profiles you want to invite"
        ></AutonStepperHeader>
      </v-card-text>

      <AccountSign
        :transaction="transaction"
        :uri="uri"
        v-if="step == 'sign'"
        title="Submitting proposal"
      ></AccountSign>

      <v-card-text v-if="step !== 'sign'">
        <div class="d-flex align-center justify-space-between">
          <v-btn :disabled="step == 0" @click="prevStep">
            <v-icon class="mr-2" small>mdi-arrow-left</v-icon> previous
          </v-btn>
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
  props: ["autonId"],
  data() {
    return {
      step: "invite-attendees",
    };
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

        // const asset = {
        //   title: this.proposalTitle,
        //   campaignComment: this.proposalDescription,
        //   proposalType: this.selectedProposalType,
        //   autonId: this.autonId,
        //   accountIdToInvite: this.selectedAccountId,
        //   invitationMessage: this.invitationMessage,
        // };

        // console.log("ASSETTTTT");
        // console.log(asset);
        // this.transaction.moduleId = 1004;
        // this.transaction.assetId = 0;
        // this.transaction.assets = asset;
      }
    },
  },
};
</script>
<style lang=""></style>
