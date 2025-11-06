/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  experimental: {
    skipTrailingSlashRedirect: true,
  },
  // Disable error overlay during build
  reactStrictMode: false,
}

module.exports = nextConfig
