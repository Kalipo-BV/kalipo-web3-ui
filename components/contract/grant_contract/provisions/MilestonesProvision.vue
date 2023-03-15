<!-- Kalipo B.V. - the DAO platform for business & societal impact 
 * Copyright (C) 2022 Peter Nobels and Matthias van Dijk
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

<template>
    <div>
        <div v-for="(milestone, index) in milestones">
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
                        lg="2"
                    >
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    style="height: 100%; max-width: 100%;"
                                    width="fit-content"
                                    color="remove"
                                    block
                                    @click="removeMilestone(index)"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                -
                                </v-btn>
                            </template>
                            <span>Remove milestone</span>
                        </v-tooltip>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <v-btn
            color="light-blue lighten-3"
            block
            width="100%"
            @click="addMilestone"
        >
            Add milestone
        </v-btn>
    </div>
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