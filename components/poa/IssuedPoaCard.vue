<template>
  <div>
    <v-card color="white" @click.stop="dialog = true">
      <v-img :src="getImage(poa.staticImageId)" height="200px"></v-img>
      <v-card-title class="black--text">{{ poa.name }}</v-card-title>
      <v-card-text>
        <v-row class="mx-0 mb-2" v-if="!isFetching">
            This POA was created during the {{ auton.autonProfile.name }} event!
        </v-row>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
    </v-card>

    <v-dialog v-model="dialog" width="550">
        <v-card>
        <v-card-title class="text-h5 white--text primary">
            <span class="ml-4">POA view</span>
        </v-card-title>

        <div class="ml-5 mr-12">
            <v-card-text>
            <v-icon>mdi-folder-text</v-icon>
            <span class="ml-2">Name:</span>
            <span class="float-right">{{poa.name}}</span>
            </v-card-text>
        </div>
        <v-divider></v-divider>
        <div class="ml-5 mr-12">
            <v-card-text>
            <v-icon>mdi-clipboard-text-clock</v-icon>
            <span class="ml-2">Issue date:</span>
            <span class="float-right">{{issueDate}}</span>
            </v-card-text>
        </div>
        <v-divider></v-divider>
        <div class="ml-5 mr-12">
            <v-card-text>
            <v-icon>mdi-image</v-icon>
            <span class="ml-2">Image URL:</span>
            <a class="float-right" target="_blank" :href="getImage(poa.staticImageId)">Link to image</a>
            </v-card-text>
        </div>
        <v-divider></v-divider>
        <div class="ml-5 mr-12">
            <v-card-text>
            <v-icon>mdi-calendar</v-icon>
            <span class="ml-2">Event:</span>
            <a class="float-right" v-if="!isFetching" :href="`/auton/${auton.autonProfile.name}`">{{auton.autonProfile.name}}</a>
            </v-card-text>
        </div>
        <v-divider></v-divider>
        <div class="ml-5 mr-12">
            <v-card-text>
            <v-icon>mdi-crown</v-icon>
            <span class="ml-2">Owner:</span>
            <a class="float-right" v-if="!isFetching" :href="`/account/${account.name}`">{{account.name}}</a>
            </v-card-text>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn class="ml-1" color="primary" text @click="dialog = false">
            Close
            </v-btn>
        </v-card-actions>
        </v-card> 
    </v-dialog>
  </div>
</template>
<script>
export default {    
  name: "IssuedPoaCard",    
  props: {
    poa: Object,
  },  
  data() {
    return {
        dialog: false,
        auton: {},
        account: {},
        issueDate: "",
        isFetching: true,
    };
  },
  async beforeMount() {
    const autonWrapper = await this.$invoke("auton:getByID", {
      id: this.poa.autonId,
    });
    
   this.auton = autonWrapper.result;

   const accountWrapper = await this.$invoke("kalipoAccount:getByID", {
      id: this.poa.accountId,
    });

   this.account = accountWrapper.result;

   const date = new Date(parseInt(this.poa.issueDate));

   this.issueDate =   date.getDate() +
                      "/" +
                      date.getMonth() +
                      "/" +
                      date.getFullYear() 

   this.isFetching = false;
   console.log(this.auton);
   console.log(this.poa);
  },
  methods: {
    getImage(id) {
      return `/poa_images/${id}.png`;
    }
  },
};
</script>
<style scoped>
</style>
