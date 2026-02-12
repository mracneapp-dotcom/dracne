const { withSettingsGradle } = require('@expo/config-plugins');

module.exports = function excludeIAPFromAndroid(config) {
  return withSettingsGradle(config, (config) => {
    if (config.modResults.contents) {
      // Remove expo-in-app-purchases from autolinking
      config.modResults.contents = config.modResults.contents
        .split('\n')
        .filter(line => !line.includes('expo-in-app-purchases'))
        .join('\n');
    }
    return config;
  });
};
