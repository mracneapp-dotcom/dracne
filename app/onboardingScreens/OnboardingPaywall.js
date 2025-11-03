// app/onboardingScreens/OnboardingPaywall.js
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DrAcneButton } from '../../components/ui/DrAcneButton';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const BENEFITS = [
  {
    icon: require('../../assets/images/check.png'),
    title: 'No Payment Due Now',
    description: '3 days completely free',
    color: BRAND_COLORS.primary,
  },
  {
    icon: require('../../assets/images/check.png'),
    title: 'AI-Powered Acne Detection',
    description: 'Smart skin analysis',
    color: '#4A90E2',
  },
  {
    icon: require('../../assets/images/check.png'),
    title: 'Personalized Skincare Plans',
    description: 'Tailored to your skin',
    color: '#9B59B6',
  },
];

const IS_TEST_MODE = true;

export default function OnboardingPaywall({ onNext, onboardingData = {} }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.98)).current;
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('annual');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 30,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.02,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, [fadeAnim, scaleAnim]);

  // ===================================
  // TO RE-ENABLE FIREBASE IN PRODUCTION:
  // 1. Uncomment the code below
  // 2. Make sure Firebase is properly configured
  // 3. Test that it doesn't hang
  // ===================================
  const saveSubscriptionToFirebase = async (plan) => {
    try {
      console.log('💾 Saving subscription to Firebase (DISABLED FOR NOW)...');
      
      // UNCOMMENT THIS BLOCK FOR PRODUCTION:
      /*
      const user = auth.currentUser;
      const userId = user?.uid || `guest_${Date.now()}`;
      
      const subscriptionData = {
        userId,
        plan,
        status: 'active',
        transactionId: `test_${Date.now()}`,
        purchaseDate: new Date().toISOString(),
        hasTrial: plan === 'annual',
        trialEndDate: plan === 'annual' ? 
          new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() : null,
        testMode: IS_TEST_MODE,
      };

      await setDoc(doc(db, 'subscriptions', userId), subscriptionData);
      console.log('✅ Subscription saved:', subscriptionData);
      */
      
      // TEMPORARY: Just simulate the save
      console.log('✅ Subscription save bypassed (test mode)');
    } catch (error) {
      console.error('❌ Error saving subscription:', error);
    }
  };

  const handleContinue = async () => {
    console.log('🔘 Continue button pressed');
    
    if (IS_TEST_MODE) {
      Alert.alert(
        'Test Mode',
        `Simulating ${selectedPlan} purchase`,
        [
          { 
            text: 'Cancel', 
            style: 'cancel',
            onPress: () => {
              console.log('❌ User cancelled');
              setLoading(false);
            }
          },
          {
            text: 'Continue',
            onPress: async () => {
              console.log('✅ User confirmed purchase');
              setLoading(true);
              
              await saveSubscriptionToFirebase(selectedPlan);
              
              console.log('🚀 Navigating to complete (then home)...');
              setLoading(false);
              
              onNext('complete', {
                ...onboardingData,
                paywallCompleted: true,
                trialStarted: new Date().toISOString(),
                subscriptionType: selectedPlan,
                isPremium: true,
              });
              
              console.log('✅ Navigation complete!');
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Experience <Text style={styles.titleHighlight}>Dr. Acne</Text> for free
        </Text>
        <Text style={styles.subtitle}>
          Get personalized skincare analysis and professional routines
        </Text>
      </View>

      {/* Animated Mockup Section */}
      <View style={styles.mockupContainer}>
        <Animated.View
          style={[
            styles.mockupWrapper,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Image
            source={require('../../assets/images/mockup1.png')}
            style={styles.mockupImage}
            resizeMode="contain"
          />
        </Animated.View>
        <Text style={styles.mockupLabel}>See your personalized plan in action</Text>
      </View>

      {/* Modern Benefits Cards */}
      <View style={styles.benefitsContainer}>
        {BENEFITS.map((benefit, index) => (
          <View key={index} style={styles.benefitCard}>
            <View style={[
              styles.benefitIconContainer,
              { backgroundColor: `${benefit.color}15` }
            ]}>
              <Image
                source={benefit.icon}
                style={[
                  styles.benefitIcon,
                  { tintColor: benefit.color }
                ]}
                resizeMode="contain"
              />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>{benefit.title}</Text>
              <Text style={styles.benefitDescription}>{benefit.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <DrAcneButton
          title={loading ? "Processing..." : "Continue"}
          onPress={handleContinue}
          disabled={loading}
          style={styles.continueButton}
        />
        
        <Text style={styles.pricingText}>
          3 days free, then ${selectedPlan === 'annual' ? '37 per year' : '7.77 per month'}
        </Text>

        <TouchableOpacity onPress={() => setShowPlansModal(true)}>
          <Text style={styles.seeOtherPlansLink}>See other plans</Text>
        </TouchableOpacity>

        <Text style={styles.cancelText}>
          Cancel anytime • No commitment
        </Text>
      </View>

      {/* Beautiful Centered Plans Modal */}
      <Modal
        visible={showPlansModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowPlansModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity 
                onPress={() => setShowPlansModal(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>

              <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.plansScrollContent}
              >
                {/* Annual Plan */}
                <TouchableOpacity
                  style={[
                    styles.planCard,
                    selectedPlan === 'annual' && styles.planCardSelected,
                  ]}
                  onPress={() => {
                    setSelectedPlan('annual');
                    setShowPlansModal(false);
                  }}
                  activeOpacity={0.8}
                >
                  <View style={styles.planBadge}>
                    <Text style={styles.planBadgeText}>3-DAY FREE TRIAL</Text>
                  </View>
                  
                  <Text style={styles.planTitle}>Annual Premium</Text>
                  
                  <View style={styles.priceContainer}>
                    <Text style={styles.planPrice}>$37</Text>
                    <Text style={styles.planPeriod}>/year</Text>
                  </View>
                  
                  <Text style={styles.planSavings}>💰 Save 52% • Best value</Text>
                  
                  <View style={styles.planFeatures}>
                    <View style={styles.featureRow}>
                      <Text style={styles.featureCheck}>✓</Text>
                      <Text style={styles.featureText}>Unlimited AI skin analyses</Text>
                    </View>
                    <View style={styles.featureRow}>
                      <Text style={styles.featureCheck}>✓</Text>
                      <Text style={styles.featureText}>Personalized routines</Text>
                    </View>
                    <View style={styles.featureRow}>
                      <Text style={styles.featureCheck}>✓</Text>
                      <Text style={styles.featureText}>Progress tracking</Text>
                    </View>
                  </View>

                  {selectedPlan === 'annual' && (
                    <View style={styles.selectedIndicator}>
                      <Text style={styles.selectedIndicatorText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>

                {/* Monthly Plan */}
                <TouchableOpacity
                  style={[
                    styles.planCard,
                    selectedPlan === 'monthly' && styles.planCardSelected,
                  ]}
                  onPress={() => {
                    setSelectedPlan('monthly');
                    setShowPlansModal(false);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.planTitle}>Monthly Premium</Text>
                  
                  <View style={styles.priceContainer}>
                    <Text style={styles.planPrice}>$7.77</Text>
                    <Text style={styles.planPeriod}>/month</Text>
                  </View>
                  
                  <Text style={styles.planSavings}>Flexible monthly billing</Text>
                  
                  <View style={styles.planFeatures}>
                    <View style={styles.featureRow}>
                      <Text style={styles.featureCheck}>✓</Text>
                      <Text style={styles.featureText}>Unlimited AI skin analyses</Text>
                    </View>
                    <View style={styles.featureRow}>
                      <Text style={styles.featureCheck}>✓</Text>
                      <Text style={styles.featureText}>Personalized routines</Text>
                    </View>
                    <View style={styles.featureRow}>
                      <Text style={styles.featureCheck}>✓</Text>
                      <Text style={styles.featureText}>Progress tracking</Text>
                    </View>
                  </View>

                  {selectedPlan === 'monthly' && (
                    <View style={styles.selectedIndicator}>
                      <Text style={styles.selectedIndicatorText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    alignItems: 'center',
    backgroundColor: 'transparent',
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
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 12,
  },
  mockupContainer: {
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    overflow: 'visible',
    backgroundColor: 'transparent',
  },
  mockupWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockupImage: {
    width: 180,
    height: 240,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  mockupLabel: {
    fontSize: 13,
    color: BRAND_COLORS.primary,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  benefitsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
    padding: 10,
    marginBottom: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  benefitIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  benefitIcon: {
    width: 16,
    height: 16,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 1,
  },
  benefitDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  continueButton: {
    paddingVertical: 18,
    marginBottom: 12,
  },
  pricingText: {
    fontSize: 15,
    color: BRAND_COLORS.black,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 6,
  },
  seeOtherPlansLink: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 6,
    fontWeight: '500',
  },
  cancelText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    fontWeight: '400',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '90%',
    maxWidth: 360,
    maxHeight: '70%',
  },
  modalContent: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '400',
  },
  plansScrollContent: {
    paddingTop: 40,
  },
  planCard: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    position: 'relative',
    alignItems: 'center',
  },
  planCardSelected: {
    borderColor: BRAND_COLORS.primary,
    borderWidth: 3,
    shadowOpacity: 0.2,
    elevation: 6,
  },
  planBadge: {
    backgroundColor: BRAND_COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 12,
  },
  planBadgeText: {
    color: BRAND_COLORS.white,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: BRAND_COLORS.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 6,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: '800',
    color: BRAND_COLORS.primary,
  },
  planPeriod: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
    marginLeft: 4,
  },
  planSavings: {
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 14,
  },
  planFeatures: {
    gap: 8,
    width: '100%',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureCheck: {
    fontSize: 14,
    color: BRAND_COLORS.primary,
    fontWeight: '700',
    marginRight: 8,
    width: 18,
  },
  featureText: {
    fontSize: 13,
    color: '#333',
    flex: 1,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: BRAND_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicatorText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});