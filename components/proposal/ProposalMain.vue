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
    <v-stepper
      alt-labels
      class="mt-0"
      style="background-color: #eef1f5"
      flat
      v-model="step"
    >
      <v-stepper-header class="py-2">
        <v-stepper-step
          step="1"
          color="accent"
          :complete="proposal.status != 'CAMPAIGNING'"
          @click="$router.push(mainPath + 'campaigning')"
        >
          <div class="d-flex justify-center">Dialogue</div>
          <div class="d-flex justify-center mt-2">
            <small v-if="proposal && userLang">{{
              new Date(parseInt(proposal.created) * 1000).toLocaleDateString(
                userLang,
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }
              )
            }}</small>
          </div>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          step="2"
          @click="$router.push(mainPath + 'voting')"
          color="accent"
          :complete="
            proposal.status != 'CAMPAIGNING' && proposal.status != 'VOTING'
          "
        >
          <div class="d-flex justify-center">Voting</div>
          <div class="d-flex justify-center mt-2">
            <small v-if="proposal && userLang">{{
              new Date(parseInt(proposal.windowOpen) * 1000).toLocaleDateString(
                userLang,
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }
              )
            }}</small>
          </div>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          step="3"
          @click="$router.push(mainPath + 'results')"
          color="accent"
          :complete="proposal.status == 'ENDED'"
        >
          <div class="d-flex justify-center">Closed</div>
          <div class="d-flex justify-center mt-2">
            <small v-if="proposal && userLang">{{
              new Date(
                parseInt(proposal.windowClosed) * 1000
              ).toLocaleDateString(userLang, {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })
            }}</small>
          </div>
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>
    <v-card flat class="mt-0 rounded-lg">
      <v-card flat>
        <v-card-text class="py-2">
          <div class="" v-if="proposal">
            <div class="text-h4 primary--text">{{ proposal.title }}</div>
          </div>
        </v-card-text>
      </v-card>
      <div v-for="(item, i) in list" :key="i">
        <v-divider></v-divider>

        <v-card flat link @click="navigateTo(item.link)">
          <v-card-text class="py-2">
            <div class="d-flex align-center">
              <v-avatar
                color="primary"
                size="25"
                class="white--text mr-2"
                v-if="item.icon"
                ><v-icon dark x-small>{{ item.icon }}</v-icon></v-avatar
              >
              <div class="d-flex justify-space-between align-center" style="width: 100%">
                <div class="text-caption font-weight-medium mr-2" style="width: 20%;">
                  {{ item.leftText }}
                </div>
                <div class="ma-0 text-caption pr-8" style="width: 80%; text-align: right">
                  {{ item.rightText }}
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <div style="background-color: #eef1f5; height: 2rem"></div>
      <div id="extraInfo">
        <div id="extraInfoContainer" v-for="(item, i) in extraInfoList" :key="i">
          <v-divider></v-divider>

          <v-card flat link @click="navigateTo(item.link)">
            <v-card-text class="py-2">
              <div class="d-flex align-center">
                <v-avatar
                  color="primary"
                  size="25"
                  class="white--text mr-2"
                  v-if="item.icon"
                  ><v-icon dark x-small>{{ item.icon }}</v-icon></v-avatar
                >
                <div class="d-flex justify-space-between align-center" style="width: 100%">
                  <div class="text-caption font-weight-medium mr-2" style="width: 20%;">
                    {{ item.leftText }}
                  </div>
                  <div class="ma-0 text-caption pr-8" style="width: 80%; text-align: right;">
                    {{ item.rightText }}
                    <button :style="{visibility:item.rightText.length<53?'hidden':'inherit'}" @click="showMoreshowLess(item)">{{buttonText}}</button>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-card>
    <div style="justify-content: center; display: flex;">
      <v-btn style="background-color: #0a75f3; color: white;  margin-top: 5px; " id="buttonShow" @click="hideExtraInfo">Show more</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ["proposal", "submitter"],
  data: () => ({
    standardAttributeList: [],
    extraInfoList: [],
    extraInfoListFullRightText: [],
    list: [],
    userLang: null,
    mainPath: null,
    step: 1,
    buttonText: "V",
  }),
  async mounted() {
    const autonIdParam = this.$route.params.autonId.replaceAll("_", " ");
    const proposalIndexPlusOne = parseInt(this.$route.params.proposalId);
    this.mainPath = `/auton/${autonIdParam}/proposal/${proposalIndexPlusOne}/`;

    if (
      this.proposal != null &&
      this.submitter != null &&
      this.proposal.membershipInvitationArguments != null
    ) {
      if (this.proposal.status == "CAMPAIGNING") {
        this.step = 1;
      } else if (this.proposal.status == "VOTING") {
        this.step = 2;
      } else if (this.proposal.status == "ENDED") {
        this.step = 3;
      }

      this.userLang = navigator.language || navigator.userLanguage;
      // Submission date
      this.list.push({
        icon: "mdi-calendar",

        leftText: "Submission:",
        rightText: new Date(
          parseInt(this.proposal.created) * 1000
        ).toLocaleDateString(this.userLang, {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      });

      // Submitter
      this.list.push({
        icon: "mdi-account",
        leftText: "Submitter:",
        rightText: "@" + this.submitter.username,
        link: "/account/" + this.submitter.username,
      });

      // proposers
      var propserNames = "";
      const promises = this.proposal.improvementArguments.proposers.map((proposerId) => {
        return this.$invoke("kalipoAccount:getByID", {
          id: proposerId,
        });
      });

      await Promise.all(promises).then((accounts) => {
        accounts.forEach((account) => {
          console.log(account.result.name);
          console.log(promises.length)
          const commaCount = propserNames.split(",").length - 1;
          if((promises.length) -1 === commaCount){
            propserNames += account.result.name
          }
          else{propserNames += account.result.name + ", "}
          console.log(propserNames)
        });
      });



      this.list.push({
        icon: "mdi-account-group",
        leftText: "Authors:",
        rightText:  propserNames,
      });

      // Proposal type
      this.list.push({
        icon: "mdi-bank",
        leftText: "Proposal type:",
        rightText: this.proposal.type.replaceAll("-", " "),
      });



      // Some attributes linked to a proposal type.
      if (this.proposal.type == "membership-invitation") {
        const invitedId = this.proposal.membershipInvitationArguments.accountId;
        const invitedWrapper = await this.$invoke("kalipoAccount:getByID", {
          id: invitedId,
        });
        const invited = invitedWrapper.result;
        // Membership candidate.
        this.list.push({
          icon: "mdi-account-plus",
          leftText: "Membership candidate:",
          rightText: "@" + invited.username,
          link: "/account/" + invited.username,
        });
      } else if (this.proposal.type == "improvement") {
        console.log(this.proposal)

        // Abstract
        this.extraInfoListFullRightText.push(this.proposal.improvementArguments.abstract);
        this.extraInfoList.push({
          icon: "mdi-text",
          leftText: "Abstract:",
          rightText: this.proposal.improvementArguments.abstract,
        });

        // Motivation
        this.extraInfoListFullRightText.push(this.proposal.improvementArguments.motivation);
        this.extraInfoList.push({
          icon: "mdi-target",
          leftText: "Motivation:",
          rightText: this.proposal.improvementArguments.motivation,
        });

        // Specification
        this.extraInfoListFullRightText.push(this.proposal.improvementArguments.specification);
        this.extraInfoList.push({
          icon: "mdi-text-search",
          leftText: "Specification:",
          rightText: this.proposal.improvementArguments.specification,
        });

        // References
        this.extraInfoListFullRightText.push(this.proposal.improvementArguments.references);
        this.extraInfoList.push({
          icon: "mdi-link-box",
          leftText: "References:",
          rightText: this.proposal.improvementArguments.references,
        });

        // Budget
        this.extraInfoListFullRightText.push(this.proposal.improvementArguments.budget);
        this.extraInfoList.push({
          icon: "mdi-currency-eur",
          leftText: "Budget:",
          rightText: this.proposal.improvementArguments.budget,
        });

        // Roles
        this.extraInfoListFullRightText.push(this.proposal.improvementArguments.executionRoles);
        this.extraInfoList.push({
          icon: "mdi-account-multiple",
          leftText: "Roles:",
          rightText: this.proposal.improvementArguments.executionRoles,
        });

        // Timebasedconstraints
        this.extraInfoListFullRightText.push(this.proposal.improvementArguments.timeBasedConstraint);
        this.extraInfoList.push({
          icon: "mdi-calendar-range",
          leftText: "Time based constraints:",
          rightText: this.proposal.improvementArguments.timeBasedConstraint,
        });
      }

    }

    // Zorgt ervoor dat de items worden ingekort die ingekort moeten worden.
    this.extraInfoList.forEach(element => {
      this.showMoreshowLess(element);
    })

    this.hideExtraInfo();

  },
  methods: {
    navigateTo(to) {
      if (to) {
        this.$router.push(to);
      }
    },
    showMoreshowLess(item) {

      var indexInTheList = this.extraInfoList.indexOf(item);

      // Al gesliced.
      if(this.extraInfoList[indexInTheList].rightText.length === 53 && this.extraInfoListFullRightText[indexInTheList].length > 50){
        this.extraInfoList[indexInTheList].rightText = this.extraInfoListFullRightText[indexInTheList];
        //Veranderd de tekst van de button naar ^
        this.buttonText = "^";
      }
      // Nog niet gesliced.
      else if(this.extraInfoListFullRightText[indexInTheList].length > 50) {
        this.extraInfoList[indexInTheList].rightText = this.extraInfoList[indexInTheList].rightText.slice(0,50) + "...";
        //Veranderd de tekst van de button naar V
        this.buttonText = "V"
      }
    },
    hideExtraInfo() {
      const extraInfoContainer = document.getElementById('extraInfo');
      document.getElementById('buttonShow').innerText = extraInfoContainer.style.display !== 'none' ? 'Show more' : 'Show less';
      extraInfoContainer.style.display = extraInfoContainer.style.display !== 'none' ? 'none' : 'block';
    },
    getInitials(parseStr) {
      if (parseStr != undefined) {
        const nameList = parseStr.split(" ");
        let result = "";
        for (let index = 0; index < nameList.length; index++) {
          if (index < 3) {
            const element = nameList[index];
            result += element[0].toUpperCase();
          } else {
            break;
          }
        }
        return result;
      }
    },
  },
};
</script>

<style>
</style>
