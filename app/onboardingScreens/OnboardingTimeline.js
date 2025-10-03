// app/onboardingScreens/OnboardingTimeline.js
import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

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

const responses = {
  'weeks_2_4': "Love the optimism! Reality check: real changes happen around 8-12 weeks. But trust the process!",
  'months_2_3': "YES! You understand that good things take time. This mindset will serve you well on your journey",
  'months_6_plus': "You're in this for the long haul! That patience will pay off big time"
};

export default function OnboardingTimeline({ onNext }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const showResponse = (response) => {
    setResponseText(response);
    setShowResponseModal(true);
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowResponseModal(false);
          onNext('onboardingResultsTimeline', { timeline: selectedOption });
        });
      }, 3500);
    });
  };

  const handleContinue = () => {
    if (selectedOption) {
      const response = responses[selectedOption];
      showResponse(response);
    }
  };

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.questionTitle}>Real talk: How long do you think skin transformation takes?</Text>
          <Text style={styles.questionSubtitle}>
            Setting the right expectations is key to success
          </Text>
        </View>

        <View style={styles.optionsSection}>
          <TouchableOpacity 
            style={[styles.optionButton, selectedOption === 'weeks_2_4' && styles.selectedOption]}
            onPress={() => handleOptionSelect('weeks_2_4')}
          >
            <Text style={[styles.optionText, selectedOption === 'weeks_2_4' && styles.selectedOptionText]}>
              2-4 weeks
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.optionButton, selectedOption === 'months_2_3' && styles.selectedOption]}
            onPress={() => handleOptionSelect('months_2_3')}
          >
            <Text style={[styles.optionText, selectedOption === 'months_2_3' && styles.selectedOptionText]}>
              2-3 months
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.optionButton, selectedOption === 'months_6_plus' && styles.selectedOption]}
            onPress={() => handleOptionSelect('months_6_plus')}
          >
            <Text style={[styles.optionText, selectedOption === 'months_6_plus' && styles.selectedOptionText]}>
              6+ months
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Fixed Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={[styles.continueButton, !selectedOption && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedOption}
        >
          <Text style={[styles.continueButtonText, !selectedOption && styles.continueButtonTextDisabled]}>
            Continue
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.helperText}>Patience is the secret to skin success</Text>
      </View>

      {/* Response Modal */}
      <Modal
        transparent={true}
        visible={showResponseModal}
        animationType="none"
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.responseModal,
              { opacity: fadeAnim }
            ]}
          >
            <Text style={styles.responseText}>{responseText}</Text>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent', // ✓ ADDED
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 30,
  },
  questionSubtitle: {
    fontSize: 16,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: 'normal',
  },
  optionsSection: {
    marginBottom: 40,
  },
  optionButton: {
    backgroundColor: '#E6E6E6',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: BRAND_COLORS.primary,
  },
  optionText: {
    fontSize: 16,
    color: BRAND_COLORS.black,
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: BRAND_COLORS.white,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'transparent', // ✓ CHANGED from BRAND_COLORS.white
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: BRAND_COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 12,
    width: '100%',
    maxWidth: 300,
  },
  continueButtonDisabled: {
    backgroundColor: BRAND_COLORS.lightGray,
  },
  continueButtonText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  continueButtonTextDisabled: {
    color: BRAND_COLORS.gray,
  },
  helperText: {
    fontSize: 13,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    fontWeight: 'normal',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  responseModal: {
    backgroundColor: '#8BA365',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    maxWidth: width * 0.8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  responseText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22,
  },
});