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
        <div v-for="(provision, index) in customValue">
            <v-container style="min-width: 100%;">
                <v-row>
                    <v-col
                        cols="12"
                        lg="2"
                        hide-details="auto"
                        class="d-flex align-center justify-center"
                    >
                        <v-autocomplete
                            v-model="provision.type"
                            :items="items"
                            outlined
                            dense
                            label="Provision type"
                            prepend-icon="mdi-help" 
                            solo
                            required
                            hide-details="auto"
                            :rules="[v => !!v || 'This field can\'t be left open!']"
                        ></v-autocomplete>
                    </v-col>
            
                    <v-col
                        cols="12"
                        lg="4"
                    >
                        <v-textarea
                            rows="1"
                            auto-grow
                            solo
                            label="Provision info"
                            type="text"
                            clearable
                            required
                            hide-details="auto"
                            :rules="[v => !!v || 'This field can\'t be left open!']"
                            v-model="provision.info"
                            prepend-icon="mdi-card-text-outline" 
                        />
                    </v-col>

                    <v-col
                        cols="12"
                        lg="5"
                    >
                        <div v-if="provision.type === 'Boolean'">
                            <v-switch
                                style="margin-top: 0;"
                                v-model="provision.data"
                                required
                                hide-details="auto"
                                :label="`${provision.data?.toString() || 'false'}`"
                                prepend-icon="mdi-format-list-bulleted" 
                            ></v-switch>
                        </div>
                        <div v-else-if="provision.type === 'Number'">
                            <v-text-field
                                solo
                                label="Provision"
                                type="number"
                                clearable
                                required
                                hide-details="auto"
                                :rules="[v => !!v || 'This field can\'t be left open!']"
                                v-model="provision.data"
                                prepend-icon="mdi-format-list-bulleted" 
                            />
                        </div>
                        <div v-else>
                            <v-textarea
                                rows="1"
                                auto-grow
                                solo
                                label="Provision"
                                type="text"
                                clearable
                                required
                                hide-details="auto"
                                :rules="[v => !!v || 'This field can\'t be left open!']"
                                v-model="provision.data"
                                prepend-icon="mdi-format-list-bulleted" 
                            />
                        </div>
                    </v-col>

                    <v-col
                        cols="12"
                        lg="1"
                    >
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    style="height: 100%; max-width: 100%;"
                                    color="remove"
                                    block
                                    @click="removeProvision"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                -
                                </v-btn>
                            </template>
                            <span>Remove provision</span>
                        </v-tooltip>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <v-btn
            block
            width="100%"
            color="light-green lighten-2"
            @click="addProvision"
        >
            Add provision
        </v-btn>
    </div>
  </template>
  <script>
    export default {
        props: ["custom"],

        computed: {
            customValue: {
                get: function () {
                    return this.custom;
                },
                set: function (newValue) {
                    this.$emit("update:custom", newValue);
                },
            },
        },

        data: () => ({
            items: [
                "Text",
                "Number",
                "Boolean",
            ]	
        }),

        methods: {
            addProvision() {
                this.customValue.push({
                    type: "Text", info: null, data: null
                })
            },
            removeProvision(index) {
                this.customValue.splice(index, 1)
            },
        },
    }
  </script>