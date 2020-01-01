import Vue from 'vue'
import VueRouter from 'vue-router'
import Tournaments from '../views/Tournaments/Index.vue'
import Tournament from '../views/Tournaments/View.vue'
import Teams from '../views/Teams/Index.vue'
import Team from '../views/Teams/View.vue'
import CreateTeam from '../views/Teams/Create.vue'
import CreateTournament from '../views/Tournaments/Create.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/tournaments',
    name: 'tournaments',
    component: Tournaments,
    alias: '/'
  },
  {
    path: '/tournaments/create',
    name: 'tournament_create',
    component: CreateTournament
  },
  {
    path: '/teams',
    name: 'teams',
    component: Teams
  },
  {
    path: '/teams/create',
    name: 'team_create',
    component: CreateTeam
  },
  {
    path: '/teams/:shortName',
    name: 'team',
    component: Team
  },
  {
    path: '/teams/:shortName/edit',
    name: 'team_edit',
    component: CreateTeam
  },
  {
    path: '/tournaments/:id',
    name: 'tournament',
    component: Tournament
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
