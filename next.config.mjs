/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fiqeuvdxsqupjdgqcpnj.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/asset/**',
            },
        ],
    },
};

export default nextConfig;
