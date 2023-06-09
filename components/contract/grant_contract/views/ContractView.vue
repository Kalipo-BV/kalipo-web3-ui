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
        <div class="text-h2 pb-2 ml-5">Agreement Parties</div>
          <div class="text-h3 ml-5">Contractor</div>
          <v-text-field
            readonly
            outlined
            :value="this.contractData[0].contractor"
            class="ml-5 mr-5"
          ></v-text-field>
          <div class="text-h3 ml-5">Client</div>
          <v-text-field
              readonly
              outlined
              :value="this.contractData[0].client"
              class="ml-5 mr-5"
          ></v-text-field>
      </v-card>
        
        <v-card>
          <div class="text-h2 pt-2 pb-2 mt-5 ml-5">Preamples</div>
          <v-text-field
              readonly
              outlined
              :value="this.contractData[0].preample"
              class="ml-5 mr-5"
          />
        </v-card>
      
      <v-card>
        <div class="text-h2 mt-6 ml-5">Provision types</div>

        <div class="text-h3 ml-5">Contract title</div>
        <v-text-field
            readonly
            outlined
            :value="this.contractData[0].title"
            class="ml-5 mr-5"
        />

        <div class="text-h3 ml-5">Purpose</div>
        <v-text-field
            readonly
            outlined
            :value="this.contractData[0].purpose"
            class="ml-5 mr-5"
        />

        <div class="text-h3 ml-5">Desc. of product/service</div>
        <v-text-field
            readonly
            outlined
            :value="this.contractData[0].productDescription"
            class="ml-5 mr-5"
        />

        <div class="text-h3 ml-5">Payment provisions</div>
        <v-row>
          <v-col cols="6">
            <v-text-field
              readonly
              outlined
              label="Amount"
              :value="this.contractData[0].payment.amount"
              class="ml-5 mr-5"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              readonly
              outlined
              label="Note"
              :value="this.contractData[0].payment.note"
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
              :value="this.contractData[0].dates.startDate"
              class="ml-5 mr-5"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              readonly
              outlined
              label="End date"
              :value="this.contractData[0].dates.endDate"
              class="ml-5 mr-5"
            ></v-text-field>
          </v-col>
        </v-row>
        

        <div class="text-h3 mb-2 mt-2 ml-5" ml-5>Property rights</div>
          <v-text-field
              readonly
              outlined
              :value="this.contractData[0].propertyRights"
              class="ml-5 mr-5"
            ></v-text-field>

        <div class="text-h3 mb-2 mt-2 ml-5">Termination of agreement</div>
          <v-text-field
              readonly
              outlined
              :value="this.contractData[0].terminationOfAgreement"
              class="ml-5 mr-5"
            ></v-text-field>

        <div class="text-h3 mb-2 mt-2 ml-5">Applicable laws & regulations</div>
        <v-text-field
            readonly
            outlined
            :value="this.contractData[0].governingLawAndJurisdiction"
            class="ml-5 mr-5"
          ></v-text-field>

        <div class="text-h3 mb-2 mt-2 ml-5">Final provisions</div>
        <v-text-field
            :value="this.contractData[0].preample"
            class="ml-5 mr-5"
            readonly
            outlined
        ></v-text-field>

        <div class="text-h3 mb-2 mt-2 ml-5">Ultimate signing date</div>
        <v-text-field
              readonly
              outlined
              :value="this.contractData[0].dates.signingDate"
              class="ml-5 mr-5"
            ></v-text-field>
      </v-card>

  </v-container>
</template>

<script>
  export default {
    data: () => ({
      contractData: [{
        parties: {
          contractor: ["6ce6c9a40d42f02d4753d1f7b3f4158972536f58b8e94b66fda0234bf62bacec"],
          client: ["d6bd5d587d5935d125b6a8075513460f6dfbf08042062b8cffb39cc19193d03f"]
        },
        preample: "preample",
        purpose: "purpose",
        payment: {
          amount: 0,
          note: ""
        },
        dates: {
          startDate: new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10),
          endDate: new Date(new Date().setDate(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).getDate() + 1)).toISOString().substr(0, 10),
          signingDate: new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10),
        },
        propertyRights: "property",
        terminationOfAgreement: "termination",
        governingLawAndJurisdiction: "goverining",
        finalProvisions: "final provision",
        requiredToSign: false,
        signed: false,
        title: 'Title',
        productDescription: 'product description',
      }],
    }),
    methods: {
      localCopy() {
        this.$store.commit("contract/createNewLocalCopy", this.contractData);
        const id = 79;
        this.$router.push(`grant_contract?id=${id}`)
      }
    }
  }
</script>