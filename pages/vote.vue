<template>
  <div class="text-center">
    <v-row justify="center">
      <v-col cols="1">
        <v-btn elevation="1" x-large text color="indigo darken-4" @click="reveal = true">Vote</v-btn>
        <Dialogue v-if="reveal"></Dialogue>
      </v-col>
    </v-row>
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
