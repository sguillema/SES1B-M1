<template>
  <div class="page">
    <v-tabs v-model="active" color="white" slider-color="blue" centered grow fixed-tabs>
      <v-tab :key="list" rippleactive>
        My Patients
      </v-tab>
      <v-tab :key="Pair" ripple>
        Pair with Patient
      </v-tab>
      <v-tab-item :id="list">
        <v-card raised>
          <v-list subheader three-line>
            <div v-for="(patient, index) in this.$store.state.userPatients" :key="patient.uid">
              <v-list-tile :to="'patients/' + patient.uid">
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{`${patient.first_name} ${patient.last_name}`}}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    {{`${patient.uid}`}}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-if="index < $store.state.userPatients.length - 1" :key="index"></v-divider>
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

export default {
  middleware: 'authenticated',
  data () {
    return {
    }
  },
  fetch ({store}) {
    store.commit('updatePageTitle', 'Patients')
  },
  mounted () {
    axios.get(`${process.env.apiUrl}/pairs?doctor=${this.$store.state.profileId}`)
      .then(res => {
        this.$store.commit('updatePatients', res.data)
      })
  }
}
</script>

<style scoped>
.page{
  margin-top: 48px;
  margin-bottom: 56px;
}
</style>
