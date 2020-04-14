import Vue from 'vue'
import VueRouter from 'vue-router'
import EmptyContainer from '@/views/EmptyContainer'
import Conversations from '@/views/Conversations.vue'
import Settings from '@/views/Settings.vue'
import Start from '@/views/Start.vue'
import Connect from '@/views/Connect.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'Conversations'}
  },
  {
    path: '/conv',
    component: Conversations,
    children: [
      {
        path: '',
        name: 'Conversations',
        component: EmptyContainer
      },
      {
        path: 'new',
        name: 'Connect',
        component: Connect
      }
    ]
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/start',
    name: 'Start',
    component: Start
  }
]

const router = new VueRouter({
  routes
})

export default router
