<template>
  <div class="pa-4">
    <v-card
      link
      flat
      color="primary lighten-1"
      v-if="unlocked"
      @click="$router.push('/account_settings')"
    >
      <v-card-text>
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-avatar color="white" size="35"
              ><div class="text-caption">
                {{ getInitials(account.name) }}
              </div></v-avatar
            >
            <div class="white--text ml-2">
              <div class="text-body-caption">{{ account.name }}</div>
              <div class="text-caption">@{{ account.username }}</div>
            </div>
          </div>
          <v-btn fab x-small color="white" @click="lockAccount"
            ><v-icon color="primary lighten-1">mdi-lock-open</v-icon></v-btn
          >
        </div>
      </v-card-text>
    </v-card>
    <v-card
      link
      flat
      color="primary lighten-1"
      v-if="!unlocked"
      @click="$router.push('/wallet')"
    >
      <v-card-text>
        <div class="d-flex align-center justify-center text-h6 white--text">
          Sign-in
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "SignInButton",
  props: {
    account: {
      type: Object,
    },
  },
  computed: {
    unlocked() {
      return this.$store.state.wallet.unlocked;
    },
  },
  methods: {
    getInitials(parseStr) {
      if (parseStr != undefined) {
        const nameList = parseStr.split(" ");
        let result = "";
        for (let index = 0; index < nameList.length; index++) {
          if (index < 3) {
            const element = nameList[index];
            if (!element) {
              continue;
            }
            result += element[0].toUpperCase();
          } else {
            break;
          }
        }
        return result;
      }
    },
    lockAccount() {
      this.$store.commit("wallet/lock");
      this.$router.push("/wallet");
    },
  },
};
</script>

<style scoped></style>
