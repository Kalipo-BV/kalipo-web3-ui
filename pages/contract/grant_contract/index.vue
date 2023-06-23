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
    <ContractView
        v-if="this.viewData !== null"
        :contractData="this.viewData" 
        :tid="this.tid" 
        :version=this.version
    />
    <GrantContractEditForm v-else-if="id !=- 1" />
  </v-row>
</template>
<script>
  export default {
    data: () => ({
      id: -1,
      bid: -1,
      editFase: 0,
      viewData: null,
      tid: null,
      version: null,
    }),

    methods: {
      getQueryVars: function () {
        const viewData = null;
        const idIn = this.$route.query.id;
        const bidIn = this.$route.query.bid;

        this.id = (idIn && idIn * 1 > -1 ? idIn : -1);
        this.bid = (bidIn != undefined ? bidIn : -1);

        this.tid = this.$route.query.tid;
        this.version = Number.parseInt(this.$route.query.version);
        if (this.bid !== -1) {
          this.$invoke("grantContract:getByID", { id: this.bid }).then((viewData) => {
          this.viewData = viewData.result.formData;
        }).catch((err) => {
          console.error(err);
          this.$router.push("/contract/agreements");
        });
        } else if (this.id === -1) {
          this.$router.push("/contract/agreements");

        } else {
          this.$store.commit("contract/loadContract", { id: this.id });

          if (this.$store.state.contract.loadError) {
            this.$router.push("/contract/agreements");
          }
        }
        // console.log({
        //   bidIn: bidIn ,
        //   bool: bidIn != undefined,
        //   bid: this.bid,
        //   id: this.id,
        //   tid: this.tid,
        //   version: this.version,
        // });
      }
    },

    watch: {
      '$store.state.contract.id': function () {
        this.viewData = null
        this.bid = -1;
        this.id = this.$store.state.contract.id;
        console.info("manually changed the id to reroute the user");
      }
    },

    mounted: function() {
      this.getQueryVars();
    }
  };

</script>