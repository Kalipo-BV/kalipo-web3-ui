<template>
<improvement-proposal-card :parrentmessage="parentMessage"></improvement-proposal-card>
</template>
  
  <script>
import improvementProposalCard from './improvementProposalCard.vue';
  export default {
  components: { improvementProposalCard },
  data() {
    return {
      parentMessage: 'Hello from parent component!'
    }
  }
}
  </script>
  