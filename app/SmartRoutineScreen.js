// app/SmartRoutineScreen.js - WITH SPANISH I18N (COMPLETE)
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
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
  darkGray: '#666666',
};

const SKIN_CONCERNS = [
  {
    id: 'nodules',
    label: 'smartRoutine.concerns.nodules',
    description: 'smartRoutine.concerns.nodules_desc',
    icon: require('../assets/images/Nodule.png'),
    color: '#FF7A7A',
  },
  {
    id: 'blackheads',
    label: 'smartRoutine.concerns.blackheads',
    description: 'smartRoutine.concerns.blackheads_desc',
    icon: require('../assets/images/Blackhead.png'),
    color: '#4A90E2',
  },
  {
    id: 'whiteheads',
    label: 'smartRoutine.concerns.whiteheads',
    description: 'smartRoutine.concerns.whiteheads_desc',
    icon: require('../assets/images/Whitehead.png'),
    color: '#7CB342',
  },
  {
    id: 'papules',
    label: 'smartRoutine.concerns.papules',
    description: 'smartRoutine.concerns.papules_desc',
    icon: require('../assets/images/Papule.png'),
    color: '#F39C12',
  },
  {
    id: 'marks',
    label: 'smartRoutine.concerns.marks',
    description: 'smartRoutine.concerns.marks_desc',
    icon: require('../assets/images/Mark.png'),
    color: '#9B59B6',
  },
];

export default function SmartRoutineScreen({ 
  onNavigateHome, 
  onNavigateToDetail,
  preselectedConcern = null 
}) {
  const [selectedConcern, setSelectedConcern] = useState(preselectedConcern);

  const handleSelect = (concernId) => {
    setSelectedConcern(concernId);
  };

  const handleContinue = async () => {
    if (selectedConcern && onNavigateToDetail) {
      try {
        await AsyncStorage.setItem('selectedSmartConcern', selectedConcern);
        console.log('✅ Selected concern:', selectedConcern);
      } catch (error) {
        console.error('Error saving concern:', error);
      }
      onNavigateToDetail(selectedConcern);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Navigation */}
      <View style={styles.topNavigation}>
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
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {t('smartRoutine.title')} <Text style={styles.titleHighlight}>{t('smartRoutine.title_highlight')}</Text>
            </Text>
            <Text style={styles.subtitle}>
              {t('smartRoutine.subtitle')}
            </Text>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoIconContainer}>
              <Image 
                source={require('../assets/images/check.png')}
                style={styles.infoIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.infoText}>
              {t('smartRoutine.info')}
            </Text>
          </View>

          <View style={styles.concernsContainer}>
            {SKIN_CONCERNS.map((concern) => {
              const isSelected = selectedConcern === concern.id;
              return (
                <TouchableOpacity
                  key={concern.id}
                  style={[
                    styles.concernCard,
                    isSelected && {
                      borderColor: concern.color,
                      borderWidth: 3,
                      backgroundColor: `${concern.color}08`,
                    }
                  ]}
                  onPress={() => handleSelect(concern.id)}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.iconContainer,
                    { backgroundColor: isSelected ? concern.color : '#F5F5F5' }
                  ]}>
                    <Image
                      source={concern.icon}
                      style={[
                        styles.icon,
                        { tintColor: isSelected ? BRAND_COLORS.white : '#999' }
                      ]}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={[
                      styles.concernLabel,
                      isSelected && { color: concern.color, fontWeight: '700' }
                    ]}>
                      {t(concern.label)}
                    </Text>
                    <Text style={styles.concernDescription}>{t(concern.description)}</Text>
                  </View>
                  {isSelected && (
                    <View style={[styles.checkmark, { backgroundColor: concern.color }]}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {selectedConcern && (
            <View style={styles.selectionInfo}>
              <Text style={styles.selectionText}>
                {t('smartRoutine.selection', { 
                  concern: t(SKIN_CONCERNS.find(c => c.id === selectedConcern)?.label || '').toLowerCase()
                })}
              </Text>
            </View>
          )}

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={selectedConcern ? t('smartRoutine.button_selected') : t('smartRoutine.button_unselected')}
          onPress={handleContinue}
          disabled={!selectedConcern}
          style={[
            styles.continueButton,
            !selectedConcern && styles.continueButtonDisabled
          ]}
        />
        <Text style={styles.helperText}>
          {selectedConcern ? t('smartRoutine.helper_selected') : t('smartRoutine.helper_unselected')}
        </Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
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
    fontSize: 15,
    color: BRAND_COLORS.darkGray,
    textAlign: 'center',
    lineHeight: 22,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#C8E6C9',
  },
  infoIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoIcon: {
    width: 18,
    height: 18,
    tintColor: BRAND_COLORS.primary,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    lineHeight: 17,
    fontWeight: '500',
  },
  concernsContainer: {
    marginBottom: 20,
  },
  concernCard: {
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
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  icon: {
    width: 26,
    height: 26,
  },
  textContainer: {
    flex: 1,
  },
  concernLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 3,
  },
  concernDescription: {
    fontSize: 13,
    color: BRAND_COLORS.gray,
    lineHeight: 18,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  checkmarkText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  selectionInfo: {
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
  },
  selectionText: {
    fontSize: 14,
    color: BRAND_COLORS.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 140,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 27,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 90,
    backgroundColor: '#FAFBFC',
    alignItems: 'center',
  },
  continueButton: {
    width: '100%',
    marginBottom: 8,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  helperText: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    fontWeight: '500',
  },
});