/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "650px",
      md: "850px",
      lg: "976px",
      xl: "1440px",
    },

    extend: {
      boxShadow: {
        task: "0px 4px 6px rgba(54, 78, 126, 0.101545)",
      },
      animation: {
        fadeIn: "fadeIn 100ms linear",
        fadeInMobile: "fadeInMobile 100ms linear",
        opacityAnimate: "opacityAnimate 300ms ease",
      },
      keyframes: {
        fadeIn: {
          "0%": { top: "49%", opacity: "0.3" },
          "100%": { top: "50%", opacity: "1" },
        },
        fadeInMobile: {
          "0%": { top: "90px", opacity: "0.3" },
          "100%": { top: "96px", opacity: "1" },
        },
        opacityAnimate: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
    fontSize: {
      sm: ["12px", "15px"],
      base: ["13px", "23px"],
      xl: ["15px", "19px"],
      "2xl": ["18px", "23px"],
      "3xl": ["24px", "30px"],
    },
    fontFamily: {
      jakarta: "'Plus Jakarta Sans', sans serif",
    },
    colors: {
      primary1: "#A8A4FF",
      primary2: "#635FC7",
      secondary1: "rgba(99, 95, 199, 0.1)",
      secondary2: "rgba(99, 95, 199, 0.25)",
      destructive1: "#FF9898",
      destructive2: "#EA5555",
      black: "#000000",
      black1: "#3E3F4E",
      black2: "#2B2C37",
      black3: "#20212C",
      black4: "#000112",
      gray1: "#E4EBFA",
      gray2: "rgba(130, 143, 163, 0.25)",
      gray3: "#828FA3",
      white: "#FFFFFF",
      white1: "#FFFFFF",
      white2: "#F4F7FD",
    },
  },
  plugins: [],
};
