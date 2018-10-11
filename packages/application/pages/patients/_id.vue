<template>
  <div></div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'

  export default {
    middleware: 'authenticated',
    data () {
      return {
        patient: {}
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
      if (this.$store.state.userPatients) {
        let patient = this.$store.state.userPatients.find(item => {
          return item.uid === this.$route.params.id
        })
        if (patient) {
          this.patient = patient
        } else {
          axios.get(`${process.env.apiUrl}/patients/${this.$route.params.id}`)
            .then(res => {
              this.patient = res.data
            })
        }
      }
    },
    fetch ({store, route}) {
      store.commit('updatePageTitle', `Patient ${route.params.id}`)
    }
  }
</script>

<style scoped>
</style>
