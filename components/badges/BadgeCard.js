// components/badges/BadgeCard.js - WITH SPANISH I18N
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { t } from '../../app/i18n';

const BRAND_COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  gray: '#999999',
};

export const BadgeCard = ({ badge, onPress, size = 'normal' }) => {
  const isLocked = !badge || badge.milestone === 0;
  
  const circleSize = size === 'small' ? 50 : 60;
  const imageSize = size === 'small' ? 32 : 40;
  const levelSize = size === 'small' ? 20 : 24;
  const fontSize = size === 'small' ? 11 : 12;

  // Get translated badge title
  const badgeTitle = badge?.definition?.titleKey 
    ? t(badge.definition.titleKey) 
    : badge?.definition?.title || t('home.badges.locked');

  return (
    <TouchableOpacity
      style={[styles.container, size === 'small' && styles.containerSmall]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isLocked}
    >
      <View style={[
        styles.badgeCircle,
        { 
          width: circleSize, 
          height: circleSize, 
          borderRadius: circleSize / 2,
          borderColor: isLocked ? BRAND_COLORS.gray : badge.definition.color 
        },
        isLocked && styles.lockedBadge
      ]}>
        <Image
          source={badge?.definition.image}
          style={[
            styles.badgeImage,
            { width: imageSize, height: imageSize },
            isLocked && styles.lockedImage
          ]}
          resizeMode="contain"
        />
        {!isLocked && (
          <View style={[
            styles.levelBadge, 
            { 
              backgroundColor: badge.definition.color,
              width: levelSize,
              height: levelSize,
              borderRadius: levelSize / 2
            }
          ]}>
            <Text style={[styles.levelText, { fontSize: size === 'small' ? 10 : 11 }]}>
              {badge.milestone}
            </Text>
          </View>
        )}
      </View>
      <Text style={[
        styles.badgeLabel, 
        { fontSize },
        isLocked && styles.lockedLabel
      ]} numberOfLines={2}>
        {badgeTitle}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 90,
  },
  containerSmall: {
    width: 70,
  },
  badgeCircle: {
    borderWidth: 2,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  lockedBadge: {
    opacity: 0.3,
    borderStyle: 'dashed',
  },
  badgeImage: {
    width: 40,
    height: 40,
  },
  lockedImage: {
    opacity: 0.3,
  },
  levelBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: BRAND_COLORS.white,
  },
  levelText: {
    fontSize: 11,
    fontWeight: '700',
    color: BRAND_COLORS.white,
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: BRAND_COLORS.black,
    textAlign: 'center',
  },
  lockedLabel: {
    color: BRAND_COLORS.gray,
  },
});