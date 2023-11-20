<template>
    <NavBar />

    <OrderList/>
</template>
    
    <script>
    import NavBar from '../components/Navbar.vue'
    import { Icon } from '@iconify/vue'
    import OrderList from '../components/OrderList.vue';
    export default {
      components: {
    NavBar,
    Icon,
    OrderList
    }
    }
    </script>
    