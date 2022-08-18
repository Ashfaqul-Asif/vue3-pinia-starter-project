<template>
	<v-card class="p" elevation="2">
		<h1>Customers {{state.count}}</h1>
	</v-card>
</template>

<script>
import { defineComponent } from 'vue';
import { reactive } from 'vue-demi'
import { ref, onMounted } from 'vue'
import { $customersStore } from '../stores/customers'
export default {
	data() {
		return {
			error: {
				dialog: false,
				message: "",
			}
		};
	},
	setup() {
		const $customers = $customersStore()
		const dialog = ref(false)
		const loading = ref(false)
		// const customers = reactive(null)
		const state = reactive({
			count: null
		});
		const getCustomers = async () => {
			loading.value = true
			let [res, err] = await $customers.getCustomers()
			if (res) {
				console.log(res);
				state.count = res
			}
			loading.value = false
		}
		onMounted(() => {
			getCustomers() // <div>
		})
		return { $customers, getCustomers, dialog, loading, state }
	},

}
</script>
