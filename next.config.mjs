/** @type {import('next').NextConfig} */
import pwa from "@ducanh2912/next-pwa";

const withPWA = pwa({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});


const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/diary',
        permanent: true,
      }
    ];
  }
};

export default withPWA(nextConfig);

