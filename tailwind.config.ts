import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        textColor: 'var(--textColor)',
        textDark: 'var(--textColorDark)',
        softBg: 'var(--softBg)',
        softText: 'var(--softTextColor)',
        primary: 'var(--primary)',
        contactBg: 'var(--contactBg)',
        cta: 'var(--cta)',
        ctaText: 'var(--ctaText)',
        formText: 'var(--formText)',
        btnMode: 'var(--btnMode)',
        contact: 'var(--contact)',
        contactText: 'var(--contactText)',
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
      },
    },
  },
  plugins: [],
}
export default config
