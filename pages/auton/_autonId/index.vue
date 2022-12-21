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
          <div v-if="auton != null && auton.type == 'DEFAULT'">
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
          <!-- EVENT -->
          <v-card
            class="mt-2"
            flat
            v-if="auton != null && auton.type == 'EVENT'"
          >
            <v-card-text>
              <div class="text-h6 primary--text">Event details</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-row class="text-body-1 pa-4">
                  <v-col cols="12" md="4" class="pr-12 pr-md-0">
                    <v-icon>mdi-clipboard-text-outline</v-icon>

                    {{ "&nbsp; Description: " }}
                  </v-col>
                  <v-col cols="12" md="8" class="pl-12 pl-md-0">
                    {{ auton.event.description }}
                  </v-col>
                </v-row>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-row class="text-body-1 pa-4">
                  <v-col cols="12" md="4" class="pr-12 pr-md-0">
                    <v-icon>mdi-map-marker</v-icon>

                    {{ "&nbsp; Location: " }}
                  </v-col>
                  <v-col cols="12" md="8" class="pl-12 pl-md-0">
                    {{ auton.event.location }}
                  </v-col>
                </v-row>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-row class="text-body-1 pa-4">
                  <v-col cols="12" md="4" class="pr-12 pr-md-0">
                    <v-icon>mdi-account-group</v-icon>
                    {{ "&nbsp; Capacity: " }}
                  </v-col>
                  <v-col cols="12" md="8" class="pl-12 pl-md-0">
                    {{ auton.event.capacity != 0 ? auton.event.capacity + " people" : "Everyone is welcome!" }}
                  </v-col>
                </v-row>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-row class="text-body-1 pa-4">
                  <v-col cols="12" md="4" class="pr-12 pr-md-0">
                    <v-icon>mdi-currency-eur</v-icon>

                    {{ "&nbsp; Price: " }}
                  </v-col>
                  <v-col cols="12" md="8" class="pl-12 pl-md-0">
                    {{ auton.event.price != 0 ? auton.event.price + " euro" : "Free" }}
                  </v-col>
                </v-row>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-row class="text-body-1 pa-4" v-if="start != null">
                  <v-col cols="12" md="4" class="pr-12 pr-md-0">
                    <v-icon>mdi-calendar-check</v-icon>

                    {{ "&nbsp; Start: " }}
                  </v-col>
                  <v-col cols="12" md="8" class="pl-12 pl-md-0">
                    {{
                      start.getDate() +
                      "/" +
                      start.getMonth() +
                      "/" +
                      start.getFullYear() +
                      " at " +
                      start.getHours() +
                      ":" +
                      (start.getMinutes() === 0 ? "00" : start.getMinutes())
                    }}
                  </v-col>
                </v-row>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-row class="text-body-1 pa-4" v-if="end != null">
                  <v-col cols="12" md="4" class="pr-12 pr-md-0">
                    <v-icon>mdi-calendar-remove</v-icon>

                    {{ "&nbsp; End: " }}
                  </v-col>
                  <v-col cols="12" md="8" class="pl-12 pl-md-0">
                    {{
                      end.getDate() +
                      "/" +
                      end.getMonth() +
                      "/" +
                      end.getFullYear() +
                      " at " +
                      end.getHours() +
                      ":" +
                      (end.getMinutes() === 0 ? "00" : end.getMinutes())
                    }}
                  </v-col>
                </v-row>
              </v-row>
            </v-card-text>
          </v-card>
          <!-- LESSON -->
          <v-card
            class="mt-2"
            flat
            v-if="auton != null && auton.type == 'LESSON'"
          >
            <v-card-text>
              <div class="text-h6 primary--text">Lesson details</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-row class="text-body-1 pa-4">
                  <v-col cols="12" md="4" class="pr-12 pr-md-0">
                    <v-icon>mdi-clipboard-text-outline</v-icon>

                    {{ "&nbsp; Description: " }}
                  </v-col>
                  <v-col cols="12" md="8" class="pl-12 pl-md-0">
                    {{ auton.lesson.description }}
                  </v-col>
                </v-row>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-row class="text-body-1 pa-4">
                  <v-col cols="12" md="4" class="pr-12 pr-md-0">
                    <v-icon>mdi-human-male-board</v-icon>

                    {{ "&nbsp; Subject: " }}
                  </v-col>
                  <v-col cols="12" md="8" class="pl-12 pl-md-0">
                    {{ auton.lesson.subject }}
                  </v-col>
                </v-row>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-row class="text-body-1 pa-4">
                  <v-col cols="12" md="4" class="pr-12 pr-md-0">
                    <v-icon>mdi-map-marker</v-icon>

                    {{ "&nbsp; Location: " }}
                  </v-col>
                  <v-col cols="12" md="8" class="pl-12 pl-md-0">
                    {{ auton.lesson.location }}
                  </v-col>
                </v-row>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-row class="text-body-1 pa-4" v-if="start != null">
                  <v-col cols="12" md="4" class="pr-12 pr-md-0">
                    <v-icon>mdi-calendar-check</v-icon>

                    {{ "&nbsp; Start: " }}
                  </v-col>
                  <v-col cols="12" md="8" class="pl-12 pl-md-0">
                    {{
                      start.getDate() +
                      "/" +
                      start.getMonth() +
                      "/" +
                      start.getFullYear() +
                      " at " +
                      start.getHours() +
                      ":" +
                      (start.getMinutes() === 0 ? "00" : start.getMinutes())
                    }}
                  </v-col>
                </v-row>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-row class="text-body-1 pa-4" v-if="end != null">
                  <v-col cols="12" md="4" class="pr-12 pr-md-0">
                    <v-icon>mdi-calendar-remove</v-icon>

                    {{ "&nbsp; End: " }}
                  </v-col>
                  <v-col cols="12" md="8" class="pl-12 pl-md-0">
                    {{
                      end.getDate() +
                      "/" +
                      end.getMonth() +
                      "/" +
                      end.getFullYear() +
                      " at " +
                      end.getHours() +
                      ":" +
                      (end.getMinutes() === 0 ? "00" : end.getMinutes())
                    }}
                  </v-col>
                </v-row>
              </v-row>
            </v-card-text>
          </v-card>
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

