<template>
  <div class="d-flex align-center justify-center">
    <v-card class="ma-auto" color="grey lighten-5" width="500" height="350">
      <v-card-title class="primary--text">
        Submitting a new proposal
      </v-card-title>
      <v-card-text>
        <div class="text-h8 primary--text">
          Describe your statement by providing a title and description
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn elevation="1" x-large text color="indigo darken-4" @click="reveal_membership_invitation = true">
          Membership
          invitation</v-btn>
        <v-btn elevation="1" x-large text color="indigo darken-4" @click="reveal = true">Poll</v-btn>
      </v-card-actions>

      <v-expand-transition>
        <v-card v-if="reveal" class="transition-fast-in-fast-out v-card--reveal" color="grey lighten-5"
          style="height: 100%;">
          <v-card-title class="primary--text">
            Submitting a new proposal
          </v-card-title>
          <v-card-text>
            <div class="text-h8 primary--text">
              Describe your statement by providing a title and description
            </div>
          </v-card-text>
          <div>
            <v-text-field background-color="grey lighten-1 mx-2" label="Statement" :rules="rules" hide-details="auto"
              style="width:484px" clearable></v-text-field>
            <v-text-field background-color="grey lighten-1 mx-2" label="Description" style="width:484px" clearable>
            </v-text-field>
          </div>
          <v-card-actions class="pt-0">
            <v-btn x-large text color="indigo darken-4" @click="reveal = false">Previous</v-btn>
            <v-btn x-large text color="indigo darken-4" @click="reveal = false, choice = true">Next</v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>

      <v-expand-transition>
        <v-card v-if="choice" class="transition-fast-in-fast-out v-card--choice" color="grey lighten-5"
          style="height: 100%;">
          <v-card-title class="primary--text">
            Choice
          </v-card-title>
          <v-card-text>
            <div class="text-h8 primary--text">
              Give a clear description of the choices
            </div>
          </v-card-text>
          <v-container id="scroll-target" style="max-height: 400px" class="overflow-y-auto">
            <v-row v-scroll:#scroll-target="onScroll" align="center" justify="center" style="height: 130px">
              <div>
                <v-text-field background-color="grey lighten-1 " style="width:470px" clearable:label="Choice">
                </v-text-field>

                <div v-for="(textField, i) in textFields" :key="i" class="text-fields-row">
                  <v-text-field background-color="grey lighten-1 " style="width:470px"
                    clearable:label="textField.label1" v-model="textField.value1"></v-text-field>
                  <v-btn @click="remove(i)" class="error mx-2">delete</v-btn>
                </div>

                <v-btn @click="add" class="secondary mx-2">add</v-btn>

              </div>
            </v-row>
          </v-container>
          <v-card-actions class="pt-0">
            <v-btn x-large text color="indigo darken-4" @click="choice = false, reveal = true">Previous</v-btn>
            <v-btn x-large text color="indigo darken-4">Submit</v-btn>
          </v-card-actions>

        </v-card>
      </v-expand-transition>
    </v-card>
  </div>

</template>

<script>
import Statement from "../components/Statement";
import Dialogue from "../components/Dialogue";
export default {
  components: {Dialogue, Statement},
  data: () => ({
    offsetTop: 0,
    choice: false,
    reveal: false,
    rules: [
      value => !!value || 'Required.',
      value => (value && value.length >= 3) || 'Min 3 characters'],
    textFields: [],
  }),

  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop
    },
    add() {
      this.textFields.push({
        label1: "Choice",
        value1: ""
      })
    },

    remove(index) {
      this.textFields.splice(index, 1)
    }
  }
}
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.v-card--choice {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
