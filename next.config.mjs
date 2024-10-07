/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        NEXT_MONGODB_URI: process.env.NEXT_MONGODB_URI,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.pixabay.com',
          port: '',
          pathname: '/**',
        },
      ],
    },

};

export default nextConfig;


