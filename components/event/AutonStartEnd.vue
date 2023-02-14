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
        class="mt-4"
        type="date"
        style="max-width: 500px"
        v-model="startDateValue"
        :min="new Date().toISOString().substr(0, 10)"
        :rules="[rules.required, rules.startDateNotBefore]"
        label="Start date"
      ></v-text-field>

      <v-text-field
        type="time"
        v-model="startTimeValue"
        label="Start time"
      ></v-text-field>

      <v-text-field
        class="mt-4"
        type="date"
        style="max-width: 500px"
        v-model="endDateValue"
        :min="new Date().toISOString().substr(0, 10)"
        :rules="[beforeValidation]"
        label="End date"
      ></v-text-field>

      <v-text-field
        type="time"
        v-model="endTimeValue"
        label="End time"
      ></v-text-field>
    </v-form>
  </div>
</template>
<script>
export default {
  name: "AutonStartEnd",
  props: ["startDate", "startTime", "endDate", "endTime", "disabledNext"],
  data: () => ({
    valid: false,
    rules: {
      required: (v) => !!v || "Required.",
      startDateNotBefore: (v) =>
        new Date(v).getDate() >= new Date().getDate() ||
        "Start date must be in the future",
    },
  }),
  mounted() {
    this.$emit("update:disabledNext", true);
  },
  destroyed() {
    this.$emit("update:disabledNext", false);
  },
  methods: {
    beforeValidation() {
      if (this.startDate && this.endDate) {
        if (
          new Date(this.startDate + ":" + this.startTime).getTime() >
          new Date(this.endDate + ":" + this.endTime).getTime()
        ) {
          return "Start date must be before end date";
        }
      }
      return true;
    },
  },
  computed: {
    startDateValue: {
      get: function () {
        return this.startDate;
      },
      set: function (newValue) {
        this.$emit("update:startDate", newValue);
      },
    },
    startTimeValue: {
      get: function () {
        return this.startTime;
      },
      set: function (newValue) {
        this.$emit("update:startTime", newValue);
      },
    },
    endDateValue: {
      get: function () {
        return this.endDate;
      },
      set: function (newValue) {
        this.$emit("update:endDate", newValue);
      },
    },
    endTimeValue: {
      get: function () {
        return this.endTime;
      },
      set: function (newValue) {
        this.$emit("update:endTime", newValue);
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
};
</script>
