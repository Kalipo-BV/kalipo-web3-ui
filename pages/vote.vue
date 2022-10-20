<template>
  <div class="d-flex align-center justify-center">
    <v-card class="ma-auto" color="grey lighten-5" width="500" height="350">
      <v-card-title class="primary--text">
        Submitting a new proposal
      </v-card-title>
      <v-card-text>
        <div class="text-h8 primary--text">
          Describe your statement by providing a title and description
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn elevation="1" x-large text color="indigo darken-4" @click="reveal_membership_invitation = true">
          Membership
          invitation</v-btn>
        <v-btn elevation="1" x-large text color="indigo darken-4" @click="reveal = true">Poll</v-btn>
        <Dialogue v-if="reveal"></Dialogue>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Dialogue from "../components/Dialogue";
export default {
  components: { Dialogue },
  data: () => ({
    reveal: false,
  }),
}
</script>
