// app/SmartRoutineTimeSelectionScreen.js - UPDATED WITH i18n
import React, { useEffect, useState } from 'react';
import {
  Image,
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

const CONCERN_INFO = {
  nodules: { name: 'Inflamed Acne (Nodules)', color: '#FF7A7A', icon: require('../assets/images/Nodule.png') },
  blackheads: { name: 'Blackheads', color: '#4A90E2', icon: require('../assets/images/Blackhead.png') },
  whiteheads: { name: 'Whiteheads', color: '#7CB342', icon: require('../assets/images/Whitehead.png') },
  papules: { name: 'Papules & Pustules', color: '#F39C12', icon: require('../assets/images/Papule.png') },
  marks: { name: 'Post-Inflammatory Marks', color: '#9B59B6', icon: require('../assets/images/Mark.png') },
};

export default function SmartRoutineTimeSelectionScreen({ 
  onNavigateHome,
  onNavigateBack,
  onContinue,
  concernId 
}) {
  const [concernData, setConcernData] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    if (concernId && CONCERN_INFO[concernId]) {
      setConcernData(CONCERN_INFO[concernId]);
    }
  }, [concernId]);

  const handleContinue = () => {
    if (selectedTime && onContinue) {
      onContinue(selectedTime);
    }
  };

  if (!concernData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{t('smartRoutineTimeSelection.error')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topNavigation}>
        <TouchableOpacity onPress={onNavigateHome} style={styles.logoButton}>
          <Image 
            source={require('../assets/images/dracne-logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.concernIconContainer, { backgroundColor: `${concernData.color}15` }]}>
            <Image 
              source={concernData.icon}
              style={[styles.concernIcon, { tintColor: concernData.color }]}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>{t('smartRoutineTimeSelection.title')}</Text>
          <Text style={styles.subtitle}>
            {t('smartRoutineTimeSelection.subtitle', { concernName: concernData.name.toLowerCase() })}
          </Text>
        </View>

        <View style={styles.timeOptionsContainer}>
          <TouchableOpacity
            style={[
              styles.timeCard,
              selectedTime === 'morning' && [styles.timeCardSelected, { borderColor: concernData.color }]
            ]}
            onPress={() => setSelectedTime('morning')}
            activeOpacity={0.7}
          >
            <View style={styles.timeIconContainer}>
              <Image 
                source={require('../assets/images/sunscreen.png')}
                style={[styles.timeIcon, { tintColor: selectedTime === 'morning' ? concernData.color : BRAND_COLORS.gray }]}
                resizeMode="contain"
              />
            </View>
            <Text style={[styles.timeTitle, selectedTime === 'morning' && { color: concernData.color }]}>
              {t('smartRoutineTimeSelection.morning_title')}
            </Text>
            <Text style={styles.timeDescription}>
              {t('smartRoutineTimeSelection.morning_description')}
            </Text>
            {selectedTime === 'morning' && (
              <View style={[styles.checkmark, { backgroundColor: concernData.color }]}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.timeCard,
              selectedTime === 'evening' && [styles.timeCardSelected, { borderColor: concernData.color }]
            ]}
            onPress={() => setSelectedTime('evening')}
            activeOpacity={0.7}
          >
            <View style={styles.timeIconContainer}>
              <Image 
                source={require('../assets/images/jar cream.png')}
                style={[styles.timeIcon, { tintColor: selectedTime === 'evening' ? concernData.color : BRAND_COLORS.gray }]}
                resizeMode="contain"
              />
            </View>
            <Text style={[styles.timeTitle, selectedTime === 'evening' && { color: concernData.color }]}>
              {t('smartRoutineTimeSelection.evening_title')}
            </Text>
            <Text style={styles.timeDescription}>
              {t('smartRoutineTimeSelection.evening_description')}
            </Text>
            {selectedTime === 'evening' && (
              <View style={[styles.checkmark, { backgroundColor: concernData.color }]}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <Image 
            source={require('../assets/images/check.png')}
            style={styles.infoIcon}
            resizeMode="contain"
          />
          <Text style={styles.infoText}>
            {t('smartRoutineTimeSelection.info_text')}
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={selectedTime ? t('smartRoutineTimeSelection.button_continue') : t('smartRoutineTimeSelection.button_select')}
          onPress={handleContinue}
          disabled={!selectedTime}
          style={[styles.continueButton, !selectedTime && styles.continueButtonDisabled]}
        />
        <TouchableOpacity onPress={onNavigateBack} style={styles.backLink}>
          <Text style={styles.backLinkText}>{t('smartRoutineTimeSelection.back_link')}</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  concernIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  concernIcon: {
    width: 36,
    height: 36,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 14,
    color: BRAND_COLORS.darkGray,
    textAlign: 'center',
    lineHeight: 20,
  },
  timeOptionsContainer: {
    marginBottom: 20,
  },
  timeCard: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  timeCardSelected: {
    borderWidth: 3,
    shadowOpacity: 0.15,
    elevation: 4,
  },
  timeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeIcon: {
    width: 28,
    height: 28,
  },
  timeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 6,
  },
  timeDescription: {
    fontSize: 13,
    color: BRAND_COLORS.darkGray,
    lineHeight: 18,
  },
  checkmark: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#C8E6C9',
  },
  infoIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    tintColor: BRAND_COLORS.primary,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    lineHeight: 17,
    fontWeight: '500',
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
    marginBottom: 12,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  backLink: {
    paddingVertical: 8,
  },
  backLinkText: {
    fontSize: 14,
    color: BRAND_COLORS.primary,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: BRAND_COLORS.secondary,
    textAlign: 'center',
    marginTop: 100,
  },
});