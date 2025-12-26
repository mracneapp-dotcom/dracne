#!/bin/bash
set -e

echo "🔧 Applying expo-facebook Android patch after npm install..."

FACEBOOK_BUILD_FILE="node_modules/expo-facebook/android/build.gradle"

if [ -f "$FACEBOOK_BUILD_FILE" ]; then
  echo "📦 Found expo-facebook, applying patches..."
  
  # Check if already patched
  if grep -q "archiveClassifier.set" "$FACEBOOK_BUILD_FILE"; then
    echo "✅ Already patched, skipping"
    exit 0
  fi
  
  # Add compileSdk after first line
  sed -i.bak "1 a\\
\\
android {\\
  compileSdk 36\\
}\\
" "$FACEBOOK_BUILD_FILE"
  
  # Replace classifier line  
  sed -i.bak "s/classifier = 'sources'/archiveClassifier.set('sources')/g" "$FACEBOOK_BUILD_FILE"
  
  echo "✅ expo-facebook patched successfully"
else
  echo "❌ expo-facebook/android/build.gradle not found"
  exit 1
fi
