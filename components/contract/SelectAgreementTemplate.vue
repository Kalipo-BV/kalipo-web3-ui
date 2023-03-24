<template>
  <v-container>
    <div class="text-h1" style="text-align: center;">Select Agreement Propasal Template</div>
    <v-row>
        <v-col cols="12" md="4" style="min-width: 100%;">
          <v-text-field 
            hide-details="auto"
            solo
            label="Search Template"
            append-icon="mdi-magnify"
            class="mt-4"
            v-model="searchString"
            @input="searchTemplate"
          ></v-text-field>
        </v-col>
      </v-row>
    <v-item-group v-model="selected" mandatory>
      <div v-if="s_templates.length === 0" class="text-h4">No templates found</div>
      <div v-for="(template, index) in this.s_templates">
        <v-col cols="12">
          <v-item v-slot="{ active, toggle }">
            <OptionCard
              :active="active"
              :toggle="toggle"
              :title=template.title
              :subTitle="template.subTitle"
              :icon="template.icon"
              :template="template.icon"
            ></OptionCard>
          </v-item>
        </v-col>
      </div>
    </v-item-group>
    <v-row class="ma-5">
      <v-col cols="6">
        <v-btn @click="back">Back</v-btn>
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
      searchString: "",
      templates: [
        {title: "Grant Contract", subTitle: "Template1", icon: "mdi-account-school", template: "test1", url: "./grant_contract"},
        {title: "Template2", subTitle: "Template2", icon: "mdi-blanco", template: "test2", url: ""}, 
        {title: "Template3", subTitle: "Template3", icon: "mdi-blanco", template: "test3", url: ""}, 
        {title: "Template4", subTitle: "Template4", icon: "mdi-blanco", template: "test4", url: ""}, 
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

      back()
      {
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