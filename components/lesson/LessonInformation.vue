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
      <v-text-field
        type="date"
        style="max-width: 500px"
        v-model="dateValue"
        label="Date"
        :min="new Date().toISOString().substr(0, 10)"
        :rules="[rules.required]"
      ></v-text-field>
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
    "disabledNext"
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
  },
};
</script>
