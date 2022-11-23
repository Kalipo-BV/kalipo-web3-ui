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
  <v-container class="text-center master">
    <div v-if="!error">
      <div class="d-flex justify-center align-center">
        <div class="" v-if="encrypting">
          <v-avatar color="accent"
            ><v-icon dark large>mdi-shield-key</v-icon></v-avatar
          >
        </div>
        <div class="fly-animation" v-if="!encrypting">
          <v-avatar color="accent"
            ><v-icon dark large>mdi-cube-outline</v-icon></v-avatar
          >
        </div>
      </div>

      <div class="text-h4 mt-4" v-if="encrypting">Encrypting account</div>
      <div class="text-h4 mt-4" v-if="!encrypting">Creating account</div>
      <div class="text-body-caption mt-1" v-if="encrypting">AES-256</div>
      <div class="text-body-caption mt-1" v-if="!encrypting">
        Waiting for next block
      </div>

      <div class="d-flex align-center justify-center mt-4 px-6">
        <v-progress-linear
          color="accent"
          indeterminate
          rounded
          height="4"
        ></v-progress-linear>
      </div>
    </div>

    <div v-if="error">
      <div class="text-h4 error--text">{{ errorMessage }}</div>
    </div>
  </v-container>
</template>

<script>
export default {
  props: [
    "passphrase",
    "publicKey",
    "address",
    "username",
    "name",
    "pin",
    "crypt",
  ],
  data() {
    return {
      encrypting: true,
      error: false,
      errorMessage: "",
      retriesLeft: 5,
    };
  },
  created() {
    const that = this;
    this.$nuxt.$on("IAH-triggerCreateAccountComplete", function ($event) {
      that.handleCreation();
      that.encrypting = false;
    });
  },
  async mounted() {
    console.log(Buffer.from(this.address).toString("hex"));
    const create = await this.$invoke("kalipoAccount:registerNewAccount", {
      accountAddress: Buffer.from(this.address).toString("hex"),
    });

    this.$nuxt.$emit("IAH-triggerCreateAccount");
  },
  methods: {
    async handleCreation() {
      this.$setAuthAccount({
        address: this.address,
        publicKey: this.publicKey,
        crypt: this.crypt,
      });

      try {
        const asset = {
          username: this.username,
          name: this.name,
        };
        const transaction = await this.$createTransaction(
          1001,
          1,
          asset,
          this.pin,
          false
        );

        if (!transaction.error) {
          this.$nuxt.$emit("IAH-setCreatedAccountAsUnlocked");
        } else {
          this.retriesLeft--;
          if (this.retriesLeft === 0) {
            this.error = true;
            this.errorMessage = transaction.stack;
          } else {
            if (this.retriesLeft > 0) {
              const that = this;

              setTimeout(async () => {
                that.handleCreation();
              }, 3000);
            }
          }
        }
      } catch (error) {
        console.log(error);
        this.retriesLeft--;
        if (this.retriesLeft === 0) {
          this.error = true;
          this.errorMessage = result.stack;
        } else {
          if (this.retriesLeft > 0) {
            const that = this;
            setTimeout(async () => {
              that.handleCreation();
            }, 3000);
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.rotate-animation {
  transform: rotate(360deg);
  transition-duration: 2s;
}
.fly-animation {
  animation: fly-animation ease-in-out 2s forwards;
  animation-iteration-count: infinite;
}
@keyframes fly-animation {
  0% {
    transform: translateX(-3vw);
    opacity: 0;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(3vw);
    opacity: 0;
  }
}
</style>
