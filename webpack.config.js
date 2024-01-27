const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add fallbacks for the crypto and stream modules
  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    // Add an alias for the missing module
    'react-native-web/Libraries/Utilities/codegenNativeCommands': path.resolve(
      __dirname,
      'mocks/codegenNativeCommands.js'
    ),
  };

  return config;
};
