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
    <!--    Key code 13 is Enter key-->
    <Keypress
      key-event="keyup"
      :key-code="13"
      @success="nextStep"
      v-if="!(disabledNext || disabledNextStep4) && step !== 6"
    />

    <v-card>
      <v-card-text v-if="step == 0">
        <AutonStepperHeader
          title="Founding a new auton"
          subtitle="First choose your template"
        ></AutonStepperHeader>

        <AutonTemplateSelect></AutonTemplateSelect>
      </v-card-text>

      <v-card-text v-if="step == 1">
        <AutonStepperHeader
          v-if="template == 'DEFAULT'"
          title="Founding a new auton"
          subtitle="Select an icon that suits your auton"
        ></AutonStepperHeader>
        <AutonStepperHeader
          v-if="template == 'EVENT'"
          title="Founding a new event"
          subtitle="Select an icon that suits your event"
        ></AutonStepperHeader>
        <AutonStepperHeader
          v-if="template == 'LESSON'"
          title="Founding a new lesson"
          subtitle="Select an icon that suits your lesson"
        ></AutonStepperHeader>
        <AutonRandomIcons :icon.sync="icon"></AutonRandomIcons>
      </v-card-text>

      <v-card-text v-if="step == 2">
        <!-- default template -->
        <AutonStepperHeader
          v-if="template == 'DEFAULT'"
          title="Founding a new auton"
          subtitle="Specify the name and slogan"
        ></AutonStepperHeader>
        <AutonNameSlogan
          v-if="template == 'DEFAULT'"
          :name.sync="name"
          :slogan.sync="slogan"
          :disabledNext.sync="disabledNext"
        ></AutonNameSlogan>

        <!-- event template -->
        <AutonStepperHeader
          v-if="template == 'EVENT'"
          title="Founding a new event"
          subtitle="Specify the name and description"
        ></AutonStepperHeader>
        <AutonNameDescription
          v-if="template == 'EVENT'"
          :name.sync="name"
          :description.sync="description"
          :disabledNext.sync="disabledNext"
        ></AutonNameDescription>

        <!-- lesson template -->
        <AutonStepperHeader
          v-if="template == 'LESSON'"
          title="Founding a new lesson"
          subtitle="Specify all information about this lesson"
        ></AutonStepperHeader>
        <LessonInformation
          v-if="template == 'LESSON'"
          :subject.sync="subject"
          :lessonName.sync="lessonName"
          :description.sync="description"
          :location.sync="location"
          :date.sync="date"
          :startTime.sync="startTime"
          :endTime.sync="endTime"
        ></LessonInformation>
      </v-card-text>

      <v-card-text v-if="step == 3">
        <!-- default template -->
        <AutonStepperHeader
          v-if="template == 'DEFAULT'"
          title="Founding a new auton"
          subtitle="Supply a brief mission and vision statement"
        ></AutonStepperHeader>
        <AutonMissionVision
          v-if="template == 'DEFAULT'"
          :mission.sync="mission"
          :vision.sync="vision"
          class="mt-4"
        ></AutonMissionVision>

        <!-- event template -->
        <AutonStepperHeader
          v-if="template == 'EVENT'"
          title="Founding a new event"
          subtitle="Supply the date and time"
        ></AutonStepperHeader>
        <AutonStartEnd
          v-if="template == 'EVENT'"
          :startDate.sync="startDate"
          :startTime.sync="startTime"
          :endDate.sync="endDate"
          :endTime.sync="endTime"
          :disabledNext.sync="disabledNext"
        ></AutonStartEnd>

        <!-- lesson template -->
        <AutonStepperHeader
          v-if="template == 'LESSON'"
          title="Founding a new lesson"
          subtitle="Bulk invite students into your new lesson"
        ></AutonStepperHeader>
        <AutonUserSelect
          v-if="template == 'LESSON'"
          :selectedFounderIds.sync="studentIds"
          class="mt-4"
        ></AutonUserSelect>
      </v-card-text>

      <v-card-text v-if="step == 4">
        <!-- default template -->
        <AutonStepperHeader
          v-if="template == 'DEFAULT'"
          title="Founding a new auton"
          subtitle="Bulk invite members into your new auton"
        ></AutonStepperHeader>
        <AutonUserSelect
          v-if="template == 'DEFAULT'"
          :selectedFounderIds.sync="selectedFounderIds"
          class="mt-4"
        ></AutonUserSelect>

        <!-- event template -->
        <AutonStepperHeader
          v-if="template == 'EVENT'"
          title="Founding a new event"
          subtitle="Supply some required data"
        ></AutonStepperHeader>
        <AutonReqData
          v-if="template == 'EVENT'"
          :location.sync="location"
          :capacity.sync="capacity"
          :price.sync="price"
          :disabledNext.sync="disabledNext"
        ></AutonReqData>
      </v-card-text>

      <v-card-text v-if="step == 5">
        <AutonStepperHeader
          v-if="template == 'DEFAULT'"
          title="Founding a new auton"
          subtitle="Specify tags so users can find your auton"
        ></AutonStepperHeader>
        <AutonStepperHeader
          v-if="template == 'EVENT'"
          title="Founding a new event"
          subtitle="Specify tags so users can find your event"
        ></AutonStepperHeader>
        <AutonTagSelect :tags.sync="tags" class="mt-4"></AutonTagSelect>
      </v-card-text>

      <AccountSign
        :transaction="transaction"
        :uri="uri"
        v-if="step == 6 && template == 'DEFAULT'"
        callback="AutonCreate-PrevStep"
        title="Creating auton"
      ></AccountSign>

      <AccountSign
        :transaction="transaction"
        :uri="uri"
        v-if="step == 6 && template == 'EVENT'"
        callback="AutonCreate-PrevStep"
        title="Creating event"
      ></AccountSign>

      <AccountSign
        :transaction="transaction"
        :uri="uri"
        v-if="step == 4 && template == 'LESSON'"
        callback="AutonCreate-PrevStep"
        title="Creating lesson"
      ></AccountSign>

      <!-- FIX DEZE IF's -->
      <v-divider
        v-if="(step < 6 && template == 'EVENT') || template == 'DEFAULT'"
      ></v-divider>
      <v-divider v-if="step < 4 && template == 'LESSON'"></v-divider>

      <v-card-text
        v-if="(step < 6 && template == 'EVENT') || template == 'DEFAULT'"
      >
        <div class="d-flex align-center justify-space-between">
          <v-btn :disabled="step == 0" @click="step--">
            <v-icon class="mr-2" small>mdi-arrow-left</v-icon> previous
          </v-btn>
          <v-btn
            color="accent"
            v-if="step != 6"
            @click="nextStep"
            :disabled="disabledNext || disabledNextStep4"
          >
            next <v-icon class="ml-2" small>mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn color="accent" v-if="step == 6" @click="step++">
            sign <v-icon class="ml-2" small>mdi-draw-pen</v-icon>
          </v-btn>
        </div>
      </v-card-text>
      <!-- VERDWIJN WANNEER STEP 4 IS && template == 'LESSON' -->
      <v-card-text v-if="step < 4 && template == 'LESSON'">
        <div class="d-flex align-center justify-space-between">
          <v-btn :disabled="step == 0" @click="step--">
            <v-icon class="mr-2" small>mdi-arrow-left</v-icon> previous
          </v-btn>
          <v-btn
            color="accent"
            v-if="step != 6"
            @click="nextStep"
            :disabled="disabledNext || disabledNextStep4"
          >
            next <v-icon class="ml-2" small>mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn color="accent" v-if="step == 6" @click="step++">
            sign <v-icon class="ml-2" small>mdi-draw-pen</v-icon>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import AutonNameDescription from "./event/AutonNameDescription.vue";
