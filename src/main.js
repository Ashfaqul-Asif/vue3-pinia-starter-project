import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import "./api/Axios";
import moment from 'moment'
let app = createApp(App);
app.config.globalProperties.$m = moment;

loadFonts()
const store = createPinia()
createApp(App)
	.use(router)
	.use(vuetify)
	.use(store)
	.mount('#app')
