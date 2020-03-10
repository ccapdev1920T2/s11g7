import Vue from 'vue'
import VueRouter from 'vue-router'

import studentSearch from '../views/student-search.vue'
import studentManage from '../views/student-manage.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/student-search',
    name: 'Search',
    component: studentSearch
  },
  {
    path: '/student-manage',
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
