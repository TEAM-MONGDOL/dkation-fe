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
        'login-bg': 'url("./_assets/icons/logoIllust.svg")',
        'home-bg': 'url("./_assets/images/home_bg.png")',
        'header-bg': 'url("./_assets/images/header_bg.png")',
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
        'cus-400': '#F9F9F9',
        'stroke-100': '#DBDBDB',
        footer: '#888888',
        button: '#2A2A2A',
        'yellow-button-line': '#E5CD07',
      },
      fontSize: {
        '1': '1.25rem',
        '2': '1.125rem',
        '3': '1rem',
        '4': '0.875rem',
        '5': '0.75rem',
        '6': '0.625rem',
        h1: '2.625rem',
        h2: '2rem',
        h3: '1.5rem',
      },
      borderRadius: {
        regular: '5px',
      },
      transitionProperty: {
        height: 'height',
        maxHeight: 'max-height',
      },
      margin: {
        15: '3.75rem',
        '3xl': '30px',
        '4xl': '40px',
        '5xl': '50px',
        '6xl': '60px',
        18: '72px',
      },
      padding: {
        15: '3.75rem',
        '3xl': '30px',
        '4xl': '40px',
        '5xl': '50px',
        '6xl': '60px',
        18: '72px',
      },
      gap: {
        '3xl': '30px',
        '4xl': '40px',
        '5xl': '50px',
        '6xl': '60px',
      },
      height: {
        '3xl': '30px',
        '4xl': '40px',
        '5xl': '50px',
        '6xl': '60px',
      },
      keyframes: {
        // 키프레임의 기본 형태를 설정합니다. (이후 컴포넌트에서 동적으로 업데이트됩니다)
        slideHandle: {},
        fillTrack: {},
      },
      animation: {
        slideHandle: 'slideHandle 9s ease-in-out forwards',
        fillTrack: 'fillTrack 9s ease-in-out forwards',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
    require('tailwind-scrollbar-hide'),
  ],
};
export default config;
