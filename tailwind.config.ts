import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#FDE000',
        primaryDark: '#FF8A00',
        negative: '#FF2424',
        positive: '#1C68FF',
        'sub-100': '#D9D9D9',
        'sub-200': '#9A9998',
        'sub-300': '#666666',
        'sub-400': '#111111',
        'cus-100': '#F4F6FA',
        'cus-200': '#374553',
        'cus-300': '#323232',
        'stroke-100': '#DBDBDB',
      },
      fontSize: {
        '1': '20px',
        '2': '18px',
        '3': '16px',
        '4': '14px',
        '5': '12px',
        '6': '10px',
        h1: '42px',
        h2: '32px',
        h3: '24px',
      },
      borderRadius: {
        regular: '5px',
      },
      transitionProperty: {
        height: 'height',
        maxHeight: 'max-height',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
    require('tailwind-scrollbar-hide'),
  ],
};
export default config;
