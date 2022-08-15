<template>
	<v-container class="center-card h-100">
		<v-card width="400">
			<v-card-title class="text-center">Join Us</v-card-title>
			<v-card-subtitle class="text-center body-1 mb-1">Fill up the information to create a account</v-card-subtitle>

			<v-divider></v-divider>
			<v-card-text>
				<v-form @submit.prevent="handleRegister" ref="form" v-model="valid" lazy-validation>
					<v-text-field v-model="registerData.firstName" label="First Name" required></v-text-field>
					<v-text-field v-model="registerData.lastName" label="Last Name" required></v-text-field>
					<v-text-field v-model="registerData.email" label="E-mail" required></v-text-field>
					<v-text-field
						:type="password.show ? 'text' : 'password'"
						:append-inner-icon="password.show ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="password.show = !password.show"
						hide-details="auto"
						v-model="registerData.password"
						label="Password"
						required
					></v-text-field>
				</v-form>
			</v-card-text>
			<!-- <v-divider></v-divider> -->
			<v-card-actions>
				<v-btn
					:loading="loading"
					@click="handleRegister"
					class="primary-button"
					block
					type="submit"
				>Confirm</v-btn>
			</v-card-actions>
			<p class="text-center mt-4 mb-5 text-subtitle-2">
				Already have account
				<router-link class="text-decoration-none" to="/sign-in"> Sign In </router-link>here
			</p>
		</v-card>
	</v-container>
</template>

<script>
import { authStore } from '../stores/auth'
import { reactive } from 'vue-demi'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
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
		const auth = authStore()
		const router = useRouter()
		const dialog = ref(false)
		const loading = ref(false)
		const registerData = reactive({
			email: '',
			password: '',
			firstName: '',
			lastName: '',
		})
		const password = reactive({
			show: false,
			confirmed: false
		})
		const handleRegister = async () => {
			loading.value = true
			let [res, err] = await auth.register(registerData)
			if (!res) {
				dialog.value = true
				loading.value = false
				return
			}
			loading.value = false

		}
		return { auth, registerData, handleRegister, dialog, password, loading }
	},

}

// export default {
// 	data: () => ({
// 		valid: true,
// 		registerData: {
// 			email: '',
// 			password: ''
// 		},
// 		emailRules: [
// 			v => !!v || 'E-mail is required',
// 			v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
// 		],

// 	}),
// 	methods: {
// 		...mapActions(auth, ['login']),
// 		async handleRegister() {
// 			console.log('handleRegister');
// 			await this.login(this.registerData)
// 		}

// 	},

// }
</script>

<style>
.center-card {
	display: grid;
	place-content: center;
}
.primary-button {
	background-color: #6600ee !important;
	color: white;
}
.primary-button span {
	color: white !important;
}
</style>