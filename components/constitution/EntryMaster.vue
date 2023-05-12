<template>
  <div>
    <div v-if="selected == null">
      <div class="d-flex align-center justify-space-between mb-2">
        <div class="text-h4">Preambles</div>
        <div>
          <v-btn
            class="mr-2"
            :color="orderMode ? 'primary' : 'accent'"
            @click="orderMode = !orderMode"
            ><div class="d-flex align-center" v-if="!orderMode">
              <v-icon small class="mr-1">mdi-cursor-move</v-icon> order
            </div>
            <div class="d-flex align-center" v-if="orderMode">
              <v-icon small class="mr-1">mdi-pencil</v-icon> edit
            </div></v-btn
          >
          <v-btn color="accent" @click="newOne" v-if="!orderMode"
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
          v-if="!orderMode"
        >
          <span
            class="mr-1"
            @click="selectedEntryNumber = null"
            style="cursor: pointer"
            >Main</span
          >
          <div v-for="(item, i) in selectedEntryNumber?.split('.')" :key="i">
            <span class="mr-1" v-if="item"
              ><v-icon color="white">mdi-menu-right</v-icon></span
            >
            <span
              class="mr-1"
              v-if="item"
              @click="
                selectedEntryNumber =
                  selectedEntryNumber.split('.', i + 1).join('.') + '.'
              "
              style="cursor: pointer"
              >{{ item }}</span
            >
          </div>
        </v-system-bar>
      </div>
      <v-list dense flat class="mt-0 pt-0">
        <v-list-item-group color="primary" v-model="selectedItem">
          <v-list-item
            v-for="(item, i) in filtered"
            :key="i"
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
                @click="selectedEntryNumber = item.entryNumber"
                ><v-icon small>mdi-format-list-numbered</v-icon></v-btn
              >
            </div>
            <div v-if="orderMode" class="mr-2">
              <v-icon x-small v-if="selectedItem == i"
                >mdi-checkbox-blank-circle</v-icon
              >
              <v-icon x-small v-if="selectedItem != i"
                >mdi-checkbox-blank-circle-outline</v-icon
              >
            </div>
            <v-list-item-content
              @click="select(item.id)"
              :style="
                item.icon == 'mdi-delete-circle'
                  ? 'text-decoration: line-through'
                  : ''
              "
            >
              <v-list-item-title
                >{{ item.entryNumber }} {{ item.title }}</v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item v-if="filtered.length == 0"
            >No entries, create a new one!</v-list-item
          >
        </v-list-item-group>
      </v-list>
      <div class="primary px-5" v-if="orderMode">
        <v-row>
          <v-col>
            <v-btn
              block
              x-small
              color="accent"
              @click="left"
              :outlined="!isLeftPossible()"
              ><v-icon small>mdi-arrow-left</v-icon></v-btn
            >
          </v-col>
          <v-col>
            <v-btn block x-small color="accent" @click="up"
              ><v-icon small>mdi-arrow-up</v-icon></v-btn
            >
          </v-col>
          <v-col>
            <v-btn block x-small color="accent" @click="down"
              ><v-icon small>mdi-arrow-down</v-icon></v-btn
            >
          </v-col>
          <v-col>
            <v-btn block x-small color="accent"
              ><v-icon small>mdi-arrow-right</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </div>
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
    item: {
      type: Object,
      required: true,
    },
    spacing: {
      type: Number,
      default: 0,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
      default: "",
    },
    changeOrderMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedId: null,
      selected: null,
      created: [],
      updated: [],
      deleted: [],
      selectedEntryNumber: null,
      orderMode: false,
      selectedItem: null,
      items: [
        {
          id: "d",
          entryNumber: "2.",
          title: "Conversions",
          content: "",
          icon: "",
        },
        {
          id: "a",
          entryNumber: "1.",
          title: "First",
          content: "abc ",
        },
        {
          id: "b",
          entryNumber: "1.1.",
          title: "Ipsum",
          content: "",
        },
        {
          id: "c",
          entryNumber: "1.2.",
          title: "Lorem",
          content: "",
        },
      ],
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
    filtered() {
      const that = this;
      return this.ordered.filter((item) => {
        if (that.orderMode) {
          return true;
        } else {
          if (that.selectedEntryNumber != null) {
            return (
              item.entryNumber.startsWith(that.selectedEntryNumber) &&
              item.entryNumber != that.selectedEntryNumber &&
              item.entryNumber
                .substr(that.selectedEntryNumber.length)
                .split(".").length == 2
            );
          } else {
            return item.entryNumber.split(".").length - 1 == 1;
          }
        }
      });
    },
  },
  watch: {
    changeOrderMode(newest, previous) {
      if (newest) {
        const panels = [];
        if (this.item.children !== undefined) {
          for (let index = 0; index < this.item.children.length; index++) {
            panels.push(index);
          }
        }
        this.panel = panels;
      } else {
        this.panel = [];
      }
    },
    selected(newest, previous) {
      if (newest != null) {
        this.$nuxt.$emit("AutonProposalSubmit-HideNavigation", true);
      } else {
        this.$nuxt.$emit("AutonProposalSubmit-HideNavigation", false);
      }
    },
  },
  methods: {
    get(id) {
      let item = null;
      for (let index = 0; index < this.items.length; index++) {
        const element = this.items[index];
        if (element.id == id) {
          item = element;
        }
      }
      console.log(item);
      return item;
    },
    select(id) {
      console.log("si");
      console.log(this.items);
      if (!this.orderMode) {
        this.selectedId = id;
        this.selected = this.get(id);
      }
    },
    update(id, title, content) {
      if (this.selected.icon != "mdi-plus-circle") {
        this.selected.icon = "mdi-pencil-circle";
      }
      this.selected = null;
    },
    markForDelete(id) {
      this.selected.icon = "mdi-delete-circle";
      this.selected = null;
    },
    unDelete(id) {
      this.selected.icon = undefined;
      this.selected = null;
    },
    isMarkedForDelete(item) {
      if (item.icon == "mdi-delete-circle") {
        return true;
      }
      return false;
    },
    newOne() {
      this.selectedId = "new";
      this.selected = {
        id: "",
        title: "",
        content: "",
        icon: "mdi-plus-circle",
        entryNumber:
          this.selectedEntryNumber + (this.filtered.length + 1) + ".",
      };
    },
    create() {
      this.items.push(this.selected);
      this.selected = null;
    },
    incrementEntryNumber(entryNumber) {
      const numbers = entryNumber.split(".");
      let result = "";
      for (let index = 0; index < numbers.length; index++) {
        let element = numbers[index];
        if (index >= numbers.length - 2) {
          if (index >= numbers.length - 1) {
            break;
          }
          result += Number(element) + 1;
        } else {
          result += element;
        }
        result += ".";
      }
      return result;
    },
    decrementEntryNumber(entryNumber) {
      const numbers = entryNumber.split(".");
      let result = "";
      for (let index = 0; index < numbers.length; index++) {
        let element = numbers[index];
        if (index >= numbers.length - 2) {
          if (index >= numbers.length - 1) {
            break;
          }
          result += Number(element) - 1;
        } else {
          result += element;
        }
        result += ".";
      }
      return result;
    },
    tillParentIncremented(entryNumber) {
      const numbers = entryNumber.split(".");
      let result = "";

      let heighestNumber = -1;
      for (let index = 0; index < this.items.length; index++) {
        const element = this.items[index];
        const elementNumbers = element.entryNumber.split(".");
        if (elementNumbers.length == numbers.length - 1) {
          if (
            Number(elementNumbers[elementNumbers.length - 2]) >
            Number(heighestNumber)
          );
          {
            heighestNumber = Number(elementNumbers[elementNumbers.length - 2]);
          }
        }
      }

      for (let index = 0; index < numbers.length - 3; index++) {
        const element = numbers[index];
        result += element + ".";
      }

      result += Number(heighestNumber) + 1 + ".";

      return result;
    },
    down() {
      const item = this.filtered[this.selectedItem];
      //   for (let index = 0; index < this.filtered.length; index++) {
      //     const element = this.filtered[index];
      //     if (index == this.selectedItem) {
      //     }
      //   }
      console.log(this.incrementEntryNumber(item.entryNumber));
    },
    up() {
      const item = this.filtered[this.selectedItem];
      //   for (let index = 0; index < this.filtered.length; index++) {
      //     const element = this.filtered[index];
      //     if (index == this.selectedItem) {
      //     }
      //   }
      console.log(this.decrementEntryNumber(item.entryNumber));
    },
    isLeftPossible() {
      if (this.selectedItem) {
        const item = this.filtered[this.selectedItem];
        if (item.entryNumber.split(".").length > 2) {
          return true;
        }
      }
      return false;
    },
    left() {
      if (this.isLeftPossible) {
        const item = this.filtered[this.selectedItem];
        if (item && item.entryNumber.split(".").length > 2) {
          const itemNumbers = item.entryNumber.split(".");
          item.oldEntryNumber = item.entryNumber;
          item.entryNumber = this.tillParentIncremented(item.entryNumber);

          for (let index = 0; index < this.items.length; index++) {
            const element = this.items[index];
            const elementNumbers = element.entryNumber.split(".");
            if (itemNumbers.length == elementNumbers.length) {
              console.log("WUT");
              console.log(elementNumbers);
              console.log(elementNumbers[elementNumbers.length - 2]);
              console.log(itemNumbers);
              console.log(itemNumbers[itemNumbers.length - 2]);
              if (
                Number(elementNumbers[elementNumbers.length - 2]) >
                Number(itemNumbers[itemNumbers.length - 2])
              ) {
                if (!element.oldEntryNumber) {
                  element.oldEntryNumber = element.entryNumber;
                }
                let newEntryNumber = "";
                for (
                  let index = 0;
                  index < elementNumbers.length - 2;
                  index++
                ) {
                  const elementNum = elementNumbers[index];
                  newEntryNumber += elementNum + ".";
                }
                newEntryNumber +=
                  Number(elementNumbers[elementNumbers.length - 2]) - 1;
                newEntryNumber += ".";
                element.entryNumber = newEntryNumber;
              }
            }
          }
        }
      }
    },
  },
};
</script>