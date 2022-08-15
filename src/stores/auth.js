import { defineStore } from 'pinia'
import { $axios } from '@/api/handler'
import LocalStorageService from "../api/LocalStorageService";

export const authStore = defineStore('auth', {
	state: () => ({
		userData: null,
		isAuth: false
	}),

	actions: {
		async login(data) {
			try {
				let response = await $axios.post('Account/login', data)
				LocalStorageService.setAuthenticationToken(response.data)
				this.isAuth = true
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async register(data) {
			try {
				let response = await $axios.post('Account/register', data)
				LocalStorageService.setAuthenticationToken(response.data)
				this.isAuth = true
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
		async logout() {
			try {
				let response = await $axios.post('Account/logout')
				LocalStorageService.clearAuthenticationToken()
				this.isAuth = false
				return [response, null]

			} catch (error) {
				return [null, error]
			}
		},
	},
})

