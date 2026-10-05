/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui', '@repo/validator', '@repo/auth', '@repo/contract'],
};

export default nextConfig;
