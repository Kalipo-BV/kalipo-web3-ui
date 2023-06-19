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
    <GrantContractEditForm v-if="id  !=- 1" @previous="previous"/>
    <GrantContractEditForm v-if="account != null && != -1" @previous="previous"/>
  </v-row>
</template>
<script>
  export default {
    data: () => ({
      id: -1,
      account: null,
    }),

    methods: {
      previous: function() {
        this.editFase++;
      },

      next: function() {
        this.editFase--;
      },
    },

    mounted: function() {
      const idIn = this.$route.query.id;
      const bidIn = this.$route.query.bid;

      this.id = (idIn && idIn*1 > -1 ? idIn: -1);
      this.bid = (bidIn != undefined ? bidIn: -1);

      console.log({
        bidIn: bidIn ,
        bool: bidIn == undefined,
        bid: this.bid,
        id: this.id
      });

      this.bid = bid;
      
      if (this.bid !== -1) {
        this.$invoke("grantContract:getByID", { id: this.bid }).then((account) => {
          this.account = account;
          console.log(account); /*TODO load this into view */
          
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