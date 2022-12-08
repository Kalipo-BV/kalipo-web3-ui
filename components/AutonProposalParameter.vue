
<template>
  <div>
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
              <v-avatar color="primary" size="25" class="white--text mr-2" v-if="item.icon">
                <v-icon dark x-small>{{ item.icon }}</v-icon>
              </v-avatar>

              <div class="d-flex justify-space-between" style="width: 100%">
                <div class="text-caption font-weight-medium">
                  {{ item.leftText }}
                </div>
                <div class="text-caption">
                  {{ item.rightText }}
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-card>
  </div>
</template>
  
<script>
export default {
  computed: {
    account() {
      return this.$store.state.wallet.account;
    }
  },
  props: ["submitter", "selectedProposalType"],
  data: () => ({
    autonId: null,
    auton: null,
    proposal: null,
    proposalId: null,
    list: [],
    userLang: null,
    mainPath: null,
    step: 1,
    provision: null,
  }),
  async mounted() {
    console.log("account ", this.account)
    this.$nuxt.$emit("Auton-setPage", "proposals");
    this.userLang = navigator.language || navigator.userLanguage;

    const autonIdParam = this.$route.params.autonId.replaceAll("_", " ");
    // const proposalIndex = parseInt(this.$route.params.proposalId) - 1;

    const autonIdWrapper = await this.$invoke("auton:getAutonIdByName", {
      name: autonIdParam,
    });

    if (autonIdWrapper.result === null) {
      this.auton = null;
      this.error = "Auton not found: " + autonIdParam;
    } else {
      this.autonId = autonIdWrapper.result.id;

      const autonWrapper = await this.$invoke("auton:getByID", {
        id: autonIdWrapper.result.id,
      });

      this.auton = autonWrapper.result;
      // const hello =  this.auton.constitution[1].provisions

      // for(let i=0; i< hello.length; i++){
      //   console.log("hei" ,hello[i])
      // }
      // this.proposalId = this.auton.proposals[proposalIndex];
      // this.transaction.assets.proposalId = this.proposalId;

      const provisionWrapper = await this.$invoke("auton:getProvisionByID",{
        id: this.auton.constitution[1].provisions[0]
      });
      console.log(provisionWrapper);

      this.provision = provisionWrapper.result;

      console.log( "hi", this.provision);
      // const proposalWrapper = await this.$invoke("proposal:getByID", {
      //   id: this.proposalId,
      // });

      // this.proposal = proposalWrapper.result;
    }
    this.list.push({
      icon: "mdi-calendar-lock-open",
      leftText: "Start date/time:" ,
      rightText: new Date(
      ).toLocaleDateString(this.userLang, {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    });

    this.list.push({
      icon: "mdi-calendar-lock",
      leftText: "End date/time:",
      rightText: new Date(
        Date.now() + (60 * 10)
      ).toLocaleDateString(this.userLang, {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    });
    
    this.list.push({
      icon: "mdi-account-check",
      leftText: "Eligible voter:",
      rightText: "Full members and affiliated members",
    });

    this.list.push({
      icon: "mdi-account-box-multiple-outline",
      leftText: "Voting window:",
      rightText: this.provision.votingWindow,
    });

    this.list.push({
      icon: "mdi-account-group",
      leftText: "Quorum:",
      rightText: this.provision.attendance,
    });

    this.list.push({
      icon: "mdi-human-male-board-poll",
      leftText: "% support:",
      rightText: this.provision.acceptance,
    });

    this.list.push({
      icon: "mdi-bank",
      leftText: "Proposal type:",
      rightText: this.selectedProposalType,
    });
  },
  methods: {
    navigateTo(to) {
      if (to) {
        this.$router.push(to);
      }
    },
    //   getInitials(parseStr) {
    //     if (parseStr != undefined) {
    //       const nameList = parseStr.split(" ");
    //       let result = "";
    //       for (let index = 0; index < nameList.length; index++) {
    //         if (index < 3) {
    //           const element = nameList[index];
    //           result += element[0].toUpperCase();
    //         } else {
    //           break;
    //         }
    //       }
    //       return result;
    //     }
    //   },
  },
};
</script>
  
<style>

</style>