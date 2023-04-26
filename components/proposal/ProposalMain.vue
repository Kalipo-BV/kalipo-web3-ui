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
    <v-stepper
      alt-labels
      class="mt-0"
      style="background-color: #eef1f5"
      flat
      v-model="step"
    >
      <v-stepper-header class="py-2">
        <v-stepper-step
          step="1"
          color="accent"
          :complete="proposal.status != 'CAMPAIGNING'"
          @click="$router.push(mainPath + 'campaigning')"
        >
          <div class="d-flex justify-center">Dialogue</div>
          <div class="d-flex justify-center mt-2">
            <small v-if="proposal && userLang">{{
              new Date(parseInt(proposal.created) * 1000).toLocaleDateString(
                userLang,
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }
              )
            }}</small>
          </div>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          step="2"
          @click="$router.push(mainPath + 'voting')"
          color="accent"
          :complete="
            proposal.status != 'CAMPAIGNING' && proposal.status != 'VOTING'
          "
        >
          <div class="d-flex justify-center">Voting</div>
          <div class="d-flex justify-center mt-2">
            <small v-if="proposal && userLang">{{
              new Date(parseInt(proposal.windowOpen) * 1000).toLocaleDateString(
                userLang,
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }
              )
            }}</small>
          </div>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          step="3"
          @click="$router.push(mainPath + 'results')"
          color="accent"
          :complete="proposal.status == 'ENDED'"
        >
          <div class="d-flex justify-center">Closed</div>
          <div class="d-flex justify-center mt-2">
            <small v-if="proposal && userLang">{{
              new Date(
                parseInt(proposal.windowClosed) * 1000
              ).toLocaleDateString(userLang, {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })
            }}</small>
          </div>
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>
    <v-card flat class="mt-0 rounded-lg">
      <v-card flat>
        <v-card-text class="py-2">
          <div class="" v-if="proposal">
            <div class="text-h4 primary--text">{{ proposal.title }}</div>
          </div>
        </v-card-text>
      </v-card>

      <div v-for="(item, i) in list" :key="i">
        <v-divider></v-divider>

        <v-card flat link @click="navigateTo(item.link)">
          <v-card-text class="py-2">
            <div class="d-flex align-center">
              <v-avatar
                color="primary"
                size="25"
                class="white--text mr-2"
                v-if="item.icon"
                ><v-icon dark x-small>{{ item.icon }}</v-icon></v-avatar
              >

              <div class="d-flex justify-space-between" style="width: 100%">
                <div class="text-caption font-weight-medium">
                  {{ item.leftText }}
                </div>
                <div class="text-caption">
                  {{ item.rightText }}
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-card>
    <p>proposals: {{ getStakeholders() }}</p>
  </div>
</template>

<script>
export default {
  props: ["proposal", "submitter"],
  data: () => ({
    list: [],
    userLang: null,
    mainPath: null,
    step: 1,
    proposals: [null],
  }),
  async mounted() {


    
    const autonIdParam = this.$route.params.autonId.replaceAll("_", " ");
    const proposalIndexPlusOne = parseInt(this.$route.params.proposalId);
    this.mainPath = `/auton/${autonIdParam}/proposal/${proposalIndexPlusOne}/`;

    const proposals = await this.$invoke("kalipoAccount:getAll");

    if (!proposals.error) {
      const ids = proposals.result.ids.reverse();
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        const proposalWrapper = await this.$invoke("kalipoProposal:getByID", {
          id: id,
        });
        if (!proposalWrapper.error && alreadyMemberAccounts.indexOf(id) == -1) {
          proposalWrapper.result.id = id;
          this.proposals.push(proposalWrapper.result);
        }
      }
    }

    console.log("proposals uit database: ")
    console.log(proposals)
    
    if (
      this.proposal != null &&
      this.submitter != null &&
      this.proposal.membershipInvitationArguments != null
    ) {
      if (this.proposal.status == "CAMPAIGNING") {
        this.step = 1;
      } else if (this.proposal.status == "VOTING") {
        this.step = 2;
      } else if (this.proposal.status == "ENDED") {
        this.step = 3;
      }

      this.userLang = navigator.language || navigator.userLanguage;
      this.list.push({
        icon: "mdi-calendar",

        leftText: "Submission:",
        rightText: new Date(
          parseInt(this.proposal.created) * 1000
        ).toLocaleDateString(this.userLang, {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      });

      this.list.push({
        icon: "mdi-account",
        leftText: "Proposer:",
        rightText: "@" + this.submitter.username,
        link: "/account/" + this.submitter.username,
      });

      this.list.push({
        icon: "mdi-bank",
        leftText: "Proposal type:",
        rightText: this.proposal.type.replaceAll("-", " "),
      });

      const invitedId = this.proposal.membershipInvitationArguments.accountId;
      const invitedWrapper = await this.$invoke("kalipoAccount:getByID", {
        id: invitedId,
      });
      const invited = invitedWrapper.result;
      this.list.push({
        icon: "mdi-account-plus",
        leftText: "Membership candidate:",
        rightText: "@" + invited.username,
        link: "/account/" + invited.username,
      });
    }
  },
  methods: {
    navigateTo(to) {
      if (to) {
        this.$router.push(to);
      }
    },
    getStakeholders(){
      return this.proposal.stakeholders;
    },
    getInitials(parseStr) {
      if (parseStr != undefined) {
        const nameList = parseStr.split(" ");
        let result = "";
        for (let index = 0; index < nameList.length; index++) {
          if (index < 3) {
            const element = nameList[index];
            result += element[0].toUpperCase();
          } else {
            break;
          }
        }
        return result;
      }
    },
  },
};
</script>

<style>
</style>