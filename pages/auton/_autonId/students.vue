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
  <v-container>
    <v-row class="mt-2 ml-1">
      <v-text-field
        solo
        label="Search a student"
        append-icon="mdi-magnify"
        class="mt-4"
        style="max-width: 250px"
        v-model="search"
        v-if="auton != null"
      ></v-text-field>

        <v-col class="d-flex justify-start">
            <v-btn
            class="mt-2"
            color="accent"
            :disabled="authorizedAddAttendee"
            @click="dialog = !dialog"
            >
            Add student
            </v-btn>
        </v-col>
    </v-row>
    <v-row align="stretch" class="mt-2">
      <v-col cols="12" md="3" v-for="(member, i) in filtered" :key="i">
        <MemberCard
          :autonId="autonId"
          :studentCard="true"
          :member="member"
        ></MemberCard>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="500">
    <AutonAddAttendee
        :autonId="autonId"
        callbackFinish="Auton-ProposalModalClose"
    ></AutonAddAttendee>
    </v-dialog>
  </v-container>
</template>
<script>
import AutonAddAttendee from "~/components/event/AutonAddAttendee.vue";

export default {
    components: {
    AutonAddAttendee,
},
  layout: "auton",
  data: () => ({
    authorizedAddAttendee: true,
    dialog: false,
    members: [],
    auton: null,
    autonId: "",
    search: "",
  }),
  computed: {
    filtered() {
      return this.members.filter((member) =>
        member.account.name.toLowerCase().includes(this.search.toLowerCase())
      );
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
            this.authorizedAddAttendee = false;
          }
        });
      } else {
        return true;
      }
    },
  },
  async mounted() {
    this.$nuxt.$emit("Auton-setPage", "attendees");

    const autonIdParam = this.$route.params.autonId.replaceAll("_", " ");

    const autonIdWrapper = await this.$invoke("auton:getAutonIdByName", {
      name: autonIdParam,
    });
    this.autonId = autonIdWrapper.result;
    if (autonIdWrapper.result === null) {
      this.auton = null;
      this.error = "Auton not found: " + autonIdParam;
    } else {
      this.autonId = autonIdWrapper.result.id;

      const autonWrapper = await this.$invoke("auton:getByID", {
        id: autonIdWrapper.result.id,
      });
      this.auton = autonWrapper.result;

      for (let index = 0; index < this.auton.memberships.length; index++) {
        const autonMembershipId = this.auton.memberships[index];
        const autonMembershipWrapper = await this.$invoke(
          "membership:getByID",
          {
            id: autonMembershipId,
          }
        );

        const kalipoAccountWrapper = await this.$invoke(
          "kalipoAccount:getByID",
          {
            id: autonMembershipWrapper.result.accountId,
          }
        );
        autonMembershipWrapper.result.account = kalipoAccountWrapper.result;
        if (BigInt(autonMembershipWrapper.result.started) != BigInt(0)) {
          this.members.push(autonMembershipWrapper.result);
        }
      }
    }

    this.authorized();
  },

};
</script>
