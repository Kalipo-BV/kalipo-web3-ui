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
  <div class="text-center master">
    <div v-if="!error">
      <div class="d-flex justify-center align-center">
        <div class="fly-animation">
          <v-avatar color="accent"
            ><v-icon dark large>mdi-cube-outline</v-icon></v-avatar
          >
        </div>
      </div>

      <div class="text-h4 mt-4">{{ title }}</div>
      <div class="text-body-caption mt-1">
        {{ subtitle }}
      </div>

      <div class="d-flex align-center justify-center mt-4 px-6">
        <v-progress-linear
          color="accent"
          indeterminate
          rounded
          height="4"
        ></v-progress-linear>
      </div>
    </div>

    <div v-if="error">
      <div class="text-h4 error--text">{{ error }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["error", "title", "subtitle"],
};
</script>
<style lang="scss" scoped>
.rotate-animation {
  transform: rotate(360deg);
  transition-duration: 2s;
}
.fly-animation {
  animation: fly-animation ease-in-out 2s forwards;
  animation-iteration-count: infinite;
}
@keyframes fly-animation {
  0% {
    transform: translateX(-3vw);
    opacity: 0;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(3vw);
    opacity: 0;
  }
}
</style>