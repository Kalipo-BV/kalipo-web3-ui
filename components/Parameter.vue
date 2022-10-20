<template>
    <v-card elevation="0">
        <v-card-title class="primary--text">
            Parameters
        </v-card-title>
        <v-card-subtitle>
            The given parameters
        </v-card-subtitle>
        <v-container class="green">
            <v-row>
                <v-col sm="12" >
                    <p>Start date/time: &nbsp; &nbsp; 2 Days - 15 October 2022 09:00</p>
                    <p>End date/time: &nbsp; &nbsp; &nbsp; 2 Days - 17 October 2022 23:59</p>
                    <p>Eligible voter: &nbsp; </p>
                    <p>Voting window: &nbsp; </p>
                    <p>Attendence: &nbsp; </p>
                    <p> % answer: &nbsp;</p>
                </v-col>
            </v-row>
        </v-container>
        <!-- <v-card-text>
            <v-row justify="center">
                <v-col cols="1">
                    <v-label>
                        {{ textFieldsAmount }}/4
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
                                <v-btn :disabled="textFieldsAmount == 2" @click="remove(i)" elevation="1" icon>
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
        </v-card-text> -->
    </v-card>
</template>

