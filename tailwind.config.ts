import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './notes/**/*.{md,mdx}',
    './events/**/*.{md,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

