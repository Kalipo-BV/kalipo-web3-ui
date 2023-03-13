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
                    v-model="dateFormatted"
                    label="Begin date"
                    hint="DD/MM/YYYY format"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                    :rules="[v => !!v || 'A start-date must be selected!', date >= (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) || 'The start-date must be in the future or today', date < date2 || 'The start-date must come before the end-date!'].flat()"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
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
                        v-model="computedDateFormatted2"
                        label="End date"
                        hint="DD/MM/YYYY format"
                        persistent-hint
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        :rules="[v => !!v || 'An end-date must be selected!', date2 >= (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) || 'The end-date must be in the future', date2 > date || 'The end-date must come after the begin-date!'].flat()"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date2"
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
    data: vm => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      dateFormatted2: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
    }),

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date1)
      },

      computedDateFormatted2 () {
        return this.formatDate(this.date2)
      },
    },

    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(val)
      },
    },

    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [day, month, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    },
  }
</script>