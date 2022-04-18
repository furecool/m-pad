import Vue from 'vue'
import VueRouter from 'vue-router'
import InlineView from '../views/InlineView.vue'
import CounterView from '../views/CounterView.vue'

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
    component: CounterView
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
