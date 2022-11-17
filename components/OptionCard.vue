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
  <!-- 
 Example implementation of parent component:

<item-group v-model="selected" mandatory>
  <v-row>
    <v-col cols="6">
      <v-item v-slot="{ active, toggle }">
        <OptionCard
          :active="active"
          :toggle="toggle"
          icon="mdi-timer"
          title="When MMA & RAP is reached the vote ends"
          subTitle="Faster but less safe"
        ></OptionCard>
      </v-item>
    </v-col>
    <v-col cols="6">
      <v-item v-slot="{ active, toggle }">
        <OptionCard
          :active="active"
          :toggle="toggle"
          icon="mdi-security"
          title="When full voting daration has been passed the vote
              ends"
          subTitle="Slower but more secure"
        ></OptionCard>
      </v-item>
    </v-col>
  </v-row>
</v-item-group> 

-->
  <v-card
    flat
    link
    :elevation="active ? '5' : '0'"
    @click="cardClicked"
    :width="width"
  >
    <v-card-text>
      <div class="d-flex align-center justify-center">
        <v-avatar :color="active ? 'accent' : 'primary'">
          <v-icon dark>{{ icon }}</v-icon>
        </v-avatar>
      </div>
      <div
        class="d-flex align-center justify-center text-body-1 mt-2"
        style="text-align: center"
      >
        {{ title }}
      </div>
      <div
        class="d-flex align-center justify-center text-caption mt-2"
        style="text-align: center"
      >
        {{ subTitle }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["active", "toggle", "title", "subTitle", "icon", "width"],
  methods: {
    cardClicked: function () {
      if (this.toggle !== undefined) {
        toggle();
      }
    },
  },
};
</script>