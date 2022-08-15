<template>
	<v-app id="inspire" class="default-layout">
		<v-navigation-drawer class="sidebar__nav-list" v-model="drawer" app>
			<v-sheet class="pa-2">
				<v-list-item
					prepend-avatar="https://icon-library.com/images/avatar-icon-png/avatar-icon-png-8.jpg"
					title="John Doe"
				></v-list-item>
			</v-sheet>
			<v-divider></v-divider>

			<v-list density="compact" nav>
				<v-list-item
					v-for="(link,i) in links"
					:key="i"
					:prepend-icon="link.icon"
					:title="link.title"
					exact
					:to="link.to"
					:active="$route.path === link.to"
				></v-list-item>
			</v-list>
			<template v-slot:append>
				<div class="pa-2">
					<v-btn color="primary" @click="handleLogout" block>Logout</v-btn>
				</div>
			</template>
		</v-navigation-drawer>
		<v-app-bar app>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>Application</v-toolbar-title>
		</v-app-bar>

		<v-main style="background-color: #f8f8ff;" class="default-layout__main">
			<router-wrapper>
				<router-view class="px-3 pb-3 mx-4 my-2" />
			</router-wrapper>
		</v-main>
	</v-app>
</template>

<script>
import RouterWrapper from "../components/RouterWrapper.vue";
import { authStore } from '../stores/auth'
import LocalStorageService from "../api/LocalStorageService";
export default {
	name: "DefaultLayout",
	components: {
		RouterWrapper,
	},
	data: () => ({
		cards: ['Today', 'Yesterday'],
		drawer: null,
		links: [
			{
				icon: 'mdi-view-dashboard',
				title: 'Customers',
				to: "/"
			},
			{
				icon: 'mdi-view-dashboard',
				title: 'Labors',
				to: "/labors"
			},
			{
				icon: 'mdi-view-dashboard',
				title: 'Parts',
				to: "/parts"
			},
			{
				icon: 'mdi-view-dashboard',
				title: 'WorK Orders',
				to: "/workorders"
			}
		],
	}),
	methods: {
		handleLogout() {
			LocalStorageService.clearAuthenticationToken()
			this.$router.push('/sign-in')
		}
	},
}
</script>

<style lang='scss'>
.default-layout {
	&__main {
		padding-top: 72px !important;
	}
	&__scroll {
		max-height: calc(100vh - 72px);
		overflow-y: auto;
	}
	.sidebar {
		&__nav-list {
			height: calc(100vh - 96px);
		}
	}
}
</style>