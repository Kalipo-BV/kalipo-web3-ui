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

      <v-divider v-if="!isFirstItem" class="mx-6"></v-divider>

      <div v-if="hasChildren">
        <v-expansion-panels accordion v-model="panel" multiple flat>
          <NestedListElement
            v-for="(childItem, i) in item.children"
            :key="i"
            :item="childItem"
            class="nested-list-childs grey lighten-4"
            :prefix="prefix + (i + 1) + '.'"
            :isOpen="panel.includes(i)"
            :changeOrderMode="changeOrderMode"
            :isFirstItem="i == 0"
            :isLastItem="i == item.children.length - 1"
          ></NestedListElement>
        </v-expansion-panels>
      </div>
    </v-expansion-panel-content>
    <v-divider v-if="!isLastItem"></v-divider>
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
    isFirstItem: {
      type: Boolean,
      default: false,
    },
    isLastItem: {
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