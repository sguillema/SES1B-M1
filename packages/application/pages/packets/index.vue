<template>
  <div class="page">
    <v-tabs color="white" slider-color="blue" centered grow fixed-tabs>
      <v-tab :key="'list'" ripple active>
        My Packets
      </v-tab>
      <v-tab v-if="userType == 'patient'" :key="'create'" ripple>
        Create Packet
      </v-tab>
      <v-tab-item :key="'list'">
        <v-card raised>
          <v-list subheader three-line>
            <div v-for="(packet, index) in this.$store.state.userPackets" :key="packet.uid">
              <v-list-tile :to="'packets/' + packet.uid" :class="{'patient-tile': userType == 'doctor'}">
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
      <v-tab-item v-if="userType == 'patient'" :key="'create'">
        <v-card raised>
          <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <!-- <v-text-field v-model="doctor" :rules="rules.doctor" label="Doctor" required></v-text-field> -->
            <v-select v-model="doctor" :items="getDoctors()" item-text="name" item-value="id" label="Doctor" outline></v-select>
            <v-text-field v-model="heartRate" label="Heart Rate (optional)" suffix="bpm"></v-text-field>
            <a style="font-size: 12px">Instructions on how to get your heart rate<br><br></a>
            <v-textarea name="content" :rules="rules.content" label="Message" v-model="content" outline required></v-textarea>
            <v-layout column>
              <h4>Upload Video (Optional)</h4>
              <input type="file" id="video" name="video" accept="video/*">
            </v-layout>
            <v-layout column>
              <h4>Upload Additional Document(s) (Optional)</h4>
              <input type="file" id="document" name="document" accept="image/*, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
            </v-layout>
            <v-btn class="submit-button" :disabled="!valid" :loading="loading" @click="submit" color="primary" block>
              Submit Packet
            </v-btn>
          </v-form>
          </v-card-text>
          <v-dialog v-model="dialog" width="300">
            <v-card>
              <v-card-text>
                <v-layout column justify-center align-center>
                  <v-avatar>
                    <v-icon color="green" x-large>check_circle</v-icon>
                  </v-avatar>
                  <h3>
                    {{successMessage}}
                  </h3>
                  <v-btn @click="dialog = false; clear()" style="margin-top: 20px" depressed>Close</v-btn>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-dialog>
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
        userType: '',
        valid: false,
        loading: false,
        dialog: false,
        doctor: {name: '', id: ''},
        rules: {
          doctor: [v => !!v || 'Doctor is required'],
          content: [v => !!v || 'Content is required']
        },
        heartRate: '',
        content: '',
        errorMessage: '',
        showError: false,
        successMessage: 'Packet sent!'
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
      },
      getDoctors () {
        let doctors = []
        this.$store.state.userDoctors.forEach(item => {
          doctors.push({
            name: `${item.first_name} ${item.last_name}`,
            id: item.uid
          })
        })
        return doctors
      },
      submit () {
        if (this.$refs.form.validate()) {
          this.loading = true
          axios.post(`${process.env.apiUrl}/packets`, {
            user_id: this.$store.state.profileId,
            doctor_id: this.doctor,
            heart_rate: this.heartRate,
            content: this.content
          })
            .then(res => {
              this.loading = false
              this.dialog = true
            })
            .catch(err => {
              this.errorMessage = `${err}`
              this.showError = true
            })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    },
    fetch ({store}) {
      store.commit('updatePageTitle', 'Packets')
    },
    async mounted () {
      let isDataFetched = false
      let packets
      let pairs
      if ((this.$store.state.userDoctors && this.$store.state.userDoctors.length > 0) || (this.$store.state.userPatients && this.$store.state.userPatients.length > 0)) {
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
          packets.data.reverse()
          this.$store.commit('updatePackets', packets.data)
          break

        case 'patient':
          this.userType = 'patient'

          if (!isDataFetched) {
            pairs = await axios.get(`${process.env.apiUrl}/pairs?patient=${this.$store.state.profileId}`)
            this.$store.commit('updateDoctors', pairs.data)
          }

          packets = await axios.get(`${process.env.apiUrl}/packets?user=${this.$store.state.profileId}`)
          packets.data.reverse()
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
.patient-tile{
  padding: 20px 0;
}
.submit-button{
  margin-top: 30px;
}
</style>


