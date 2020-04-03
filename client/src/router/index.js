import Vue from 'vue'
import VueRouter from 'vue-router'

import studentLogin from '../views/student-login.vue'
import studentRegister from '../views/student-register.vue'
import studentSearch from '../views/student-search.vue'
import studentManage from '../views/student-manage.vue'

import adminLogin from '../views/admin-login.vue'
import adminManage from '../views/admin-manage-courses.vue'
import adminAdd from '../views/admin-add-course.vue'
import adminEdit from '../views/admin-edit-course.vue'

Vue.use(VueRouter)

const routes = [
  // student routes
  {
    path: '/',
    name: 'loginStudent',
    component: studentLogin
  },
  {
    path: '/register',
    name: 'Register',
    component: studentRegister
  },
  {
    path: '/search',
    name: 'Search',
    component: studentSearch
  },
  {
    path: '/manage',
    name: 'Manage',
    component: studentManage
  },

  // admin routes
  {
    path: '/admin',
    name: 'loginAdmin',
    component: adminLogin
  },
  {
    path: '/admin-add',
    name: 'adminAdd',
    component: adminAdd
  },
  {
    path: '/admin-edit',
    name: 'adminEdit',
    component: adminEdit
  },
  {
    path: '/admin-manage',
    name: 'adminManage',
    component: adminManage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
