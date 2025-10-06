// app/onboardingScreens/OnboardingComparison.js
import React from 'react';
import {
  Image,
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
  lightGray: '#E5E5E5',
  boxGray: '#E6E6E6',
};

export default function OnboardingComparison({ onNext }) {
  const handleContinue = () => {
    onNext('onboardingReady', { sawComparison: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.questionTitle}>
            Why <Text style={styles.titleHighlight}>Dr. Acne</Text> vs. Going Alone?
          </Text>
          <Text style={styles.questionSubtitle}>
            See the difference personalized AI guidance makes
          </Text>
        </View>

        <View style={styles.headerRow}>
          <View style={styles.headerColumn}>
            <Text style={styles.headerText}>On Your Own</Text>
          </View>
          <View style={styles.headerColumn}>
            <Text style={styles.headerTextHighlight}>With Dr. Acne</Text>
          </View>
        </View>

        <View style={styles.comparisonSection}>
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonBox}>
              <Image 
                source={require('../../assets/images/no_icon.png')} 
                style={styles.icon}
              />
              <Text style={styles.comparisonText}>Trial and error</Text>
            </View>
            
            <View style={styles.comparisonBoxHighlight}>
              <Image 
                source={require('../../assets/images/check.png')} 
                style={styles.icon}
              />
              <Text style={styles.comparisonTextHighlight}>AI personalized</Text>
            </View>
          </View>

          <View style={styles.comparisonRow}>
            <View style={styles.comparisonBox}>
              <Image 
                source={require('../../assets/images/no_icon.png')} 
                style={styles.icon}
              />
              <Text style={styles.comparisonText}>Conflicting advice</Text>
            </View>
            
            <View style={styles.comparisonBoxHighlight}>
              <Image 
                source={require('../../assets/images/check.png')} 
                style={styles.icon}
              />
              <Text style={styles.comparisonTextHighlight}>Science-backed</Text>
            </View>
          </View>

          <View style={styles.comparisonRow}>
            <View style={styles.comparisonBox}>
              <Image 
                source={require('../../assets/images/no_icon.png')} 
                style={styles.icon}
              />
              <Text style={styles.comparisonText}>Expensive mistakes</Text>
            </View>
            
            <View style={styles.comparisonBoxHighlight}>
              <Image 
                source={require('../../assets/images/check.png')} 
                style={styles.icon}
              />
              <Text style={styles.comparisonTextHighlight}>Targeted routine</Text>
            </View>
          </View>

          <View style={styles.comparisonRow}>
            <View style={styles.comparisonBox}>
              <Image 
                source={require('../../assets/images/no_icon.png')} 
                style={styles.icon}
              />
              <Text style={styles.comparisonText}>Months guessing</Text>
            </View>
            
            <View style={styles.comparisonBoxHighlight}>
              <Image 
                source={require('../../assets/images/check.png')} 
                style={styles.icon}
              />
              <Text style={styles.comparisonTextHighlight}>Clear path</Text>
            </View>
          </View>
        </View>

        <View style={styles.socialProofSection}>
          <Text style={styles.socialProofText}>
            Join thousands who cleared their skin with us
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>
            Continue with Dr. Acne
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.helperText}>Personalized for your unique skin</Text>
      </View>
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
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'flex-start',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  questionTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 32,
  },
  titleHighlight: {
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  questionSubtitle: {
    fontSize: 15,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    lineHeight: 21,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  headerColumn: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 13,
    color: BRAND_COLORS.gray,
    fontWeight: '600',
    textAlign: 'center',
  },
  headerTextHighlight: {
    fontSize: 13,
    color: BRAND_COLORS.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  comparisonSection: {
    marginBottom: 24,
  },
  comparisonRow: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 12,
  },
  comparisonBox: {
    flex: 1,
    backgroundColor: 'rgba(230, 230, 230, 0.7)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 85,
  },
  comparisonBoxHighlight: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 85,
    borderWidth: 2,
    borderColor: BRAND_COLORS.primary,
  },
  icon: {
    width: 20,
    height: 20,
    marginBottom: 8,
  },
  comparisonText: {
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    textAlign: 'center',
    lineHeight: 16,
  },
  comparisonTextHighlight: {
    fontSize: 12,
    color: BRAND_COLORS.black,
    textAlign: 'center',
    lineHeight: 16,
    fontWeight: '500',
  },
  socialProofSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  socialProofText: {
    fontSize: 14,
    color: BRAND_COLORS.primary,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 18,
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
  continueButtonText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  helperText: {
    fontSize: 13,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
  },
});