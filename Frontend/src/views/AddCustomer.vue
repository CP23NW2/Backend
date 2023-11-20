<template>
    <NavBar/>
    <div>
<div class="mt-14">
    <AddCustomer/>
    </div>
    </div>
</template>
<script>
import NavBar from '../components/Navbar.vue'
import AddCustomer from '../components/AddCustomer.vue';
import { Icon } from '@iconify/vue'
export default {
  components: {
    NavBar,
    AddCustomer,
    Icon
  }
}
</script>