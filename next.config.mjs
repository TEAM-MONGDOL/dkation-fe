/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: false,
  redirects: async () => {
    return [
      {
        source: '/admin/points',
        destination: '/admin/points/reward',
        permanent: true,
      },
      {
        source: '/admin/members/:id',
        destination: '/admin/members/:id/wk-history',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['example.com'], // Add your image domain here
  },
};

export default nextConfig;
