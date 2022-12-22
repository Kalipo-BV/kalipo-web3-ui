<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card v-if="!signing">
        <v-card-title class="text-h5 mb-2 ml-1">
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
            class="ml-1 mb-2"
            color="red white--text"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn
            class="mr-2 mb-2"
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
        callback="previousCheckInStep"
        v-if="signing"
        title="Check-in"
      ></AccountSign>

    </v-dialog>
  </v-row>
</template>

<script>
export default {
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
    this.$nuxt.$on("previousCheckInStep", () => {
      this.signing = false;
    });

    if (!this.auton) {
      this.validAuton = false;
    }

    if (this.uuid) {
      this.dialog = true;
    }
  },
  computed: {
    account() {
      return this.$store.state.wallet.account;
    },
  },
  methods: {
    prevStep() {
      this.signing = false;
    },

    async checkIn() {
      this.signing = true

      const membershipId = await this.findMembershipId();
      if (!membershipId) return

      // this is where the router pushes the user to, but it already gets pushed to /auton so you only have to add the auton name
      // if you are not on the attendees page, it pushes you to the /attendees, this is because the front-end wouldn't update otherwise
      // because an push to the same page doesn't trigger a reload of the data in the store
      this.uri = `${this.auton.autonProfile.name.replaceAll(" ", "_")}`;

      this.transaction.assets = {
        membershipId: membershipId,
      };

    },

    async findMembershipId() {
      let unlockedAccount = this.account.accountId

      const attendeeWrapper = await this.$invoke("kalipoAccount:getByID", {
        id: unlockedAccount,
      });

      const attendee = attendeeWrapper.result

      if (!attendee) {
        alert("You are not a member of this Auton. Please join first.")
        return
      }

      const autonsWrapper = await this.$invoke("auton:getAll");
      const autons = autonsWrapper.result.ids


      let foundAuton = null
      let foundAutonId = null



      for (let i = 0; i < autons.length; i++) {
        let autonId = autons[i]

        const autonWrapper = await this.$invoke("auton:getByID", {
          id: autonId,
        });

        const auton = autonWrapper.result


        if (!auton.lesson) continue

        if (auton.lesson.uuid == this.uuid) {
          foundAuton = auton
          foundAutonId = autonId
        }
      }

      const auton = foundAuton


      let foundMembership = null
      let foundMembershipId = null

      for (let i = 0; i < attendee.memberships.length; i++) {
        const m = attendee.memberships[i]

        const membershipWrapper = await this.$invoke("membership:getByID", {
          id: m,
        });

        const membership = membershipWrapper.result


        if (membership.autonId == foundAutonId) {
          foundMembership = membership
          foundMembershipId = m
        }

      }

      return foundMembershipId



      const membership = attendee.memberships.find(m => m.autonId === this.auton.autonId)


      const membershipWrapper = await this.$invoke("membership:getByID", {
        id: membership,
      });

      const autonMembershipWrapper = await this.$invoke("auton:getByID", {
        id: membershipWrapper.result.autonId,
      });


      if (!membership) {
        alert("You are not a member of this lesson. You can't check in.")
        return
      }

      return membership
    },
  },
}
</script>

<style scoped>

</style>
