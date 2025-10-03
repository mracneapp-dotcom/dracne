// services/StorageManager.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageManager {
  static async getUsesLeft() {
    try {
      const uses = await AsyncStorage.getItem('mrAcneUses');
      return uses ? parseInt(uses, 10) : 3; // Default 3 free trials
    } catch (error) {
      console.error('Error getting uses:', error);
      return 3;
    }
  }

  static async decrementUses() {
    try {
      const currentUses = await this.getUsesLeft();
      const newUses = Math.max(0, currentUses - 1);
      await AsyncStorage.setItem('mrAcneUses', newUses.toString());
      return newUses;
    } catch (error) {
      console.error('Error decrementing uses:', error);
      return 0;
    }
  }

  static async saveSkinProfile(profile) {
    try {
      await AsyncStorage.setItem('mrAcneSkinProfile', JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  }

  static async getSkinProfile() {
    try {
      const profile = await AsyncStorage.getItem('mrAcneSkinProfile');
      return profile ? JSON.parse(profile) : null;
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  }
}