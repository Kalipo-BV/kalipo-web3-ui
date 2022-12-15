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
        new Date(v).getTime() > Date.now() ||
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
