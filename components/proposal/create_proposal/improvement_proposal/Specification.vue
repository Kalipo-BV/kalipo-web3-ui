<template>
  <div>
    <v-form v-model="valid" @submit.prevent>
      <v-textarea
        filled
        auto-grow
        label="Specification"
        rows="4"
        row-height="20"
        maxlength="1024"
        counter
        v-model="specificationValue"
      ></v-textarea>
    </v-form>
  </div>
</template>

<script>
export default {
  props: ["specification"],
  computed: {
    specificationValue: {
      get: function () {
        return this.specification;
      },
      set: function (newValue) {
        this.$emit("update:specification", newValue);
      },
    }
  },
  data: () => ({
    valid: false,
    autonName: "",
    autonErrorMessage: "",
    rules: {
      required: (value) => !!value || "Required.",
    },
  }),
}
</script>

<style scoped>

</style>
