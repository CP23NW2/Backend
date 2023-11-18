<template>
  <div id="app"
    class="fixed top-0 z-50 inline-flex items-center justify-between w-full h-6 px-4 overflow-hidden md:h-10 md:px-10 bg-primary-color"
  >
    <div class="justify-start items-center gap-2.5 flex">
      <div class="relative w-3 text-white md:w-4"><Icon icon="iconoir:map-pin" /></div>
      <div class="text-[8px] md:text-sm font-normal leading-snug text-white ">
        Soi Wanglang, Khwaeng Siriraj, Bangkok
      </div>
    </div>
    <div class="flex items-center justify-start gap-5">
      <div class="justify-start items-center gap-2.5 flex">
        <div class="relative w-3 text-white md:w-4"><Icon icon="mynaui:telephone" :horizontalFlip="true" /></div>
        <div class="text-[8px] md:text-sm font-normal leading-snug text-right text-white">
          064-256-5523
        </div>
      </div>
      <div class="justify-start items-center gap-2.5 flex">
        <div class="relative w-3 text-white md:w-4"><Icon icon="ion:mail-outline" /></div>
        <div class="text-[8px] md:text-sm font-normal leading-snug text-right text-white">
          iquofficial@gmail.com
        </div>
      </div>
    </div>
  </div>
  <div class="fixed w-full -mt-8 md:-mt-6 ">
    <nav class="bg-white md:-ml-20 py-2.5  border-b-2 h-16 ">
      <div
        class="container flex flex-wrap justify-between mx-auto "
      >
        <a class="flex items-center ">
          <!-- Desktop  -->
          <div class="hidden md:block">
            <div class="w-10 h-10 rounded-full bg-primary-color ">
              <div
                class="flex items-center justify-center w-10 h-10 text-center"
              >
                <Icon icon="la:vr-cardboard" color="white" width="30" />
              </div>
            </div>
          </div>

          <!-- Mobile -->
          <div class="md:hidden sm:block">
            <div class="w-10 h-10 rounded-full bg-primary-color">
              <div
                class="flex items-center justify-center w-10 h-10 text-center"
              >
              <Icon icon="la:vr-cardboard" color="white" width="24" />
              </div>
            </div>
          </div>
          <h2 class="px-2 text-2xl font-semibold">IQU</h2>
        </a>
        <div class="flex items-center ">
          <div class="w-20"></div>
          <button class="p-2 font-bold rounded-md peer md:hidden">
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <div
  class="absolute z-10 invisible w-full -ml-20 transition-all duration-300 bg-white opacity-0 top-5 after:inline-block after:absolute after:top-0 after:w-full after:h-full after:-z-20 after:rounded-lg peer-focus:top-12 peer-focus:opacity-100 peer-focus:visible"
>
  <div class="peer">
    <ul class="flex flex-col justify-start gap-3 px-8 py-8">
      <router-link
        to="/"
        class="p-3 text-gray-700 rounded-md cursor-pointer hover:bg-primary-color hover:text-white"
      >
        Home
      </router-link>

      <router-link
        to="/customer"
        class="p-3 text-gray-700 rounded-md cursor-pointer hover:bg-primary-color hover:text-white"
      >
        Customer
      </router-link>

      <li class="p-3 text-gray-700 rounded-md cursor-pointer hover:bg-primary-color hover:text-white">
        Order
      </li>

      <li class="p-3 text-gray-700 rounded-md cursor-pointer hover:bg-primary-color hover:text-white">
        Content
      </li>

      <li>
        <a
          href="#customer"
          class="block py-2 pl-3 pr-4 text-gray-700 rounded-md cursor-pointer hover:bg-primary-color hover:text-white md:hover:bg-transparent md:hover:text-cyan-400 md:p-0 dark:text-gray-400 md:dark:hover:bg-transparent dark:border-gray-700"
        >
          About
        </a>
      </li>

      <router-link
        to="/customer"
        class="p-3 text-gray-700 rounded-md cursor-pointer hover:bg-primary-color hover:text-white"
      >
        For customer
      </router-link>

      <li class="p-3 text-gray-700 rounded-md cursor-pointer hover:bg-primary-color hover:text-white">
        Logout
      </li>
    </ul>
  </div>
</div>

        <!-- Web application  -->
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        >
          <ul
            class="flex flex-col p-2 mt-4 border border-gray-100 rounded-lg peer bg-gray-50 md:flex-row md:space-x-2 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 dark:border-gray-700"
          >
          <router-link to="/"><div class="cursor-pointer hover:bg-[#F5821F4D] md:px-4 md:py-1.5 items-center inline-flex gap-1 rounded-xl">Home</div></router-link>
          <router-link to="/customer"><div class="cursor-pointer hover:bg-[#F5821F4D] md:px-4 md:py-1.5 items-center inline-flex gap-1 rounded-xl">Customer</div></router-link>
          <router-link to="/customer"><div class="cursor-pointer hover:bg-[#F5821F4D] md:px-4 md:py-1.5 items-center inline-flex gap-1 rounded-xl">Order</div></router-link>
          <router-link to="/customer"><div class="cursor-pointer hover:bg-[#F5821F4D] md:px-4 md:py-1.5 items-center inline-flex gap-1 rounded-xl">Content</div></router-link>
          <router-link to="/customer"><div class="cursor-pointer hover:bg-[#F5821F4D] md:px-4 md:py-1.5 items-center inline-flex gap-1 rounded-xl">About</div></router-link>
          <router-link to="/customer"><div class="cursor-pointer hover:bg-[#F5821F4D] md:px-4 md:py-1.5 items-center inline-flex gap-1 rounded-xl">Contract</div></router-link>
          </ul>
        </div>
      </div>
      <div class="items-center justify-between hidden w-full md:-mr-20 md:flex md:w-auto md:order-1 ">
          <ul class="flex flex-col items-center mt-4 border border-gray-100 rounded-lg peer bg-gray-50 md:flex-row md:space-x-4 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 dark:border-gray-700">
          <router-link to="/customer"><div class="cursor-pointer hover:bg-[#F5821F4D] md:px-4 md:py-1 items-center inline-flex gap-1 rounded-xl"><Icon
                          icon="ph:user-circle-light"
                          class="inline-block h-8 md:mr-1 md:w-6 "
                        />Login</div></router-link>
          <router-link to="/customer">
            <div class="cursor-pointer hover:bg-[#F5821F4D] hover:text-black  md:px-4 md:py-1.5 items-center inline-flex gap-1 rounded-xl inline-flex items-center gap-1 text-white rounded-xl bg-primary-color md:px-2 md:py-1">
              <Icon icon="solar:home-2-outline" class="h-6 md:mr-1 md:w-5"/>For Customer
            </div>
          </router-link>
          <router-link to="/customer"><div class="cursor-pointer hover:bg-[#F5821F4D] md:px-4 md:py-1.5 items-center inline-flex gap-1 rounded-xl"><Icon icon="ion:earth-sharp" class="inline-flex items-center h-6 md:mr-1 md:w-5"/>TH</div></router-link>
        </ul>
        </div>
    </div>
    </nav>
  </div>
  
  <router-view></router-view>
</template>

<script>
import { Icon } from '@iconify/vue'
export default {
  components: {
    Icon
}
}
</script>
