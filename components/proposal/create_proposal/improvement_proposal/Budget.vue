<template>
  <div>
    <v-form v-model="valid" @submit.prevent>
      <v-textarea
        filled
        auto-grow
        label="Budget"
        rows="4"
        row-height="20"
        maxlength="1024"
        counter
        v-model="budgetValue"
      ></v-textarea>
    </v-form>
  </div>
</template>

<script>
export default {
  props: ["budget"],
  computed: {
    budgetValue: {
      get: function () {
        return this.budget;
      },
      set: function (newValue) {
        this.$emit("update:budget", newValue);
      },
    }
  }
}
</script>

<style scoped>

</style>
