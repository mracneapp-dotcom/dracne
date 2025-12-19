// app/LanguageScreen.js - WITH SPANISH I18N (COMPLETE)
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

const LANGUAGES = [
  {
    id: 'en',
    name: 'English',
    nativeName: 'English',
    code: 'EN',
  },
  {
    id: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    code: 'ES',
  },
];

export default function LanguageScreen({ onBack, onNavigateHome }) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [hasChanges, setHasChanges] = useState(false);
  const [initialLanguage, setInitialLanguage] = useState('en');

  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('userLanguage');
      if (savedLanguage) {
        setSelectedLanguage(savedLanguage);
        setInitialLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const handleSelectLanguage = (languageId) => {
    setSelectedLanguage(languageId);
    setHasChanges(languageId !== initialLanguage);
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('userLanguage', selectedLanguage);
      
      const selectedLang = LANGUAGES.find(lang => lang.id === selectedLanguage);
      
      Alert.alert(
        t('language.alert_updated_title'),
        t('language.alert_updated_message', { language: selectedLang?.name || 'English' }),
        [
          {
            text: t('language.alert_ok'),
            onPress: () => {
              if (onBack) onBack();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert(t('language.alert_error_title'), t('language.alert_error'));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNavigation}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>{t('language.back')}</Text>
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
            {t('language.title')} <Text style={styles.titleHighlight}>{t('language.title_highlight')}</Text>
          </Text>
          <Text style={styles.subtitle}>{t('language.subtitle')}</Text>
        </View>

        <View style={styles.languagesContainer}>
          {LANGUAGES.map((language) => {
            const isSelected = selectedLanguage === language.id;
            
            return (
              <TouchableOpacity
                key={language.id}
                style={[
                  styles.languageCard,
                  isSelected && styles.languageCardSelected,
                ]}
                onPress={() => handleSelectLanguage(language.id)}
                activeOpacity={0.7}
              >
                <View style={styles.languageContent}>
                  <View style={[
                    styles.flagContainer,
                    isSelected && styles.flagContainerSelected
                  ]}>
                    <Text style={styles.flag}>{language.code}</Text>
                  </View>
                  <View style={styles.languageTextContainer}>
                    <Text style={[
                      styles.languageName,
                      isSelected && styles.languageNameSelected
                    ]}>
                      {language.name}
                    </Text>
                    <Text style={[
                      styles.languageNativeName,
                      isSelected && styles.languageNativeNameSelected
                    ]}>
                      {language.nativeName}
                    </Text>
                  </View>
                </View>
                {isSelected && (
                  <View style={styles.checkmarkContainer}>
                    <Image
                      source={require('../assets/images/check.png')}
                      style={styles.checkmark}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            {t('language.info')}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={hasChanges ? t('language.apply') : t('language.no_changes')}
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
  languagesContainer: {
    marginBottom: 24,
  },
  languageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  languageCardSelected: {
    borderColor: BRAND_COLORS.primary,
    backgroundColor: `${BRAND_COLORS.primary}10`,
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flagContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  flagContainerSelected: {
    backgroundColor: `${BRAND_COLORS.primary}20`,
  },
  flag: {
    fontSize: 14,
    fontWeight: '700',
    color: BRAND_COLORS.primary,
  },
  languageTextContainer: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 2,
  },
  languageNameSelected: {
    color: BRAND_COLORS.primary,
    fontWeight: '700',
  },
  languageNativeName: {
    fontSize: 13,
    color: BRAND_COLORS.gray,
  },
  languageNativeNameSelected: {
    color: BRAND_COLORS.primary,
    fontWeight: '500',
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: BRAND_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 14,
    height: 14,
    tintColor: BRAND_COLORS.white,
  },
  infoBox: {
    backgroundColor: `${BRAND_COLORS.primary}10`,
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  infoText: {
    fontSize: 13,
    color: BRAND_COLORS.black,
    lineHeight: 19,
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