import Vue from 'vue'
import VueRouter from 'vue-router'
import InlineView from '../views/InlineView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'inline',
    component: InlineView
  },
  {
    path: '/counter',
    name: 'counter',
    component: function () {
      return import('../views/CounterView.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
