// app/NightRoutineScreen.js - WITH FIXED BANNER TEXT SPACING
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { DrAcneButton } from '../components/ui/DrAcneButton';
import { getRoutinesForSkinType } from '../constants/routinesData';
import { t } from './i18n';
import { checkRoutineUnlockStatus } from './utils/routineUnlock';

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

const SKIN_TYPE_INFO = {
  oily: { color: '#4A90E2' },
  dry: { color: '#F39C12' },
  combination: { color: BRAND_COLORS.primary },
  normal: { color: '#9B59B6' },
  sensitive: { color: BRAND_COLORS.primary },
  unknown: { color: '#757575' },
};

export default function NightRoutineScreen({ 
  onNavigateHome,
  onSelectRoutine, 
  onNavigateToSkinTest,
  onNavigateToMyNightRoutine,
  skinProfile = {}
}) {
  const [skinType, setSkinType] = useState('normal');
  const [routineData, setRoutineData] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('basic');
  const [currentView, setCurrentView] = useState('initial');
  const [showLockModal, setShowLockModal] = useState(false);
  const [lockMessage, setLockMessage] = useState('');
  const [unlockStatus, setUnlockStatus] = useState({ 
    moderate: false, 
    comprehensive: false,
    stats: { daysSinceInstall: 0, completedRoutines: 0 }
  });

  const hasNightRoutine = skinProfile?.nightRoutine?.completedAt;
  const savedRoutineLevel = skinProfile?.nightRoutine?.level || 'basic';
  const productCount = (skinProfile?.nightRoutine?.products?.cleansers?.length || 0) + 
                      (skinProfile?.nightRoutine?.products?.moisturizers?.length || 0);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dx > 20 && Math.abs(gestureState.dy) < 80;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          handleSwipeBack();
        }
      },
    })
  ).current;

  const handleSwipeBack = () => {
    if (currentView === 'createRoutine') {
      setCurrentView('initial');
    } else if (currentView === 'initial' && onNavigateHome) {
      onNavigateHome();
    }
  };

  useEffect(() => {
    loadSkinTypeAndRoutine();
    loadUnlockStatus();
  }, []);

  const loadSkinTypeAndRoutine = async () => {
    try {
      const savedSkinType = await AsyncStorage.getItem('userSkinType');
      const savedRoutineLevel = await AsyncStorage.getItem('selectedNightRoutineLevel');
      
      if (savedSkinType) {
        setSkinType(savedSkinType);
        const routines = getRoutinesForSkinType(savedSkinType);
        setRoutineData(routines);
        console.log('✅ Loaded skin type:', savedSkinType);
      }
      
      if (savedRoutineLevel) {
        setSelectedLevel(savedRoutineLevel);
        console.log('✅ Loaded saved night routine level:', savedRoutineLevel);
      }
    } catch (error) {
      console.error('Error loading skin type:', error);
    }
  };

  const loadUnlockStatus = async () => {
    const status = await checkRoutineUnlockStatus();
    setUnlockStatus(status);
    console.log('📊 Night Routine Unlock Status:', status);
  };

  const handleRoutineCardPress = async (level) => {
    if (level === 'basic') {
      setSelectedLevel(level);
      return;
    }

    const status = await checkRoutineUnlockStatus();
    
    if (level === 'moderate') {
      if (status.moderate) {
        setSelectedLevel(level);
      } else {
        const routinesNeeded = Math.max(0, 5 - (status.stats?.completedRoutines || 0));
        const daysNeeded = Math.max(0, 7 - (status.stats?.daysSinceInstall || 0));
        
        setLockMessage(
          t('nightRoutine.lock_moderate_title') +
          t('nightRoutine.lock_moderate_unlock', { routines: routinesNeeded, days: daysNeeded }) +
          t('nightRoutine.lock_moderate_progress', { 
            completedRoutines: status.stats?.completedRoutines || 0, 
            daysSinceInstall: status.stats?.daysSinceInstall || 0 
          }) +
          t('nightRoutine.lock_moderate_message')
        );
        setShowLockModal(true);
      }
    } else if (level === 'comprehensive') {
      if (status.comprehensive) {
        setSelectedLevel(level);
      } else {
        const routinesNeeded = Math.max(0, 10 - (status.stats?.completedRoutines || 0));
        const daysNeeded = Math.max(0, 14 - (status.stats?.daysSinceInstall || 0));
        
        setLockMessage(
          t('nightRoutine.lock_comprehensive_title') +
          t('nightRoutine.lock_comprehensive_unlock', { routines: routinesNeeded, days: daysNeeded }) +
          t('nightRoutine.lock_comprehensive_progress', { 
            completedRoutines: status.stats?.completedRoutines || 0, 
            daysSinceInstall: status.stats?.daysSinceInstall || 0 
          }) +
          t('nightRoutine.lock_comprehensive_message')
        );
        setShowLockModal(true);
      }
    }
  };

  const handleSaveRoutine = async () => {
    try {
      await AsyncStorage.setItem('selectedNightRoutineLevel', selectedLevel);
      console.log('✅ Saved night routine level:', selectedLevel);
      
      if (onSelectRoutine) {
        onSelectRoutine(selectedLevel, 'evening', routineData[selectedLevel]);
      }
    } catch (error) {
      console.error('Error saving night routine level:', error);
    }
  };

  const getButtonText = () => {
    const levelText = selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1);
    return t(`nightRoutine.save_button_${selectedLevel}`);
  };

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;

  if (!routineData) {
    return null;
  }

  const getTranslatedRoutineName = () => t(`routines.${skinType}.name`);
  const getTranslatedRoutineTitle = (level) => t(`routines.${skinType}.${level}_title`);
  const getTranslatedRoutineDescription = (level) => t(`routines.${skinType}.${level}_description`);
  const getTranslatedSteps = (level, period) => {
    const steps = routineData[level].steps[period];
    return steps.map((_, index) => t(`routines.${skinType}.${level}_${period}_${index + 1}`));
  };
  const getTranslatedBenefits = (level) => {
    const benefits = routineData[level].keyBenefits;
    return benefits.map((_, index) => t(`routines.${skinType}.${level}_benefit_${index + 1}`));
  };

  const renderInitialScreen = () => (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.topNavigation}>
        <TouchableOpacity onPress={onNavigateHome} style={styles.logoButton}>
          <Image 
            source={require('../assets/images/dracne-logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Night Routine Banner - Dynamic */}
      <View style={styles.bannerContainer}>
        <ImageBackground
          source={require('../assets/images/banner-night-routine-base.png')}
          style={styles.bannerImageBackground}
          imageStyle={styles.bannerImage}
        >
          <View style={styles.nightRoutineBannerTextContainer}>
            <Text style={styles.nightRoutineLine1}>{t('nightRoutineBanners.line1')}</Text>
            <Text style={styles.nightRoutineLine2}>{t('nightRoutineBanners.line2')}</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.contentFixed}>
        <View style={styles.heroSection}>
          <Text style={styles.questionTitle}>
            {t('nightRoutine.title')} <Text style={[styles.aiHighlight, { color: skinTypeInfo.color }]}>
              {getTranslatedRoutineName()}
            </Text>{'\n'}{t('nightRoutine.title_end')}
          </Text>
          <Text style={styles.questionSubtitle}>
            {t('nightRoutine.subtitle')}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.skinTestReminder}
          onPress={onNavigateToSkinTest}
          activeOpacity={0.7}
        >
          <View style={styles.reminderIcon}>
            <View style={styles.testTubeIcon}>
              <View style={styles.testTubeTop} />
              <View style={styles.testTubeBody} />
            </View>
          </View>
          <View style={styles.reminderContent}>
            <Text style={styles.reminderTitle}>{t('nightRoutine.skin_test_title')}</Text>
            <Text style={styles.reminderSubtitle}>{t('nightRoutine.skin_test_subtitle')}</Text>
          </View>
          <Text style={styles.reminderArrow}>→</Text>
        </TouchableOpacity>

        <View style={styles.bannerButtonsContainer}>
          {/* Create Routine Banner - Dynamic */}
          <TouchableOpacity
            onPress={() => setCurrentView('createRoutine')}
            activeOpacity={0.8}
            style={styles.bannerButton}
          >
            <ImageBackground
              source={require('../assets/images/banner-create-routine-base.png')}
              style={styles.bannerButtonImageBackground}
              imageStyle={styles.bannerButtonImage}
            >
              <View style={styles.createRoutineBannerTextContainer}>
                <Text style={styles.createRoutineLine1}>{t('nightRoutineBanners.create_line1')}</Text>
                <Text style={styles.createRoutineLine2}>{t('nightRoutineBanners.create_line2')}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          
          {/* My Routine Banner - Dynamic */}
          <TouchableOpacity
            onPress={onNavigateToMyNightRoutine}
            activeOpacity={0.8}
            style={[
              styles.bannerButton,
              hasNightRoutine && styles.bannerButtonActive
            ]}
          >
            <ImageBackground
              source={require('../assets/images/banner-my-routine-base.png')}
              style={styles.bannerButtonImageBackground}
              imageStyle={styles.bannerButtonImage}
            >
              <View style={styles.myRoutineBannerTextContainer}>
                <Text style={styles.myRoutineMyText}>{t('nightRoutineBanners.my')}</Text>
                <Text style={styles.myRoutineLine2}>{t('nightRoutineBanners.routine')}</Text>
              </View>
            </ImageBackground>
            {hasNightRoutine && (
              <View style={styles.savedRoutineOverlay}>
                <View style={styles.savedRoutineBadge}>
                  <Text style={styles.savedRoutineText}>
                    {t('nightRoutine.saved_routine_badge', { level: savedRoutineLevel.charAt(0).toUpperCase() + savedRoutineLevel.slice(1) })}
                  </Text>
                  <Text style={styles.savedRoutineProducts}>
                    {productCount === 1 
                      ? t('nightRoutine.saved_routine_products', { count: productCount })
                      : t('nightRoutine.saved_routine_products_plural', { count: productCount })
                    }
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderUnknownSkinTypePrompt = () => (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.topNavigation}>
        <TouchableOpacity onPress={onNavigateHome} style={styles.logoButton}>
          <Image 
            source={require('../assets/images/dracne-logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.bannerContainer}
        onPress={() => setCurrentView('initial')}
        activeOpacity={0.9}
      >
        <ImageBackground
          source={require('../assets/images/banner-night-routine-base.png')}
          style={styles.bannerImageBackground}
          imageStyle={styles.bannerImage}
        >
          <View style={styles.nightRoutineBannerTextContainer}>
            <Text style={styles.nightRoutineLine1}>{t('nightRoutineBanners.line1')}</Text>
            <Text style={styles.nightRoutineLine2}>{t('nightRoutineBanners.line2')}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <View style={styles.unknownPromptContainer}>
        <View style={styles.unknownPromptContent}>
          <View style={styles.unknownIconContainer}>
            <View style={styles.testTubeIcon}>
              <View style={styles.testTubeTop} />
              <View style={styles.testTubeBody} />
            </View>
          </View>
          
          <Text style={styles.unknownPromptTitle}>
            {t('nightRoutine.unknown_prompt_title')}
          </Text>
          
          <Text style={styles.unknownPromptMessage}>
            {t('nightRoutine.unknown_prompt_message')}
          </Text>

          <DrAcneButton
            title={t('nightRoutine.unknown_prompt_button')}
            onPress={onNavigateToSkinTest}
            style={styles.unknownPromptButton}
          />

          <TouchableOpacity 
            onPress={() => setCurrentView('initial')}
            style={styles.unknownPromptBackButton}
          >
            <Text style={styles.unknownPromptBackText}>{t('nightRoutine.unknown_prompt_back')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderCreateRoutineScreen = () => {
    if (skinType === 'unknown') {
      return renderUnknownSkinTypePrompt();
    }

    return (
      <View style={styles.container} {...panResponder.panHandlers}>
        <View style={styles.topNavigation}>
          <TouchableOpacity onPress={onNavigateHome} style={styles.logoButton}>
            <Image 
              source={require('../assets/images/dracne-logo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.bannerContainer}
          onPress={() => setCurrentView('initial')}
          activeOpacity={0.9}
        >
          <ImageBackground
            source={require('../assets/images/banner-night-routine-base.png')}
            style={styles.bannerImageBackground}
            imageStyle={styles.bannerImage}
          >
            <View style={styles.nightRoutineBannerTextContainer}>
              <Text style={styles.nightRoutineLine1}>{t('nightRoutineBanners.line1')}</Text>
              <Text style={styles.nightRoutineLine2}>{t('nightRoutineBanners.line2')}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.heroSection}>
              <Text style={styles.questionTitle}>
                {t('nightRoutine.create_title')} <Text style={[styles.aiHighlight, { color: skinTypeInfo.color }]}>
                  {getTranslatedRoutineName()}
                </Text>{'\n'}{t('nightRoutine.create_title_end')}
              </Text>
              <Text style={styles.questionSubtitle}>
                {t('nightRoutine.create_subtitle')}
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.skinTestReminder}
              onPress={onNavigateToSkinTest}
              activeOpacity={0.7}
            >
              <View style={styles.reminderIcon}>
                <View style={styles.testTubeIcon}>
                  <View style={styles.testTubeTop} />
                  <View style={styles.testTubeBody} />
                </View>
              </View>
              <View style={styles.reminderContent}>
                <Text style={styles.reminderTitle}>{t('nightRoutine.skin_test_title')}</Text>
                <Text style={styles.reminderSubtitle}>{t('nightRoutine.skin_test_subtitle')}</Text>
              </View>
              <Text style={styles.reminderArrow}>→</Text>
            </TouchableOpacity>

            <View style={styles.routineLevelsContainer}>
              <Text style={styles.sectionTitle}>{t('nightRoutine.section_title')}</Text>
              
              {/* Basic Card - ALWAYS UNLOCKED */}
              <TouchableOpacity
                style={[
                  styles.routineCard,
                  selectedLevel === 'basic' && [styles.routineCardSelected, { borderColor: skinTypeInfo.color }]
                ]}
                onPress={() => handleRoutineCardPress('basic')}
              >
                <View style={styles.routineHeader}>
                  <View style={[styles.routineBadge, { backgroundColor: '#E8F5E9' }]}>
                    <Text style={[styles.routineBadgeText, { color: BRAND_COLORS.primary }]}>
                      {t('nightRoutine.basic_badge')}
                    </Text>
                  </View>
                  {selectedLevel === 'basic' && (
                    <View style={[styles.selectedIndicator, { backgroundColor: skinTypeInfo.color }]}>
                      <Text style={styles.selectedIndicatorText}>✓</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.routineTitle}>{getTranslatedRoutineTitle('basic')}</Text>
                <Text style={styles.routineDescription}>{getTranslatedRoutineDescription('basic')}</Text>
                
                <View style={styles.routineSteps}>
                  <Text style={styles.stepsTitle}>{t('nightRoutine.evening_label')}</Text>
                  {getTranslatedSteps('basic', 'pm').map((step, index) => (
                    <Text key={index} style={styles.stepText}>• {step}</Text>
                  ))}
                </View>

                <View style={styles.benefitsContainer}>
                  {getTranslatedBenefits('basic').map((benefit, index) => (
                    <View key={index} style={styles.benefitPill}>
                      <Text style={styles.benefitText}>{benefit}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>

              {/* Moderate Card - PROGRESSIVE UNLOCK */}
              <TouchableOpacity
                style={[
                  styles.routineCard,
                  selectedLevel === 'moderate' && [styles.routineCardSelected, { borderColor: skinTypeInfo.color }],
                  !unlockStatus.moderate && styles.routineCardLocked
                ]}
                onPress={() => handleRoutineCardPress('moderate')}
                activeOpacity={unlockStatus.moderate ? 0.7 : 1}
              >
                <View style={styles.routineHeader}>
                  <View style={[styles.routineBadge, { backgroundColor: '#FFF4E5' }]}>
                    <Text style={[styles.routineBadgeText, { color: '#F39C12' }]}>
                      {t('nightRoutine.moderate_badge')}
                    </Text>
                  </View>
                  {!unlockStatus.moderate && (
                    <View style={styles.lockBadge}>
                      <Image 
                        source={require('../assets/images/lock1.png')} 
                        style={styles.lockImage}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  {selectedLevel === 'moderate' && unlockStatus.moderate && (
                    <View style={[styles.selectedIndicator, { backgroundColor: skinTypeInfo.color }]}>
                      <Text style={styles.selectedIndicatorText}>✓</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.routineTitle}>{getTranslatedRoutineTitle('moderate')}</Text>
                <Text style={styles.routineDescription}>{getTranslatedRoutineDescription('moderate')}</Text>
                
                <View style={styles.routineSteps}>
                  <Text style={styles.stepsTitle}>{t('nightRoutine.evening_label')}</Text>
                  {getTranslatedSteps('moderate', 'pm').slice(0, 3).map((step, index) => (
                    <Text key={index} style={styles.stepText}>• {step}</Text>
                  ))}
                  <Text style={styles.moreSteps}>{t('nightRoutine.more_steps')}</Text>
                </View>

                <View style={styles.benefitsContainer}>
                  {getTranslatedBenefits('moderate').map((benefit, index) => (
                    <View key={index} style={styles.benefitPill}>
                      <Text style={styles.benefitText}>{benefit}</Text>
                    </View>
                  ))}
                </View>

                {!unlockStatus.moderate && (
                  <View style={styles.lockOverlay}>
                    <Image 
                      source={require('../assets/images/lock1.png')} 
                      style={styles.lockOverlayImage}
                      resizeMode="contain"
                    />
                    <Text style={styles.lockOverlayText}>
                      {t('nightRoutine.moderate_unlock')}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Comprehensive Card - PROGRESSIVE UNLOCK */}
              <TouchableOpacity
                style={[
                  styles.routineCard,
                  selectedLevel === 'comprehensive' && [styles.routineCardSelected, { borderColor: skinTypeInfo.color }],
                  !unlockStatus.comprehensive && styles.routineCardLocked
                ]}
                onPress={() => handleRoutineCardPress('comprehensive')}
                activeOpacity={unlockStatus.comprehensive ? 0.7 : 1}
              >
                <View style={styles.routineHeader}>
                  <View style={[styles.routineBadge, { backgroundColor: '#F3E5F5' }]}>
                    <Text style={[styles.routineBadgeText, { color: '#9B59B6' }]}>
                      {t('nightRoutine.comprehensive_badge')}
                    </Text>
                  </View>
                  {!unlockStatus.comprehensive && (
                    <View style={styles.lockBadge}>
                      <Image 
                        source={require('../assets/images/lock1.png')} 
                        style={styles.lockImage}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  {selectedLevel === 'comprehensive' && unlockStatus.comprehensive && (
                    <View style={[styles.selectedIndicator, { backgroundColor: skinTypeInfo.color }]}>
                      <Text style={styles.selectedIndicatorText}>✓</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.routineTitle}>{getTranslatedRoutineTitle('comprehensive')}</Text>
                <Text style={styles.routineDescription}>{getTranslatedRoutineDescription('comprehensive')}</Text>
                
                <View style={styles.routineSteps}>
                  <Text style={styles.stepsTitle}>{t('nightRoutine.full_treatment')}</Text>
                  {getTranslatedSteps('comprehensive', 'pm').slice(0, 3).map((step, index) => (
                    <Text key={index} style={styles.stepText}>• {step}</Text>
                  ))}
                  <Text style={styles.moreSteps}>{t('nightRoutine.more_steps_comprehensive')}</Text>
                </View>

                <View style={styles.benefitsContainer}>
                  {getTranslatedBenefits('comprehensive').map((benefit, index) => (
                    <View key={index} style={styles.benefitPill}>
                      <Text style={styles.benefitText}>{benefit}</Text>
                    </View>
                  ))}
                </View>

                {!unlockStatus.comprehensive && (
                  <View style={styles.lockOverlay}>
                    <Image 
                      source={require('../assets/images/lock1.png')} 
                      style={styles.lockOverlayImage}
                      resizeMode="contain"
                    />
                    <Text style={styles.lockOverlayText}>
                      {t('nightRoutine.comprehensive_unlock')}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.trustSection}>
              <View style={styles.trustItem}>
                <Text style={styles.trustText}>{t('nightRoutine.trust1')}</Text>
              </View>
              <View style={styles.trustItem}>
                <Text style={styles.trustText}>{t('nightRoutine.trust2')}</Text>
              </View>
              <View style={styles.trustItem}>
                <Text style={styles.trustText}>{t('nightRoutine.trust3')}</Text>
              </View>
            </View>

            <View style={styles.bottomSpacing} />
          </View>
        </ScrollView>

        <View style={styles.bottomSection}>
          <DrAcneButton
            title={getButtonText()}
            onPress={handleSaveRoutine}
            style={styles.saveButton}
          />
          
          <Text style={styles.helperText}>
            {t('nightRoutine.helper')}
          </Text>
        </View>

        {/* Lock Warning Modal */}
        <Modal
          visible={showLockModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowLockModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalBannerContainer}>
                <Image 
                  source={require('../assets/images/Banner Locked.png')}
                  style={styles.modalBanner}
                  resizeMode="cover"
                />
              </View>
              
              <View style={styles.modalBody}>
                <View style={styles.modalLockIconContainer}>
                  <Image 
                    source={require('../assets/images/lock1.png')} 
                    style={styles.modalLockIcon}
                    resizeMode="contain"
                  />
                </View>
                
                <Text style={styles.modalTitle}>{t('nightRoutine.modal_locked_title')}</Text>
                <Text style={styles.modalMessage}>{lockMessage}</Text>
                
                <DrAcneButton
                  title={t('nightRoutine.modal_button')}
                  onPress={() => setShowLockModal(false)}
                  style={styles.modalButton}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return currentView === 'initial' ? renderInitialScreen() : renderCreateRoutineScreen();
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
  bannerContainer: {
    width: '100%',
    height: 120,
    marginBottom: 15,
  },
  bannerImageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  bannerImage: {
    borderRadius: 0,
  },
  // ✅ FIXED: Night Routine Banner Text Styles - Better Spacing
  nightRoutineBannerTextContainer: {
    alignItems: 'flex-end',
    paddingRight: 24,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    justifyContent: 'center',
  },
  nightRoutineLine1: {
    fontFamily: 'Baloo',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 38,          // ✅ INCREASED from 34
    color: BRAND_COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    includeFontPadding: false,
  },
  nightRoutineLine2: {
    fontFamily: 'Baloo',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 38,          // ✅ INCREASED from 34
    color: BRAND_COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginTop: -4,           // ✅ CHANGED from -8 to -4
    includeFontPadding: false,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  contentFixed: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 15,
  },
  questionTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 30,
  },
  aiHighlight: {
    fontWeight: '800',
  },
  questionSubtitle: {
    fontSize: 14,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '400',
    paddingHorizontal: 10,
  },
  skinTestReminder: {
    flexDirection: 'row',
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1.5,
    borderColor: '#B8D4E8',
    alignItems: 'center',
  },
  reminderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  testTubeIcon: {
    width: 16,
    height: 24,
    alignItems: 'center',
  },
  testTubeTop: {
    width: 14,
    height: 6,
    backgroundColor: '#4A90E2',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  testTubeBody: {
    width: 10,
    height: 14,
    backgroundColor: '#4A90E2',
    opacity: 0.6,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 2,
  },
  reminderSubtitle: {
    fontSize: 11,
    color: '#4A90E2',
    fontWeight: '500',
  },
  reminderArrow: {
    fontSize: 18,
    color: '#4A90E2',
    fontWeight: '600',
    marginLeft: 8,
  },
  bannerButtonsContainer: {
    marginTop: 5,
    gap: 15,
  },
  bannerButton: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bannerButtonActive: {
    borderWidth: 3,
    borderColor: BRAND_COLORS.primary,
    shadowOpacity: 0.15,
    elevation: 5,
  },
  bannerButtonImageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  bannerButtonImage: {
    borderRadius: 12,
  },
  // ✅ FIXED: Create Routine Banner Text Styles - Better Spacing
  createRoutineBannerTextContainer: {
    alignItems: 'flex-end',
    paddingRight: 24,
    paddingTop: 22,
    paddingBottom: 22,
    flex: 1,
    justifyContent: 'center',
  },
  createRoutineLine1: {
    fontFamily: 'Baloo',
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 42,          // ✅ INCREASED from 38
    color: BRAND_COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    includeFontPadding: false,
  },
  createRoutineLine2: {
    fontFamily: 'Baloo',
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 42,          // ✅ INCREASED from 38
    color: BRAND_COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginTop: -4,           // ✅ CHANGED from -8 to -4
    includeFontPadding: false,
  },
  // ✅ FIXED: My Routine Banner Text Styles - Better Spacing
  myRoutineBannerTextContainer: {
    alignItems: 'flex-end',
    paddingRight: 24,
    paddingTop: 22,
    paddingBottom: 22,
    flex: 1,
    justifyContent: 'center',
  },
  myRoutineMyText: {
    fontFamily: 'Brittany',
    fontSize: 38,
    lineHeight: 48,
    color: BRAND_COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    includeFontPadding: false,
  },
  myRoutineLine2: {
    fontFamily: 'Baloo',
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 42,          // ✅ INCREASED from 38
    color: BRAND_COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginTop: -2,           // ✅ CHANGED from -8 to -4
    includeFontPadding: false,
  },
  savedRoutineOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  savedRoutineBadge: {
    alignItems: 'center',
  },
  savedRoutineText: {
    color: BRAND_COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  savedRoutineProducts: {
    color: BRAND_COLORS.white,
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
  unknownPromptContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  unknownPromptContent: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    width: '100%',
  },
  unknownIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  unknownPromptTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 15,
  },
  unknownPromptMessage: {
    fontSize: 15,
    color: BRAND_COLORS.darkGray,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
  },
  unknownPromptButton: {
    width: '100%',
    marginBottom: 12,
  },
  unknownPromptBackButton: {
    paddingVertical: 10,
  },
  unknownPromptBackText: {
    fontSize: 14,
    color: BRAND_COLORS.gray,
    fontWeight: '600',
  },
  routineLevelsContainer: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 8,
    textAlign: 'center',
  },
  routineCard: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
    padding: 10,
    marginBottom: 6,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  routineCardSelected: {
    borderWidth: 3,
    shadowOpacity: 0.2,
    elevation: 5,
  },
  routineCardLocked: {
    opacity: 0.6,
  },
  routineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  routineBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  routineBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  lockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  lockImage: {
    width: 20,
    height: 20,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicatorText: {
    color: BRAND_COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  routineTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 2,
  },
  routineDescription: {
    fontSize: 13,
    color: BRAND_COLORS.darkGray,
    lineHeight: 16,
    marginBottom: 6,
  },
  routineSteps: {
    marginBottom: 6,
  },
  stepsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 3,
  },
  stepText: {
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    marginBottom: 2,
    lineHeight: 15,
  },
  moreSteps: {
    fontSize: 11,
    color: BRAND_COLORS.gray,
    fontStyle: 'italic',
    marginTop: 2,
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  benefitPill: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  benefitText: {
    fontSize: 9,
    color: BRAND_COLORS.darkGray,
    fontWeight: '500',
  },
  lockOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  lockOverlayImage: {
    width: 16,
    height: 16,
    tintColor: BRAND_COLORS.white,
  },
  lockOverlayText: {
    color: BRAND_COLORS.white,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  trustSection: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
    padding: 8,
    marginBottom: 10,
  },
  trustItem: {
    marginBottom: 2,
  },
  trustText: {
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    lineHeight: 16,
  },
  bottomSpacing: {
    height: 160,
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
  saveButton: {
    marginBottom: 8,
    width: '100%',
  },
  helperText: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalBannerContainer: {
    width: '100%',
    height: 120,
    overflow: 'hidden',
  },
  modalBanner: {
    width: '100%',
    height: '100%',
  },
  modalBody: {
    padding: 25,
    alignItems: 'center',
  },
  modalLockIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalLockIcon: {
    width: 32,
    height: 32,
    tintColor: '#F39C12',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: BRAND_COLORS.darkGray,
    lineHeight: 22,
    marginBottom: 25,
    textAlign: 'center',
  },
  modalButton: {
    width: '100%',
  },
});