import Vue from 'vue'
import VueRouter from 'vue-router'
//import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/spinningActivities'
    },
    {
        path: '/auth',
        component: () => import('@/views/Auth.vue'),
        meta: {
            guest: true
        }
    },
    {
        path: '/success',
        component: () => import('@/views/AuthSuccess.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/spinningHistory',
        name: 'SpinningHistory',
        component: () => import('@/views/SpinningHistory.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/spinningActivities',
        name: 'SpinningActivities',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/SpinningActivities.vue')
    },
    {
        path: '/spinningActivity/:documentId',
        name: 'SpinningActivity',
        props: (route) => ({ documentId: route.params.documentId }),
        component: () => import('@/views/SpinningActivity.vue')
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

router.beforeEach((to, from, next) => {

    next()



    // if (to.matched.some(record => record.meta.auth)) {
    //     firebase.auth().onAuthStateChanged(user => {
    //         if (user) {
    //             next()
    //         } else {
    //             next({
    //                 path: "/auth",
    //             })
    //         }
    //     })
    // } else {
    //     next()
    // }

})

export default router
