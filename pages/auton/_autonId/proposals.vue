<template>
  <v-container>
    <div class="mt-4">
      <v-row>
        <v-col cols="1" md="3">
        <v-text-field
          append-icon="mdi-magnify"
          label="Search a proposal"
          solo
          hide-details
          v-model="search"
          style="max-width: 250px"
        ></v-text-field>
      </v-col>
        <v-col>
        <v-switch v-model="showTable" label="Table"></v-switch>
      </v-col>



      </v-row>
    </div>

    <v-data-table
      v-show="showTable"
      :headers="headers"
      :items="proposals"
      :items-per-page="5"
      :search="search"
      class="elevation-0 mt-4"
      :custom-filter="filter"
      :sort-by="['submission']"
      :sort-desc="[true]"
    >
      <template v-slot:item.link="{ item }">
        <v-btn color="accent" @click="$router.push(item.link)" small>Open</v-btn>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip :color="getStatusColor(item.status)" dark outlined small>{{ item.status }}</v-chip>
      </template>
      <template v-slot:item.author="{ item }">
        <v-btn outlined small @click="$router.push('/account/' + item.author)">@{{ item.author }}</v-btn>
      </template>
      <template v-slot:item.result="{ item }">
        <v-chip :color="getResultColor(item.result)" dark outlined small>{{ item.result }}</v-chip>
      </template>
      <template v-slot:item.submission="{ item }">
        {{
          new Date(parseInt(item.submission) * 1000).toLocaleDateString(userLang, {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })
        }}
      </template>
    </v-data-table>

    <div v-if="!showTable">
      <improvement-proposal-list :proposals="proposals"></improvement-proposal-list>
    </div>
  </v-container>
</template>

<script>
import ImprovementProposalList from "~/components/improvement_proposal/improvementProposalList.vue";

export default {
  components: {ImprovementProposalList},
  layout: "auton",
  data: () => ({
    dialog: true,
    showTable: true, // Toggle state
    userLang: null,
    filterStatus: [],
    filterResult: [],
    resultEnum: ["UNDECIDED", "ACCEPTED", "REJECTED"],
    search: "",
    headers: [
      { text: "Proposal", value: "link" },
      { text: "Title", align: "start", sortable: false, value: "title" },
      { text: "Type", value: "type" },
      { text: "Submitter", value: "author" },
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
        link: `/auton/${this.$route.params.autonId}/proposal/${
          index + 1
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
    toggleTable() {
      this.showTable = !this.showTable;
    },
    getStatusColor(status) {
      if (status == "") {
        // Custom logic for status color
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
        result = value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1;
      }
      return result;
    },
  },
};
</script>
