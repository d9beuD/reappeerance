import Vue from 'vue'
import VueRouter from 'vue-router'
import EmptyContainer from '@/views/EmptyContainer'
import Conversations from '@/views/Conversations.vue'
import Settings from '@/views/Settings.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'Conversations'}
  },
  {
    path: '/conv',
    component: EmptyContainer,
    children: [
      {
        path: '',
        name: 'Conversations',
        component: Conversations
      },
      {
        path: 'new'
      }
    ]
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = new VueRouter({
  routes
})

export default router
