import Vue from 'vue'
import Router from 'vue-router'
import OverviewView from '@/views/OverviewView.vue'
import TasksView from '@/views/TasksView.vue'
import TimerView from '@/views/TimerView.vue'
import StatsView from '@/views/StatsView.vue'
import SettingsView from '@/views/SettingsView.vue'
import LoginView from '@/views/LoginView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: OverviewView
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView
    },
    {
      path: '/timer',
      name: 'timer',
      component: TimerView
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})
