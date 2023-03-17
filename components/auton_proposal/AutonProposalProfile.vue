<!-- Kalipo B.V. - the DAO platform for business & societal impact
 * Copyright (C) 2022 Peter Nobels and Matthias van Dijk
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

<template>
  <div>
    <v-form v-model="valid" @submit.prevent>
      <v-text-field
        solo
        label="Title"
        append-icon="mdi-pencil"
        class="mt-4"
        counter
        maxlength="32"
        :rules="[rules.required, rules.min, rules.max]"
        v-model="titleValue"
      ></v-text-field>

      <v-textarea
        filled
        auto-grow
        label="Description"
        rows="4"
        row-height="20"
        maxlength="1024"
        counter
        v-model="descriptionValue"
      ></v-textarea>
    
    </v-form>




  </div>
</template>

<script>
export default {
  props: ["title", "description", "disabledNext"],
  computed: {
    titleValue: {
      get: function () {
        return this.title;
      },
      set: function (newValue) {
        this.$emit("update:title", newValue);
      },
    },
    descriptionValue: {
      get: function () {
        return this.description;
      },
      set: function (newValue) {
        this.$emit("update:description", newValue);
      },
    },
  },
  watch: {
    valid: {
      handler: function (newValid) {
        // this.iconValue = this.generatedIcons[newIndex];
        this.$emit("update:disabledNext", !newValid);
      },
      deep: true,
    },
  },
  data: () => ({
    valid: false,
    autonName: "",
    autonErrorMessage: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v?.length >= 2 || "Min 2 characters",
      max: (v) => v?.length <= 32 || "Max 32 characters",
    },
  }),
  mounted() {
    this.$emit("update:disabledNext", true);
  },
  destroyed() {
    this.$emit("update:disabledNext", false);
  },
};
</script>

<style>
</style>
