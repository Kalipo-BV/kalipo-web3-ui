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
    <v-row>
      <v-col
        cols="12"
        lg="6"
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
              v-model="dateValues.beginDate"
              label="Begin date"
              hint="YYYY/MM/DD format"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
              :rules="[v => !!v || 'A start-date must be selected!', dateValues.beginDate >= (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) || 'The start-date must be in the future or today', dateValues.beginDate < dateValues.endDate || 'The start-date must come before the end-date!'].flat()"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="dateValues.beginDate"
              no-title
              @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col
        cols="12"
        lg="6"
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
              v-model="dateValues.endDate"
              label="End date"
              hint="YYYY/MM/DD format"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
              :rules="[v => !!v || 'An end-date must be selected!', dateValues.endDate >= (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) || 'The end-date must be in the future', dateValues.endDate > dateValues.beginDate || 'The end-date must come after the begin-date!'].flat()"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="dateValues.endDate"
              no-title
              @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    props: ["dates"],

    computed: {
      dateValues: {
        get: function () {
          return this.dates;
        },
        set: function (newValue) {
          this.$emit("update:dates", newValue);
        },
      },
    },

    mounted: function () {
      this.onstartBeginDateFocus();
      this.onstartEndDateFocus();
    },

    data: vm => ({
      menu1: false,
      menu2: false,
    }),

    methods: {
      onstartBeginDateFocus() {
        if (this.dateValues.beginDate == null) {
          this.dateValues.beginDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
        }
      },
      
      onstartEndDateFocus() {
        if (this.dateValues.endDate == null) {
          var date = new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000);
          date = new Date(date.setDate(date.getDate() + 1));
          this.dateValues.endDate = date.toISOString().substr(0, 10);
        }
      },
    },
  }
</script>