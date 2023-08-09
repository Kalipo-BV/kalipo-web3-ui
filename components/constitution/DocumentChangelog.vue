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
    <v-row dense>
      <v-col cols="12" md="12">
        <div class="text-h6">
          {{ glossaryChanges.length }} glossary change<span
            v-show="glossaryChanges.length != 1"
            >s</span
          >
        </div>
        <v-list>
          <v-list-item
            two-line
            dense
            class="grey lighten-4"
            v-for="(item, i) in glossaryChanges"
            :key="i"
          >
            <v-list-item-avatar size="20">
              <v-icon class="grey" dark x-small v-if="item.type == 'CREATE'">
                mdi-plus
              </v-icon>
              <v-icon class="grey" dark x-small v-if="item.type == 'UPDATE'">
                mdi-pencil
              </v-icon>
              <v-icon class="grey" dark x-small v-if="item.type == 'DELETE'">
                mdi-delete
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-caption"
                >{{ item.entryNumber }} {{ item.entry.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-chip
                  x-small
                  class="mr-1"
                  v-for="(change, y) in item.changes"
                  :key="y"
                  >{{ change }}</v-chip
                >
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" md="12">
        <div class="text-h6">
          {{ preambleChanges.length }} preamble change<span
            v-show="preambleChanges.length != 1"
            >s</span
          >
        </div>
        <v-list>
          <v-list-item
            two-line
            dense
            class="grey lighten-4"
            v-for="(item, i) in preambleChanges"
            :key="i"
          >
            <v-list-item-avatar size="20">
              <v-icon class="grey" dark x-small v-if="item.type == 'CREATE'">
                mdi-plus
              </v-icon>
              <v-icon class="grey" dark x-small v-if="item.type == 'UPDATE'">
                mdi-pencil
              </v-icon>
              <v-icon class="grey" dark x-small v-if="item.type == 'DELETE'">
                mdi-delete
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-caption"
                >{{ item.entryNumber }} {{ item.entry.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-chip
                  x-small
                  class="mr-1"
                  v-for="(change, y) in item.changes"
                  :key="y"
                  >{{ change }}</v-chip
                >
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" md="12">
        <div class="text-h6">
          {{ articleChanges.length }} article change<span
            v-show="articleChanges.length != 1"
            >s</span
          >
        </div>
        <v-list>
          <v-list-item
            two-line
            dense
            class="grey lighten-4"
            v-for="(item, i) in articleChanges"
            :key="i"
          >
            <v-list-item-avatar size="20">
              <v-icon class="grey" dark x-small v-if="item.type == 'CREATE'">
                mdi-plus
              </v-icon>
              <v-icon class="grey" dark x-small v-if="item.type == 'UPDATE'">
                mdi-pencil
              </v-icon>
              <v-icon class="grey" dark x-small v-if="item.type == 'DELETE'">
                mdi-delete
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-caption"
                >{{ item.entryNumber }} {{ item.entry.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-chip
                  x-small
                  class="mr-1"
                  v-for="(change, y) in item.changes"
                  :key="y"
                  >{{ change }}</v-chip
                >
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["glossaryChanges", "preambleChanges", "articleChanges"],
};
</script>

<style>
</style>