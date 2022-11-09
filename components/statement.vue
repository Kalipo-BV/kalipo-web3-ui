<template>
  <div>
    <v-card-title class="font-poppins primary--text"> Creating a poll</v-card-title>
    <v-card-subtitle class="font-roboto accent--text">Give us your title and describe why you're creating this poll.</v-card-subtitle>
    <v-container class="">
      <v-row>
        <v-col sm="12">
          <v-text-field
            name="StatementField"
            v-model="statement"
            :rules="statementRules"
            counter
            maxlength="50"
            hint="Make your statement simple and direct"
            label="Title"
          ></v-text-field>
        </v-col>
        <v-col sm="12">
          <v-text-field
            name="AddedValueField"
            v-model="addedValue"
            :rules="addedValueRules"
            counter
            maxlength="100"
            hint="What is the added value of this poll"
            label="Added value"
          ></v-text-field>
        </v-col>
        <v-col sm="12">
          <v-textarea
            name="DescriptionField"
            filled
            label="Description"
            auto-grow
            maxlength="300"
            counter
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>

export default {
  name: "Statement",
  data() {
    return {
      statement: '',
      addedValue: '',
      statementRules: [v => v.length <= 50 || 'Max 50 characters'],
      addedValueRules: [v => v.length <= 100 || 'Max 100 characters'],

    }
  },
}
</script>

<style scoped>

</style>
