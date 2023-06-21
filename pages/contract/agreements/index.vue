<template>
  <v-container style="min-width: 90%;">
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
            <v-btn value="In progress" @click="sortOnStatus('Local copy')" style="margin-right: 20px;">In progress</v-btn>
            <v-btn value="Active" @click="sortOnStatus('Outgoing')" style="margin-right: 20px;">Active</v-btn>
            <v-btn value="Inactive" @click="sortOnStatus('Inactive')">Inactive</v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col align="right">
          <v-btn color="accent" @click="() => {dialog = true}">Create new</v-btn>
        </v-col>
      </v-row>
    </div>
    <v-card>
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
          <router-link v-if="item.status ==`Local copy`" :to="`/contract/grant_contract?id=${item.id}`">
            <v-btn style="min-width: 65%" color="accent" small>Edit</v-btn>
          </router-link>
          <router-link v-else :to="{ path: '/contract/grant_contract', query: { bid: item.id, tid: item.tid, version: item.version }}">
            <v-btn style="min-width: 65%" color="accent" small>View</v-btn>
          </router-link>          
        </template>
          <template v-slot:item.title="{ item }">
            {{ item.formData.title }}
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
    head() {
      return {
        title: "Kalipo - Agreements overview",
      }
    },

    data: () => ({
      headers: [
        { text: "Agreements", align: 'center', value: "agreement" },
        { text: "Title", align: 'center', value: "title" },
        { text: "Agreement Type", align: 'center', value: "type" },
        { text: "Version", align: 'center', value: "version" },
        { text: "Status", align: 'center', value: "status" },
      ],
      search: "",
      frontendData: [],
      backendData: [],
      filterd_data: [],
      toggle_exclusive: "All",
      dialog: false,
      loading: true,
    }),

    computed: {
      data: function() {        
        return this.frontendData.concat(this.backendData);
      },
    },

    methods: {
      async getAllWithInfo() {
        try {
          await this.getBEAllWithInfo();
        } catch (Inactive) {}
        await this.getFEAllWithInfo();
        this.filterd_data = this.data;
      },

      async getBEAllWithInfo() {
        this.backendData = [];
        const existingAccoundIdWrapper = await this.$invoke("agreement:getAllByAccount", {id: this.$store.state.wallet.account.accountId});

        existingAccoundIdWrapper.result.forEach(element1 => {
          element1.agreementVersion.forEach(async element2 => {
            const result = await this.$invoke("grantContract:getByID", { id: element2.contract });
            if(result.result != null) {
              result.result.tid = element1.tid;
              result.result.status = "Outgoing";
              result.result["version"] = element2.version;
              result.result.id = element2.contract;
              this.backendData.push(result.result); 
            }
          });
        });
      },

      async getFEAllWithInfo() {
        return new Promise((resolve, reject) => {
          this.frontendData = [];
          const agreements = this.$store.state.contract.allContracts();
          //shh this isn't cheese       needs to be changed in BE/DB {{ item.version }}
          for (const contract in agreements) {
            agreements[contract].status = "Local copy";
            agreements[contract].title = 'Edit legal contract';
            agreements[contract].id = contract;
            this.frontendData.push(agreements[contract]);
          };
          resolve(this.frontendData);
        });
      },

      async sortOnStatus(info) {
        this.loading = true;
        if(info !== "All") {
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