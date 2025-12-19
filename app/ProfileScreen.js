// app/ProfileScreen.js - WITH SPANISH I18N (COMPLETE)
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { t } from './i18n';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#999999',
  darkGray: '#666666',
  lightGray: '#E5E5E5',
};

const SKIN_TYPE_LABELS = {
  oily: 'profile.skin_labels.oily',
  dry: 'profile.skin_labels.dry',
  combination: 'profile.skin_labels.combination',
  normal: 'profile.skin_labels.normal',
  sensitive: 'profile.skin_labels.sensitive',
  unknown: 'profile.skin_labels.unknown',
};

const SKIN_TYPE_COLORS = {
  oily: '#4A90E2',
  dry: '#F39C12',
  combination: BRAND_COLORS.primary,
  normal: '#9B59B6',
  sensitive: BRAND_COLORS.secondary,
  unknown: '#757575',
};

const PROFILE_OPTIONS = [
  {
    id: 'achievements',
    label: 'profile.options.achievements',
    iconText: 'AC',
    color: '#FFD700',
    action: 'navigate',
  },
  {
    id: 'skin_goals',
    label: 'profile.options.skin_goals',
    iconText: 'SG',
    color: BRAND_COLORS.primary,
    action: 'navigate',
  },
  {
    id: 'language',
    label: 'profile.options.language',
    iconText: 'LG',
    color: '#4A90E2',
    action: 'navigate',
  },
  {
    id: 'skin_type',
    label: 'profile.options.skin_type',
    iconText: 'ST',
    color: '#9B59B6',
    action: 'navigate',
  },
  {
    id: 'terms',
    label: 'profile.options.terms',
    iconText: 'TC',
    color: '#F39C12',
    action: 'external',
    url: 'https://mracne.pythonanywhere.com/terms',
  },
  {
    id: 'privacy',
    label: 'profile.options.privacy',
    iconText: 'PP',
    color: '#E74C3C',
    action: 'external',
    url: 'https://mracne.pythonanywhere.com/privacy',
  },
  {
    id: 'support',
    label: 'profile.options.support',
    iconText: 'SE',
    color: BRAND_COLORS.secondary,
    action: 'email',
    email: 'hello@dracne.pro',
  },
  {
    id: 'feature_request',
    label: 'profile.options.feature_request',
    iconText: 'FR',
    color: '#3498DB',
    action: 'email',
    email: 'hello@dracne.pro ',
  },
  {
    id: 'delete_account',
    label: 'profile.options.delete_account',
    iconText: 'DA',
    color: '#95A5A6',
    action: 'delete',
  },
  {
    id: 'logout',
    label: 'profile.options.logout',
    iconText: 'LO',
    color: '#666666',
    action: 'logout',
  },
];

