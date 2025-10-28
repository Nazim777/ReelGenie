import { NextConfig } from "next";
import { Configuration } from "webpack";

const nextConfig: NextConfig = {
  experimental: {
    serverActions:{},
  },
  webpack: (
    config: Configuration,
    { isServer }: { isServer: boolean; dev: boolean; defaultLoaders: any; webpack: any }
  ): Configuration => {
    if (isServer) {
      // Prevent bundling Remotion native binaries
      if (!config.externals) config.externals = [];
      if (Array.isArray(config.externals)) {
        config.externals.push(
          /@remotion\/bundler/,
          /@remotion\/renderer/,
          /@remotion\/compositor-.*/
        );
      }
    }
    return config;
  },
};

export default nextConfig;
