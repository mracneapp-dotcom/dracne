// app/utils/routineUnlock.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// ==========================================
// 🔧 ROUTINE ACCESS CONTROL
// ==========================================
export const APPLE_REVIEW_MODE = true; // ⬅️ TOGGLE HERE FOR ENTIRE APP

// 📊 PROGRESSIVE UNLOCK SYSTEM
export const checkRoutineUnlockStatus = async () => {
  if (APPLE_REVIEW_MODE) {
    return { moderate: true, comprehensive: true }; // All unlocked for Apple
  }

  try {
    // Get install date
    let installDate = await AsyncStorage.getItem('appInstallDate');
    if (!installDate) {
      // First time - set install date
      installDate = new Date().toISOString();
      await AsyncStorage.setItem('appInstallDate', installDate);
    }

    // Calculate days since install
    const daysSinceInstall = Math.floor(
      (new Date() - new Date(installDate)) / (1000 * 60 * 60 * 24)
    );

    // Get routine completion count
    const routineCount = await AsyncStorage.getItem('routineLogCount');
    const completedRoutines = routineCount ? parseInt(routineCount) : 0;

    // Progressive unlock logic
    const moderateUnlocked = daysSinceInstall >= 7 || completedRoutines >= 5;
    const comprehensiveUnlocked = daysSinceInstall >= 14 || completedRoutines >= 10;

    console.log('📊 Unlock Status:', {
      daysSinceInstall,
      completedRoutines,
      moderateUnlocked,
      comprehensiveUnlocked
    });

    return {
      moderate: moderateUnlocked,
      comprehensive: comprehensiveUnlocked,
      stats: { daysSinceInstall, completedRoutines }
    };
  } catch (error) {
    console.error('Error checking unlock status:', error);
    return { moderate: false, comprehensive: false }; // Fail-safe: only basic
  }
};