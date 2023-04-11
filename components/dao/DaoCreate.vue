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
    <!-- Key code 13 is Enter key -->
    <Keypress key-event="keyup" :key-code="13" @success="nextStep"
      v-if="!(disabledNext || disabledNextStep4) && step !== 7" />

    <v-card>
      <v-card-text v-if="step == 0">
        <AutonStepperHeader title="Creating a new DAO" subtitle="Informing about DAOs and Autons"></AutonStepperHeader>

        <div class="text-body-1 mt-3">
          A DAO (Decentralized Autonomous Organization) is an organization that operates on Kalipo's platform, supporting
          members in their self-management in a transparent manner.
        </div>
        <v-row class="mt-3">
          <v-col cols="12" md="6">
            <v-img src="/kalipo-dao-auton-constellation-example.png" />

          </v-col>
          <v-col cols="12" md="6">
            <div class="text-caption mt-8">
              By creating a new DAO you will establish a <b>DAO</b> with one <b>Governing Auton</b> (Autonomous
              Organizational Unit).
              This Auton is the team that governs the leading constitution of the DAO. <b>Sub Autons</b> can be used to
              define an
              organizational structure.
            </div>
          </v-col>
        </v-row>

      </v-card-text>

      <v-card-text v-if="step == 1">
        <AutonStepperHeader title="Creating a new DAO" subtitle="Naming your DAO and Governing Auton">
        </AutonStepperHeader>
        <div class="text-body-1 mt-3">
          When creating a name, it's important to choose something unique and memorable that reflects the organization's
          purpose and values. Consider using a combination of descriptive and creative words, and make sure the name is
          easy to spell and pronounce.
        </div>
        <DaoNamingFields :name.sync="name" :governingName.sync="governingName" :disabledNext.sync="disabledNext">
        </DaoNamingFields>

      </v-card-text>

      <v-card-text v-if="step == 2">
        <AutonStepperHeader title="Creating a new DAO" subtitle="Select an icon that suits your auton">
        </AutonStepperHeader>
        <AutonRandomIcons :icon.sync="icon"></AutonRandomIcons>
      </v-card-text>

      <v-card-text v-if="step == 3">
        <AutonStepperHeader title="Creating a new DAO" subtitle="Creating a mission and vision">
        </AutonStepperHeader>
        <div class="text-body-1 mt-3">
          Create a clear and concise mission and vision statement for your DAO by defining its purpose, values, and goals.
          The mission statement should describe what your DAO does and who it serves, and the vision statement should
          outline where you want the organization to be in the future.
        </div>
        <DaoMissionVisionFields :mission.sync="mission" :vision.sync="vision" class="mt-4">
        </DaoMissionVisionFields>
      </v-card-text>

      <v-card-text v-if="step == 4">
        <AutonStepperHeader title="Creating a new DAO" subtitle="Legal entity">
        </AutonStepperHeader>
        <div class="text-body-1 mt-3">
          If your DAO has a jurisdiction and a Chamber of Commerce identification number, you can add this information to
          your organization's profile. This helps to provide legitimacy and transparency to your DAO, and may be required
          for legal or regulatory purposes.
        </div>
        <v-checkbox v-model="hasLegalEntity" label="Has legal entity"></v-checkbox>
        <DaoLegalFields v-if="hasLegalEntity" :jurisdiction.sync="jurisdiction" :cocId.sync="cocId"
          :businessAddress.sync="businessAddress" :disabledNext.sync="disabledNext" class="mt-4">
        </DaoLegalFields>
      </v-card-text>

      <v-card-text v-if="step == 5">
        <AutonStepperHeader title="Creating a new DAO" subtitle="Contact information">
        </AutonStepperHeader>
        <div class="text-body-1 mt-3">
          Add one or multiple contact information fields to your DAO's profile to provide interested parties with a way to
          get in touch. E.g. email, website, social media accounts, or other relevant information.
        </div>
        <DaoContactInformationList :channelList.sync="channelList" class="mt-1"></DaoContactInformationList>
      </v-card-text>

      <v-card-text v-if="step == 6">
        <AutonStepperHeader title="Creating a new DAO" subtitle="Inviting multiple founding members">
        </AutonStepperHeader>
        <div class="text-body-1 mt-3">
          To add additional founding members to your DAO, search for members and invite individuals who share your
          organization's values and goals. Once invited, these individuals can help shape the organization's governance
          and decision-making processes. Note: You can do this later as well.
        </div>
        <AutonUserSelect :selectedFounderIds.sync="selectedFounderIds" class="mt-4">
        </AutonUserSelect>
      </v-card-text>

      <AccountSign :transaction="transaction" :uri="uri" v-if="step == 7" callback="AutonCreate-PrevStep"
        title="Creating auton"></AccountSign>

      <v-divider></v-divider>

      <v-card-text v-if="step < 7">
        <div class="d-flex align-center justify-space-between">
          <v-btn :disabled="step == 0" @click="step--">
            <v-icon class="mr-2" small>mdi-arrow-left</v-icon> previous
          </v-btn>
          <v-btn color="accent" v-if="step != 6" @click="nextStep" :disabled="disabledNext || disabledNextStep4">
            next <v-icon class="ml-2" small>mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn color="accent" v-if="step == 6" @click="nextStep">
            sign <v-icon class="ml-2" small>mdi-draw-pen</v-icon>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  components: {
    Keypress: () => import("vue-keypress")
  },
  data: () => ({
    step: 0,
    uri: "",
    transaction: {
      moduleId: 1000,
      assetId: 0,
      assets: {},
    },
    icon: "mdi-web",
    name: "",
    governingName: "",
    mission: "",
    vision: "",
    hasLegalEntity: false,
    jurisdiction: "",
    cocId: "",
    businessAddress: "",
    channelList: null,
    selectedFounderIds: null,
    disabledNext: false,
    disabledNextStep4: false,

  }),
  created() {
    this.$nuxt.$on("AutonCreate-NextStep", ($event) => this.step++);
    this.$nuxt.$on("AutonCreate-PrevStep", ($event) => this.step--);
  },
  methods: {
    makeTransaction() { },
    nextStep() {
      this.step++;
      console.log(this.step)
      if (this.step == 7) {
        this.uri = `dao/${this.name.replace(" ", "_")}/auton/${this.governingName.replace(" ", "_")}`;

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

        let linkedChannels = []
        if (this.channelList != null && this.channelList.length > 1 || this.channelList[0].channel != "") {
          let tempChannelList = [];
          for (let index = 0; index < this.channelList.length; index++) {
            const element = this.channelList[index];
            if (element.channel != "" && element.link != "") {
              tempChannelList.push(element);
            }
          }
          linkedChannels = tempChannelList;
        }

        const asset = {
          name: this.name,
          governingAutonName: this.governingName,
          icon: this.icon,
          mission: this.mission,
          vision: this.vision,
          bulkInviteAccountIds: this.selectedFounderIds,
          linkedChannels: linkedChannels,
          hasLegalEntity: this.hasLegalEntity,
          jurisdiction: this.jurisdiction,
          cocId: this.cocId,
          businessAddress: this.businessAddress
        };

        console.log(asset)

        this.transaction.assets = asset;
      }
    },
  },
};
</script>
