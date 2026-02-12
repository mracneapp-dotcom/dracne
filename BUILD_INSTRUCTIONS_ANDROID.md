# DrAcne Android Build Instructions

## Prerequisites
- Keystore info in `ANDROID_KEYSTORE_INFO.txt`
- Version code incremented in `android/app/build.gradle`

## Build Steps

### 1. Update Version Code
```bash
nano ~/Desktop/DrAcne/android/app/build.gradle
# Change versionCode to next number (currently 9)
```

### 2. Build AAB
```bash
cd ~/Desktop/DrAcne/android
./gradlew clean
./gradlew bundleRelease
```

### 3. Verify Build
```bash
ls -lh ~/Desktop/DrAcne/android/app/build/outputs/bundle/release/app-release.aab
```

### 4. Upload to Play Console
1. https://play.google.com/console/
2. DrAcne → Test and release → Internal testing
3. Create new release
4. Upload app-release.aab
5. Submit

## Troubleshooting

### "Signing key error"
- Check `ANDROID_KEYSTORE_INFO.txt` for credentials
- Verify upload-keystore.jks exists in android/app/

### "Version code must be higher"
- Increment versionCode in build.gradle

### "Splash screen missing"
- Check app.json has android.splash.image configured
