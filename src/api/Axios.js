import { $axios } from "./handler";
import LocalStorageService from "@/api/LocalStorageService";
console.log('AuthtokenAuthtokenAuthtokenAuthtoken');
var authToken = LocalStorageService.getAuthenticationToken();
console.log('authToken', authToken);
if (authToken) {
	console.log("adding token");
	$axios.defaults.headers.common["Authorization"] = "Bearer " + authToken;
}
