<template>
    <Navbar/>
    <div>
    <div class="mt-14">
        <AddOrder/>
    </div>
    </div>
    </template>
    
    <script>
    import AddOrder from '/src/components/AddOrder.vue'
    import Navbar from '/src/components/Navbar.vue'
    
    export default {
      components: {
        Navbar,
        AddOrder
      },
    };
    
    </script>
    
    <style></style>
    