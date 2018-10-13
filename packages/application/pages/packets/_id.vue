<template>
  <div class="page">
    <v-card>
      <v-card-title class="title-container">
        <h2>{{`Packet sent on - ${processDate(packet.created_at, 'DD/MM/YYYY')}`}}</h2>
        <span class="subtitle">ref id: {{packet.uid}}</span>
      </v-card-title>
      <v-card-text class="packet-details">
        <h3>Details</h3>
        <p><b>Date sent:</b> {{processDate(packet.created_at, 'DD/MM/YYYY')}}</p>
        <p><b>Patient ID:</b> <nuxt-link :to="'/patients/' + packet.user_id">{{packet.user_id}}</nuxt-link></p>
        <p><b>Doctor ID:</b> <nuxt-link :to="'/doctors/' + packet.doctor_id">{{packet.doctor_id}}</nuxt-link></p>
        <p><b>Status:</b> <v-chip class="chip" :color="packet.status == 'responded' ? 'green' : 'primary'" text-color="white" small>{{packet.status}}</v-chip></p>
        <v-divider></v-divider>
        <p><b>Location:</b> {{packet.location || `Not attached`}}</p>
        <p><b>Heart rate:</b> {{packet.heart_rate || `Not attached`}}</p>
        <p><b>Content:</b> "{{packet.content}}"</p>
        <v-divider></v-divider>
        <h3>Attachments</h3>
        <div class="attachment">
          <p><b>Video</b></p>
          <v-btn class="download-button" disabled color="primary" block>
            Download
          </v-btn>
        </div>
        <div class="attachment">
          <p><b>Document</b></p>
          <v-btn class="download-button" disabled color="primary" block>
            Download
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
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
      store.commit('updatePageTitle', `Packets`)
    }
  }
</script>

<style scoped>
.page{
  margin-top: 48px;
  margin-bottom: 56px;
}
.title-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2196f3 !important;
  color: white;
}
.subtitle{
  opacity: 0.5;
}
.packet-details > h3{
  margin-bottom: 10px;
}
.packet-details > p{
  margin-left: 20px;
}
.chip{
  text-transform: capitalize;
  height: 20px;
}
p + hr{
  margin-bottom: 20px;
}
.attachment{
  margin-left: 20px;
  margin-bottom: 10px;
}
.attachment p{
  margin-bottom: 10px;
}
.download-button{
  width: calc(100% - 20px);
}
</style>
