<template>
  <div>
    <v-form v-model="valid" @submit.prevent>
      <li v-for="(role, index) in executionRoles">
        <v-textarea
          filled
          auto-grow
          label="Description"
          rows="4"
          row-height="0"
          maxlength="32"
          counter
          v-model="executionRolesValue[index]"
        ></v-textarea>
      </li>
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
        this.$emit("update:executionRules", newValue);
      },
    }
  }
}
</script>

<style scoped>

</style>
