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
      <v-form validate-on="submit">
      <div class="text-h2 pb-2">Agreement Parties</div>
      <v-card>
        <PartyMemberProvision isContractor partyName="contractor"/>
        <PartyMemberProvision partyName="client"/>
      </v-card>

      <div class="text-h2 pt-2 pb-2 mt-5">Preamples</div>
      <v-card>
        <PreampleProvision />
      </v-card>

      <div class="text-h2 mt-6">Provision types</div>
      <v-card class="mb-4">
        <PurposeProvision />
      </v-card>

      <PaymentProvision />

      <v-card class="mt-4 mb-4">
        <DateTimeProvision />
      </v-card>

      <v-row>
        <v-col cols=6>
          <v-card>
            <PropertyRightsProvision />
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <TerminationOfAgreement />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols=6>
          <v-card>
            <GoverningLawAndJurisdictionProvision />
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <FinalProvisions />
          </v-card>
        </v-col>
      </v-row>

        <!-- <RequiredToSignProvision/> -->
      
        <!-- <v-checkbox
          v-model="formData.signed"
          :rules="[v => !!v || 'You must sign the contract to continue!']"
          label="I hereby agree to the aforementioned contract?"
          required
        /> -->
      <v-row>
        <v-alert
          v-if="saving"
          v-model="saving"
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

      <v-row>
        <v-col>
          <v-btn>Back</v-btn>
        </v-col>
        <v-col align="right">
                    <v-btn
            @click="save"
            style="background-color: #002060; color: white"
          >
            Save
          </v-btn>
          <v-btn 
            @click="sign" 
            class="accent">
            Sign
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import ContractTypeContainer from './ContractTypeContainer.vue';
import ProvisionTypeContainer from './ProvisionTypeContainer.vue';

  export default {
    // props: ["transaction", "uri", "title"],
    
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
      saving: false,
      signed: false,
      dialog: false,
      transaction: {
        moduleId: 1010,
        assetId: 1,
        assets: null,
      },
      uri: "",
    }),

    created() {
      this.$nuxt.$on("IAH-triggerSignComplete", function ($event) {
        this.handleCreation();
      });
    },
    
    methods: {
      async sign() {
        console.log(this.$store.state.contract);
        // $router.push('/wallet');
        const { valid } = await this.$refs.form.validate();
        // if (valid) {
          // if(this.unlocked) {
            // this.transaction.assets = asset;
            this.transaction.assets = this.$store.state.contract;
            this.transaction.uri = "contract/signGrantContract-asset";
            await this.$invoke("contract:signGrantContract", {
              formData: this.$store.state.contract,
              // .toString("hex")
            });
            
            // this.$nuxt.$emit("IAH-triggerCreateAccount");
            // this.$emit("signGrantContract");
            // this.$nuxt.$emit("signGrantContract");
            this.signed = true;
          // } else {

          // }  
        // }
      },
      
      reset() {
        this.$refs.form.reset();
      },

      save: function() {
        localStorage.setItem("Grant-Contract", this.$store.state.contract);
        if(localStorage.getItem("Grant-Contract") != null) {
          this.saving = true;
        }
      },

      async handleCreation() {
        
      },
    },
    components: { ContractTypeContainer, ProvisionTypeContainer }
}

</script>