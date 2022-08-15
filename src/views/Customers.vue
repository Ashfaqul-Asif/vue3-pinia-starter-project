<template>
	<v-card class="p" elevation="2">
		<h1>Customers</h1>
	</v-card>
</template>

<script>
import { defineComponent } from 'vue';
import { $axios } from '../api/handler';



export default defineComponent({
	name: 'HomeView',
	async mounted() {
		console.log('hello from home view');

		try {
			let response = await $axios.get('v1.0/customers/GetAll')

			return [response, null]

		} catch (error) {
			return [null, error]
		}

	},

});
</script>
