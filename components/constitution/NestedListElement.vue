<template>
  <v-expansion-panel :readonly="changeOrderMode">
    <v-expansion-panel-header
      :class="changeOrderMode ? 'py-0 my-0' : ''"
      :style="changeOrderMode ? 'min-height: 32px' : ''"
      :expand-icon="changeOrderMode ? 'mdi-cursor-move' : 'mdi-menu-down'"
    >
      <div
        class="text-h6 d-flex align-center"
        :style="elementMargin"
        :class="changeOrderMode ? 'text-caption' : ''"
      >
        {{ prefix }}
        <!-- <v-text-field
          :label="item.header"
          solo
          hide-details=""
          dense
          class="mx-2"
          v-if="isOpen && !changeOrderMode"
          @click="$event.stopPropagation()"
        ></v-text-field> -->
        <div class="mx-2">
          {{ item.title }}
        </div>
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div
        class="px-6 pb-4 text-body-1"
        v-if="item.content && !changeOrderMode"
      >
        <div :style="elementMargin">
          {{ item.content }}
        </div>
      </div>
      <v-divider></v-divider>

      <div v-if="hasChildren">
        <v-expansion-panels accordion v-model="panel" multiple flat>
          <NestedListElement
            v-for="(childItem, i) in item.children"
            :key="i"
            :item="childItem"
            :spacing="spacing + 6"
            :prefix="prefix + (i + 1) + '.'"
            :isOpen="panel.includes(i)"
            :changeOrderMode="changeOrderMode"
          ></NestedListElement>
        </v-expansion-panels>
      </div>
    </v-expansion-panel-content>
    <v-divider v-if="!changeOrderMode"></v-divider>
  </v-expansion-panel>
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
      panel: [],
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
  },
};
</script>

<style>
</style>