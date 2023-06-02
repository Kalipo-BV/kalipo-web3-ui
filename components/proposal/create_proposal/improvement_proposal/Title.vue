<template>
  <div>
    <v-form v-model="valid" @submit.prevent>
      <v-textarea
        filled
        auto-grow
        label="Title"
        rows="4"
        row-height="20"
        maxlength="32"
        counter
        v-model="titleValue"
      ></v-textarea>
    </v-form>
  </div>
</template>

<script>
export default {
  props: ["title"],
  computed: {
    titleValue: {
      get: function () {
        return this.title;
      },
      set: function (newValue) {
        this.$emit("update:title", newValue);
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
