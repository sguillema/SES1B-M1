<template>
  <v-layout align-center fill-height>
      <!-- <img src="../assets/cat.jpg" alt="Vuetify.js" class="mb-5 cat-image">
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote> -->
      <v-card>
			   <v-card-title>
      <iframe width="100%" frameborder="0" style="border:0; height: calc(100vh - 126px)" :src="src" allowfullscreen></iframe> 
			   </v-card-title>
      </v-card>
  </v-layout>
</template>

<script>
export default {
  middleware: 'authenticated',
  data () {
    return {
      src: `https://www.google.com/maps/embed/v1/search?q=Hospitals%20near%20me&key=${process.env.mapsAPiKey}`
    }
  }
}
</script>

