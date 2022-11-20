<template>
  <v-container>
    <v-row class="mt-2" style="justify-content: left; align-items: center">
      <v-text-field
        solo
        label="Search a poa"
        append-icon="mdi-magnify"
        class="mt-4"
        style="max-width: 250px"
        disabled
      ></v-text-field>
      <v-btn class="mb-2 ml-4 pa-6" text outlined>New poa</v-btn>
    </v-row>
    <v-row class="">
      <v-col xs="12" sm="6" md="4" lg="3" v-for="(poa, i) in poas" :key="i">
        <v-card >
          <v-img
            class="white--text align-end"
            height="200px"
            :src=getImage(poa.staticImageId)
          >
          </v-img>
          <v-card-title>{{poa.name}}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: "auton",
  data: () => ({
    dialog: true,
    poas: [],
    auton: null,
  }),
  async mounted() {
    // this.$nuxt.$emit("Auton-setPage", "poas");

    const autonIdParam = this.$route.params.autonId.replaceAll("_", " ");

    const autonIdWrapper = await this.$invoke("auton:getAutonIdByName", {
      name: autonIdParam,
    });
    if (autonIdWrapper.result === null) {
      this.auton = null;
      this.error = "Auton not found: " + autonIdParam;
    } else {
      this.autondId = autonIdWrapper.result.id;
      const autonWrapper = await this.$invoke("auton:getByID", {
        id: autonIdWrapper.result.id,
      });
      this.auton = autonWrapper.result;

      for (let index = 0; index < this.auton.poas.length; index++) {
        const poaId = this.auton.poas[index];
        const poaWrapper = await this.$invoke("poa:getByID", {
          id: poaId,
        });

        this.poas.push(poaWrapper.result);
      }
    }
  },
  methods: {
    getImage(id) {
      return `/poa_images/${id}.png`
    },
  },
};
</script>
<style lang=""></style>
