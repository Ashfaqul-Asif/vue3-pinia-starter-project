import { defineStore } from 'pinia'
import { $axios } from '@/api/handler'


export const $customersStore = defineStore('customers', {
	state: () => ({
		allCustomers: null,
		customers: null,
		customer: null
	}),
	getters: {
		$getAllCustomers: (state) => state.allCustomers,
		$customers: (state) => state.customers,
		$customer: (state) => state.customer,

	},
	actions: {
		async getAllCustomers() {
			try {
				let response = await $axios.get('v1.0/Customers/GetAll')
				this.allCustomers = response
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async getCustomers() {
			try {
				let response = await $axios.get('v1.0/customers')
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async getCustomerById(id) {
			try {
				let response = await $axios.get(`v1.0/customers/${id}`)
				this.customer = response
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async createCustomer(data) {
			try {
				let response = await $axios.post('v1.0/customers', data)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async updateCustomer(data, id) {
			console.log(data, id, 'updateCustomer');
			try {
				let response = await $axios.put(`v1.0/customers/${id}`, data)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async deleteCustomer(id) {
			try {
				let response = await $axios.delete(`v1.0/customers/${id}`)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
	},
})

