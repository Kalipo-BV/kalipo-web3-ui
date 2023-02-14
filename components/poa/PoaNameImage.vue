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
    <v-form @submit.prevent>
      <v-text-field
        solo
        label="Name"
        class="mt-4"
        style="max-width: 500px"
        v-model="nameValue"
        counter
        maxlength="30"
      ></v-text-field>

      <!-- <v-text-field
        solo
        label="Static image id"
        class="mt-4"
        style="max-width: 500px"
        v-model="imageValue"
      ></v-text-field> -->
      <v-select
        :items="items"
        v-model="imageValue"
        solo
        label="Static image id"
      >
      </v-select>
    </v-form>
  </div>
</template>
<script>
export default {
  props: ["name", "image"],
  data() {
    return {
      items: ["1", "2"],
    };
  },
  computed: {
    nameValue: {
      get: function () {
        return this.name;
      },
      set: function (newValue) {
        this.$emit("update:name", newValue);
      },
    },
    imageValue: {
      get: function () {
        return this.image;
      },
      set: function (newValue) {
        this.$emit("update:image", newValue);
      },
    },
  },
};
</script>
