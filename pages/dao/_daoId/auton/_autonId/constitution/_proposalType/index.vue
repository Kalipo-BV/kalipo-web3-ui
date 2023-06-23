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
    <v-row class="mt-4 mb-2">
      <v-col cols="12" md="6">
        <v-card flat>
          <v-card-text>
            <div class="d-flex align-center">
              <v-btn fab x-small class="ml-xl-n16" absolute
                ><v-icon>mdi-arrow-left</v-icon></v-btn
              >
              <div class="text-h4 primary--text ml-12 ml-xl-0">
                Paramter settings
              </div>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text>
            <div class="text-body-1">Mandatory attendance of auton members</div>
            <div class="d-flex align-center">
              <v-slider v-model="slider" class="" hide-details></v-slider>
              <div>{{ slider }}%</div>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text>
            <div class="text-body-1">
              Percentage of votes for acceptance of proposal
            </div>
            <div class="d-flex align-center percentage-votes">
              <v-slider
                v-model="slider"
                class=""
                hide-details
                :thumb-size="24"
                thumb-label="always"
              >
                <template v-slot:thumb-label="{ value }">
                  <div class="d-flex align-center black--text mb-5">
                    Accepted
                  </div>
                </template>
              </v-slider>
              <div>{{ slider }}% accpeted</div>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text>
            <div class="text-body-1">(Maximum) Voting duration</div>
            <div class="d-flex align-center justify-space-between mt-2">
              <v-btn fab small><v-icon>mdi-minus</v-icon></v-btn>
              <div class="text-body-1">3 days</div>
              <v-btn fab small><v-icon>mdi-plus</v-icon></v-btn>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text>
            <div class="text-body-1">
              Starting moment when a proposal is submitted
            </div>
            <div class="d-flex align-center justify-space-between mt-2">
              <v-btn fab small><v-icon>mdi-minus</v-icon></v-btn>
              <div class="text-body-1">3 days</div>
              <v-btn fab small><v-icon>mdi-plus</v-icon></v-btn>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text>
            <div class="text-body-1">Moment of excecution</div>
            <v-item-group v-model="selected" mandatory>
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
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  layout: "auton",
  data: () => ({
    selected: 0,
    slider: 45,
  }),
  mounted() {
    this.$nuxt.$emit("Auton-setPage", "constitution");
  },
};
</script>
<style>
.percentage-votes .v-slider__thumb-label {
  height: 0px !important;
}
</style>