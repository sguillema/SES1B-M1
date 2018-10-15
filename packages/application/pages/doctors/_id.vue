<template>
  <div class="page">
    <v-card>
      <v-card-title class="title-container">
        <h2>{{`${doctor.first_name} ${doctor.last_name}`}}</h2>
        <span class="subtitle">ref id: {{doctor.uid}}</span>
        <v-chip v-if="isMe(doctor.uid)" class="chip" :color="'white'" text-color="blue" small>
          <v-avatar>
            <v-icon>account_circle</v-icon>
          </v-avatar>
          You
        </v-chip>
        <v-chip v-else-if="isPaired(doctor.uid)" class="chip" :color="'white'" text-color="blue" small>
          <v-avatar>
            <v-icon>check_circle</v-icon>
          </v-avatar>
          Paired
        </v-chip>
        <v-btn v-else-if="doctor.uid && !isPaired(doctor.uid)" round small color="green" dark @click="pair">Pair</v-btn>
      </v-card-title>
      <v-card-text class="patient-details">
        <v-expansion-panel :value="0">
          <v-expansion-panel-content class="panel-content">
            <h3 slot="header">Details</h3>
            <div class="panel-content-container">
            <p><b>Email:</b> {{doctor.email}}</p>
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
        doctor: {},
        packets: []
      }
    },
    methods: {
      submit () {
      },
      clear () {
      },
      processDate (date, format) {
        return moment(date).format(format)
      },
      isPaired (uid) {
        let doctor = null
        if (this.$store.state.userDoctors) {
          doctor = this.$store.state.userDoctors.find(item => {
            return item.uid === uid
          })
        }
        if (doctor) {
          return true
        } else {
          return false
        }
      },
      isMe (uid) {
        if (this.$store.state.profileId === uid) {
          return true
        } else {
          return false
        }
      },
      pair () {
        let payload = {
          patient_id: this.$store.state.profileId,
          doctor_id: this.$route.params.id
        }
        axios.post(`${process.env.apiUrl}/pairs`, payload)
          .then(res => {
            let doctors = []
            if (this.$store.state.userDoctors) {
              doctors = this.$store.state.userDoctors.slice()
            }
            doctors.push(this.doctor)
            this.$store.commit('updateDoctors', doctors)
          })
      }
    },
    mounted () {
      let doctor = null
      let packets = null

      if (this.$store.state.userDoctors) {
        doctor = this.$store.state.userDoctors.find(item => {
          return item.uid === this.$route.params.id
        })
      }

      if (doctor) {
        this.doctor = doctor
      } else {
        axios.get(`${process.env.apiUrl}/doctors/${this.$route.params.id}`)
          .then(res => {
            this.doctor = res.data
          })
      }

      if (this.$store.state.userPackets) {
        packets = this.$store.state.userPackets.filter(item => {
          return this.doctor.uid === item.user_id
        })
      }

      if (packets) {
        this.packets = packets
      } else {
        axios.get(`${process.env.apiUrl}/packets/?doctor=${this.doctor.uid}&doctor=${this.$store.state.profileId}`)
          .then(res => {
            this.packets = res.data
          })
      }
    },
    fetch ({store, route}) {
      store.commit('updatePageTitle', `Doctors`)
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
.patient-details{
  padding: 0;
}
.panel-content-container{
  padding: 15px 30px;
}
.chip{
  text-transform: capitalize;
  height: 25px;
}
</style>
