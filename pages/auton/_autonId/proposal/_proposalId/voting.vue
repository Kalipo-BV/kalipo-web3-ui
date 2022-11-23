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
        <ProposalMain v-if="proposal && submitter" :proposal="proposal" :submitter="submitter"></ProposalMain>
      </v-col>
      <v-col cols="12" md="7">
        <v-row>
          <v-col cols="12" md="4">
            <v-card class="mt-4 rounded-lg" flat>
              <v-card-text v-if="proposal">
                <div class="text-h4 primary--text mb-1">Status</div>
                <v-chip color="accent" v-if="proposal.status == 'CAMPAIGNING'">not open yet</v-chip>
                <v-chip color="accent" v-if="
                  proposal.status != 'CAMPAIGNING' &&
                  proposal.binaryVoteResult.result == 'UNDECIDED'
                ">in progress</v-chip>
                <v-chip color="success" v-if="
                  proposal.status != 'CAMPAIGNING' &&
                  proposal.binaryVoteResult.result == 'ACCEPTED'
                ">decision reached</v-chip>
                <v-chip color="error" v-if="
                  proposal.status != 'CAMPAIGNING' &&
                  proposal.binaryVoteResult.result == 'REJECTED'
                ">decision reached</v-chip>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-card class="mt-4 rounded-lg" flat>
              <v-card-text v-if="membership">
                <div class="d-flex align-center justify-start" v-if="quorum != 0">
                  <v-progress-circular :rotate="-270" :size="65" :width="7" :color="
                    acceptCount + refuseCount >= quorum ? 'success' : 'accent'
                  " :value="((acceptCount + refuseCount) / quorum) * 100" class="mr-4 text-caption">
                    {{ acceptCount + refuseCount }} / {{ quorum }}
                  </v-progress-circular>
                  <div>
                    <div class="text-h4 primary--text">Attendance criteria</div>
                    <div class="text-body-1 secondary--text" v-if="acceptCount + refuseCount < quorum">
                      Not reached yet
                    </div>
                    <div class="text-body-1 secondary--text" v-if="acceptCount + refuseCount >= quorum">
                      Reached
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-card v-if="membership" class="mt-5 rounded-lg" flat>
          <v-card-text>
            <div class="px-8">
              <div class="d-flex align-center justify-center" style="margin-bottom: 70px; position: relative">
                <div v-if="minAcceptance" :style="'position: absolute; left: ' + minAcceptance + '%'" class="mb-2">
                  <div class="support-label-container">
                    <div class="support-label">
                      <v-chip class="ma-2 text-center" style="height: 45px" label outlined>
                        <div class="">
                          <div class="text-caption">{{ minAcceptance }}%</div>
                          <div class="text-caption" style="margin-top: -6px; font-size: 10px !important">
                            needed
                          </div>
                        </div>
                      </v-chip>
                      <div class="d-flex justify-center" style="margin-top: -10px">
                        <v-icon>mdi-chevron-down</v-icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <v-progress-linear :background-color="
                acceptCount + refuseCount == 0 ? '' : 'error'
              " color="success" :value="(acceptCount / (acceptCount + refuseCount)) * 100" height="7px">
              </v-progress-linear>
              <div class="d-flex justify-space-between mt-2">
                <div>
                  <div class="text-h4 success--text" v-if="acceptCount == 1">
                    {{ acceptCount }} member
                  </div>
                  <div class="text-h4 success--text" v-if="acceptCount != 1">
                    {{ acceptCount }} members
                  </div>
                  <div class="text-body-1 secondary--text">in favor</div>
                </div>
                <div>
                  <div class="text-h4 primary--text" v-if="refuseCount == 1">
                    {{ refuseCount }} member
                  </div>
                  <div class="text-h4 primary--text" v-if="refuseCount != 1">
                    {{ refuseCount }} members
                  </div>
                  <div class="text-body-1 secondary--text float-right">
                    against
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <v-card v-if="membership" class="mt-4 rounded-lg" flat>
          <v-card-text>
            <div class="text-h4 primary"></div>
            <div class="d-flex justify-space-between align-center">
              <v-btn color="success" @click="accept">Accept</v-btn>
              <v-btn color="error" @click="refuse">Refuse</v-btn>
            </div>
          </v-card-text>
        </v-card>
        <ProposalChoicesOverview v-if="!membership && !voted" :statement="statement" :choices="answers"
          @update:answerValue="getAnswerValue"></ProposalChoicesOverview>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500" v-if="proposal">
      <GenericTransaction title="Casting a vote" subtitle="You are about to cast the following vote"
        :actionText="proposal.title" :chipText="chipText" :uri="uri" :transaction="transaction"
        callbackFinish="ProposalVoting-ModalClose"></GenericTransaction>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  layout: "auton",
  data: () => ({
    autonId: null,
    proposalId: null,
    proposalType: null,
    auton: null,
    proposal: null,
    submitter: null,
    userLang: null,
    votes: [],
    voteIds: [],
    acceptCount: 0,
    refuseCount: 0,
    eligibleVoters: 0,
    quorum: 0,
    minAcceptance: 0,
    dialog: false,
    chipText: null,
    uri: null,
    membership: false,
    voted: false,
    transaction: {
      moduleId: 1005,
      assetId: 0,
      assets: {
        proposalId: null,
        answer: null,
      }
    },
    statement: null,
    answers: [],
    countPerAnswer: [],
  }),
  created() {
    this.$nuxt.$on(
      "ProposalVoting-ModalClose",
      ($event) => {
        this.dialog = false;
        if (this.proposalType == "multi-choice-poll") {
          this.voted = true;
        }
      }
    );
  },
  async mounted() {
    this.$nuxt.$emit("Auton-setPage", "proposals");
    this.uri = this.$route.path;
    this.userLang = navigator.language || navigator.userLanguage;

    const autonIdParam = this.$route.params.autonId.replaceAll("_", " ");
    const proposalIndex = parseInt(this.$route.params.proposalId) - 1;

    const autonIdWrapper = await this.$invoke("auton:getAutonIdByName", {
      name: autonIdParam,
    });
    console.log(autonIdWrapper);
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
      this.transaction.assets.proposalId = this.proposalId;

      const proposalWrapper = await this.$invoke("proposal:getByID", {
        id: this.proposalId,
      });

      this.proposal = proposalWrapper.result;

      const provisionId = this.proposal.provisionId;
      const provisionWrapper = await this.$invoke("auton:getProvisionByID", {
        id: provisionId,
      });


      for (let index = 0; index < this.auton.memberships.length; index++) {
        const autonMembershipId = this.auton.memberships[index];
        const autonMembershipWrapper = await this.$invoke(
          "membership:getByID",
          {
            id: autonMembershipId,
          }
        );
        if (
          BigInt(autonMembershipWrapper.result.started) != BigInt(0) &&
          BigInt(autonMembershipWrapper.result.started) <
          BigInt(this.proposal.created)
        ) {
          this.eligibleVoters++;
        }
      }

      this.proposalType = this.proposal.type;

      if (this.proposalType == "multi-choice-poll") {
        this.transaction.assetId = 1;
        this.membership = false;
      }
      this.statement = this.proposal.multiChoicePollArguments.question;
      for (let i = 0; i < this.proposal.multiChoicePollArguments.answers.length; i++) {
        this.answers.push(this.proposal.multiChoicePollArguments.answers[i].answer);
        console.log(this.proposal.multiChoicePollArguments.answers[i].answer);
        this.countPerAnswer.push(parseInt(this.proposal.multiChoicePollArguments.answers[i].count));
        this.totalCounts += parseInt(this.proposal.multiChoicePollArguments.answers[i].count);
      }

      if (this.proposalType == "membership-invitation") {
        this.transaction.assetId = 0;
        this.membership = true;
      }
      const rawQuorum = this.eligibleVoters * (provisionWrapper.result.attendance / 100);
      if (rawQuorum % 1 != 0) {
        this.quorum = Math.ceil(rawQuorum);
      } else {
        this.quorum = rawQuorum;
      }

      this.minAcceptance = provisionWrapper.result.acceptance;

      const membershipId = this.proposal.membershipId;
      const membershipWrapper = await this.$invoke("membership:getByID", {
        id: membershipId,
      });

      const submitterId = membershipWrapper.result.accountId;
      const submitterWrapper = await this.$invoke("kalipoAccount:getByID", {
        id: submitterId,
      });

      this.submitter = submitterWrapper.result;

      for (let index = 0; index < this.proposal.votes.length; index++) {
        const voteId = this.proposal.votes[index];
        this.voteIds.push(voteId);
        const voteWrapper = await this.$invoke("vote:getByID", {
          id: voteId,
        });

        this.votes.push(voteWrapper.result);

        if (voteWrapper.result.answer == "ACCEPT") {
          this.acceptCount++;
        } else if (voteWrapper.result.answer == "REFUSE") {
          this.refuseCount++;
        }
      }

      const client = await this.$client();
      client.subscribe("vote:newVote", async (data) => {
        console.log("NEW  VOTE");
        console.log(data);
        if (
          !this.voteIds.includes(data.id) &&
          data.vote.proposalId == this.proposalId
        ) {
          this.votes.push(data.vote);
          this.voteIds.push(data.id);

          if (data.vote.answer == "ACCEPT") {
            this.acceptCount++;
          } else if (data.vote.answer == "REFUSE") {
            this.refuseCount++;
          }
        }
      });

      client.subscribe("proposal:gotDecided", async (data) => {
        console.log("GOT DECIDED");
        console.log(data);
        if (data.id == this.proposalId) {
          this.proposal = data.proposal;
        }
      });
      console.log(this.proposal);

    }
  },
  methods: {

    getAnswerValue(value) {
      this.transaction.assets.answer = value
      this.chipText = value
      this.dialog = true;
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
    accept() {
      this.chipText = "In favor";
      this.transaction.assets.answer = "ACCEPT";
      this.dialog = true;
    },
    refuse() {
      this.chipText = "Against";
      this.transaction.assets.answer = "REFUSE";
      this.dialog = true;
    },
  },
};
</script>
<style scoped>
.support-label-container {
  position: absolute;
  left: 0;
  top: 0;
}

.support-label {
  position: absolute;
  left: 0;
  transform: translateX(-50%);
  border-radius: 50% 50% 0;
}
</style>
