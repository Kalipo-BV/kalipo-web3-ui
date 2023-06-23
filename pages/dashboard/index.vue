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
    <v-row class="mt-0">
      <v-col cols="12" md="8">
        <div class="text-h2 primary--text">My DAOs and autons</div>

        <v-row>
          <v-col
            xs="12"
            sm="6"
            md="4"
            lg="4"
            v-for="(auton, i) in autons"
            :key="i"
          >
            <div
              @click="
                $router.push(
                  '/dao/' +
                    auton.dao.daoProfile.name.replaceAll(' ', '_') +
                    '/auton/' +
                    auton.autonProfile.name.replaceAll(' ', '_')
                )
              "
            >
              <AutonCard class="mt-4" :auton="auton"></AutonCard>
            </div>
          </v-col>
          <v-col xs="12" sm="6" md="4" lg="4">
            <v-card
              class="mt-4"
              height="230.567"
              color="#eef1f6"
              outlined
              style="border-color: #d6d6d6"
            >
              <div
                class="d-flex align-center justify-center"
                style="height: 100%"
              >
                <div>
                  <div>
                    <v-btn color="accent" fab small
                      ><v-icon dark @click="dialog = !dialog"
                        >mdi-plus</v-icon
                      ></v-btn
                    >
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4">
        <div class="text-h2 primary--text">Personal backlog</div>

        <v-card
          class="mt-4"
          flat
          v-for="(membership, i) in membershipInvitations"
          :key="i"
        >
          <v-card
            v-if="membership.proposal"
            flat
            link
            @click="
              $router.push(
                '/dao/' +
                  membership.dao.daoProfile.name.replaceAll(' ', '_') +
                  '/auton/' +
                  membership.auton.autonProfile.name.replaceAll(' ', '_') +
                  '/proposal/' +
                  (membership.proposalIndex + 1) +
                  '/results'
              )
            "
          >
            <v-card-text class="py-2">
              <div class="text-caption d-flex align-center">
                <v-icon small class="mr-1">mdi-account-plus</v-icon>
                <span class="text-caption">{{ membership.proposal.type }}</span>
              </div>
            </v-card-text>
          </v-card>

          <v-divider></v-divider>

          <v-card flat>
            <v-card-text class="primary--text">
              <div class="text-body-1">
                {{ membership.invitation.message }}
              </div>
            </v-card-text>
          </v-card>

          <v-divider></v-divider>

          <v-row align="center" dense>
            <v-col cols="6">
              <v-card
                flat
                link
                @click="
                  $router.push(
                    '/auton/' +
                      membership.auton.autonProfile.name.replaceAll(' ', '_')
                  )
                "
              >
                <v-card-text class="">
                  <div class="text-caption d-flex align-center">
                    <v-avatar color="accent" class="mr-1" size="25">
                      <v-icon small dark>{{
                        membership.auton.autonProfile.icon
                      }}</v-icon>
                    </v-avatar>
                    <span class="text-caption font-weight-bold">{{
                      membership.auton.autonProfile.name
                    }}</span>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="6">
              <v-card flat>
                <v-card-text class="">
                  <div class="d-flex align-center justify-end">
                    <v-btn
                      color="error"
                      class="mr-2"
                      small
                      @click="rejecttMembership(membership)"
                    >
                      Reject
                    </v-btn>
                    <v-btn
                      color="success"
                      small
                      @click="acceptMembership(membership)"
                    >
                      Accept
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="genericDialog" max-width="500">
      <GenericTransaction
        title="Membership invitation"
        subtitle="Consensus was reached to invite you"
        :actionText="actionText"
        :chipText="chipText"
        :uri="uri"
        :transaction="transaction"
        callbackFinish="Dashboard-ModalClose"
      ></GenericTransaction>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  layout: "user",
  computed: {
    account() {
      return this.$store.state.wallet.account;
    },
  },
  data: () => ({
    autons: [],
    memberships: [],
    membershipInvitations: [],
    dialog: false,
    genericDialog: false,
    actionText: "",
    chipText: "",
    uri: null,
    transaction: {
      moduleId: 1002,
      assetId: 0,
      assets: {
        membershipId: null,
      },
    },
  }),
  methods: {
    acceptMembership(membership) {
      this.uri =
        "/dao/" +
        membership.dao.daoProfile.name.replaceAll(" ", "_") +
        "/auton/" +
        membership.auton.autonProfile.name.replaceAll(" ", "_");
      this.transaction.assetId = 0;
      this.transaction.assets.membershipId = membership.id;
      this.actionText = "Joining: " + membership.auton.autonProfile.name;
      this.chipText = "Accept";
      this.genericDialog = true;
    },
    rejecttMembership(membership) {
      this.uri = this.$route.path;
      this.transaction.assetId = 1;
      this.transaction.assets.membershipId = membership.id;
      this.actionText = "Joining: " + membership.auton.autonProfile.name;
      this.chipText = "Reject";
      this.genericDialog = true;
    },
  },
  created() {
    this.$nuxt.$on(
      "Dashboard-ModalClose",
      ($event) => (this.genericDialog = false)
    );
  },
  async mounted() {
    this.$nuxt.$emit("MainMenu-setPage", "dashboard");
    const accountWrapper = await this.$invoke("kalipoAccount:getByID", {
      id: this.account.accountId,
    });

    const account = accountWrapper.result;

    for (let index = 0; index < account.memberships.length; index++) {
      const membershipId = account.memberships[index];
      const membershipWrapper = await this.$invoke("membership:getByID", {
        id: membershipId,
      });
      const membership = membershipWrapper.result;
      this.memberships.push(membership);

      const autonWrapper = await this.$invoke("auton:getByID", {
        id: membership.autonId,
      });
      const auton = autonWrapper.result;

      const daoWrapper = await this.$invoke("dao:getByID", {
        id: auton.daoId,
      });
      const dao = daoWrapper.result;

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

      if (
        BigInt(membership.started) != BigInt(0) &&
        nowInSec >= BigInt(membership.started)
      ) {
        auton.votable = 0;
        for (let indexY = 0; indexY < auton.proposals.length; indexY++) {
          const proposalId = auton.proposals[indexY];
          const proposalWrapper = await this.$invoke("proposal:getByID", {
            id: proposalId,
          });
          const proposal = proposalWrapper.result;
          let didAlreadyVote = false;
          if (
            BigInt(proposal.created) >= BigInt(membership.started) &&
            (proposal.status == "VOTING" || proposal.status == "DECIDED")
          ) {
            for (let indexZ = 0; indexZ < proposal.votes.length; indexZ++) {
              const voteId = proposal.votes[indexZ];
              const voteWrapper = await this.$invoke("vote:getByID", {
                id: voteId,
              });
              if (voteWrapper.result.membershipId == membershipId) {
                didAlreadyVote = true;
                break;
              }
            }
            if (!didAlreadyVote) {
              auton.votable++;
            }
          }
        }

        const daoWrapper = await this.$invoke("dao:getByID", {
          id: auton.daoId,
        });
        auton.dao = daoWrapper.result;

        this.autons.push(auton);
      } else if (
        nowInSec >= BigInt(membership.invitation.validStart) &&
        nowInSec < BigInt(membership.invitation.validEnd)
      ) {
        const proposalWrapper = await this.$invoke("proposal:getByID", {
          id: membership.invitation.proposalId,
        });
        const proposal = proposalWrapper.result;
        membership.proposal = proposal;

        membership.proposalIndex = auton.proposals.indexOf(
          membership.invitation.proposalId
        );
        membership.auton = auton;

        const daoWrapper = await this.$invoke("dao:getByID", {
          id: auton.daoId,
        });
        membership.dao = dao;
        membership.id = daoWrapper.result;
        this.membershipInvitations.push(membership);
      }
    }
    console.log(this.autons);
  },
};
</script>
