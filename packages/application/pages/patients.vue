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
        <v-card flat>
          <v-card-text>asdsads</v-card-text>
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
        // this.$store.commit('updatePackets', res.data)
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
