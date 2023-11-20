/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    colors: {
      "green" : "#55BA71",
      "dark-blue" : "#264AA8",
      "red" : "#EB4F54",
      "primary-color" : "#F5821F",
      "white" : "#FFFFFF",
      "almost-white" : "#F9F9F9",
      "black" : "#0B090A",
      "dark-grey" : "#2B2B2B",
      "grey" : "#08080",
      "bright-grey" : "#AAAAAA",
      "color-5" : "#D4D4D4",
      "color-6" : "#EAEAEA"
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
  
};

