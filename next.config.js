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
    SALT: process.env.SALT,
    SALT: process.env.ACCESS_TOKEN_KEY,
    SALT: process.env.REFRESH_TOKEN_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*{/}?',
        destination: `${process.env.BE_URL}:path*`,
      },
    ]
  },
}
