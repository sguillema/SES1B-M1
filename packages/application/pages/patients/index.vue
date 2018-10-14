<template>
  <div class="page">
    <v-tabs color="white" slider-color="blue" centered grow fixed-tabs>
      <v-tab :key="'list'" ripple active>
        My Patients
      </v-tab>
      <v-tab :key="'pair'" ripple>
        Pair with Patient
      </v-tab>
      <v-tab-item :key="'list'">
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
      <v-tab-item :key="'pair'">
        <v-card raised>
          <div class="content-container">
            <v-text-field outline label="Search" v-model="query">
              <v-btn fab dark small color="primary" slot="append-outer" @click="search" style="top: -12px">
                <v-icon dark>search</v-icon>
              </v-btn>
            </v-text-field>
          </div>
          <v-list subheader three-line>
            <v-list-tile v-if="results === null">
              <v-list-tile-sub-title style="text-align: center">
                Search for a patient using their ID or name! A search requires a minimum of 3 characters.
              </v-list-tile-sub-title>
            </v-list-tile>
            <v-list-tile v-else-if="results.length == 0 && !loading">
              <v-list-tile-sub-title style="text-align: center">
                Your query did not match any patients!
              </v-list-tile-sub-title>
            </v-list-tile>
            <v-list-tile v-else-if="loading">
              <v-list-tile-sub-title style="text-align: center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-list-tile-sub-title>
            </v-list-tile>
            <div v-else v-for="(patient, index) in results" :key="patient.uid">
              <v-list-tile :to="'patients/' + patient.uid">
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{`${patient.first_name} ${patient.last_name}`}}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    {{`${patient.uid}`}}
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title v-if="isPaired(patient.uid)">
                    <v-chip class="chip" :color="'green'" text-color="white" small>
                      <v-avatar>
                        <v-icon>check_circle</v-icon>
                      </v-avatar>
                      Paired
                    </v-chip>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-if="results && index < results.length - 1" :key="index"></v-divider>
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
      query: '',
      results: null,
      loading: false,
      searchState: ''
    }
  },
  methods: {
    search () {
      this.loading = true
      let patients
      axios.get(`${process.env.apiUrl}/patients?search=${this.query}`)
        .then(res => {
          patients = res.data
          this.results = patients
          this.loading = false
        })
        .catch((err) => {
          this.results = []
          this.loading = false
          console.log(err)
        })
    },
    isPaired (uid) {
      let target = null
      target = this.$store.state.userPatients.find(patient => {
        return patient.uid === uid
      })

      if (target) {
        return true
      } else {
        return false
      }
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
.content-container{
  padding: 25px 15px;
}
.chip{
  height: 25px;
}
</style>
