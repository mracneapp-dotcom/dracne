const { withAppBuildGradle } = require('@expo/config-plugins');

module.exports = function withAndroidSigning(config) {
  return withAppBuildGradle(config, (config) => {
    let gradle = config.modResults.contents;

    // 1. Add release signingConfig block if not already present
    if (!gradle.includes('dracne-final.jks')) {
      gradle = gradle.replace(
        /(signingConfigs\s*\{[\s\S]*?debug\s*\{[\s\S]*?\})\s*\}/,
        `$1\n        release {\n            storeFile file('../../dracne-final.jks')\n            storePassword 'DracneFinal2026'\n            keyAlias 'dracne-final'\n            keyPassword 'DracneFinal2026'\n        }\n    }`
      );
    }

    // 2. Fix release buildType: split on the release block comment anchor,
    //    then replace signingConfig line within that section only.
    const releaseBlockMarker = '// Caution! In production';
    if (gradle.includes(releaseBlockMarker)) {
      const parts = gradle.split(releaseBlockMarker);
      // parts[1] is everything after the marker — starts inside the release buildType
      parts[1] = parts[1].replace(
        /signingConfig\s+signingConfigs\.\w+/,
        'signingConfig signingConfigs.release'
      );
      gradle = parts.join(releaseBlockMarker);
    }

    config.modResults.contents = gradle;
    return config;
  });
};
