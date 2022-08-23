import { defineStore } from 'pinia'
import { $axios } from '@/api/handler'


export const $workOrdersStore = defineStore('workOrders', {
	state: () => ({
		allWorkOrders: null,
		workOrders: null,
		workOrder: null
	}),
	getters: {
		$getAllWorkOrders: (state) => state.allWorkOrders,
		$workOrders: (state) => state.workOrders,
		$workOrder: (state) => state.workOrder,

	},
	actions: {
		async getAllWorkOrders() {
			try {
				let response = await $axios.get('WorkOrders/GetAll?api-version=1.0')
				this.allWorkOrders = response
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async getworkOrders() {
			try {
				let response = await $axios.get(`WorkOrders?api-version=1.0`)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async getWorkOrderById(id) {
			try {
				let response = await $axios.get(`v1.0/WorkOrders/${id}`)
				this.workOrder = response
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async createWorkOrder(data) {
			try {
				let response = await $axios.post('WorkOrders?api-version=1.0', data)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async updateWorkOrder(data, id) {
			try {
				let response = await $axios.put(`WorkOrders/${id}?api-version=1.0`, data)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async deleteWorkOrder(id) {
			try {
				let response = await $axios.delete(`WorkOrders/${id}?api-version=1.0`)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
	},
})

