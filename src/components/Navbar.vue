<template>
    <div class="flex h-16">
        <nav class="bg-white px-2 sm:px-4 py-2.5 fixed w-full z-10 border-b-2 h-16">
          <div
            class="container flex flex-wrap items-center justify-between mx-auto"
          >
            <a class="flex items-center">
  
              <!-- Desktop  -->
              <div class="hidden md:block">
                <div class="bg-primary-color h-10 w-10 rounded-full">
                  <div
                    class="flex justify-center items-center text-center h-10 w-10"
                  >
                    <Icon
                      icon="streamline:computer-virtual-reality-gaming-virtual-gear-controller-reality-games-headset-technology-vr-eyewear"
                      color="white"
                      width="30"
                    />
                  </div>
                </div>
              </div>
  
              <!-- Mobile -->
              <div class="md:hidden sm:block">
                <div class="bg-primary-color h-10 w-10 rounded-full">
                  <div
                    class="flex justify-center items-center text-center h-10 w-10"
                  >
                    <Icon
                      icon="streamline:computer-virtual-reality-gaming-virtual-gear-controller-reality-games-headset-technology-vr-eyewear"
                      color="white"
                      width="20"
                    />
                  </div>
                </div>
              </div>
              <h2 class="px-2 font-semibold text-2xl">IQU</h2>
            </a>
            <div class="flex items-center">
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
                class="absolute z-10 invisible transition-all duration-300 opacity-0 w-80 top-5 after:inline-block after:absolute after:top-0 after:bg-white after:w-full after:h-full after:-z-20 after:rounded-lg peer-focus:top-12 peer-focus:opacity-100 peer-focus:visible"
              >
                <ul class="flex flex-col gap-3 px-3 py-6">
                  <li
                    href="#home"
                    class="p-3 text-gray-700 rounded-md cursor-pointer hover:opacity-90"
                  >
                    Home
                  </li>
                  <li
                    class="p-3 text-gray-700 rounded-md cursor-pointer hover:opacity-90"
                  >
                    Order
                  </li>
                  <li
                    href="#enterprise"
                    class="p-3 text-gray-700 rounded-md cursor-pointer hover:opacity-90"
                  >
                    Content
                  </li>
                  <li>
                    <a
                      href="#customer"
                      class="block py-2 pl-3 pr-4 text-gray-700 rounded md:hover:bg-transparent md:hover:text-cyan-400 md:p-0 dark:text-gray-400 md:dark:hover:bg-transparent dark:border-gray-700"
                      >About</a
                    >
                  </li>
                  <li
                    href="#customer"
                    class="p-3 text-gray-700 rounded-md cursor-pointer hover:opacity-90"
                  >
                    For customer
                  </li>
                  <li
                    href="#pricing"
                    class="p-3 text-gray-700 rounded-md cursor-pointer hover:opacity-90"
                  >
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
                class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-white dark:border-gray-700"
              >
                <li>
                  <a
                    href="#home"
                    class="block py-2 pl-3 pr-4 text-gray-700 rounded md:hover:bg-transparent md:hover:text-cyan-400 md:p-0 dark:text-gray-400 md:dark:hover:bg-transparent dark:border-gray-700"
                    >Home</a
                  >
                </li>
                <li>
                  <a
                    href="#user"
                    class="block py-2 pl-3 pr-4 text-gray-700 rounded md:hover:bg-transparent md:hover:text-cyan-400 md:p-0 dark:text-gray-400 md:dark:hover:bg-transparent dark:border-gray-700"
                    >Order</a
                  >
                </li>
                <li>
                  <a
                    href="#enterprise"
                    class="block py-2 pl-3 pr-4 text-gray-700 rounded md:hover:bg-transparent md:hover:text-cyan-400 md:p-0 dark:text-gray-400 md:dark:hover:bg-transparent dark:border-gray-700"
                    >Content</a
                  >
                </li>
                <li>
                  <a
                    href="#customer"
                    class="block py-2 pl-3 pr-4 text-gray-700 rounded md:hover:bg-transparent md:hover:text-cyan-400 md:p-0 dark:text-gray-400 md:dark:hover:bg-transparent dark:border-gray-700"
                    >About</a
                  >
                </li>
                <li>
                  <a
                    href="#pricing"
                    class="block py-2 pl-3 pr-4 text-gray-700 rounded md:hover:bg-transparent md:hover:text-cyan-400 md:p-0 dark:text-gray-400 md:dark:hover:bg-transparent dark:border-gray-700 textChange"
                    >Contact</a
                  >
                </li>
                <li>
                  <a
                    href="#contact"
                    class="block py-2 pl-3 pr-4 text-gray-700 rounded md:hover:bg-transparent md:hover:text-cyan-400 md:p-0 dark:text-gray-400 md:dark:hover:bg-transparent dark:border-gray-700 textChange"
                    >For Customer</a
                  >
                </li>
                <li>
                  <a
                    href="#contact"
                    class="block py-2 pl-3 pr-4 text-gray-700 rounded md:hover:bg-transparent md:hover:text-cyan-400 md:p-0 dark:text-gray-400 md:dark:hover:bg-transparent dark:border-gray-700 textChange"
                    >Logout</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </div>
  </template>
  
  <script>
  import { Icon } from "@iconify/vue";
  export default {
    components: {
      Icon,
    },
  };
  </script>