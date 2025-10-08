// app/onboardingScreens/OnboardingPlanReady.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { DrAcneButton } from '../../components/ui/DrAcneButton';
import { getRoutinesForSkinType } from '../../constants/routinesData';

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
  oily: { image: require('../../assets/images/Oily.png'), color: '#4A90E2' },
  dry: { image: require('../../assets/images/Dry.png'), color: '#F39C12' },
  combination: { image: require('../../assets/images/Combination.png'), color: BRAND_COLORS.primary },
  normal: { image: require('../../assets/images/Normal.png'), color: '#9B59B6' },
  sensitive: { image: require('../../assets/images/Sensitive.png'), color: BRAND_COLORS.primary },
};

export default function OnboardingPlanReady({ onNext }) {
  const [skinType, setSkinType] = useState('normal');
  const [routineData, setRoutineData] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('moderate');

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    loadSkinType();

    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.8,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    );

    pulseAnimation.start();
    glowAnimation.start();

    return () => {
      pulseAnimation.stop();
      glowAnimation.stop();
    };
  }, []);

  const loadSkinType = async () => {
    try {
      const savedSkinType = await AsyncStorage.getItem('userSkinType');
      if (savedSkinType) {
        setSkinType(savedSkinType);
        const routines = getRoutinesForSkinType(savedSkinType);
        setRoutineData(routines);
        console.log('✅ Loaded skin type:', savedSkinType);
      }
    } catch (error) {
      console.error('Error loading skin type:', error);
    }
  };

  const handleGetStarted = async () => {
    // Save the selected routine level
    try {
      await AsyncStorage.setItem('selectedRoutineLevel', selectedLevel);
      console.log('✅ Saved routine level:', selectedLevel);
    } catch (error) {
      console.error('Error saving routine level:', error);
    }
    
    onNext('onboardingReminders', { ready: true, routineLevel: selectedLevel });
  };

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;

  if (!routineData) {
    return null; // Loading state
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={[
            styles.content,
            { transform: [{ scale: scaleAnim }] }
          ]}
        >
          {/* Skin Type Icon */}
          <Animated.View 
            style={[
              styles.aiIconContainer,
              { transform: [{ scale: pulseAnim }] }
            ]}
          >
            <View style={styles.aiIcon}>
              <Image 
                source={skinTypeInfo.image}
                style={styles.skinTypeImage}
                resizeMode="contain"
              />
              <Animated.View 
                style={[
                  styles.glowRing,
                  { 
                    opacity: glowAnim,
                    borderColor: skinTypeInfo.color 
                  }
                ]}
              />
            </View>
          </Animated.View>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Text style={styles.questionTitle}>
              Your <Text style={[styles.aiHighlight, { color: skinTypeInfo.color }]}>
                {routineData.name}
              </Text>{'\n'}routine is ready!
            </Text>
            <Text style={styles.questionSubtitle}>
              {routineData.description}
            </Text>
          </View>

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
        </Animated.View>
      </ScrollView>

      {/* Fixed Bottom Section */}
      <View style={styles.bottomSection}>
        <DrAcneButton
          title="Let's Do This!"
          onPress={handleGetStarted}
          style={styles.getStartedButton}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 5,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  aiIconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  aiIcon: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skinTypeImage: {
    width: 60,
    height: 60,
  },
  glowRing: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 14,
  },
  questionTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 4,
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
    marginBottom: 6,
  },
  trustItem: {
    marginBottom: 2,
  },
  trustText: {
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    lineHeight: 16,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 25,
    paddingTop: 8,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  getStartedButton: {
    marginBottom: 6,
    width: '100%',
  },
  helperText: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    fontWeight: '500',
  },
});