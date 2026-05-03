/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/imports/**/*.{js,ts,jsx,tsx,mdx}",
  ],
    corePlugins: {
      preflight: false, 
  },
  theme: {
    extend: {
   
      fontFamily: {
        base: ["var(--font-base)", "sans-serif"],
      },
      colors: {
        uaBlack: "#000000",
        uaRed: "#FF0000",
      },
    
    },
  },
  plugins: [],
}

