<template>
  <v-app>
    <v-content>
      <v-container class="container">
        <nuxt />
      </v-container>
    </v-content>
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      fixed
      color="white"
    >
      <v-btn
        color="teal"
        flat
        value="recent"
        to="/"
      >
        <span>Home</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="favorites"
        to="/packet"
      >
        <span>Packet</span>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="nearby"
        to="/map"
      >
        <span>Map</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        fixed: true,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        ],
        title: 'SES1B',
        bottomNav: 'recent'
      }
    }
  }
</script>

</<style scoped>
.container{
  margin-bottom: 56px;
}
</style>

