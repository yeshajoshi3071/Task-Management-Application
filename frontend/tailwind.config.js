// tailwind.config.js
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // or 'media' based on your preference
  theme: {
    extend: {
      fontFamily: {
        'jakarta': ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        borderGray: 'rgba(130, 143, 163, 0.25)',
        mainPurple: '#635FC7',
        // Define light theme colors
        light: {
          background: '#ffffff',
          text: '#333333',
          // other colors for light theme
        },
        // Define dark theme colors
        dark: {
          background: '#000000',
          text: '#ffffff',
          darkGrey: '#2B2C37',
          // other colors for dark theme
        }
      },
      borderWidth: {
        '1': '1px',
      },
    }
  }
}
