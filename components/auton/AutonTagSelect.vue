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
    <v-combobox
      v-model="tagsValue"
      :items="items"
      :search-input.sync="search"
      hide-selected
      hint="Maximum of 5 tags"
      label="Tags"
      multiple
      persistent-hint
      small-chips
      filled
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              No results matching "<strong>{{ search }}</strong
            >". Press <kbd>enter</kbd> to create a new one
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-combobox>
  </div>
</template>
<script>
export default {
  props: ["tags"],
  computed: {
    tagsValue: {
      get: function () {
        return this.tags;
      },
      set: function (newValue) {
        this.$emit("update:tags", newValue);
      },
    },
  },
  methods: {},
  watch: {
    model(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop());
      }
    },
  },
  data: () => ({
    items: [
      "AMM",
      "Blockchain",
      "Coalition",
      "Consultancy",
      "Design",
      "DeFi",
      "Finance",
      "IT",
      "Logistics",
      "Manufacturing",
      "Marketplace",
      "Marketing",
      "NFT",
      "SEO",
    ],
    search: null,
  }),
};
</script>
