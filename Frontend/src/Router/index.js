import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Customer from '../views/Customer.vue'
import AddCustomer from '../views/AddCustomer.vue'
import AddOrder from '../views/AddOrder.vue'
import Order from '../views/Order.vue'

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
    },
    {
        path: '/addcustomer',
        name: 'addcustomer',
        component: AddCustomer
    },
    {
        path: '/addorder',
        name: 'addorder',
        component: AddOrder
    },
    {
        path: '/order',
        name: 'order',
        component: Order
    }
]

const router = createRouter({ history, routes })
export default router
