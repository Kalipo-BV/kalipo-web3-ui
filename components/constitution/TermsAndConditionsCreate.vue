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
  <div class="">
    <div v-if="step == 0">
      <v-card-text>
        <AutonStepperHeader
          title="Proposing new Terms & Conditions"
          subtitle=""
        >
        </AutonStepperHeader>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <EntryMaster title="Glossary"></EntryMaster>
      </v-card-text>
    </div>

    <div v-if="step == 1">
      <v-card-text>
        <AutonStepperHeader
          title="Proposing new Terms & Conditions"
          subtitle=""
        >
        </AutonStepperHeader>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <EntryMaster title="Preambles"></EntryMaster>
      </v-card-text>
    </div>

    <div v-if="step == 2">
      <v-card-text>
        <AutonStepperHeader
          title="Proposing new Terms & Conditions"
          subtitle=""
        >
        </AutonStepperHeader>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <EntryMaster title="Articles"></EntryMaster>
      </v-card-text>
    </div>

    <AccountSign
      :transaction="transaction"
      :uri="uri"
      v-if="step == 3"
      callback="AutonCreate-PrevStep"
      title="Proposing Terms & Conditions"
    ></AccountSign>
    <v-divider></v-divider>
    <v-card-text v-if="!hideNavigation">
      <div class="d-flex align-center justify-space-between">
        <v-btn @click="prevStep">
          <v-icon class="mr-2" small>mdi-arrow-left</v-icon> previous
        </v-btn>
        <v-btn color="accent" @click="nextStep" :disabled="disabledNext">
          next <v-icon class="ml-2" small>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </v-card-text>
  </div>
</template>
<script>
export default {
  data: () => ({
    step: 0,
    disabledNext: false,
    hideNavigation: false,
  }),
  created() {
    this.$nuxt.$on("AutonCreate-NextStep", ($event) => this.step++);
    this.$nuxt.$on("AutonCreate-PrevStep", ($event) => this.step--);
    this.$nuxt.$on("AutonProposalSubmit-HideNavigation", ($event) => {
      this.hideNavigation = $event;
    });
  },
  methods: {
    makeTransaction() {},
    prevStep() {
      if (this.step == 0) {
        this.$nuxt.$emit("AutonProposalSubmit-PrevStep");
      } else {
        this.step--;
      }
    },
    nextStep() {
      this.step++;
    },
  },
};
</script>
