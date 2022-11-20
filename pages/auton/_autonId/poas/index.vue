<template>
  <v-container>
    <v-row class="mt-2 ml-1" style="justify-content: left; align-items: center">
      <v-text-field
        solo
        label="Search a poa"
        append-icon="mdi-magnify"
        class="mt-4"
        style="max-width: 250px"
        disabled
      ></v-text-field>
      <v-btn class="mb-2 ml-4 pa-6" text outlined @click="dialog = !dialog"
        >New poa</v-btn
      >
    </v-row>
    <v-row class="">
      <v-col xs="12" sm="6" md="4" lg="3" v-for="(poa, i) in poas" :key="i">
        <PoaCard :poa="poa"></PoaCard>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px">
      <PoaCreateDialog :autonId="autonId" :auton="auton"></PoaCreateDialog>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  layout: "auton",
  data: () => ({
    dialog: false,
    poas: [],
    auton: null,
    autonId: null,
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
      this.autonId = autonIdWrapper.result.id;
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

    console.log(this.poas);
  },
};
</script>
<style lang=""></style>
