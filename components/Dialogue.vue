<template>
  <div v-if="reveal !== 4" class="text-center">
    <v-dialog persistent v-model="dialog" width="650px">
      <v-card>
        <v-row justify="end">
          <v-col cols="1">
            <v-btn @click="reveal = 4" icon>
              <v-icon>
                {{ "mdi-window-close" }}
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <Proposal v-if="reveal === 0"></Proposal>
        <Parameter v-if="reveal === 1"></Parameter>
        <Statement v-if="reveal === 2"></Statement>
        <ChoicesView v-if="reveal === 3"></ChoicesView>
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
            <v-icon v-if="reveal < 3" light>
              mdi-arrow-right
            </v-icon>
            <label v-if="reveal === 3">
              sign
            </label>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ChoicesView from './ChoicesView.vue';
import Parameter from './Parameter.vue';
import Proposal from './Proposal.vue';
import Statement from './Statement.vue'

export default {
  name: "Dialogue",
  data() {
    return {
      dialog: true,
      reveal: 0,
    };
  },
  methods: {
    nextPage() {
      if (this.reveal === 4) {
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
  components: { ChoicesView, Parameter, Proposal }
}
</script>

<style scoped>

</style>
