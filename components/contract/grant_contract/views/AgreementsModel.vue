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
    <div class="model fixed-center" @click="close"></div>
    <div class="box fixed-center">

    </div>
  </div>
</template>
<script>
export default {
  props: {
    dropdownData: { type: String, default: "" },
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
}


</script>

<style scoped>
  .model {
    background-color: rgba(10, 10, 40, 0.7);
    z-index: 5;
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
  }

  .box {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    background-color: white;
    width: 1000px;
    height: 600px;

    border-radius: 5px;
    border: 1px #33333344 solid;
    z-index: 5;
  }
</style>
