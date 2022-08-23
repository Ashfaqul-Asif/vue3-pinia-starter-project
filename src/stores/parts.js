import { defineStore } from 'pinia'
import { $axios } from '@/api/handler'


export const $partsStore = defineStore('parts', {
	state: () => ({
		allParts: null,
		parts: null,
		part: null
	}),
	getters: {
		$getAllparts: (state) => state.allParts,
		$parts: (state) => state.parts,
		$part: (state) => state.part,

	},
	actions: {
		async getAllparts() {
			try {
				let response = await $axios.get('Parts/GetAll?api-version=1.0')
				this.allParts = response
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async getParts() {
			try {
				let response = await $axios.get(`Parts?api-version=1.0`)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async getPartById(id) {
			try {
				let response = await $axios.get(`v1.0/Parts/${id}`)
				this.part = response
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async createPart(data) {
			try {
				let response = await $axios.post('Parts?api-version=1.0', data)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async updatePart(data, id) {
			try {
				let response = await $axios.put(`Parts/${id}?api-version=1.0`, data)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async deletePart(id) {
			try {
				let response = await $axios.delete(`Parts/${id}?api-version=1.0`)
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
	},
})

