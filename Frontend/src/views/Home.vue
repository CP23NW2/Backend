<template>
  <Navbar />
  <div class="w-full mt-16 md:mt-12 md:w-full">
    <div class="p-12 md:p-24 md:pb-4 custom-gradient">
      <div class="grid items-center justify-between grid-cols-4 gap-4">
        <div
          class="inline-flex flex-col items-center justify-center w-full gap-3 py-10 bg-white shadow rounded-3xl"
        >
          <div class="text-4xl font-semibold leading-10 text-orange-400">
            100
          </div>
          <div class="text-base font-medium text-zinc-500">Pending Order</div>
        </div>
        <div
          class="inline-flex flex-col items-center justify-center w-full gap-3 py-10 bg-white shadow rounded-3xl"
        >
          <div class="text-4xl font-semibold leading-10 text-orange-400">
            100
          </div>
          <div class="text-base font-medium text-zinc-500">
            Shipping to Order
          </div>
        </div>
        <div
          class="inline-flex flex-col items-center justify-center w-full gap-3 py-10 bg-white shadow rounded-3xl"
        >
          <div class="text-4xl font-semibold leading-10 text-orange-400">
            200
          </div>
          <div class="text-base font-medium text-zinc-500">In-store Order</div>
        </div>
        <div
          class="inline-flex flex-col items-center justify-center w-full gap-3 py-10 bg-white shadow rounded-3xl"
        >
          <div class="text-4xl font-semibold leading-10 text-orange-400">
            100
          </div>
          <div class="text-base font-medium text-zinc-500">Order Complete</div>
        </div>
      </div>
      <div class="flex justify-center md:p-12">
        <div
          class="flex justify-center p-8 bg-blue-800 shadow h-14 w-100 rounded-2xl"
        >
          <div
            class="inline-flex items-center self-stretch justify-center gap-2"
          >
            <RouterLink to="addorder">
              <div class="text-2xl font-medium text-center text-white">
                Create New Order
              </div></RouterLink
            >
          </div>
        </div>
      </div>

      <form>
        <label
          for="product_status"
          class="block mb-2 text-3xl font-medium text-gray-900 dark:text-white"
          >Search product status</label
        >
        <div class="flex items-center justify-between gap-5 pt-2">
          <div class="relative w-full">
            <input
              type="text"
              id="voice-search"
              class="block w-full p-5 text-base text-gray-900 border border-gray-300 rounded-2xl bg-white focus:ring-blue-500 focus:border-blue-500 ps-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-[#AAAAAA] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Put order number for 10 characters ex. 4759093895"
              required
            />
            <button
              type="button"
              class="absolute z-10 flex items-center end-2 pe-5 inset-y-8"
            >
              <Icon icon="carbon:close-filled" class="w-8 h-8 text-[#808080]" />
            </button>
          </div>
          <button
            type="submit"
            class="inline-flex items-center p-5 px-10 text-base font-medium text-white bg-[#2B2B2B] rounded border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div
        class="inline-flex items-center w-3 md:w-full justify-center gap-10 my-[40px]"
      >
        <img src="images/found.png" />

        <div class="inline-flex flex-col items-start justify-start gap-6 ">
          <div class="text-3xl font-medium text-orange-400 w-52">IQU</div>
          <div class="text-6xl font-semibold leading-10 w-96 text-[#2B2B2B]">
            Oups!
          </div>
          <div class="w-full text-base font-medium text-[#808080]">
            No found this search, Try to search again for status orders and you
            <br />
            could put order number in search input :)
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full h-full bg-[#F5821F] relative overflow-hidden">
    <div class="absolute z-10 -top-10 -left-10">
      <div
        class="rounded-full opacity-50 w-72 h-72 bg-gradient-to-b from-[#F9F9F9] blur-sm"
      ></div>
    </div>
    <div class="absolute z-10 -mt-10 -end-10">
      <div
        class="rounded-full opacity-50 w-72 h-72 bg-gradient-to-b from-[#F9F9F9] blur-sm"
      ></div>
    </div>
    <div class="absolute left-[700px] -bottom-[200px] z-10">
      <div
        class="rounded-full opacity-50 w-80 h-80 bg-gradient-to-b from-[#F9F9F9] blur-sm"
      ></div>
    </div>
    <div class="relative z-20 inline-flex gap-20 p-24">
      <!-- image -->
      <div class="grid gap-4">
        <div class="w-full h-full">
          <img
            class="object-cover w-full h-full rounded shadow"
            src="images/image-content2.png"
            alt="Image 2"
          />
        </div>
        <div class="flex items-start gap-5">
          <div class="relative z-10 w-72 h-72">
            <img
              class="object-cover w-full h-full rounded shadow"
              src="images/image-content1.png"
              alt="Image 1"
            />
          </div>
          <div class="z-10 w-72 h-72">
            <img
              class="object-cover w-full h-full rounded shadow"
              src="images/image-content3.png"
              alt="Image 3"
            />
          </div>
        </div>
      </div>
      <!-- content -->
      <div class="z-20 inline-flex flex-col items-center justify-center gap-10">
        <div class="self-stretch text-5xl font-semibold leading-tight">
          Eyewear store that has been open for more than 10 years, offering
          high-quality eyeglasses
        </div>
        <div
          class="p-10 bg-white rounded-lg border-l-[16px] border-black justify-start items-center gap-2.5 inline-flex"
        >
          <div class="w-full text-[25px] font-medium text-justify">
            The story of this eyewear store began in Wang Lang Soi 5, where
            there was only one store in the entire Wang Lang Soi 5 area. With a
            unique approach to eye measurements focused on accuracy, we have
            earned the trust of customers from all walks of life for over 10
            years. In order to strengthen our relationships with customers, we
            expanded our store to offer high-quality eyeglass cutting services
            at prices that were unprecedented. This is what has kept our
            customers loyal to us for a long time, as there is no one else who
            can compare to us. We are Wang Lang Soi 5 Eyewear, and we are
            delighted to serve you.
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex items-center justify-center gap-10 p-24">
    <!-- Text Content -->
    <div class="flex flex-col items-center w-full gap-10">
      <div class="text-5xl font-semibold leading-10 text-black">
        IQU Location
      </div>
      <div class="font-medium text-[24px] text-zinc-800 text-center">
        <Icon icon="iconoir:map-pin" class="inline-flex w-10 h-10"/>
        Soi Wanglang, Khwaeng Siriraj, Khet Bangkok Noi, Krung Thep Maha Nakhon,
        Thailand 10700
      </div>
    </div>

    <!-- Google Map -->
    <div class="relative w-full h-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d968.8453199483042!2d100.4845007!3d13.7558657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2993051e73297%3A0xefb268b41be6b4e4!2z4Lij4LmJ4Liy4LiZ4LmB4Lin4LmI4LiZ4LiV4Liy4Lin4Lix4LiH4Lir4Lil4Lix4LiH4LiL4Lit4LiiIDU!5e0!3m2!1sth!2sth!4v1700760250463!5m2!1sth!2sth"
        width="747"
        height="454"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import { Icon } from '@iconify/vue'

export default {
  components: {
    Navbar,
    Icon
  }
}
</script>

<style>
.custom-gradient {
  background: linear-gradient(
    to bottom,
    rgba(255, 199, 168, 0.3) 50%,
    rgba(205, 96, 35, 0.3) 100%
  );
}
</style>
