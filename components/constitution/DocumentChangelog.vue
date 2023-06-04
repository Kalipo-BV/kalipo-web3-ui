<template>
  <div>
    <v-row dense>
      <v-col cols="12" md="12">
        <div class="text-h6">5 glossary changes</div>
        <v-list>
          <v-list-item two-line dense class="grey lighten-4">
            <v-list-item-avatar size="20">
              <v-icon class="grey" dark x-small> mdi-pencil </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-caption"
                >1.1. Ecosystem customer
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-chip x-small class="mr-1">Content changed</v-chip>
                <v-chip x-small class="mr-1">Title changed</v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" md="12">
        <div class="text-h6">3 preamble changes</div>
        <v-list>
          <v-list-item two-line dense class="grey lighten-4">
            <v-list-item-avatar size="20">
              <v-icon class="grey" dark x-small> mdi-delete </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-caption"
                >12. Strategic positioning
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-chip x-small class="mr-1">Removed</v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" md="12">
        <div class="text-h6">3 article changes</div>
        <v-list>
          <v-list-item two-line dense class="grey lighten-4">
            <v-list-item-avatar size="20">
              <v-icon class="grey" dark x-small> mdi-plus </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-caption"
                >6. Online obligations
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-chip x-small class="mr-1">Created</v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <div class="d-flex justify-center mt-2">
      <v-btn small
        ><v-icon small class="mr-2">mdi-arrow-down</v-icon> Show all 11
        changes</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>