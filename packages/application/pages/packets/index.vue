<template>
  <div class="page">
    <v-tabs v-model="active" color="white" slider-color="blue" centered grow fixed-tabs>
      <v-tab :key="list" rippleactive>
        My Packets
      </v-tab>
      <v-tab :key="create" ripple>
        Create Packet
      </v-tab>
      <v-tab-item :id="list">
        <v-card raised>
          <v-list subheader three-line>
            <div v-for="(packet, index) in this.$store.state.userPackets" :key="packet.uid">
              <v-list-tile :to="'packets/' + packet.uid" class="packet-tile">
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{getPacketName(packet)}}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    Date created: {{processDate(packet.created_at, 'DD/MM/YYYY')}}
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title>
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
        hello: 'hello'
      }
    },
    methods: {
      processDate (date, format) {
        return moment(date).format(format)
      },
      getPacketName (packet) {
        let target = null
        switch (this.$store.state.userType.toLowerCase()) {
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
    mounted () {
      // if (this.$store.state.userPackets == null) {
      switch (this.$store.state.userType.toLowerCase()) {
        case 'doctor':
          axios.get(`${process.env.apiUrl}/packets?doctor=${this.$store.state.profileId}`)
            .then(res => {
              this.$store.commit('updatePackets', res.data)
            })
          break
        case 'patient':
          axios.get(`${process.env.apiUrl}/packets?user=${this.$store.state.profileId}`)
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


