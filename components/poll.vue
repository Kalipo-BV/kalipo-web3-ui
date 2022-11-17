<template>
    <div>
      <v-card-title class="font-poppins primary--text"> Proposal Poll</v-card-title>
      <v-card-subtitle class="font-roboto accent--text">Choose a poll type</v-card-subtitle>
      <v-container>
        <v-item-group>
          <v-container>
            <v-row>
              <v-col v-for="(poll, i) in pollTypes" :key="i" cols="12" md="6">
                <v-item v-slot="{ active, toggle }">
                  <v-card :color="active ? '#0A75F3' : ''" class="d-flex align-center" height="125" @click="toggle">
                    <v-scroll-y-transition>
                      <div class="text-h6 flex-grow-1 text-center">
                        <v-btn class="elevation-0" depressed dark fab :color="active ? 'white' : '#212A42'">
                          <v-icon :color="active ? '#0A75F3' : ''"> {{ poll.icon }} </v-icon>
                        </v-btn>
                        <br>
                        <div class="pt-2 primary--text">
                          {{ poll.name }}
                        </div>
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
      </v-container>
    </div>
  </template>
  
  <script>
  export default {
    name: "Poll",
    data() {
      return {
        pollTypes: [{ 
          name: "Yes/No", 
          icon: "mdi-format-list-checks" 
        }, 
        {
          name: "Multi option",
          icon: "mdi-format-list-checkbox"
        }]
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  