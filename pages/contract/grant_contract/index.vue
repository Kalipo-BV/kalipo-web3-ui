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
    <StageBuilder v-if="editFase === 3" isFirst @previous="previous" @next="next" title="Agreement parties">
      <PartyMemberProvision is-contractor party-name="contractor"/>
      <PartyMemberProvision party-name="client"/>
    </StageBuilder>

    <StageBuilder v-if="editFase === 2" @previous="previous" @next="next"  title="Preamples">
      <PreampleProvision/>
    </StageBuilder>

    <StageBuilder v-if="editFase === 1" @previous="previous" @next="next"  title="Purpose">
      <PurposeProvision/>
    </StageBuilder>

    <GrantContractEditForm v-if="editFase === 0" @previous="previous"/>
  </v-row>
</template>
<script>
  export default {
    data: () => ({
      editFase: 3,
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

      const id = (idIn && idIn*1 > -1 ? idIn: -1);
      const bid = (bidIn != undefined ? bidIn: -1);

      console.log({
        bidIn: bidIn ,
        bool: bidIn == undefined,
        bid: bid
      });
      
      if (bid !== -1) {
        this.$invoke("grantContract:getByID", { id: bid }).then((account) => {
          console.log(account); /*TODO load this into view */
        });
      } else if (id === -1) {
        this.$store.commit("contract/createNew", {});
        const newId = this.$store.state.contract.id;
        
        this.$router.push({ path: this.$route.path, query: { id: newId } });
      } else {
        this.$store.commit("contract/loadContract", {id: id});
      }
    }
  };

</script>