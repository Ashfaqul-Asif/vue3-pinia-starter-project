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
				let response = await $axios.get('v1.0/workOrders/GetAll')
				this.allWorkOrders = response
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async getworkOrders() {
			try {
				let response = await $axios.get(`workOrders?api-version=1.0`)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async getWorkOrderById(id) {
			try {
				let response = await $axios.get(`v1.0/workOrders/${id}`)
				this.workOrder = response
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async createWorkOrder(data) {
			try {
				let response = await $axios.post('v1.0/workOrders', data)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async updateWorkOrder(data, id) {
			try {
				let response = await $axios.put(`v1.0/workOrders/id`, data)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async deleteWorkOrder(id) {
			try {
				let response = await $axios.delete(`v1.0/workOrders/${id}`)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
	},
})

