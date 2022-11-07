<template>
  <div>
    <v-card-title class="font-poppins primary--text"> Submitting a new proposal</v-card-title>
    <v-card-subtitle class="font-roboto">
      First choose the desired type that suits your proposal
    </v-card-subtitle>
    <v-container>
      <v-item-group>
        <v-container>
          <v-row>
            <v-col v-for="(proposal, i) in proposalTypes" :key="i" cols="12" md="6">
              <v-item v-slot="{ active, toggle }">
                <v-card :color="active ? '#0A75F3' : ''" class="d-flex align-center" height="125" @click="toggle">
                  <v-scroll-y-transition>
                    <div class="text-h6 flex-grow-1 text-center">
                      <v-btn class="elevation-0" depressed dark fab :color="active ? 'white' : ''">
                        <v-icon :color="active ? '#0A75F3' : ''"> {{ proposal.icon }} </v-icon>
                      </v-btn>
                      <br>
                      <div class="pt-2">
                        {{ proposal.name }}
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
  name: "Proposal",
  data() {
    return {
      proposalTypes: [{ 
        name: "Membership invitation", 
        icon: "mdi-account-plus" 
      }, 
      {
        name: "Poll",
        icon: "mdi-poll"
      }]
    }
  },
  methods:{
    change(){
      return red;
    }
  }
}
</script>

<style scoped>

</style>
