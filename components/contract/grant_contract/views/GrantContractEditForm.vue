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

      <v-container fluid style="padding: 1px; margin: 5px;">
        <PartyMemberProvision :party="0"/>
        <PartyMemberProvision :party="1"/>
      </v-container>
      
      <v-container fluid style="padding: 1px; margin: 5px;">
        <PreampleProvision/>
      </v-container>
      
      <v-container fluid style="padding: 1px; margin: 5px;">
        <PurposeProvision/>
      </v-container>

      <v-container
        style="padding: 10px; margin: 5px; margin-bottom: 30px; outline: auto; outline-color: lightgray; min-width: 100%;"
        label="Payment of the grant"
      >
        <PaymentProvision/>
      </v-container>
      
      <v-container
        style="padding: 10px; margin: 5px; margin-bottom: 30px; outline: auto; outline-color: lightgray; min-width: 100%;"
        label="Date (begin- & end date)"
      >
        <DateTimeProvision/>
      </v-container>  
      
      <v-container fluid style="padding: 1px; margin: 5px;">
        <PropertyRightsProvision/>
      </v-container>
      
      <v-container fluid style="padding: 1px; margin: 5px;">
        <TerminationOfAgreement/>
      </v-container>

      <v-container fluid style="padding: 1px; margin: 5px;">
        <GoverningLawAndJurisdictionProvision/>
      </v-container>

      <v-container fluid style="padding: 1px; margin: 5px;">
        <FinalProvisions/>
      </v-container>

      <v-container
        style="padding: 10px; margin: 5px; margin-bottom: 30px; outline: auto; outline-color: lightgray; min-width: 100%;"
        label="Milestones"
      >
        <MilestonesProvision/>
      </v-container>  

      <v-container
        style="padding: 10px; margin: 5px; margin-bottom: 30px; outline: auto; outline-color: lightgray; min-width: 100%;"
        label="Custom provision"
      >
        <CustomProvision/>
      </v-container>  

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
          color="info"
          class="mt-4"
          block
          @click="save"
        >
          Save
        </v-btn>

        <v-btn
          color="success"
          class="mt-4"
          block
          @click="sign"
        >
          Sign
        </v-btn>

        <v-btn
          color="error"
          class="mt-4"
          block
          @click="reset"
        >
          Reset Form
        </v-btn>

        <!-- <v-btn
          class="mt-4"
          block
          @click="test"
        >
          Test
        </v-btn> -->
      </div>
    </v-form>
  </v-sheet>
</template>
<script>
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
      unlocked() {
        return this.$store.state.wallet.unlocked;
      },
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
  }

</script>