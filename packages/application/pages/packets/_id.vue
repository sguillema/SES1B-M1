<template>
  <v-container class="container">
    <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md6>
        <v-card>
          <v-card-title>
            <h1>Packet {{$route.params.id}}</h1>
          </v-card-title>
          <v-card-text>
            <p>date created: {{processDate(packet.created_at, 'DD/MM/YYYY')}}</p>
            <p>patient id: <a :to="'patients/' + packet.user_id">{{packet.user_id}}</a></p>
            <p>doctor id: <a :to="'doctors/' + packet.doctor_id">{{packet.doctor_id}}</a></p>
            <p>status: <v-chip class="chip" :color="packet.status == 'responded' ? 'green' : 'primary'" text-color="white" small>{{packet.status}}</v-chip></p>
            <div>
              <h3>Content</h3>
              <p>{{packet.content}}</p>
            </div>
            <p>location: {{packet.location || 'Not attached'}}</p>
            <p>heart rate: {{packet.heart_rate}}</p>
            <div>
              <h3>Attachments</h3>
              <div>
                <h5>Video (placeholder)</h5>
                <v-btn class="download-button" disabled color="primary" block>
                  Download
                </v-btn>
              </div>
              <div>
                <h5>Document (placeholder)</h5>
                <v-btn class="download-button" disabled color="primary" block>
                  Download
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'

  export default {
    middleware: 'authenticated',
    data () {
      return {
        packet: {}
      }
    },
    methods: {
      submit () {
      },
      clear () {
      },
      processDate (date, format) {
        return moment(date).format(format)
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
.container{
  margin-top: 56px;
  margin-bottom: 56px;
}
.chip{
  text-transform: capitalize;
  height: 20px;
}
</style>
