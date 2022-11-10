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
    <v-row v-if="account">
      <v-container>
        <v-row>
          <v-col cols="12" md="3" v-for="(auton, i) in autons" :key="i">
            <div @click="navigate(i)" class="mt-2">
              <AutonCard :auton="auton"></AutonCard>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "account",

  data: () => ({
    account: null,
    autons: [],
  }),

  async mounted() {
    this.$nuxt.$emit("Account-setPage", "autons");

    let accountIdParam = this.$route.params.accountId;
    if (accountIdParam.indexOf("@") == 0) {
      accountIdParam = accountIdParam.replace("@", "");
    }
    const accountIdWrapper = await this.$invoke(
      "kalipoAccount:getAccountIdByUsername",
      {
        username: accountIdParam,
      }
    );

    if (accountIdWrapper.result) {
      const accountWrapper = await this.$invoke("kalipoAccount:getByID", {
        id: accountIdWrapper.result.id,
      });

      this.account = accountWrapper.result;

      for (let index = 0; index < this.account.memberships.length; index++) {
        const membershipId = this.account.memberships[index];
        const membershipWrapper = await this.$invoke("membership:getByID", {
          id: membershipId,
        });
        const membership = membershipWrapper.result;

        const autonWrapper = await this.$invoke("auton:getByID", {
          id: membership.autonId,
        });
        const auton = autonWrapper.result;

        const now = new Date();
        const nowInSec = BigInt(Math.floor(now / 1000));

        auton.activeMembershipsCount = 0;
        for (let indexQ = 0; indexQ < auton.memberships.length; indexQ++) {
          const autonMembershipId = auton.memberships[indexQ];
          const autonMembershipWrapper = await this.$invoke(
            "membership:getByID",
            {
              id: autonMembershipId,
            }
          );
          if (
            BigInt(autonMembershipWrapper.result.started) != BigInt(0) &&
            nowInSec > BigInt(autonMembershipWrapper.result.started)
          ) {
            auton.activeMembershipsCount++;
          }
        }

        this.autons.push(auton);
      }
    }
  },
  methods: {
    navigate(index) {
      console.log(this.autons[index].autonProfile.name);
      this.$router.push(
        "/auton/" +
          this.autons[index].autonProfile.name
            .replaceAll(" ", "_")
            .toLowerCase()
      );
    },
  },
};
</script>

<style>
</style>