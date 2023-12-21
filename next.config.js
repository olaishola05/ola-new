/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
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
      }
    ],
  },
}

module.exports = nextConfig
