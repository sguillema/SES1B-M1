<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title>
          <h1>Packets</h1>
        </v-card-title>
        <v-card-text>
          <v-list subheader three-line>
            <v-list-tile to=''>
              <v-list-tile-content>
                <v-list-tile-title>Notifications</v-list-tile-title>
                <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
           </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios'

  export default {
    middleware: 'authenticated',
    data () {
      return {
        hello: 'hello'
      }
    },
    methods: {
    },
    fetch ({store}) {
      store.commit('updatePageTitle', 'Packets')
    },
    mounted () {
      switch (this.$store.state.userType.toLowerCase()) {
        case 'doctor':
          axios.get(`${process.env.apiUrl}/packets?doctor=${this.$store.state.userId}`)
          break
        case 'patient':
          axios.get(`${process.env.apiUrl}/packets?user=${this.$store.state.userId}`)
          break
      }
    }
  }
</script>

