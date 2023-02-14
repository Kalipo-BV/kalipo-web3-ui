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
  <v-card min-width="300" class="pa-4" v-if="!validAuton">
    <v-card-title class="text-h5">Lesson is not found</v-card-title>
  </v-card>

  <v-card min-width="300" class="pa-4" v-else>
    <v-row dense>
      <v-col cols="4">
        <v-icon class="pa-4 pl-2 mt-n8" color="primary" size="40">
          mdi-book-open-page-variant
        </v-icon>
        <v-divider vertical></v-divider>
      </v-col>

      <v-col cols="8">
        <v-row dense>
          <v-col cols="12">
            <a
              class="float-left text-h6 ml-n4 mt-n2"
              style="text-decoration: underline"
              @click="
                $router.push(
                  `/auton/${auton.autonProfile.name.replaceAll(' ', '_')}`
                )
              "
            >
              {{
                auton.autonProfile.name.length > 24
                  ? auton.autonProfile.name.slice(0, 25) + "..."
                  : auton.autonProfile.name
              }}
            </a>
          </v-col>
          <v-col class="mt-n2">
            <p class="mb-n1 ml-n4">
              {{
                auton.lesson.description.length > 50
                  ? auton.lesson.description.slice(0, 50) + "..."
                  : auton.lesson.description
              }}
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "LessonCard",
  props: {
    auton: Object,
    validAuton: Boolean,
  },
};
</script>

<style scoped>
</style>
