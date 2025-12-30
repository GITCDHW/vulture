/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#F5F5DC', // Beige/Cream
        'primary': '#1A237E',    // Dark Blue
        'secondary': '#C5AE7D',  // Muted Gold/Brown
        'accent': '#B71C1C',     // Dark Red
        'text': '#212121',       // Dark Grey
      },
      fontFamily: {
        'heading': ['var(--font-playfair-display)', 'serif'], // Serif for headings
        'body': ['var(--font-montserrat)', 'sans-serif'],       // Sans-serif for body
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
