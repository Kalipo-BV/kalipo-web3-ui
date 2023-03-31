<template>
<!-- <improvement-proposal-card :parrentmessage="parentMessage"></improvement-proposal-card> -->
<div style="display: flex; flex-wrap: wrap; justify-content: start; margin: 20px 6% 0 6%">
<!--  <p>TEST: </p>{{ proposal }}-->
  <div style="margin: 30px 0 0 0"
       v-for="(item, i) in proposals"
       :key="i">
  <improvement-proposal-card :proposal="item"></improvement-proposal-card>
  </div>
</div>

</template>

  <script>
import improvementProposalCard from './improvementProposalCard.vue';
  export default {
    props: {
    proposals: [],
  },
  components: { improvementProposalCard },
  data() {
    return {

    }
  }
}
  </script>
