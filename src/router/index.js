import { createRouter, createWebHistory } from 'vue-router'
import LocalStorageService from '../api/LocalStorageService'
import DefaultLayout from '../layout/Default.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: DefaultLayout,
			meta: { requiresAuth: true },
			children: [
				{
					path: '/',
					name: 'customers',
					component: () => import('../views/Customers.vue'),

				},
				{
					path: '/labors',
					name: 'labors',
					component: () => import('../views/Labors.vue'),

				},
				{
					path: '/parts',
					name: 'parts',
					component: () => import('../views/Parts.vue'),

				},
				{
					path: '/workOrders',
					name: 'workOrders',
					component: () => import('../views/WorkOrders.vue'),

				},
			]
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/AboutView.vue'),
			meta: { requiresAuth: true }
		},
		{
			path: '/sign-in',
			name: 'signin',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/SignIn.vue'),
			meta: { requiresUnAuth: true }

		},
		{
			path: '/sign-up',
			name: 'signup',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/Register.vue'),
			meta: { requiresUnAuth: true }

		}
	]
})


router.beforeEach((to, from, next) => {
	var authToken = LocalStorageService.getAuthenticationToken();
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!authToken) {
			console.log('isAuth');
			return next({
				path: '/sign-in',
				query: { redirect: to.fullPath }
			})
		}
	}
	else if (to.matched.some(record => record.meta.requiresUnAuth && authToken)) {
		return next('/')

	}
	return next()

})


export default router
