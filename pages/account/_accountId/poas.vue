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
  <v-container>
    <v-row v-if="!isFetching">
      <v-container >
        <span v-if="poas.length == 0" class="text-h3 d-flex justify-center mt-12">This user hasn't earned any POAs yet, go out and earn some!</span>
      </v-container>
      <v-container>
        <v-row class="mt-1">
          <v-col lg="3" md="4" sm="6" v-for="poa in poas" :key="poa.poaId">
            <IssuedPoaCard :poa="poa"></IssuedPoaCard>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import IssuedPoaCard from "~/components/poa/IssuedPoaCard.vue";
export default {
  layout: "account",
  components: {
    IssuedPoaCard,
  },
  data() {
    return {
      account: null,
      poas: [],
      isFetching: true,

    };
  },

  async mounted() {
    this.$nuxt.$emit("Account-setPage", "poas");

    let accountIdParam = this.$route.params.accountId;
    if (accountIdParam.indexOf("@") == 0) {
      accountIdParam = accountIdParam.replace("@", "");
    }
    const accountIdWrapper = await this.$invoke(
      "kalipoAccount:getAccountIdByUsername",
      {
        username: accountIdParam,
      }
    );

    if (accountIdWrapper.result) {
      const accountWrapper = await this.$invoke("kalipoAccount:getByID", {
        id: accountIdWrapper.result.id,
      });

      this.account = accountWrapper.result;
    }

    const issuedPoasList = [];
    const poasList = [];
    for (let i = 0; i < this.account.issuedPoas.length; i++) {
      const poaIssueWrapper = await this.$invoke("poaIssue:getByID", {
        id: this.account.issuedPoas[i],
      });
      issuedPoasList.push(poaIssueWrapper.result);
    }

    for (let i = 0; i < issuedPoasList.length; i++) {
      const poaWrapper = await this.$invoke("poa:getByID", {
        id: issuedPoasList[i].poaId,
      });
      poasList.push(poaWrapper.result);
    }


    for (let i = 0; i < issuedPoasList.length;i++) {
      const mergedPoas = {
        ...poasList[i],
        ...issuedPoasList[i],
      };
      this.poas.push(mergedPoas);
    }

    this.isFetching = false;
  },
  methods: {
    getSocialIcon(socialName) {
      socialName = socialName.toLowerCase();
      if (socialName == "twitter") {
        return "mdi-twitter";
      }
      if (socialName == "facebook") {
        return "mdi-facebook";
      }

      if (socialName == "linkedin") {
        return "mdi-linkedin";
      }

      if (socialName == "discord") {
        return "mdi-discord";
      }

      if (socialName == "youtube") {
        return "mdi-youtube";
      }

      if (socialName == "google") {
        return "mdi-google";
      }
    },
  },
};
</script>

<style>
</style>