// app/EditSkinTypeScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { DrAcneButton } from '../components/ui/DrAcneButton';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#999999',
  lightGray: '#E5E5E5',
};

const SKIN_TYPES = [
  {
    id: 'oily',
    label: 'Oily',
    description: 'Shiny throughout the day',
    icon: require('../assets/images/check.png'),
    color: '#4A90E2',
  },
  {
    id: 'dry',
    label: 'Dry',
    description: 'Tight, flaky, or rough',
    icon: require('../assets/images/check.png'),
    color: '#F39C12',
  },
  {
    id: 'combination',
    label: 'Combination',
    description: 'Oily T-zone, dry cheeks',
    icon: require('../assets/images/check.png'),
    color: BRAND_COLORS.primary,
  },
  {
    id: 'normal',
    label: 'Normal',
    description: 'Balanced, not too oily or dry',
    icon: require('../assets/images/check.png'),
    color: '#9B59B6',
  },
  {
    id: 'sensitive',
    label: 'Sensitive',
    description: 'Easily irritated or red',
    icon: require('../assets/images/check.png'),
    color: BRAND_COLORS.secondary,
  },
];

export default function EditSkinTypeScreen({ onBack, onNavigateHome, onNavigateToSkinTest }) {
  const [selectedType, setSelectedType] = useState(null);
  const [initialType, setInitialType] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadCurrentSkinType();
  }, []);

  const loadCurrentSkinType = async () => {
    try {
      const savedSkinType = await AsyncStorage.getItem('userSkinType');
      if (savedSkinType) {
        setSelectedType(savedSkinType);
        setInitialType(savedSkinType);
      } else {
        // Default to normal if not set
        setSelectedType('normal');
        setInitialType('normal');
      }
    } catch (error) {
      console.error('Error loading skin type:', error);
    }
  };

  const handleSelectType = (typeId) => {
    setSelectedType(typeId);
    setHasChanges(typeId !== initialType);
  };

  const handleSave = async () => {
    if (!selectedType) {
      Alert.alert('Error', 'Please select a skin type');
      return;
    }

    try {
      await AsyncStorage.setItem('userSkinType', selectedType);
      
      const selectedSkinType = SKIN_TYPES.find(type => type.id === selectedType);
      
      Alert.alert(
        'Skin Type Updated',
        `Your skin type has been updated to ${selectedSkinType?.label}. Your routines will be personalized accordingly.`,
        [
          {
            text: 'OK',
            onPress: () => {
              if (onBack) onBack();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Unable to save your skin type. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNavigation}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
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
            Your <Text style={styles.titleHighlight}>Skin Type</Text>
          </Text>
          <Text style={styles.subtitle}>Update your skin type profile</Text>
        </View>

        {/* Skin Test Reminder Banner */}
        <TouchableOpacity 
          style={styles.testReminderBanner}
          onPress={onNavigateToSkinTest}
          activeOpacity={0.8}
        >
          <View style={styles.testBannerIconContainer}>
            <Image
              source={require('../assets/images/check.png')}
              style={styles.testBannerIcon}
              resizeMode="contain"
            />
          </View>
          <View style={styles.testBannerTextContainer}>
            <Text style={styles.testBannerTitle}>Take the Skin Test First</Text>
            <Text style={styles.testBannerText}>
              Get a more accurate skin type assessment through our comprehensive test before manually selecting.
            </Text>
          </View>
          <Text style={styles.testBannerArrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.currentTypeContainer}>
          <Text style={styles.sectionLabel}>Current Skin Type</Text>
          {initialType && (
            <View style={[
              styles.currentTypeBadge,
              { backgroundColor: `${SKIN_TYPES.find(t => t.id === initialType)?.color}15` }
            ]}>
              <Text style={[
                styles.currentTypeText,
                { color: SKIN_TYPES.find(t => t.id === initialType)?.color }
              ]}>
                {SKIN_TYPES.find(t => t.id === initialType)?.label}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionLabel}>Select Skin Type</Text>
        <View style={styles.typesContainer}>
          {SKIN_TYPES.map((type) => {
            const isSelected = selectedType === type.id;
            return (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeCard,
                  isSelected && {
                    borderColor: type.color,
                    borderWidth: 2,
                    backgroundColor: `${type.color}10`,
                  }
                ]}
                onPress={() => handleSelectType(type.id)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.iconContainer,
                  { backgroundColor: isSelected ? type.color : '#F5F5F5' }
                ]}>
                  <Image
                    source={type.icon}
                    style={[
                      styles.icon,
                      { tintColor: isSelected ? BRAND_COLORS.white : '#999' }
                    ]}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[
                    styles.typeLabel,
                    isSelected && { color: type.color, fontWeight: '600' }
                  ]}>
                    {type.label}
                  </Text>
                  <Text style={styles.typeDescription}>{type.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {hasChanges && (
          <View style={styles.changeInfo}>
            <Text style={styles.changeInfoText}>
              Your routines will be updated based on your new skin type
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={hasChanges ? "Save Changes" : "No Changes"}
          onPress={handleSave}
          disabled={!hasChanges}
          style={styles.saveButton}
        />
      </View>
    </View>
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
    paddingBottom: 120,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
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
  testReminderBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  testBannerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  testBannerIcon: {
    width: 20,
    height: 20,
    tintColor: BRAND_COLORS.white,
  },
  testBannerTextContainer: {
    flex: 1,
  },
  testBannerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1976D2',
    marginBottom: 4,
  },
  testBannerText: {
    fontSize: 13,
    color: '#424242',
    lineHeight: 18,
  },
  testBannerArrow: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4A90E2',
    marginLeft: 8,
  },
  currentTypeContainer: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 12,
  },
  currentTypeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  currentTypeText: {
    fontSize: 15,
    fontWeight: '700',
  },
  typesContainer: {
    marginBottom: 20,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  textContainer: {
    flex: 1,
  },
  typeLabel: {
    fontSize: 17,
    color: BRAND_COLORS.black,
    marginBottom: 3,
  },
  typeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 19,
  },
  changeInfo: {
    backgroundColor: `${BRAND_COLORS.primary}10`,
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  changeInfoText: {
    fontSize: 13,
    color: BRAND_COLORS.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 40,
    backgroundColor: '#FAFBFC',
    alignItems: 'center',
  },
  saveButton: {
    width: '100%',
  },
});