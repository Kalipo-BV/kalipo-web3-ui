
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
    proposal: null,
    list: [],
    userLang: null,
    mainPath: null,
    step: 1,
  }),
  async mounted() {
    console.log("account ", this.account)
    this.$nuxt.$emit("Auton-setPage", "proposals");
    this.userLang = navigator.language || navigator.userLanguage;

    const autonIdParam = this.$route.params.autonId.replaceAll("_", " ");
    const proposalIndex = parseInt(this.$route.params.proposalId) - 1;

    this.userLang = navigator.language || navigator.userLanguage;
    this.list.push({
      icon: "mdi-calendar",

      leftText: "Submission:",
      rightText: new Date(
        // parseInt(this.proposal.created) * 1000
      ).toLocaleDateString(this.userLang, {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    });

    this.list.push({
      icon: "mdi-account",
      leftText: "Proposer:",
      rightText: "@" + this.account.username,
      link: "/account/" + this.account.username,
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