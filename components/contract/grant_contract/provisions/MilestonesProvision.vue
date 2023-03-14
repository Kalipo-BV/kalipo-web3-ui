<template>
    <tbody>
        <tr v-for="(milestone, index) in milestones">
            <v-container>
                <v-row>
                    <v-col
                        cols="12"
                        lg="6"
                    >
                        <v-textarea
                            rows="1"
                            solo
                            clearable
                            label="milestone"
                            auto-grow
                            hide-details="auto"
                            prepend-icon="mdi-flag-triangle" 
                            v-bind="milestone.info"
                        />
                    </v-col>
            
                    <v-col
                        cols="12"
                        lg="4"
                    >
                        <v-text-field
                            solo
                            label="Amount"
                            prepend-icon="mdi-cash-multiple" 
                            type="number"
                            clearable
                            required
                            hide-details="auto"
                            :rules="[v => !!v || 'This field can\'t be left open!']"
                            v-bind="milestone.amount"
                        />
                    </v-col>

                    <v-col
                        cols="12"
                        lg="1"
                    >
                        <v-btn
                            style="height: 100%;"
                            color="remove"
                            block
                            @click="removeMilestone(index)"
                        >
                            Remove milestone
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </tr>
        <v-btn
            color="light-blue lighten-3"
            block
            width="100%"
            @click="addMilestone"
        >
            Add milestone
        </v-btn>
    </tbody>
  </template>
  <script>
    export default {
        data: () => ({
            milestones: [],
        }),
        methods: {
            addMilestone() {
                this.milestones.push({
                    info: "", amount: 0
                })
            },
            removeMilestone(index) {
                this.milestones.pop(index)
            },
        },
    }
  </script>