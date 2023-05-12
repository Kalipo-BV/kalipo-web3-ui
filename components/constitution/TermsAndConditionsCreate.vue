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
    <v-card-text v-if="step == 0">
      <AutonStepperHeader
        title="Proposing new Terms & Conditions"
        subtitle="Manage..."
      >
      </AutonStepperHeader>
      <div class="text-body-1 mt-3">...</div>

      <!-- <NestedList :items="nestedListItems"></NestedList> -->
      <EntryMaster></EntryMaster>
    </v-card-text>

    <AccountSign
      :transaction="transaction"
      :uri="uri"
      v-if="step == 1"
      callback="AutonCreate-PrevStep"
      title="Proposing Terms & Conditions"
    ></AccountSign>
  </div>
</template>
<script>
export default {
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
    nestedListItems: [
      {
        header: "test",
        content: "test 123",
        children: [
          {
            header: "test",
            content: "test 123",
            children: [
              {
                header: "test",
                content: "test 123",
              },
              {
                header: "test",
                content: "test 123",
              },
            ],
          },
          {
            header: "test",
            content: "test 123",
          },
        ],
      },
      {
        header: "test",
        content: "test 123",
      },
    ],
  }),
  created() {
    this.$nuxt.$on("AutonCreate-NextStep", ($event) => this.step++);
    this.$nuxt.$on("AutonCreate-PrevStep", ($event) => this.step--);
  },
  methods: {
    makeTransaction() {},
    nextStep() {
      this.step++;
      console.log(this.step);
      if (this.step == 7) {
        this.uri = `dao/${this.name.replace(
          " ",
          "_"
        )}/auton/${this.governingName.replace(" ", "_")}`;

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

        let linkedChannels = [];
        if (
          (this.channelList != null && this.channelList.length > 1) ||
          this.channelList[0].channel != ""
        ) {
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
          businessAddress: this.businessAddress,
        };

        console.log(asset);

        this.transaction.assets = asset;
      }
    },
  },
};
</script>
