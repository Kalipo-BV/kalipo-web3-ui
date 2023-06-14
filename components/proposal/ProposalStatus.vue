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
      style="background-color: #eef1f5;"
      flat
      v-model="step"
    >
      <v-stepper-header class="py-2">
        <v-stepper-step
          step="1"
          color="accent"
          :complete="proposal.status != 'CAMPAIGNING'"
          @click="$router.push(mainPath + 'campaigning')"
          class="hover-effect"
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
          class="hover-effect"
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
          class="hover-effect"
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
  </div>
</template>

<script>
export default {
  props: ["proposal"],
  data: () => ({
    standardAttributeList: [],
    extraInfoList: [],
    extraInfoListFullRightText: [],
    list: [],
    userLang: null,
    mainPath: null,
    step: 1,
  }),
  async mounted() {
    const autonIdParam = this.$route.params.autonId.replaceAll("_", " ");
    const proposalIndexPlusOne = parseInt(this.$route.params.proposalId);
    this.mainPath = `/auton/${autonIdParam}/proposal/${proposalIndexPlusOne}/`;

    if (
      this.proposal != null &&
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
    }


  },
  methods: {
    navigateTo(to) {
      if (to) {
        this.$router.push(to);
      }
    },
  },
};
</script>

<style>
  .hover-effect:hover {
    cursor: pointer;
  }

  .hover-effect:hover > div > div {
    color: #0a75f3 !important;
  }

  .hover-effect:hover > div > div > small {
    color: #0a75f3 !important;
  }

  .hover-effect:hover > span {
    background-color: #212a42 !important;
  }
</style>
