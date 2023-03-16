<template>
  <v-container>
    <div class="text-h1">Select Agreement Propasal Template</div>
    <v-row>
        <v-col cols="12" md="4">
          <v-text-field 
          solo
          label="Search Template"
          append-icon="mdi-magnify"
          class="mt-4"
          ></v-text-field>
        </v-col>
      </v-row>
    <v-item-group v-model="selected" mandatory>
      <v-row>
        <v-col cols="6">
          <v-item v-slot="{ active, toggle }">
            <OptionCard
            :active="active"
            :toggle="toggle"
            title="Template1"
            subTitle="Template1"
            icon="mdi-account-school"
            template="test1"
            ></OptionCard>
          </v-item>
        </v-col>
        <v-col cols="6">
          <v-item v-slot="{ active, toggle }">
            <OptionCard
            :active="active"
            :toggle="toggle"
            title="Template2"
            subTitle="Template2"
            icon="mdi-account-school"
            template="test2"
            ></OptionCard>
          </v-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-item v-slot="{ active, toggle }">
            <OptionCard
            :active="active"
            :toggle="toggle"
            title="Template3"
            subTitle="Template3"
            icon="mdi-account-school"
            template="test3"
            ></OptionCard>
          </v-item>
        </v-col>
        <v-col cols="6">
          <v-item v-slot="{ active, toggle }">
            <OptionCard
            :active="active"
            :toggle="toggle"
            title="Template4"
            subTitle="Template4"
            icon="mdi-account-school"
            template="test4"
            ></OptionCard>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
    <v-row>
      <v-col cols="6">
        <v-btn >Back</v-btn>
      </v-col>
      <v-col cols="6" align="right">
        <v-btn 
        class="accent"
        @click="selectTemplate"
        >Next</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      selected: 0,
    }),
    methods: {
      selectTemplate() {
        this.$router.push('./grant_contract');
      }
    }
  };
</script>