export default function ProfileScreen({ 
  onNavigateHome,
  onNavigateToSkinGoals,
  onNavigateToLanguage,
  onNavigateToSkinType,
  onNavigateToEditName,
  onNavigateToAchievements,
  onLogout,
}) {
  const [userName, setUserName] = useState('User');
  const [skinType, setSkinType] = useState('normal');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      const savedSkinType = await AsyncStorage.getItem('userSkinType');
      
      if (name) {
        setUserName(name);
      }
      if (savedSkinType) {
        setSkinType(savedSkinType);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleOptionPress = async (option) => {
    switch (option.action) {
      case 'navigate':
        if (option.id === 'achievements' && onNavigateToAchievements) {
          onNavigateToAchievements();
        } else if (option.id === 'skin_goals' && onNavigateToSkinGoals) {
          onNavigateToSkinGoals();
        } else if (option.id === 'language' && onNavigateToLanguage) {
          onNavigateToLanguage();
        } else if (option.id === 'skin_type' && onNavigateToSkinType) {
          onNavigateToSkinType();
        }
        break;

      case 'external':
        if (option.url) {
          try {
            const supported = await Linking.canOpenURL(option.url);
            if (supported) {
              await Linking.openURL(option.url);
            } else {
              Alert.alert(t('profile.alert_link_error'), `Cannot open URL: ${option.url}`);
            }
          } catch (error) {
            Alert.alert(t('profile.alert_link_error'), t('profile.alert_link_error'));
          }
        }
        break;

      case 'email':
        if (option.email) {
          const subject = option.id === 'support' ? 'Support Request' : 'Feature Request';
          const url = `mailto:${option.email}?subject=${encodeURIComponent(subject)}`;
          try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
              await Linking.openURL(url);
            } else {
              Alert.alert(t('profile.alert_email_error'), t('profile.alert_email_error'));
            }
          } catch (error) {
            Alert.alert(t('profile.alert_email_error'), t('profile.alert_email_error'));
          }
        }
        break;

      case 'delete':
        Alert.alert(
          t('profile.alert_delete_title'),
          t('profile.alert_delete_message'),
          [
            {
              text: t('profile.alert_cancel'),
              style: 'cancel',
            },
            {
              text: t('profile.alert_delete'),
              style: 'destructive',
              onPress: async () => {
                try {
                  await AsyncStorage.clear();
                  Alert.alert(t('profile.alert_delete_success'), t('profile.alert_delete_success_message'));
                  if (onLogout) onLogout();
                } catch (error) {
                  Alert.alert(t('profile.alert_delete_error'), t('profile.alert_delete_error'));
                }
              },
            },
          ]
        );
        break;

      case 'logout':
        Alert.alert(
          t('profile.alert_logout_title'),
          t('profile.alert_logout_message'),
          [
            {
              text: t('profile.alert_cancel'),
              style: 'cancel',
            },
            {
              text: t('profile.alert_logout'),
              onPress: async () => {
                try {
                  await AsyncStorage.removeItem('userSession');
                  if (onLogout) {
                    onLogout();
                  }
                } catch (error) {
                  Alert.alert(t('profile.alert_logout_error'), t('profile.alert_logout_error'));
                }
              },
            },
          ]
        );
        break;

      default:
        console.log(`Action not implemented for ${option.id}`);
    }
  };

  const skinTypeLabel = t(SKIN_TYPE_LABELS[skinType] || SKIN_TYPE_LABELS.normal);
  const skinTypeColor = SKIN_TYPE_COLORS[skinType] || '#9B59B6';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topNavigation}>
          <TouchableOpacity onPress={onNavigateHome} style={styles.logoButton}>
            <Image 
              source={require('../assets/images/dracne-logo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.bannerContainer}>
          <Image 
            source={require('../assets/images/Banner Calendar.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.userName}>{userName}</Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={onNavigateToEditName}
              activeOpacity={0.7}
            >
              <Image
                source={require('../assets/images/Pen.png')}
                style={styles.penIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.userSubtitle}>{t('profile.journey')}</Text>
          
          {/* Current Skin Type Display */}
          <View style={[styles.skinTypeBadge, { backgroundColor: `${skinTypeColor}15` }]}>
            <Text style={[styles.skinTypeBadgeText, { color: skinTypeColor }]}>
            {t('profile.skin_prefix')} {skinTypeLabel}
            </Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          {PROFILE_OPTIONS.map((option, index) => {
            const isLastItem = index === PROFILE_OPTIONS.length - 1;
            const isDanger = option.id === 'delete_account' || option.id === 'logout';
            const isSkinType = option.id === 'skin_type';

            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionCard,
                  isLastItem && styles.optionCardLast,
                  isDanger && styles.optionCardDanger,
                ]}
                onPress={() => handleOptionPress(option)}
                activeOpacity={0.7}
              >
                <View style={styles.optionContent}>
                  <View style={[
                    styles.iconContainer,
                    { backgroundColor: `${option.color}15` }
                  ]}>
                    <Text style={[styles.optionIcon, { color: option.color }]}>{option.iconText}</Text>
                  </View>
                  <View style={styles.optionTextContainer}>
                    <Text style={[
                      styles.optionLabel,
                      isDanger && styles.optionLabelDanger
                    ]}>
                      {t(option.label)}
                    </Text>
                    {isSkinType && (
                      <Text style={styles.optionSubtext}>
                        {t('profile.options.currently', { skinType: skinTypeLabel })}
                      </Text>
                    )}
                  </View>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>{t('profile.version')}</Text>
          <Text style={styles.versionSubtext}>{t('profile.version_sub')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  topNavigation: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: 'transparent',
  },
  logoButton: {
    alignSelf: 'flex-start',
  },
  logoImage: {
    width: 80,
    height: 50,
  },
  bannerContainer: {
    width: '100%',
    height: 120,
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: BRAND_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: BRAND_COLORS.white,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: BRAND_COLORS.black,
  },
  editButton: {
    marginLeft: 8,
    padding: 4,
  },
  penIcon: {
    width: 20,
    height: 20,
    tintColor: BRAND_COLORS.primary,
  },
  userSubtitle: {
    fontSize: 14,
    color: BRAND_COLORS.gray,
    marginBottom: 12,
  },
  skinTypeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 4,
  },
  skinTypeBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  optionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  optionCardLast: {
    marginBottom: 0,
  },
  optionCardDanger: {
    borderWidth: 1,
    borderColor: `${BRAND_COLORS.secondary}30`,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  optionIcon: {
    fontSize: 14,
    fontWeight: '700',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: BRAND_COLORS.black,
  },
  optionLabelDanger: {
    color: BRAND_COLORS.secondary,
    fontWeight: '600',
  },
  optionSubtext: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    fontWeight: '600',
    color: BRAND_COLORS.gray,
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  versionText: {
    fontSize: 13,
    fontWeight: '600',
    color: BRAND_COLORS.gray,
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 11,
    color: BRAND_COLORS.gray,
  },
});