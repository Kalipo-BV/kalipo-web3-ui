<template lang="">
  <div>
    <v-card>
      <v-card-text v-if="step == 0">
        <AutonStepperHeader
          title="Issue a poa"
          subtitle="Choose a poa which is available to issue"
        ></AutonStepperHeader>

        <AvailablePoasIssue
          v-if="!isFetching"
          :poas="auton.poas"
          :member="member"
          :selected.sync="selected"
        ></AvailablePoasIssue>
      </v-card-text>

      <AccountSign
        :transaction="transaction"
        v-if="step == 1"
        :uri="uri"
        title="Issueing a poa"
      ></AccountSign>

      <v-divider v-if="step !== 1"></v-divider>

      <v-card-text v-if="step !== 1">
        <div class="d-flex align-center justify-space-between">
          <v-btn :disabled="step == 0" @click="step--">
            <v-icon class="mr-2" small>mdi-arrow-left</v-icon> previous
          </v-btn>
          <v-btn color="accent" v-if="step == 0" @click="nextStep">
            sign <v-icon class="ml-2" small>mdi-draw-pen</v-icon>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import AvailablePoasIssue from "./AvailablePoasIssue.vue";
export default {
  components: {
    AvailablePoasIssue,
  },
  props: {
    member: Object,
    autonId: String,
  },
  data() {
    return {
      step: 0,
      name: null,
      image: null,
      selected: null,
      uri: "",
      isFetching: true,
      transaction: {
        moduleId: 1009,
        assetId: 0,
        assets: {},
      },
      auton: null,
    };
  },
  async mounted() {
    const autonWrapper = await this.$invoke("auton:getByID", {
      id: this.autonId,
    });
    this.auton = autonWrapper.result;
    this.isFetching = false;

    console.log(this.member);
  },
  computed: {},
  methods: {
    async nextStep() {
      this.step++;

      if (this.step == 1) {
        this.uri = `/auton/${this.auton.autonProfile.name.replace(
          " ",
          "_"
        )}/poas`;

        const poaIds = [];

        for (let i = 0; i < this.selected.length; i++) {
          poaIds.push(this.selected[i].id);
        }

        const asset = {
          receiverAddress: this.member.accountId,
          poaIds: poaIds,
        };

        this.transaction.assets = asset;
      }
    },
  },
};
</script>
