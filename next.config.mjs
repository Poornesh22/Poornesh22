/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        NEXT_MONGODB_URI: process.env.NEXT_MONGODB_URI,
    },

};

export default nextConfig;


