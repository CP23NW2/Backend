<template>
<NavBar />
<CustomerList/>
</template>

<script>
import NavBar from '/src/components/Navbar.vue'
import CustomerList from '/src/components/CustomerList.vue';
export default {
  components: {
    NavBar,
    CustomerList
  }
}
</script>