import AutonStartEnd from "./event/AutonStartEnd.vue";
import AutonReqData from "./event/AutonReqData.vue";
export default {
  components: {
    AutonNameDescription,
    AutonStartEnd,
    AutonReqData,
    Keypress: () => import("vue-keypress"),
  },
  data: () => ({
    step: 0,
    uri: "",
    template: "DEFAULT",
    transaction: {
      moduleId: 1003,
      assetId: 0,
      assets: {},
    },
    icon: "",
    name: "",
    slogan: "",
    mission: "",
    vision: "",
    selectedFounderIds: null,
    tags: null,
    disabledNext: false,
    disabledNextStep4: false,

    // event and lesson
    startTime: "",
    endTime: "",
    description: "",
    location: "",
    start: BigInt(1),
    end: BigInt(1),

    // event
    startDate: "",
    endDate: "",
    capacity: 0,
    price: 0,

    // lesson
    subject: "",
    lessonName: "",
    date: "",
    studentIds: null,
  }),
  created() {
    this.$nuxt.$on("AutonCreate-NextStep", ($event) => this.step++);
    this.$nuxt.$on("AutonCreate-PrevStep", ($event) => this.step--);
    this.$nuxt.$on(
      "OptionCard-SelectTemplate",
      ($event) => (this.template = $event)
    );
  },
  methods: {
    makeTransaction() {},
    nextStep() {
      this.step++;

      if (this.step == 4 && this.template == "LESSON") {
        this.uri = this.uri = `auton/${this.lessonName.replace(" ", "_")}`;

        if (this.date != "") {
          this.start = BigInt(
            new Date(this.date + ":" + this.startTime).getTime()
          );
          this.end = BigInt(new Date(this.date + ":" + this.endTime).getTime());
        }

        // auton lesson asset
        const asset = {
          icon: this.icon,
          name: this.lessonName,
          subtitle: "",
          mission: "",
          vision: "",
          bulkInviteAccountIds: this.studentIds,
          tags: [],
          type: this.template,
          location: this.location,
          price: 0,
          capacity: 0,
          description: this.description,
          start: this.start,
          end: this.end,
          subject: this.subject,
        };

        this.transaction.assets = asset;
      }

      if (this.step == 6) {
        this.uri = `auton/${this.name.replace(" ", "_")}`;

        if (this.tags == null) {
          this.tags = [];
        }
        if (this.mission == null) {
          this.mission = "";
        }
        if (this.vision == null) {
          this.vision = "";
        }
        if (this.selectedFounderIds == null) {
          this.selectedFounderIds = [];
        }
        if (this.startDate != "") {
          this.start = BigInt(
            new Date(this.startDate + ":" + this.startTime).getTime()
          );
        }
        if (this.endDate != "") {
          this.end = BigInt(
            new Date(this.endDate + ":" + this.endTime).getTime()
          );
        }

        const asset = {
          icon: this.icon,
          name: this.name,
          subtitle: this.slogan,
          mission: this.mission,
          vision: this.vision,
          bulkInviteAccountIds: this.selectedFounderIds,
          tags: this.tags,
          type: this.template,
          location: this.location,
          price: BigInt(this.price),
          capacity: BigInt(this.capacity.toString()),
          description: this.description,
          start: this.start,
          end: this.end,
          subject: "",
        };

        this.transaction.assets = asset;
      }
    },
  },
};
</script>
