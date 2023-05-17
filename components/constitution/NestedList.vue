<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-1">
      <div class="text-h3">{{ title }}</div>
    </div>
    <div class="py-1 px-1 mx-n1" style="max-height: 350px; overflow: scroll">
      <v-expansion-panels accordion v-model="panel" multiple flat>
        <NestedListElement
          v-for="(item, i) in items"
          :key="i"
          :item="item"
          class="nested-list-childs"
          :prefix="i + 1 + '.'"
          :isOpen="panel.includes(i)"
          :changeOrderMode="changeOrderMode"
        >
        </NestedListElement>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "items"],
  data() {
    return {
      changeOrderMode: false,
      panel: [],
    };
  },
  watch: {
    changeOrderMode(newest, previous) {
      if (newest) {
        const panels = [];
        for (let index = 0; index < this.items.length; index++) {
          panels.push(index);
        }
        this.panel = panels;
      } else {
        this.panel = [];
      }
    },
  },
  computed: {},
};
</script>

<style>
.nested-list-childs .v-expansion-panel-content__wrap {
  padding: 0;
}
</style>