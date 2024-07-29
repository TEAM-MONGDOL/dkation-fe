/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;
