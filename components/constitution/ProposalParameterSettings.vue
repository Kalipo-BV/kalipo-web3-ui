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
    <v-row no-gutters class="">
      <v-col cols="4">
        <div :class="editMode ? 'ml-4 text-h5 mb-1' : 'text-h5'">Parameter</div>
      </v-col>
      <v-col cols="8">
        <div :class="editMode ? 'text-h5 pl-1 mb-1' : 'text-h5 pl-1'">
          Setting
        </div>
      </v-col>
    </v-row>
    <v-divider v-if="editMode"></v-divider>
    <v-card flat class="mt-1">
      <v-row
        no-gutters
        class="px-4 d-flex align-center"
        style="min-height: 60px"
      >
        <v-col cols="4" class="py-2 pr-4">
          <div class="text-h6">Mandatory Attendence</div>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="8">
          <div class="d-flex align-center px-4">
            <v-slider
              v-model="mandatoryAttendenceValue"
              class=""
              hide-details
              :disabled="!editMode"
              min="1"
            ></v-slider>
            <div>{{ mandatoryAttendenceValue }}%</div>
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        no-gutters
        class="px-4 d-flex align-center"
        style="min-height: 60px"
      >
        <v-col cols="4" class="py-2 pr-4">
          <div class="text-h6">Percentage needed for acceptance</div>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="8">
          <div class="d-flex align-center px-4">
            <v-slider
              v-model="acceptenceValue"
              class=""
              hide-details
              :disabled="!editMode"
              min="1"
            ></v-slider>
            <div>{{ acceptenceValue }}%</div>
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        no-gutters
        class="px-4 d-flex align-center"
        style="min-height: 60px"
      >
        <v-col cols="4" class="py-2 pr-4">
          <div class="text-h6">Dialog duration</div>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="8">
          <div class="d-flex align-center justify-space-between px-4">
            <v-btn
              fab
              x-small
              v-if="editMode"
              @click="decreaseDialog"
              :disabled="dialogWindowValue == 0"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
            <div class="text-body-1" v-if="dialogWindow > 0">
              {{ dialogWindowValue }} day<span v-show="dialogWindowValue != 1"
                >s</span
              >
            </div>
            <div class="text-body-1" v-if="dialogWindowValue == 0">
              Disabled
            </div>
            <v-btn
              fab
              x-small
              v-if="editMode"
              @click="increaseDialog"
              :disabled="dialogWindowValue == 30"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        no-gutters
        class="px-4 d-flex align-center"
        style="min-height: 60px"
      >
        <v-col cols="4" class="py-2 pr-4">
          <div class="text-h6">Voting duration</div>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="8">
          <div class="d-flex align-center justify-space-between px-4">
            <v-btn
              fab
              x-small
              v-if="editMode"
              @click="decreaseVoting"
              :disabled="votingWindowValue == 1"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
            <div class="text-body-1">
              {{ votingWindowValue }} day<span v-show="votingWindowValue != 1"
                >s</span
              >
            </div>
            <v-btn
              fab
              x-small
              v-if="editMode"
              @click="increaseVoting"
              :disabled="votingWindowValue == 30"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        no-gutters
        class="px-4 d-flex align-center"
        style="min-height: 60px"
      >
        <v-col cols="4" class="py-2 pr-4">
          <div class="text-h6">Execute when decision is final</div>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="8">
          <div class="d-flex align-center justify-space-between px-4">
            <div>No</div>
            <v-switch
              v-model="executeWhenFinalValue"
              hide-details
              inset
              class="mt-0"
              color="primary"
              :disabled="!editMode"
            ></v-switch>
            <div>Yes</div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    editMode: {
      type: String,
    },
    mandatoryAttendence: {
      type: Number,
      default: 0,
    },
    acceptence: {
      type: Number,
      default: 0,
    },
    dialogWindow: {
      type: Number,
      default: 1,
    },
    votingWindow: {
      type: Number,
      default: 1,
    },
    executeWhenFinal: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  computed: {
    mandatoryAttendenceValue: {
      get: function () {
        return this.mandatoryAttendence;
      },
      set: function (newValue) {
        this.$emit("update:mandatoryAttendence", newValue);
      },
    },
    acceptenceValue: {
      get: function () {
        return this.acceptence;
      },
      set: function (newValue) {
        this.$emit("update:acceptence", newValue);
      },
    },
    dialogWindowValue: {
      get: function () {
        return this.dialogWindow;
      },
      set: function (newValue) {
        this.$emit("update:dialogWindow", newValue);
      },
    },
    votingWindowValue: {
      get: function () {
        return this.votingWindow;
      },
      set: function (newValue) {
        this.$emit("update:votingWindow", newValue);
      },
    },
    executeWhenFinalValue: {
      get: function () {
        return this.executeWhenFinal;
      },
      set: function (newValue) {
        this.$emit("update:executeWhenFinal", newValue);
      },
    },
  },
  methods: {
    increaseDialog() {
      if (this.dialogWindowValue < 30) {
        this.dialogWindowValue++;
      }
    },
    decreaseDialog() {
      if (this.dialogWindowValue > 0) {
        this.dialogWindowValue--;
      }
    },
    increaseVoting() {
      if (this.votingWindowValue < 30) {
        this.votingWindowValue++;
      }
    },
    decreaseVoting() {
      if (this.votingWindowValue > 1) {
        this.votingWindowValue--;
      }
    },
  },
};
</script>

<style>
</style>