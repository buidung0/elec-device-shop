/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    listStyleType: {
      square: 'square',
      roman: 'upper-roman',
    },
    fontFamily: {
      main: ['Poppins', 'sans-serif'],
    },
    extend: {
      zIndex: {
        10000: '10000',
      },
      width: {
        main: '1220px',
      },
      backgroundColor: {
        main: '#ee3131',
      },
      colors: {
        main: '#ee3131',
        overlay: 'rgba(0,0,0,0.2)',
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
        5: '5 5 0%',
        6: '6 6 0%',
        7: '7 7 0%',
        8: '8 8 0%',
      },
      keyframes: {
        'slide-top': {
          '0%': {
            '-webkit-transform': 'translateY(40px)',
            transform: 'translateY(40px)',
          },
          '100%': {
            '-webkit-transform': 'translateY(0px)',
            transform: 'translateY(0px)',
          },
        },
        'slide-top-sm': {
          '0%': {
            '-webkit-transform': 'translateY(8px)',
            transform: 'translateY(8px)',
          },
          '100%': {
            '-webkit-transform': 'translateY(0px)',
            transform: 'translateY(0px)',
          },
        },
        'slide-right': {
          '0%': {
            '-webkit-transform': 'translateY(-5000px)',
            transform: 'translateY(-5000px)',
          },
          '100%': {
            '-webkit-transform': 'translateY(100px)',
            transform: 'translateY(100px)',
          },
        },
        'scale-up-center': {
          '0%': {
            '-webkit-transform': 'scale(0.5)',
            transform: 'scale(0.5)',
          },
          '100%': {
            '-webkit-transform': 'scale(1)',
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        'slide-top': 'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-right': 'slide-top-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-top-sm': 'slide-top-sm 0.1s linear both',
        'scale-up-center': 'scale-up-center 0.15s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss'),
    require('postcss-nesting'),
    require('postcss-import'), // postcss-import
    require('autoprefixer'),
  ],
};
