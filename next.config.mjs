/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'cdn.pixabay.com', 'image.bangkokbiznews.com', 'firebasestorage.googleapis.com', 'img.daisyui.com'],
  },
  output: 'standalone',
  experimental: {
    reactRoot: true,
  },
  webpack(config) {
    config.output.filename = '[name].[contenthash].js';
    config.output.chunkFilename = '[name].[contenthash].js';
    return config;
  },
};

export default nextConfig;
