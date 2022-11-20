<template lang="">
  <div>
    <v-card>
      <v-card-text v-if="step == 0">
        <AutonStepperHeader
          title="Creating a new poa"
          subtitle="First choose a name and image id"
        ></AutonStepperHeader>

        <PoaNameImage :name.sync="name" :image.sync="image"></PoaNameImage>
      </v-card-text>

      <AccountSign
        :transaction="transaction"
        v-if="step == 1"
        :uri="uri"
        title="Creating poa"
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
export default {
  props: {
    autonId: String,
    auton: Object,
  },
  data() {
    return {
      step: 0,
      name: null,
      image: null,
      uri: "",

      transaction: {
        moduleId: 1008,
        assetId: 0,
        assets: {},
      },
    };
  },
  mounted() {
    console.log("autonId - PoaCreateDialog");
    console.log(this.autonId);
    console.log(this.auton.autonProfile.name);
  },
  computed: {},
  methods: {
    nextStep() {
      this.step++;

      if (this.step == 1) {
        this.uri = `/auton/${this.auton.autonProfile.name.replace(
          " ",
          "_"
        )}/poas`;

        const asset = {
          autonId: this.autonId,
          name: this.name,
          staticImageId: this.image,
        };

        this.transaction.assets = asset;
      }
    },
  },
};
</script>
