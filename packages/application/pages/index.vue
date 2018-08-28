<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <!-- <div class="text-xs-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      </div> -->
      <v-card>
        <v-card-title class="headline">Placeholder title</v-card-title>
        <v-card-text>
          <p>Welcome</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt to="/login">Log out</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
}
</script>

