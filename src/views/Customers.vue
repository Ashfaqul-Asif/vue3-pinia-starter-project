<template>
	<v-card class="p" elevation="2">
		<h1>Customers</h1>
	</v-card>
</template>

<script>
// import { defineComponent } from 'vue';
// import { reactive } from 'vue-demi'
// import { ref } from 'vue'
import { $customers } from '../stores/customers'
const customers = $customers
export default {
	name: 'HomeView',
	data() {
		return {
			headers: [
				{ text: 'Name', value: 'name', sortable: false },
				{ text: 'Course Taken', value: 'courseTaken', sortable: false },
				{ text: 'Hours Spent', value: 'hoursSpent', sortable: false },
				{ text: 'Enrolment Date', value: 'enrolledAt', sortable: false },
				{ text: 'Live ID', value: 'liveId', sortable: false },
				{ text: 'View', value: 'actions', sortable: false },
			],
			loading: false,
		};
	},
	methods: {

	},
	async created() {
		await customers.getCustomers()
	},
	// setup() {
	// 	const $customer = customer()
	// 	const headers = reactive([
	// 		{ text: 'Name', value: 'name', sortable: false },
	// 		{ text: 'Course Taken', value: 'courseTaken', sortable: false },
	// 		{ text: 'Hours Spent', value: 'hoursSpent', sortable: false },
	// 		{ text: 'Enrolment Date', value: 'enrolledAt', sortable: false },
	// 		{ text: 'Live ID', value: 'liveId', sortable: false },
	// 		{ text: 'View', value: 'actions', sortable: false },
	// 	])
	// 	return { auth, $customer }
	// }
};
</script>
