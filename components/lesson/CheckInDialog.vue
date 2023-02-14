<!-- Kalipo B.V. - the DAO platform for business & societal impact
 * Copyright (C) 2022 Peter Nobels and Matthias van Dijk
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->
<template>
  <v-row justify="center">
    <v-dialog v-if="!memberInLesson" v-model="dialog2" max-width="400">
      <v-card>
        <v-card-title class="text-h5 mb-2"> Error </v-card-title>

        <v-card-text>
          You are not a member of this lesson and can therefore not check in.
          Please contact the lesson owner to join the lesson.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ml-1 mb-2"
            color="red white--text"
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-if="memberInLesson" persistent v-model="dialog" max-width="400">
      <v-card v-if="!signing">
        <v-card-title class="text-h5 mb-2 ml-1">
          You are about to check {{ !checkingOut ? "in" : "out" }} for lesson:
        </v-card-title>

        <v-card-text>
          <LessonCard :auton="auton" :validAuton="validAuton"> </LessonCard>
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
            Check-{{ !checkingOut ? "in" : "out" }}
          </v-btn>
        </v-card-actions>
      </v-card>

      <AccountSign
        :transaction="transaction"
        :uri="uri"
        callback="previousCheckInStep"
        v-if="signing"
        :title="signingTitle"
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
    dialog2: true,
    isFetching: false,
    signing: false,
    signingTitle: "Check-in",
    memberInLesson: false,
    checkingOut: false,
    transaction: {
      moduleId: 1002,
      assetId: 3,
      assets: {},
    },
    uri: "",
  }),
  async mounted() {
    this.$nuxt.$on("previousCheckInStep", () => {
      this.signing = false;
    });

    if (!this.auton) {
      this.validAuton = false;
    }

    if (this.uuid) {
      this.dialog = true;
      this.dialog2 = true;
    }

    if (!this.account.accountId) return;

    const membershipId = await this.findMembershipId();
    if (!membershipId) return;

    const membershipWrapper = await this.$invoke("membership:getByID", {
      id: membershipId,
    });

    const membership = membershipWrapper.result;

    if (membership.checkedStatus === "CHECKEDIN") {
      this.signingTitle = "Check-out";
      this.checkingOut = true;
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
      this.signing = true;

      const membershipId = await this.findMembershipId();
      if (!membershipId) return;

      const membershipWrapper = await this.$invoke("membership:getByID", {
        id: membershipId,
      });

      const membership = membershipWrapper.result;

      if (membership.checkedStatus === "CHECKEDIN") {
        this.signingTitle = "Check-out";
      }

      // this is where the router pushes the user to, but it already gets pushed to /auton so you only have to add the auton name
      // if you are not on the attendees page, it pushes you to the /attendees, this is because the front-end wouldn't update otherwise
      // because an push to the same page doesn't trigger a reload of the data in the store
      this.uri = `${this.auton.autonProfile.name.replaceAll(
        " ",
        "_"
      )}/students`;

      this.transaction.assets = {
        membershipId: membershipId,
      };
    },

    async findMembershipId() {
      let unlockedAccount = this.account.accountId;

      const attendeeWrapper = await this.$invoke("kalipoAccount:getByID", {
        id: unlockedAccount,
      });

      const attendee = attendeeWrapper.result;

      const autonsWrapper = await this.$invoke("auton:getAll");
      const autons = autonsWrapper.result.ids;

      let foundAuton = null;
      let foundAutonId = null;

      for (let i = 0; i < autons.length; i++) {
        let autonId = autons[i];

        const autonWrapper = await this.$invoke("auton:getByID", {
          id: autonId,
        });

        const auton = autonWrapper.result;

        if (!auton.lesson) continue;

        if (auton.lesson.uuid == this.uuid) {
          foundAuton = auton;
          foundAutonId = autonId;
        }
      }

      const auton = foundAuton;

      for (let membership of auton.memberships) {
        if (attendee.memberships.includes(membership)) {
          this.memberInLesson = true;
          break;
        }
      }
      let foundMembership = null;
      let foundMembershipId = null;

      for (let i = 0; i < attendee.memberships.length; i++) {
        const m = attendee.memberships[i];

        const membershipWrapper = await this.$invoke("membership:getByID", {
          id: m,
        });

        const membership = membershipWrapper.result;

        if (membership.autonId == foundAutonId) {
          foundMembership = membership;
          foundMembershipId = m;
        }
      }

      return foundMembershipId;
    },
  },
};
</script>

<style scoped>
</style>
