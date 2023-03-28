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
    <v-textarea
      filled
      auto-grow
      label="Mission"
      rows="4"
      row-height="20"
      maxlength="1024"
      counter
      v-model="missionValue"
    ></v-textarea>

    <v-textarea
      filled
      auto-grow
      label="Vision"
      rows="4"
      row-height="20"
      maxlength="1024"
      counter
      v-model="visionValue"
    ></v-textarea>
  </div>
</template>
<script>
export default {
  props: ["mission", "vision", "disabledNext"],
  computed: {
    missionValue: {
      get: function () {
        return this.mission;
      },
      set: function (newValue) {
        this.$emit("update:mission", newValue);
      },
    },
    visionValue: {
      get: function () {
        return this.vision;
      },
      set: function (newValue) {
        this.$emit("update:vision", newValue);
      },
    },
  },
  data: () => ({}),
};
</script>