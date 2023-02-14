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
  <v-card>
    <v-img
      class="white--text align-end"
      height="200px"
      :src="getImage(poa.staticImageId)"
    >
    </v-img>
    <v-card-text>
      <div class="d-flex">
        <v-card-title>{{ poa.name }}</v-card-title>
        <v-spacer></v-spacer>
        <v-icon small class="mr-2">{{ "mdi-trophy" }}</v-icon>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    poa: Object,
  },
  data() {
    return {};
  },
  methods: {
    getImage(id) {
      return `/poa_images/${id}.png`;
    },
  },
};
</script>
