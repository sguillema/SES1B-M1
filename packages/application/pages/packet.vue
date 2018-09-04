<template>
	<v-layout column justify-center align-center>
   		<v-flex xs12 sm8 md6>
		<v-card>
			   <v-card-title>
				
				
			<h1>Create a Packet</h1>
			   </v-card-title>
			   <v-card-text>
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-text-field
				label="Doctor"
				required
				></v-text-field>
				<v-text-field
				label="Heart Rate (optional)"
				required
				suffix="bpm"
				></v-text-field>
				<a style="font-size: 12px">Instructions on how to get your heart rate<br><br></a>
				<v-textarea
				name="content"
				label="Message (optional)"
				box
				></v-textarea>
				<v-layout column>
					<h4>Upload Video</h4>
					<input type="file" id="video" name="video" accept="video/*">
				</v-layout>
				<v-layout column>
					<h4>Upload Additional Document</h4>
					<input type="file" id="document" name="document" accept="image/*, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
				</v-layout>
				<v-btn
				:disabled="!valid"
				@click="submit"
        		to=""
				>
				Submit Packet
				</v-btn>
			</v-form>
</v-card-text>
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
