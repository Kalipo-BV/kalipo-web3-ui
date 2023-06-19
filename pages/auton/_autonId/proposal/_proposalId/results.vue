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
    <v-row>
      <v-col cols="12" md="5">
        <ProposalMain
          v-if="proposal && submitter"
          :proposal="proposal"
          :submitter="submitter"
        ></ProposalMain>
      </v-col>

      <v-col cols="12" md="7">
        <v-col cols="2" md="12">
          <ProposalStatus
            v-if="proposal"
            :proposal="proposal"
          >
          </ProposalStatus>
        </v-col>
        <div class="text-h4 primary--text mt-4">Dialogue</div>
        <v-row dense class="mt-2" v-if="proposal">
          <v-col cols="12" md="4">
            <v-card flat>
              <v-card-text class="d-flex align-center justify-start">
                <v-avatar color="accent" dark size="40"
                  ><div
                    class="text-body-caption white--text font-weight-medium"
                  >
                    {{ commentCount }}
                  </div></v-avatar
                >
                <div class="pl-2">
                  <div class="text-caption font-weight-medium">
                    Messages
                  </div>
                  <div class="text-caption">
                    {{ commentUniqueMembershipCount }} member{{
                      commentUniqueMembershipCount != 1 ? "s" : ""
                    }}
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <div class="text-h4 primary--text mt-4">Results</div>
        <v-row dense class="mt-2" v-if="proposal">
          <v-col cols="12" md="4">
            <v-card flat v-if="proposal.binaryVoteResult.result == 'ACCEPTED'">
              <v-card-text class="d-flex align-center justify-start">
                <v-avatar color="success" dark size="40"
                  ><v-icon small dark>mdi-thumb-up</v-icon></v-avatar
                >
                <div class="pl-2">
                  <div class="text-caption font-weight-medium">Accepted</div>
                  <div class="text-caption"></div>
                </div>
              </v-card-text>
            </v-card>
            <v-card flat v-if="proposal.binaryVoteResult.result == 'REJECTED'">
              <v-card-text class="d-flex align-center justify-start">
                <v-avatar color="error" dark size="40"
                  ><v-icon small dark>mdi-thumb-down</v-icon></v-avatar
                >
                <div class="pl-2">
                  <div class="text-caption font-weight-medium">Rejected</div>
                  <div class="text-caption"></div>
                </div>
              </v-card-text>
            </v-card>
            <v-card flat v-if="proposal.binaryVoteResult.result == 'UNDECIDED'">
              <v-card-text class="d-flex align-center justify-start">
                <v-avatar color="#0a75f3" dark size="40"
                  ><v-icon small dark>mdi-clock-alert-outline</v-icon></v-avatar
                >
                <div class="pl-2">
                  <div class="text-caption font-weight-medium">Undecided</div>
                  <div class="text-caption"></div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card flat>
              <v-card-text class="d-flex align-center justify-start">
                <v-avatar color="success" dark size="40"
                  ><div
                    class="text-body-caption white--text font-weight-medium"
                    v-if="proposal.binaryVoteResult.memberCount != 0"
                  >
                    {{
                      Math.floor(
                        ((proposal.binaryVoteResult.acceptedCount +
                          proposal.binaryVoteResult.refusedCount) /
                          proposal.binaryVoteResult.memberCount) *
                          100
                      )
                    }}%
                  </div></v-avatar
                >
                <div class="pl-2">
                  <div class="text-caption font-weight-medium">Attendence</div>
                  <div class="text-caption">
                    {{ proposal.binaryVoteResult.memberCount }} member{{
                      proposal.binaryVoteResult.memberCount != 1 ? "s" : ""
                    }}
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card flat>
              <v-card-text class="d-flex align-center justify-start">
                <v-avatar color="success" dark size="40"
                  ><div
                    class="text-body-caption white--text font-weight-medium"
                    v-if="
                      proposal.binaryVoteResult.acceptedCount +
                        proposal.binaryVoteResult.refusedCount !=
                      0
                    "
                  >
                    {{
                      Math.floor(
                        (proposal.binaryVoteResult.acceptedCount /
                          (proposal.binaryVoteResult.acceptedCount +
                            proposal.binaryVoteResult.refusedCount)) *
                          100
                      )
                    }}%
                  </div></v-avatar
                >
                <div class="pl-2">
                  <div class="text-caption font-weight-medium">Support</div>
                  <div class="text-caption">
                    {{ proposal.binaryVoteResult.acceptedCount }} member{{
                      proposal.binaryVoteResult.acceptedCount != 1 ? "s" : ""
                    }}
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: "auton",
  data: () => ({
    autonId: null,
    proposalId: null,
    auton: null,
    proposal: null,
    submitter: null,
    userLang: null,
    commentCount: 0,
    commentUniqueMembershipCount: 0,
  }),
  async mounted() {
    this.$nuxt.$emit("Auton-setPage", "proposals");
    this.userLang = navigator.language || navigator.userLanguage;

    const autonIdParam = this.$route.params.autonId.replaceAll("_", " ");
    const proposalIndex = parseInt(this.$route.params.proposalId) - 1;

    const autonIdWrapper = await this.$invoke("auton:getAutonIdByName", {
      name: autonIdParam,
    });

    if (autonIdWrapper.result === null) {
      this.auton = null;
      this.error = "Auton not found: " + autonIdParam;
    } else {
      this.autondId = autonIdWrapper.result.id;
      const autonWrapper = await this.$invoke("auton:getByID", {
        id: autonIdWrapper.result.id,
      });
      this.auton = autonWrapper.result;
      this.proposalId = this.auton.proposals[proposalIndex];

      const proposalWrapper = await this.$invoke("proposal:getByID", {
        id: this.proposalId,
      });

      this.proposal = proposalWrapper.result;
      console.log(this.proposal);

      const membershipId = this.proposal.membershipId;
      const membershipWrapper = await this.$invoke("membership:getByID", {
        id: membershipId,
      });

      const submitterId = membershipWrapper.result.accountId;
      const submitterWrapper = await this.$invoke("kalipoAccount:getByID", {
        id: submitterId,
      });

      this.submitter = submitterWrapper.result;

      const uniqueMemberList = [];
      for (let index = 0; index < this.proposal.comments.length; index++) {
        const commentId = this.proposal.comments[index];
        const commentWrapper = await this.$invoke("comment:getByID", {
          id: commentId,
        });

        const commentMembershipId = commentWrapper.result.membershipId;
        const commentMembershipWrapper = await this.$invoke(
          "membership:getByID",
          {
            id: commentMembershipId,
          }
        );

        const commentAccountId = commentMembershipWrapper.result.accountId;
        if (uniqueMemberList.indexOf(commentAccountId) == -1) {
          uniqueMemberList.push(uniqueMemberList);
        }
      }

      this.commentCount = this.proposal.comments.length;
      this.commentUniqueMembershipCount = uniqueMemberList.length;



    }
  },
  methods: {
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
