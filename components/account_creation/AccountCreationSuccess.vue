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
  <v-container>
    <div class="text-center">
      <div class="text-h1 fade-animation-1">Welcome to Kalipo</div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  async mounted() {
    setTimeout(() => {
      this.$router.push("/dashboard");
    }, 6000);
  },
};
</script>

<style lang="scss" scoped>
.fade-animation-1 {
  animation: fade-animation ease-in-out 6s forwards;
}
@keyframes fade-animation {
  0% {
    display: none !important;
    opacity: 0;
  }
  50% {
    display: block !important;
    opacity: 1;
  }
  100% {
    opacity: 0;
    display: none !important;
  }
}
</style>
