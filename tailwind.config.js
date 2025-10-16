// // tailwind.config.js
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-orange-red': 'linear-gradient(to right, #ea580c, #b91c1c)',
        'gradient-green-emerald': 'linear-gradient(to right, #16a34a, #059669)',
        'gradient-indigo-purple': 'linear-gradient(to right, #4f46e5, #9333ea)',
      
      
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}