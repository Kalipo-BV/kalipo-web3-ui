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
    <v-card width="400">
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
        <v-text-field
          solo
          v-model="password"
          placeholder="Password"
          :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :error-messages="passwordErrorMessage"
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-btn
              block
              color=""
              @click="$nuxt.$emit('IAH-showSelection', account.id)"
              >Cancel
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              color="accent"
              @click="unlock"
              :disabled="passwordErrorMessage !== ''"
            >
              Login <v-icon small class="ml-1">mdi-lock-open</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import * as cryptography from "@liskhq/lisk-cryptography";

export default {
  props: ["account"],
  data: () => ({
    show1: false,
    password: "",
    passwordErrorMessage: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 12 || "Min 12 characters",
    },
  }),
  methods: {
    getInitials(parseStr) {
      const nameList = parseStr.split(" ");
      let result = "";
      for (let index = 0; index < nameList.length; index++) {
        const element = nameList[index];
        result += element[0].toUpperCase();
      }
      return result;
    },
    async unlock() {
      // console.log(this.account.crypt);
      // console.log(cryptography.parseEncryptedPassphrase(this.account.crypt));
      try {
        const decryptToLayerOneStr = cryptography.decryptPassphraseWithPassword(
          cryptography.parseEncryptedPassphrase(this.account.crypt),
          this.password
        );
        // console.log(decryptToLayerOneStr);

        const accountIdWrapper = await this.$invoke(
          "kalipoAccount:getAccountIdByLiskId",
          {
            id: this.account.address.toString("hex"),
          }
        );

        const accountWrapper = await this.$invoke("kalipoAccount:getByID", {
          id: accountIdWrapper.result.id,
        });

        const frontAccount = {
          accountId: accountIdWrapper.result.id,
          username: this.account.username,
          name: this.account.name,
          address: this.account.address,
          publicKey: this.account.publicKey,
          memberships: accountWrapper.result.memberships,
          socials: accountWrapper.result.socials,
          crypt: decryptToLayerOneStr,
        };

        const liskAuthAccount = {
          address: Buffer.from(this.account.address, "hex"),
          publicKey: Buffer.from(this.account.publicKey, "hex"),
          crypt: decryptToLayerOneStr,
        };

        this.$setAuthAccount(liskAuthAccount);

        this.$store.commit("wallet/unlock", frontAccount);
        this.$router.push("/dashboard");

        // const decrypted = cryptography.decryptPassphraseWithPassword(
        //   JSON.parse(decryptToLayerOneStr),
        //   "123456"
        // );
        // console.log(decrypted);
      } catch (error) {
        console.log(error);
        this.passwordErrorMessage = "Entered password is not correct!";
        setTimeout(() => {
          this.passwordErrorMessage = "";
        }, 3000);
      }
    },
  },
};
</script>
