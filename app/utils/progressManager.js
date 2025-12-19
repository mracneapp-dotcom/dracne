// utils/progressManager.js - WITH I18N SUPPORT
import AsyncStorage from '@react-native-async-storage/async-storage';

const PROGRESS_KEY = 'userProgress';

export const BADGE_DEFINITIONS = {
    firstScan: {
      id: 'firstScan',
      titleKey: 'badges.first_scan.title',           // ← ADDED
      descriptionKey: 'badges.first_scan.description', // ← ADDED
      title: 'First Scan',
      description: 'Complete your first skin analysis',
      image: require('../../assets/images/badge-first-scan.png'),
      color: '#4ECDC4',
      milestones: [1],
      trackProperty: 'totalScans'
    },
    skinScanner: {
      id: 'skinScanner',
      titleKey: 'badges.skin_scanner.title',           // ← ADDED
      descriptionKey: 'badges.skin_scanner.description', // ← ADDED
      title: 'Skin Scanner',
      description: 'Regular skin monitoring',
      image: require('../../assets/images/badge-skin-scanner.png'),
      color: '#9B6FE8',
      milestones: [3, 5, 10, 20, 50, 100],
      trackProperty: 'totalScans'
    },
    routineWarrior: {
      id: 'routineWarrior',
      titleKey: 'badges.routine_warrior.title',           // ← ADDED
      descriptionKey: 'badges.routine_warrior.description', // ← ADDED
      title: 'Routine Warrior',
      description: 'Build consistent habits',
      image: require('../../assets/images/badge-routine-warrior.png'),
      color: '#7CB342',
      milestones: [10, 25, 50, 100, 200, 500],
      trackProperty: 'totalRoutinesLogged'
    },
    perfectWeek: {
      id: 'perfectWeek',
      titleKey: 'badges.perfect_week.title',           // ← ADDED
      descriptionKey: 'badges.perfect_week.description', // ← ADDED
      title: 'Perfect Week',
      description: 'Complete 7 consecutive days',
      image: require('../../assets/images/badge-perfect-week.png'),
      color: '#FFB347',
      milestones: [1, 2, 4, 8, 12, 20],
      trackProperty: 'perfectWeeksCount'
    },
    glowUpTracker: {
      id: 'glowUpTracker',
      titleKey: 'badges.glow_up_tracker.title',           // ← ADDED
      descriptionKey: 'badges.glow_up_tracker.description', // ← ADDED
      title: 'Glow Up Tracker',
      description: 'Track your improvements',
      image: require('../../assets/images/badge-glow-up-tracker.png'),
      color: '#FF6B9D',
      milestones: [10, 25, 50, 75, 90],
      trackProperty: 'bestImprovement'
    }
  };

// Initialize progress data
export const initializeProgress = async () => {
  try {
    const existing = await AsyncStorage.getItem(PROGRESS_KEY);
    if (!existing) {
      const initialData = {
        stats: {
          totalRoutinesLogged: 0,
          totalScans: 0,
          currentStreak: 0,
          longestStreak: 0,
          bestImprovement: 0,
          perfectWeeksCount: 0,
          memberSince: new Date().toISOString(),
          lastRoutineDate: null,
          weeklyRoutineCount: 0,
          weekStartDate: getWeekStartDate(),
          currentWeekDays: [],
          consecutivePerfectWeeks: 0
        },
        badges: {},
        scanHistory: []
      };
      await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(existing);
  } catch (error) {
    console.error('Error initializing progress:', error);
    return null;
  }
};

// Get current progress
export const getProgress = async () => {
  try {
    const data = await AsyncStorage.getItem(PROGRESS_KEY);
    return data ? JSON.parse(data) : await initializeProgress();
  } catch (error) {
    console.error('Error getting progress:', error);
    return null;
  }
};

// Update progress stats
export const updateProgress = async (updates) => {
  try {
    const progress = await getProgress();
    const updatedProgress = {
      ...progress,
      stats: {
        ...progress.stats,
        ...updates
      }
    };
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(updatedProgress));
    return updatedProgress;
  } catch (error) {
    console.error('Error updating progress:', error);
    return null;
  }
};

