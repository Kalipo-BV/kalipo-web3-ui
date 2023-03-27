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
  <div style="display: flex; flex-wrap: wrap; justify-content: space-evenly; align-content: start">
    <div style="margin-top: 20px"
        v-for="(item, i) in proposals"
        :key="i">
      <ImprovementProposalCard :proposal="item"></improvementproposalCard>
    </div>
  </div>
</template>
<script>
import ImprovementProposalCard from "~/components/improvement_proposal/improvementProposalCard.vue";
export default {
  layout: "auton",
  components: {ImprovementProposalCard},
  data: () => ({
    dialog: true,
    userLang: null,
    filterStatus: [],
    filterResult: [],
    resultEnum: ["UNDECIDED", "ACCEPTED", "REJECTED"],
    search: "",
    headers: [
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
      if (proposalWrapper.result.status === "CAMPAIGNING") {
        linkStatus = "campaigning";
      }
      if (proposalWrapper.result.status === "VOTING") {
        linkStatus = "voting";
      }
      if (proposalWrapper.result.status === "DECIDED") {
        linkStatus = "voting";
      }

      if (proposalWrapper.result.status === "ENDED") {
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
};
</script>
