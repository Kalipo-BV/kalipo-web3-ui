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
    <StageBuilder v-if="editFase === 3" isFirst @previous="previous" @next="next" title="Parties">
      <PartyMemberProvision is-contractor party-name="contractor"/>
      <PartyMemberProvision party-name="client"/>
    </StageBuilder>

    <StageBuilder v-if="editFase === 2" @previous="previous" @next="next"  title="Preample">
      <PreampleProvision/>
    </StageBuilder>

    <StageBuilder v-if="editFase === 1" @previous="previous" @next="next"  title="Purpose">
      <PurposeProvision/>
    </StageBuilder>

    <GrantContractEditForm v-if="editFase === 0" />
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
      const id = (idIn && idIn*1 > -1 ? this.$route.query.id: -1);
      
      if (id === -1) {
        this.$store.commit("contract/createNew", {});
        const newId = this.$store.state.contract.id;
        setTimeout(() => {
          console.log('timout',this.$store.state.contract.id);
        }, 0)
        console.log(newId);

        this.$router.push({ path: this.$route.path, query: { id: newId } });
      } else {
        this.$store.commit("contract/loadContract", {id: id});
      }
    }
  };

</script>