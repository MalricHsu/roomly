import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Chat from '../views/Chat.vue'
import { authReady, currentUser } from '@/auth.js'
import RoomSelect from '@/views/RoomSelect.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },

    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
    },
    {
      path: '/chat/:roomId',
      name: 'chat',
      component: Chat,
      meta: { requiresAuth: true },
    },
    {
      path: '/room-select',
      name: 'room-select',
      component: RoomSelect,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (!authReady.value) {
    await new Promise((resolve) => {
      const interval = setInterval(() => {
        if (authReady.value) {
          clearInterval(interval)
          resolve()
        }
      }, 50)
    })
  }
  if (to.meta.requiresAuth && !currentUser.value) {
    next('/')
  } else {
    next()
  }
})

export default router
