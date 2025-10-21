// app/NightRoutineScreen.js - UPDATED WITH LOCKING SYSTEM & IMAGE LOCK
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
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
  const [selectedLevel, setSelectedLevel] = useState('basic'); // ✅ CHANGED TO BASIC
  const [currentView, setCurrentView] = useState('initial');
  const [showLockModal, setShowLockModal] = useState(false);
  const [lockMessage, setLockMessage] = useState('');
  const [routineCompletionDates, setRoutineCompletionDates] = useState({
    basic: null,
    moderate: null
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
    loadRoutineCompletionDates();
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

  const loadRoutineCompletionDates = async () => {
    try {
      const basicDate = await AsyncStorage.getItem('basicNightRoutineCompletionDate');
      const moderateDate = await AsyncStorage.getItem('moderateNightRoutineCompletionDate');
      
      setRoutineCompletionDates({
        basic: basicDate ? new Date(basicDate) : null,
        moderate: moderateDate ? new Date(moderateDate) : null
      });
      
      console.log('✅ Loaded night routine completion dates:', { basic: basicDate, moderate: moderateDate });
    } catch (error) {
      console.error('Error loading completion dates:', error);
    }
  };

  const checkRoutineUnlock = (level) => {
    const now = new Date();
    
    if (level === 'moderate') {
      if (!routineCompletionDates.basic) {
        setLockMessage(
          'Start with the Basic Routine first!\n\n' +
          'Building a solid foundation is essential. Your skin needs time to adjust and respond. ' +
          'Complete the Basic Routine for at least 1 week before moving to Moderate.\n\n' +
          'Remember: Skincare is a journey, not a race. Rushing into advanced routines can overwhelm ' +
          'your skin and cause irritation. Let\'s build your routine thoughtfully!'
        );
        setShowLockModal(true);
        return false;
      }
      
      const daysSinceBasic = Math.floor((now - routineCompletionDates.basic) / (1000 * 60 * 60 * 24));
      if (daysSinceBasic < 7) {
        const daysRemaining = 7 - daysSinceBasic;
        setLockMessage(
          `Give your skin more time!\n\n` +
          `You've been on the Basic Routine for ${daysSinceBasic} day${daysSinceBasic !== 1 ? 's' : ''}. ` +
          `Complete at least 1 week (${daysRemaining} more day${daysRemaining !== 1 ? 's' : ''}) before upgrading.\n\n` +
          `Your skin needs time to adjust and show you what it really needs. Patience prevents irritation and helps ` +
          `you understand how your skin responds to each product.`
        );
        setShowLockModal(true);
        return false;
      }
    }
    
    if (level === 'comprehensive') {
      if (!routineCompletionDates.moderate) {
        setLockMessage(
          'Complete the Moderate Routine first!\n\n' +
          'The Comprehensive Routine is powerful but demanding. Your skin barrier needs to be strong and ' +
          'well-prepared before introducing multiple active ingredients.\n\n' +
          'Progress through Moderate for at least 2 weeks to ensure your skin can handle advanced treatments ' +
          'without irritation or damage.'
        );
        setShowLockModal(true);
        return false;
      }
      
      const daysSinceModerate = Math.floor((now - routineCompletionDates.moderate) / (1000 * 60 * 60 * 24));
      if (daysSinceModerate < 14) {
        const daysRemaining = 14 - daysSinceModerate;
        setLockMessage(
          `Your skin needs more time to adapt!\n\n` +
          `You've been on the Moderate Routine for ${daysSinceModerate} day${daysSinceModerate !== 1 ? 's' : ''}. ` +
          `Complete at least 2 weeks (${daysRemaining} more day${daysRemaining !== 1 ? 's' : ''}) before upgrading.\n\n` +
          `The Comprehensive Routine uses powerful actives that can overwhelm unprepared skin. Let your barrier ` +
          `strengthen first. Results take time - trust the process!`
        );
        setShowLockModal(true);
        return false;
      }
    }
    
    return true;
  };

  const handleRoutineCardPress = (level) => {
    if (level === 'basic') {
      setSelectedLevel(level);
    } else if (checkRoutineUnlock(level)) {
      setSelectedLevel(level);
    }
  };

  const handleSaveRoutine = async () => {
    try {
      await AsyncStorage.setItem('selectedNightRoutineLevel', selectedLevel);
      
      // Save completion date if not already saved
      if (selectedLevel === 'basic' && !routineCompletionDates.basic) {
        const now = new Date().toISOString();
        await AsyncStorage.setItem('basicNightRoutineCompletionDate', now);
        setRoutineCompletionDates(prev => ({ ...prev, basic: new Date(now) }));
      } else if (selectedLevel === 'moderate' && !routineCompletionDates.moderate) {
        const now = new Date().toISOString();
        await AsyncStorage.setItem('moderateNightRoutineCompletionDate', now);
        setRoutineCompletionDates(prev => ({ ...prev, moderate: new Date(now) }));
      }
      
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
    return `Save ${levelText} Routine & Continue`;
  };

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;

  if (!routineData) {
    return null;
  }

  const isModerateUnlocked = () => {
    if (!routineCompletionDates.basic) return false;
    const daysSinceBasic = Math.floor((new Date() - routineCompletionDates.basic) / (1000 * 60 * 60 * 24));
    return daysSinceBasic >= 7;
  };

  const isComprehensiveUnlocked = () => {
    if (!routineCompletionDates.moderate) return false;
    const daysSinceModerate = Math.floor((new Date() - routineCompletionDates.moderate) / (1000 * 60 * 60 * 24));
    return daysSinceModerate >= 14;
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

      <View style={styles.bannerContainer}>
        <Image 
          source={require('../assets/images/Banner Night Routine 1.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.contentFixed}>
        <View style={styles.heroSection}>
          <Text style={styles.questionTitle}>
            Your <Text style={[styles.aiHighlight, { color: skinTypeInfo.color }]}>
              {routineData.name}
            </Text>{'\n'}Evening Routine
          </Text>
          <Text style={styles.questionSubtitle}>
            Build a personalized routine or view your saved routine
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
            <Text style={styles.reminderTitle}>Not sure about your skin type?</Text>
            <Text style={styles.reminderSubtitle}>Take our quick skin test for accurate results</Text>
          </View>
          <Text style={styles.reminderArrow}>→</Text>
        </TouchableOpacity>

        <View style={styles.bannerButtonsContainer}>
          <TouchableOpacity
            onPress={() => setCurrentView('createRoutine')}
            activeOpacity={0.8}
            style={styles.bannerButton}
          >
            <Image 
              source={require('../assets/images/Banner Create Routine.png')}
              style={styles.bannerButtonImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={onNavigateToMyNightRoutine}
            activeOpacity={0.8}
            style={[
              styles.bannerButton,
              hasNightRoutine && styles.bannerButtonActive
            ]}
          >
            <Image 
              source={require('../assets/images/Banner My Routine.png')}
              style={styles.bannerButtonImage}
              resizeMode="cover"
            />
            {hasNightRoutine && (
              <View style={styles.savedRoutineOverlay}>
                <View style={styles.savedRoutineBadge}>
                  <Text style={styles.savedRoutineText}>
                    ✓ {savedRoutineLevel.charAt(0).toUpperCase() + savedRoutineLevel.slice(1)}
                  </Text>
                  <Text style={styles.savedRoutineProducts}>
                    {productCount} product{productCount !== 1 ? 's' : ''}
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderCreateRoutineScreen = () => (
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
        <Image 
          source={require('../assets/images/Banner Night Routine 1.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.heroSection}>
            <Text style={styles.questionTitle}>
              Your <Text style={[styles.aiHighlight, { color: skinTypeInfo.color }]}>
                {routineData.name}
              </Text>{'\n'}Evening Routine
            </Text>
            <Text style={styles.questionSubtitle}>
              Choose the routine level that fits your skincare goals. Build your foundation first!
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
              <Text style={styles.reminderTitle}>Not sure about your skin type?</Text>
              <Text style={styles.reminderSubtitle}>Take our quick skin test for accurate results</Text>
            </View>
            <Text style={styles.reminderArrow}>→</Text>
          </TouchableOpacity>

          <View style={styles.routineLevelsContainer}>
            <Text style={styles.sectionTitle}>Choose Your Starting Level</Text>
            
            {/* Basic Card - ALWAYS UNLOCKED */}
            <TouchableOpacity
              style={[
                styles.routineCard,
                selectedLevel === 'basic' && [styles.routineCardSelected, { borderColor: skinTypeInfo.color }],
                hasNightRoutine && savedRoutineLevel === 'basic' && styles.routineCardSaved
              ]}
              onPress={() => handleRoutineCardPress('basic')}
            >
              <View style={styles.routineHeader}>
                <View style={[styles.routineBadge, { backgroundColor: '#E8F5E9' }]}>
                  <Text style={[styles.routineBadgeText, { color: BRAND_COLORS.primary }]}>
                    BASIC
                  </Text>
                </View>
                <View style={styles.routineHeaderRight}>
                  {hasNightRoutine && savedRoutineLevel === 'basic' && (
                    <View style={styles.savedBadge}>
                      <Text style={styles.savedBadgeText}>SAVED</Text>
                    </View>
                  )}
                  {selectedLevel === 'basic' && (
                    <View style={[styles.selectedIndicator, { backgroundColor: skinTypeInfo.color }]}>
                      <Text style={styles.selectedIndicatorText}>✓</Text>
                    </View>
                  )}
                </View>
              </View>
              <Text style={styles.routineTitle}>{routineData.basic.title}</Text>
              <Text style={styles.routineDescription}>{routineData.basic.description}</Text>
              
              <View style={styles.routineSteps}>
                <Text style={styles.stepsTitle}>Evening:</Text>
                {routineData.basic.steps.pm.map((step, index) => (
                  <Text key={index} style={styles.stepText}>• {step}</Text>
                ))}
              </View>

              <View style={styles.benefitsContainer}>
                {routineData.basic.keyBenefits.map((benefit, index) => (
                  <View key={index} style={styles.benefitPill}>
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>

            {/* Moderate Card - LOCKED UNTIL 1 WEEK */}
            <TouchableOpacity
              style={[
                styles.routineCard,
                selectedLevel === 'moderate' && [styles.routineCardSelected, { borderColor: skinTypeInfo.color }],
                hasNightRoutine && savedRoutineLevel === 'moderate' && styles.routineCardSaved,
                !isModerateUnlocked() && styles.routineCardLocked
              ]}
              onPress={() => handleRoutineCardPress('moderate')}
              activeOpacity={isModerateUnlocked() ? 0.7 : 1}
            >
              <View style={styles.routineHeader}>
                <View style={[styles.routineBadge, { backgroundColor: '#FFF4E5' }]}>
                  <Text style={[styles.routineBadgeText, { color: '#F39C12' }]}>
                    MODERATE
                  </Text>
                </View>
                <View style={styles.routineHeaderRight}>
                  {!isModerateUnlocked() && (
                    <View style={styles.lockBadge}>
                      <Image 
                        source={require('../assets/images/lock1.png')} 
                        style={styles.lockImage}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  {hasNightRoutine && savedRoutineLevel === 'moderate' && isModerateUnlocked() && (
                    <View style={styles.savedBadge}>
                      <Text style={styles.savedBadgeText}>SAVED</Text>
                    </View>
                  )}
                  {selectedLevel === 'moderate' && isModerateUnlocked() && (
                    <View style={[styles.selectedIndicator, { backgroundColor: skinTypeInfo.color }]}>
                      <Text style={styles.selectedIndicatorText}>✓</Text>
                    </View>
                  )}
                </View>
              </View>
              <Text style={styles.routineTitle}>{routineData.moderate.title}</Text>
              <Text style={styles.routineDescription}>{routineData.moderate.description}</Text>
              
              <View style={styles.routineSteps}>
                <Text style={styles.stepsTitle}>Evening:</Text>
                {routineData.moderate.steps.pm.slice(0, 3).map((step, index) => (
                  <Text key={index} style={styles.stepText}>• {step}</Text>
                ))}
                <Text style={styles.moreSteps}>+ additional steps</Text>
              </View>

              <View style={styles.benefitsContainer}>
                {routineData.moderate.keyBenefits.map((benefit, index) => (
                  <View key={index} style={styles.benefitPill}>
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>

              {!isModerateUnlocked() && (
                <View style={styles.lockOverlay}>
                  <Image 
                    source={require('../assets/images/lock1.png')} 
                    style={styles.lockOverlayImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.lockOverlayText}>Complete Basic Routine for 1 week to unlock</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Comprehensive Card - LOCKED UNTIL 2 WEEKS */}
            <TouchableOpacity
              style={[
                styles.routineCard,
                selectedLevel === 'comprehensive' && [styles.routineCardSelected, { borderColor: skinTypeInfo.color }],
                hasNightRoutine && savedRoutineLevel === 'comprehensive' && styles.routineCardSaved,
                !isComprehensiveUnlocked() && styles.routineCardLocked
              ]}
              onPress={() => handleRoutineCardPress('comprehensive')}
              activeOpacity={isComprehensiveUnlocked() ? 0.7 : 1}
            >
              <View style={styles.routineHeader}>
                <View style={[styles.routineBadge, { backgroundColor: '#F3E5F5' }]}>
                  <Text style={[styles.routineBadgeText, { color: '#9B59B6' }]}>
                    COMPREHENSIVE
                  </Text>
                </View>
                <View style={styles.routineHeaderRight}>
                  {!isComprehensiveUnlocked() && (
                    <View style={styles.lockBadge}>
                      <Image 
                        source={require('../assets/images/lock1.png')} 
                        style={styles.lockImage}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  {hasNightRoutine && savedRoutineLevel === 'comprehensive' && isComprehensiveUnlocked() && (
                    <View style={styles.savedBadge}>
                      <Text style={styles.savedBadgeText}>SAVED</Text>
                    </View>
                  )}
                  {selectedLevel === 'comprehensive' && isComprehensiveUnlocked() && (
                    <View style={[styles.selectedIndicator, { backgroundColor: skinTypeInfo.color }]}>
                      <Text style={styles.selectedIndicatorText}>✓</Text>
                    </View>
                  )}
                </View>
              </View>
              <Text style={styles.routineTitle}>{routineData.comprehensive.title}</Text>
              <Text style={styles.routineDescription}>{routineData.comprehensive.description}</Text>
              
              <View style={styles.routineSteps}>
                <Text style={styles.stepsTitle}>Full Treatment:</Text>
                {routineData.comprehensive.steps.pm.slice(0, 3).map((step, index) => (
                  <Text key={index} style={styles.stepText}>• {step}</Text>
                ))}
                <Text style={styles.moreSteps}>+ advanced treatments & more</Text>
              </View>

              <View style={styles.benefitsContainer}>
                {routineData.comprehensive.keyBenefits.map((benefit, index) => (
                  <View key={index} style={styles.benefitPill}>
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>

              {!isComprehensiveUnlocked() && (
                <View style={styles.lockOverlay}>
                  <Image 
                    source={require('../assets/images/lock1.png')} 
                    style={styles.lockOverlayImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.lockOverlayText}>Complete Moderate Routine for 2 weeks to unlock</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.trustSection}>
            <View style={styles.trustItem}>
              <Text style={styles.trustText}>• Science-backed formulations</Text>
            </View>
            <View style={styles.trustItem}>
              <Text style={styles.trustText}>• Personalized for your skin</Text>
            </View>
            <View style={styles.trustItem}>
              <Text style={styles.trustText}>• Results in 4-12 weeks</Text>
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
          Build your routine progressively - your skin will thank you!
        </Text>
      </View>

      {/* Lock Warning Modal - STYLED LIKE COMPLETION MODAL */}
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
              
              <Text style={styles.modalTitle}>Routine Locked</Text>
              <Text style={styles.modalMessage}>{lockMessage}</Text>
              
              <DrAcneButton
                title="Got it!"
                onPress={() => setShowLockModal(false)}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );

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
  bannerImage: {
    width: '100%',
    height: '100%',
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
  bannerButtonImage: {
    width: '100%',
    height: '100%',
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
  routineCardSaved: {
    backgroundColor: '#F8FFF8',
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
  routineHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  savedBadge: {
    backgroundColor: BRAND_COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  savedBadgeText: {
    color: BRAND_COLORS.white,
    fontSize: 10,
    fontWeight: '700',
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