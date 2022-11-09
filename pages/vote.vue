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
        <proposal v-if="reveal === 0"></proposal>
        <polls v-if="reveal === 1"></polls>
        <parameter v-if="reveal === 2"></parameter>
        <statement v-if="reveal === 3"></statement>
        <choicesView v-if="reveal === 4"></choicesView>
        <final v-if="reveal === 5"></final>
        <slot></slot>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn :disabled="reveal === 0" color="#0A75F3" class="white--text" @click="previousPage" width="100px"
            height="45px">
            <v-icon light>
              mdi-arrow-left
            </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="#0A75F3" class="white--text" @click="nextPage" width="100px" height="45px">
            <v-icon v-if="reveal < 5" light>
              mdi-arrow-right
            </v-icon>
            <label v-if="reveal === 5">
              sign
            </label>
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
import final from '~/components/sign.vue';


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
        this.reveal = 0
        this.dialog = false
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
  components: { choicesView, parameter, proposal, statement, polls, final },
}
</script>
