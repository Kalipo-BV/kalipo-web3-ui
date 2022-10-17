<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px" max-height="400px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                        Open Dialog
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="primary--text">
                        Choice
                    </v-card-title>
                    <v-card-text>
                        <div class="text-h8 primary--text">
                            Give a clear description of the choices
                        </div>
                    </v-card-text>
                    <v-card-text>
                        <v-container id="scroll-target" class="overflow-y-auto">
                            <v-row>
                                <v-col cols="12" sm="6" md="10" v-for="(textField, i) in textFields" :key="i"
                                    class="text-fields-row">
                                    <v-col cols="12" sm="6" md="10">
                                        <v-text-field v-model="addedValue" name="addedvaluefield" label="Choice*"
                                            required :rules="addedValueRules" counter maxlength="150"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="2">
                                        <v-btn @click="remove(i)" class="error">delete</v-btn>
                                    </v-col>
                                </v-col>
                                <!-- <v-col cols="12" sm="6">
                                    <div v-for="(textField, i) in textFields" :key="i" class="text-fields-row">
                                        <v-col cols="12" sm="6" md="10">
                                            <v-text-field v-model="addedValue" name="addedvaluefield" label="Choice*" required :rules="addedValueRules" counter
                                                maxlength="100"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="2">
                                            <v-btn @click="remove(i)" class="error">delete</v-btn>
                                        </v-col>
                                    </div>
                                </v-col> -->
                                <v-col cols="12">
                                    <v-btn :disabled="textFieldsAmount > 3" @click="add" class="secondary">add</v-btn>
                                    <!-- <v-btn v-else @click="add" class="secondary" disabled>add</v-btn> -->
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">
                            Close
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="dialog = false">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>

</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            addedValue: '',
            offsetTop: 0,
            textFields: [],
            textFieldsAmount: 0,
            addedValueRules: [v => v.length <= 100 || 'Max 100 characters'],
            reachedMax: false,
        }
    },

    methods: {
        onScroll(e) {
            this.offsetTop = e.target.scrollTop
        },

        add() {
            this.textFields.push({ label: "Choice", value: "" })
            this.textFieldsAmount++
        },

        remove(index) {
            this.textFields.splice(index, 1)
            this.textFieldsAmount--
        }
    }
}
</script>

<style>
.v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
}

.v-card--choice {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
}
</style>