// Helper: Get week start date (Monday)
function getWeekStartDate() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString();
}

// Helper: Check if new week started
function checkNewWeek(weekStartDate) {
  const weekStart = new Date(weekStartDate);
  const now = new Date();
  const daysSinceWeekStart = Math.floor((now - weekStart) / (1000 * 60 * 60 * 24));
  return daysSinceWeekStart >= 7;
}

// Helper: Get current day of week (0 = Monday, 6 = Sunday)
function getCurrentDayOfWeek() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
}

// Log a routine completion
export const logRoutine = async () => {
  try {
    const progress = await getProgress();
    const today = new Date().toDateString();
    const todayDay = getCurrentDayOfWeek();
    
    if (progress.stats.lastRoutineDate === today) {
      console.log('Routine already logged today');
      return progress;
    }
    
    let weeklyCount = progress.stats.weeklyRoutineCount;
    let weekStartDate = progress.stats.weekStartDate;
    let currentWeekDays = progress.stats.currentWeekDays || [];
    let perfectWeeksCount = progress.stats.perfectWeeksCount || 0;
    let consecutivePerfectWeeks = progress.stats.consecutivePerfectWeeks || 0;
    
    if (checkNewWeek(weekStartDate)) {
      if (currentWeekDays.length === 7) {
        perfectWeeksCount += 1;
        consecutivePerfectWeeks += 1;
      } else {
        consecutivePerfectWeeks = 0;
      }
      
      weeklyCount = 1;
      weekStartDate = getWeekStartDate();
      currentWeekDays = [todayDay];
    } else {
      weeklyCount += 1;
      if (!currentWeekDays.includes(todayDay)) {
        currentWeekDays.push(todayDay);
      }
    }
    
    const updates = {
      totalRoutinesLogged: progress.stats.totalRoutinesLogged + 1,
      lastRoutineDate: today,
      weeklyRoutineCount: weeklyCount,
      weekStartDate: weekStartDate,
      currentWeekDays: currentWeekDays,
      perfectWeeksCount: perfectWeeksCount,
      consecutivePerfectWeeks: consecutivePerfectWeeks
    };
    
    const updatedProgress = await updateProgress(updates);
    const newBadges = await checkBadgeUnlocks(updatedProgress);
    
    return { progress: updatedProgress, newBadges };
  } catch (error) {
    console.error('Error logging routine:', error);
    return null;
  }
};

// Log a skin scan
export const logSkinScan = async (detections) => {
  try {
    const progress = await getProgress();
    
    let improvement = 0;
    let improvementPercent = 0;
    if (progress.scanHistory.length > 0) {
      const lastScan = progress.scanHistory[progress.scanHistory.length - 1];
      improvement = lastScan.detections - detections;
      improvementPercent = Math.round((improvement / lastScan.detections) * 100);
    }
    
    const newScan = {
      date: new Date().toISOString(),
      detections: detections,
      improvement: improvementPercent
    };
    
    const updates = {
      totalScans: progress.stats.totalScans + 1,
      bestImprovement: Math.max(progress.stats.bestImprovement || 0, Math.abs(improvementPercent))
    };
    
    const updatedProgress = {
      ...progress,
      stats: {
        ...progress.stats,
        ...updates
      },
      scanHistory: [...progress.scanHistory, newScan]
    };
    
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(updatedProgress));
    const newBadges = await checkBadgeUnlocks(updatedProgress);
    
    return { progress: updatedProgress, newBadges, improvement: improvementPercent };
  } catch (error) {
    console.error('Error logging scan:', error);
    return null;
  }
};

