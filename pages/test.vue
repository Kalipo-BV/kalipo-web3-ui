<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Parameter
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12" lg="6">
              <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field :value="computedDateFormattedMomentjs" clearable label="Start"
                    readonly v-bind="attrs" v-on="on" @click:clear="date = null"></v-text-field>
                </template>
                <v-date-picker v-model="date" @change="menu1 = false"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" lg="6">
              <v-menu v-model="menu2" :close-on-content-click="false" max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field :value="computedDateFormattedDatefns" clearable label="Due" readonly
                    v-bind="attrs" v-on="on" @click:clear="date = null"></v-text-field>
                </template>
                <v-date-picker v-model="date" @change="menu2 = false"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },
}
</script>