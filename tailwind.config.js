/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}","./common/**/*.{js,ts,jsx,tsx}" ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes:["dark","lemonade","garden",{
      mytheme: {
          

 
"primary": "#AE5AFA",
          

 
"secondary": "#6669FF",
          

 
"accent": "#7AB5E6",
          

 
"neutral": "#bbf7d0",
          
"base-100":"#c4b5fd",
 


 
"info": "#3ABFF8",
          

 
"success": "#36D399",
          

 
"warning": "#FBBD23",
          

 
"error": "#F87272",
      }
  }, 
  ]
  }
}
