<template>
	<v-layout column justify-center align-center fill-height>

   		<div v-if="step == 1">
         <h1>Make a Profile</h1>
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-text-field v-model="profile.email" :rules="emailRules" label="E-mail" required></v-text-field>
				<v-text-field v-model="profile.password" :rules="passwordRules" label="Password" type="password" required></v-text-field>
      <v-layout row justify-space-between align-center>
        <nuxt-link class="back" to="/login">Back</nuxt-link>
				<v-btn :disabled="!valid" @click="incrementStep" color="success">Next</v-btn>
      </v-layout>
			</v-form>
		</div>
    <div v-if="step == 3">
         <h1>What would you like to register as?</h1>
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-radio-group v-model="profile.type" label="Doctor or Patient" required>
          <v-radio :label="`Doctor`" :value="'Doctor'"></v-radio>
          <v-radio :label="`Patient`" :value="'Patient'"></v-radio>
        </v-radio-group>
      <v-layout row justify-space-between align-center>
        <nuxt-link class="back" to="/login">Back</nuxt-link>
				<v-btn :disabled="!valid" @click="incrementStep" color="success">Next</v-btn>
      </v-layout>
			</v-form>
		</div>
   		<div v-else-if="step == 2">
         <h1>Patient Profile Details</h1>
			<v-form ref="form" v-model="valid2" lazy-validation>
				<v-text-field v-model="profile.firstName" label="First Name" placeholder="Naruto" required></v-text-field>
				<v-text-field v-model="profile.lastName" label="Last Name" placeholder="Uzamaki" required></v-text-field>
        <v-radio-group v-model="profile.sex" label="Sex">
          <v-radio :label="`Male`" :value="'Male'"></v-radio>
          <v-radio :label="`Female`" :value="'Female'"></v-radio>
          <v-radio :label="`Other`" :value="'Other'"></v-radio>
        </v-radio-group>
				<v-text-field v-model="profile.dob" :mask="dobMask" label="Date of Birth" placeholder="dd/mm/yyyy" required></v-text-field>
				<v-text-field v-model="profile.weight" label="Weight" suffix="kg" placeholder="0" required></v-text-field>
				<v-text-field v-model="profile.height" label="Height" suffix="cm" placeholder="0" required></v-text-field>
      <v-layout row justify-space-between align-center>
        <a class="back" @click="step--">Back</a>
				<v-btn :disabled="!valid2" @click="submit" color="success" to="/index">Finish</v-btn>
      </v-layout>
			</v-form>
		</div>
    <div v-else-if="step == 4">
         <h1>Doctor Profile Details</h1>
			<v-form ref="form" v-model="valid2" lazy-validation>
				<v-text-field v-model="profile.firstName" label="First Name" placeholder="Naruto" required></v-text-field>
				<v-text-field v-model="profile.lastName" label="Last Name" placeholder="Uzamaki" required></v-text-field>
        <v-radio-group v-model="profile.sex" label="Sex">
          <v-radio :label="`Male`" :value="'Male'"></v-radio>
          <v-radio :label="`Female`" :value="'Female'"></v-radio>
          <v-radio :label="`Other`" :value="'Other'"></v-radio>
        </v-radio-group>
				<v-text-field v-model="profile.dob" :mask="dobMask" label="Date of Birth" placeholder="dd/mm/yyyy" required></v-text-field>
        <v-text-field v-model="profile.dob" label="Place of Employment" placeholder="E.g. Bob Medical Centres" required></v-text-field>
      <v-layout row justify-space-between align-center>
        <a class="back" @click="step--">Back</a>
				<v-btn :disabled="!valid2" @click="submit" color="success" to="/index">Finish</v-btn>
      </v-layout>
			</v-form>
		</div>
  	</v-layout>
</template>

<script>
  import axios from 'axios'

  export default {
    middleware: 'notAuthenticated',
    layout: 'blank',
    data: () => ({
      step: 1,
      valid: false,
      valid2: false,
      profile: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        sex: '',
        dob: '',
        weight: '',
        height: '',
        conditions: ''
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => v.length >= 6 || 'Min 6 characters',
        v => !!v || 'Password is required'
      ],
      dobMask: '##/##/####'
    }),

    methods: {
      submit () {
        this.$refs.form.validate()
        if (this.valid2) {
          // Native form submission is not yet supported
          axios.post('http://localhost:4000/users', {
            email: this.profile.email,
            password: this.profile.password,
            type: 'patient',
            first_name: this.profile.firstName,
            last_name: this.profile.lastName,
            sex: this.profile.sex,
            dob: this.profile.dob,
            weight: this.profile.weight,
            height: this.profile.height,
            conditions: []
          }).then(res => {
            console.log(res)
            this.$router.push({
              path: '/'
            })
          }).catch(err => {
            console.log(err)
          })
        }
      },
      submit2 () {
        this.$refs.form.validate()
        if (this.valid2) {
          // Native form submission is not yet supported
          axios.post('http://localhost:4000/users', {
            email: this.profile.email,
            password: this.profile.password,
            type: 'doctor',
            first_name: this.profile.firstName,
            last_name: this.profile.lastName,
            sex: this.profile.sex,
            dob: this.profile.dob,
            conditions: []
          }).then(res => {
            console.log(res)
            this.$router.push({
              path: '/'
            })
          }).catch(err => {
            console.log(err)
          })
        }
      },
      incrementStep () {
        this.$refs.form.validate()
        if (this.valid) {
          this.step++
        }
      }
    }
  }
</script>

<style scoped>
.back{
  padding: 0 16px;
  display: block;
  text-align: center;
  margin: 30px 0px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
}
</style>
