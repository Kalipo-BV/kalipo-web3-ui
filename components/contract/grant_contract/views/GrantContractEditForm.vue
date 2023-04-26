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
  <v-sheet width="90%" class="mx-auto pa-10" style="margin-top: 10vh; margin-bottom: 12vh;">
    <h1 style="margin-bottom: 10px; text-align: center;">Edit Template (Grant Contract)</h1>
    <v-form ref="form">
      <ContractTypeContainer title="Agreement parties">
        <PartyMemberProvision isContractor partyName="contractor"/>
        <PartyMemberProvision partyName="client"/>
      </ContractTypeContainer>

      <ContractTypeContainer title="Preamples">
        <PreampleProvision/>
      </ContractTypeContainer>
      
      <ContractTypeContainer title="Provision types">
        <ProvisionTypeContainer title="Purpose">
            <PurposeProvision/>
        </ProvisionTypeContainer>
        
        <ProvisionTypeContainer title="Payment of grant">
          <PaymentProvision/>
        </ProvisionTypeContainer>
      
        <ProvisionTypeContainer title="Date (begin- & end date)">
          <DateTimeProvision/>
        </ProvisionTypeContainer>

        <ProvisionTypeContainer title="Property rights">
          <PropertyRightsProvision/>
        </ProvisionTypeContainer>
      
        <ProvisionTypeContainer title="Termination of Agreement">
          <TerminationOfAgreement/>
        </ProvisionTypeContainer>

        <ProvisionTypeContainer title="Governing law and jurisdiction">
          <GoverningLawAndJurisdictionProvision/>
        </ProvisionTypeContainer>

        <ProvisionTypeContainer title="Final provisions">
          <FinalProvisions/>
        </ProvisionTypeContainer>

        <ProvisionTypeContainer title="Milestones">
          <MilestonesProvision/>
        </ProvisionTypeContainer>

        <ProvisionTypeContainer title="Custom provision">
          <CustomProvision/>
        </ProvisionTypeContainer>

        <!-- <RequiredToSignProvision/> -->
      
        <!-- <v-checkbox
          v-model="formData.signed"
          :rules="[v => !!v || 'You must sign the contract to continue!']"
          label="I hereby agree to the aforementioned contract?"
          required
        /> -->
      </ContractTypeContainer>
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

      <div class="d-flex flex-column">
        <v-btn
          color="success"
          class="mt-4"
          block
          @click="sign"
        >
          Sign
        </v-btn>

        <v-btn
          color=""
          class="mt-4"
          block
          @click="devDialog = true"
        >
          Dev preview
        </v-btn>

        <v-btn
          color="error"
          class="mt-4"
          block
          @click="reset"
        >
          Reset Form
        </v-btn>
      </div>
    </v-form>
    <v-dialog
      width="60%"
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





  </v-sheet>
</template>
<script>
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
  
    unlocked() {
      return this.$store.state.wallet.unlocked;
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
      async getAllIds() {
        const existingAccoundIdWrapper = await this.$invoke("grantContract:getAll");
        console.log(existingAccoundIdWrapper);
      },
      async getBySetIdTest() {       
        const existingAccoundIdWrapper = await this.$invoke(
          "grantContract:getByID",
          { id: "4d6b950d770990be4ee5f682b8329f02dcac8587a3fee170ca067abbdbd840af" },
        );
        console.log(existingAccoundIdWrapper);
      },
      async getAllWithInfo() {       
        const existingAccoundIdWrapper = await this.$invoke("grantContract:getAllInfo");
        console.log(existingAccoundIdWrapper); 
      },

      

      async sign() {
        console.log(this.$store.state.contract);
        this.transaction.assets = this.$store.getters["contract/filtered"];
        this.transaction.assets["contractId"] = "test";
        console.log(this.$store.getters["contract/filtered"]);
        this.uri = "contract/signConctract-asset";
        this.dialog = true;
      },
      
      reset() {
        this.$store.commit("contract/reset");
        console.log(this.$store.state.contract);
      },

      async handleCreation() {
        
      },
    },
  };
</script>
