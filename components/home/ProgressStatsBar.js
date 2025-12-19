// components/home/ProgressStatsBar.js - WITH SPANISH I18N
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { t } from '../../app/i18n';
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

  const routinesLabel = stats.weeklyRoutines === 1 
    ? t('home.stats.routine') 
    : t('home.stats.routines');
  
  const scansLabel = stats.totalScans === 1 
    ? t('home.stats.scan') 
    : t('home.stats.scans');

  return (
    <View style={styles.container}>
      <Text style={styles.statsText}>
        {t('home.stats.this_week')} <Text style={styles.statsBold}>{stats.weeklyRoutines} {routinesLabel}</Text> | <Text style={styles.statsBold}>{stats.totalScans} {scansLabel}</Text>
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