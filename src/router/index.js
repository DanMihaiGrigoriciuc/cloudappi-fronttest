import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/user',
        name: 'NewUser',
        component: () => import('../views/User.vue')
    },
    {
        path: '/user/:id',
        name: 'EditUser',
        component: () => import('../views/User.vue')
    },
]

const router = new VueRouter({
    routes
})
export default router