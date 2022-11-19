<template lang="">
  <div>
    <v-form v-model="valid">
      <v-text-field
        class="mt-4"
        type="date"
        style="max-width: 500px"
        v-model="startDateValue"
        :min="new Date().toISOString().substr(0, 10)"
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
  props: ["startDate", "startTime", "endDate", "endTime"],
  computed: {
    // TODO:
    // 1. validate start < end
    // 2. can't press next when not filled in
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
  data: () => ({
    valid: false,
    rules: {},
  }),
  mounted() {
    this.$emit("update:disabledNext", true);
  },
  destroyed() {
    this.$emit("update:disabledNext", false);
  },
  methods: {},
};
</script>
