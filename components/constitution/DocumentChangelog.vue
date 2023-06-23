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