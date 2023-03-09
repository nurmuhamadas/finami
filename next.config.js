/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flowbite.com',
      },
    ],
  },
  env: {
    BE_URL: process.env.BE_URL,
    SALT: process.env.SALT,
    ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*{/}?',
        destination: `${process.env.BE_URL}/:path*`,
      },
    ]
  },
}
