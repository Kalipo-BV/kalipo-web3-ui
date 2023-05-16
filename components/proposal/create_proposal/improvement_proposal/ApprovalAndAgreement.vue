<template>
  <div>
    <v-form v-model="valid" @submit.prevent>
      <v-checkbox
      label="Expert advice"
      v-model="approvalAndAgreementValue"
      ></v-checkbox>
    </v-form>
  </div>
</template>

<script>
export default {
  props: ["approvalAndAgreement"],
  computed: {
  },
  data: () => ({
    valid: false,
    autonName: "",
    autonErrorMessage: "",
  }),
}
</script>

<style scoped>

</style>
