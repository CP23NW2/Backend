<template>
<NavBar />
<CustomerList/>
</template>

<script>
import NavBar from '../components/Navbar.vue'
import CustomerList from '../components/CustomerList.vue';
import { Icon } from '@iconify/vue'
export default {
  components: {
    NavBar,
    CustomerList,
    Icon
  }
}
</script>
