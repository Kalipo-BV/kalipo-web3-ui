<template lang="">
  <div>
    <div v-for="({ item }, i) in poas" :key="i">{{}}</div>
    <!-- {{ poas.length }} -->
  </div>
</template>
<script>
export default {
  props: {
    member: Object,
    poas: Array,
  },
  data() {
    return {};
  },
  mounted() {
    console.log("MOUNTED AVAILABLEPOAISSUE");
  },
};
</script>
