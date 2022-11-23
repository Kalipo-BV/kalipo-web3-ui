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
    <v-card flat link>
      <div class="d-flex justify-end">
        <v-chip
          color="error"
          style="position: absolute"
          class="mt-n2 mr-n2"
          v-if="auton.votable && auton.votable != 0"
          >{{ auton.votable }}</v-chip
        >
      </div>
      <v-card-text>
        <div class="d-flex justify-center">
          <v-avatar size="90" color="accent" class="white--text">
            <v-icon dark x-large>{{ auton.autonProfile.icon }}</v-icon>
          </v-avatar>
        </div>
        <div class="d-flex justify-center text-h4 text--primary mt-2">
          {{ auton.autonProfile.name }}
        </div>

        <div class="d-flex justify-center text-caption text--primary mt-2">
          {{
            auton.autonProfile.subtitle != ""
              ? auton.autonProfile.subtitle
              : "This is an event"
          }}
        </div>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-text>
        <v-row>
          <v-col cols="6">
            <div
              class="d-flex justify-center text-caption text--primary"
              v-if="auton.activeMembershipsCount != undefined"
            >
              {{ auton.activeMembershipsCount }} member{{
                auton.activeMembershipsCount == 1 ? "" : "s"
              }}
            </div>
          </v-col>
          <v-col cols="6">
            <div class="d-flex justify-center text-caption text--primary">
              0 kalipo
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  props: ["auton"],
  data: () => ({}),
  methods: {},
};
</script>
