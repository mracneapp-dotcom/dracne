// components/modals/SmartRoutineCompletionModal.js - UPDATED TO MATCH NIGHT ROUTINE STYLE
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
  softBlue: '#E3F2FD',
  smartBlue: '#82B2DF',
};

const DecorativeDots = () => {
  return (
    <Svg 
      width="100%" 
      height="100%" 
      style={styles.decorativeSvg}
      preserveAspectRatio="none"
    >
      <Circle cx="20" cy="30" r="8" fill="#B3D9F2" opacity="0.3" />
      <Circle cx="95%" cy="15%" r="12" fill="#A8D0E6" opacity="0.3" />
      <Circle cx="10%" cy="85%" r="10" fill="#A8D0E6" opacity="0.3" />
      <Circle cx="90%" cy="90%" r="8" fill="#B3D9F2" opacity="0.3" />
      <Circle cx="50%" cy="5%" r="6" fill="#B3D9F2" opacity="0.3" />
      <Circle cx="15%" cy="50%" r="6" fill="#A8D0E6" opacity="0.3" />
    </Svg>
  );
};

export default function SmartRoutineCompletionModal({ 
  visible, 
  onClose, 
  onViewRoutine,
  routineData 
}) {
  if (!routineData) return null;

  const { concernName, dayProducts = [], nightProducts = [] } = routineData;
  const morningProductName = dayProducts[0]?.name || 'No product selected';
  const eveningProductName = nightProducts[0]?.name || 'No product selected';

  const handleClose = () => {
    console.log('🏠 Closing smart routine modal');
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
              source={require('../../assets/images/Banner Smart Party.png')}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            
            <View style={[styles.levelBadgeOnBanner, { backgroundColor: BRAND_COLORS.smartBlue }]}>
              <Text style={styles.levelBadgeText}>Smart Routine</Text>
            </View>
          </View>

          <Text style={styles.title}>
            Your <Text style={[styles.titleEmphasis, { color: BRAND_COLORS.smartBlue }]}>
              Smart Routine
            </Text> is Ready!
          </Text>
          
          <Text style={styles.subtitle}>
            You're all set with your routine
          </Text>

          <View style={styles.recapContainer}>
            <Text style={styles.recapTitle}>
              Your 2-Step Smart Routine:
            </Text>

            <View style={styles.stepCard}>
              <Text style={styles.stepTitle}>Step 1: Morning</Text>
              <Text style={[styles.productName, !dayProducts[0] && styles.emptyText]}>
                {morningProductName}
              </Text>
            </View>

            <View style={styles.stepCard}>
              <Text style={styles.stepTitle}>Step 2: Evening</Text>
              <Text style={[styles.productName, !nightProducts[0] && styles.emptyText]}>
                {eveningProductName}
              </Text>
            </View>
          </View>

          <View style={[styles.proofContainer, { backgroundColor: `${BRAND_COLORS.smartBlue}10` }]}>
            <Text style={[styles.proofText, { color: BRAND_COLORS.smartBlue }]}>
              You'll find your complete routine under "Smart Routine Hub"
            </Text>
            <Text style={styles.disclaimerText}>
              Access it anytime you need it!
            </Text>
          </View>

          <TouchableOpacity
            onPress={onViewRoutine || handleClose}
            style={[styles.primaryButton, { backgroundColor: BRAND_COLORS.smartBlue, shadowColor: BRAND_COLORS.smartBlue }]}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              View My Smart Routine
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleClose}
            style={[styles.secondaryButton, { borderColor: BRAND_COLORS.smartBlue }]}
            activeOpacity={0.8}
          >
            <Text style={[styles.secondaryButtonText, { color: BRAND_COLORS.smartBlue }]}>
              Start My Journey
            </Text>
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
    backgroundColor: BRAND_COLORS.softBlue,
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
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    lineHeight: 17,
  },
  emptyText: {
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    fontStyle: 'italic',
  },
  proofContainer: {
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 14,
    marginHorizontal: 20,
  },
  proofText: {
    fontSize: 13,
    fontWeight: '600',
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
    paddingVertical: 14,
    borderRadius: 28,
    marginBottom: 10,
    alignItems: 'center',
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
    paddingVertical: 12,
    borderRadius: 28,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
});