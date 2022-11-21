<template>
  <v-card>
    <v-img
      class="white--text align-end"
      height="200px"
      :src="getImage(poa.staticImageId)"
    >
    </v-img>
    <v-card-text>
      <div class="d-flex">
        <v-card-title>{{ poa.name }}</v-card-title>
        <v-spacer></v-spacer>
        <v-icon small class="mr-2">{{ "mdi-trophy" }}</v-icon>
      </div>
    </v-card-text>
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
