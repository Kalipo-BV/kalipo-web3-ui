<template>
    <v-container>
        <v-row justify="center">
            <v-expansion-panels accordion>
                <v-expansion-panel v-for="(item, i) in questions" :key="i">
                    <v-expansion-panel-header class="text--primary text-h6">{{item.question}}</v-expansion-panel-header>
                    <v-expansion-panel-content v-for="(items, is) in item.options" :key="is">
                      <v-text-field v-on:input="edit(items)" dense :value="items">
                        <v-icon slot="prepend-inner" v-text="'mdi-numeric-' + (is + 1)"></v-icon>

                      </v-text-field>

<!--                        <v-btn outlined color="primary" elevation="1" @click="edit(item)" icon small>-->
<!--                            <v-icon color="primary">{{ "mdi-pencil-outline" }}</v-icon>-->
<!--                        </v-btn>-->
<!--                        <v-btn outlined color="error" elevation="1" @click="removed(item)" icon small>-->
<!--                            <v-icon color="error">{{ "mdi-trash-can-outline" }}</v-icon>-->
<!--                        </v-btn>-->
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
        valid: false,
        dialog: false,
        offsetTop: 0,
        textFields: [{ label: "Option", value: "" }, { label: "Option", value: "" }],
        textFieldsAmount: 2,
        isUpdating: true,
        users: [{ header: "Most recent users" }],
        option: "",
    }),
    methods: {
        edit(value) {
          console.log(value)

        },
        removed(index) {
            this.textFields.splice(index, 1)
            this.textFieldsAmount--
            this.getChoicesMessage();
        },
    }
}
</script>
