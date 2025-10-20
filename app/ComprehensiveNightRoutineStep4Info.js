// app/ComprehensiveNightRoutineStep4Info.js
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
  oily: { color: '#4A90E2', name: 'Oily Skin' },
  dry: { color: '#F39C12', name: 'Dry Skin' },
  combination: { color: BRAND_COLORS.primary, name: 'Combination Skin' },
  normal: { color: '#9B59B6', name: 'Normal Skin' },
  sensitive: { color: BRAND_COLORS.primary, name: 'Sensitive Skin' },
};

const STEP_4_CONTENT = {
  oily: {
    title: 'Advanced Evening Treatment',
    subtitle: 'Night Step 4 (2-3x per week)',
    icon: require('../assets/images/jar cream.png'),
    introTitle: 'Intensive Pore Refinement',
    introText: 'Retinoids provide powerful pore refinement and texture improvement for oily skin. Start slowly and buffer if needed to build tolerance.',
    explanationTitle: 'How to use',
    explanationText: 'Apply 2-3 times per week after pore care treatment. Consider adapalene if acne-prone. Always use sandwich method: moisturizer → wait 5 min → retinoid → wait → moisturizer.',
    warningTitle: 'Important Guidelines',
    warningText: 'Start 2-3x per week\nUse in evening only\nMandatory SPF during day\nNo waxing while using retinoids',
  },
  dry: {
    title: 'Restorative Night Treatment',
    subtitle: 'Night Step 4',
    icon: require('../assets/images/jar cream.png'),
    introTitle: 'Deep Repair & Renewal',
    introText: 'Buffered retinoids or peptide serums provide anti-aging benefits while supporting barrier health. Choose peptides if skin is too reactive for retinoids.',
    explanationTitle: 'How to use',
    explanationText: 'Apply after hydrating essence. If using retinoid, buffer heavily: moisturizer → wait → retinoid → rich cream. Peptides can be used more frequently without buffering.',
    warningTitle: 'Gentle Approach',
    warningText: 'Always buffer retinoids on dry skin\nPeptides are gentler alternative\nUse rich moisturizer on top\nMonitor for any irritation',
  },
  combination: {
    title: 'Zone-Targeted Night Treatment',
    subtitle: 'Night Step 4',
    icon: require('../assets/images/jar cream.png'),
    introTitle: 'Balanced Evening Care',
    introText: 'Zone-specific retinoid application provides targeted treatment without over-drying. Buffer on dry areas, lighter application on T-zone.',
    explanationTitle: 'How to use',
    explanationText: 'Apply retinoid lightly on T-zone, buffer heavily on dry cheek areas. This zone-specific approach prevents over-treatment while providing benefits where needed.',
    warningTitle: 'Zone Application',
    warningText: 'T-zone: lighter application\nCheeks: buffer with moisturizer\nStart 2-3x per week\nAdjust based on zone response',
  },
  normal: {
    title: 'Premium Night Treatment',
    subtitle: 'Night Step 4',
    icon: require('../assets/images/jar cream.png'),
    introTitle: 'Professional Anti-Aging Care',
    introText: 'Your healthy skin can handle potent retinoids or peptide night creams for maximum anti-aging benefits. Choose based on tolerance and goals.',
    explanationTitle: 'How to use',
    explanationText: 'Start with retinoid 2-3 times per week, increasing as tolerated. Peptide night creams can be used more frequently. Results visible after 12+ weeks of consistent use.',
    warningTitle: 'Advanced Protocol',
    warningText: 'Build tolerance gradually\nAlways use SPF during day\nResults take 12+ weeks\nConsistent use is key',
  },
  sensitive: {
    title: 'Ultra-Gentle Night Boost',
    subtitle: 'Night Step 4',
    icon: require('../assets/images/jar cream.png'),
    introTitle: 'Barrier-Friendly Enhancement',
    introText: 'Rich ceramide creams or gentle bakuchiol alternatives provide benefits without irritation. Postpone traditional retinoids until barrier stays consistently calm.',
    explanationTitle: 'How to use',
    explanationText: 'Apply after soothing serum. Ceramide creams strengthen barrier while gentle peptides or bakuchiol provide mild anti-aging benefits without retinoid irritation risk.',
    warningTitle: 'Safety First',
    warningText: 'Avoid traditional retinoids until barrier stable\nBakuchiol is gentle alternative\nFocus on barrier support\nResults come slowly but safely',
  },
};

