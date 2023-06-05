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
  <v-container width="90%">
    <h1 style="margin-bottom: 10px; text-align: center;">Edit Template (Grant Contract)</h1>
    <v-form ref="form">
      <div class="text-h2 pb-2">Agreement parties</div>
      <v-card style="padding:12px 12px 20px 12px">
        <PartyMemberProvision isContractor partyName="contractor"/>
        <PartyMemberProvision partyName="client"/>
      </v-card>
      
      <div class="text-h2 pt-2 pb-2 mt-5">Preamples</div>
      <v-card>
        <PreampleProvision />
      </v-card>

      <div class="text-h2 mt-6">Provision types</div>
      <div class="text-h3">Contract title</div>
      <v-card class="mb-4">
        <TitleProvision />
      </v-card>

      <div class="text-h3">Purpose</div>
      <v-card class="mb-4">
        <PurposeProvision />
      </v-card>

      <div class="text-h3">Desc. of product/service</div>
      <v-card class="mb-4">
        <ProductDescriptionProvision />
      </v-card>

      <div class="text-h3">Payment provisions</div>
      <PaymentProvision />

      <div class="text-h3">Date provisions</div>
      <v-card class="mt-4 mb-2" style="padding: 12px;">
        <DateTimeProvision />
      </v-card>

      <div class="text-h3 mb-2 mt-2">Property rights</div>
      <v-card>
        <PropertyRightsProvision />
      </v-card>

      <div class="text-h3 mb-2 mt-2">Termination of agreement</div>
      <v-card>
        <TerminationOfAgreement />
      </v-card>

      <div class="text-h3 mb-2 mt-2">Applicable laws & regulations</div>
      <v-card>
        <GoverningLawAndJurisdictionProvision />
      </v-card>

      <div class="text-h3 mb-2 mt-2">Final provisions</div>
      <v-card>
        <FinalProvisions />
      </v-card>

      <div class="text-h3 mb-2 mt-2">Ultimate signing date</div>
      <v-card class="mb-4">
        <SigningDateProvision />
      </v-card>

        <!-- <RequiredToSignProvision/> -->
      
        <!-- <v-checkbox
          v-model="formData.signed"
          :rules="[v => !!v || 'You must sign the contract to continue!']"
          label="I hereby agree to the aforementioned contract?"
          required
        /> -->
      <v-row>
        <v-alert
          v-if="saved"
          v-model="saved"
          width="100%"
          dense
          dismissible
          elevation="5"
          outlined
          prominent
          type="success"
        >The contract has corectly been saved!</v-alert>
      </v-row>
      <v-row>
				<v-alert
          v-if="signed"
          v-model="signed"
          style="overflow-wrap: anywhere;"
					width="100%"
					dense
					dismissible
					elevation="5"
					outlined
					prominent
					type="success"
				>The contract has corectly been signed by you, and is now waiting for the other party(-ies) to sign it/accept it!</v-alert>
      </v-row>

      <v-row style="margin-bottom: 10px;">
        <v-col>
          <v-btn @click="previous">Back</v-btn>
        </v-col>
        <v-col align="right">
          <v-btn
            color="error"
            @click="reset"
          >
            Reset Form
          </v-btn>
          <v-btn 
            @click="sign" 
            class="accent">
            Sign
          </v-btn>
          <v-btn
            color="primary"
            @click="devDialog = true"
          >
            Dev preview
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-dialog
      max-width="500px"
      v-model="dialog"
      activator="parent"
    >
      <AccountSign
        :transaction="transaction"
        :uri="uri"
        callback="AutonCreate-PrevStep"
        title="Sign the contract"
      ></AccountSign>
    </v-dialog>





    <!-- dev dialog (delete this) -->
    <v-dialog
      width="60%"
      v-model="devDialog"
      activator="parent"
    >
      <div style="background-color: cadetblue; padding: 20px;">
        <h1>Dev preview (see log for result)</h1>

        <v-btn
          color=""
          block
          @click="getAllIds"
        >
          getAllids
        </v-btn>

        <v-btn
          color=""
          class="mt-4"
          block
          @click="getBySetIdTest"
        >
          getBySetIdTest
        </v-btn>

        <v-btn
          color=""
          class="mt-4"
          block
          @click="getAllWithInfo"
        >
          getAllWithInfo
        </v-btn>
      </div>
    </v-dialog>




  </v-container>
</template>
<script>
import SigningDateProvision from '../provisions/SigningDateProvision.vue';
import TitleProvision from '../provisions/TitleProvision.vue';

  export default {
    computed: {
        formData: {
            get: function () {
                return this.data;
            },
            set: function (newValue) {
                this.$emit("update:data", newValue);
            },
        },
        set: function (newValue) {
            this.$emit("update:data", newValue);
        },
    },
    data: () => ({
        saved: false,
        signed: false,
        dialog: false,
        devDialog: false,
        transaction: {
            moduleId: 1010,
            assetId: 1,
            assets: null,
        },
        uri: "",
    }),
    created() {
        this.$nuxt.$on("IAH-triggerSignComplete", function (_$event) {
            this.handleCreation();
        });
    },
    methods: {
        previous: function () {
          this.$emit('previous', null);
        },

        async getAllIds() {
            const existingAccoundIdWrapper = await this.$invoke("grantContract:getAll");
            console.log(existingAccoundIdWrapper);
        },
        async getBySetIdTest() {
            const existingAccoundIdWrapper = await this.$invoke("grantContract:getByID", { id: "4c8dc0218fe5189de638e6d83d15e5ce0a6f89368c0522926cc468bdda0e0f58" });
            console.log(existingAccoundIdWrapper);
        },
        async getAllWithInfo() {
            const existingAccoundIdWrapper = await this.$invoke("grantContract:getAllInfo");
            console.log(existingAccoundIdWrapper);
        },
        sign() {
            if (this.$refs.form.validate()) {
                // this.transaction.assets = this.$store.state.contract;
                this.transaction.assets = this.$store.getters["contract/filtered"];
                this.uri = "";
                this.dialog = true;
            }
        },
        reset() {
            this.$store.commit("contract/reset");
            console.log(this.$store.state.contract);
        },
    },
    components: { SigningDateProvision, TitleProvision }
};
</script>
