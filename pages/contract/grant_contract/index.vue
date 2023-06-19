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
  <v-row align="center" justify="center" style="height: 100%">
    <GrantContractEditForm 
        v-if="bid !== -1"
        :contractData="contractData" 
        :tid="tid" 
        :version=version
    />
    <GrantContractEditForm v-else-if="id  !=- 1" />
  </v-row>
</template>
<script>
  export default {
    data: () => ({
      id: -1,
      bid: -1,
      viewData: null
      editFase: 0,
      contractData: 
      {
        parties: {
          contractor: [],
          client: []
        },
        preample: '',
        purpose: '',
        payment: {
          amount: 0,
          note: ''
        },
        dates: {
          startDate: '',
          endDate: '',
          signingDate: '',
        },
        propertyRights: '',
        terminationOfAgreement: '',
        governingLawAndJurisdiction: '',
        finalProvisions: '',
        requiredToSign: false,
        signed: false,
        title: '',
        productDescription: 'hallo',
      },
      tid: null,
      version: null,
    }),

    mounted: function() {
      const idIn = this.$route.query.id;
      const bidIn = this.$route.query.bid;

      this.id = (idIn && idIn*1 > -1 ? idIn: -1);
      this.bid = (bidIn != undefined ? bidIn: -1);

      this.bid = bid;
      this.tid = this.$route.query.tid;
      this.version = Number.parseInt(this.$route.query.version);
      
      if (this.bid !== -1) {
        this.$invoke("grantContract:getByID", { id: this.bid }).then((viewData) => {
          this.viewData = viewData;
          console.log(viewData); /*TODO load this into view */
          
        }).catch( (err) => {
          console.error(err);
          this.$router.push("/contract/agreements");
        });
      } else if (this.id === -1) {
        this.$router.push("/contract/agreements");

      } else {
        this.$store.commit("contract/loadContract", {id: this.id});

        if (this.$store.state.contract.loadError) {
          this.$router.push("/contract/agreements");
        }
      }
    }
  };

</script>