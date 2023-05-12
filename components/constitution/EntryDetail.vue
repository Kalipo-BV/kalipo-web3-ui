<template>
  <div>
    <v-text-field
      solo
      v-model="titleValue"
      :disabled="isMarkedForDelete"
    ></v-text-field>
    <v-textarea
      solo
      v-model="contentValue"
      :disabled="isMarkedForDelete"
    ></v-textarea>
    <div class="d-flex align-center justify-space-between">
      <v-btn @click="$emit('cancel')">Cancel</v-btn>
      <div class="d-flex align-center">
        <v-btn
          v-if="!isMarkedForDelete"
          color="error"
          class="mr-2"
          @click="$emit('delete', id)"
          >Delete</v-btn
        >
        <v-btn
          v-if="isMarkedForDelete"
          color="error"
          @click="$emit('unDelete', id)"
          outlined
          >Cancel deletion</v-btn
        >
        <v-btn
          v-if="!isMarkedForDelete && id != 'new'"
          color="accent"
          @click="$emit('update', id, titleValue, contentValue)"
          >Update</v-btn
        >
        <v-btn
          v-if="!isMarkedForDelete && id == 'new'"
          color="accent"
          @click="$emit('create')"
          >Create</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    isMarkedForDelete: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({}),
  computed: {
    titleValue: {
      get: function () {
        return this.title;
      },
      set: function (newValue) {
        this.$emit("update:title", newValue);
      },
    },
    contentValue: {
      get: function () {
        return this.content;
      },
      set: function (newValue) {
        this.$emit("update:content", newValue);
      },
    },
  },
};
</script>