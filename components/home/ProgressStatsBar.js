// components/home/ProgressStatsBar.js - UPDATED COLOR
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getWeeklyStats } from '../../app/utils/progressManager';

const BRAND_COLORS = {
  subtleGreen: '#EDF3E9',
  black: '#000000',
  gray: '#666666',
};

export const ProgressStatsBar = () => {
  const [stats, setStats] = useState({
    weeklyRoutines: 0,
    totalScans: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const weeklyStats = await getWeeklyStats();
    if (weeklyStats) {
      setStats({
        weeklyRoutines: weeklyStats.routinesThisWeek,
        totalScans: weeklyStats.totalScans
      });
    }
  };

  React.useImperativeHandle(React.useRef(), () => ({
    refresh: loadStats
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.statsText}>
        This Week: <Text style={styles.statsBold}>{stats.weeklyRoutines} routines</Text> | <Text style={styles.statsBold}>{stats.totalScans} scans</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BRAND_COLORS.subtleGreen,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginRight: 20,
    flex: 1,
  },
  statsText: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    fontWeight: '500',
  },
  statsBold: {
    fontWeight: '700',
    color: BRAND_COLORS.black,
  },
});