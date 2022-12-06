<template >
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
          this.$emit("update:disabledNext", true);
          this.disabledNext = true;
          this.$emit("update:location", "");
          return
        }

        this.$emit("update:disabledNext", false);
        this.disabledNext = false;
        this.$emit("update:location", newValue);

      },
    },
    capacityValue: {
      get: function () {
        return this.capacity;
      },
      set: function (newValue) {
        if (!newValue) { // if the value is empty
          this.$emit("update:capacity", 0);
          return
        }


        this.$emit("update:capacity", newValue);
      },
    },
    priceValue: {
      get: function () {
        return this.price;
      },
      set: function (newValue) {
        if (!newValue) { // if the value is empty
          this.$emit("update:price", 0)
          return
        }

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
    disabledNext: true,
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
