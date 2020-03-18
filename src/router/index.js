import Vue from 'vue'
import VueRouter from 'vue-router'

import studentSearch from '../views/student-search.vue'
import studentManage from '../views/student-manage.vue'
import studentResults from '../views/student-results.vue'
import loginStudent from '../views/student-login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'loginStudent',
    component: loginStudent
  },
  {
    path: '/search',
    name: 'Search',
    component: studentSearch
  },
  {
    path: '/results',
    name: 'Results',
    component: studentResults
  },
  {
    path: '/manage',
    name: 'Manage',
    component: studentManage
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
