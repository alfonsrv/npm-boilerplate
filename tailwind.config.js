/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  content: ["./src/**/*.{html,js,njk}"],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#0F67F4',
          600: '#254099',
          900: '#14213D',
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
