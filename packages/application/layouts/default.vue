<template>
  <v-app>
    <v-toolbar class="nav top" fixed dense flat color="white">
      <v-spacer></v-spacer>
      <h3>{{this.$store.state.pageTitle}}</h3>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
    <v-bottom-nav class="nav bottom" :active.sync="bottomNav" :value="true" fixed color="white">
      <v-btn color="blue" flat value="home" to="/">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn color="blue" flat value="favorites" to="/packets">
        <span>Packets</span>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn color="blue" flat value="patients" to="/patients" v-if="userType === 'doctor'">
        <span>Patients</span>
        <v-icon>people</v-icon>
      </v-btn>

      <v-btn color="blue" flat value="doctors" to="/doctors" v-if="userType === 'patient'">
        <span>Doctors</span>
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

<style scoped>
.nav{
  box-shadow: none;
}
.nav.bottom{
  border-top: 1px solid #eee !important;
}
.nav.top{
  border-bottom: 1px solid #eee !important;
}
</style>

