<template>
  <v-autocomplete
    v-model="selectedValue"
    :disabled="isUpdating"
    :items="users"
    chips
    color="blue-grey lighten-2"
    label="Member to invite"
    item-text="name"
    item-value="id"
    :rules="[rules.required]"
  >
    <template v-slot:selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selectedValue"
        close
        @click="data.select"
        @click:close="remove(data.username)"
      >
        <v-avatar
          color="accent"
          class="white--text text-caption"
          v-if="data.item.name"
          left
        >{{ getInitials(data.item.name, 2) }}</v-avatar
        >
        {{ data.item.name }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-avatar class="d-flex align-center justify-center">
          <v-avatar
            color="accent"
            class="white--text text-caption"
            v-if="data.item.name"
          >{{ getInitials(data.item.name, 3) }}</v-avatar
          >
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ data.item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{
              data.item.username
            }}</v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: "AutonProposalProposer"
}
</script>

<style scoped>

</style>
