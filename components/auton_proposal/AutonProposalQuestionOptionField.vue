<template>
  <div>
    <v-form v-model="valid">
      <v-card-text>
        <v-row justify="center">
          <v-card-subtitle class="text--primary text-h4">{{question}}</v-card-subtitle>
        </v-row>
        <v-row justify="center" dense>
          <v-col cols="1">
            <v-label>{{ textFieldsAmount }}/4</v-label>
          </v-col>
        </v-row>
        <v-container id="scroll-target" style=" max-height: 280px" class="overflow-y-auto">
          <v-row v-scroll:#scroll-target="onScroll">
            <v-col cols="12" v-for="(textField, i) in textFields" :key="i" class="text-fields-row">
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-text-field v-on:input="getAnswerMessage" v-model="textField.value" required counter maxlength="100">
                    <v-icon slot="prepend-inner" v-text="'mdi-numeric-' + (i + 1)"></v-icon>
                    <v-icon slot="append" color="error" :disabled="textFieldsAmount == 2" @click="removed(i)">{{ "mdi-trash-can-outline" }}</v-icon>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <v-row justify="center">
          <v-col cols="1" class="pl-1">
            <v-btn class="accent" color="white" :disabled="textFieldsAmount > 3" @click="add" icon>
              <v-icon>{{ "mdi-plus" }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-form>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  props: ["disabledNext", "autonId", "question"],
  computed: {
  },
  watch: {
    valid: {
      handler: function (newValid) {
        // this.iconValue = this.generatedIcons[newIndex];
        this.$emit("update:disabledNext", !newValid);
      },
      deep: true,
    },
  },
  data: () => ({
    valid: false,
    dialog: false,
    offsetTop: 0,
    textFields: [{ label: "Option", value: "" }, { label: "Option", value: "" }],
    textFieldsAmount: 2,
    isUpdating: true,
  }),

  methods: {
    getAnswerMessage() {
      const answers = this.textFields.map(function (answers) {
        return answers.value;
      });
      this.$emit('data:answers', answers)
    },

    remove(item) {
      const index = this.selectedValue.indexOf(item.name);
      if (index >= 0) this.selectedValue.splice(index, 1);
    },
    onScroll(e) {
      this.offsetTop = e.target.scrollTop
    },
    add() {
      this.textFields.push({ label: "Option", value: "" })
      this.textFieldsAmount++
    },
    removed(index) {
      this.textFields.splice(index, 1)
      this.textFieldsAmount--
    },
  },
};
</script>

<style>

</style>
