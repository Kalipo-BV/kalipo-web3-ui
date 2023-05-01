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
  <v-container style="height: 100%">
    <v-text-field v-if="autons.length != null" solo label="Search an auton" append-icon="mdi-magnify" class="mt-4"
      style="max-width: 250px" v-model="search"></v-text-field>
    <v-row dense>
      <v-col cols="12" md="3" v-for="(auton, i) in filtered" :key="i">
        <div @click="navigate(i)">
          <AutonCard :auton="auton"></AutonCard>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: "wallet",
  data: () => ({ autons: [], search: "" }),
  computed: {
    filtered() {
      return this.autons.filter((auton) =>
        auton.autonProfile.name
          .toLowerCase()
          .includes(this.search.toLowerCase())
      );
    },
  },
  created() { },
  mounted: async function () {
    this.$nuxt.$emit("MainMenu-setPage", "autons");

    const autons = await this.$invoke("auton:getAll", {});
    if (autons.result != null) {
      for (let index = 0; index < autons.result.ids.length; index++) {
        const autonId = autons.result.ids[index];
        const autonWrapper = await this.$invoke("auton:getByID", {
          id: autonId,
        });

        const auton = autonWrapper.result;
        const daoId = auton.daoId;
        const daoWrapper = await this.$invoke("dao:getByID", {
          id: daoId,
        });
        const dao = daoWrapper.result;
        auton.dao = dao;

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
      this.$router.push("/dao/" +
        this.autons[index].dao.daoProfile.name
          .replaceAll(" ", "_")
          .toLowerCase() +
        "/auton/" +
        this.autons[index].autonProfile.name
          .replaceAll(" ", "_")
          .toLowerCase()
      );
    },
  },
};
</script>
