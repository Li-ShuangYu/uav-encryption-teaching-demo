/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#121417',      
        panelBg: '#1c2126',     
        cardInnerBg: '#232930', 
        borderColor: '#2d353e', 
        accentGreen: '#23b586', 
        accentGreenDark: '#1a8a66',
        textMain: '#d1d5db',    
        textMuted: '#6b7280',   
      },
      fontSize: {
        'xxs': '0.65rem',
      }
    },
  },
  plugins: [],
}