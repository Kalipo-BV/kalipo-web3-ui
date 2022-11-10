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
    <v-card>
      <div v-if="step !== 1">
        <v-card-text>
          <div class="text-h4 text--primary">{{ title }}</div>
          <div class="text-body-1 text--primary">{{ subtitle }}</div>

          <v-divider class="mt-4"></v-divider>

          <div class="text-h6 text--primary mt-4">{{ actionText }}</div>
          <div>
            <v-chip>{{ chipText }}</v-chip>
          </div>
        </v-card-text>

        <v-divider class="mt-2"></v-divider>

        <v-card-text>
          <div class="d-flex align-center justify-space-between">
            <v-btn :disabled="step == 0" @click="step--">
              <v-icon class="mr-2" small>mdi-arrow-left</v-icon> previous
            </v-btn>
            <v-btn color="accent" @click="step++">
              next <v-icon class="ml-2" small>mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </v-card-text>
      </div>

      <AccountSign
        :transaction="transaction"
        :uri="uri"
        v-if="step == 1"
        callback="AutonProposalTransaction-PrevStep"
        :callbackFinish="callbackFinish"
        :title="title"
      ></AccountSign>
    </v-card>
  </div>
</template>
    
<script>
export default {
  props: [
    "title",
    "subtitle",
    "transaction",
    "uri",
    "actionText",
    "chipText",
    "callbackFinish",
  ],
  data: () => ({
    step: 0,
  }),
  watch: {
    chipText(newChipText, oldChipText) {
      this.step = 0;
    },
  },
  created() {
    this.$nuxt.$on(
      "AutonProposalTransaction-PrevStep",
      ($event) => this.step--
    );
  },
  methods: {},
};
</script>

<style>
</style>