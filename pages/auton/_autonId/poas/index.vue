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
      <v-btn
        class="mb-2 ml-4 pa-6"
        :disabled="authorizedNewPoa"
        text
        outlined
        @click="dialog = !dialog"
        >Create poa</v-btn
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
    authorizedNewPoa: true,
  }),
  computed: {
    account() {
      return this.$store.state.wallet.account;
    },
    unlocked() {
      return this.$store.state.wallet.unlocked;
    },
  },
  methods: {
    async authorized() {
      if (this.unlocked) {
        const memberships = this.$store.state.wallet.account.memberships;
        memberships.forEach(async (element) => {
          const mship = await this.$invoke("membership:getByID", {
            id: element,
          });
          if (
            mship.result.autonId == this.autonId &&
            mship.result.role == "FULL_MEMBER"
          ) {
            this.authorizedNewPoa = false;
          }
        });
      } else {
        return true;
      }
    },
  },
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
        console.log(poaId);
        const poaWrapper = await this.$invoke("poa:getByID", {
          id: poaId,
        });

        this.poas.push(poaWrapper.result);
      }
    }

    this.authorized();
  },
};
</script>
<style lang=""></style>
