<template lang="">
  <div>
    <v-form v-model="valid">
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
        :rules="[rules.required]"
        v-model="capacityValue"
      ></v-text-field>

      <v-text-field
        solo
        label="Price"
        type="number"
        class="mt-4"
        counter
        style="max-width: 500px"
        :rules="[rules.required]"
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
        this.$emit("update:location", newValue);
      },
    },
    capacityValue: {
      get: function () {
        return this.capacity;
      },
      set: function (newValue) {
        this.$emit("update:capacity", newValue);
      },
    },
    priceValue: {
      get: function () {
        return this.price;
      },
      set: function (newValue) {
        this.$emit("update:price", newValue);
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
  methods: {},
};
</script>
