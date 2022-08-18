import { defineStore } from 'pinia'
import { $axios } from '@/api/handler'


export const $customersStore = defineStore('auth', {
	state: () => ({
		allCustomers: null,
		customers: null,
		customer: null
	}),

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
				let response = await $axios.get('v1.0/Customers')
				this.customers = response
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async getCustomerById(id) {
			try {
				let response = await $axios.get(`v1.0/Customers/logout/${id}`)
				this.customer = response
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async createCustomer(data) {
			try {
				let response = await $axios.post('v1.0/Customers', data)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async updateCustomer(data) {
			try {
				let response = await $axios.put('v1.0/Customers', data)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async deleteCustomer(data) {
			try {
				let response = await $axios.put('v1.0/Customers', data)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
	},
})

