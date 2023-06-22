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
  <div>
    <div class="model" @click="close"></div>
    <div class="box">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            append-icon="mdi-magnify"
            label="Search a agreement"
            solo
            hide-details
            v-model="search"
            style="max-width: 250px"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-data-table
        item-key="name"
        class="elevation-1 table"
        :loading="loading"
        loading-text="Loading... Please wait"
        :headers="headers"
        :items="filterd_data"
        :search="search"
      >
        <template v-slot:item.agreement="{ item }">
          <router-link v-if="item.status ==`Local copy`" :to="`/contract/grant_contract?id=${item.id}`">
            <v-btn style="min-width: 65%" color="accent" small>Edit</v-btn>
          </router-link>
          <router-link v-else :to="{ path: '/contract/grant_contract', query: { bid: item.id, tid: item.tid, version: item.version }}">
            <v-btn style="min-width: 65%" color="accent" small>View</v-btn>
          </router-link>
        </template>
          <template v-slot:item.title="{ item }">
            {{ item.formData.title }}
          </template>
          <template v-slot:item.type="{ item }">
              {{ item.type }}
          </template>
          <template v-slot:item.version="{ item }">
            {{ item.version }} <!-- needs to be changed in BE/DB {{ item.version }}-->
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip outlined small>
              {{ item.status }}
            </v-chip>
          </template>
      </v-data-table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    modelData: { type: [], default: () => [] },
  },
  data: (vm) => ({
    search: "",
    filterd_data: vm.$props.modelData,

    loading: true,
    headers: [
        { text: "Agreements", align: 'center', value: "agreement" },
        { text: "Title", align: 'center', value: "title" },
        { text: "Agreement Type", align: 'center', value: "type" },
        { text: "Version", align: 'center', value: "version" },
        { text: "Status", align: 'center', value: "status" },
      ],
  }),
  methods: {
    close() {
      this.$emit("close");
    }
  },

  beforeMount() {
    this.loading = false;
  },
}

</script>

<style scoped>
  .model {
    background-color: rgba(10, 10, 40, 0.7);
    z-index: 5;
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
  }

  .box {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    width: 1000px;
    height: 650px;
    max-width: 90%;
    max-height: 90%;
    padding: 30px;

    border-radius: 5px;
    border: 1px #33333344 solid;
    background-color: white;

    z-index: 5;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .table {
    margin-top: 30px;
    overflow-y: auto;
    max-height: calc(100% - 90px);
  }
</style>
