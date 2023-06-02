<template>
  <div>
    <v-form v-model="valid" @submit.prevent>
      <v-textarea
        filled
        auto-grow
        label="Motivation"
        rows="4"
        row-height="20"
        maxlength="2048"
        counter
        v-model="motivationValue"
      ></v-textarea>
    </v-form>
  </div>
</template>

<script>
export default {
  props: ["motivation"],
  computed: {
    motivationValue: {
      get: function () {
        return this.motivation;
      },
      set: function (newValue) {
        this.$emit("update:motivation", newValue);
      },
    }
  },
  data: () => ({
    valid: false,
    autonName: "",
    autonErrorMessage: "",
    rules: {
      required: (value) => !!value || "Required."
    },
  }),
}
</script>

<style scoped>

</style>
