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
    <v-container class="py-0 px-0 px-lg-3 white">
      <v-divider></v-divider>

      <v-tabs show-arrows v-model="selectedItem" color="primary">
        <v-tab v-for="(item, idx) in tabItemsDefault" :key="idx">
          <v-icon small class="mr-2">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-tab>
      </v-tabs>
    </v-container>
    <v-container>
      <div class="mt-0">
        <div v-if="selectedItem === 0">
          <v-row>
            <v-col cols="12" md="8" class="pr-0">
              <v-card flat>
                <v-card-text class="">
                  <div class="d-flex align-cener">
                    <v-icon large class="mr-2" color="primary"
                      >mdi-scale-balance</v-icon
                    >
                    <div class="text-h2 primary--text">Terms & Conditions</div>
                  </div>
                </v-card-text>
                <v-divider></v-divider>
                <NestedList
                  title="Glossary"
                  :items="currentGlossaryTree"
                  v-if="currentGlossaryTree"
                  class="mt-0"
                ></NestedList>

                <NestedList
                  title="Preambles"
                  :items="currentPreambleTree"
                  v-if="currentPreambleTree"
                  class="mt-0"
                ></NestedList>

                <NestedList
                  title="Articles"
                  :items="currentArticleTree"
                  v-if="currentArticleTree"
                  class="mt-0"
                ></NestedList>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <div class="">
                <v-card class="" flat>
                  <v-card-text class="black--text">
                    <v-row>
                      <v-col cols="12" md="9">
                        <div class="text-h6">
                          Version:
                          <span class="font-weight-regular">{{
                            termsAndConditionsVersionSelected
                          }}</span>
                        </div>
                        <div class="text-h6">
                          Effectuation:
                          <span class="font-weight-regular">01-01-2023</span>
                        </div>
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                        class="d-flex justify-end align-center"
                      >
                        <div>
                          <v-chip
                            v-if="
                              termsAndConditionsVersionSelected ==
                              termsAndConditionsVersions
                            "
                            color="accent"
                            >Operational</v-chip
                          >
                          <v-chip
                            v-if="
                              termsAndConditionsVersionSelected !=
                              termsAndConditionsVersions
                            "
                            color="primary"
                            >Expired</v-chip
                          >
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>

                  <v-divider></v-divider>

                  <!-- <v-card-text>
                    <v-row>
                      <v-col cols="6">
                        <div class="d-flex align-center justify-end">
                          <div class="mr-2 font-weight-medium">
                            Voted in favor
                          </div>
                          <div>
                            <v-chip color="success" size="32">
                              <span class="white--text text-caption">17</span>
                            </v-chip>
                          </div>
                        </div>
                      </v-col>
                      <v-divider vertical></v-divider>
                      <v-col cols="6">
                        <div class="d-flex align-center justify-start">
                          <div class="mr-2">
                            <v-chip color="error" size="32">
                              <span class="white--text text-caption">10</span>
                            </v-chip>
                          </div>
                          <div class="font-weight-medium">Voted against</div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-row>
                      <v-col cols="6">
                        <div>
                          <div class="d-flex align-center justify-end">
                            <div class="">
                              <div class="font-weight-medium">Did not vote</div>
                            </div>
                            <v-chip class="ml-2" color="" size="32">
                              <span class="primary--text text-caption">47</span>
                            </v-chip>
                          </div>
                        </div>
                      </v-col>
                      <v-divider vertical></v-divider>
                      <v-col cols="6">
                        <v-btn color="accent" block small>view proposal</v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-divider></v-divider> --> </v-card
                ><v-card flat ripple link>
                  <v-card-text>
                    <div class="d-flex align-center justify-space-between">
                      <div>Submitted by</div>
                      <div class="d-flex align-center">
                        <div>
                          <v-avatar color="accent" size="25px"
                            ><span class="white--text text-caption"
                              >TT</span
                            ></v-avatar
                          >
                        </div>
                        <div class="ml-1 text-caption font-weight">
                          Test_test
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
                <v-divider></v-divider>
                <v-card flat ripple link>
                  <v-card-text>
                    <div class="d-flex align-center justify-space-between">
                      <div>Approved by</div>
                      <div class="d-flex align-center">
                        <div>
                          <v-chip color="accent" small outlined
                            >13 members</v-chip
                          >
                        </div>
                        <div class="ml-1">
                          <v-chip color="" small outlined>5 against</v-chip>
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>

                <v-card flat>
                  <v-divider></v-divider>
                  <v-card-text>
                    <div>
                      <div class="d-flex align-center justify-space-between">
                        <v-chip small class="mr-1" outlined
                          >15 in glossary</v-chip
                        ><v-chip small class="mr-1" outlined
                          >70 in preambles</v-chip
                        ><v-chip small class="mr-1" outlined
                          >8 in articles</v-chip
                        >
                      </div>

                      <v-btn
                        color=""
                        block
                        small
                        class="mt-4"
                        @click="showChangeLog = true"
                        >view all 123 changes</v-btn
                      >
                    </div>
                  </v-card-text>
                </v-card>
                <v-pagination
                  class="mt-2"
                  v-model="termsAndConditionsVersionSelected"
                  :length="termsAndConditionsVersions"
                  color="accent"
                ></v-pagination>
              </div>
            </v-col>
          </v-row>
        </div>

        <div v-if="selectedItem === 1">
          <div class="mt-2 text-body-1">
            Formed on
            <v-chip color="" class="" small>12 dec. 2021</v-chip>, based on
            <v-chip color="" class="" small>starter template</v-chip>
          </div>

          <div class="mt-2 text-body-1">
            <v-chip color="" class="" small>26</v-chip>
            changes have been made so far
          </div>
          <v-row justify="start" class="mt-4">
            <v-col cols="12" md="4">
              <v-text-field
                solo
                label="Search"
                append-icon="mdi-magnify"
                class="mt-4"
              ></v-text-field>
            </v-col>
          </v-row>

          <div>
            <div class="d-flex justify-start text-h4 primary--text mt-8 mb-8">
              Memberships & roles
            </div>
            <v-row justify="start">
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-account-plus"
                  title="Membership invitation"
                ></ProposalTypeCard>
              </v-col>
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-account-minus"
                  title="Membership termination"
                ></ProposalTypeCard>
              </v-col>
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-account-settings"
                  title="Role assignment"
                ></ProposalTypeCard>
              </v-col>
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-format-list-bulleted"
                  title="Role management"
                ></ProposalTypeCard>
              </v-col>
            </v-row>
            <v-divider class="mt-8"></v-divider>
          </div>

          <div>
            <div class="d-flex justify-start text-h4 primary--text mt-8 mb-8">
              Polls
            </div>
            <v-row justify="start">
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-ballot"
                  title="Yes / No"
                ></ProposalTypeCard>
              </v-col>
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-view-list-outline"
                  title="Multi option"
                ></ProposalTypeCard>
              </v-col>
            </v-row>
            <v-divider class="mt-8"></v-divider>
          </div>

          <div>
            <div class="d-flex justify-start text-h4 primary--text mt-8 mb-8">
              Profile
            </div>
            <v-row justify="start">
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-form-textbox"
                  title="Name change"
                ></ProposalTypeCard>
              </v-col>
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-tag"
                  title="Tag change"
                ></ProposalTypeCard>
              </v-col>
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-bullseye-arrow"
                  title="Mission change"
                ></ProposalTypeCard>
              </v-col>
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-eye"
                  title="Vision change"
                ></ProposalTypeCard>
              </v-col>
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-image"
                  title="Icon change"
                ></ProposalTypeCard>
              </v-col>
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-image-size-select-actual"
                  title="Logo change"
                ></ProposalTypeCard>
              </v-col>
            </v-row>
            <v-divider class="mt-8"></v-divider>
          </div>

          <div>
            <div class="d-flex justify-start text-h4 primary--text mt-8 mb-8">
              Constitution
            </div>
            <v-row justify="start">
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-bank"
                  title="Bill"
                ></ProposalTypeCard>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </v-container>

    <v-dialog v-model="showChangeLog" width="500" scrollable>
      <v-card>
        <v-card-text class="pt-4 d-flex justify-space-between align-center">
          <div class="text-h3 primary--text">Changelog</div>
          <v-btn fab outlined small @click="showChangeLog = false"
            ><v-icon small>mdi-close</v-icon></v-btn
          >
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="black--text" style="height: 350px">
          <DocumentChangelog class="mt-4"></DocumentChangelog>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  layout: "auton",
  data: () => ({
    dialog: true,
    selectedItem: "",
    termsAndConditionsVersionSelected: 0,
    termsAndConditionsVersions: 0,
    autonId: null,
    tabItemsDefault: [
      {
        icon: "mdi-scale-balance",
        title: "Terms & Conditions",
      },
      {
        icon: "mdi-email-newsletter",
        title: "Proposal types",
      },
      {
        icon: "mdi-cog",
        title: "Policies",
      },
    ],
    preambles: [
      {
        id: "a",
        title: "123",
        content: "abc",
      },
    ],
    currentGlossaryTree: null,
    currentPreambleTree: null,
    currentArticleTree: null,
    showChangeLog: false,
    versionMap: {},
    versionIds: [],
  }),
  async mounted() {
    this.$nuxt.$emit("Auton-setPage", "constitution");

    const autonIdParam = this.$route.params.autonId.replaceAll("_", " ");

    const autonIdWrapper = await this.$invoke("auton:getAutonIdByName", {
      name: autonIdParam,
    });

    this.autondId = autonIdWrapper.result.id;
    const autonWrapper = await this.$invoke("auton:getByID", {
      id: autonIdWrapper.result.id,
    });
    this.auton = autonWrapper.result;
    console.log(this.auton);

    let document = null;
    for (
      let index = 0;
      index < this.auton.governmentalDocuments.length;
      index++
    ) {
      const govDocId = this.auton.governmentalDocuments[index];

      const documentWrapper = await this.$invoke(
        "document:getGovernmentalDocumentByID",
        {
          id: govDocId,
        }
      );

      if (
        !documentWrapper.error &&
        documentWrapper.result.type == "constitution"
      ) {
        document = documentWrapper.result;
        this.documentId = govDocId;
      }
    }

    if (this.documentId == null) {
      this.documentId = "new";
    }

    let version = null;
    if (document && document.versions && document.versions.length > 0) {
      this.versionIds = document.versions;
      this.termsAndConditionsVersions = document.versions.length;
      this.termsAndConditionsVersionSelected = document.versions.length;

      await this.getVersion(
        this.termsAndConditionsVersionSelected,
        document.versions[document.versions.length - 1]
      );
      version = this.versionMap[this.termsAndConditionsVersionSelected];
    } else {
      // No Document so new one needs to be created in the transaction
    }

    console.log(version);
    this.selectVersion(this.termsAndConditionsVersionSelected);

    if (this.currentGlossaryTree == null) {
      this.currentGlossaryTree = [];
    }

    if (this.currentPreambleTree == null) {
      this.currentPreambleTree = [];
    }

    if (this.currentArticleTree == null) {
      this.currentArticleTree = [];
    }
    console.log("GlossaryTree");
    console.log(this.currentGlossaryTree);
    console.log("PreambleTree");
    console.log(this.currentPreambleTree);
    console.log("ArticleTree");
    console.log(this.currentArticleTree);
  },
  methods: {
    async getVersion(position, id) {
      const versionWrapper = await this.$invoke(
        "document:getGovernmentalVersionByID",
        {
          id: id,
        }
      );
      if (versionWrapper.result && !versionWrapper.result.error) {
        this.versionMap[position] = versionWrapper.result;
      }
    },
    selectVersion(position) {
      const version = this.versionMap[position];
      if (version) {
        for (let index = 0; index < version.trees.length; index++) {
          const treeWrapper = version.trees[index];
          if (treeWrapper.section == "GLOSSARY") {
            this.currentGlossaryTree = treeWrapper.tree;
          } else if (treeWrapper.section == "PREAMBLES") {
            this.currentPreambleTree = treeWrapper.tree;
          } else if (treeWrapper.section == "ARTICLES") {
            this.currentArticleTree = treeWrapper.tree;
          }
        }
      }
    },
  },
  watch: {
    termsAndConditionsVersionSelected: {
      async handler(newest, previous) {
        if (this.versionMap[newest] == null) {
          await this.getVersion(newest, this.versionIds[newest - 1]);
        }
        this.selectVersion(newest);
      },
    },
  },
};
</script>