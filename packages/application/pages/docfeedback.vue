<template>
  <v-form v-model="form">
    <v-card>
    <v-container fluid grid-list-md>
    <v-textarea
      name="doctorfeedback"
      box
      label="Doctor Feedback"
      autogrow
    ></v-textarea>
      </v-container>
    <v-card-actions>
      <v-btn
        flat
        @click="$refs.form.reset()"
      >
        Clear
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!form"
        class="white--text"
        color="deep-purple accent-4"
        depressed
      >Submit</v-btn>
    </v-card-actions>
  </v-card>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    form: false
  })
}
</script>

<style scoped>

</style>
