<template>
  <v-card>
    <v-toolbar fixed flat>
      <v-card-title class="pa-0">
        <div class="text-h4 text--primary">Creating a new agreement</div>
      </v-card-title>
    </v-toolbar>
    <v-card-items>
      <v-col cols="12" md="4" class="pt-0" style="min-width: 100%;">
        <v-text-field 
          hide-details="auto" 
          solo 
          label="Search Template" 
          append-icon="mdi-magnify" 
          class="mt-4"
          v-model="searchString" 
          @input="searchTemplate">
        </v-text-field>
      </v-col>
    </v-card-items>
    <v-card-text>
      <v-item-group v-model="selected" mandatory>
        <div v-if="s_templates.length === 0" class="text-h4">No templates found</div>
        <v-row>
            <v-col v-for="(template, index) in this.s_templates" key="index" cols="6" class="px">
              <v-item v-slot="{ active, toggle }">
                <OptionCard 
                  :active="active" 
                  :toggle="toggle" 
                  :title=template.title 
                  :subTitle="template.subTitle"
                  :icon="template.icon" 
                  :template="template.icon"></OptionCard>
              </v-item>
            </v-col>
          </v-row>
      </v-item-group>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-col cols="6">
        <v-btn 
          @click="back">
          Back
        </v-btn>
      </v-col>
      <v-col cols="6" align="right">
        <v-btn 
          class="accent" 
          @click="selectTemplate">
          Next
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    selected: 0,
    searchString: "",
    templates: [
      { title: "Grant Contract", subTitle: "Template1", icon: "mdi-account-school", template: "test1", url: "./grant_contract" },
      { title: "Template2", subTitle: "Template2", icon: "mdi-blanco", template: "test2", url: "" },
      { title: "Template3", subTitle: "Template3", icon: "mdi-blanco", template: "test3", url: "" },
      { title: "Template4", subTitle: "Template4", icon: "mdi-blanco", template: "test4", url: "" },
      { title: "Template4", subTitle: "Template4", icon: "mdi-blanco", template: "test4", url: "" },
      { title: "Template4", subTitle: "Template4", icon: "mdi-blanco", template: "test4", url: "" },
    ],
    s_templates: []
  }),

  mounted: function () {
    this.searchTemplate()
  },

  methods: {
    selectTemplate() {
      this.$router.push(this.s_templates[this.selected].url);
    },

    back() {
      this.$router.push("/");
    },

    searchTemplate() {
      this.s_templates = this.templates.filter(template =>
        template.title.toLowerCase().includes(this.searchString.toLowerCase().trim()) ||
        template.subTitle.toLowerCase().includes(this.searchString.toLowerCase().trim())
      );
    }
  }
};
</script>