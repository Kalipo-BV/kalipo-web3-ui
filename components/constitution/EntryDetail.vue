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
    <v-text-field
      solo
      v-model="titleValue"
      :disabled="isMarkedForDelete"
      placeholder="Title"
    ></v-text-field>
    <v-textarea
      solo
      v-model="contentValue"
      :disabled="isMarkedForDelete"
      placeholder="Content"
    ></v-textarea>
    <div class="d-flex align-center justify-space-between">
      <v-btn @click="$emit('cancel')">Cancel</v-btn>
      <div class="d-flex align-center">
        <v-btn
          v-if="!isMarkedForDelete && id != 'new'"
          color="error"
          class="mr-2"
          @click="$emit('delete', id)"
          >Delete</v-btn
        >
        <v-btn
          v-if="isMarkedForDelete"
          :disabled="disableUndelete"
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
    disableUndelete: {
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