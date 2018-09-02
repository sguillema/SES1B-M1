<template>
	<v-layout column justify-center align-center fill-height>
		<img src="../assets/cat.jpg" alt="This is a cat" class="cat-image" />
   		<div>
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
				<v-text-field v-model="password" :rules="passwordRules" label="Password" type="password" required></v-text-field>
				<v-btn :disabled="!valid" @click="submit" color="success" block class="login-button">Login</v-btn>
        <nuxt-link class="register" to="/register">Register</nuxt-link>
			</v-form>
		</div>
  	</v-layout>
</template>

<script>
  import axios from 'axios'

  export default {
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
          this.$router.push({
            path: '/'
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
.cat-image{
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
