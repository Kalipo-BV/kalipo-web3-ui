<template>
    <v-container>
        <v-row justify="center">
            <v-expansion-panels accordion>
                <v-expansion-panel v-for="(item, i) in this.questions" :key="i">
                    <v-expansion-panel-header class="text--primary text-h6">{{item.question}}</v-expansion-panel-header>
                    <v-expansion-panel-content v-for="(items, is) in item.options" :key="is">
                      {{items}}
                        <v-icon class="float-end" @click="edit(item.question, items)" small v-text="'mdi-pencil-outline'"></v-icon>
                      <v-divider></v-divider>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>
    </v-container>
</template>

<script>
export default {
  props: ["disabledNext", "questions"],
    data: () => ({
        text: "this field was updated",
        valid: false,
        snackbar: false,
        offsetTop: 0,
        textFields: [{ label: "Option", value: "" }, { label: "Option", value: "" }],
        textFieldsAmount: 2,
        isUpdating: true,
        users: [{ header: "Most recent users" }],
        questions: [],
    }),
    methods: {
        edit(question, option) {
          // updates do  work but needs to be frontend implemented.
          // (this.text will replace old values in this.questions)
          let objIndex = this.questions.findIndex((obj => obj.question == question));
          if (this.questions[objIndex].options.includes(option)){
            var index = this.questions[objIndex].options.indexOf(option)
            this.questions[objIndex].options[index] = this.text;
            console.log(this.questions)
            }
          }
        },
        removed(index) {
            this.textFields.splice(index, 1)
            this.textFieldsAmount--
            this.getChoicesMessage();
        },
}
</script>
