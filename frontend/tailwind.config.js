// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        '1/11': '9.09%',  // 1/11 높이
        '2-5/11': '22.73%',  // 2.5/11 높이 (2.5 ÷ 11 = 0.2273)
      },
      keyframes: {
        // 우측에서 좌측으로 이동
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },

        // 위에서 아래로 이동
        dropIn: {
          "0%": { transform: "translateY(-500%)" },
          "100%": { transform: "translateY32" },
        },

        //오른쪽에서 왼쪽으로 오는데 점점 나타남
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },

        // 제자리에서 나타남
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        slideIn: "slideIn 3.5s ease-out forwards",
        dropIn: "dropIn 0.5s ease-out forwards",
        dropInTitle: "dropIn 2s ease-out forwards",
        "fade-in-right": "fade-in-right 1s ease-out forwards",
        "fade-in": "fade-in 2.5s ease-out forwards",
        "fade-in-fast": "fade-in 1s ease-out forwards",
      },
      colors: {
        mainBlue: "rgb(28, 119, 195)",
        subBlue: "rgb(57, 169, 219)",
        btnBlue: "rgb(64, 188, 216)",
        mainOrange: "rgb(243, 146, 55)",
        mainRed: "rgb(214, 50, 48)",
        mainTxt: "rgb(45, 45, 42)",
        toDoHigh: "rgb(58, 90, 64)",
        toDoMid: "rgb(88, 129, 87)",
        toDoLow: "rgb(163, 177, 138)",
        vacationHigh: "rgb(255, 143, 171)",
        vacationMid: "rgb(255, 179, 198)",
        vacationLow: "rgb(255, 194, 209)",
        vacationBtn: "rgb(251, 111, 146)",
        toDoBtn: "rgb(52, 78, 65)",
        toolBtn: "rgb(0, 128, 0)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
