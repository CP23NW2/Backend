<template>
<div>
  <div class="bg-gray-200 w-full h-screen">
  <div class=" flex items-center justify-center md:py-20 py-10">
    <div id="printMe" class="bg-white w-10/12 md:w-8/12 rounded-md shadow h-auto">
      <!-- Header  -->
      <div  class="bg-[#f59f546e] w-full h-12 md:h-16 flex items-center px-2.5 rounded-md">
        <p class="text-xl md:px-10 md:text-3xl">Order Editing</p>
      </div>

      <div class="flex py-5 md:px-12">
        <div class="w-12/12">
          <p class="text-primary-color px-1 md:text-2xl ">User Information</p>

          <div class="flex justify-center items-center">
            <div class="px-1 mt-5 ">
              <p class="text-sm md:text-lg">Name</p>
              <br />
              <input id="inputConfirm" class="bg-gray-200 py-1 rounded-md text-sm px-2 w-40 md:text-lg md:w-96 md:px-5 md:h-10" />
            </div>
            <div class="px-1 mt-5 md:px-4">
              <p class="text-sm md:text-lg">Order ID</p>
              <br />
              <input class="bg-gray-200 py-1 rounded-md text-sm px-2 w-24 md:text-lg md:w-60 md:px-5 md:h-10" />
            </div>
            <div class="px-1 mt-5">
              <p class="text-sm md:text-lg">Date</p>
              <br />
              <input
                type="date"
                class="bg-gray-200 py-1 rounded-md text-sm px-2 w-28 border-gray-200 md:text-lg md:w-60 md:px-5 md:h-10"
              />
            </div>
          </div>

          <div class="flex mt-5">
            <div class="px-1">
              <p class="text-sm md:text-lg">Address</p>
              <br />
              <input class="bg-gray-200 py-1 rounded-md text-sm px-2 w-64 md:text-lg md:w-96 md:px-5 md:h-28" />
            </div>
            <div class="px-1 md:px-4">
              <p class="text-sm md:text-lg">Phone number</p>
              <br />
              <input class="bg-gray-200 py-1 rounded-md text-sm px-2 w-32 md:text-lg md:w-60 md:px-5 md:h-10" />
            </div>
          </div>

          <div class="flex justify-end mt-5">
            <div class="mx-2">
              <button @click="confirm"
                class="bg-blue-700 h-[24px] w-[60px] text-white rounded-md md:h-[60px] md:w-[130px] md:text-xl"
              >
                Confirm
              </button>
            </div>
            <div>
              <button @click="print"
                class="bg-green-500 h-[24px] w-[60px] text-white rounded-md md:h-[60px] md:w-[130px] md:text-xl"
              >
                Print
              </button>
            </div>
            <div class="mx-2">
              <button
                class="bg-red-500 h-[24px] w-[60px] text-white rounded-md md:h-[60px] md:w-[130px] md:text-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

</template>

<script>
import VueHtmlToPaper from 'vue-html-to-paper';

export default {
    data(){
        return {
            output: null
        }
    },
    computed: {
        confirm: function(){
            return alert('Order complete!')
        }
    },
    methods: {
        async print () {
      // Pass the element id here
      await this.$htmlToPaper('printMe');
    }
    }
}
</script>
<style></style>
