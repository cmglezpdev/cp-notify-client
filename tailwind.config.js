/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'newbie': "#cccccc",
        'pupil': "#77ff77",
        'specialist': "#77ddbb",
        'expert': "#aaaaff",
        'candidate_master': "#d97dd9",
        'master': "#ffcc88",
        'international_master': "#ffbb55", 
        'grandmaster': "#ff7777",
        'international_grandmaster': "#ff3333",
        'legendary_grandmaster': "#aa0000"
      }
    },
  },
  plugins: [],
}