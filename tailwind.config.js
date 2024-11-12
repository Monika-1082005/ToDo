/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'true-blue': '#68e1fd',
        'true-black': '#231f20',
      },
    },
  },
  plugins: [],
}