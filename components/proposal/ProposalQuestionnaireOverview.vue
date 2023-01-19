<template>
  <v-container>
    <v-card class="mt-4 rounded-lg" max-width="750" elevation="0">
      <v-card-title class="text-h4 primary--text">
        Statement:
      </v-card-title>
      <v-card-subtitle v-model="statement" class="text-h4">
        {{ statement }}
      </v-card-subtitle>
    </v-card>

    <v-card class="mt-4 rounded-lg" max-width="750" elevation="0">
      <v-list rounded>
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in choices"
            :key="i"
            v-on:click="selectChoice(i)"
          >
            <v-list-item-icon>
              <v-icon v-text="'mdi-numeric-' + (i + 1)"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>

    <!-- <v-card class="mt-4 rounded-lg" max-width="750" elevation="0">
      <v-btn outlined @click="rejectAll" disabled block color="error" class="white--text " width="100px" height="45px">Pass</v-btn>
    </v-card> -->
  </v-container>
</template>

<script>
export default {
  props: ['statement', 'choices'],
  name: "QuestionnaireOverview",
  computed: {},

  data: () => ({
    selectedItem: 1,
  }),

  methods: {
    rejectAll(){

    },

    selectChoice(value){
      this.$emit("update:answerValue", this.choices[value]);
    },
  }
}
</script>

<style scoped>

</style>
