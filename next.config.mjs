/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/diary',
        permanent: true,
      },
      {
        source: '/diary',
        destination: '/diary/1',
        permanent: true,
      }
    ];
  }
};

export default nextConfig;

