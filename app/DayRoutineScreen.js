// app/DayRoutineScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Image,
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

export default function DayRoutineScreen({ onBack, onSelectRoutine, onNavigateToSkinTest }) {
  const [skinType, setSkinType] = useState('normal');
  const [routineData, setRoutineData] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('moderate');

  useEffect(() => {
    loadSkinTypeAndRoutine();
  }, []);

  const loadSkinTypeAndRoutine = async () => {
    try {
      const savedSkinType = await AsyncStorage.getItem('userSkinType');
      const savedRoutineLevel = await AsyncStorage.getItem('selectedRoutineLevel');
      
      if (savedSkinType) {
        setSkinType(savedSkinType);
        const routines = getRoutinesForSkinType(savedSkinType);
        setRoutineData(routines);
        console.log('✅ Loaded skin type:', savedSkinType);
      }
      
      if (savedRoutineLevel) {
        setSelectedLevel(savedRoutineLevel);
        console.log('✅ Loaded saved routine level:', savedRoutineLevel);
      }
    } catch (error) {
      console.error('Error loading skin type:', error);
    }
  };

  const handleSaveRoutine = async () => {
    try {
      await AsyncStorage.setItem('selectedRoutineLevel', selectedLevel);
      console.log('✅ Saved routine level:', selectedLevel);
      
      if (onSelectRoutine) {
        onSelectRoutine(selectedLevel, 'morning', routineData[selectedLevel]);
      }
      
      if (onBack) {
        onBack();
      }
    } catch (error) {
      console.error('Error saving routine level:', error);
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

  return (
    <View style={styles.container}>
      {/* Top Navigation with Logo */}
      <View style={styles.topNavigation}>
        <TouchableOpacity onPress={onBack} style={styles.logoButton}>
          <Image 
            source={require('../assets/images/dracne-logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Banner Image */}
      <View style={styles.bannerContainer}>
        <Image 
          source={require('../assets/images/Banner Day Routine 1.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.questionTitle}>
              Your <Text style={[styles.aiHighlight, { color: skinTypeInfo.color }]}>
                {routineData.name}
              </Text>{'\n'}Morning Routine
            </Text>
            <Text style={styles.questionSubtitle}>
              Choose the routine level that fits your skincare goals. You can upgrade anytime!
            </Text>
          </View>

          {/* SKIN TEST REMINDER - NO EMOJI */}
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

          {/* Routine Level Selection */}
          <View style={styles.routineLevelsContainer}>
            <Text style={styles.sectionTitle}>Choose Your Starting Level</Text>
            
            {/* Basic Card */}
            <TouchableOpacity
              style={[
                styles.routineCard,
                selectedLevel === 'basic' && [styles.routineCardSelected, { borderColor: skinTypeInfo.color }]
              ]}
              onPress={() => setSelectedLevel('basic')}
            >
              <View style={styles.routineHeader}>
                <View style={[styles.routineBadge, { backgroundColor: '#E8F5E9' }]}>
                  <Text style={[styles.routineBadgeText, { color: BRAND_COLORS.primary }]}>
                    BASIC
                  </Text>
                </View>
                {selectedLevel === 'basic' && (
                  <View style={[styles.selectedIndicator, { backgroundColor: skinTypeInfo.color }]}>
                    <Text style={styles.selectedIndicatorText}>✓</Text>
                  </View>
                )}
              </View>
              <Text style={styles.routineTitle}>{routineData.basic.title}</Text>
              <Text style={styles.routineDescription}>{routineData.basic.description}</Text>
              
              <View style={styles.routineSteps}>
                <Text style={styles.stepsTitle}>Morning:</Text>
                {routineData.basic.steps.am.map((step, index) => (
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

            {/* Moderate Card */}
            <TouchableOpacity
              style={[
                styles.routineCard,
                selectedLevel === 'moderate' && [styles.routineCardSelected, { borderColor: skinTypeInfo.color }]
              ]}
              onPress={() => setSelectedLevel('moderate')}
            >
              <View style={styles.routineHeader}>
                <View style={[styles.routineBadge, { backgroundColor: '#FFF4E5' }]}>
                  <Text style={[styles.routineBadgeText, { color: '#F39C12' }]}>
                    MODERATE
                  </Text>
                </View>
                {selectedLevel === 'moderate' && (
                  <View style={[styles.selectedIndicator, { backgroundColor: skinTypeInfo.color }]}>
                    <Text style={styles.selectedIndicatorText}>✓</Text>
                  </View>
                )}
              </View>
              <Text style={styles.routineTitle}>{routineData.moderate.title}</Text>
              <Text style={styles.routineDescription}>{routineData.moderate.description}</Text>
              
              <View style={styles.routineSteps}>
                <Text style={styles.stepsTitle}>Morning:</Text>
                {routineData.moderate.steps.am.slice(0, 3).map((step, index) => (
                  <Text key={index} style={styles.stepText}>• {step}</Text>
                ))}
                <Text style={styles.moreSteps}>+ evening routine</Text>
              </View>

              <View style={styles.benefitsContainer}>
                {routineData.moderate.keyBenefits.map((benefit, index) => (
                  <View key={index} style={styles.benefitPill}>
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>

            {/* Comprehensive Card */}
            <TouchableOpacity
              style={[
                styles.routineCard,
                selectedLevel === 'comprehensive' && [styles.routineCardSelected, { borderColor: skinTypeInfo.color }]
              ]}
              onPress={() => setSelectedLevel('comprehensive')}
            >
              <View style={styles.routineHeader}>
                <View style={[styles.routineBadge, { backgroundColor: '#F3E5F5' }]}>
                  <Text style={[styles.routineBadgeText, { color: '#9B59B6' }]}>
                    COMPREHENSIVE
                  </Text>
                </View>
                {selectedLevel === 'comprehensive' && (
                  <View style={[styles.selectedIndicator, { backgroundColor: skinTypeInfo.color }]}>
                    <Text style={styles.selectedIndicatorText}>✓</Text>
                  </View>
                )}
              </View>
              <Text style={styles.routineTitle}>{routineData.comprehensive.title}</Text>
              <Text style={styles.routineDescription}>{routineData.comprehensive.description}</Text>
              
              <View style={styles.routineSteps}>
                <Text style={styles.stepsTitle}>Full Treatment:</Text>
                {routineData.comprehensive.steps.am.slice(0, 3).map((step, index) => (
                  <Text key={index} style={styles.stepText}>• {step}</Text>
                ))}
                <Text style={styles.moreSteps}>+ advanced actives & more</Text>
              </View>

              <View style={styles.benefitsContainer}>
                {routineData.comprehensive.keyBenefits.map((benefit, index) => (
                  <View key={index} style={styles.benefitPill}>
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          </View>

          {/* Trust Indicators */}
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

          {/* Bottom spacing before fixed button */}
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      {/* Fixed Bottom Section */}
      <View style={styles.bottomSection}>
        <DrAcneButton
          title={getButtonText()}
          onPress={handleSaveRoutine}
          style={styles.saveButton}
        />
        
        <Text style={styles.helperText}>
          You can change your routine level anytime
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
  // SKIN TEST REMINDER - NO EMOJI
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
    bottom: 12,
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
});