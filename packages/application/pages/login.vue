<template>
	<v-layout column justify-center align-center>
		<img src="../assets/cat.jpg" alt="This is a cat" class="mb-5 cat-image" />
   		<v-flex xs12 sm8 md6>
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-text-field
				v-model="name"
				:rules="nameRules"
				:counter="10"
				label="Username"
				required
				></v-text-field>
				<v-text-field
				v-model="password"
				:rules="passwordRules"
				label="Password"
        type="password"
				required
				></v-text-field>
				<v-btn
				:disabled="!valid"
				@click="submit"
        to="/index"
				>
				Login
				</v-btn>
			</v-form>
		</v-flex>
  	</v-layout>
</template>

<script>
  import axios from 'axios'

  export default {
    layout: 'blank',
    data: () => ({
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/submit', {
            name: this.name,
            password: this.password
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>

<style>
.cat-image{
  width: 150px;
}
</style>
