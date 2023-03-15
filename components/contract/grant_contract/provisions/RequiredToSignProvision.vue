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
  <v-checkbox
    v-model="checkbox"
    :rules="[v => !!v || 'You must agree with the terms and conditions & Privacy Policy to continue!']"
    required
  >
    <template v-slot:label>
      I agree to the&nbsp;
      <v-tooltip location="bottom">
        <template v-slot:activator="{ props }">
          <a
            target="_blank"
            href=""
            v-bind="props"
            @click.stop
          >
            Terms and Conditions
          </a>
        </template>
      </v-tooltip>

      &nbsp;&&nbsp;

      <v-tooltip location="bottom">
        <template v-slot:activator="{ props }">
          <a
            target="_blank"
            href=""
            v-bind="props"
            @click.stop
          >
            Privacy Policy
          </a>
        </template>
      </v-tooltip> 
      .
    </template> 
  </v-checkbox>
</template> 
<script>
  export default {
    data: () => ({
        checkbox: false,
    }),
  }
</script> 