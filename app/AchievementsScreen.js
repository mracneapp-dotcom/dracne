// app/AchievementsScreen.js - WITH SPANISH I18N + BADGE TITLES (COMPLETE)
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { t } from './i18n';
import { getAllBadges } from './utils/progressManager';

const BRAND_COLORS = {
  primary: '#57A84A',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#999999',
  lightGray: '#E5E5E5',
};

export default function AchievementsScreen({ onBack, onNavigateHome }) {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBadges();
  }, []);

  const loadBadges = async () => {
    try {
      const allBadges = await getAllBadges();
      setBadges(allBadges);
    } catch (error) {
      console.error('Error loading badges:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderBadge = (badge, index) => {
    const isUnlocked = badge.currentLevel > 0;
    const hasNextMilestone = badge.nextMilestone !== undefined;

    // GET TRANSLATED BADGE TITLE
    const badgeTitle = badge?.definition?.titleKey 
      ? t(badge.definition.titleKey) 
      : badge?.definition?.title || t('achievements.locked');

    return (
      <View key={badge.badgeId} style={styles.badgeCard}>
        <View style={[
          styles.badgeImageContainer,
          !isUnlocked && styles.badgeImageContainerLocked
        ]}>
          <Image
            source={badge.definition.image}
            style={[
              styles.badgeImage,
              !isUnlocked && styles.badgeImageLocked
            ]}
            resizeMode="contain"
          />
          {!isUnlocked && (
            <View style={styles.lockOverlay}>
              <Text style={styles.lockText}>{t('achievements.locked')}</Text>
            </View>
          )}
        </View>

        {isUnlocked && (
          <View style={[
            styles.levelBadge,
            { backgroundColor: badge.definition.color }
          ]}>
            <Text style={styles.levelText}>{badge.currentLevel}</Text>
          </View>
        )}

        <Text style={styles.badgeTitle} numberOfLines={2}>
          {badgeTitle}
        </Text>

        {!isUnlocked && hasNextMilestone && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${badge.progressToNext}%`,
                    backgroundColor: badge.definition.color 
                  }
                ]}
              />
            </View>
          </View>
        )}
      </View>
    );
  };

  const unlockedCount = badges.filter(b => b.currentLevel > 0).length;
  const totalCount = badges.length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topNavigation}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>{t('achievements.back')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNavigateHome} style={styles.logoButton}>
          <Image 
            source={require('../assets/images/dracne-logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            {t('achievements.title')} <Text style={styles.titleHighlight}>{t('achievements.title_highlight')}</Text>
          </Text>
          <Text style={styles.subtitle}>
            {t('achievements.subtitle', { unlocked: unlockedCount, total: totalCount })}
          </Text>
        </View>

        {loading ? (
          <Text style={styles.loadingText}>{t('achievements.loading')}</Text>
        ) : (
          <View style={styles.badgesGrid}>
            {badges.map((badge, index) => renderBadge(badge, index))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 18,
    fontWeight: '600',
    color: BRAND_COLORS.primary,
  },
  logoButton: {
    padding: 8,
  },
  logoImage: {
    width: 70,
    height: 45,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 34,
  },
  titleHighlight: {
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: BRAND_COLORS.gray,
    marginTop: 40,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '48%',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  badgeImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  badgeImageContainerLocked: {
    opacity: 0.4,
  },
  badgeImage: {
    width: 80,
    height: 80,
  },
  badgeImageLocked: {
    opacity: 0.3,
  },
  lockOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 50,
  },
  lockText: {
    fontSize: 12,
    fontWeight: '600',
    color: BRAND_COLORS.gray,
  },
  levelBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelText: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.white,
  },
  badgeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 8,
  },
  progressContainer: {
    width: '100%',
    marginTop: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: BRAND_COLORS.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});