<template>
  <v-container>
    <div class="mt-4">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            append-icon="mdi-magnify"
            label="Search a agreement"
            solo
            hide-details
            v-model="search"
            style="max-width: 250px"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mb-2">
        <v-col>
          <v-btn-toggle v-model="toggle_exclusive" group outlined class="mx-4">
            <v-btn value="All" @click="sortOnStatus('All')" style="margin-right: 20px;">All</v-btn>
            <v-btn value="In progress" @click="sortOnStatus('In progress')" style="margin-right: 20px;">In progress</v-btn>
            <v-btn value="Active" @click="sortOnStatus('Active')" style="margin-right: 20px;">Active</v-btn>
            <v-btn value="Inactive" @click="sortOnStatus('Inactive')">Inactive</v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col align="right">
          <v-btn color="accent" @click="() => {dialog = true}">Create new</v-btn>
        </v-col>
      </v-row>
    </div>
    <v-card>
      <!-- <v-card-title>
        Agreements
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title> -->
      <v-data-table
        item-key="name"
        class="elevation-1"
        :loading="loading"
        loading-text="Loading... Please wait"
        :headers="headers"
        :items="filterd_data"
        :search="search"
      >
        <template v-slot:item.agreement="{ item }">
          <v-btn style="min-width: 65%" color="accent" small>View</v-btn>
        </template>
          <template v-slot:item.title="{ item }">
            {{ item.title }}
          </template>
          <template v-slot:item.type="{ item }">
              {{ item.type }}
          </template>
          <template v-slot:item.version="{ item }">
            {{ item.version }} <!-- needs to be changed in BE/DB {{ item.version }}-->
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip outlined small>
              {{ item.status }}
            </v-chip>
          </template> 
      </v-data-table>
    </v-card>

    <v-dialog scrollable v-model="dialog" max-width="500">
      <SelectAgreementTemplate />
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      headers: [
        { text: "Agreements", align: 'center', value: "agreement" },
        // { text: "Title", align: 'center', value: "title" },
        // { text: "Agreement Type", align: 'center', value: "type" },
        // { text: "Version", align: 'center', value: "version" },
        // { text: "Status", align: 'center', value: "status" },
        { text: "Title", value: "title" },
        { text: "Agreement Type", value: "type" },
        { text: "Version", value: "version" },
        { text: "Status", value: "status" },
      ],
      search: "",
      data: [],
      filterd_data: [],
      toggle_exclusive: "All",
      dialog: false,
      loading: true,
    }),

    methods: {
      async getBySetIdTest(id) {       
        const existingAccoundIdWrapper = await this.$invoke("grantContract:getByID", { id: id });
      },

      async getAllWithInfo() {       
        const existingAccoundIdWrapper = await this.$invoke("grantContract:getAllInfo");
 
        //shh this isn't cheese       needs to be changed in BE/DB {{ item.version }}
        existingAccoundIdWrapper.result.forEach(element => {
          element.status = "Outgoing";
          element["version"] = Math.floor(Math.random() * (4 - 1 + 1) + 1);
          element.title = 'New legal contract' 
        });
        this.data = existingAccoundIdWrapper.result;
        //

        this.filterd_data = this.data;
      },

      async sortOnStatus(info) {
        this.loading = true;
        if(info !== "All" && info !== "Active") {
          this.filterd_data = this.data.filter((item) => item.status === info);
        } else {
          this.filterd_data = this.data;
        }
        this.loading = false;
      },
    },

    beforeMount() {
      this.getAllWithInfo();
      this.filterd_data = this.data;
      this.loading = false;
    },
  }
</script>