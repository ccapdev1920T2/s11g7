import Vue from 'vue'
import VueRouter from 'vue-router'

import studentLogin from '../views/login/student-login.vue'
import studentRegister from '../views/login/student-register.vue'
import studentRegisterSuccess from '../views/login/student-register-success.vue'
import adminLogin from '../views/login/admin-login.vue'

import studentSearch from '../views/student/student-search.vue'
import studentManage from '../views/student/student-manage.vue'

import adminManage from '../views/admin/admin-manage-courses.vue'
import adminAdd from '../views/admin/admin-add.vue'
import adminEditDelete from '../views/admin/admin-edit-delete-course.vue'

Vue.use(VueRouter)

const routes = [
  // student routes
  {
    path: '/',
    name: 'loginStudent',
    component: studentLogin,
    meta: {
      title: 'ANIMOSIS'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: studentRegister,
    meta: {
      title: 'ANIMOSIS | Register'
    }
  },
  {
    path: '/registerSuccess',
    name: 'RegisterSuccess',
    component: studentRegisterSuccess,
    meta: {
      title: 'ANIMOSIS | Register'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: studentSearch,
    meta: {
      title: 'ANIMOSIS | Search'
    }
  },
  {
    path: '/manage',
    name: 'Manage',
    component: studentManage,
    meta: {
      title: 'ANIMOSIS | Manage Courses'
    }
  },

  // admin routes
  {
    path: '/admin',
    name: 'loginAdmin',
    component: adminLogin,
    meta: {
      title: 'ANIMOSIS | Admin Login'
    }
  },
  {
    path: '/admin-add',
    name: 'adminAdd',
    component: adminAdd,
    meta: {
      title: 'ANIMOSIS | Admin Course Form'
    }
  },
  {
    path: '/admin-edit/:classnum',
    name: 'adminEditCourse',
    component: adminEditDelete,
    meta: {
      title: 'ANIMOSIS | Admin Course Form'
    }
  },
  {
    path: '/admin-manage',
    name: 'adminManage',
    component: adminManage,
    meta: {
      title: 'ANIMOSIS | Admin Manage Courses'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router