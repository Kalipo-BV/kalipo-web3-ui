<template>
  <div v-if="reveal != 3" class="text-center">
    <v-dialog persistent v-model="dialog" width="650">
      <v-card>
        <v-row justify="end">
          <v-col cols="1">
            <v-btn @click="reveal = 3" icon>
              <v-icon>
                {{ "mdi-window-close" }}
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <Parameter v-if="reveal == 0"></Parameter>
        <Statement v-if="reveal == 1"></Statement>
        <ChoicesView v-if="reveal == 2"></ChoicesView>
        <slot></slot>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn :disabled="reveal == 0" color="#0A75F3" class="white--text" @click="previousPage" width="100px"
            height="45px">
            <v-icon light>
              mdi-arrow-left
            </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="#0A75F3" class="white--text" @click="nextPage" width="100px" height="45px">
            <v-icon v-if="reveal < 2" light>
              mdi-arrow-right
            </v-icon>
            <label v-if="reveal == 2">
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
      if (this.reveal == 3) {
        this.reveal = 0
      } else {
        this.reveal++
      }
    },

    previousPage() {
      if (this.reveal != 0 && this.reveal > 0) {
        this.reveal--
      }
    }
  },
  components: { ChoicesView, Parameter }
}
</script>

<style scoped>

</style>
