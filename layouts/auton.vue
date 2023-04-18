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
        <div class="primary">
          <v-container>
            <v-breadcrumbs class="px-0 py-0">
              <v-breadcrumbs-item
                v-for="(breadcrumb, i) in breadcrumbs"
                :key="i"
                @click="$router.push(breadcrumb.to)"
                class="white--text text-h6 px-0"
              >
                <v-avatar
                  v-if="breadcrumb.icon"
                  :tile="breadcrumb.tileIcon"
                  color="accent"
                  size="20px"
                  class="mr-2"
                >
                  <v-icon color="white">
                    {{ breadcrumb.icon }}
                  </v-icon>
                </v-avatar>
                {{ breadcrumb.text }}
                <li v-if="i !== breadcrumbs.length - 1" class="pl-3">/</li>
              </v-breadcrumbs-item>
            </v-breadcrumbs>
          </v-container>
        </div>
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
                    v-if="auton.type == 'DEFAULT' || auton.type == 'GOVERNING'"
                    class="mr-12"
                    color="accent"
                    @click="dialog = !dialog"
                  >
                    New proposal
                  </v-btn>
                  <v-btn
                    v-if="auton.type == 'EVENT'"
                    class="mr-12"
                    color="accent"
                    @click="dialog = !dialog"
                    :disabled="authorizedAddAttendee"
                  >
                    Add attendee
                  </v-btn>
                  <v-btn
                    v-if="auton.type == 'LESSON'"
                    class="mr-12"
                    color="accent"
                    :disabled="authorizedAddAttendee"
                    @click="dialog = !dialog"
                  >
                    Check in/out
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
                  v-if="auton.type == 'DEFAULT' || auton.type == 'GOVERNING'"
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

                <v-tab
                  v-if="auton.type == 'LESSON'"
                  v-for="(item, idx) in tabItemsLesson"
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
        v-if="auton.type == 'DEFAULT' || auton.type == 'GOVERNING'"
        :autonId="autondId"
        :daoName="daoName"
        :autonName="autonName"
        callbackFinish="Auton-ProposalModalClose"
      ></AutonProposalSubmit>

      <AutonAddAttendee
        v-if="auton.type == 'EVENT'"
        title="Inviting attendees"
        :autonId="autondId"
        callbackFinish="Auton-ProposalModalClose"
      ></AutonAddAttendee>

      <LessonCheckIn
        v-if="auton.type == 'LESSON'"
        :autonId="autondId"
        callbackFinish="Auton-ProposalModalClose"
      >
      </LessonCheckIn>
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
      daoName: null,
      auton: {
        autonProfile: {},
        tags: [],
      },
      dialog: false,
      miniVariant: false,
      selectedItem: 0,
      userLang: null,
      breadcrumbs: [],
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
      tabItemsLesson: [
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
          title: "Students",
          to: "students",
        },
      ],
    };
  },
  created() {
    this.$nuxt.$on("Auton-setPage", (page) => this.setMenu(page));
    this.$nuxt.$on("Auton-ProposalModalClose", (newSelectedItem) => {
      this.dialog = false;
      this.selectedItem = newSelectedItem;
    });
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
        this.$router.push(
          `/dao/${this.$route.params.daoId}/auton/${this.$route.params.autonId}`
        );
      } else {
        this.$router.push(
          `/dao/${this.$route.params.daoId}/auton/${this.$route.params.autonId}/${to}/`
        );
      }
    },
    async init() {
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

        this.id = autonIdWrapper.result.id;
        const autonWrapper = await this.$invoke("auton:getByID", {
          id: autonIdWrapper.result.id,
        });
        this.auton = autonWrapper.result;
        this.autonName = autonWrapper.result.autonProfile.name;

        const daoId = autonWrapper.result.daoId;
        const daoWrapper = await this.$invoke("dao:getByID", {
          id: daoId,
        });
        console.log(daoId);
        console.log(daoWrapper);
        const dao = daoWrapper.result;
        this.daoName = dao.daoProfile.name;

        this.breadcrumbs = [];

        this.breadcrumbs.push({
          text: dao.daoProfile.name,
          icon: dao.daoProfile.icon,
          tileIcon: true,
          to: `/dao/${dao.daoProfile.name.replaceAll(" ", "_")}`,
        });

        let parentAutons = [];
        if (this.auton.parentAutonId != "") {
          let hasParent = true;
          let currentParentId = this.auton.parentAutonId;
          while (hasParent) {
            const parentWrapper = await this.$invoke("auton:getByID", {
              id: currentParentId,
            });
            const parent = parentWrapper.result;
            parentAutons.push(parent);
            if (parent.parentAutonId != "") {
              currentParentId = parent.parentAutonId;
            } else {
              hasParent = false;
              break;
            }
          }
        }
        parentAutons.reverse();

        for (let index = 0; index < parentAutons.length; index++) {
          const element = parentAutons[index];
          this.breadcrumbs.push({
            text: element.autonProfile.name,
            icon: element.autonProfile.icon,
            to: `/dao/${dao.daoProfile.name.replaceAll(
              " ",
              "_"
            )}/auton/${element.autonProfile.name.replaceAll(" ", "_")}`,
          });
        }

        this.breadcrumbs.push({
          text: this.auton.autonProfile.name,
          icon: this.auton.autonProfile.icon,
          to: `/dao/${dao.daoProfile.name.replaceAll(
            " ",
            "_"
          )}/auton/${this.auton.autonProfile.name.replaceAll(" ", "_")}`,
        });
      }

      this.authorized();
    },
  },
  watch: {
    "$route.params.autonId": {
      handler: function (autonId) {
        console.log(autonId);
        this.init();
      },
      deep: true,
      immediate: true,
    },
  },
  async mounted() {
    this.$nuxt.$emit("MainMenu-setPage", "autons");
  },
};
</script>
<style>
#auton-layout .v-breadcrumbs li {
  cursor: pointer;
}
</style>
