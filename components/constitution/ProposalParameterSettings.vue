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
              v-model="mandatoryAttendence"
              class=""
              hide-details
              :disabled="!editMode"
              min="1"
            ></v-slider>
            <div>{{ mandatoryAttendence }}%</div>
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
              v-model="acceptence"
              class=""
              hide-details
              :disabled="!editMode"
              min="1"
            ></v-slider>
            <div>{{ acceptence }}%</div>
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
              :disabled="dialogWindow == 0"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
            <div class="text-body-1" v-if="dialogWindow > 0">
              {{ dialogWindow }} day<span v-show="dialogWindow != 1">s</span>
            </div>
            <div class="text-body-1" v-if="dialogWindow == 0">Disabled</div>
            <v-btn
              fab
              x-small
              v-if="editMode"
              @click="increaseDialog"
              :disabled="dialogWindow == 30"
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
              :disabled="votingWindow == 1"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
            <div class="text-body-1">
              {{ votingWindow }} day<span v-show="votingWindow != 1">s</span>
            </div>
            <v-btn
              fab
              x-small
              v-if="editMode"
              @click="increaseVoting"
              :disabled="votingWindow == 30"
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
              v-model="executeWhenFinal"
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
  props: ["editMode"],
  data: () => ({
    mandatoryAttendence: 0,
    acceptence: 0,
    dialogWindow: 1,
    votingWindow: 1,
    executeWhenFinal: false,
  }),
  methods: {
    increaseDialog() {
      if (this.dialogWindow < 30) {
        this.dialogWindow++;
      }
    },
    decreaseDialog() {
      if (this.dialogWindow > 0) {
        this.dialogWindow--;
      }
    },
    increaseVoting() {
      if (this.votingWindow < 30) {
        this.votingWindow++;
      }
    },
    decreaseVoting() {
      if (this.votingWindow > 1) {
        this.votingWindow--;
      }
    },
  },
};
</script>

<style>
</style>