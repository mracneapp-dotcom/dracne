// app/utils/userProfile.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRoutinesForSkinType, getSpecificRoutine } from '../../constants/routinesData';

const STORAGE_KEYS = {
  SKIN_TYPE: 'userSkinType',
  ROUTINE_LEVEL: 'selectedRoutineLevel',
  USER_PROFILE: 'userProfile',
};

/**
 * User Profile Manager
 * Simple utility for managing user skincare data
 */
export const UserProfile = {
  /**
   * Get the user's skin type
   * @returns {Promise<string>} - 'oily', 'dry', 'combination', 'normal', or 'sensitive'
   */
  getSkinType: async () => {
    try {
      const skinType = await AsyncStorage.getItem(STORAGE_KEYS.SKIN_TYPE);
      return skinType || 'normal';
    } catch (error) {
      console.error('Error getting skin type:', error);
      return 'normal';
    }
  },

  /**
   * Save the user's skin type
   * @param {string} skinType - The skin type to save
   */
  setSkinType: async (skinType) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SKIN_TYPE, skinType);
      console.log('✅ Skin type saved:', skinType);
    } catch (error) {
      console.error('Error saving skin type:', error);
    }
  },

  /**
   * Get the user's selected routine level
   * @returns {Promise<string>} - 'basic', 'moderate', or 'comprehensive'
   */
  getRoutineLevel: async () => {
    try {
      const level = await AsyncStorage.getItem(STORAGE_KEYS.ROUTINE_LEVEL);
      return level || 'moderate';
    } catch (error) {
      console.error('Error getting routine level:', error);
      return 'moderate';
    }
  },

  /**
   * Save the user's routine level
   * @param {string} level - The routine level to save
   */
  setRoutineLevel: async (level) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ROUTINE_LEVEL, level);
      console.log('✅ Routine level saved:', level);
    } catch (error) {
      console.error('Error saving routine level:', error);
    }
  },

  /**
   * Get the user's complete profile
   * @returns {Promise<object>} - Complete user profile
   */
  getProfile: async () => {
    try {
      const skinType = await UserProfile.getSkinType();
      const routineLevel = await UserProfile.getRoutineLevel();
      const routineData = getRoutinesForSkinType(skinType);
      const selectedRoutine = getSpecificRoutine(skinType, routineLevel);

      return {
        skinType,
        routineLevel,
        routineData,
        selectedRoutine,
      };
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  },

  /**
   * Get the user's current routine with full details
   * @returns {Promise<object>} - Current routine details
   */
  getCurrentRoutine: async () => {
    try {
      const skinType = await UserProfile.getSkinType();
      const routineLevel = await UserProfile.getRoutineLevel();
      return getSpecificRoutine(skinType, routineLevel);
    } catch (error) {
      console.error('Error getting current routine:', error);
      return null;
    }
  },

  /**
   * Clear all user data
   */
  clearProfile: async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.SKIN_TYPE,
        STORAGE_KEYS.ROUTINE_LEVEL,
        STORAGE_KEYS.USER_PROFILE,
      ]);
      console.log('✅ Profile cleared');
    } catch (error) {
      console.error('Error clearing profile:', error);
    }
  },

  /**
   * Save complete profile (useful for onboarding completion)
   * @param {object} profileData - Complete profile data
   */
  saveCompleteProfile: async (profileData) => {
    try {
      const {
        skinType,
        routineLevel,
        additionalData = {}
      } = profileData;

      await AsyncStorage.multiSet([
        [STORAGE_KEYS.SKIN_TYPE, skinType],
        [STORAGE_KEYS.ROUTINE_LEVEL, routineLevel],
        [STORAGE_KEYS.USER_PROFILE, JSON.stringify({
          skinType,
          routineLevel,
          ...additionalData,
          savedAt: new Date().toISOString(),
        })],
      ]);

      console.log('✅ Complete profile saved');
    } catch (error) {
      console.error('Error saving complete profile:', error);
    }
  },

  /**
   * Check if user has completed onboarding
   * @returns {Promise<boolean>}
   */
  hasCompletedOnboarding: async () => {
    try {
      const skinType = await AsyncStorage.getItem(STORAGE_KEYS.SKIN_TYPE);
      return skinType !== null;
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return false;
    }
  },
};

/**
 * React Hook for using user profile in components
 * Usage: const { skinType, routineLevel, routine } = useUserProfile();
 */
export const useUserProfile = () => {
  const [profile, setProfile] = React.useState({
    skinType: 'normal',
    routineLevel: 'moderate',
    routine: null,
    loading: true,
  });

  React.useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const profileData = await UserProfile.getProfile();
    setProfile({
      ...profileData,
      loading: false,
    });
  };

  const updateSkinType = async (skinType) => {
    await UserProfile.setSkinType(skinType);
    loadProfile();
  };

  const updateRoutineLevel = async (level) => {
    await UserProfile.setRoutineLevel(level);
    loadProfile();
  };

  return {
    ...profile,
    updateSkinType,
    updateRoutineLevel,
    refresh: loadProfile,
  };
};

export default UserProfile;