<template>
  <div>
    <div v-if="selected == null">
      <div class="d-flex align-center justify-space-between mb-2">
        <div class="text-h4">{{ title }}</div>
        <div>
          <v-btn color="accent" @click="newOne"
            ><v-icon class="mr-1">mdi-plus</v-icon> new</v-btn
          >
        </div>
      </div>
      <div>
        <v-system-bar
          class="mt-2 white--text text-body-1"
          color="accent"
          flat
          height="30"
        >
          <span
            class="mr-1"
            @click="
              {
                showing = { children: items };
                crumbs = [];
              }
            "
            style="cursor: pointer"
            >Main</span
          >
          <div v-for="(item, i) in crumbs" :key="i">
            <span class="mr-1" v-if="item"
              ><v-icon color="white">mdi-menu-right</v-icon></span
            >
            <span
              class="mr-1"
              v-if="item"
              @click="show(item.entryId)"
              style="cursor: pointer"
              >{{ item.entryNumber }}</span
            >
          </div>
        </v-system-bar>
      </div>
      <v-list dense flat class="mt-0 pt-0">
        <v-list-item-group color="primary" v-model="selectedItem">
          <draggable v-model="filtered">
            <transition-group>
              <v-list-item
                v-for="(item, i) in filtered"
                :key="item.entryId"
                color="accent"
                :class="(i + 1) % 2 ? 'grey lighten-4' : ''"
              >
                <div
                  v-if="i != 0"
                  style="width: 100%; position: absolute; top: 0; left: 0"
                >
                  <v-divider></v-divider>
                </div>
                <div v-if="!orderMode">
                  <v-btn
                    x-small
                    color="accent"
                    fab
                    outlined
                    class="mr-3"
                    @click="show(item.entryId)"
                    ><v-icon small>mdi-format-list-numbered</v-icon></v-btn
                  >
                </div>
                <v-list-item-content
                  @click="open(item.entryId)"
                  :style="
                    item.icon == 'mdi-delete-circle'
                      ? 'text-decoration: line-through'
                      : ''
                  "
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                  <v-list-item-title
                    class="error--text"
                    v-show="item.icon != 'mdi-plus-circle'"
                    >{{ item.error }}</v-list-item-title
                  >
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
              </v-list-item>
            </transition-group>
          </draggable>
          <v-list-item v-if="filtered.length == 0"
            >No entries, create a new one!</v-list-item
          >
        </v-list-item-group>
      </v-list>
    </div>
    <div v-if="selected != null">
      <EntryDetail
        @cancel="selected = null"
        @update="update"
        @delete="markForDelete"
        @unDelete="unDelete"
        @create="create"
        :id="selectedId"
        :title.sync="selected.title"
        :content.sync="selected.content"
        :isMarkedForDelete="isMarkedForDelete(selected)"
      ></EntryDetail>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    currentTree: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      selectedId: null,
      selected: null,
      showing: null,
      showingObj: null,
      crumbs: [],
      tempUUIDs: [],
      parentIdMap: {},
      mutations: [],
      selectedEntryNumber: null,
      orderMode: false,
      selectedItem: null,
      items: [],
    };
  },
  computed: {
    elementMargin() {
      return {
        "padding-left": `${this.spacing}px !important`,
      };
    },
    hasChildren() {
      const { children } = this.item;
      return children && children.length > 0;
    },
    ordered() {
      return this.items.sort((a, b) =>
        a.entryNumber > b.entryNumber ? 1 : -1
      );
    },
    filtered: {
      get: function () {
        if (this.showing) {
          if (this.showing.children) {
            return this.showing.children;
          } else {
            return [];
          }
        } else {
          return this.items;
        }
      },
      set: function (newValue) {
        // console.log(newValue);
        // const result = [];
        // for (let index = 0; index < newValue.length; index++) {
        //   const element = newValue[index];
        //   if (this.selectedEntryNumber) {
        //     element.entryNumber =
        //       element.entryNumber.substr(0, this.selectedEntryNumber.length) +
        //       (index + 1) +
        //       ".";
        //   } else {
        //     element.entryNumber = index + 1 + ".";
        //   }
        // }
      },
    },
  },
  watch: {
    selected(newest, previous) {
      if (newest != null) {
        this.$nuxt.$emit("AutonProposalSubmit-HideNavigation", true);
      } else {
        this.$nuxt.$emit("AutonProposalSubmit-HideNavigation", false);
      }
    },
  },
  async mounted() {
    console.log("CURRENT TREE master:");
    console.log(this.currentTree);
    const recursiveItems = this.recursieFill(this.currentTree, null);
    // recursiveItems.push({
    //   entryId:
    //     "222c279c972b3568483b2c8edb8eca711edcbc45c0f3583c9767bf14cd1f1ea9",
    //   title: "",
    //   content: "",
    //   icon: "",
    //   children: [],
    //   synced: false,
    //   entryNumber: 3,
    //   parentId: null,
    // });
    for (let index = 0; index < recursiveItems.length; index++) {
      const entry = recursiveItems[index];
      this.syncEntry(entry);
    }

    this.items = recursiveItems;
    this.showing = { children: recursiveItems };
    this.showingObj = null;

    this.updateProposedTree();
  },
  methods: {
    async syncEntry(entry) {
      const entryWrapper = await this.$invoke(
        "document:getGovernmentalEntryByID",
        {
          id: entry.entryId,
        }
      );

      if (entryWrapper.result && !entryWrapper.error) {
        entry.title = entryWrapper.result.title;
        entry.content = entryWrapper.result.content;
      } else {
        if (entryWrapper.result == null) {
          entry.error = "Entry was not found";
        }
      }
      entry.synced = true;
    },
    recursieFill(treeList, parentId) {
      const result = [];
      for (let index = 0; index < treeList.length; index++) {
        const tree = treeList[index];

        const children = this.recursieFill(tree.children, tree.entryId);
        result.push({
          entryId: tree.entryId,
          title: "",
          content: "",
          icon: "",
          children: children,
          entryNumber: index + 1,
          synced: false,
          parentId: parentId ? parentId : null,
        });
        if (parentId) {
          this.parentIdMap[tree.entryId] = parentId;
        }
      }
      return result;
    },
    recursiveCrumbs(entry, crumbs) {
      console.log("Recursive crumbs");
      crumbs.push(entry);
      console.log(crumbs);

      if (entry.parentId != null) {
        const parent = this.get(entry.parentId);
        console.log(parent);
        if (parent) {
          this.recursiveCrumbs(parent, crumbs);
        }
      }
      return crumbs;
    },
    recursiveGet(id, items) {
      let item = null;
      if (items) {
        for (let index = 0; index < items.length; index++) {
          const element = items[index];
          if (element.entryId == id) {
            item = element;
          } else {
            if (element.children && element.children.length > 0) {
              const result = this.recursiveGet(id, element.children);
              if (result != null) {
                return result;
              }
            }
          }
        }
      }

      if (item != null) {
        return item;
      }
      return null;
    },
    get(id) {
      return this.recursiveGet(id, this.items);
    },
    show(id) {
      const search = this.get(id);
      this.showing = search;
      this.showingObj = search;

      if (this.showing.children) {
        for (let index = 0; index < this.showing.children.length; index++) {
          const entry = this.showing.children[index];
          this.syncEntry(entry);
        }
      }

      if (this.showingObj) {
        console.log("showingObj");
        console.log(this.showingObj);
        const crumbs = this.recursiveCrumbs(this.showingObj, []);
        if (crumbs) {
          this.crumbs = crumbs.reverse();
        }
      }
    },
    open(id) {
      this.selectedId = id;
      this.selected = this.get(id);
    },
    update() {
      let foundMutation = null;
      for (let index = 0; index < this.mutations.length; index++) {
        const mutation = this.mutations[index];
        if (mutation.entryId == this.selected.entryId) {
          foundMutation = mutation;
        }
      }
      if (foundMutation) {
        foundMutation.title = this.selected.title;
        foundMutation.content = this.selected.content;
      } else {
        this.mutations.push({
          type: "UPDATE",
          entryId: this.selected.entryId,
          title: this.selected.title,
          content: this.selected.content,
        });
      }
      this.$emit("mutationUpdate", this.mutations);

      if (this.selected.icon != "mdi-plus-circle") {
        this.selected.icon = "mdi-pencil-circle";
      }
      this.selected = null;
    },
    markForDelete() {
      this.selected.icon = "mdi-delete-circle";
      this.selected = null;
    },
    unDelete() {
      this.selected.icon = undefined;
      this.selected = null;
    },
    isMarkedForDelete(item) {
      if (item.icon == "mdi-delete-circle") {
        return true;
      }
      return false;
    },
    generateUUID() {
      // Public Domain/MIT
      var d = new Date().getTime(); //Timestamp
      var d2 =
        (typeof performance !== "undefined" &&
          performance.now &&
          performance.now() * 1000) ||
        0; //Time in microseconds since page-load or 0 if unsupported
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = Math.random() * 16; //random number between 0 and 16
          if (d > 0) {
            //Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
          } else {
            //Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
          }
          return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
    },
    convertProposedTreeRecursive(trees) {
      const result = [];
      for (let index = 0; index < trees.length; index++) {
        const tree = trees[index];
        if (tree.children) {
          const tempResult = this.convertProposedTreeRecursive(tree.children);
          if (tempResult) {
            result.push({ entryId: tree.entryId, children: tempResult });
          } else {
            result.push({ entryId: tree.entryId, children: [] });
          }
        } else {
          result.push({ entryId: tree.entryId, children: [] });
        }
      }
      return result;
    },
    updateProposedTree() {
      console.log("updateProposedTree");
      const proposedTree = this.convertProposedTreeRecursive(this.items);
      this.$emit("update:proposedTree", proposedTree);

      console.log("proposedTree:");
      console.log(proposedTree);
    },
    newOne() {
      this.selectedId = "new";
      this.selected = {
        entryId: this.generateUUID(),
        title: "",
        content: "",
        icon: "mdi-plus-circle",
        entryNumber: this.filtered ? this.filtered.length + 1 : 1,
        parentId: this.showingObj ? this.showingObj.entryId : null,
        children: [],
      };
    },
    create() {
      if (this.showing.children) {
        this.showing.children.push(this.selected);
      } else {
        this.showing.children = [this.selected];
      }
      this.updateProposedTree();
      this.mutations.push({
        type: "CREATE",
        entryId: this.selected.entryId,
        title: this.selected.title,
        content: this.selected.content,
      });
      this.tempUUIDs.push(this.selected.entryId);
      this.$emit("mutationUpdate", this.mutations);
      this.selected = null;
    },
  },
};
</script>