<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="650">
      <v-card>
      <slot></slot>
        <v-divider class=""></v-divider>
        <v-card-actions>
          <v-btn color="#0A75F3" class="white--text" width="100px" height="45px">
            <v-icon light>
              mdi-arrow-left
            </v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="#0A75F3" class="white--text" width="100px" height="45px">
            <v-icon light>
              mdi-arrow-right
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: "Dialogue",
  data () {
    return {
      dialog: true,
    }
  },
}
</script>

<style scoped>

</style>
