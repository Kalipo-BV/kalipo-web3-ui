<template>
  <div>
    <v-form v-model="valid" @submit.prevent>
      <v-textarea
        filled
        auto-grow
        label="References"
        rows="4"
        row-height="20"
        maxlength="1024"
        counter
        v-model="referencesValue"
      ></v-textarea>
    </v-form>
  </div>
</template>

<script>
export default {
  props: ["references"],
  computed: {
    referencesValue: {
      get: function () {
        return this.references;
      },
      set: function (newValue) {
        this.$emit("update:references", newValue);
      },
    }
  }
}
</script>

<style scoped>

</style>
