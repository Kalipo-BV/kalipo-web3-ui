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
    <h1 style="margin-bottom: 10px;">Edit Template (Grant Contract)</h1>
    <v-form ref="form">

      <v-container fluid style="padding: 1px; margin: 5px;">
        <PartyMemberProvision 
          :parties.sync="formData.partyMembers"
        />
      </v-container>
      
      <v-container fluid style="padding: 1px; margin: 5px;">
        <PreampleProvision
          :preample.sync="formData.preample"
        />
      </v-container>
      
      <v-container fluid style="padding: 1px; margin: 5px;">
        <PurposeProvision
          :purpose.sync="formData.purpose"
        />
      </v-container>

      <v-container
        style="padding: 10px; margin: 5px; margin-bottom: 30px; outline: auto; outline-color: lightgray; min-width: 100%;"
        label="Payment of the grant"
      >
        <PaymentProvision
          :payment.sync="formData.payment"
        />
      </v-container>
      
      <v-container
        style="padding: 10px; margin: 5px; margin-bottom: 30px; outline: auto; outline-color: lightgray; min-width: 100%;"
        label="Date (begin- & end date)"
      >
        <DateTimeProvision
          :dates.sync="formData.dates"
        />
      </v-container>  
      
      <v-container fluid style="padding: 1px; margin: 5px;">
        <PropertyRightsProvision
          :propertyRights.sync="formData.propertyRights"
        />
      </v-container>
      
      <v-container fluid style="padding: 1px; margin: 5px;">
        <TerminationOfAgreement
          :terminationOfAgreement.sync="formData.terminationOfAgreement"
        />
      </v-container>

      <v-container fluid style="padding: 1px; margin: 5px;">
        <GoverningLawAndJurisdictionProvision
          :governingLawAndJurisdiction.sync="formData.governingLawAndJurisdiction"
        />
      </v-container>

      <v-container fluid style="padding: 1px; margin: 5px;">
        <FinalProvisions
          :finalProvisions.sync="formData.finalProvisions"
        />
      </v-container>

      <v-container
        style="padding: 10px; margin: 5px; margin-bottom: 30px; outline: auto; outline-color: lightgray; min-width: 100%;"
        label="Milestones"
      >
        <MilestonesProvision
          :milestones.sync="formData.milestones"
        />
      </v-container>  

      <v-container
        style="padding: 10px; margin: 5px; margin-bottom: 30px; outline: auto; outline-color: lightgray; min-width: 100%;"
        label="Custom provision"
      >
        <CustomProvision
          :custom.sync="formData.custom"
        />
      </v-container>  

      <RequiredToSignProvision
        :requiredToSign.sync="formData.requiredToSign"
      />
      
      <v-checkbox
        v-model="formData.signed"
        :rules="[v => !!v || 'You must sign the contract to continue!']"
        label="I hereby agree to the aforementioned contract?"
        required
      />

      <div class="d-flex flex-column">
        <v-btn
          color="success"
          class="mt-4"
          block
          @click="validate"
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
    data: () => ({
      formData: {
        partyMembers: [],
        preample: null,
        purpose: null,
        payment: {
          amount: null,
          note: null,
        },
        dates: {
          beginDate: null,
          endDate: null,
        },
        propertyRights: null,
        terminationOfAgreement: null,
        governingLawAndJurisdiction: null,
        finalProvisions: null,
        milestones: [],
        custom: [],
        requiredToSign: false,
        signed: false,
      },
    }),

    methods: {
      async validate() {
        const { valid } = await this.$refs.form.validate();
        if (valid)
          alert("Form is valid");
          this.test();
      },
      
      reset() {
        this.$refs.form.reset();
      },
      
      test() {
        console.log(this.formData);
      }
    },
  }

</script>