// components/modals/SmartRoutineSuggestionModal.js
import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#999999',
  darkGray: '#666666',
  smartBlue: '#82b2df',
};

const CONCERN_INFO = {
  nodules: { name: 'Inflamed Acne', color: '#FF7A7A', icon: require('../../assets/images/Nodule.png') },
  papules: { name: 'Papules & Pustules', color: '#F39C12', icon: require('../../assets/images/Papule.png') },
  blackheads: { name: 'Blackheads', color: '#4A90E2', icon: require('../../assets/images/Blackhead.png') },
  whiteheads: { name: 'Whiteheads', color: '#7CB342', icon: require('../../assets/images/Whitehead.png') },
  marks: { name: 'Dark Spots & Marks', color: '#9B59B6', icon: require('../../assets/images/Mark.png') },
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
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

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
          
          <Text style={styles.message}>
            We can help you target your <Text style={[styles.concernName, { color: concernData.color }]}>{concernData.name}</Text> with personalized product recommendations.
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
            style={[styles.createButton, { backgroundColor: concernData.color }]}
            onPress={onCreateRoutine}
            activeOpacity={0.8}
          >
            <Text style={styles.createButtonText}>Create Smart Routine</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.skipButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={styles.skipButtonText}>Maybe Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BRAND_COLORS.cream,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeText: {
    fontSize: 18,
    fontWeight: '600',
    color: BRAND_COLORS.darkGray,
  },
  iconContainer: {
    marginBottom: 16,
    marginTop: 10,
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
    marginBottom: 12,
  },
  message: {
    fontSize: 15,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  concernName: {
    fontWeight: '700',
  },
  benefitsContainer: {
    width: '100%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
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
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.white,
  },
  skipButton: {
    paddingVertical: 12,
  },
  skipButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.gray,
  },
});