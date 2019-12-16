import Vue from 'vue'
import VueRouter from 'vue-router'
import Tournaments from '../views/Tournaments/Index.vue'
import Teams from '../views/Teams/Index.vue'
import Team from '../views/Teams/View.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/tournaments',
    name: 'tournaments',
    component: Tournaments,
    alias: '/'
  },
  {
    path: '/teams',
    name: 'teams',
    component: Teams
  },
  {
    path: '/teams/:id',
    name: 'team',
    component: Team
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
