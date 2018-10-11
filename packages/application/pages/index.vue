<template>
<<<<<<< HEAD
  <v-container class="container">
    <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md6>
        <!-- <div class="text-xs-center">
          <img src="/v.png" alt="Vuetify.js" class="mb-5" />
        </div> -->
        <v-card>
          <v-card-title class="headline">Welcome</v-card-title>
          <v-card-text>
            <p>This screen is a placeholder for now.</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="logout()">Log out</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
=======
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <!-- <div class="text-xs-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      </div> -->
      <v-card>
        <v-card-title class="headline">Welcome</v-card-title>
        <v-card-text>
          <p>This screen is a placeholder for now.</p>
        </v-card-text>
        <v-container fluid>
    <v-layout row wrap align-center>
      <v-flex xs6>
        <v-subheader>Avaliable Doctors</v-subheader>
      </v-flex>
      <v-flex xs6>
        <v-select
          :items="states"
          v-model="e1"
          menu-props="auto"
          label="Select"
          hide-details
          prepend-icon="map"
          single-line
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="logout()">Log out</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
>>>>>>> 4e72bcc3cab33d87dff6c0e6cde5333ac25bc714
</template>

<script>
import Cookies from 'js-cookie'

export default {
  middleware: 'authenticated',
  methods: {
    logout () {
      this.$store.commit('clearAppState')
      // this.$store.commit('clearAuth')
      // this.$store.commit('clearUser')
      Cookies.remove('auth')
      Cookies.remove('user')
      this.$router.push({
        path: '/login'
      })
    }
  },
  fetch ({store}) {
    store.commit('updatePageTitle', 'Home')
  }
}
</script>

<style scoped>
.container{
  margin-top: 56px;
  margin-bottom: 56px;
}
</style>


