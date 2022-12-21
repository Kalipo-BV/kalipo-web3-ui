<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card v-if="!signing">
        <v-card-title class="text-h5">
          You are about to check in for lesson:
        </v-card-title>

        <v-card-text>
          <LessonCard
            :auton="auton"
            :validAuton="validAuton">
          </LessonCard>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="red white--text"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn
            color="blue darken-1 white--text"
            @click="checkIn"
            :disabled="!validAuton"
          >
            Check-in
          </v-btn>
        </v-card-actions>

      </v-card>

<!--      TODO: Moet hier een callback?-->
      <AccountSign
        :transaction="transaction"
        :uri="uri"
        v-if="signing"
        title="Check-in"
      ></AccountSign>

    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "CheckInDialog",
  components: {},
  props: ["auton", "validAuton", "uuid"],
  data: () => ({
    dialog: true,
    isFetching: false,
    signing: false,
    transaction: {
      moduleId: 1002,
      assetId: 3,
      assets: {},
    },
    uri: "",
  }),
  mounted() {
    if (!this.auton) {
      this.validAuton = false;
    }
    console.log(this.uuid)
    console.log(this.auton)
    console.log(this.validAuton)

    if (this.UUID) {
      this.dialog = true;
    }
  },
  computed: {
    account() {
      return this.$store.state.wallet.account;
    },
  },
  methods: {
    async checkIn() {
      this.signing = true

      const membershipId = await this.findMembershipId();

      // backend call to check in with membershipId
      this.uri = this.uri = `auton/${this.auton.autonProfile.name.replace(" ", "_")}`;

      this.transaction.assets = {
        membershipId: membershipId,
      };

    },

    async findMembershipId() {
      let unlockedAccount = this.account.accountId

      const attendeeWrapper = await this.$invoke("kalipoAccount:getByID", {
        id: unlockedAccount,
      });

      console.log(attendeeWrapper);
      const attendee = attendeeWrapper.result

      console.log(attendee);

      const membership = attendee.memberships.find(m => m.autonId === this.auton.autonId)

      if (!membership) {
        alert("You are not a member of this lesson. You can't check in.")
      }

      return membership
    },
  },
}
</script>

<style scoped>

</style>
