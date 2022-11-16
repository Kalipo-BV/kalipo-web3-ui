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
    <v-card class="rounded-lg" link :color="active ? 'accent' : ''">
      <v-card-text>
        <div class="d-flex justify-center">
          <v-avatar :color="active ? 'white' : 'primary'" size="35px">
            <v-icon :color="active ? 'accent' : 'white'" small>{{
              icon
            }}</v-icon>
          </v-avatar>
        </div>

        <div class="text-h5 mt-2 d-flex justify-center">
          <span :class="active ? 'white--text' : 'primary--text'">{{
            title
          }}</span>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  props: ["icon", "title", "active"],
};
</script>