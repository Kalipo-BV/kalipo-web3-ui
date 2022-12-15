<template>
  <v-container>
    <v-card width="500">
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
      <div v-if="step == 0">
        <v-card-text>
          <div class="text-h4 primary--text d-flex justify-center mt-2">
            Login
          </div>
          <div
            class="text-body-1 primary--text d-flex justify-center mt-2 text-center"
          >
            <div style="max-width: 300px">
              Please provide your username and password.
            </div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="pb-0">
          <v-text-field
            v-model="username"
            class="mt-6"
            label="Username"
            solo
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            solo
            :type="show1 ? 'text' : 'password'"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-card-text>
      </div>

      <div v-if="step == 1">
        <v-card-text>
          <div class="text-h4 primary--text d-flex justify-center mt-2">
            Login
          </div>
          <div
            class="text-body-1 primary--text d-flex justify-center mt-2 text-center"
          >
            <div style="max-width: 300px">Please provide your PIN.</div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-otp-input
            v-model="pinInput"
            :type="show ? 'text' : 'password'"
            length="6"
          ></v-otp-input>
          <div class="d-flex justify-center">
            <v-btn @click="show = !show"
              ><v-icon v-text="show ? 'mdi-eye' : 'mdi-eye-off'"></v-icon
            ></v-btn></div
        ></v-card-text>
      </div>

      <v-divider class="my-4"></v-divider>
      <v-row>
        <v-col>
          <div class="d-flex justify-end ml-4 mr-4">
            <v-btn v-if="step == 0" block color="accent" @click="step++">
              Login <v-icon small class="ml-1">mdi-lock-open</v-icon>
            </v-btn>
            <v-btn v-if="step == 1" block color="accent" @click="unlock">
              Sign <v-icon small class="ml-1">mdi-draw-pen</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      step: 0,
      show: false,
      show1: false,
      username: "",
      password: "",
      pinInput: "",
    };
  },
  methods: {
    async unlock() {
      // first we need to check if username and password match

      // first we need to decrypt the passphrase with password

      const accountIdWrapper = await this.$invoke(
        "kalipoAccount:getAccountIdByUsername",
        {
          username: this.username,
        }
      );

      console.log(accountIdWrapper);
    },
  },
};
</script>
