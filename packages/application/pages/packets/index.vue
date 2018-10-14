<template>
  <div class="page">
    <v-tabs color="white" slider-color="blue" centered grow fixed-tabs>
      <v-tab :key="'list'" ripple active>
        My Packets
      </v-tab>
      <v-tab :key="'create'" ripple>
        Create Packet
      </v-tab>
      <v-tab-item :key="'list'">
        <v-card raised>
          <v-list subheader three-line>
            <div v-for="(packet, index) in this.$store.state.userPackets" :key="packet.uid">
              <v-list-tile :to="'packets/' + packet.uid" class="packet-tile">
                <v-list-tile-content>
                  <v-list-tile-title v-if="userType == 'doctor'">
                    {{getPacketName(packet)}}
                  </v-list-tile-title>
                  <v-list-tile-title v-else-if="userType == 'patient'">
                    To: {{getPacketName(packet)}}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    Date created: {{processDate(packet.created_at, 'DD/MM/YYYY')}}
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title v-if="userType == 'doctor'">
                    Patient: {{packet.user_id}}
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title>
                    <v-chip class="chip" :color="packet.status == 'responded' ? 'green' : 'primary'" text-color="white" small>{{packet.status}}</v-chip>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-if="index < $store.state.userPackets.length - 1" :key="index"></v-divider>
            </div>
          </v-list>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <v-container>
    </v-container>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'

  export default {
    middleware: 'authenticated',
    data () {
      return {
        hello: 'hello',
        userType: ''
      }
    },
    methods: {
      processDate (date, format) {
        return moment(date).format(format)
      },
      getPacketName (packet) {
        let target = null
        switch (this.userType) {
          case 'doctor':
            target = this.$store.state.userPatients.find(patient => {
              return packet.user_id === patient.uid
            })
            break
          case 'patient':
            target = this.$store.state.userDoctors.find(doctor => {
              return packet.doctor_id === doctor.uid
            })
            break
        }

        if (target) {
          return `${target.first_name} ${target.last_name}`
        }
      }
    },
    fetch ({store}) {
      store.commit('updatePageTitle', 'Packets')
    },
    async mounted () {
      let isDataFetched = false
      let packets
      let pairs
      if (this.$store.state.userDoctors || this.$store.state.userPatients) {
        isDataFetched = true
      }

      // if (this.$store.state.userPackets == null) {
      switch (this.$store.state.userType.toLowerCase()) {
        case 'doctor':
          this.userType = 'doctor'
          if (!isDataFetched) {
            pairs = await axios.get(`${process.env.apiUrl}/pairs?doctor=${this.$store.state.profileId}`)
            this.$store.commit('updatePatients', pairs.data)
          }

          packets = await axios.get(`${process.env.apiUrl}/packets?doctor=${this.$store.state.profileId}`)
          this.$store.commit('updatePackets', packets.data)
          break
        case 'patient':
          this.userType = 'patient'
          if (!isDataFetched) {
            pairs = await axios.get(`${process.env.apiUrl}/pairs?patient=${this.$store.state.profileId}`)
            this.$store.commit('updateDoctors', pairs.data)
          }

          packets = await axios.get(`${process.env.apiUrl}/packets?user=${this.$store.state.profileId}`)
          this.$store.commit('updatePackets', packets.data)
          break
      }
      // }
    }
  }
</script>

<style scoped>
.page{
  margin-top: 48px;
  margin-bottom: 56px;
}
.chip{
  text-transform: capitalize;
  height: 20px;
}
.packet-tile{
  padding: 20px 0;
}
</style>


