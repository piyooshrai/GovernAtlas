/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: false,
  },
  // Enable static export for deployment flexibility
  // Uncomment the line below for static hosting (Vercel, Netlify, etc.)
  // output: 'export',
}

module.exports = nextConfig
