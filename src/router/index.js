import Vue from 'vue'
import VueRouter from 'vue-router'
import InlineView from '../views/InlineView.vue'
import CounterView from '../views/CounterView.vue'
import ReviewView from '../views/ReviewView.vue'
import TakeView from '../views/TakeView.vue'

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
  },
  {
    path: '/review',
    name: 'review',
    component: ReviewView
  },
  {
    path: '/take',
    name: 'take',
    component: TakeView
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
