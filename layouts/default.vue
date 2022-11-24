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
  <v-app id="default-layout">
    <v-main class="primary">
      <v-btn fab class="float-end ma-3" @click="open=!open">
        <v-icon>
          mdi-menu
        </v-icon>
      </v-btn>
      <div style="height: 100%; background: #eef1f6">
        <Nuxt class="px-8 px-lg-3" />
      </div>
    </v-main>
    <MainMenu
      :open.sync="open"
    ></MainMenu>
  </v-app>
</template>

<script>
export default {

  data() {
    return {
      open: false
    };
  },
  methods: {},
};
</script>
