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
    <v-container>
      <v-row>
        <v-col cols="12" md="7">
          <div class="text-h4 primary--text mt-4">stakeholder advice</div>
  
          <div v-for="(comment, i) in comments" :key="i">
            <v-card flat class="mt-2 rounded-lg">
              <v-card
                flat
                link
                @click="$router.push('/account/' + comment.account.username)"
              >
                <v-card-text class="py-2">
                  <div class="d-flex align-center">
                    <v-avatar color="primary" size="25" class="white--text mr-2"
                      ><small>{{
                        getInitials(comment.account.name)
                      }}</small></v-avatar
                    >
  
                    <div class="d-flex justify-space-between" style="width: 100%">
                      <div class="text-caption">{{ comment.account.name }}</div>
                      <div class="text-caption">
                        {{
                          new Date(
                            parseInt(comment.created) * 1000
                          ).toLocaleDateString(userLang, {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          })
                        }}
                      </div>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
  
              <v-divider></v-divider>
              <v-card-text>
                <div class="text-body-1">
                  {{ comment.comment }}
                </div></v-card-text
              >
            </v-card>
  
            <v-divider class="mt-4"></v-divider>
          </div>
  
          <div class="mt-4">
            <v-textarea
              outlined
              auto-grow
              label="Comment"
              rows="4"
              row-height="15"
              maxlength="1024"
              counter
            ></v-textarea>
            <div class="d-flex justify-end">
              <v-btn color="accent">Send</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </template>
  <script>
  export default {
    layout: "auton",
    data: () => ({
      autonId: null,
      proposalId: null,
      auton: null,
      proposal: null,
      submitter: null,
      comments: [],
      userLang: null,
    }),
    async mounted() {
      this.$nuxt.$emit("Auton-setPage", "proposals");
      this.userLang = navigator.language || navigator.userLanguage;
  
      const autonIdParam = this.$route.params.autonId.replaceAll("_", " ");
      const proposalIndex = parseInt(this.$route.params.proposalId) - 1;
  
      const autonIdWrapper = await this.$invoke("auton:getAutonIdByName", {
        name: autonIdParam,
      });
      
      if (autonIdWrapper.result === null) {
        this.auton = null;
        this.error = "Auton not found: " + autonIdParam;
      } else {
        this.autondId = autonIdWrapper.result.id;
        const autonWrapper = await this.$invoke("auton:getByID", {
          id: autonIdWrapper.result.id,
        });
        this.auton = autonWrapper.result;
        this.proposalId = this.auton.proposals[proposalIndex];
  
        const proposalWrapper = await this.$invoke("proposal:getByID", {
          id: this.proposalId,
        });
  
        this.proposal = proposalWrapper.result;
  
        const membershipId = this.proposal.membershipId;
        const membershipWrapper = await this.$invoke("membership:getByID", {
          id: membershipId,
        });
  
        const submitterId = membershipWrapper.result.accountId;
        const submitterWrapper = await this.$invoke("kalipoAccount:getByID", {
          id: submitterId,
        });
  
        this.submitter = submitterWrapper.result;
  
        for (let index = 0; index < this.proposal.comments.length; index++) {
          const commentId = this.proposal.comments[index];
          const commentWrapper = await this.$invoke("comment:getByID", {
            id: commentId,
          });
  
          
  
          const commentMembershipId = commentWrapper.result.membershipId;
          const commentMembershipWrapper = await this.$invoke(
            "membership:getByID",
            {
              id: commentMembershipId,
            }
          );
  
          const commentAccountId = commentMembershipWrapper.result.accountId;
          const commentAccountWrapper = await this.$invoke(
            "kalipoAccount:getByID",
            {
              id: commentAccountId,
            }
          );
          commentWrapper.result.membership = commentMembershipWrapper.result;
          commentWrapper.result.account = commentAccountWrapper.result;
          this.comments.push(commentWrapper.result);
        }
  
        
        
      }
    },
    methods: {
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
  <style scoped>
  .support-label-container {
    position: absolute;
    left: 0;
    top: 0;
  }
  .support-label {
    position: absolute;
    left: 0;
    transform: translateX(-50%);
    border-radius: 50% 50% 0;
  }
  </style>