/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // чистая статика в /out — оптимально для Netlify
  images: { unoptimized: true },
}

export default nextConfig
