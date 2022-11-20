<template>
  <v-card>
    <v-img
      class="white--text align-end"
      height="200px"
      :src="getImage(poa.staticImageId)"
    >
    </v-img>
    <v-card-title>{{ poa.name }}</v-card-title>
  </v-card>
</template>
<script>
export default {
  props: {
    poa: Object,
  },
  data() {
    return {};
  },
  methods: {
    getImage(id) {
      return `/poa_images/${id}.png`;
    },
  },
};
</script>
