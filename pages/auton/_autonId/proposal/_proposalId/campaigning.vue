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
      <v-col cols="12" md="5">
        <ProposalMain
          v-if="proposal && submitter"
          :proposal="proposal"
          :submitter="submitter"
        ></ProposalMain>
      </v-col>
      <v-col cols="12" md="7">
        <!-- advies komt hier onder -->
        <v-card flat class="mt-0 rounded-lg mx-auto">
      <div class="mt-4" v-if="isStakeholder()">
        <v-card-text>Expert consult</v-card-text>
        <v-form v-model="formStake">
          <v-textarea 
          v-model="advice" 
           :rules="rules"
           label="Advice"
           outlined
           auto-grow
           rows="4"
           row-height="15"
           max-length="1024"
           counter
           ></v-textarea>

          <v-radio-group inline outlined v-model="opinion">
            <v-radio label="I agree" value="agree"></v-radio>
            <v-radio label="Neutral" value="neutral"></v-radio>
            <v-radio label="I disagree" value="disagree"></v-radio>
        </v-radio-group>
        <button type="button" class="v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default accent" @click="sendStakeholderExpertise()">
          Submit
        </button>
        <v-text></v-text>
        <AccountSign :transaction="this.transaction" :uri="this.uri"></AccountSign>
        </v-form>


      </div>
    </v-card>

    <div class="text-h4 primary--text mt-4">Expert advice</div>

    <div v-for="(comment, i) in stakeholderComments" :key="i">
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

        <div class="text-h4 primary--text mt-4">Dialogue</div>

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
import { NIL } from 'uuid';

export default {
  layout: "auton",
  data: () => ({
    autonId: null,
    proposalId: null,
    auton: null,
    proposal: null,
    submitter: null,
    comments: [],
    stakeholderComments:[],
    userLang: null,
    uri: null,
    advice: null,
    opinion: null,
    formStake : null,
    stakeholders: null,
    errors:{},
    rules: [
        value => {
          if (!value) {
            console.log(value);
            return true;
          }
          return 'You must enter advice.';
        }
      ],
    transaction:{
      moduleId : -1,
      assetId: 0,
      assets: {},
    },
  
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
        stakeholders: this.stakeholders,
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
//normale comments
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

      //stakeholder comments
      for (let index = 0; index < this.proposal.stakeholderComments.length; index++) {
        const commentId = this.proposal.stakeholderComments[index];
        const commentWrapper = await this.$invoke("comment:getByID", {
          id: commentId,
        });


        const commentAccountId = commentWrapper.result.membershipId;
        const commentAccountWrapper = await this.$invoke(
          "kalipoAccount:getByID",
          {
            id: commentAccountId,
          }
        );

        commentWrapper.result.account = commentAccountWrapper.result;
        this.stakeholderComments.push(commentWrapper.result);
      }
      
      
    }
  },
  methods: {
    getAccount() {
            return this.$store.state.wallet.account;
        },
    isStakeholder() {
      console.log(this.proposal)

      if(this.proposal == null) {
        return false
      }

      console.log(this);
      console.log(this.$store.state.wallet.account.accountId)
      console.log(this.getAccount().accountId)

            for (let i = 0; i < this.proposal.stakeholders.length; i++) {
                if (this.proposal.stakeholders[i].stakeholderId == this.getAccount().accountId) {
                  console.log("true")
                    return true;
                }
            }
            console.log("false")
            return false;
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
    sendStakeholderExpertise(){
      //hier moet de form opgestuurd worden naar de backend of info uit de form gehaald worden
      //test
      this.$emit('submit', this.advice);
      this.uri = `auton/autonnew/proposal/2/campaigning`;



      


      if(this.advice == null || this.opinion == null){
        alert("You must enter your advice and opinion");
      }else if(this.opinion == "neutral" || this.opinion == "disagree" || this.opinion == "agree"){
        console.log("Advice: "+ this.advice);
        console.log("Vote: " + this.opinion);
      }

      //haal proposal op
      const proposal = this.$invoke("proposal:getByID", {
        id: this.proposalId,
        stakeholders : this.stakeholders,
      });
      console.log(proposal);

      
      for(let i = 0; i< this.proposal.stakeholders.length; i++){
        //console.log(this.proposal.stakeholders[i]);
        if(this.accountId == this.proposal.stakeholders[i]){
          console.log("Je bent een stakeholder");
          //hier moet alles komen als je stakeholder bent
        }else{
          console.log("Geen stakeholder");
          //hieronder om te testen want ik ben geen stakeholder
          // this.proposal.stakeholders[0].advice = this.advice;
          // this.proposal.stakeholders[0].opinion = this.opinion;
        }
      }

      


      //hier komt de transactie
      const asset = {
        proposalId : this.proposalId,
        stakeholderId: this.proposal.stakeholders[0].stakeholderId,
        advice : this.advice,
        opinion : this.opinion,
      }

      this.transaction.moduleId = 1006;
      this.transaction.assetId = 1;
      this.transaction.assets = asset;

      console.log(asset);
      console.log(this.transaction);


      },
    sendData(){
      $nuxt.$emit

    },
    warn(message, event) {
    // now we have access to the native event
    if (event) {
      event.preventDefault()
    }
    alert(message + this.Advice  + this.Opinion)
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