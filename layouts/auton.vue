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
  <v-app id="auton-layout">
    <v-main class="primary">
      <div style="height: 100%; background: #eef1f6">
        <v-app-bar height="148px" color="white" flat>
          <v-row>
            <v-container>
              <v-row no-gutters class="d-flex align-center">
                <v-col class="">
                  <div class="d-flex align-start">
                    <v-avatar
                      color="primary"
                      size="40"
                      class="white--text mr-2 mt-1"
                      ><v-icon color="white">{{
                        auton.autonProfile.icon
                      }}</v-icon></v-avatar
                    >
                    <div class="ml-2">
                      <div class="text-h3 primary--text">
                        {{ auton.autonProfile.name }}
                      </div>
                      <div class="text-caption">
                        Founded since
                        {{
                          new Date(
                            parseInt(auton.autonProfile.foundingDate) * 1000
                          ).toLocaleDateString(userLang, {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        }}
                      </div>
                      <div class="text-caption mt-2" style="min-height: 16px">
                        <v-chip
                          x-small
                          link
                          color=""
                          class="px-2 mr-1"
                          v-for="(tag, i) in auton.tags"
                          :key="i"
                          >#{{ tag }}</v-chip
                        >
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col class="d-flex justify-end">
                  <v-btn
                    v-if="auton.type == 'DEFAULT'"
                    color="accent"
                    @click="dialog = !dialog"
                  >
                    New proposal
                  </v-btn>
                  <v-btn
                    v-if="auton.type == 'EVENT'"
                    class="ml-2"
                    color="accent"
                    @click="dialog = !dialog"
                    :disabled="authorizedAddAttendee"
                  >
                    Add attendee
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-row>
          <template v-slot:extension class="mt-2">
              <v-container
                ><v-tabs show-arrows v-model="selectedItem">
                  <v-tabs-slider color="primary"></v-tabs-slider>

                  <v-tab
                    v-if="auton.type == 'DEFAULT'"
                    v-for="(item, idx) in tabItemsDefault"
                    :key="idx"
                    @click="navigate(item.to)"
                  >
                    <v-icon small class="mr-2">{{ item.icon }}</v-icon>
                    {{ item.title }}
                  </v-tab>

                  <v-tab
                    v-if="auton.type == 'EVENT'"
                    v-for="(item, idx) in tabItemsEvent"
                    :key="idx"
                    @click="navigate(item.to)"
                  >
                    <v-icon small class="mr-2">{{ item.icon }}</v-icon>
                    {{ item.title }}
                  </v-tab>
                </v-tabs>
              </v-container>
          </template>
        </v-app-bar>
        <Nuxt class="mt-n2 px-8 px-lg-3" :auton="auton" />
      </div>
    </v-main>
    <MainMenu></MainMenu>

    <v-dialog v-model="dialog" max-width="500">
      <AutonProposalSubmit
        v-if="auton.type == 'DEFAULT'"
        :autonId="autondId"
        :autonName="autonName"
        callbackFinish="Auton-ProposalModalClose"
      ></AutonProposalSubmit>

      <!-- <AutonProposalSubmit
        v-if="auton.type == 'EVENT'"
        :autonId="autondId"
        :autonName="autonName"
        callbackFinish="Auton-ProposalModalClose"
      ></AutonProposalSubmit> -->
      <AutonAddAttendee
        v-if="auton.type == 'EVENT'"
        :autonId="autondId"
      ></AutonAddAttendee>
    </v-dialog>
  </v-app>
</template>

<script>
import AutonAddAttendee from "~/components/event/AutonAddAttendee.vue";

export default {
  components: { AutonAddAttendee },
  computed: {
    xs() {
      return this.$vuetify.breakpoint.xs;
    },
    sm() {
      return this.$vuetify.breakpoint.sm;
    },
    md() {
      return this.$vuetify.breakpoint.md;
    },
    account() {
      return this.$store.state.wallet.account;
    },
    unlocked() {
      return this.$store.state.wallet.unlocked;
    },
  },
  data() {
    return {
      authorizedAddAttendee: true,
      autondId: null,
      id: "",
      autonName: null,
      auton: {
        autonProfile: {},
        tags: [],
      },
      dialog: false,
      miniVariant: false,
      selectedItem: 0,
      userLang: null,
      tabItemsDefault: [
        {
          icon: "mdi-monitor-dashboard",
          title: "Dashboard",
          to: "/",
        },
        {
          icon: "mdi-email-newsletter",
          title: "Proposals",
          to: "proposals",
        },
        {
          icon: "mdi-account-group",
          title: "Members",
          to: "members",
        },
        {
          icon: "mdi-bank",
          title: "Constitution",
          to: "constitution",
        },
      ],
      tabItemsEvent: [
        {
          icon: "mdi-monitor-dashboard",
          title: "Dashboard",
          to: "/",
        },
        {
          icon: "mdi-trophy",
          title: "Poas",
          to: "poas",
        },
        {
          icon: "mdi-account-group",
          title: "Attendees",
          to: "attendees",
        },
      ],
    };
  },
  created() {
    this.$nuxt.$on("Auton-setPage", (page) => this.setMenu(page));
    this.$nuxt.$on(
      "Auton-ProposalModalClose",
      ($event) => (this.dialog = false)
    );

  },
  methods: {
    async authorized() {
      if (this.unlocked) {
        const memberships = this.$store.state.wallet.account.memberships;
        memberships.forEach(async (element) => {
          const mship = await this.$invoke("membership:getByID", {
            id: element,
          });
          if (
            mship.result.autonId == this.id &&
            mship.result.role == "FULL_MEMBER"
          ) {
            this.authorizedAddAttendee = false;
          }
        });
      } else {
        return true;
      }
    },
    setMenu(page) {
      if (page === "dashboard") {
        this.selectedItem = 0;
      } else if (page === "proposals") {
        this.selectedItem = 1;
      } else if (page === "members") {
        this.selectedItem = 2;
      } else if (page === "constitution") {
        this.selectedItem = 3;
      } else if (page === "poas") {
        this.selectedItem = 2;
      } else if (page === "attendees") {
        this.selectedItem = 2;
      }
    },
    navigate(to) {
      if (to == "/") {
        this.$router.push(`/auton/${this.$route.params.autonId}`);
      } else {
        this.$router.push(`/auton/${this.$route.params.autonId}/${to}/`);
      }
    },
  },
  async mounted() {
    this.$nuxt.$emit("MainMenu-setPage", "autons");
    this.userLang = navigator.language || navigator.userLanguage;
    const urlParam = this.$route.params.autonId.replaceAll("_", " ");

    const autonIdWrapper = await this.$invoke("auton:getAutonIdByName", {
      name: urlParam,
    });
    if (autonIdWrapper.result === null) {
      this.auton = null;
      this.error = "Auton not found: " + urlParam;
    } else {
      this.autondId = autonIdWrapper.result.id;
      console.log(`set auton id to: ${autonIdWrapper.result.id}`);
      this.id = autonIdWrapper.result.id;
      const autonWrapper = await this.$invoke("auton:getByID", {
        id: autonIdWrapper.result.id,
      });
      this.auton = autonWrapper.result;
      this.autonName = autonWrapper.result.autonProfile.name;
    }

    this.authorized();
  },
};
</script>
<style></style>
