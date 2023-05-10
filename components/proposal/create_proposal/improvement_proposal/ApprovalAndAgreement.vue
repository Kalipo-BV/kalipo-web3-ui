<template>
  <div>
    <v-form v-model="valid" @submit.prevent>
      <v-checkbox
        label="Agreement"
        :value="false"
        v-model="approvalAndAgreementValue">
      </v-checkbox>
      <v-checkbox
      label="Expert advice"
      :value="false"
      v-model="approvalAndAgreementValue"
      ></v-checkbox>
    </v-form>
  </div>
</template>

<script>
export default {
  props: ["approvalAndAgreement"],
  computed: {
    approvalAndAgreementValue: {
      get: function () {
        return this.approvalAndAgreement;
      },
      set: function (newValue) {
        this.$emit("update:approvalAndAgreement", newValue);
      },
    }
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
