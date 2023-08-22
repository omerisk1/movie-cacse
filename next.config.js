/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_KEY: process.env.API_KEY,
    },
    images: {
        domains: ['http://m.media-amazon.com','https://m.media-amazon.com', 'm.media-amazon.com'],
      },
}

module.exports = nextConfig
