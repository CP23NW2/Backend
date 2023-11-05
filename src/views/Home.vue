<template>
<Navbar></Navbar>

<AddOrder></AddOrder>

</template>

<script>
import AddOrder from "../components/AddOrder.vue";
import Navbar from '../components/Navbar.vue'

export default {
  components: {
    Navbar,
    AddOrder
  },
};
</script>

<style></style>
