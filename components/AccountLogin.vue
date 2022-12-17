<template>
  <v-container>
    <v-card width="800">
      <v-btn
        fab
        outlined
        absolute
        x-small
        right
        class="mt-3 mr-n1"
        @click="$nuxt.$emit('IAH-showChooseOperation')"
        ><v-icon>mdi-close</v-icon></v-btn
      >
      <v-stepper v-model="step" alt-labels>
        <v-stepper-header>
          <v-stepper-step color="accent" :complete="step > 1" :step="1" :key="1"
            >Passphrase</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step color="accent" :complete="step > 2" :step="2" :key="2"
            >Encrypt</v-stepper-step
          >
          <v-divider></v-divider>
          <v-stepper-step color="accent" :step="3" :key="3">PIN</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content :step="1">
            <!-- Step 1 content goes here -->
            <v-card-text>
              <div
                class="text-body-1 primary--text d-flex justify-center text-center"
              >
                <div style="max-width: 400px">
                  Please provide your passphrase from your Lisk account.
                </div>
              </div>
            </v-card-text>
            <v-card-text>
              <v-row>
                <v-col
                  cols="4"
                  md="2"
                  v-for="(word, index) in words"
                  :key="index"
                >
                  <v-text-field
                    filled
                    :label="index + 1 + '.'"
                    v-model="words[index]"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text>
              <v-row
                ><v-spacer></v-spacer
                ><v-btn
                  class="mr-2"
                  color="accent"
                  @click="retreiveAccountByPassphrase"
                  >Next</v-btn
                ></v-row
              >
            </v-card-text>
          </v-stepper-content>
          <v-stepper-content :step="2">
            <!-- Step 2 content goes here -->
            <v-card-text>
              <div
                class="text-body-1 primary--text d-flex justify-center text-center"
              >
                <div style="max-width: 400px">
                  Please encrypt your passphrase with a secure password. This
                  password will be saved on this device.
                </div>
              </div></v-card-text
            >
            <v-card-text class="pb-0">
              <v-text-field
                disabled
                solo
                hint="Is this username not yours? Go back and check your passphrase."
                persistent-hint
                :value="username"
              ></v-text-field>
              <v-text-field
                v-model="password"
                class="mt-2"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                solo
              ></v-text-field>
            </v-card-text>
            <v-card-text>
              <v-row>
                <v-btn @click="step = 1" class="ml-2">Back</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="accent" @click="step = 3" class="mr-2"
                  >Next</v-btn
                >
              </v-row>
            </v-card-text>
          </v-stepper-content>
          <v-stepper-content :step="3">
            <!-- Step 3 content goes here -->
            <v-card-text>
              <div
                class="text-body-1 primary--text d-flex justify-center text-center"
              >
                <div style="max-width: 400px">
                  Your passphrase is also protected by a PIN. This PIN is used
                  to sign all transactions.
                </div>
              </div>
            </v-card-text>
            <v-card-text>
              <v-otp-input
                v-model="pin"
                :type="show ? 'text' : 'password'"
                length="6"
              ></v-otp-input>
              <div class="d-flex justify-center">
                <v-btn @click="show = !show"
                  ><v-icon v-text="show ? 'mdi-eye' : 'mdi-eye-off'"></v-icon
                ></v-btn>
              </div>
            </v-card-text>
            <v-card-text
              ><v-row>
                <v-btn @click="step = 2" class="ml-2">Back</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="accent" @click="addNewAccount" class="mr-2">
                  Sign <v-icon small class="ml-1">mdi-draw-pen</v-icon>
                </v-btn></v-row
              ></v-card-text
            >
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-container>
</template>
<script>
import * as cryptography from "@liskhq/lisk-cryptography";

export default {
  data() {
    return {
      step: 1,
      show: false,
      showPassword: false,
      pin: "",
      username: "No account retrieved!",
      password: "",
      pinInput: "",
      words: [
        "design",
        "top",
        "hello",
        "neutral",
        "frequent",
        "quit",
        "jazz",
        "woman",
        "conduct",
        "search",
        "tragic",
        "live",
      ],
      frontAccToAdd: {},
      show: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 12 || "Min 12 characters",
        max: (v) => v.length <= 256 || "Max 256 characters",
      },
    };
  },
  methods: {
    async retreiveAccountByPassphrase() {
      console.log("retreiveAccountByPassphrase");

      // get address and pk from passphrase user fills in
      const addressAndPublicKeyFromPassphrase =
        cryptography.getAddressAndPublicKeyFromPassphrase(this.words.join(" "));

      // get Kalipo acc ID from Lisk address
      const kalipoAccountIdByLiskIdFromPassphrase = await this.$invoke(
        "kalipoAccount:getAccountIdByLiskId",
        {
          id: addressAndPublicKeyFromPassphrase.address.toString("hex"),
        }
      );

      // Kalipo account
      const kalipoAccount = await this.$invoke("kalipoAccount:getByID", {
        id: kalipoAccountIdByLiskIdFromPassphrase.result.id,
      });

      // set all front end Kalipo acc information
      this.frontAccToAdd = {
        accountId: kalipoAccountIdByLiskIdFromPassphrase.result.id,
        username: kalipoAccount.result.username,
        name: kalipoAccount.result.name,
        address: addressAndPublicKeyFromPassphrase.address,
        publicKey: addressAndPublicKeyFromPassphrase.publicKey,
        memberships: kalipoAccount.result.memberships,
        socials: kalipoAccount.result.socials,
      };

      // set retrieved username
      this.username = kalipoAccount.result.username;

      // set step to two
      this.step = 2;
    },
    async addNewAccount() {
      // Pin(Passphrase)
      const encryptedLayerOne = cryptography.encryptPassphraseWithPassword(
        this.words.join(" "),
        this.pin,
        5000
      );
      encryptedLayerOne.layer = 1;
      const encryptedLayerOneStr = JSON.stringify(encryptedLayerOne);
      this.frontAccToAdd.crypt = encryptedLayerOneStr;

      // Password(Pin(Passphrase))
      const encryptedLayerTwo = cryptography.encryptPassphraseWithPassword(
        encryptedLayerOneStr,
        this.password,
        5000
      );
      encryptedLayerTwo.layer = 2;

      const persistAccount = {};
      persistAccount.username = this.frontAccToAdd.username;
      persistAccount.name = this.frontAccToAdd.name;
      persistAccount.publicKey = cryptography.bufferToHex(
        this.frontAccToAdd.publicKey
      );
      persistAccount.address = cryptography.bufferToHex(
        this.frontAccToAdd.address
      );
      persistAccount.crypt =
        cryptography.stringifyEncryptedPassphrase(encryptedLayerTwo);

      // Add account to local storage using parent method
      this.$parent.toLocalStorage(persistAccount);

      // Push user to account selection
      this.$nuxt.$emit("IAH-showSelection");
    },
  },
};
</script>
