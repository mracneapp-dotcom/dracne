// app/onboardingScreens/OnboardingStruggle.js
import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
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

const STRUGGLE_OPTIONS = [
  { 
    id: 'breakouts', 
    label: 'Breakouts won\'t stop',
    description: 'Persistent acne issues',
    icon: require('../../assets/images/no_icon.png'),
    color: BRAND_COLORS.secondary,
  },
  { 
    id: 'nothing_works', 
    label: 'Nothing seems to work',
    description: 'Tried many products',
    icon: require('../../assets/images/no_icon.png'),
    color: '#F39C12',
  },
  { 
    id: 'too_many_options', 
    label: 'Too many options, I\'m overwhelmed',
    description: 'Need guidance',
    icon: require('../../assets/images/no_icon.png'),
    color: '#9B59B6',
  },
  { 
    id: 'dont_know', 
    label: 'Don\'t know where to start',
    description: 'New to skincare',
    icon: require('../../assets/images/no_icon.png'),
    color: '#4A90E2',
  },
];

const responses = {
  'breakouts': "Ugh, the worst feeling! But here's the thing - your skin is trying to tell you something and we're here to help decode it :)",
  'nothing_works': "So frustrating! Most people are using the wrong approach for their specific skin, but don't worry, we got you :)",
  'too_many_options': "Totally overwhelming! That's exactly why we built this app - to cut through the noise and find what works for you",
  'dont_know': "The best place to start? Understanding what your skin actually needs - and that's where we come in :)"
};

export default function OnboardingStruggle({ onNext }) {
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
          onNext('onboardingBarrierHealth1', { struggle: selectedOption });
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
        <View style={styles.header}>
          <Text style={styles.title}>
            What's your biggest <Text style={styles.titleHighlight}>skin frustration?</Text>
          </Text>
          <Text style={styles.subtitle}>
            Let's tackle what's bothering you most
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {STRUGGLE_OPTIONS.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionCard,
                  isSelected && {
                    borderColor: option.color,
                    borderWidth: 2,
                    backgroundColor: `${option.color}10`,
                  }
                ]}
                onPress={() => handleOptionSelect(option.id)}
              >
                <View style={[
                  styles.iconContainer,
                  { backgroundColor: isSelected ? option.color : '#F5F5F5' }
                ]}>
                  <Image
                    source={option.icon}
                    style={[
                      styles.icon,
                      { tintColor: isSelected ? BRAND_COLORS.white : '#999' }
                    ]}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[
                    styles.optionLabel,
                    isSelected && { color: option.color, fontWeight: '600' }
                  ]}>
                    {option.label}
                  </Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Fixed Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !selectedOption && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedOption}
        >
          <Text style={[
            styles.continueButtonText,
            !selectedOption && styles.continueButtonTextDisabled
          ]}>
            Continue
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.helperText}>Select your biggest frustration</Text>
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
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 140,
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 34,
  },
  titleHighlight: {
    color: BRAND_COLORS.secondary,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  icon: {
    width: 22,
    height: 22,
  },
  textContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    color: BRAND_COLORS.black,
    marginBottom: 3,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 19,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: BRAND_COLORS.primary,
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 12,
    width: '100%',
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonDisabled: {
    backgroundColor: '#E5E5E5',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  continueButtonTextDisabled: {
    color: '#999',
  },
  helperText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
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