module.exports = {
  darkMode: 'class', // Use 'class' strategy for toggling
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'], // Adjust as per your project structure
  theme: {
    extend: {
      keyframes: {
        rotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' },
        },
      },
      animation: {
        rotation: 'rotation 0.4s ease-in-out forwards ',
      },
    },
  },
  plugins: [],
};
