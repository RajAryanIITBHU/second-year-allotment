/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "https",
        pathname: "lh3.googleusercontent",
        
      },
    ],
  },
};

export default nextConfig;