export default function ComprehensiveNightRoutineStep4Info({ 
  onNavigateHome,
  onNavigateToNightRoutine,
  onBack, 
  onContinue, 
  currentStep = 4,
  internalStep = 7
}) {
  const [skinType, setSkinType] = useState('normal');

  useEffect(() => {
    loadSkinType();
  }, []);

  const loadSkinType = async () => {
    try {
      const savedSkinType = await AsyncStorage.getItem('userSkinType');
      if (savedSkinType) {
        setSkinType(savedSkinType);
      }
    } catch (error) {
      console.error('Error loading skin type:', error);
    }
  };

  const handlePreviousStep = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleNextStep = () => {
    if (onContinue) {
      onContinue();
    }
  };

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;
  const content = STEP_4_CONTENT[skinType] || STEP_4_CONTENT.normal;
  const totalSteps = 4;
  const totalInternalSteps = 8;

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

      <TouchableOpacity 
        style={styles.bannerContainer}
        onPress={onNavigateToNightRoutine}
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
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <TouchableOpacity
                onPress={handlePreviousStep}
                style={styles.arrowButton}
                activeOpacity={0.7}
              >
                <Text style={styles.arrowText}>‹</Text>
              </TouchableOpacity>

              <Text style={styles.progressText}>Step {currentStep} of {totalSteps}</Text>

              <TouchableOpacity
                onPress={handleNextStep}
                style={styles.arrowButton}
                activeOpacity={0.7}
              >
                <Text style={styles.arrowText}>›</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(internalStep / totalInternalSteps) * 100}%` }]} />
            </View>
          </View>

          <View style={[styles.skinTypeBadge, { backgroundColor: `${skinTypeInfo.color}15` }]}>
            <Text style={[styles.skinTypeText, { color: skinTypeInfo.color }]}>
              For {skinTypeInfo.name}
            </Text>
          </View>

          <View style={styles.productHeader}>
            <View style={styles.productIconContainer}>
              <Image 
                source={content.icon}
                style={styles.productIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.productTextContainer}>
              <Text style={styles.productTitle}>{content.title}</Text>
              <Text style={styles.productSubtitle}>{content.subtitle}</Text>
            </View>
          </View>

          <View style={styles.introBox}>
            <Text style={styles.introTitle}>{content.introTitle}</Text>
            <Text style={styles.introText}>{content.introText}</Text>
          </View>

          <View style={styles.explanationBox}>
            <Text style={styles.explanationTitle}>{content.explanationTitle}</Text>
            <Text style={styles.explanationText}>{content.explanationText}</Text>
          </View>

          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>{content.warningTitle}</Text>
            <Text style={styles.warningText}>{content.warningText}</Text>
          </View>

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title="See Product Recommendations"
          onPress={handleNextStep}
          style={styles.continueButton}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: '600',
    color: BRAND_COLORS.primary,
    lineHeight: 28,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.darkGray,
    textAlign: 'center',
    minWidth: 100,
  },
  progressBar: {
    height: 6,
    backgroundColor: BRAND_COLORS.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: BRAND_COLORS.primary,
    borderRadius: 3,
  },
  skinTypeBadge: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  skinTypeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  productIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productIcon: {
    width: 45,
    height: 45,
  },
  productTextContainer: {
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 4,
  },
  productSubtitle: {
    fontSize: 14,
    color: BRAND_COLORS.gray,
    fontWeight: '500',
  },
  introBox: {
    backgroundColor: `${BRAND_COLORS.primary}10`,
    borderLeftWidth: 4,
    borderLeftColor: BRAND_COLORS.primary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 6,
  },
  introText: {
    fontSize: 13,
    color: BRAND_COLORS.darkGray,
    lineHeight: 19,
  },
  explanationBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  explanationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 6,
  },
  explanationText: {
    fontSize: 13,
    color: BRAND_COLORS.darkGray,
    lineHeight: 19,
  },
  warningBox: {
    backgroundColor: '#FFF9E6',
    borderLeftWidth: 4,
    borderLeftColor: '#F39C12',
    borderRadius: 8,
    padding: 16,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#B8860B',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    lineHeight: 18,
  },
  bottomSpacing: {
    height: 80,
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
  },
});