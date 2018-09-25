<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title>
          <h1>Packet {{$route.params.id}}</h1>
        </v-card-title>
        <v-card-text>
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
        packet: null
      }
    },
    methods: {
      submit () {
      },
      clear () {
      }
    },
    mounted () {
      axios.get(`${process.env.apiUrl}/packets/${this.$route.params.id}`)
        .then(res => {
          this.packet = res.data
        })
    },
    fetch ({store, route}) {
      store.commit('updatePageTitle', `Packet ${route.params.id}`)
    }
  }
</script>

<style scoped>

</style>
