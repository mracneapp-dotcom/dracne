// components/modals/SmartRoutineSuggestionModal.js - UPDATED WITH ICON POSITION & HOME BUTTON
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
  black: '#000000',
  white: '#FFFFFF',
  gray: '#999999',
  darkGray: '#666666',
  lightGray: '#E5E5E5',
  softBlue: '#E3F2FD',
  smartBlue: '#82B2DF',
};

const CONCERN_INFO = {
  nodules: { name: 'Inflamed Acne', color: '#FF7A7A', icon: require('../../assets/images/Nodule.png') },
  papules: { name: 'Papules & Pustules', color: '#F39C12', icon: require('../../assets/images/Papule.png') },
  blackheads: { name: 'Blackheads', color: '#4A90E2', icon: require('../../assets/images/Blackhead.png') },
  whiteheads: { name: 'Whiteheads', color: '#7CB342', icon: require('../../assets/images/Whitehead.png') },
  marks: { name: 'Dark Spots & Marks', color: '#9B59B6', icon: require('../../assets/images/Mark.png') },
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

export default function SmartRoutineSuggestionModal({ 
  visible, 
  onClose, 
  onCreateRoutine,
  selectedConcern 
}) {
  const concernData = selectedConcern ? CONCERN_INFO[selectedConcern] : null;

  if (!concernData) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
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
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <View style={styles.bannerContainer}>
            <Image
              source={require('../../assets/images/Banner Smart Routine.png')}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </View>

          {/* Concern Icon BELOW banner, BEFORE title */}
          <View style={styles.iconContainer}>
            <View style={[styles.concernIconBg, { backgroundColor: `${concernData.color}20` }]}>
              <Image 
                source={concernData.icon}
                style={[styles.concernIcon, { tintColor: concernData.color }]}
                resizeMode="contain"
              />
            </View>
          </View>

          <Text style={styles.title}>Create Smart Routine?</Text>
          
          <Text style={styles.subtitle}>
            We can help you target your <Text style={[styles.concernName, { color: BRAND_COLORS.smartBlue }]}>{concernData.name}</Text> with personalized product recommendations.
          </Text>

          <View style={styles.benefitsContainer}>
            <View style={styles.benefitRow}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.benefitText}>Targeted treatments for your specific concern</Text>
            </View>
            <View style={styles.benefitRow}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.benefitText}>Complements your existing routines</Text>
            </View>
            <View style={styles.benefitRow}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.benefitText}>Day & night product options</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.createButton, { backgroundColor: BRAND_COLORS.smartBlue, shadowColor: BRAND_COLORS.smartBlue }]}
            onPress={onCreateRoutine}
            activeOpacity={0.8}
          >
            <Text style={styles.createButtonText}>Create Smart Routine</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.skipButton, { borderColor: BRAND_COLORS.smartBlue }]}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={[styles.skipButtonText, { color: BRAND_COLORS.smartBlue }]}>Go Back Home</Text>
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
    marginBottom: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  concernIconBg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 14,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  concernName: {
    fontWeight: '700',
  },
  benefitsContainer: {
    width: '100%',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 20,
    alignSelf: 'center',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkmark: {
    fontSize: 16,
    color: BRAND_COLORS.primary,
    marginRight: 10,
    fontWeight: '700',
  },
  benefitText: {
    flex: 1,
    fontSize: 13,
    color: BRAND_COLORS.black,
    lineHeight: 18,
  },
  createButton: {
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
  createButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: BRAND_COLORS.white,
  },
  skipButton: {
    backgroundColor: BRAND_COLORS.white,
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 28,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  skipButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
});