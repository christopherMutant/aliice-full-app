import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AppLayout from '@/layouts/AppLayout.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: AppLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/',
        redirect: '/dashboard',
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/contacts/patients',
        name: 'patients',
        component: () => import('@/views/PatientsView.vue'),
        children: [
          {
            path: ':id',
            name: 'patient-details',
            component: () => import('@/views/PatientDetails.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      requiresAuth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token')
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    return next('/login')
  }

  if (loggedIn && ['/signup', '/login'].includes(to.path)) {
    return next('/dashboard')
  }

  next() // Proceed to the route
})

export default router
