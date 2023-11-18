<template>
<Navbar/>
<div class="w-full mt-14 bg-gradient-to-b from-orange-200 via-red-200 to-orange-600">
    <div class="items-center grid-cols-4 grid justify-between gap-4 px-24 h-[1000px] pb-[300px]">
    <div class="inline-flex flex-col items-center justify-center w-full gap-3 py-10 bg-white shadow rounded-3xl">
        <div class="text-4xl font-semibold leading-10 text-orange-400">100</div>
        <div class="text-base font-medium text-zinc-500 ">Pending Order</div>
    </div>
    <div class="inline-flex flex-col items-center justify-center w-full gap-3 py-10 bg-white shadow rounded-3xl">
        <div class="text-4xl font-semibold leading-10 text-orange-400">100</div>
        <div class="text-base font-medium text-zinc-500 ">Shipping to Order</div>
    </div>
    <div class="inline-flex flex-col items-center justify-center w-full gap-3 py-10 bg-white shadow rounded-3xl">
        <div class="text-4xl font-semibold leading-10 text-orange-400">200</div>
        <div class="text-base font-medium text-zinc-500 ">In-store Order</div>
    </div>
    <div class="inline-flex flex-col items-center justify-center w-full gap-3 py-10 bg-white shadow rounded-3xl">
        <div class="text-4xl font-semibold leading-10 text-orange-400">100</div>
        <div class="text-base font-medium text-zinc-500 ">Order Complete</div>
      </div>
      <div class="flex justify-center h-16 py-5 bg-blue-800 shadow w-100 px-11 rounded-2xl">
        <div class="inline-flex items-center self-stretch justify-center gap-2">
          <RouterLink to="addorder">
          <div class="text-3xl font-medium text-center text-white ">Create New Order</div></RouterLink>
        </div>
      </div>
</div>

</div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  components: {
    Navbar
  },
};

</script>

<style></style>
