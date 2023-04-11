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
    <div class="mt-4">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field append-icon="mdi-magnify" label="Search a proposal" solo hide-details v-model="search"
            style="max-width: 250px"></v-text-field>
        </v-col>
      </v-row>

      <v-row> </v-row>
    </div>

    <v-data-table :headers="headers" :items="proposals" :items-per-page="5" :search="search" class="elevation-0 mt-4"
      :custom-filter="filter" :sort-by="['submission']" :sort-desc="[true]">
      <template v-slot:item.link="{ item }">
        <v-btn color="accent" @click="$router.push(item.link)" small>Open</v-btn>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip :color="getStatusColor(item.status)" dark outlined small>
          {{ item.status }}
        </v-chip>
      </template>
      <template v-slot:item.author="{ item }">
        <v-btn outlined small @click="$router.push('/account/' + item.author)">@{{ item.author }}</v-btn>
      </template>
      <template v-slot:item.result="{ item }">
        <v-chip :color="getResultColor(item.result)" dark outlined small>
          {{ item.result }}
        </v-chip>
      </template>

      <template v-slot:item.submission="{ item }">
        {{
          new Date(parseInt(item.submission) * 1000).toLocaleDateString(
            userLang,
            {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            }
          )
        }}
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
export default {
  layout: "auton",
  data: () => ({
    dialog: true,
    userLang: null,
    filterStatus: [],
    filterResult: [],
    resultEnum: ["UNDECIDED", "ACCEPTED", "REJECTED"],
    search: "",
    headers: [
      { text: "Proposal", value: "link" },
      {
        text: "Title",
        align: "start",
        sortable: false,
        value: "title",
      },
      { text: "Type", value: "type" },

      { text: "Author(s)", value: "author" },
      { text: "Status", value: "status" },
      { text: "Result", value: "result" },
      { text: "Submission date", value: "submission" },
    ],
    proposals: [],
  }),
  async mounted() {
    this.$nuxt.$emit("Auton-setPage", "proposals");
    this.userLang = navigator.language || navigator.userLanguage;

    const autonIdParam = this.$route.params.autonId.replaceAll("_", " ");

    const autonIdWrapper = await this.$invoke("auton:getAutonIdByName", {
      name: autonIdParam,
    });

    const autonWrapper = await this.$invoke("auton:getByID", {
      id: autonIdWrapper.result.id,
    });

    const daoWrapper = await this.$invoke("dao:getByID", {
      id: autonWrapper.result.daoId,
    });

    for (let index = 0; index < autonWrapper.result.proposals.length; index++) {
      const proposalId = autonWrapper.result.proposals[index];
      const proposalWrapper = await this.$invoke("proposal:getByID", {
        id: proposalId,
      });
      const submitterMembershipWrapper = await this.$invoke(
        "membership:getByID",
        {
          id: proposalWrapper.result.membershipId,
        }
      );
      const submitterAccountWrapper = await this.$invoke(
        "kalipoAccount:getByID",
        {
          id: submitterMembershipWrapper.result.accountId,
        }
      );
      let linkStatus = "";
      if (proposalWrapper.result.status == "CAMPAIGNING") {
        linkStatus = "campaigning";
      }
      if (proposalWrapper.result.status == "VOTING") {
        linkStatus = "voting";
      }
      if (proposalWrapper.result.status == "DECIDED") {
        linkStatus = "voting";
      }

      if (proposalWrapper.result.status == "ENDED") {
        linkStatus = "results";
      }

      this.proposals.push({
        link: `/dao/${daoWrapper.result.daoProfile.name.replaceAll(
          " ",
          "_"
        )}/auton/${this.$route.params.autonId}/proposal/${index + 1
          }/${linkStatus}`,
        status: proposalWrapper.result.status,
        type: proposalWrapper.result.type,
        title: proposalWrapper.result.title,
        submission: proposalWrapper.result.created,
        author: submitterAccountWrapper.result.username,
        result: proposalWrapper.result.binaryVoteResult.result,
      });

    }
  },
  methods: {
    getStatusColor(status) {
      if (status == "") {
      }
      return "primary";
    },
    getResultColor(result) {
      if (result == "UNDECIDED") {
        return "accent";
      }
      if (result == "ACCEPTED") {
        return "success";
      }
      if (result == "REJECTED") {
        return "error";
      }
      return "accent";
    },
    filter(value, search, item) {
      let result = false;
      if (value != null && search != null) {
        result =
          value
            .toString()
            .toLocaleUpperCase()
            .indexOf(search.toLocaleUpperCase()) !== -1;

        // if (this.filterResult.length > 0) {
        //   result = this.filterResult.contains(item.result);
        // }
      }
      return result;
    },
  },
};
</script>
