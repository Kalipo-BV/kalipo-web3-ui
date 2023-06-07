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
  <div v-if="proposal">
    <v-card class="mt-4 rounded-lg" flat>
      <v-card elevation="0" link @click="toProposal">
        <v-card-text>
          <div class="d-flex">
            <div>
              <v-avatar color="primary" size="50px">
                <v-icon dark v-if="proposal.type == 'membership-invitation'"
                  >mdi-account-plus</v-icon
                >
              </v-avatar>
            </div>
            <div class="ml-4">
              <div class="text-body-1">{{ proposal.type }}</div>
              <div class="text-h4 primary--text">{{ proposal.title }}</div>
            </div>
          </div>
        </v-card-text>
      </v-card>
      <!-- New block for -->
      <v-divider></v-divider>

      <div class="d-flex align-center justify-space-between">
        <v-card
          elevation="0"
          link
          @click="$router.push('/account/' + proposal.submitter.username)"
        >
          <v-card-text>
            <div class="d-flex align-center">
              <v-avatar color="primary" size="28" class="white--text mr-2">{{
                getInitials(proposal.submitter.name)
              }}</v-avatar>
              <div class="text-body-1">{{ proposal.submitter.name }}</div>
            </div>
          </v-card-text>
        </v-card>

        <v-card elevation="0">
          <v-card-text>
            <v-chip>
              <v-avatar color="primary" class="white--text" left>
                {{ proposal.comments.length }}
              </v-avatar>
              <span v-if="proposal.comments.length == 1">comment</span>
              <span v-if="proposal.comments.length != 1">comments</span>
            </v-chip>
          </v-card-text>
        </v-card>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  props: ["proposal"],
  data: () => ({}),
  methods: {
    toProposal() {
      const status = this.proposal.status;
      let linkEnding = "";
      if (status == "CAMPAIGNING") {
        linkEnding = "/campaigning";
      } else if (status == "VOTING" || status == "DECIDED") {
        linkEnding = "/voting";
      } else if (status == "ENDED") {
        linkEnding = "/results";
      }
      const uri = `/auton/${this.$route.params.autonId}/proposal/${
        this.proposal.index + 1 + linkEnding
      }`;
      this.$router.push(uri);
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
