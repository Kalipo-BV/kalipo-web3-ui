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
  <v-container style="min-width: 100%;">
    <v-row>
      <v-col
        cols="12"
        lg="6"
        class="fieldContainer"
      >
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              readonly
              outlined
              :value=startDate
              label="Start date"
              hint="YYYY/MM/DD format"
              persistent-hint
              v-bind="attrs"
              v-on="on"
              :rules="[v => !!v || 'A start-date must be selected!', startDate >= (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) || 'The start-date must be in the future or today', startDate < endDate || 'The start-date must come before the end-date!'].flat()"
            ></v-text-field>
          </template>
          <v-date-picker
            @input="(e) => {startDate = e}"
            :value=startDate
            no-title
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col
        cols="12"
        lg="6"
        class="secondFieldContainer fieldContainer"
      >
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              readonly
              outlined
              :value=endDate
              label="End date"
              hint="YYYY/MM/DD format"
              persistent-hint
              v-bind="attrs"
              v-on="on"
              :rules="[v => !!v || 'An end-date must be selected!', endDate >= (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) || 'The end-date must be in the future', endDate > startDate || 'The end-date must come after the start-date!'].flat()"
            ></v-text-field>
          </template>
          <v-date-picker
              @input="(e) => { endDate = e }"
              :value=endDate
              no-title
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    computed: {
      startDate: {
        get: function () {
          const data = this.$store.state.contract.body.formData.dates['startDate'];
          
          if (typeof data === 'string') {
            return data;
          } else {
            console.error('data is invalid', data)
            return '';
          }
        },
        set: function (content) {
          this.$store.commit("contract/changeDate", {key: 'startDate', content: content });
        },
      },

      endDate: {
        get: function () {
          const data = this.$store.state.contract.body.formData.dates['endDate'];

          if (typeof data === 'string') {
            return data;
          } else {
            console.error('data is invalid', data)
            return '';
          }
        },
        set: function (content) {
          this.$store.commit("contract/changeDate", {key: 'endDate', content: content});
        },
      }
    },

    data: vm => ({
      menu1: false,
      menu2: false,
    }),
  }
</script>

<style>
  @media screen and (min-width: 1370px) {
    .fieldContainer:not(:first-child) {
      padding-left: 12px;
    }

    .fieldContainer:not(:last-child) {
      padding-right: 12px;
    }
  }

  .fieldContainer {
    padding: 0;
  }
</style>
