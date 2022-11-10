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
    <div class="text-subtitle-2">{{ title }}</div>
    <div>
      <span class="pr-1">{{ statistic }}</span>
      <v-chip :color="chipColor" small>{{ percentage }}</v-chip>
    </div>
  </div>
</template>

<style>
</style>

<script>
export default {
  props: {
    title: String,
    statistic: String,
    percentage: String,
    chipColor: String,
  },
};
</script>
