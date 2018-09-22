<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title>
          <h1>Create a Packet</h1>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="doctor" :rules="rules.doctor" label="Doctor" required></v-text-field>
            <v-text-field v-model="heartRate" label="Heart Rate (optional)" suffix="bpm"></v-text-field>
            <a style="font-size: 12px">Instructions on how to get your heart rate<br><br></a>
            <v-textarea name="content" :rules="rules.content" label="Message" v-model="content" box required></v-textarea>
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
      </v-card>
    </v-flex>
    <v-dialog v-model="dialog" width="300">
      <v-card>
        <v-card-text>
          <v-layout column justify-center align-center>
            <v-alert :value="true" type="success" icon="check_circle">{{successMessage}}</v-alert>
            <v-btn @click="dialog = false; clear()">Return</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import axios from 'axios'

  export default {
    middleware: 'authenticated',
    data: () => ({
      valid: false,
      loading: false,
      dialog: false,
      doctor: '',
      rules: {
        doctor: [v => !!v || 'Doctor is required'],
        content: [v => !!v || 'Content is required']
      },
      heartRate: '',
      content: '',
      errorMessage: '',
      showError: false,
      successMessage: 'Packet sent!'
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.loading = true
          axios.post(`${process.env.apiUrl}/packets`, {
            user_id: this.$store.state.userId,
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
      store.commit('updatePageTitle', 'Create Packet')
    }
  }
</script>

<style scoped>
.submit-button{
  margin-top: 30px;
}
</style>
