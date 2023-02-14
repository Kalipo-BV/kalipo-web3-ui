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
        label="Subject"
        class="mt-4"
        counter
        style="max-width: 500px"
        maxlength="30"
        v-model="subjectValue"
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        solo
        label="Lesson name"
        counter
        style="max-width: 500px"
        maxlength="20"
        v-model="lessonNameValue"
        :rules="[rules.required]"
      ></v-text-field>
      <v-textarea
        filled
        auto-grow
        label="Description"
        style="max-width: 500px"
        rows="4"
        row-height="20"
        maxlength="1024"
        counter
        v-model="descriptionValue"
        :rules="[rules.required]"
      ></v-textarea>
      <v-text-field
        solo
        label="Location"
        counter
        style="max-width: 500px"
        maxlength="50"
        v-model="locationValue"
        :rules="[rules.required]"
      ></v-text-field>
      <v-row>
        <v-col cols="12">
          <v-text-field
            type="date"
            style="max-width: 500px"
            v-model="dateValue"
            label="Date"
            :min="new Date().toISOString().substr(0, 10)"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6"
          ><v-text-field
            type="time"
            label="Start time"
            :rules="[rules.required]"
          ></v-text-field
        ></v-col>
        <v-col cols="6"
          ><v-text-field
            type="time"
            label="End time"
            :rules="[rules.required]"
          ></v-text-field
        ></v-col>
      </v-row>
      <v-checkbox
        v-model="checkoutRequiredValue"
        label="Checkout required"
        ripple
      >
      </v-checkbox>
    </v-form>
  </div>
</template>
<script>
export default {
  data: () => ({
    valid: false,
    rules: {
      required: (value) => !!value || "Required.",
    },
  }),
  mounted() {
    this.$emit("update:disabledNext", true);
  },
  destroyed() {
    this.$emit("update:disabledNext", false);
  },
  props: [
    "subject",
    "lessonName",
    "description",
    "location",
    "date",
    "startTime",
    "endTime",
    "disabledNext",
    "checkoutRequired",
  ],
  watch: {
    valid: {
      handler: function (newValid) {
        this.$emit("update:disabledNext", !newValid);
      },
      deep: true,
    },
  },
  computed: {
    subjectValue: {
      get: function () {
        return this.subject;
      },
      set: function (newValue) {
        this.$emit("update:subject", newValue);
      },
    },
    lessonNameValue: {
      get: function () {
        return this.lessonName;
      },
      set: function (newValue) {
        this.$emit("update:lessonName", newValue);
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
    locationValue: {
      get: function () {
        return this.location;
      },
      set: function (newValue) {
        this.$emit("update:location", newValue);
      },
    },
    dateValue: {
      get: function () {
        return this.date;
      },
      set: function (newValue) {
        this.$emit("update:date", newValue);
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
    endTimeValue: {
      get: function () {
        return this.endTime;
      },
      set: function (newValue) {
        this.$emit("update:endTime", newValue);
      },
    },
    checkoutRequiredValue: {
      get: function () {
        return this.checkoutRequired;
      },
      set: function (newValue) {
        this.$emit("update:checkoutRequired", newValue);
      },
    },
  },
};
</script>
