<template>
  <div class="page">
    <v-card v-if="show">
      <v-card-title class="title-container">
        <h2>{{`Welcome ${$store.state.userFirstName}!`}}</h2>
        <span>Visit your 
          <nuxt-link v-if="userType == 'patient'" :to="`/patients/${$store.state.profileId}`">patient profile</nuxt-link>
          <nuxt-link v-else-if="userType == 'doctor'" :to="`/doctors/${$store.state.profileId}`">doctor profile</nuxt-link>
        </span>
        <span class="subtitle">OR</span>
        <v-btn color="primary" @click="logout()" depressed><v-icon dark left>arrow_back</v-icon>Log out</v-btn>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
  middleware: 'authenticated',
  data () {
    return {
      userType: null,
      show: true
    }
  },
  methods: {
    logout () {
      this.show = false
      this.$store.commit('clearAppState')
      // this.$store.commit('clearAuth')
      // this.$store.commit('clearUser')
      Cookies.remove('auth')
      Cookies.remove('user')
      this.$router.push({
        path: '/login'
      })
    }
  },
  fetch ({store}) {
    store.commit('updatePageTitle', 'Home')
  },
  async mounted () {
    let profile = null
    switch (this.$store.state.userType) {
      case 'doctor':
        this.userType = 'doctor'

        profile = await axios.get(`${process.env.apiUrl}/doctors/${this.$store.state.profileId}`)
        this.$store.commit('updateUserFirstName', profile.data.first_name)
        this.$store.commit('updateUserLastName', profile.data.last_name)
        break

      case 'patient':
        this.userType = 'patient'

        profile = await axios.get(`${process.env.apiUrl}/patients/${this.$store.state.profileId}`)
        this.$store.commit('updateUserFirstName', profile.data.first_name)
        this.$store.commit('updateUserLastName', profile.data.last_name)
        break
    }
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
  /* background-color: #2196f3 !important; */
  /* color: white; */
}
.subtitle{
  opacity: 0.5;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>


