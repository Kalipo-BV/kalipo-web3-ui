<template>
  <v-container width="90%">
    <v-row>
      <v-col cols=10>
        <h1 style="margin-bottom: 10px; text-align: center;" class="pl-5">View Contract</h1>
      </v-col>
      <v-col cols=2>
        <v-btn
          @click=localCopy
          class=accent
        >Edit
        </v-btn>
      </v-col>
    </v-row>
      <v-card>
        <div class="text-h2 pt-2 pb-2 mt-5 ml-5">Agreement Parties</div>
          <AgreementPartiesSignInfo
            :tid = "this.tid"
            :version = this.version
            class="ml-5 mr-5"
          />
      </v-card>
        
        <v-card>
          <div class="text-h2 pt-2 pb-2 mt-5 ml-5">Preamples</div>
          <v-text-field
              readonly
              outlined
              :value="this.contractData.preample"
              class="ml-5 mr-5"
          />
        </v-card>
      
      <v-card>
        <div class="text-h2 mt-6 ml-5">Provision types</div>

        <div class="text-h3 ml-5">Contract title</div>
        <v-text-field
            readonly
            outlined
            :value="this.contractData.title"
            class="ml-5 mr-5"
        />

        <div class="text-h3 ml-5">Purpose</div>
        <v-text-field
            readonly
            outlined
            :value="this.contractData.purpose"
            class="ml-5 mr-5"
        />

        <div class="text-h3 ml-5">Desc. of product/service</div>
        <v-text-field
            readonly
            outlined
            :value="this.contractData.productDescription"
            class="ml-5 mr-5"
        />

        <div class="text-h3 ml-5">Payment provisions</div>
        <v-row>
          <v-col cols="6">
            <v-text-field
              readonly
              outlined
              label="Amount"
              :value="this.contractData.payment.amount"
              class="ml-5 mr-5"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              readonly
              outlined
              label="Note"
              :value="this.contractData.payment.note"
              class="ml-5 mr-5"
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="text-h3 ml-5">Date provisions</div>
        <v-row>
          <v-col cols="6">
            <v-text-field
              readonly
              outlined
              label="Start date"
              :value="this.contractData.dates.startDate"
              class="ml-5 mr-5"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              readonly
              outlined
              label="End date"
              :value="this.contractData.dates.endDate"
              class="ml-5 mr-5"
            ></v-text-field>
          </v-col>
        </v-row>
        

        <div class="text-h3 mb-2 mt-2 ml-5" ml-5>Property rights</div>
          <v-text-field
              readonly
              outlined
              :value="this.contractData.propertyRights"
              class="ml-5 mr-5"
            ></v-text-field>

        <div class="text-h3 mb-2 mt-2 ml-5">Termination of agreement</div>
          <v-text-field
              readonly
              outlined
              :value="this.contractData.terminationOfAgreement"
              class="ml-5 mr-5"
            ></v-text-field>

        <div class="text-h3 mb-2 mt-2 ml-5">Applicable laws & regulations</div>
        <v-text-field
            readonly
            outlined
            :value="this.contractData.governingLawAndJurisdiction"
            class="ml-5 mr-5"
          ></v-text-field>

        <div class="text-h3 mb-2 mt-2 ml-5">Final provisions</div>
        <v-text-field
            :value="this.contractData.preample"
            class="ml-5 mr-5"
            readonly
            outlined
        ></v-text-field>

        <div class="text-h3 mb-2 mt-2 ml-5">Ultimate signing date</div>
        <v-text-field
              readonly
              outlined
              :value="this.contractData.dates.signingDate"
              class="ml-5 mr-5"
            ></v-text-field>
      </v-card>

  </v-container>
</template>

<script>
  export default {
    props: {
      contractData: { type: Object },
      tid: { type: String },
      version: { type: Number },
    },
    methods: {
      localCopy() {
        this.$store.commit("contract/createNewLocalCopy", this.contractData);
        const id = 79;
        this.$router.push(`grant_contract?id=${id}`)
      }
    }
  }
</script>