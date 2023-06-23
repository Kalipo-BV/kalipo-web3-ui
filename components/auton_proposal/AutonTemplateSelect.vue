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
  <v-item-group v-model="selected" mandatory class="mt-4">
    <v-row>
      <v-col cols="6">
          <v-item v-slot="{ active, toggle }">
            <OptionCard :active="active" :toggle="toggle" title="Starter template" subTitle="Kalipo's default"
              icon="mdi-shield-check" template="default"></OptionCard>
          </v-item>
        </v-col>
        <!-- <v-col cols="6">
            <v-item v-slot="{ active, toggle }">
              <OptionCard :active="active" :toggle="toggle" title="Event template" subTitle="Create an event"
                icon="mdi-calendar" template="event"></OptionCard>
            </v-item>
          </v-col>
          <v-col cols="6">
            <v-item v-slot="{ active, toggle }">
              <OptionCard :active="active" :toggle="toggle" title="Lesson template" subTitle="Create a lesson"
                icon="mdi-account-school" template="lesson"></OptionCard>
            </v-item>
          </v-col> -->
      </v-row>
    </v-item-group>
  </div>
</template>
<script>
export default {
  data: () => ({
    selected: 0,
  }),
  methods: {
    nextStep() {
      this.$nuxt.emit("CreateAuton-NextStep");
    },
  },
};
</script>
