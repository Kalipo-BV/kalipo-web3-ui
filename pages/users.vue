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
    <v-text-field
      solo
      label="Search a user"
      append-icon="mdi-magnify"
      class="mt-4"
      style="max-width: 250px"
      disabled
      v-model="search"
    ></v-text-field>
    <v-row dense>
      <v-col cols="12" md="3" v-for="(account, index) in accounts" :key="index">
        <MemberCard :member="account"></MemberCard>
        <!-- {{ account }} -->
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: "wallet",
  data: () => ({ accounts: [], search: "" }),
  created() {},
  mounted: async function () {
    this.$nuxt.$emit("MainMenu-setPage", "users");

    const kalipoAccounts = await this.$invoke("kalipoAccount:getAll", {});
    console.log(kalipoAccounts);
    for (let index = 0; index < kalipoAccounts.result.ids.length; index++) {
      const kalipoAccountId = kalipoAccounts.result.ids[index];
      const kalipoAccount = await this.$invoke("kalipoAccount:getByID", {
        id: kalipoAccountId,
      });
      this.accounts.push({ account: kalipoAccount.result });
    }
  },
  methods: {},
};
</script>
