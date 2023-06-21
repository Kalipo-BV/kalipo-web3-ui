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
        label="Name of the DAO"
        class="mt-4"
        counter
        style="max-width: 450px"
        :error-messages="autonErrorMessage"
        maxlength="16"
        :rules="[rules.required, rules.min, rules.maxName]"
        v-model="nameValue"
        @keyup="nameAvailable"
      ></v-text-field>

      <v-text-field
        solo
        label="Name of the Governing Auton"
        class="mt-2"
        counter
        style="max-width: 450px"
        maxlength="20"
        :rules="[rules.required, rules.min, rules.maxgoverningName]"
        v-model="governingNameValue"
      ></v-text-field>
    </v-form>
  </div>
</template>
<script>
export default {
  props: ["name", "governingName", "disabledNext"],
  computed: {
    nameValue: {
      get: function () {
        return this.name;
      },
      set: function (newValue) {
        this.$emit("update:name", newValue);
      },
    },
    governingNameValue: {
      get: function () {
        return this.governingName;
      },
      set: function (newValue) {
        this.$emit("update:governingName", newValue);
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
      maxgoverningName: (v) => v?.length <= 20 || "Max 20 characters",
      maxName: (v) => v?.length <= 16 || "Max 16 characters",
    },
  }),
  mounted() {
    this.$emit("update:disabledNext", true);
  },
  destroyed() {
    this.$emit("update:disabledNext", false);
  },
  methods: {
    async nameAvailable() {
      const existingAutonIdWrapper = await this.$invoke(
        "auton:getAutonIdByName",
        {
          name: this.nameValue,
        }
      );
      if (existingAutonIdWrapper.result !== null) {
        this.autonErrorMessage = "Auton name is already taken";
        setTimeout(() => {
          this.autonErrorMessage = "";
        }, 3000);
      } else {
        $nuxt.$emit("IAH-showEncryptionPin");
      }
    },
  },
};
</script>
