<template>
  <div class="page">
    <v-card>
      <v-card-title class="title-container">
        <h2>{{`Packet sent on - ${processDate(packet.created_at, 'DD/MM/YYYY')}`}}</h2>
        <span class="subtitle">ref id: {{packet.uid}}</span>
      </v-card-title>
      <v-card-text class="packet-details">
        <v-expansion-panel :value="0">
          <v-expansion-panel-content class="panel-content">
            <h3 slot="header">Details</h3>
            <div class="panel-content-container">
              <p><b>Date sent:</b> {{processDate(packet.created_at, 'DD/MM/YYYY')}}</p>
              <p v-if="!isMe(packet.user_id)"><b>Patient ID:</b> <nuxt-link :to="'/patients/' + packet.user_id">{{packet.user_id}}</nuxt-link></p>
              <p v-else><b>Patient ID:</b> (You) {{packet.user_id}}</p>
              <p v-if="!isMe(packet.doctor_id)"><b>Doctor ID:</b> <nuxt-link :to="'/doctors/' + packet.doctor_id">{{packet.doctor_id}}</nuxt-link></p>
              <p v-else><b>Doctor ID:</b> (You) {{packet.doctor_id}}</p>
              <p><b>Status:</b> <v-chip class="chip" :color="packet.status == 'responded' ? 'green' : 'primary'" text-color="white" small>{{packet.status}}</v-chip></p>
              <v-divider></v-divider>
              <p><b>Location:</b> {{packet.location || `Not attached`}}</p>
              <p><b>Heart rate:</b> {{packet.heart_rate || `Not attached`}}</p>
              <p><b>Content:</b> "{{packet.content}}"</p>
            </div>
          </v-expansion-panel-content>
          <v-expansion-panel-content class="panel-content">
            <h3 slot="header">Attachments</h3>
            <div class="panel-content-container">
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
            </div>
          </v-expansion-panel-content>
          <v-expansion-panel-content class="panel-content">
            <h3 slot="header">Feedback</h3>
            <div class="panel-content-container">
              <div v-if="this.$store.state.userType == 'doctor'" class="feedback-form">
                <v-textarea outline name="feedback-textarea" label="Feedback" v-model="feedback"></v-textarea>
                <v-btn class="feedback-button" color="primary" @click="submit" block>
                  Send/Update
                </v-btn>
              </div>
              <div v-else class="feedback-form">
                <p v-if="feedback != ''">"{{feedback}}"</p>
                <p v-else style="opacity: 0.5"><i>This packet has not been responded to yet.</i></p>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
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
        packet: {},
        feedback: ''
      }
    },
    methods: {
      submit () {
        axios.patch(`${process.env.apiUrl}/packets/${this.$route.params.id}`, {feedback: this.feedback})
          .then(res => {
            return axios.get(`${process.env.apiUrl}/packets/${this.$route.params.id}`)
          })
          .then(res => {
            this.packet = res.data
          })
      },
      isMe (uid) {
        if (this.$store.state.profileId === uid) {
          return true
        } else {
          return false
        }
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
          this.feedback = this.packet.feedback
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
.packet-details{
  padding: 0;
}
.panel-content-container{
  padding: 15px 30px;
}
/* .packet-details > h3{
  margin-bottom: 10px;
} */
/* .packet-details > p{
  margin-left: 20px;
} */
.chip{
  text-transform: capitalize;
  height: 20px;
}
hr + *{
  margin-top: 20px;
}
.attachment{
  /* margin-left: 10px; */
  margin-bottom: 20px;
}
.attachment p{
  margin-bottom: 10px;
}
.download-button{
  /* width: calc(100% - 10px); */
}
</style>
