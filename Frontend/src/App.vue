<template>
<div>
    <NavBar /> <!-- Include your navigation bar component once -->
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './views/Home.vue'

export default {
  components: {
    Home,
  }
}
</script>
<style></style>