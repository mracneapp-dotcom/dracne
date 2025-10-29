// components/home/BadgeDisplay.js - UPDATED COMPACT LAYOUT
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getLatestBadges } from '../../app/utils/progressManager';
import { BadgeCard } from '../badges/BadgeCard';

const BRAND_COLORS = {
  primary: '#7CB342',
  white: '#FFFFFF',
  black: '#000000',
};

export const BadgeDisplay = ({ onViewAllPress, onBadgePress }) => {
  const [latestBadges, setLatestBadges] = useState([]);

  useEffect(() => {
    loadLatestBadges();
  }, []);

  const loadLatestBadges = async () => {
    const badges = await getLatestBadges();
    setLatestBadges(badges);
  };

  React.useImperativeHandle(React.useRef(), () => ({
    refresh: loadLatestBadges
  }));

  const displayBadges = [...latestBadges];
  while (displayBadges.length < 3) {
    displayBadges.push(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Latest Badges:</Text>
      
      <View style={styles.badgesRow}>
        {displayBadges.map((badge, index) => (
          <BadgeCard
            key={badge?.badgeId || `empty-${index}`}
            badge={badge}
            onPress={() => badge && onBadgePress && onBadgePress(badge)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.viewAllButton}
        onPress={onViewAllPress}
        activeOpacity={0.7}
      >
        <View style={styles.plusCircle}>
          <Text style={styles.plusText}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 8,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: BRAND_COLORS.primary,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  viewAllButton: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  plusCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: BRAND_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  plusText: {
    fontSize: 22,
    fontWeight: '700',
    color: BRAND_COLORS.white,
  },
});