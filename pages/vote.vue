<template>
  <div class="text-center">
    <div class="text-center">
      <v-row justify="center">
        <v-btn elevation="1" x-large text color="indigo darken-4" @click="dialog = true">CLICK ON ME</v-btn>
      </v-row>
    </div>
    <v-dialog v-model="dialog" width="650px">
      <v-card>
        <v-row justify="end">
          <v-col cols="1">
            <v-btn icon @click="closeDialog">
              <v-icon>
                {{ "mdi-window-close" }}
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider class="mx-4"></v-divider>
        <proposal v-if="reveal === 0"></proposal>
        <polls v-if="reveal === 1"></polls>
        <parameter v-if="reveal === 2"></parameter>
        <statement v-if="reveal === 3"></statement>
        <choicesView v-if="reveal === 4"></choicesView>
        <sign v-if="reveal === 5"></sign>
        <slot></slot>
        <v-divider class="mx-4"></v-divider>
        <v-card-actions>
          <v-btn :disabled="reveal === 0" color="#0A75F3" class="accent white--text" @click="previousPage">
            <v-icon light>mdi-arrow-left</v-icon>
            previous
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="#0A75F3" class="white--text" @click="nextPage">
            <label v-if="reveal < 5">next</label>
            <v-icon v-if="reveal < 5" light>mdi-arrow-right</v-icon>
            <label v-if="reveal === 5">sign</label>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import choicesView from '~/components/choicesView.vue';
import parameter from '~/components/parameter.vue';
import proposal from '~/components/proposal.vue';
import statement from '~/components/statement.vue';
import polls from '~/components/poll.vue';
import sign from '~/components/sign.vue';


export default {
  data() {
    return {
      dialog: false,
      reveal: 0,
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false
      this.reveal = 0
    },
    nextPage() {
      if (this.reveal === 5) {
        this.dialog = false
        this.reveal = 0
      } else {
        this.reveal++
      }
    },

    previousPage() {
      if (this.reveal !== 0 && this.reveal > 0) {
        this.reveal--
      }
    }
  },
  components: { choicesView, parameter, proposal, statement, polls, sign },
}
</script>
