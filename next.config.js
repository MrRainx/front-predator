/** @type {import('next').NextConfig} */
module.exports = {
  // cssModules: false,
  webpack5: true,
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  target: 'serverless',
  env: {
    // PRIVATE_KEY: keys.private,
    // PUBLIC_KEY: keys.public,
  },
  cssLoaderOptions: {
    url: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.extensions = [
      ...config.resolve.extensions,
      ...['.gql', '.graphql'],
    ];

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: require.resolve('graphql-tag/loader'),
    });

    return config;
  },
};
