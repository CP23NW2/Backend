<template>
    <div class="bg-[#F5F5F5] mt-14 py-6">  
      <router-view></router-view>
      <div class="p-4 md:p-10">
        <div class="bg-white rounded-lg shadow-md">
          <div class="p-4 md:p-6">
            <div class="flex flex-row items-center justify-between md:flex-row ">
              <div class="mb-4 text-2xl font-medium md:text-3xl text-zinc-800 md:mb-0">Order List</div>
              <RouterLink to="/addorder">
              <div class="flex-shrink-0 mb-4 md:mb-0">
                <button class="flex items-center px-4 py-2 text-base font-medium text-center text-white bg-blue-800 border md:py-3 md:px-8 rounded-2xl border-neutral-300">
                    Create New Order
                </button>
              </div></RouterLink>
            </div>
            <!-- <div class="mt-4 overflow-x-auto">
              <table class="w-full text-sm text-left text-[#2B2B2B] rtl:text-right dark:text-[##EAEAEA] border">
            
                <thead class="text-xs text-[##808080] bg-[#EAEAEA] dark:bg-gray-700 dark:text-[#EAEAEA]">
                  <tr>
                    <th scope="col" class="px-6 py-3 whitespace-nowrap">Name</th>
                    <th scope="col" class="px-6 py-3 whitespace-nowrap">Phone Number</th>
                    <th scope="col" class="px-6 py-3 whitespace-nowrap">Address</th>
                    <th scope="col" class="px-6 py-3 whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-6 font-medium text-gray-900 md:py-4 whitespace-nowrap dark:text-white"
                    >
                      <Icon
                        icon="ph:user-circle-light"
                        class="inline-block w-10 h-10 mr-2"
                      />
                      Apple MacBook Pro 17
                    </th>
                    <td class="px-6 py-4">099-9999999</td>
                    <td class="px-6 py-4">
                      133/230 Prachautid 40, Bangmod, Thungkru, Bangkok 10140
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex align-items-center">
                        <Icon
                          icon="mdi:edit-circle"
                          class="w-10 h-10 text-[#55BA71]"
                        /><Icon
                          icon="mdi:trash-can-circle"
                          class="w-10 h-10 text-[#EB4F54] "
                        />
                      </div>
                    </td>
                  </tr>
                  <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Icon
                        icon="ph:user-circle-light"
                        class="inline-block w-10 h-10 mr-2"
                      />
                      Apple MacBook Pro 17
                    </th>
                    <td class="px-6 py-4">099-9999999</td>
                    <td class="px-6 py-4">
                      133/230 Prachautid 40, Bangmod, Thungkru, Bangkok 10140
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex align-items-center">
                        <Icon
                          icon="mdi:edit-circle"
                          class="w-10 h-10 text-[#55BA71]"
                        /><Icon
                          icon="mdi:trash-can-circle"
                          class="w-10 h-10 text-[#EB4F54] "
                        />
                      </div>
                    </td>
                  </tr>
                  <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Icon
                        icon="ph:user-circle-light"
                        class="inline-block w-10 h-10 mr-2"
                      />
                      Apple MacBook Pro 17
                    </th>
                    <td class="px-6 py-4">099-9999999</td>
                    <td class="px-6 py-4">
                      133/230 Prachautid 40, Bangmod, Thungkru, Bangkok 10140
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex align-items-center">
                        <Icon
                          icon="mdi:edit-circle"
                          class="w-10 h-10 text-[#55BA71]"
                        /><Icon
                          icon="mdi:trash-can-circle"
                          class="w-10 h-10 text-[#EB4F54] "
                        />
                      </div>
                    </td>
                  </tr>
                  <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Icon
                        icon="ph:user-circle-light"
                        class="inline-block w-10 h-10 mr-2"
                      />
                      Apple MacBook Pro 17
                    </th>
                    <td class="px-6 py-4">099-9999999</td>
                    <td class="px-6 py-4">
                      133/230 Prachautid 40, Bangmod, Thungkru, Bangkok 10140
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex align-items-center">
                        <Icon
                          icon="mdi:edit-circle"
                          class="w-10 h-10 text-[#55BA71]"
                        /><Icon
                          icon="mdi:trash-can-circle"
                          class="w-10 h-10 text-[#EB4F54] "
                        />
                      </div>
                    </td>
                  </tr>
                  <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Icon
                        icon="ph:user-circle-light"
                        class="inline-block w-10 h-10 mr-2"
                      />
                      Apple MacBook Pro 17
                    </th>
                    <td class="px-6 py-4">099-9999999</td>
                    <td class="px-6 py-4">
                      133/230 Prachautid 40, Bangmod, Thungkru, Bangkok 10140
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex align-items-center">
                        <Icon
                          icon="mdi:edit-circle"
                          class="w-10 h-10 text-[#55BA71]"
                        /><Icon
                          icon="mdi:trash-can-circle"
                          class="w-10 h-10 text-[#EB4F54] "
                        />
                      </div>
                    </td>
                  </tr>
                  <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Icon
                        icon="ph:user-circle-light"
                        class="inline-block w-10 h-10 mr-2"
                      />
                      Apple MacBook Pro 17
                    </th>
                    <td class="px-6 py-4">099-9999999</td>
                    <td class="px-6 py-4">
                      133/230 Prachautid 40, Bangmod, Thungkru, Bangkok 10140
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex align-items-center">
                        <Icon
                          icon="mdi:edit-circle"
                          class="w-10 h-10 text-[#55BA71]"
                        /><Icon
                          icon="mdi:trash-can-circle"
                          class="w-10 h-10 text-[#EB4F54] "
                        />
                      </div>
                    </td>
                  </tr>
                  <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Icon
                        icon="ph:user-circle-light"
                        class="inline-block w-10 h-10 mr-2"
                      />
                      Apple MacBook Pro 17
                    </th>
                    <td class="px-6 py-4">099-9999999</td>
                    <td class="px-6 py-4">
                      133/230 Prachautid 40, Bangmod, Thungkru, Bangkok 10140
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex align-items-center">
                        <Icon
                          icon="mdi:edit-circle"
                          class="w-10 h-10 text-[#55BA71]"
                        /><Icon
                          icon="mdi:trash-can-circle"
                          class="w-10 h-10 text-[#EB4F54] "
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> -->
            <nav aria-label="Page navigation" class="flex items-center justify-center mt-4">
    <ul class="flex items-center h-10 -space-x-px text-base">
      <li>
        <a href="#" class="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 ms-0 border-e-0 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <span class="sr-only">Previous</span>
          <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
          </svg>
        </a>
      </li>
      <li>
        <a href="#" class="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
      </li>
      <li>
        <a href="#" class="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
      </li>
      <li>
        <a href="#" aria-current="page" class="z-10 flex items-center justify-center h-10 px-4 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
      </li>
      <li>
        <a href="#" class="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
      </li>
      <li>
        <a href="#" class="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
      </li>
      <li>
        <a href="#" class="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <span class="sr-only">Next</span>
          <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
        </a>
      </li>
    </ul>
  </nav>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Icon } from '@iconify/vue'
  export default {
    components: {
      Icon
    }
  }
  </script>
  