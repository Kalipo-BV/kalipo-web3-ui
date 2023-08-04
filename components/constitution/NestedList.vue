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
  <div class="" v-if="items && items.length > 0 && synced">
    <v-card-text class="py-3">
      <div class="d-flex align-center align-center">
        <div class="text-h3 primary--text">{{ title }}</div>
      </div>
    </v-card-text>

    <div class="py-0">
      <v-expansion-panels accordion v-model="panel" multiple flat>
        <NestedListElement
          v-for="(item, i) in items"
          :key="i"
          :item="item"
          class="nested-list-childs grey lighten-4"
          :prefix="i + 1 + '.'"
          :isOpen="panel.includes(i)"
          :isFirstItem="i == 1"
          :isLastItem="i == items.length - 1"
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
      panel: [],
      synced: false,
    };
  },
  watch: {
    items: {
      async handler(val, oldVal) {
        // do your stuff
        this.synced = false;
        for (let index = 0; index < val.length; index++) {
          const entry = val[index];
          await this.recursiveSync(entry);
        }
        this.synced = true;
      },
    },
  },
  async mounted() {},
  methods: {
    async recursiveSync(entry) {
      if (entry) {
        await this.syncEntry(entry);
        if (entry.children && entry.children.length > 0) {
          for (let index = 0; index < entry.children.length; index++) {
            const child = entry.children[index];
            await this.recursiveSync(child);
          }
        }
      }
    },
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
  },
};
</script>

<style>
.nested-list-childs .v-expansion-panel-content__wrap {
  padding: 0;
}
</style>