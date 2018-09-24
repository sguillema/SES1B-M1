<template>
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

