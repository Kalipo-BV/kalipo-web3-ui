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
            <v-btn>All</v-btn>
            <v-btn>In progress</v-btn>
            <v-btn>Active</v-btn>
            <v-btn>Inactive</v-btn>
          </v-col>
          <v-col align="right">
            <v-btn color="accent">Create new</v-btn>
          </v-col>
        </v-row>
      </div>

    <v-data-table
      :headers="headers"
    >
      <template v-slot:item.agreement="{ item }">
          <v-btn color="accent" small
            >View</v-btn
          >
        </template>
        <template v-slot:item.title="{ item }">
          <v-chip dark outlined small>
            {{ item.title }}
          </v-chip>
        </template>
        <template v-slot:item.type="{ item }">
          <v-chip dark outlined small>
            {{ item.type }}
          </v-chip>
        </template>
        <template v-slot:item.version="{ item }">
          <v-chip dark outlined small>
            {{ item.version }}
          </v-chip>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip dark outlined small>
            {{ item.status }}
          </v-chip>
        </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: "Agreements", value: "agreement" },
      { text: "Title", value: "title" },
      { text: "Agreement Type", value: "type" },
      { text: "Version", value: "version" },
      { text: "Status", value: "status" },
    ],
    search: ""
  })
}
</script>