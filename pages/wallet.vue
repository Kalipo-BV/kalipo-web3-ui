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
  <v-container style="height: 100%">
    <div class="d-flex align-center justify-center" style="height: 100%">
      <AccountSelection
        class="mt-4"
        :accounts.sync="accounts"
        v-if="screen == 'AccountSelection'"
        :progress="showProgress"
      ></AccountSelection>

      <AccountUnlock
        :account="getAccount()"
        class="mt-4"
        v-if="screen == 'AccountUnlock'"
      ></AccountUnlock>

      <div v-if="screen == 'ChooseOperation'">
        <div class="d-flex align-center mb-4">
          <v-btn fab x-small @click="showSelection" class="mr-2"
            ><v-icon>mdi-arrow-left</v-icon></v-btn
          >
          <div class="text-h4 primary--text">Save an account</div>
        </div>

        <div class="d-flex align-center justify-center">
          <div>
            <OptionCard
              icon="mdi-card-account-details-star"
              title="Add existing account"
              class="mr-2"
              :width="xs || sm ? '140px' : '185px'"
            ></OptionCard>
          </div>

          <div @click="showPassphrase(true)">
            <OptionCard
              icon="mdi-account-plus"
              title="Create new account"
              :width="xs || sm ? '140px' : '185px'"
            ></OptionCard>
          </div>
        </div>
      </div>

      <AccountSign class="mt-4" v-if="screen == 'AccountSign'"></AccountSign>

      <AccountPassphrase
        class="mt-4"
        :passphrase="accountToBeCreated.passphrase"
        v-if="screen == 'AccountPassphrase'"
      ></AccountPassphrase>

      <AccountProfile
        class="mt-4"
        v-if="screen == 'AccountProfile'"
        :name.sync="accountToBeCreated.name"
        :username.sync="accountToBeCreated.username"
      ></AccountProfile>

      <AccountEncryptionPassword
        class="mt-4"
        v-if="screen == 'AccountEncryptionPassword'"
        :password.sync="accountToBeCreated.password"
      ></AccountEncryptionPassword>

      <AccountEncryptionPin
        class="mt-4"
        v-if="screen == 'AccountEncryptionPin'"
        :pin.sync="accountToBeCreated.pin"
      ></AccountEncryptionPin>

      <AccountCreation
        v-if="screen == 'AccountCreation'"
        :passphrase="accountToBeCreated.passphrase"
        :publicKey="accountToBeCreated.publicKey"
        :address="accountToBeCreated.address"
        :username="accountToBeCreated.username"
        :name="accountToBeCreated.name"
        :crypt="accountToBeCreated.crypt"
        :pin="accountToBeCreated.pin"
      ></AccountCreation>
      <AccountCreationSuccess
        v-if="screen == 'AccountCreationSuccess'"
      ></AccountCreationSuccess>
    </div>
  </v-container>
</template>
<script>
import { Mnemonic } from "@liskhq/lisk-passphrase";
import * as cryptography from "@liskhq/lisk-cryptography";

