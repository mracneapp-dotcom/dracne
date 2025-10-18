// components/modals/RoutineCompletionModal.js - WITH MODERATE NIGHT STEP 3
import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  white: '#FFFFFF',
  black: '#000000',
  darkGray: '#666666',
  lightGray: '#E5E5E5',
  softGreen: '#E8F5E9',
};

const ROUTINE_LEVEL_COLORS = {
  basic: '#4A90E2',
  moderate: '#F39C12',
  comprehensive: '#9B59B6',
};

const DecorativeDots = () => (
  <Svg 
    width="100%" 
    height="100%" 
    style={styles.decorativeSvg}
    preserveAspectRatio="none"
  >
    <Circle cx="20" cy="30" r="8" fill="#D4E9D4" opacity="0.3" />
    <Circle cx="95%" cy="15%" r="12" fill="#FFB3B3" opacity="0.3" />
    <Circle cx="10%" cy="85%" r="10" fill="#FFB3B3" opacity="0.3" />
    <Circle cx="90%" cy="90%" r="8" fill="#D4E9D4" opacity="0.3" />
    <Circle cx="50%" cy="5%" r="6" fill="#D4E9D4" opacity="0.3" />
    <Circle cx="15%" cy="50%" r="6" fill="#FFB3B3" opacity="0.3" />
  </Svg>
);

