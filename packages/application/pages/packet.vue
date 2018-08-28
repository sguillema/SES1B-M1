<template>
	<v-layout column justify-center align-center>
   		<v-flex xs12 sm8 md6>
		<v-card>
			   <v-card-title>
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-text-field
				label="Example 1"
				required
				></v-text-field>
				<v-text-field
				label="Example 2"
				required
				></v-text-field>
				<v-btn
				:disabled="!valid"
				@click="submit"
        		to=""
				>
				Submit Packet
				</v-btn>
			</v-form>
			   </v-card-title>
		</v-card>
		</v-flex>
  	</v-layout>
</template>

<script>
  export default {
    data: () => ({
    }),

    methods: {
    }
  }
</script>

<style>

</style>
