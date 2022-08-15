<template>
	<v-container class="center-card h-100">
		<v-card outlined width="400">
			<v-card-title class="text-center">Welcome Back!</v-card-title>
			<v-card-subtitle class="text-center body-1 mb-1">Login with your Email and password</v-card-subtitle>

			<v-divider></v-divider>
			<v-card-text>
				<v-form ref="loginForm" v-model="valid" lazy-validation>
					<v-alert
						class="mb-3"
						dense
						outlined
						dismissible
						v-model="dialog"
						type="error"
					>Incorrect email or password</v-alert>
					<v-text-field v-model="loginData.email" label="E-mail" required></v-text-field>
					<v-text-field
						:type="password.show ? 'text' : 'password'"
						:append-inner-icon="password.show ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="password.show = !password.show"
						hide-details="auto"
						v-model="loginData.password"
						label="Password"
						required
					></v-text-field>
				</v-form>
			</v-card-text>
			<!-- <v-divider></v-divider> -->
			<v-card-actions>
				<v-btn :loading="loading" @click="handleLogin" class="primary-button" block type="submit">Login</v-btn>
			</v-card-actions>
			<p class="text-center mt-4 mb-5 text-subtitle-2">
				Need an account
				<router-link class="text-decoration-none text-subtitle-2" to="/sign-up">Sign Up</router-link>
			</p>
		</v-card>
	</v-container>
</template>

<script>
import { mapActions } from 'pinia'
import { authStore } from '../stores/auth'
import { reactive } from 'vue-demi'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {
	setup() {
		const auth = authStore()
		const router = useRouter()
		const loginForm = ref(null)
		const dialog = ref(false)
		const loading = ref(false)

		const loginData = reactive({
			email: '',
			password: ''
		})
		const password = reactive({
			show: false,
			confirmed: false
		})

		const handleLogin = async () => {
			console.log(loginForm, 'loginForm');
			loading.value = true
			let [res, err] = await auth.login(loginData)
			console.log(res, err);
			if (!res) {
				dialog.value = true
				loading.value = false
				return
			}
			router.push("/");
			loading.value = false
		}
		return { auth, loginData, handleLogin, dialog, password, loading }
	},

}

// export default {
// 	data: () => ({
// 		valid: true,
// 		loginData: {
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
// 		async handleLogin() {
// 			console.log('handleLogin');
// 			await this.login(this.loginData)
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