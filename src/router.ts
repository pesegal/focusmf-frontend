import Vue from 'vue'
import Router from 'vue-router'
import TasksView from '@/views/TasksView.vue'
import TimerView from '@/views/TimerView.vue'
import StatsView from '@/views/StatsView.vue'
import SettingsView from '@/views/SettingsView.vue'
import SignUpView from '@/views/SignUpView.vue'
import DashboardView from '@/views/DashboardView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundComponent from '@/views/NotFoundComponent.vue'
import { store } from '@/store'

Vue.use(Router)

const router: Router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/dashboard',
      redirect: { name: 'tasks' },
      component: DashboardView,
      children: [
        {
          path: 'tasks',
          name: 'tasks',
          component: TasksView
        },
        {
          path: 'timer',
          name: 'timer',
          component: TimerView
        },
        {
          path: 'stats',
          name: 'stats',
          component: StatsView
        },
        {
          path: 'settings',
          name: 'settings',
          component: SettingsView
        }
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    { path: '*', component: NotFoundComponent }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth) && !store.state.auth.token) {
    next({
      name: 'login',
      params: { afterLoginTakeTo: to.fullPath }
    })
  }

  return next()
})

export default router
