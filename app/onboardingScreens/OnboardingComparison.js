// app/onboardingScreens/OnboardingComparison.js
import React from 'react';
import {
  Image,
  ScrollView,
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
      {/* Main Content - Scrollable */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <Text style={styles.questionTitle}>Why Dr. Acne vs. Going Alone?</Text>
          <Text style={styles.questionSubtitle}>
            See the difference personalized AI guidance makes
          </Text>
        </View>

        {/* Column Headers */}
        <View style={styles.headerRow}>
          <View style={styles.headerColumn}>
            <Text style={styles.headerText}>On Your Own</Text>
          </View>
          <View style={styles.headerColumn}>
            <Text style={styles.headerTextHighlight}>With Dr. Acne</Text>
          </View>
        </View>

        <View style={styles.comparisonSection}>
          {/* Comparison Row 1 */}
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonBox}>
              <Image 
                source={require('../../assets/images/no_icon.png')} 
                style={styles.icon}
              />
              <Text style={styles.comparisonText}>Trial and error with products</Text>
            </View>
            
            <View style={styles.comparisonBoxHighlight}>
              <Image 
                source={require('../../assets/images/check.png')} 
                style={styles.icon}
              />
              <Text style={styles.comparisonTextHighlight}>AI-powered personalized recommendations</Text>
            </View>
          </View>

          {/* Comparison Row 2 */}
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonBox}>
              <Image 
                source={require('../../assets/images/no_icon.png')} 
                style={styles.icon}
              />
              <Text style={styles.comparisonText}>Conflicting online advice</Text>
            </View>
            
            <View style={styles.comparisonBoxHighlight}>
              <Image 
                source={require('../../assets/images/check.png')} 
                style={styles.icon}
              />
              <Text style={styles.comparisonTextHighlight}>Science-backed guidance</Text>
            </View>
          </View>

          {/* Comparison Row 3 */}
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonBox}>
              <Image 
                source={require('../../assets/images/no_icon.png')} 
                style={styles.icon}
              />
              <Text style={styles.comparisonText}>Expensive product mistakes</Text>
            </View>
            
            <View style={styles.comparisonBoxHighlight}>
              <Image 
                source={require('../../assets/images/check.png')} 
                style={styles.icon}
              />
              <Text style={styles.comparisonTextHighlight}>Targeted routine that works</Text>
            </View>
          </View>

          {/* Comparison Row 4 */}
          <View style={styles.comparisonRow}>
            <View style={styles.comparisonBox}>
              <Image 
                source={require('../../assets/images/no_icon.png')} 
                style={styles.icon}
              />
              <Text style={styles.comparisonText}>Months of guessing</Text>
            </View>
            
            <View style={styles.comparisonBoxHighlight}>
              <Image 
                source={require('../../assets/images/check.png')} 
                style={styles.icon}
              />
              <Text style={styles.comparisonTextHighlight}>Clear path to results</Text>
            </View>
          </View>
        </View>

        <View style={styles.socialProofSection}>
          <Text style={styles.socialProofText}>
            Join thousands who cleared their skin with us
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Bottom Section */}
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
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent', // ✓ ADDED
  },
  content: {
    backgroundColor: 'transparent', // ✓ ADDED
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'transparent', // ✓ ADDED
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
    fontSize: 14,
    color: BRAND_COLORS.gray,
    fontWeight: '600',
    textAlign: 'center',
  },
  headerTextHighlight: {
    fontSize: 14,
    color: BRAND_COLORS.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  comparisonSection: {
    marginBottom: 30,
  },
  comparisonRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  comparisonBox: {
    flex: 1,
    backgroundColor: 'rgba(230, 230, 230, 0.7)', // ✓ CHANGED: Semi-transparent gray (70% opacity)
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  comparisonBoxHighlight: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // ✓ CHANGED: Semi-transparent white (85% opacity)
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    borderWidth: 2,
    borderColor: BRAND_COLORS.primary,
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 12,
  },
  comparisonText: {
    fontSize: 14,
    color: BRAND_COLORS.darkGray,
    textAlign: 'center',
    lineHeight: 18,
  },
  comparisonTextHighlight: {
    fontSize: 14,
    color: BRAND_COLORS.black,
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '500',
  },
  socialProofSection: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  socialProofText: {
    fontSize: 15,
    color: BRAND_COLORS.primary,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 20,
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
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 12,
    width: '100%',
    maxWidth: 300,
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
    fontWeight: 'normal',
  },
});