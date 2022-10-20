<template>
  <!-- <Parameter></Parameter> -->
  <Dialogue>
    <Parameter></Parameter>
  </Dialogue>
</template>

<script>
import Parameter from '~/components/Parameter.vue';
export default {
    data() {
        return {
            dialog: false,
        };
    },
    components: { Parameter, Statement, Dialogue }
}
</script>