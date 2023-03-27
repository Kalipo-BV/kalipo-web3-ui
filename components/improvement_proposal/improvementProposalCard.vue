<template>
  <div>

   
    <div  class="white" style="width: 300px; margin-right: 30px; padding-left: 20px; padding-top: 10px; border-radius: 7px; padding-bottom: 10px; display: flex;">
       <div style="width: 90%;">
          <p style="color: #0F6AF1;" class="text-h1 mb-2">{{ message }}</p>

    <p></p>
    <div tabindex="0" class="v-card v-card--flat v-card--link v-sheet theme--light white"  :style="{ width: '300px', marginRight: '30px', paddingLeft: '20px', paddingTop: '10px', borderRadius: '7px', paddingBottom: '10px', display: 'flex' }"  
    link @click="toProposal">
       <div :style="{width: '90%'}">
          <p :style="{color: '#0F6AF1'}" class="text-h1 mb-2">
            Title
          </p>

          <div>
            <p class="mb-0">
              Priority: 2
            </p>
            <p class="mb-0">
              Votes: 8
            </p>
          </div>
       </div>
       <div class="d-flex align-center" :style="{width: '10%'}">
        <p class="font-weight-regular" :style="{color: '#0F6AF1', marginBottom:'0px', fontsize: 'xx-large'}">
          >
        </p>
       </div>
       </div>
       </div>
    </div>
  </div>
  
</template>

<script>
export default {
  props: {
    message: String
  },

  data: () => ({}),
  methods: {
    toProposal() {
      const uri = `/auton/${this.$route.params.autonId}/improvementproposal/detail`;
      console.log(uri);
      this.$router.push(uri);
    }
  },
  props: {
    improvementproposal: String
  }
  }
</script>
