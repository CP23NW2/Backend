import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Customer from '../views/Customer.vue'

const history=createWebHistory(); // Pass the base URL here

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/customer',
        name: 'customer',
        component: Customer
    }
]

const router = createRouter({ history, routes })
export default router
