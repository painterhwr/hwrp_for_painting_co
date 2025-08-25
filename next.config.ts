import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      // Replace <YOUR-PROJECT> with your Supabase project ref if you wish to serve storage images via next/image
      { protocol: 'https', hostname: '<YOUR-PROJECT>.supabase.co' }
    ]
  }
}

export default nextConfig