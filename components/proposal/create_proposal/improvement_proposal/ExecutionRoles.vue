<template>
  <div>
    <v-form v-model="valid" @submit.prevent>
      <v-textarea
        filled
        auto-grow
        label="Execution roles"
        rows="4"
        row-height="20"
        maxlength="512"
        counter
        v-model="executionRolesValue"
      ></v-textarea>
    </v-form>
  </div>
</template>

<script>
export default {
  props: ["executionRoles"],
  computed: {
    executionRolesValue: {
      get: function () {
        return this.executionRoles;
      },
      set: function (newValue) {
        this.$emit("update:executionRoles", newValue);
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
