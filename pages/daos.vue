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
    <v-text-field v-if="daos.length != null" solo label="Search a DAO" append-icon="mdi-magnify" class="mt-4"
      style="max-width: 250px" v-model="search"></v-text-field>
    <v-row dense>
      <v-col cols="12" md="3" v-for="(dao, i) in filtered" :key="i">
        <div @click="navigate(i)">
          <DaoCard :dao="dao"></DaoCard>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: "wallet",
  data: () => ({ daos: [], search: "" }),
  computed: {
    filtered() {
      return this.daos.filter((dao) =>
        dao.daoProfile.name
          .toLowerCase()
          .includes(this.search.toLowerCase())
      );
    },
  },
  created() { },
  mounted: async function () {
    this.$nuxt.$emit("MainMenu-setPage", "daos");

    const daos = await this.$invoke("dao:getAll", {});
    console.log(daos)
    if (daos.result != null) {
      for (let index = 0; index < daos.result.ids.length; index++) {
        const daoId = daos.result.ids[index];
        const daoWrapper = await this.$invoke("dao:getByID", {
          id: daoId,
        });
        const dao = daoWrapper.result;
        this.daos.push(dao);
      }
    }
  },
  methods: {
    navigate(index) {
      this.$router.push("/dao/" +
        this.daos[index].daoProfile.name
          .replaceAll(" ", "_")
          .toLowerCase());
    },
  },
};
</script>