export default {
  layout: "wallet",
  computed: {
    xs() {
      return this.$vuetify.breakpoint.xs;
    },
    sm() {
      return this.$vuetify.breakpoint.sm;
    },
    md() {
      return this.$vuetify.breakpoint.md;
    },
  },
  data: () => ({
    screen: "AccountSelection",
    selectedId: "",
    accounts: {},
    showProgress: false,
    accountToBeCreated: {
      publicKey: "",
      address: "",
      name: "",
      username: "",
      passphrase: "",
      password: "",
      pin: "",
      crypt: null,
    },
  }),
  created() {
    this.$nuxt.$on("IAH-showSelection", ($event) => this.showSelection($event));
    this.$nuxt.$on("IAH-showUnlock", ($event) => this.showUnlock($event));
    this.$nuxt.$on("IAH-showPassphrase", ($event) =>
      this.showPassphrase($event)
    );
    this.$nuxt.$on("IAH-showChooseOperation", ($event) =>
      this.showChooseOperation($event)
    );
    this.$nuxt.$on("IAH-showEncryptionPassword", ($event) =>
      this.showEncryptionPassword($event)
    );
    this.$nuxt.$on("IAH-showProfile", ($event) => this.showProfile($event));
    this.$nuxt.$on("IAH-showEncryptionPin", ($event) =>
      this.showEncryptionPin($event)
    );

    this.$nuxt.$on("IAH-deleteAccount", ($event) =>
      this.deleteFromLocalStorage($event)
    );

    this.$nuxt.$on("IAH-triggerCreateAccount", ($event) =>
      this.triggerCreateAccount($event)
    );

    this.$nuxt.$on("IAH-showCreation", ($event) => this.showCreation($event));

    this.$nuxt.$on("IAH-showCreationSuccess", ($event) =>
      this.showCreationSuccess($event)
    );
    this.$nuxt.$on("IAH-setCreatedAccountAsUnlocked", ($event) =>
      this.setCreatedAccountAsUnlocked($event)
    );
  },
  mounted: function () {
    this.$nuxt.$emit("MainMenu-setPage", "wallet");

    const kalipoAccouunts = localStorage.getItem("kalipo-accounts");
    let localData = JSON.parse(kalipoAccouunts);
    if (localData == null) {
      localData = {};
    }
    this.accounts = localData;
    console.log(
      cryptography
        .getAddressFromPassphrase(
          "inquiry reward link apart knife time cable foam alpha town invest illegal"
        )
        .toString("hex")
    );
  },
  methods: {
    getAccount() {
      return this.accounts[this.selectedId];
    },
    setAccountProperty(id, prop, value) {
      for (let index = 0; index < this.accounts.length; index++) {
        const element = this.accounts[index];

        if (element.id === id) {
          element[prop] = value;
          this.accounts[index] = element;
          return element;
        }
      }
    },
    showSelection(id) {
      this.selectedId = id;
      this.screen = "AccountSelection";
    },
    triggerCreateAccount() {
      this.createNewAccount(this.accountToBeCreated, this.toLocalStorage);

      // setTimeout(() => {
      //   this.createNewAccount(this.accountToBeCreated, this.toLocalStorage);
      //   this.showProgress = false;
      // }, 100);
    },
    showUnlock(id) {
      this.selectedId = id;
      this.screen = "AccountUnlock";
    },
    showChooseOperation(id) {
      this.screen = "ChooseOperation";
    },
    showPassphrase(regenerate) {
      if (regenerate) {
        this.accountToBeCreated.passphrase = Mnemonic.generateMnemonic();

        const { address, publicKey } =
          cryptography.getAddressAndPublicKeyFromPassphrase(
            this.accountToBeCreated.passphrase
          );
        this.accountToBeCreated.address = address;
        this.accountToBeCreated.publicKey = publicKey;

        this.accountToBeCreated.password = "";
        this.accountToBeCreated.username = "";
        this.accountToBeCreated.name = "";
        this.accountToBeCreated.pin = "";
      }
      this.screen = "AccountPassphrase";
    },
    showEncryptionPassword() {
      this.screen = "AccountEncryptionPassword";
    },
    addExistingAccount() {},
    showProfile() {
      console.log(this.accountToBeCreated);
      this.screen = "AccountProfile";
    },
    showEncryptionPin() {
      this.screen = "AccountEncryptionPin";
    },
    showCreation() {
      this.screen = "AccountCreation";
    },
    showCreationSuccess() {
      this.screen = "AccountCreationSuccess";
    },
    async setCreatedAccountAsUnlocked() {
      const that = this;
      setTimeout(async () => {
        const accountIdWrapper = await that.$invoke(
          "kalipoAccount:getAccountIdByLiskId",
          {
            id: that.accountToBeCreated.address.toString("hex"),
          }
        );

        console.log(accountIdWrapper);

        const account = await that.$invoke("kalipoAccount:getByID", {
          id: accountIdWrapper.result.id,
        });
        console.log(account);

        const frontAccount = {
          accountId: accountIdWrapper.result.id,
          username: that.accountToBeCreated.username,
          name: that.accountToBeCreated.name,
          address: that.accountToBeCreated.address,
          publicKey: that.accountToBeCreated.publicKey,
          memberships: account.result.memberships,
          socials: account.result.socials,
        };

        console.log(frontAccount);

        that.$store.commit("wallet/add", frontAccount);
        that.$store.commit("wallet/unlock", frontAccount);
        that.showCreationSuccess();
      }, 10000);
    },
    deleteFromLocalStorage(publicKey) {
      console.log(publicKey);
      const kalipoAccouunts = localStorage.getItem("kalipo-accounts");
      let localData = JSON.parse(kalipoAccouunts);
      if (localData == null) {
        localData = {};
      }

      delete localData[publicKey];
      delete this.accounts[publicKey];
      console.log("OUI");
      console.log(this.accounts);

      const localDataStr = JSON.stringify(localData);
      localStorage.setItem("kalipo-accounts", localDataStr);

      let test = localStorage.getItem("kalipo-accounts");
      console.log(JSON.parse(test));
    },
    toLocalStorage(account) {
      const kalipoAccouunts = localStorage.getItem("kalipo-accounts");
      let localData = JSON.parse(kalipoAccouunts);
      if (localData == null) {
        localData = {};
      }
      localData[account.publicKey] = account;
      this.accounts[account.publicKey] = account;
      const localDataStr = JSON.stringify(localData);
      localStorage.setItem("kalipo-accounts", localDataStr);

      let test = localStorage.getItem("kalipo-accounts");
      console.log(JSON.parse(test));
    },
    async createNewAccount(accountToBeCreated, toLocalStorage) {
      console.log("encryption triggered");

      // Pin(Passphrase)
      const encryptedLayerOne = cryptography.encryptPassphraseWithPassword(
        accountToBeCreated.passphrase,
        accountToBeCreated.pin,
        5000
      );
      encryptedLayerOne.layer = 1;
      const encryptedLayerOneStr = JSON.stringify(encryptedLayerOne);
      this.accountToBeCreated.crypt = encryptedLayerOneStr;

      console.log(encryptedLayerOne);

      // Password(Pin(Passphrase))
      const encryptedLayerTwo = cryptography.encryptPassphraseWithPassword(
        encryptedLayerOneStr,
        accountToBeCreated.password,
        5000
      );
      encryptedLayerTwo.layer = 2;

      console.log(encryptedLayerTwo);

      const decryptToLayerOneStr = cryptography.decryptPassphraseWithPassword(
        encryptedLayerTwo,
        accountToBeCreated.password
      );
      console.log(decryptToLayerOneStr);
      const decryptToLayerOneObj = JSON.parse(decryptToLayerOneStr);
      const decryptToPassphrase = cryptography.decryptPassphraseWithPassword(
        decryptToLayerOneObj,
        accountToBeCreated.pin
      );

      const persistAccount = {};
      persistAccount.username = accountToBeCreated.username;
      persistAccount.name = accountToBeCreated.name;
      persistAccount.publicKey = cryptography.bufferToHex(
        accountToBeCreated.publicKey
      );
      persistAccount.address = cryptography.bufferToHex(
        accountToBeCreated.address
      );
      persistAccount.crypt =
        cryptography.stringifyEncryptedPassphrase(encryptedLayerTwo);

      toLocalStorage(persistAccount);
      this.$nuxt.$emit("IAH-triggerCreateAccountComplete");
    },
  },
};
</script>