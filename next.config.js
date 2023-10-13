/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        INDEX_API_URL: process.env.NEXT_PUBLIC_API_URL,
        INDEX_SEND_MESSAGE_API_URL: process.env.NEXT_PUBLIC_SEND_MESSAGE_API_URL,
    },
}

module.exports = nextConfig
