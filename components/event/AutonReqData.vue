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
        label="Location"
        class="mt-4"
        counter
        style="max-width: 500px"
        maxlength="40"
        :rules="[rules.required]"
        v-model="locationValue"
      ></v-text-field>

      <v-text-field
        solo
        label="Capacity"
        type="number"
        class="mt-4"
        counter
        style="max-width: 500px"
        persistent-hint
        hint="Leave the capacity empty if you don't want to limit the number of members"
        v-model="capacityValue"
      ></v-text-field>

      <v-text-field
        solo
        label="Price"
        type="number"
        class="mt-4"
        counter
        persistent-hint
        hint="Leave the price empty if you don't want to charge for the event"
        style="max-width: 500px"
        v-model="priceValue"
      ></v-text-field>
    </v-form>
  </div>
</template>
<script>
export default {
  name: "AutonReqData",
  props: ["location", "capacity", "price"],
  computed: {
    locationValue: {
      get: function () {
        return this.location;
      },
      set: function (newValue) {
        if (!newValue) {
          this.$emit("update:location", "");
          return;
        }

        this.$emit("update:location", newValue);
      },
    },
    capacityValue: {
      get: function () {
        return this.capacity;
      },
      set: function (newValue) {
        if (!newValue) {
          // if the value is empty
          this.$emit("update:capacity", 0);
          return;
        }

        this.$emit("update:capacity", newValue);
      },
    },
    priceValue: {
      get: function () {
        return this.price;
      },
      set: function (newValue) {
        if (!newValue) {
          // if the value is empty
          this.$emit("update:price", 0);
          return;
        }

        this.$emit("update:price", newValue);
      },
    },
  },
  mounted() {
    this.$emit("update:disabledNext", true);
  },
  destroyed() {
    this.$emit("update:disabledNext", false);
  },
  data: () => ({
    valid: false,
    disabledNext: true,
    rules: {
      required: (value) => !!value || "Required.",
    },
  }),
  watch: {
    valid: {
      handler: function (newValid) {
        // this.iconValue = this.generatedIcons[newIndex];
        this.$emit("update:disabledNext", !newValid);
      },
      deep: true,
    },
  },
};
</script>