// Check for badge unlocks
export const checkBadgeUnlocks = async (progress) => {
  try {
    const newlyUnlocked = [];
    
    for (const [badgeId, definition] of Object.entries(BADGE_DEFINITIONS)) {
      const currentValue = progress.stats[definition.trackProperty];
      const badgeData = progress.badges[badgeId] || {
        currentLevel: 0,
        unlockedMilestones: []
      };
      
      for (const milestone of definition.milestones) {
        const alreadyUnlocked = badgeData.unlockedMilestones.some(
          m => m.milestone === milestone
        );
        
        if (!alreadyUnlocked && currentValue >= milestone) {
          badgeData.unlockedMilestones.push({
            milestone: milestone,
            unlockedDate: new Date().toISOString()
          });
          badgeData.currentLevel = milestone;
          
          newlyUnlocked.push({
            badgeId: badgeId,
            milestone: milestone,
            definition: definition
          });
        }
      }
      
      progress.badges[badgeId] = badgeData;
    }
    
    if (newlyUnlocked.length > 0) {
      await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    }
    
    return newlyUnlocked;
  } catch (error) {
    console.error('Error checking badge unlocks:', error);
    return [];
  }
};

// Get latest 3 badges
export const getLatestBadges = async () => {
  try {
    const progress = await getProgress();
    const allUnlocked = [];
    
    for (const [badgeId, badgeData] of Object.entries(progress.badges)) {
      if (badgeData.unlockedMilestones && badgeData.unlockedMilestones.length > 0) {
        const latest = badgeData.unlockedMilestones[badgeData.unlockedMilestones.length - 1];
        allUnlocked.push({
          badgeId: badgeId,
          milestone: latest.milestone,
          unlockedDate: latest.unlockedDate,
          definition: BADGE_DEFINITIONS[badgeId]
        });
      }
    }
    
    allUnlocked.sort((a, b) => new Date(b.unlockedDate) - new Date(a.unlockedDate));
    return allUnlocked.slice(0, 3);
  } catch (error) {
    console.error('Error getting latest badges:', error);
    return [];
  }
};

// Get all badges with progress
export const getAllBadges = async () => {
  try {
    const progress = await getProgress();
    const allBadges = [];
    
    for (const [badgeId, definition] of Object.entries(BADGE_DEFINITIONS)) {
      const badgeData = progress.badges[badgeId] || {
        currentLevel: 0,
        unlockedMilestones: []
      };
      
      const currentValue = progress.stats[definition.trackProperty] || 0;
      const nextMilestone = definition.milestones.find(m => m > badgeData.currentLevel);
      const progressToNext = nextMilestone 
        ? Math.min((currentValue / nextMilestone) * 100, 100)
        : 100;
      
      allBadges.push({
        badgeId: badgeId,
        definition: definition,
        currentLevel: badgeData.currentLevel,
        currentValue: currentValue,
        nextMilestone: nextMilestone,
        progressToNext: progressToNext,
        unlockedMilestones: badgeData.unlockedMilestones || [],
        isMaxed: !nextMilestone
      });
    }
    
    allBadges.sort((a, b) => {
      if (a.currentLevel > 0 && b.currentLevel === 0) return -1;
      if (a.currentLevel === 0 && b.currentLevel > 0) return 1;
      return b.progressToNext - a.progressToNext;
    });
    
    return allBadges;
  } catch (error) {
    console.error('Error getting all badges:', error);
    return [];
  }
};

// Get weekly stats summary
export const getWeeklyStats = async () => {
  try {
    const progress = await getProgress();
    return {
      routinesThisWeek: progress.stats.weeklyRoutineCount || 0,
      totalScans: progress.stats.totalScans || 0,
      currentStreak: progress.stats.currentStreak || 0,
      perfectWeeks: progress.stats.perfectWeeksCount || 0,
      bestImprovement: progress.stats.bestImprovement || 0
    };
  } catch (error) {
    console.error('Error getting weekly stats:', error);
    return {
      routinesThisWeek: 0,
      totalScans: 0,
      currentStreak: 0,
      perfectWeeks: 0,
      bestImprovement: 0
    };
  }
};

// Reset progress (for testing)
export const resetProgress = async () => {
  try {
    await AsyncStorage.removeItem(PROGRESS_KEY);
    return await initializeProgress();
  } catch (error) {
    console.error('Error resetting progress:', error);
    return null;
  }
};