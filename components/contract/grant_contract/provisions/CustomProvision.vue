<template>
    <tbody>
        <tr v-for="(provision, index) in provisions">
            <v-container>
                <v-row>
                    <v-col
                        cols="12"
                        lg="3"
                    >
                        <v-autocomplete
                            v-model="provision.type"
                            :items="items"
                            outlined
                            dense
                            label="Provision type"
                            prepend-icon="mdi-help" 
                            solo
                            clearable
                            required
                            hide-details="auto"
                            :rules="[v => !!v || 'This field can\'t be left open!']"
                        ></v-autocomplete>
                    </v-col>
            
                    <v-col
                        cols="12"
                        lg="8"
                    >
                        <div v-if="provision.type === 'Boolean'">
                            <v-switch
                                required
                                label="True or False"
                                v-bind="provision.data"
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
                                v-bind="provision.data"
                                prepend-icon="mdi-format-list-bulleted" 
                            />
                        </div>
                        <div v-else>
                            <v-text-field
                                solo
                                label="Provision"
                                type="text"
                                clearable
                                required
                                hide-details="auto"
                                :rules="[v => !!v || 'This field can\'t be left open!']"
                                v-bind="provision.data"
                                prepend-icon="mdi-format-list-bulleted" 
                            />
                        </div>
                    </v-col>

                    <v-col
                        cols="12"
                        lg="1"
                    >
                        <v-btn
                            style="height: 100%;"
                            color="remove"
                            block
                            @click="removeProvision"
                        >
                            Remove provision
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </tr>
        <v-btn
            color="add"
            block
            width="100%"
            @click="addProvision"
        >
            Add provision
        </v-btn>
    </tbody>
  </template>
  <script>
    export default {
        data: () => ({
            provisions: [],
            items: [
                "Text",
                "Number",
                "Boolean",
            ]	
        }),
        methods: {
            addProvision() {
                this.provisions.push({
                    type: "Text", data: null
                })
            },
            removeProvision(index) {
                this.provisions.splice(index, 1)
            },
        },
    }
  </script>