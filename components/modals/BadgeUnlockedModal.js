// components/modals/BadgeUnlockedModal.js
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const BRAND_COLORS = {
  primary: '#7CB342',
  white: '#FFFFFF',
  black: '#000000',
  cream: '#FDF5E6',
};

export const BadgeUnlockedModal = ({ visible, badge, onClose }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(glowAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: false,
            }),
            Animated.timing(glowAnim, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: false,
            }),
          ])
        ),
      ]).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  if (!badge) return null;

  const glowColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [`${badge.definition.color}33`, `${badge.definition.color}99`],
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text style={styles.title}>Badge Unlocked!</Text>

          <Animated.View
            style={[
              styles.badgeGlow,
              { backgroundColor: glowColor },
            ]}
          />

          <View style={[styles.badgeCircle, { borderColor: badge.definition.color }]}>
            <Image
              source={badge.definition.image}
              style={styles.badgeImage}
              resizeMode="contain"
            />
            <View style={[styles.levelBadge, { backgroundColor: badge.definition.color }]}>
              <Text style={styles.levelText}>{badge.milestone}</Text>
            </View>
          </View>

          <Text style={styles.badgeName}>{badge.definition.title}</Text>
          <Text style={styles.badgeDescription}>
            {badge.definition.description}
          </Text>
          <Text style={styles.milestoneText}>
            Milestone: {badge.milestone}
          </Text>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.closeButtonText}>Awesome!</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '85%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 24,
  },
  badgeGlow: {
    position: 'absolute',
    top: '35%',
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  badgeCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  badgeImage: {
    width: 60,
    height: 60,
  },
  levelBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: BRAND_COLORS.white,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '700',
    color: BRAND_COLORS.white,
  },
  badgeName: {
    fontSize: 20,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 8,
  },
  badgeDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  milestoneText: {
    fontSize: 13,
    fontWeight: '600',
    color: BRAND_COLORS.primary,
    marginBottom: 24,
  },
  closeButton: {
    backgroundColor: BRAND_COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.white,
  },
});