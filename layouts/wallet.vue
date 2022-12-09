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
  <v-app id="wallet-layout">

    <v-main class="primary">
      <v-toolbar v-if="xs||sm" elevation="0">
        <v-spacer></v-spacer>
        <v-btn class="white" elevation="0" v-if="xs||sm" @click="open=!open">
          <v-icon>
            mdi-menu
          </v-icon>
        </v-btn>
      </v-toolbar>
      <div style="height: 100%; background: #eef1f6">
        <Nuxt class="px-2 px-md-8 px-lg-3" />
      </div>
    </v-main>
    <MainMenu
      :open.sync="open"
    ></MainMenu>
  </v-app>
</template>

<script>
export default {
  computed: {
      xs() {
        return this.$vuetify.breakpoint.xs;
      },
      sm() {
        return this.$vuetify.breakpoint.sm;
      },
      md() {
        return this.$vuetify.breakpoint.md;
      },
  },

  data() {
    return {
      open: false
    };
  },
  methods: {},
  mounted() {
    if(this.xs || this.sm){
      this.open = false;
    }
  },
};
</script>
<style>
</style>
