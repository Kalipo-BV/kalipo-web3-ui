<template>
  <div>
    <v-container class="py-0 px-0 px-lg-3 white">
      <v-divider></v-divider>

      <v-tabs show-arrows v-model="selectedItem" color="primary">
        <v-tab
          v-for="(item, idx) in tabItemsDefault"
          :key="idx"
          @click="navigate(item.to)"
        >
          <v-icon small class="mr-2">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-tab>
      </v-tabs>
    </v-container>
    <v-container>
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
                    <div class="ml-1 text-caption font-weight">Test_test</div>
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
                      <v-chip color="accent" small outlined>13 members</v-chip>
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
                      >{{ glossaryChanges.length }} in glossary</v-chip
                    ><v-chip small class="mr-1" outlined
                      >{{ preambleChanges.length }} in preambles</v-chip
                    ><v-chip small class="mr-1" outlined
                      >{{ articleChanges.length }} in articles</v-chip
                    >
                  </div>

                  <v-btn
                    color=""
                    block
                    small
                    class="mt-4"
                    @click="showChangeLog = true"
                    >view all
                    {{
                      glossaryChanges.length +
                      preambleChanges.length +
                      articleChanges.length
                    }}
                    changes</v-btn
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
          <DocumentChangelog
            :glossaryChanges="glossaryChanges"
            :preambleChanges="preambleChanges"
            :articleChanges="articleChanges"
            class="mt-4"
          ></DocumentChangelog>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  layout: "auton",
  data: () => ({
    selectedItem: 0,
    tabItemsDefault: [
      {
        icon: "mdi-scale-balance",
        title: "Terms & Conditions",
        to: "terms_and_conditions",
      },
      {
        icon: "mdi-email-newsletter",
        title: "Proposal types",
        to: "proposal_types",
      },
      {
        icon: "mdi-cog",
        title: "Policies",
        to: "policies",
      },
    ],
    termsAndConditionsVersionSelected: 0,
    termsAndConditionsVersions: 0,
    autonId: null,
    currentGlossaryTree: null,
    currentPreambleTree: null,
    currentArticleTree: null,
    prevGlossaryTree: null,
    prevPreambleTree: null,
    prevArticleTree: null,
    showChangeLog: false,
    versionMap: {},
    versionIds: [],
    glossaryChanges: [],
    preambleChanges: [],
    articleChanges: [],
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
    navigate(to) {
      this.$router.push(
        `/dao/${this.$route.params.daoId}/auton/${this.$route.params.autonId}/constitution/${to}/`
      );
    },
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
    recursiveSearchTree(tree, entryId, entryNumber) {
      let found = null;
      if (entryNumber == null) {
        entryNumber = "";
      }
      if (tree) {
        for (let index = 0; index < tree.length; index++) {
          const entry = tree[index];
          if (entry.entryId == entryId) {
            entryNumber += index + 1 + ".";
            found = { entryNumber: entryNumber, entry: entry };
            break;
          }
          if (entry.children) {
            const tempNumber = entryNumber + (index + 1) + ".";
            const subResult = this.recursiveSearchTree(
              entry.children,
              entryId,
              tempNumber
            );
            if (subResult) {
              found = subResult;
            }
          }
        }
      }

      return found;
    },
    searchSectionByEntryId(entryId, prev) {
      console.log("this.currentGlossaryTree");
      console.log(this.currentGlossaryTree);
      let glossaryTree = null;
      if (prev) {
        glossaryTree = this.prevGlossaryTree;
      } else {
        glossaryTree = this.currentGlossaryTree;
      }
      console.log(entryId);
      const isGlossarySection = this.recursiveSearchTree(
        glossaryTree,
        entryId,
        null
      );
      if (isGlossarySection) {
        isGlossarySection.section = "GLOSSARY";
        return isGlossarySection;
      }

      let preambleTree = null;
      if (prev) {
        preambleTree = this.prevPreambleTree;
      } else {
        preambleTree = this.currentPreambleTree;
      }
      const isPreambleSection = this.recursiveSearchTree(
        preambleTree,
        entryId,
        null
      );
      if (isPreambleSection) {
        isPreambleSection.section = "PREAMBLES";
        return isPreambleSection;
      }

      let articleTree = null;
      if (prev) {
        articleTree = this.prevArticleTree;
      } else {
        articleTree = this.currentArticleTree;
      }
      const isArticleSection = this.recursiveSearchTree(
        articleTree,
        entryId,
        null
      );
      if (isArticleSection) {
        isArticleSection.section = "ARTICLES";
        return isArticleSection;
      }
      return false;
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

        let prevVersion = this.versionMap[position - 1];
        if (prevVersion) {
          for (let index = 0; index < prevVersion.trees.length; index++) {
            const treeWrapper = prevVersion.trees[index];
            if (treeWrapper.section == "GLOSSARY") {
              this.prevGlossaryTree = treeWrapper.tree;
            } else if (treeWrapper.section == "PREAMBLES") {
              this.prevPreambleTree = treeWrapper.tree;
            } else if (treeWrapper.section == "ARTICLES") {
              this.prevArticleTree = treeWrapper.tree;
            }
          }
        }

        this.glossaryChanges = [];
        this.preambleChanges = [];
        this.articleChanges = [];

        for (let index = 0; index < version.mutations.length; index++) {
          const mutation = version.mutations[index];
          console.log("mutation");
          console.log(mutation);
          let mutationEnriched = null;
          if (mutation.type != "DELETE") {
            mutationEnriched = this.searchSectionByEntryId(mutation.newEntryId);
          } else {
            if (this.versionIds.length > 1) {
              console.log("BLA");

              mutationEnriched = this.searchSectionByEntryId(
                mutation.newEntryId,
                true
              );
            }
          }

          console.log("mutationEnriched");
          console.log(mutationEnriched);
          if (mutationEnriched) {
            mutationEnriched.changes = mutation.changes;
            mutationEnriched.type = mutation.type;
            if (mutationEnriched.section == "GLOSSARY") {
              this.glossaryChanges.push(mutationEnriched);
            } else if (mutationEnriched.section == "PREAMBLES") {
              this.preambleChanges.push(mutationEnriched);
            } else if (mutationEnriched.section == "ARTICLES") {
              this.articleChanges.push(mutationEnriched);
            }
            console.log("mutationEnriched");
            console.log(mutationEnriched);
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
        if (this.versionMap[newest - 1] == null && this.versionIds.length > 1) {
          await this.getVersion(newest - 1, this.versionIds[newest - 2]);
        }
        this.selectVersion(newest);
      },
    },
  },
};
</script>

<style>
</style>