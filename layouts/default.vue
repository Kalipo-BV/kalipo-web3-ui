<template>
  <v-app>
    <v-navigation-drawer 
    permanent 
    class="primary" 
    v-model="drawer" 
    :clipped="clipped" 
    fixed 
    app>
      <v-list>
        <v-list-item 
        v-for="(item, i) in items" 
        :key="i" 
        :to="item.to" 
        router 
        exact 
        class="white--text">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
   
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
 
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home-city-outline',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-web',
          title: 'Autons',
          to: '/'
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Users',
          to: '/'
        },
        {
          icon: 'mdi-text-search',
          title: 'Logs',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Vote',
          to: '/vote'
        },
      ],
      title: 'Kalipo'
    }
  }
}
</script>
