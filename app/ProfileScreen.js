// app/ProfileScreen.js
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

const PROFILE_OPTIONS = [
  {
    id: 'skin_goals',
    label: 'Skin Goals',
    iconText: 'SG',
    color: BRAND_COLORS.primary,
    action: 'navigate',
  },
  {
    id: 'language',
    label: 'Language',
    iconText: 'LG',
    color: '#4A90E2',
    action: 'navigate',
  },
  {
    id: 'skin_type',
    label: 'Skin Type',
    iconText: 'ST',
    color: '#9B59B6',
    action: 'navigate',
  },
  {
    id: 'terms',
    label: 'Terms and Conditions',
    iconText: 'TC',
    color: '#F39C12',
    action: 'external',
    url: 'https://mracne.pythonanywhere.com/terms',
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    iconText: 'PP',
    color: '#E74C3C',
    action: 'external',
    url: 'https://mracne.pythonanywhere.com/privacy',
  },
  {
    id: 'support',
    label: 'Support Email',
    iconText: 'SE',
    color: BRAND_COLORS.secondary,
    action: 'email',
    email: 'support@dracne.com',
  },
  {
    id: 'feature_request',
    label: 'Feature Request',
    iconText: 'FR',
    color: '#3498DB',
    action: 'email',
    email: 'feedback@dracne.com',
  },
  {
    id: 'delete_account',
    label: 'Delete Account',
    iconText: 'DA',
    color: '#95A5A6',
    action: 'delete',
  },
  {
    id: 'logout',
    label: 'Logout',
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
  onLogout,
}) {
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      if (name) {
        setUserName(name);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleOptionPress = async (option) => {
    switch (option.action) {
      case 'navigate':
        if (option.id === 'skin_goals' && onNavigateToSkinGoals) {
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
              Alert.alert('Error', `Cannot open URL: ${option.url}`);
            }
          } catch (error) {
            Alert.alert('Error', 'Unable to open link');
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
              Alert.alert('Error', 'Unable to open email client');
            }
          } catch (error) {
            Alert.alert('Error', 'Unable to send email');
          }
        }
        break;

      case 'delete':
        Alert.alert(
          'Delete Account',
          'Are you sure you want to delete your account? This action cannot be undone.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: async () => {
                try {
                  await AsyncStorage.clear();
                  Alert.alert('Account Deleted', 'Your account has been deleted successfully.');
                  if (onLogout) onLogout();
                } catch (error) {
                  Alert.alert('Error', 'Unable to delete account');
                }
              },
            },
          ]
        );
        break;

      case 'logout':
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Logout',
              onPress: async () => {
                try {
                  await AsyncStorage.removeItem('userSession');
                  if (onLogout) {
                    onLogout();
                  }
                } catch (error) {
                  Alert.alert('Error', 'Unable to logout');
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
          <Text style={styles.userSubtitle}>Your skincare journey</Text>
        </View>

        <View style={styles.optionsContainer}>
          {PROFILE_OPTIONS.map((option, index) => {
            const isLastItem = index === PROFILE_OPTIONS.length - 1;
            const isDanger = option.id === 'delete_account' || option.id === 'logout';

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
                  <Text style={[
                    styles.optionLabel,
                    isDanger && styles.optionLabelDanger
                  ]}>
                    {option.label}
                  </Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Dr.Acne v1.0.0</Text>
          <Text style={styles.versionSubtext}>AI-Powered Skincare Analysis</Text>
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
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: BRAND_COLORS.black,
    flex: 1,
  },
  optionLabelDanger: {
    color: BRAND_COLORS.secondary,
    fontWeight: '600',
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