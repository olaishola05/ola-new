// import removeImports from 'next-remove-imports'

/** @type {import('next').NextConfig} */
// const removeImports = require('next-remove-imports')();
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    domains: ['localhost'],
    remotePatterns: [

      {
        protocol: 'https',
        hostname: 'cdn-images-1.medium.com',
        port: '',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.accredible.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'asset.cloudinary.com',
        port: '',
        pathname: '/**',
      }, {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      }, {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "images.unsplash.com",
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: "api.uifaces.co",
        port: '',
        pathname: '/**'
      }, {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/**'
      },
    ],
  },
}

export default nextConfig
