import {withSentryConfig} from '@sentry/nextjs';
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Add this line
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
      {
        source: '/support',
        destination: '/support/notices',
        permanent: true,
      },
      {
        source: '/points',
        destination: '/points/history',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['example.com', 'mongdol-s3.s3.ap-northeast-2.amazonaws.com'], // Add your image domain here
  },
};

export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

org: "mongdol",
project: "dkation-nextjs",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
// tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});