export default function RoutineCompletionModal({
  visible,
  onClose,
  onViewRoutine,
  routineData,
  routineType = 'basic',
  isNightRoutine = false,
}) {
  console.log('🎉 MODAL RENDERING - visible:', visible);
  console.log('🎉 MODAL routineData:', routineData);
  console.log('🎉 MODAL routineType:', routineType);
  console.log('🎉 MODAL isNightRoutine:', isNightRoutine);

  const cleansers = routineData?.cleansers || [];
  const moisturizers = routineData?.moisturizers || [];
  const specializedProducts = routineData?.specializedProducts || [];
  const advancedTreatments = routineData?.advancedTreatments || [];
  const sunscreens = routineData?.sunscreens || [];
  const poreCare = routineData?.poreCare || [];

  const isNight = isNightRoutine || (sunscreens.length === 0);
  
  const isComprehensive = routineType === 'comprehensive';
  const isModerate = routineType === 'moderate';
  const dayStepCount = isComprehensive ? 5 : (isModerate ? 4 : 3);
  
  const nightStepCount = isModerate ? 3 : 2;
  
  const stepCount = isNight ? nightStepCount : dayStepCount;
  
  const levelColor = ROUTINE_LEVEL_COLORS[routineType] || ROUTINE_LEVEL_COLORS.basic;
  const levelText = isComprehensive ? 'Comprehensive' : (isModerate ? 'Moderate' : 'Basic');

  const handleClose = () => {
    console.log('🏠 Closing modal - navigating to HomeScreen');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableOpacity 
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleClose}
      >
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={(e) => e.stopPropagation()}
          style={styles.modalContainer}
        >
          <View style={styles.backgroundContainer}>
            <DecorativeDots />
          </View>

          <TouchableOpacity 
            style={styles.closeButton}
            onPress={handleClose}
            activeOpacity={0.7}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <View style={styles.bannerContainer}>
            <Image
              source={require('../../assets/images/Banner Party.png')}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            
            <View style={[styles.levelBadgeOnBanner, { backgroundColor: levelColor }]}>
              <Text style={styles.levelBadgeText}>{levelText} Routine</Text>
            </View>
          </View>

          <Text style={styles.title}>
            Your <Text style={styles.titleEmphasis}>
              {isNight ? 'Night Routine' : 'Day Routine'}
            </Text> is Ready!
          </Text>
          
          <Text style={styles.subtitle}>
            {isNight 
              ? "You're all set with your evening routine"
              : (isComprehensive 
                ? "You're all set with your comprehensive routine"
                : (isModerate 
                  ? "You're all set with your enhanced routine" 
                  : "You're all set for your skincare journey"
                )
              )
            }
          </Text>

          <View style={styles.recapContainer}>
            <Text style={styles.recapTitle}>
              Your {stepCount}-Step {isNight ? 'Evening' : 'Morning'} Routine:
            </Text>

            <View style={styles.stepCard}>
              <Text style={styles.stepTitle}>Step 1: Cleanser</Text>
              {cleansers.length > 0 ? (
                <View style={styles.productBox}>
                  <Text style={styles.productName}>{cleansers[0].name}</Text>
                  <Text style={styles.productDescription}>{cleansers[0].description}</Text>
                </View>
              ) : (
                <Text style={styles.emptyText}>No cleanser selected</Text>
              )}
            </View>

            <View style={styles.stepCard}>
              <Text style={styles.stepTitle}>Step 2: {isNight ? 'Night Moisturizer' : 'Moisturizer'}</Text>
              {moisturizers.length > 0 ? (
                <View style={styles.productBox}>
                  <Text style={styles.productName}>{moisturizers[0].name}</Text>
                  <Text style={styles.productDescription}>{moisturizers[0].description}</Text>
                </View>
              ) : (
                <Text style={styles.emptyText}>No moisturizer selected</Text>
              )}
            </View>

            {isNight && isModerate && (
              <View style={styles.stepCard}>
                <Text style={styles.stepTitle}>Step 3: Pore Care Treatment</Text>
                {poreCare.length > 0 ? (
                  <View style={styles.productBox}>
                    <Text style={styles.productName}>{poreCare[0].name}</Text>
                    <Text style={styles.productDescription}>{poreCare[0].description}</Text>
                  </View>
                ) : (
                  <Text style={styles.emptyText}>No pore care product selected</Text>
                )}
              </View>
            )}

            {!isNight && (isModerate || isComprehensive) && (
              <View style={styles.stepCard}>
                <Text style={styles.stepTitle}>Step 3: Specialized Treatment</Text>
                {specializedProducts.length > 0 ? (
                  <View style={styles.productBox}>
                    <Text style={styles.productName}>{specializedProducts[0].name}</Text>
                    <Text style={styles.productDescription}>{specializedProducts[0].description}</Text>
                  </View>
                ) : (
                  <Text style={styles.emptyText}>No specialized product selected</Text>
                )}
              </View>
            )}

            {!isNight && isComprehensive && (
              <View style={styles.stepCard}>
                <Text style={styles.stepTitle}>Step 4: Advanced Treatment</Text>
                {advancedTreatments.length > 0 ? (
                  <View style={styles.productBox}>
                    <Text style={styles.productName}>{advancedTreatments[0].name}</Text>
                    <Text style={styles.productDescription}>{advancedTreatments[0].description}</Text>
                  </View>
                ) : (
                  <Text style={styles.emptyText}>No advanced treatment selected</Text>
                )}
              </View>
            )}

            {!isNight && (
              <View style={styles.stepCard}>
                <Text style={styles.stepTitle}>Step {dayStepCount}: Sunscreen</Text>
                {sunscreens.length > 0 ? (
                  <View style={styles.productBox}>
                    <Text style={styles.productName}>{sunscreens[0].name}</Text>
                    <Text style={styles.productDescription}>{sunscreens[0].description}</Text>
                  </View>
                ) : (
                  <Text style={styles.emptyText}>No sunscreen selected</Text>
                )}
              </View>
            )}
          </View>

          <View style={styles.proofContainer}>
            <Text style={styles.proofText}>
              You'll find your complete routine under "{isNight ? 'My Night Routine' : 'My Day Routine'}"
            </Text>
            <Text style={styles.disclaimerText}>
              Access it anytime you need it!
            </Text>
          </View>

          <TouchableOpacity
            onPress={onViewRoutine}
            style={styles.primaryButton}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              View My {isNight ? 'Night' : 'Day'} Routine
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleClose}
            style={styles.secondaryButton}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Start My Journey</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: BRAND_COLORS.softGreen,
    borderRadius: 24,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 20,
    width: '100%',
    maxWidth: 400,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
  },
  decorativeSvg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: BRAND_COLORS.darkGray,
    lineHeight: 18,
  },
  bannerContainer: {
    width: '100%',
    height: 100,
    marginBottom: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  levelBadgeOnBanner: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: BRAND_COLORS.white,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 28,
    paddingHorizontal: 20,
  },
  titleEmphasis: {
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    color: BRAND_COLORS.darkGray,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  recapContainer: {
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  recapTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 10,
    textAlign: 'center',
  },
  stepCard: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 6,
  },
  productBox: {
    paddingLeft: 0,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 2,
    lineHeight: 17,
  },
  productDescription: {
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    lineHeight: 16,
  },
  emptyText: {
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    fontStyle: 'italic',
  },
  proofContainer: {
    backgroundColor: `${BRAND_COLORS.primary}10`,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 14,
    marginHorizontal: 20,
  },
  proofText: {
    fontSize: 13,
    fontWeight: '600',
    color: BRAND_COLORS.primary,
    textAlign: 'center',
    marginBottom: 4,
    lineHeight: 18,
  },
  disclaimerText: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    lineHeight: 15,
  },
  primaryButton: {
    backgroundColor: BRAND_COLORS.primary,
    paddingVertical: 14,
    borderRadius: 28,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginHorizontal: 20,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: BRAND_COLORS.white,
  },
  secondaryButton: {
    backgroundColor: BRAND_COLORS.white,
    borderWidth: 2,
    borderColor: BRAND_COLORS.primary,
    paddingVertical: 12,
    borderRadius: 28,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: BRAND_COLORS.primary,
  },
});