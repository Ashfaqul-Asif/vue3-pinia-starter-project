import { defineStore } from 'pinia'
import { $axios } from '@/api/handler'


export const $laborsStore = defineStore('labors', {
	state: () => ({
		allLabors: null,
		labors: null,
		labor: null
	}),
	getters: {
		$getAllLabors: (state) => state.allLabors,
		$labors: (state) => state.labors,
		$labor: (state) => state.labor,

	},
	actions: {
		async getAllLabors() {
			try {
				let response = await $axios.get('Labors/GetAll?api-version=1.0')
				this.allLabors = response
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async getLabors() {
			try {
				let response = await $axios.get('Labors/GetAll?api-version=1.0')
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async getLaborById(id) {
			try {
				let response = await $axios.get(`v1.0/Labors/${id}`)
				this.labor = response
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async createLabor(data) {
			try {
				let response = await $axios.post('v1.0/Labors', data)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async updateLabor(data, id) {
			console.log(data, id, 'updateLabor');
			try {
				let response = await $axios.put(`v1.0/Labors/${id}`, data)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async deleteLabor(id) {
			try {
				let response = await $axios.delete(`v1.0/Labors/${id}`)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
	},
})

