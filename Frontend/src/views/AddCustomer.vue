<template>
    <NavBar/>
    <div>
<div class="mt-14">
    <AddCustomer/>
    </div>
    </div>
</template>
<script>
import NavBar from '/src/components/Navbar.vue'
import AddCustomer from '/src/components/AddCustomer.vue'
import { Icon } from '@iconify/vue'
export default {
  components: {
    NavBar,
    AddCustomer,
    Icon
  }
}
</script>