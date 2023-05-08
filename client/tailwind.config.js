/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      fontFamily: {
        'poppins': 'Poppins', 
        'space': 'Space Grotesk', 
        'pacifico': 'Pacifico, cursive', 
      }, 
      colors: {
        'lprimary': '#F5F5F5', 
        'lsecondary': '#454545', 
        'lascent': '#2E7188', 
        'lbg': '#F5F5DC', 
        'dprimary': '#010824', 
        'dsecondary': '#f5f5f5', 
        'dascent': '#8C919D', 
        'dbg': '#282A37'
      }, 
      screens: {
        'mob': '450px', 
        'sm': '720px', 
      }
    },
  },
  plugins: [],
}

