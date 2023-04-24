<template>
  <div>
    <v-form v-model="valid" @submit.prevent>
      <v-textarea
        filled
        auto-grow
        label="Time constraints"
        rows="4"
        row-height="20"
        maxlength="1024"
        counter
        v-model="timeConstraintsValue"
      ></v-textarea>
    </v-form>
  </div>
</template>

<script>
export default {
  props: ["timeConstraints"],
  computed: {
    timeConstraintsValue: {
      get: function () {
        return this.timeConstraints;
      },
      set: function (newValue) {
        this.$emit("update:timeConstraints", newValue);
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
