<template>
  <v-container>
    <v-card class="mt-4 rounded-lg" max-width="750" elevation="0">
      <v-card-title class="text-h4 primary--text">
        Statement:
      </v-card-title>
      <v-card-subtitle class="text-h6">
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
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>

    <v-card class="mt-4 rounded-lg" max-width="750" elevation="0">
      <v-btn @click="rejectAll" block color="error" class="white--text" width="100px" height="45px">Reject all</v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "multipleChoiceOverview",
  computed: {},

  data: () => ({
    selectedItem: 1,
    statement: 'This is where you will find your statement!',
    choices: [
      { text: 'I think we should get more paper'},
      { text: 'I think the green fields are too green'},
      { text: 'I think we need to add water to the pond'},
      { text: 'I think we need to empty the pond'},
    ],
  }),

  methods: {
    rejectAll(){
      console.log("allemaal weg");
    },

    selectChoice(value){
      console.log("ik kies deze: " + this.choices[value].text);
    },

  }
}
</script>

<style scoped>

</style>
