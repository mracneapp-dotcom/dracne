// app/onboardingScreens/OnboardingWelcome.js
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

const { width, height } = Dimensions.get('window');

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

export default function OnboardingWelcome({ onNext }) {
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

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
          onNext('onboardingDiscovery');
        });
      }, 2500);
    });
  };

  const handleGetStarted = () => {
    showResponse("Amazing! Your skin is going to love this journey");
  };

  return (
    <View style={styles.container}>
      {/* Main Content - Scrollable area */}
      <View style={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.welcomeTitle}>Your skincare journey starts here</Text>
          <Text style={styles.welcomeSubtitle}>
            AI-powered skin analysis that actually gets you
          </Text>
        </View>

        <View style={styles.valueSection}>
          <View style={styles.valueItem}>
            <View style={styles.valueIcon}>
              <Image 
                source={require('../../assets/images/target.png')} 
                style={styles.iconImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.valueText}>Personalized routine in minutes</Text>
          </View>

          <View style={styles.valueItem}>
            <View style={styles.valueIcon}>
              <Image 
                source={require('../../assets/images/lab.png')} 
                style={styles.iconImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.valueText}>Science-backed recommendations</Text>
          </View>

          <View style={styles.valueItem}>
            <View style={styles.valueIcon}>
              <Image 
                source={require('../../assets/images/heart.png')} 
                style={styles.iconImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.valueText}>Safe, gentle approach to clear skin</Text>
          </View>
        </View>

        <View style={styles.questionSection}>
          <Text style={styles.questionText}>
            Ready to discover what your skin really needs?
          </Text>
        </View>
      </View>

      {/* Fixed Bottom Section - Always at bottom */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.getStartedButton}
          onPress={handleGetStarted}
        >
          <Text style={styles.getStartedButtonText}>Let's Get Started</Text>
        </TouchableOpacity>

        <Text style={styles.timeText}>Takes just 3 minutes</Text>
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
    marginTop: 40,
    marginBottom: 50,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 30,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: 'normal',
  },
  valueSection: {
    marginBottom: 40,
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  valueIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: BRAND_COLORS.cream,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  valueText: {
    fontSize: 16,
    color: BRAND_COLORS.black,
    flex: 1,
    lineHeight: 22,
    fontWeight: 'normal',
  },
  questionSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 60,
  },
  questionText: {
    fontSize: 17,
    color: BRAND_COLORS.black,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: 'normal',
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'transparent', // ✓ CHANGED from BRAND_COLORS.white - THIS WAS THE ISSUE!
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: BRAND_COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: '100%',
    maxWidth: 300,
  },
  getStartedButtonText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  timeText: {
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