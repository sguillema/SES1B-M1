<template>
  <v-app>
    <v-content>
      <v-container class="container">
        <nuxt />
      </v-container>
    </v-content>
    <v-bottom-nav :active.sync="bottomNav" :value="true" fixed color="white">
      <v-btn color="blue" flat value="home" to="/">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn color="blue" flat value="favorites" to="/packet">
        <span>Packets</span>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn color="blue" flat value="patients" to="/patients" v-if="userType === 'doctor'">
        <span>Patients</span>
        <v-icon>people</v-icon>
      </v-btn>

      <v-btn color="blue" flat value="map" to="/map">
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
        bottomNav: 'recent',
        userType: this.$store.state.userType
      }
    }
  }
</script>

</<style scoped>
.container{
  margin-bottom: 56px;
}
</style>

