<template>
    <v-container>
        <v-row justify="center">
            <v-expansion-panels accordion>
                <v-expansion-panel v-for="(item, i) in textFields" :key="i">
                    <v-expansion-panel-header
                    :question="question" >Item</v-expansion-panel-header>
                    <v-expansion-panel-content
                    :option="option">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        nisi
                        ut
                        aliquip ex ea commodo consequat.
                    </v-expansion-panel-content>
                    <v-btn outlined color="primary" elevation="1" @click="edit(i)" icon small>
                        <v-icon color="primary">{{ "mdi-pencil-outline" }}</v-icon>
                    </v-btn>
                    <v-btn outlined color="error" elevation="1" @click="removed(i)" icon small>
                        <v-icon color="error">{{ "mdi-trash-can-outline" }}</v-icon>
                    </v-btn>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        valid: false,
        dialog: false,
        offsetTop: 0,
        textFields: [{ label: "Option", value: "" }, { label: "Option", value: "" }],
        textFieldsAmount: 2,
        isUpdating: true,
        users: [{ header: "Most recent users" }],
        question: "",
        option: "",
    }),
    methods: {
        edit(index) {

        },
        removed(index) {
            this.textFields.splice(index, 1)
            this.textFieldsAmount--
            this.getChoicesMessage();
        },
    }
}
</script>