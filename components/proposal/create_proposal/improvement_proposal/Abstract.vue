<template>
  <div>
    <v-form v-model="valid" @submit.prevent>
      <v-textarea
        filled
        auto-grow
        label="Abstract"
        rows="4"
        row-height="20"
        maxlength="1024"
        counter
        v-model="abstractValue"
      ></v-textarea>
    </v-form>
  </div>
</template>

<script>
export default {
  props: ["abstract"],
  computed: {
    abstractValue: {
      get: function () {
        return this.abstract;
      },
      set: function (newValue) {
        this.$emit("update:abstract", newValue);
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
