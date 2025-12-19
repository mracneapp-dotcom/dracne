// app/EditSkinTypeScreen.js - WITH SPANISH I18N (COMPLETE)
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
import { t } from './i18n';

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
    label: 'editSkinType.types.oily',
    description: 'editSkinType.types.oily_desc',
    icon: require('../assets/images/check.png'),
    color: '#4A90E2',
  },
  {
    id: 'dry',
    label: 'editSkinType.types.dry',
    description: 'editSkinType.types.dry_desc',
    icon: require('../assets/images/check.png'),
    color: '#F39C12',
  },
  {
    id: 'combination',
    label: 'editSkinType.types.combination',
    description: 'editSkinType.types.combination_desc',
    icon: require('../assets/images/check.png'),
    color: BRAND_COLORS.primary,
  },
  {
    id: 'normal',
    label: 'editSkinType.types.normal',
    description: 'editSkinType.types.normal_desc',
    icon: require('../assets/images/check.png'),
    color: '#9B59B6',
  },
  {
    id: 'sensitive',
    label: 'editSkinType.types.sensitive',
    description: 'editSkinType.types.sensitive_desc',
    icon: require('../assets/images/check.png'),
    color: BRAND_COLORS.secondary,
  },
  {
    id: 'unknown',
    label: 'editSkinType.types.unknown',
    description: 'editSkinType.types.unknown_desc',
    icon: require('../assets/images/check.png'),
    color: '#757575',
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
      Alert.alert(t('editSkinType.alert_error_title'), t('editSkinType.alert_error_message'));
      return;
    }

    try {
      await AsyncStorage.setItem('userSkinType', selectedType);
      
      const selectedSkinType = SKIN_TYPES.find(type => type.id === selectedType);
      
      Alert.alert(
        t('editSkinType.alert_saved_title'),
        t('editSkinType.alert_saved_message', { skinType: t(selectedSkinType?.label || 'editSkinType.types.normal') }),
        [
          {
            text: t('editSkinType.alert_ok'),
            onPress: () => {
              if (onBack) onBack();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert(t('editSkinType.alert_error_title'), t('editSkinType.alert_save_error'));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNavigation}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>{t('editSkinType.back')}</Text>
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
            {t('editSkinType.title')} <Text style={styles.titleHighlight}>{t('editSkinType.title_highlight')}</Text>
          </Text>
          <Text style={styles.subtitle}>{t('editSkinType.subtitle')}</Text>
        </View>

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
            <Text style={styles.testBannerTitle}>{t('editSkinType.test_banner_title')}</Text>
            <Text style={styles.testBannerText}>
              {t('editSkinType.test_banner_text')}
            </Text>
          </View>
          <Text style={styles.testBannerArrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.currentTypeContainer}>
          <Text style={styles.sectionLabel}>{t('editSkinType.current_label')}</Text>
          {initialType && (
            <View style={[
              styles.currentTypeBadge,
              { backgroundColor: `${SKIN_TYPES.find(t => t.id === initialType)?.color}15` }
            ]}>
              <Text style={[
                styles.currentTypeText,
                { color: SKIN_TYPES.find(t => t.id === initialType)?.color }
              ]}>
                {t(SKIN_TYPES.find(t => t.id === initialType)?.label || 'editSkinType.types.normal')}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionLabel}>{t('editSkinType.select_label')}</Text>
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
                    {t(type.label)}
                  </Text>
                  <Text style={styles.typeDescription}>{t(type.description)}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {hasChanges && (
          <View style={styles.changeInfo}>
            <Text style={styles.changeInfoText}>
              {t('editSkinType.change_info')}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={hasChanges ? t('editSkinType.save_changes') : t('editSkinType.no_changes')}
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