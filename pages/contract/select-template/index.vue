<template>
  <v-container>
    <v-dialog scrollable v-model="dialog" max-width="500">
      <SelectAgreementTemplate />
    </v-dialog>
    <v-btn @click="dialog = !dialog">Open template popup</v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
      dialog: false
  })
}
</script>