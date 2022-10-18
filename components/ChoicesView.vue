<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px" max-height="300px">
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
                        <v-row justify="center">
                            <v-col cols="2">
                                <v-label>
                                    {{textFieldsAmount}}/4
                                </v-label>
                            </v-col>
                        </v-row>
                        <v-container id="scroll-target" style="max-height: 280px" class="overflow-y-auto">
                            <v-row v-scroll:#scroll-target="onScroll">
                                <v-col cols="12" v-for="(textField, i) in textFields" :key="i" class="text-fields-row">
                                    <v-row>
                                        <v-col cols="11" class="py-0">
                                            <v-text-field v-model="textField.value" :label="i + 1 + ') Choice *'" required counter
                                                maxlength="100"></v-text-field>
                                        </v-col>
                                        <v-col cols="1" class="px-1">
                                            <v-btn :disabled="textFieldsAmount == 1" @click="remove(i)" elevation="1" icon >
                                                <v-icon>
                                                    {{"mdi-trash-can-outline"}}
                                                </v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-container>
                            <v-row justify="center">
                                <v-col cols="2">
                                    <v-btn :disabled="textFieldsAmount > 3" @click="add" icon large>
                                        <v-icon>
                                            {{"mdi-plus-circle-outline"}}
                                        </v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
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
            offsetTop: 0,
            textFields: [{ label: "Choice", value: "" }],
            textFieldsAmount: 1,
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