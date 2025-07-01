/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep blue-black base colors
        primary: {
          DEFAULT: "#16213E", // primary[2]
          dark: "#1A1A2E", // primary[1]
          darker: "#1E1E1E", // primary[0]
          light: "#144272", // primary[5]
          lighter: "#2C74B3", // primary[7]
        },
        // Electric blue accents
        accent: {
          DEFAULT: "#0369A1", // accent[6]
          dark: "#075985", // accent[7]
          darker: "#0C4A6E", // accent[8]
          light: "#38BDF8", // accent[3]
          lighter: "#BAE6FD", // accent[1]
        },
        // Dark theme surfaces
        surface: {
          DEFAULT: "#1A1A2E", // primary[1]
          dark: "#082F49", // accent[9]
          light: "#0F3460", // primary[3]
        },
        // Text colors
        text: {
          DEFAULT: "#E0F2FE", // accent[0]
          secondary: "#BAE6FD", // accent[1]
          muted: "#7DD3FC", // accent[2]
        },
      },
    },
  },
  plugins: [],
};
