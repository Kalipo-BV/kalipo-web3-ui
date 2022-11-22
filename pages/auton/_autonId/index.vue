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
  <v-row>
    <v-container>
      <v-row class="mt-1">
        <v-col cols="12" md="6">
          <div>
            <div class="d-flex align-center justify-space-between">
              <div class="text-h2 primary--text">
                {{ proposalsRunning.length }} running proposal{{
                  proposalsRunning.length != 1 ? "s" : ""
                }}
              </div>
              <v-btn
                color="primary"
                text
                outlined
                @click="
                  $router.push(`/auton/${$route.params.autonId}/proposals/`)
                "
                >Show all</v-btn
              >
            </div>
            <v-carousel
              v-model="carousel"
              :cycle="true"
              show-arrows-on-hover
              delimiter-icon="mdi-circle-small"
              height="220"
              class="proposals"
              hide-delimiter-background
            >
              <v-carousel-item
                v-for="(proposal, i) in proposalsRunning"
                :key="i"
              >
                <ProposalCard :proposal="proposal"></ProposalCard>
              </v-carousel-item>
            </v-carousel>
            <div class="secondary--text"></div>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="d-flex align-center justify-space-between">
            <div class="text-h2 primary--text">Latest news</div>
          </div>

          <div class="mt-4">
            <v-card v-for="(news, i) in news" :key="i" class="mb-2">
              <v-card-text>
                <div class="text-body-1">{{ news.message }}</div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
        <!-- <v-col>
          <div class="d-flex align-center justify-space-between">
            <div class="text-h2 primary--text">8 upcoming proposals</div>
            <v-btn color="primary" text outlined>Show more</v-btn>
          </div>

          <v-row dense>
            <v-col cols="3">
              <v-card class="mt-4 rounded-lg" flat link>
                <v-card-text>
                  <div class="d-flex justify-center">
                    <div class="text-h4 primary--text">2</div>
                  </div>
                  <div class="d-flex justify-center">
                    <div class="text-body-1 secondary--text">April 14th</div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="3">
              <v-card class="mt-4 rounded-lg" flat link>
                <v-card-text>
                  <div class="d-flex justify-center">
                    <div class="text-h4 primary--text">1</div>
                  </div>
                  <div class="d-flex justify-center">
                    <div class="text-body-1 secondary--text">April 16th</div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="3">
              <v-card class="mt-4 rounded-lg" flat link>
                <v-card-text>
                  <div class="d-flex justify-center">
                    <div class="text-h4 primary--text">5</div>
                  </div>
                  <div class="d-flex justify-center">
                    <div class="text-body-1 secondary--text">May 1st</div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col> -->
      </v-row>
    </v-container>
  </v-row>
</template>
<script>
export default {
  layout: "auton",
  data: () => ({
    error: null,
    dialog: true,
    proposalsRunning: [],
    proposalsEnded: [],
    carousel: 0,
    news: [],
    auton: null,
  }),
  async mounted() {
    this.$nuxt.$emit("Auton-setPage", "autons");

    const autonIdParam = this.$route.params.autonId.replaceAll("_", " ");

    const autonIdWrapper = await this.$invoke("auton:getAutonIdByName", {
      name: autonIdParam,
    });

    const autonWrapper = await this.$invoke("auton:getByID", {
      id: autonIdWrapper.result.id,
    });

    this.auton = autonWrapper.result;

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
      proposalWrapper.result.index = index;
      proposalWrapper.result.submitter = submitterAccountWrapper.result;
      if (proposalWrapper.result.status == "ENDED") {
        this.proposalsEnded.push(proposalWrapper.result);
      } else {
        this.proposalsRunning.push(proposalWrapper.result);
      }
      console.log(this.proposals);
    }

    this.news.push({
      message: `Auton was created`,
    });

    for (
      let index = 0;
      index < autonWrapper.result.memberships.length;
      index++
    ) {
      const membershipId = autonWrapper.result.memberships[index];
      const membershipWrapper = await this.$invoke("membership:getByID", {
        id: membershipId,
      });

      if (BigInt(membershipWrapper.result.invitation.accepted) != BigInt(0)) {
        const memberAccountWrapper = await this.$invoke(
          "kalipoAccount:getByID",
          {
            id: membershipWrapper.result.accountId,
          }
        );
        this.news.push({
          message: `@${memberAccountWrapper.result.username} joined the auton`,
        });
      }
    }

    this.news.reverse();
  },
};
</script>
<style>
.proposals .v-carousel__controls__item {
  color: black !important;
}
</style>
