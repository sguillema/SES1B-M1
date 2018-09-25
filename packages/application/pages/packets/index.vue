<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title>
          <h1>Packets</h1>
        </v-card-title>
        <v-card-text>
          <v-list subheader three-line>
            <div v-for="(packet, index) in this.$store.state.userPackets" :key="packet.uid">
              <v-list-tile :to="'packets/' + packet.uid">
                <v-list-tile-content>
                  <v-list-tile-title>Packet - {{packet.uid}} <v-chip class="chip" :color="packet.status == 'responded' ? 'green' : 'primary'" text-color="white" small>{{packet.status}}</v-chip></v-list-tile-title>
                  <v-list-tile-sub-title>
                    id: {{packet.uid}}
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title>
                    date created: {{processDate(packet.created_at, 'DD/MM/YYYY')}}
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title>
                    patient: {{packet.user_id}}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-if="index < $store.state.userPackets.length - 1" :key="index"></v-divider>
            </div>
           </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'

  export default {
    middleware: 'authenticated',
    data () {
      return {
        hello: 'hello'
      }
    },
    methods: {
      processDate (date, format) {
        return moment(date).format(format)
      }
    },
    fetch ({store}) {
      store.commit('updatePageTitle', 'Packets')
    },
    mounted () {
      // if (this.$store.state.userPackets == null) {
      switch (this.$store.state.userType.toLowerCase()) {
        case 'doctor':
          axios.get(`${process.env.apiUrl}/packets?doctor=${this.$store.state.userId}`)
            .then(res => {
              this.$store.commit('updatePackets', res.data)
            })
          break
        case 'patient':
          axios.get(`${process.env.apiUrl}/packets?user=${this.$store.state.userId}`)
            .then(res => {
              this.$store.commit('updatePackets', res.data)
            })
          break
      }
      // }
    }
  }
</script>

<style scoped>
.chip{
  text-transform: capitalize;
  height: 20px;
}
</style>


