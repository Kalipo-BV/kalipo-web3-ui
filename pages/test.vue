<template>
  <!-- <Parameter></Parameter> -->
  <Dialogue>
    <Parameter></Parameter>
  </Dialogue>
</template>

<script>
import Parameter from '~/components/Parameter.vue';
import Dialogue from '~/components/Dialogue.vue';

export default {
    data() {
        return {
            dialog: false,
        };
    },
    components: { Parameter, Dialogue }
}
</script>