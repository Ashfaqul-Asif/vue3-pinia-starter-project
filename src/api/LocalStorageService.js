import cookies from "vue-cookies";
import { $axios } from './handler'
const KEY_AUTH_TOKEN = "KEY_AUTH_TOKEN";

export default {
	setAuthenticationToken(res) {
		cookies.set(KEY_AUTH_TOKEN, res.token);
		cookies.set('USER_ID', res.userId);
		cookies.set('REFRESH_TOKEN', res.refreshToken);

		if (res.token) {
			$axios.defaults.headers.common["Authorization"] = "Bearer " + res.token;
		}
	},
	getAuthenticationToken() {
		return cookies.get(KEY_AUTH_TOKEN);
	},
	clearAuthenticationToken() {
		cookies.remove(KEY_AUTH_TOKEN);
		$axios.defaults.headers.common["Authorization"] = null;
	}
};