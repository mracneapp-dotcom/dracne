#!/bin/bash
set -e

echo "🔧 Applying expo-facebook Android patch..."

FACEBOOK_BUILD_FILE="node_modules/expo-facebook/android/build.gradle"

if [ -f "$FACEBOOK_BUILD_FILE" ]; then
  # Add compileSdk after first line
  sed -i "1 a\\
\\
android {\\
  compileSdk 36\\
}\\
" "$FACEBOOK_BUILD_FILE"
  
  # Replace classifier line
  sed -i "s/classifier = 'sources'/archiveClassifier.set('sources')/g" "$FACEBOOK_BUILD_FILE"
  
  echo "✅ expo-facebook patched successfully"
else
  echo "⚠️  expo-facebook not found yet, will be patched by patch-package"
fi
