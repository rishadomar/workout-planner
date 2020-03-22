import Vue from 'vue'
import VueRouter from 'vue-router'
// import SpinningActivities from '../views/SpinningActivities.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/spinningActivities'
  },
  {
    path: '/spinningActivities',
    name: 'SpinningActivities',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/SpinningActivities.vue')
  },
  {
    path: '/spinningActivityAddNew/:documentId',
    name: 'SpinningActivityAddNew',
    props: (route) => ({ documentId: route.params.documentId }),
    component: () => import('@/views/SpinningActivityAddNew.vue')
  },
  {
    path: '/spinningActivityPlay/:documentId',
    name: 'SpinningActivityPlay',
    props: (route) => ({ documentId: route.params.documentId }),
    component: () => import('@/views/SpinningActivityPlay.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
