module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};

require.extensions['.ios.js'] = require.extensions['.js'];
