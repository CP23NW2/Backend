<template>
  <div>
    <div class="w-full h-screen mt-4 bg-gray-200">
      <div class="flex items-center justify-center p-4 py-10 md:py-20 md:p-10">
        <div id="printMe" class="w-full h-auto mt-4 bg-white rounded-md shadow md:mt-0">
          <!-- Header  -->
          <div
            class="bg-[#f59f546e] w-full h-12 md:h-16 flex items-center px-2.5 rounded-t-md"
          >
            <p class="text-xl md:px-10 md:text-3xl">Add Order</p>
          </div>

          <div class="flex py-5 md:px-12">
            <div class="w-full">
              <p class="px-1 text-primary-color md:text-2xl">
                User Information
              </p>
              <div
                class="grid justify-between grid-cols-3 gap-4 mt-4 md:flex-row"
              >
                <div class="w-full">
                  <p class="text-sm md:text-lg">Name</p>
                  <input
                    id="inputConfirm"
                    class="w-full text-sm bg-[#D4D4D433] rounded-md md:h-10"
                  />
                </div>
                <div class="w-full">
                  <p class="text-sm md:text-lg">Order ID</p>
                  <input
                    class="w-full text-sm bg-[#D4D4D433] rounded-md md:text-lg md:px-5 md:h-10"
                  />
                </div>
                <div class="w-full">
                  <p class="text-sm md:text-lg">Date</p>
                  <input
                    type="date"
                    class="w-full text-sm bg-[#D4D4D433] border-gray-200 rounded-md md:text-lg md:px-5 md:h-10"
                  />
                </div>
                <div class="w-full">
                  <p class="text-sm md:text-lg">Address</p>
                  <input
                    class="w-full text-sm bg-[#D4D4D433] border-gray-200 rounded-md md:text-lg md:px-5 md:h-10"
                  />
                </div>
                <div class="w-full">
                  <p class="text-sm md:text-lg">Phone number</p>
                  <input
                    class="w-full text-sm bg-[#D4D4D433] border-gray-200 rounded-md md:text-lg md:px-5 md:h-10"
                  />
                </div>
              </div>
              <div class="flex justify-end mt-5">
                <div class="mx-2">
                  <button
                    @click="confirm"
                    class="bg-blue-700 h-[24px] w-[60px] text-white rounded-md md:h-[60px] md:w-[130px] md:text-xl"
                  >
                    Confirm
                  </button>
                </div>
                <div>
                  <button
                    @click="print"
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
import VueHtmlToPaper from 'vue-html-to-paper'

export default {
  data() {
    return {
      output: null
    }
  },
  computed: {
    confirm: function () {
      return alert('Order complete!')
    }
  },
  methods: {
    async print() {
      // Pass the element id here
      await this.$htmlToPaper('printMe')
    }
  }
}
</script>
<style></style>