<!--    <CheckInDialog :auton="this.auton" :validAuton.sync="validUUID" :uuid="UUID"></CheckInDialog>-->

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
    start: null,
    end: null,
    UUID: true,
    validUUID: false,
  }),
  methods: {
    checkUUID() {
      // get the UUID from the URL
      const UUID = this.$route.query.uuid;

      return this.auton.lesson.uuid === UUID;
    },
  },

  async beforeCreate() {
    this.$nuxt.$emit("Auton-setPage", "autons");

    const autonIdParam = this.$route.params.autonId.replaceAll("_", " ");

    const autonIdWrapper = await this.$invoke("auton:getAutonIdByName", {
      name: autonIdParam,
    });

    const autonWrapper = await this.$invoke("auton:getByID", {
      id: autonIdWrapper.result.id,
    });

    this.auton = autonWrapper.result;

    this.validUUID = this.checkUUID()

    this.UUID = this.$route.query.uuid.length > 0;


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
    }

    if (this.auton.type == "DEFAULT") {
      console.log("TEST")
      this.news.push({
        message: `Auton was created`,
      });
    }

    if (this.auton.type == "EVENT") {
      this.news.push({
        message: `Event was created`,
      });
    }

    if (this.auton.type == "LESSON") {
      this.news.push({
        message: `Lesson was created`,
      });
    }

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

        if (this.auton.type == "DEFAULT") {
          this.news.push({
            message: `@${memberAccountWrapper.result.username} joined the auton`,
          });
        }

        if (this.auton.type == "EVENT") {
          this.news.push({
            message: `@${memberAccountWrapper.result.username} joined the event`,
          });
        }

        if (this.auton.type == "LESSON") {
          this.news.push({
            message: `@${memberAccountWrapper.result.username} joined the lesson`,
          });
        }
      }
    }

    if (this.auton != null) {
      this.start = new Date(parseInt(this.auton.event.start));
      this.end = new Date(parseInt(this.auton.event.end));
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
