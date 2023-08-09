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
  <div class="">
    <div v-show="step == 0">
      <v-card-text>
        <AutonStepperHeader
          title="Proposing new Terms & Conditions"
          subtitle=""
        >
        </AutonStepperHeader>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <EntryMaster
          title="Glossary"
          :currentTree="currentGlossaryTree"
          :proposedTree.sync="proposedGlossaryTree"
          v-if="currentGlossaryTree"
          @mutationUpdate="mutationUpdate"
        ></EntryMaster>
      </v-card-text>
    </div>

    <div v-show="step == 1">
      <v-card-text>
        <AutonStepperHeader
          title="Proposing new Terms & Conditions"
          subtitle=""
        >
        </AutonStepperHeader>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <EntryMaster
          title="Preambles"
          :currentTree="currentPreambleTree"
          v-if="currentPreambleTree"
          :proposedTree.sync="proposedPreambleTree"
          @mutationUpdate="mutationUpdate"
        ></EntryMaster>
      </v-card-text>
    </div>

    <div v-show="step == 2">
      <v-card-text>
        <AutonStepperHeader
          title="Proposing new Terms & Conditions"
          subtitle=""
        >
        </AutonStepperHeader>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <EntryMaster
          title="Articles"
          :currentTree="currentArticleTree"
          v-if="currentArticleTree"
          :proposedTree.sync="proposedArticleTree"
          @mutationUpdate="mutationUpdate"
        ></EntryMaster>
      </v-card-text>
    </div>

    <AccountSign
      :transaction="transaction"
      :uri="uri"
      v-if="step == 3"
      callback="AutonCreate-PrevStep"
      title="Proposing Terms & Conditions"
      @callbackFinish="$router.app.refresh()"
    ></AccountSign>
    <v-divider></v-divider>
    <v-card-text v-if="!hideNavigation && step != 3">
      <div class="d-flex align-center justify-space-between">
        <v-btn @click="prevStep">
          <v-icon class="mr-2" small>mdi-arrow-left</v-icon> previous
        </v-btn>
        <v-btn color="accent" @click="nextStep" :disabled="disabledNext">
          next <v-icon class="ml-2" small>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </v-card-text>
  </div>
</template>
<script>
export default {
  data: () => ({
    step: 0,
    disabledNext: false,
    hideNavigation: false,
    auton: null,
    documentId: null,
    currentGlossaryTree: null,
    currentPreambleTree: null,
    currentArticleTree: null,
    mutationList: [],
    proposedGlossaryTree: null,
    proposedPreambleTree: null,
    proposedArticleTree: null,
    transaction: null,
    uri: "/",
  }),
  created() {
    this.$nuxt.$on("AutonCreate-NextStep", ($event) => this.step++);
    this.$nuxt.$on("AutonCreate-PrevStep", ($event) => this.step--);
    this.$nuxt.$on("AutonProposalSubmit-HideNavigation", ($event) => {
      this.hideNavigation = $event;
    });
  },
  async mounted() {
    this.uri = this.$route.path.substr(0, this.$route.path.length - 1);
    const autonIdParam = this.$route.params.autonId.replaceAll("_", " ");

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
        const versionWrapper = await this.$invoke(
          "document:getGovernmentalVersionByID",
          {
            id: document.versions[document.versions.length - 1],
          }
        );

        if (!versionWrapper.error) {
          version = versionWrapper.result;
        }
      } else {
        // No Document so new one needs to be created in the transaction
      }

      console.log(version);
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
    }
  },
  methods: {
    makeTransaction() {},
    prevStep() {
      if (this.step == 0) {
        this.$nuxt.$emit("AutonProposalSubmit-PrevStep");
      } else {
        this.step--;
      }
    },
    nextStep() {
      this.step++;
      console.log("this.proposedGlossaryTree");
      console.log(this.proposedGlossaryTree);

      if (this.step == 3) {
        this.transaction = {
          moduleId: 1004,
          assetId: 2,
          assets: {
            autonId: this.autondId,
            documentId: this.documentId,
            type: "constitution",
            mutations: this.mutationList,
            trees: [
              {
                section: "GLOSSARY",
                tree: this.proposedGlossaryTree
                  ? this.proposedGlossaryTree
                  : [],
              },
              {
                section: "PREAMBLES",
                tree: this.proposedPreambleTree
                  ? this.proposedPreambleTree
                  : [],
              },
              {
                section: "ARTICLES",
                tree: this.proposedArticleTree ? this.proposedArticleTree : [],
              },
            ],
          },
        };
        console.log("this.transaction");
        console.log(this.transaction);
      }
    },
    mutationUpdate(mutationList) {
      for (let index = 0; index < mutationList.length; index++) {
        const mutation = mutationList[index];
        let found = null;

        for (let index = 0; index < this.mutationList.length; index++) {
          const currentMutation = this.mutationList[index];
          if (mutation.entryId == currentMutation.entryId) {
            found = true;
            currentMutation.title = mutation.title;
            currentMutation.content = mutation.content;
            break;
          }
        }
        if (!found) {
          this.mutationList.push(mutation);
        }
      }
      console.log(mutationList);
    },
  },
};
</script>
