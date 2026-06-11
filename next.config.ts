import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-left',
  } as any
};

export default nextConfig;
