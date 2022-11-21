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
        label="Search an attendee"
        append-icon="mdi-magnify"
        class="mt-4"
        style="max-width: 250px"
        disabled
      ></v-text-field>
    </v-row>
    <v-row class="mt-2">
      <v-col cols="4" v-for="(member, i) in members" :key="i">
        <MemberCard
          :autonId="autonId"
          :attendeeCard="true"
          :member="member"
        ></MemberCard>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: "auton",
  data: () => ({
    dialog: true,
    members: [],
    auton: null,
    autonId: "",
  }),
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
      this.autondId = autonIdWrapper.result.id;
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
  },
};
</script>
