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
      <CountrySelect :country.sync="jurisdictionValue" label="Select your Jurisdiction" class="mt-4"
        :rules="[rules.required]" style=" max-width: 450px">
      </CountrySelect>

      <v-text-field solo label="Chamber of Commerce ID" class="mt-2" counter style="max-width: 450px" maxlength="128"
        :rules="[rules.required, rules.min, rules.maxcocId]" v-model="cocIdValue"></v-text-field>

      <v-text-field solo label="Business Address" class="mt-2" counter style="max-width: 450px" maxlength="256"
        :rules="[rules.required, rules.min, rules.maxBusinessAddress]" v-model="businessAddressValue"></v-text-field>
    </v-form>
  </div>
</template>
<script>
export default {
  props: ["jurisdiction", "cocId", "businessAddress", "disabledNext"],
  computed: {
    jurisdictionValue: {
      get: function () {
        return this.jurisdiction;
      },
      set: function (newValue) {
        this.$emit("update:jurisdiction", newValue);
      },
    },
    cocIdValue: {
      get: function () {
        return this.cocId;
      },
      set: function (newValue) {
        this.$emit("update:cocId", newValue);
      },
    },
    businessAddressValue: {
      get: function () {
        return this.businessAddress;
      },
      set: function (newValue) {
        this.$emit("update:businessAddress", newValue);
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
    autonErrorMessage: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v?.length >= 2 || "Min 2 characters",
      maxcocId: (v) => v?.length <= 128 || "Max 128 characters",
      maxBusinessAddress: (v) => v?.length <= 256 || "Max 256 characters",
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
