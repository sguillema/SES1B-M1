<template>
  <div class="page">
    <v-card>
      <v-card-title class="title-container">
        <h2>{{`${this.patient.first_name} ${this.patient.last_name}`}}</h2>
        <span class="subtitle">ref id: {{this.patient.uid}}</span>
      </v-card-title>
      <v-card-text class="patient-details">
        <v-expansion-panel :value="0">
          <v-expansion-panel-content class="panel-content">
            <h3 slot="header">Details</h3>
            <div class="panel-content-container">
            <p><b>Email:</b> {{this.patient.email}}</p>
            <p><b>Sex:</b> {{this.patient.sex}}</p>
            <p><b>DOB:</b> {{this.patient.dob}}</p>
            <p><b>Height:</b> {{this.patient.height}}</p>
            <p><b>Weight:</b> {{this.patient.weight}}</p>
            <p><b>Medical Conditions:</b> WIP</p>
            </div>
          </v-expansion-panel-content>
          <v-expansion-panel-content class="panel-content">
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
  height: 20px;
}
</style>
