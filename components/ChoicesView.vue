<template>
    <v-card elevation="0">
        <v-card-title class="primary--text">
            Multiple choice
        </v-card-title>
        <v-card-subtitle class="black--text">
            Give a clear description of your choices
        </v-card-subtitle>
        <v-card-text>
            <v-row justify="center">
                <v-col cols="1">
                    <v-label>
                        {{ textFieldsAmount }}/4
                    </v-label>
                </v-col>
            </v-row>
            <v-container id="scroll-target" style="max-height: 280px" class="overflow-y-auto">
                <v-row v-scroll:#scroll-target="onScroll">
                    <v-col cols="12" v-for="i in textFieldsAmount" :key="i" class="text-fields-row">
                        <v-row>
                            <v-col cols="11" class="py-0">
                                <v-text-field :id="'choice_text_field' + i" :label="i + ') Choice *'" required counter
                                    maxlength="100"></v-text-field>
                            </v-col>
                            <v-col cols="1" class="px-1">
                                <v-btn :disabled="textFieldsAmount <= 2" @click="remove" elevation="1" icon>
                                    <v-icon>
                                        {{ "mdi-trash-can-outline" }}
                                    </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
            <v-row justify="center">
                <v-col cols="1" class="pl-1">
                    <v-btn :disabled="textFieldsAmount > 3" @click="add" icon large>
                        <v-icon>
                            {{ "mdi-plus-circle-outline" }}
                        </v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <small>*indicates required field</small>
            <v-form>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="3">
                            <v-text-field id="passphrase" label="passphrase">
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
            <v-btn @click="addChoicesToBlockchain">
                SEND BLOCKCHAIN
            </v-btn>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            offsetTop: 0,
            textFields: [],
            textFieldsAmount: 2,
        }
    },

    methods: {
        onScroll(e) {
            this.offsetTop = e.target.scrollTop
        },

        add() {
            this.textFieldsAmount++
        },

        remove() {
            this.textFieldsAmount--
        },

        addChoicesToArray() {
            for (let i = 1; i <= this.textFieldsAmount; i++) {
                this.textFields.push({ label: "Choice" + i, value: document.querySelector("#choice_text_field" + i) })
            }
            this.textFields.forEach(element => {
                console.log(element.value)
            })
        },

        async addChoicesToBlockchain() {
            this.addChoicesToArray();
            const moduleId = 1001;
            const assetId = 1;
            const asset = {
                choicesObject: this.textFields,
            };
            const passphrase = document.querySelector("#passphrase").value;
            const transactionWrapper = await this.$createTransaction(moduleId, assetId, asset, passphrase);
        },

        async getChoicesFromBlockchain() {
            const choicesWrapper = await this.$invoke("choices:getChoices", {});
            if (!choicesWrapper.error) {
                console.log(choicesWrapper.content)
            } else {
                console.log(choicesWrapper.message)
            }
        }
    }
}
</script>
