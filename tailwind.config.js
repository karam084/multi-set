module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    screens:{
      'lg':'1061px'
    },
    fontSize: {
      sm: '0.9rem',
      base: '1.0rem',
      xl: '1.125rem',
      xxl: '1.187rem',
      xxxl: '1.953rem',
      xxxxl: '2.441rem',
      "5xl": '3.052rem',
    },
    extend: {
      fontFamily: {
         'ubuntu':'Ubuntu, Arial'
      },
      colors:{
        marine_blue:'hsl(213, 96%, 18%)',
        purplish_blue:'hsl(243, 100%, 62%)',
        pastel_blue:'hsl(228, 100%, 84%)',
        light_blue:'hsl(206, 94%, 87%)',
        strawberry_red:'hsl(354, 84%, 57%)',
        cool_gray:' hsl(231, 11%, 63%)',
        light_gray:'hsl(229, 24%, 87%)',
        magnolia:'hsl(217, 100%, 97%)',
        alabaster:'hsl(231, 100%, 99%)'
      }
    },
  },
  plugins: [
     require('@tailwindcss/forms')({
       strategy: 'base', // only generate global styles
     }),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/aspect-ratio')
  ]
}
