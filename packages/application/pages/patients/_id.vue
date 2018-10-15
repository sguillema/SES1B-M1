<template>
  <div class="page">
    <v-card>
      <v-card-title class="title-container">
        <h2>{{`${patient.first_name} ${patient.last_name}`}}</h2>
        <span class="subtitle">ref id: {{patient.uid}}</span>
        <v-chip v-if="isMe(patient.uid)" class="chip" :color="'white'" text-color="blue" small>
          <v-avatar>
            <v-icon>account_circle</v-icon>
          </v-avatar>
          You
        </v-chip>
        <v-chip v-else-if="isPaired(patient.uid)" class="chip" :color="'white'" text-color="blue" small>
          <v-avatar>
            <v-icon>check_circle</v-icon>
          </v-avatar>
          Paired
        </v-chip>
        <v-btn v-else-if="patient.uid && !isPaired(patient.uid)" round small color="green" dark @click="pair">Pair</v-btn>
      </v-card-title>
      <v-card-text class="patient-details">
        <v-expansion-panel :value="0">
          <v-expansion-panel-content class="panel-content">
            <h3 slot="header">Details</h3>
            <div class="panel-content-container">
            <p><b>Email:</b> {{patient.email}}</p>
            <p><b>Sex:</b> {{patient.sex}}</p>
            <p><b>DOB:</b> {{patient.dob}}</p>
            <p><b>Height:</b> {{patient.height}}</p>
            <p><b>Weight:</b> {{patient.weight}}</p>
            <p><b>Medical Conditions:</b> WIP</p>
            </div>
          </v-expansion-panel-content>
          <v-expansion-panel-content v-if="$store.state.userType == 'doctor'" class="panel-content">
            <h3 slot="header">Packets</h3>
            <div class="panel-content-container">
            <v-list>
              <div v-for="(packet, index) in packets" :key="packet.uid">
                <v-list-tile :to="`/packets/${packet.uid}`">
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{processDate(packet.created_at, 'DD/MM/YYYY')}}
                      <v-chip class="chip" :color="packet.status == 'responded' ? 'green' : 'primary'" text-color="white" small>{{packet.status}}</v-chip>
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                      ref id: {{packet.uid}}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider v-if="index < packets.length - 1" :key="index"></v-divider>
              </div>
            </v-list>
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
        patient: {},
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
        let patient = null
        if (this.$store.state.userPatients) {
          patient = this.$store.state.userPatients.find(item => {
            return item.uid === uid
          })
        }
        if (patient) {
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
          doctor_id: this.$store.state.profileId,
          patient_id: this.$route.params.id
        }
        axios.post(`${process.env.apiUrl}/pairs`, payload)
          .then(res => {
            let patients = []
            if (this.$store.state.userPatients) {
              patients = this.$store.state.userPatients.slice()
            }
            patients.push(this.patient)
            this.$store.commit('updatePatients', patients)
          })
      }
    },
    mounted () {
      let patient = null
      let packets = null

      if (this.$store.state.userPatients) {
        patient = this.$store.state.userPatients.find(item => {
          return item.uid === this.$route.params.id
        })
      }

      if (patient) {
        this.patient = patient
      } else {
        axios.get(`${process.env.apiUrl}/patients/${this.$route.params.id}`)
          .then(res => {
            this.patient = res.data
          })
      }

      if (this.$store.state.userPackets) {
        packets = this.$store.state.userPackets.filter(item => {
          return this.patient.uid === item.user_id
        })
      }

      if (packets) {
        this.packets = packets
      } else {
        axios.get(`${process.env.apiUrl}/packets/?patient=${this.patient.uid}&doctor=${this.$store.state.profileId}`)
          .then(res => {
            this.packets = res.data
          })
      }
    },
    fetch ({store, route}) {
      store.commit('updatePageTitle', `Patients`)
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
.panel-content-container .chip{
  height: 18px;
}
</style>
