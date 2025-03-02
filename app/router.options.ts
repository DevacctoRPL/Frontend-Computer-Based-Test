import type { RouterConfig } from '@nuxt/schema'

export default {
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: (_routes) => [
    {
      name: 'Home',
      path: '/',
      component: () => import('~/pages/index.vue')
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('~/pages/auth/login.vue')
    }
  ],
} satisfies RouterConfig