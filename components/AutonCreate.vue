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
    <v-card>
      <v-card-text v-if="step == 0">
        <AutonStepperHeader
          title="Founding a new Auton"
          subtitle="First choose your template"
        ></AutonStepperHeader>

        <AutonTemplateSelect></AutonTemplateSelect>
      </v-card-text>

      <v-card-text v-if="step == 1">
        <AutonStepperHeader
          title="Founding a new Auton"
          subtitle="Select an icon that suits your auton"
        ></AutonStepperHeader>
        <AutonRandomIcons :icon.sync="icon"></AutonRandomIcons>
      </v-card-text>

      <v-card-text v-if="step == 2">
        <!-- default template -->
        <AutonStepperHeader
          v-if="template == 'DEFAULT'"
          title="Founding a new Auton"
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
          title="Founding a new Auton"
          subtitle="Specify the name and description"
        ></AutonStepperHeader>
        <AutonNameDescription
          v-if="template == 'EVENT'"
          :name.sync="name"
          :description.sync="description"
          :disabledNext.sync="disabledNext"
        ></AutonNameDescription>
      </v-card-text>

      <v-card-text v-if="step == 3">
        <!-- default template -->
        <AutonStepperHeader
          v-if="template == 'DEFAULT'"
          title="Founding a new Auton"
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
          title="Founding a new Auton"
          subtitle="Supply the date and time"
        ></AutonStepperHeader>
        <AutonStartEnd
          v-if="template == 'EVENT'"
          :startDate.sync="startDate"
          :startTime.sync="startTime"
          :endDate.sync="endDate"
          :endTime.sync="endTime"
        ></AutonStartEnd>
      </v-card-text>

      <v-card-text v-if="step == 4">
        <!-- default template -->
        <AutonStepperHeader
          v-if="template == 'DEFAULT'"
          title="Founding a new Auton"
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
          title="Founding a new Auton"
          subtitle="Supply some required data"
        ></AutonStepperHeader>
        <AutonReqData
          v-if="template == 'EVENT'"
          :location.sync="location"
          :capacity.sync="capacity"
          :price.sync="price"
        ></AutonReqData>
      </v-card-text>

      <v-card-text v-if="step == 5">
        <AutonStepperHeader
          title="Founding a new Auton"
          subtitle="Specify tags so users can find your auton"
        ></AutonStepperHeader>
        <AutonTagSelect :tags.sync="tags" class="mt-4"></AutonTagSelect>
      </v-card-text>

      <AccountSign
        :transaction="transaction"
        :uri="uri"
        v-if="step == 6"
        callback="AutonCreate-PrevStep"
        title="Creating auton"
      ></AccountSign>

      <v-divider v-if="step !== 6"></v-divider>

      <v-card-text v-if="step !== 6">
        <div class="d-flex align-center justify-space-between">
          <v-btn :disabled="step == 0" @click="step--">
            <v-icon class="mr-2" small>mdi-arrow-left</v-icon> previous
          </v-btn>
          <v-btn
            color="accent"
            v-if="step != 6"
            @click="nextStep"
            :disabled="disabledNext"
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

    // event
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    location: "",
    capacity: "",
    price: "",

    start: BigInt(1),
    end: BigInt(1),
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
        };

        this.transaction.assets = asset;
      }

      console.log(this.icon);
      console.log(this.name);
      console.log(this.slogan);
      console.log(this.mission);
      console.log(this.vision);
      console.log(this.selectedFounderIds);
      console.log(this.tags);

      console.log(this.template);
      console.log(this.location);
      console.log(this.capacity);
      console.log(this.price);
      console.log(new Date(this.startDate + ":" + this.startTime).getTime());
      console.log(new Date(this.endDate + ":" + this.endTime).getTime());
    },
  },
};
</script>
