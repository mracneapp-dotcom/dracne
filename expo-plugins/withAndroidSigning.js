const { withAppBuildGradle } = require('@expo/config-plugins');

module.exports = function withAndroidSigning(config) {
  return withAppBuildGradle(config, (config) => {
    const gradle = config.modResults.contents;

    // Add release signing config if not already present
    if (!gradle.includes('dracne-final.jks')) {
      config.modResults.contents = gradle
        .replace(
          /signingConfigs\s*\{[\s\S]*?debug\s*\{[\s\S]*?\}/,
          (match) => match + `
        release {
            storeFile file('../../dracne-final.jks')
            storePassword 'DracneFinal2026'
            keyAlias 'dracne-final'
            keyPassword 'DracneFinal2026'
        }`
        )
        .replace(
          'signingConfig signingConfigs.debug',
          'signingConfig signingConfigs.release'
        );
    }

    return config;
  });
};
