<template>
  <v-container>
    <v-layout column justify-center align-center fill-height>
      <img src="../assets/doctor.jpg" alt="This is a doc" class="doc-image" />
        <div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          <v-text-field v-model="password" :rules="passwordRules" label="Password" type="password" required></v-text-field>
          <v-btn :disabled="!valid" @click="submit" color="success" block class="login-button">Login</v-btn>
          <nuxt-link class="register" to="/register">Register</nuxt-link>
          <v-alert :value="showError" type="error">{{errorMessage}}</v-alert>
        </v-form>
      </div>
  	</v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import Cookies from 'js-cookie'
  import moment from 'moment'

  export default {
    middleware: 'notAuthenticated',
    layout: 'blank',
    data: () => ({
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      showError: false,
      errorMessage: 'Login Error'
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post(`${process.env.apiUrl}/users/auth`, {
            email: this.email,
            password: this.password
          })
            .then(res => {
              this.$store.commit('updateAuth', res.data.token)
              this.$store.commit('updateUserId', res.data.user.uid)
              this.$store.commit('updateProfileId', res.data.user.profileId)
              this.$store.commit('updateUserType', res.data.user.type)
              let oneHour = moment().add(1, 'hours').toDate()
              Cookies.set('auth', res.data.token, {
                expires: oneHour
              })
              Cookies.set('user', res.data.user, {
                expires: oneHour
              })
              this.$router.push({
                path: '/'
              })
            })
            .catch(err => {
              this.errorMessage = `${err}: Invalid credentials`
              this.showError = true
            })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>

<style scoped>
.doc-image{
  width: 150px;
}
.login-button{
  margin-top: 10px;
}
.register{
  width: 100%;
  display: block;
  text-align: center;
  margin: 30px 0 10px 0;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
}
</style>
