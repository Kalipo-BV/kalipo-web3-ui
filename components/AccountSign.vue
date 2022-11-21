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
    <v-card v-if="unlocked && (!isSigning || error)">
      <v-card-text>
        <div class="d-flex justify-center">
          <div>
            <div class="text-h4 primary--text d-flex justify-center">
              <v-avatar color="accent" class="white--text">{{
                getInitials(account.name)
              }}</v-avatar>
            </div>
            <div class="text-h4 primary--text d-flex justify-center mt-2">
              {{ account.name }}
            </div>
          </div>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <v-otp-input type="password" v-model="pin"></v-otp-input>
        <div class="text-caption error--text">{{ error }}</div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-btn block color="" @click="prev">Cancel </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              color="accent"
              @click="sign"
              :disabled="pin.length !== 6 || disabled"
            >
              Sign <v-icon small class="ml-1">mdi-draw-pen</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card v-if="isSigning && error == null" class="py-6">
      <WaitingAnimation
        subtitle="Waiting for next block"
        :title="title"
      ></WaitingAnimation>
    </v-card>

    <v-card v-if="!unlocked" class="py-6">
      <v-card-text>
        <div class="d-flex justify-center error--text">
          No account logged in
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  props: ["transaction", "uri", "title", "callback", "callbackFinish"],
  data: () => ({
    isSigning: false,
    pin: "",
    error: null,
    disabled: false,
  }),
  computed: {
    account() {
      return this.$store.state.wallet.account;
    },
    unlocked() {
      return this.$store.state.wallet.unlocked;
    },
  },
  methods: {
    prev() {
      this.error = null;
      this.disabled = false;
      this.$nuxt.$emit(this.callback, true);
    },
    async sign() {
      this.isSigning = true;
      console.log("SIGNING");
      console.log(this.transaction);
      const moduleId = this.transaction.moduleId;
      const assetId = this.transaction.assetId;
      const asset = this.transaction.assets;
      const pin = this.pin;
      const displayNotificationOnError = false;

      const transactionWrapper = await this.$createTransaction(
        moduleId,
        assetId,
        asset,
        pin,
        displayNotificationOnError
      );

      console.log(transactionWrapper);
      if (!transactionWrapper.error && transactionWrapper.result.success) {
        const transactionId = Buffer.from(
          transactionWrapper.result.message.transactionId,
          "hex"
        );
        const transaction = await this.$invokeWithRetry(
          "app:getTransactionByID",
          { id: transactionId }
        );

        if (transaction != null && !transaction.error) {
          console.log("OUI");
          if (this.callbackFinish != null) {
            this.$nuxt.$emit(this.callbackFinish, true);
          }
          this.$router.push(this.uri);
        }
      } else {
        if (transactionWrapper.error) {
          this.error = "This PIN seems not to work";
        } else {
          this.error = transactionWrapper.result.message;
          this.disabled = true;
        }
      }
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
