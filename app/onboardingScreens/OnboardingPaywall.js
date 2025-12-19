// app/onboardingScreens/OnboardingPaywall.js
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DrAcneButton } from '../../components/ui/DrAcneButton';
import { t } from '../i18n';

let InAppPurchases = null;
let IAPResponseCode = null;
try {
  InAppPurchases = require('expo-in-app-purchases');
  IAPResponseCode = InAppPurchases.IAPResponseCode;
} catch (e) {
  console.log('⚠️ In-app purchases not available');
}

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
  lightGreen: '#E8F5E9',
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const BENEFITS = [
  {
    icon: require('../../assets/images/check.png'),
    titleKey: 'onboarding.paywall.benefit1_title',
    descriptionKey: 'onboarding.paywall.benefit1_desc',
    color: BRAND_COLORS.primary,
  },
  {
    icon: require('../../assets/images/check.png'),
    titleKey: 'onboarding.paywall.benefit2_title',
    descriptionKey: 'onboarding.paywall.benefit2_desc',
    color: '#4A90E2',
  },
  {
    icon: require('../../assets/images/check.png'),
    titleKey: 'onboarding.paywall.benefit3_title',
    descriptionKey: 'onboarding.paywall.benefit3_desc',
    color: '#9B59B6',
  },
];

const IS_TEST_MODE = !InAppPurchases;

const PRODUCT_IDS = {
  monthly: 'com.aleboshi.dracne.monthly.premium',
  annual: 'com.aleboshi.dracne.annual.premium',
};

export default function OnboardingPaywall({ onNext, onboardingData = {} }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.98)).current;
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('annual');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [iapReady, setIapReady] = useState(false);
  
  const purchaseListenerRef = useRef(null);
  const hasNavigatedRef = useRef(false);

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

    if (!IS_TEST_MODE && InAppPurchases) {
      initializeIAP();
    }

    return () => {
      if (purchaseListenerRef.current) {
        purchaseListenerRef.current.remove();
      }
      if (!IS_TEST_MODE && InAppPurchases) {
        InAppPurchases.disconnectAsync().catch(() => {});
      }
    };
  }, [fadeAnim, scaleAnim]);

  const initializeIAP = async () => {
    if (!InAppPurchases) {
      console.log('❌ InAppPurchases not available');
      return;
    }
    
    try {
      console.log('🔌 Connecting to IAP...');
      await InAppPurchases.connectAsync();
      console.log('✅ Connected to IAP');

      console.log('📦 Loading products...');
      const { results, responseCode } = await InAppPurchases.getProductsAsync([
        PRODUCT_IDS.monthly,
        PRODUCT_IDS.annual,
      ]);

      console.log('📦 Response Code:', responseCode);
      console.log('📦 Products Found:', results?.length || 0);

      if (responseCode === IAPResponseCode.OK && results && results.length > 0) {
        setProducts(results);
        console.log('✅ Products loaded successfully');
        
        if (purchaseListenerRef.current) {
          purchaseListenerRef.current.remove();
        }

        purchaseListenerRef.current = InAppPurchases.setPurchaseListener(
          ({ responseCode, results, errorCode }) => {
            console.log('📱 Purchase Listener - Response:', responseCode, 'Error:', errorCode);
            
            if (responseCode === IAPResponseCode.OK && results) {
              console.log('✅ Purchase successful via listener');
              results.forEach((purchase) => {
                console.log('🎉 Processing purchase:', purchase.productId);
                handlePurchaseSuccess(purchase);
              });
            } else if (responseCode === IAPResponseCode.USER_CANCELED) {
              console.log('❌ User canceled purchase');
              setLoading(false);
            } else if (responseCode === IAPResponseCode.ERROR) {
              console.log('❌ Purchase error:', errorCode);
              setLoading(false);
            }
          }
        );
        
        setIapReady(true);
        console.log('✅ IAP Ready');
      } else {
        console.log('⚠️ No products loaded');
        setIapReady(false);
      }
    } catch (error) {
      console.error('❌ IAP initialization failed:', error);
      setIapReady(false);
    }
  };

  const handlePurchaseSuccess = (purchase) => {
    if (hasNavigatedRef.current) {
      console.log('⚠️ Already navigated');
      return;
    }

    console.log('🎉 Purchase confirmed - NAVIGATING NOW');
    hasNavigatedRef.current = true;
    
    const planType = purchase.productId === PRODUCT_IDS.annual ? 'annual' : 'monthly';
    
    // CRITICAL: Navigate FIRST - don't wait for anything
    setLoading(false);
    onNext('complete', {
      ...onboardingData,
      paywallCompleted: true,
      trialStarted: new Date().toISOString(),
      subscriptionType: planType,
      isPremium: true,
    });

    // Background cleanup - fire and forget (1 second after navigation)
    setTimeout(() => {
      saveToFirebaseBackground(purchase, planType)
        .catch((error) => console.log('⚠️ Firebase save failed:', error.message));
      
      if (InAppPurchases) {
        InAppPurchases.finishTransactionAsync(purchase, true)
          .catch((error) => console.log('⚠️ Finish transaction failed:', error.message));
      }
    }, 1000);
  };

  const saveToFirebaseBackground = async (purchase, plan) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        console.log('ℹ️ No user logged in, skipping Firebase save');
        return;
      }

      const db = getFirestore();
      const userSubscriptionRef = doc(db, 'users', user.uid, 'subscription', 'current');

      const trialEndDate = new Date();
      trialEndDate.setDate(trialEndDate.getDate() + 3);

      await setDoc(userSubscriptionRef, {
        subscriptionType: plan,
        productId: PRODUCT_IDS[plan],
        trialStarted: serverTimestamp(),
        trialEnds: trialEndDate.toISOString(),
        status: 'trial',
        receipt: {
          transactionId: purchase.transactionId,
          productId: purchase.productId,
          transactionDate: purchase.transactionDate,
        },
        platform: Platform.OS,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log('✅ Firebase subscription saved');
    } catch (error) {
      console.error('⚠️ Firebase save failed:', error);
      throw error;
    }
  };

  const purchaseSubscription = async (plan) => {
    if (!InAppPurchases) {
      console.log('❌ InAppPurchases not available');
      setLoading(false);
      return;
    }
    
    try {
      const productId = PRODUCT_IDS[plan];
      const product = products.find(p => p.productId === productId);
      
      if (!product) {
        console.log('❌ Product not found:', productId);
        setLoading(false);
        Alert.alert(
          t('onboarding.paywall.alert_purchase_failed'),
          t('onboarding.paywall.alert_selected_plan_unavailable')
        );
        return;
      }

      console.log('🛒 Starting purchase for:', productId);
      setLoading(true);
      
      console.log('🚀 Calling purchaseItemAsync...');
      await InAppPurchases.purchaseItemAsync(productId);
      console.log('✅ purchaseItemAsync completed');
      
      // SAFETY NET: If listener doesn't fire within 3 seconds, check history manually
      setTimeout(async () => {
        if (!hasNavigatedRef.current) {
          console.log('⚠️ Listener did not fire - checking purchase history as backup');
          try {
            const { results } = await InAppPurchases.getPurchaseHistoryAsync();
            console.log('📋 Purchase history results:', results?.length || 0);
            
            const recentPurchase = results?.find(p => p.productId === productId);
            
            if (recentPurchase) {
              console.log('✅ Found purchase in history - navigating via backup');
              handlePurchaseSuccess(recentPurchase);
            } else {
              console.log('❌ No purchase found - stopping loading');
              setLoading(false);
            }
          } catch (error) {
            console.log('❌ Error checking purchase history:', error);
            setLoading(false);
          }
        } else {
          console.log('✅ Already navigated via listener');
        }
      }, 3000);
      
    } catch (error) {
      console.error('❌ Purchase error:', error);
      setLoading(false);
      
      if (error.code === 'E_USER_CANCELLED') {
        console.log('ℹ️ User cancelled purchase');
        return;
      }
      
      Alert.alert(
        t('onboarding.paywall.alert_purchase_failed'),
        error.message || t('onboarding.paywall.alert_purchase_error')
      );
    }
  };

  const handleContinue = async () => {
    // CRITICAL: Reset navigation ref on each button press
    hasNavigatedRef.current = false;
    
    if (loading) {
      console.log('⚠️ Already processing');
      return;
    }

    console.log('🔘 Continue button pressed');
    console.log('Mode:', IS_TEST_MODE ? 'TEST' : 'PRODUCTION');
    
    if (IS_TEST_MODE) {
      console.log('🧪 Test mode - simulating purchase');
      setLoading(true);
      
      setTimeout(() => {
        console.log('✅ Test purchase complete');
        hasNavigatedRef.current = true;
        setLoading(false);
        
        onNext('complete', {
          ...onboardingData,
          paywallCompleted: true,
          trialStarted: new Date().toISOString(),
          subscriptionType: selectedPlan,
          isPremium: true,
        });
      }, 1000);
      return;
    }

    if (!iapReady || products.length === 0) {
      console.log('⚠️ IAP not ready');
      Alert.alert(
        t('onboarding.paywall.alert_connection_error'),
        t('onboarding.paywall.alert_subscription_loading')
      );
      return;
    }

    console.log('🚀 Starting real purchase...');
    await purchaseSubscription(selectedPlan);
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://dracne.pro/privacy');
  };

  const handleTermsOfUse = () => {
    Linking.openURL('https://dracne.pro/tos');
  };

  const getPricingText = () => {
    if (selectedPlan === 'annual') {
      return t('onboarding.paywall.pricing_annual');
    }
    return t('onboarding.paywall.pricing_monthly');
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          {t('onboarding.paywall.title1')} <Text style={styles.titleHighlight}>{t('onboarding.paywall.title2')}</Text> {t('onboarding.paywall.title3')}
        </Text>
        <Text style={styles.subtitle}>
          {t('onboarding.paywall.subtitle')}
        </Text>
      </View>

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
        <Text style={styles.mockupLabel}>{t('onboarding.paywall.mockup_label')}</Text>
      </View>

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
              <Text style={styles.benefitTitle}>{t(benefit.titleKey)}</Text>
              <Text style={styles.benefitDescription}>{t(benefit.descriptionKey)}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={loading ? t('onboarding.paywall.button_processing') : t('onboarding.paywall.button_continue')}
          onPress={handleContinue}
          disabled={loading}
          style={styles.continueButton}
        />
        
        {!IS_TEST_MODE && !iapReady && (
          <Text style={styles.loadingText}>{t('onboarding.paywall.loading_text')}</Text>
        )}
        
        <Text style={styles.pricingText}>
          {getPricingText()}
        </Text>

        <TouchableOpacity onPress={() => setShowPlansModal(true)}>
          <Text style={styles.seeOtherPlansLink}>{t('onboarding.paywall.see_other_plans')}</Text>
        </TouchableOpacity>

        <Text style={styles.cancelText}>
          {t('onboarding.paywall.cancel_text')}
        </Text>

        <View style={styles.regulatoryContainer}>
          <Text style={styles.regulatoryText}>
            {t('onboarding.paywall.regulatory1')}
          </Text>
          <Text style={styles.regulatoryText}>
            {t('onboarding.paywall.regulatory2')}
          </Text>
          <Text style={styles.regulatoryText}>
            {t('onboarding.paywall.regulatory3')}
          </Text>
          <Text style={styles.regulatoryText}>
            {t('onboarding.paywall.regulatory4')}
          </Text>
          <Text style={styles.regulatoryText}>
            {t('onboarding.paywall.regulatory5')}
          </Text>
          <Text style={styles.regulatoryText}>
            {t('onboarding.paywall.regulatory6')}
          </Text>
          
          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={handlePrivacyPolicy}>
              <Text style={styles.linkText}>{t('onboarding.paywall.privacy_policy')}</Text>
            </TouchableOpacity>
            <Text style={styles.linkSeparator}> | </Text>
            <TouchableOpacity onPress={handleTermsOfUse}>
              <Text style={styles.linkText}>{t('onboarding.paywall.terms_of_use')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        visible={showPlansModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowPlansModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modernModalContainer}>
            <TouchableOpacity 
              onPress={() => setShowPlansModal(false)}
              style={styles.modernCloseButton}
            >
              <Text style={styles.modernCloseText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>{t('onboarding.paywall.modal_title')}</Text>
            <Text style={styles.modalSubtitle}>{t('onboarding.paywall.modal_subtitle')}</Text>

            <View style={styles.plansContainer}>
              <TouchableOpacity
                style={[
                  styles.modernPlanCard,
                  styles.annualPlanCard,
                  selectedPlan === 'annual' && styles.modernPlanCardSelected,
                ]}
                onPress={() => {
                  setSelectedPlan('annual');
                  setShowPlansModal(false);
                }}
                activeOpacity={0.8}
              >
                {selectedPlan === 'annual' && (
                  <View style={styles.checkmarkCircle}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
                
                <View style={styles.modernPlanHeader}>
                  <View style={styles.trialBadge}>
                    <Text style={styles.trialBadgeText}>{t('onboarding.paywall.modal_trial_badge')}</Text>
                  </View>
                  <View style={styles.savingsBadge}>
                    <Text style={styles.savingsBadgeText}>{t('onboarding.paywall.modal_savings_badge')}</Text>
                  </View>
                </View>

                <Text style={styles.modernPlanName}>{t('onboarding.paywall.modal_annual')}</Text>
                
                <View style={styles.modernPriceRow}>
                  <Text style={styles.modernPrice}>$37.90</Text>
                  <Text style={styles.modernPeriod}>{t('onboarding.paywall.modal_per_year')}</Text>
                </View>
                
                <Text style={styles.modernPriceDetail}>{t('onboarding.paywall.modal_annual_detail')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modernPlanCard,
                  selectedPlan === 'monthly' && styles.modernPlanCardSelected,
                ]}
                onPress={() => {
                  setSelectedPlan('monthly');
                  setShowPlansModal(false);
                }}
                activeOpacity={0.8}
              >
                {selectedPlan === 'monthly' && (
                  <View style={styles.checkmarkCircle}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}

                <Text style={styles.modernPlanName}>{t('onboarding.paywall.modal_monthly')}</Text>
                
                <View style={styles.modernPriceRow}>
                  <Text style={styles.modernPrice}>$7.79</Text>
                  <Text style={styles.modernPeriod}>{t('onboarding.paywall.modal_per_month')}</Text>
                </View>
                
                <Text style={styles.modernPriceDetail}>{t('onboarding.paywall.modal_monthly_detail')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sharedFeaturesContainer}>
              <Text style={styles.sharedFeaturesTitle}>{t('onboarding.paywall.modal_features_title')}</Text>
              <View style={styles.featuresList}>
                <Text style={styles.featureItem}>{t('onboarding.paywall.modal_feature1')}</Text>
                <Text style={styles.featureItem}>{t('onboarding.paywall.modal_feature2')}</Text>
                <Text style={styles.featureItem}>{t('onboarding.paywall.modal_feature3')}</Text>
              </View>
            </View>

            <View style={styles.noPaymentContainer}>
              <Text style={styles.noPaymentText}>{t('onboarding.paywall.modal_no_payment')}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingBottom: 30,
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
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  continueButton: {
    paddingVertical: 18,
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginBottom: 8,
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
    marginBottom: 20,
  },
  regulatoryContainer: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  regulatoryText: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 4,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  linkText: {
    fontSize: 11,
    color: '#666',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  linkSeparator: {
    fontSize: 11,
    color: '#999',
    marginHorizontal: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modernModalContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 24,
    padding: 24,
    paddingTop: 32,
  },
  modernCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modernCloseText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '400',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
  },
  plansContainer: {
    gap: 12,
    marginBottom: 24,
  },
  modernPlanCard: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    position: 'relative',
  },
  annualPlanCard: {
    backgroundColor: BRAND_COLORS.lightGreen,
  },
  modernPlanCardSelected: {
    borderColor: BRAND_COLORS.primary,
    borderWidth: 2.5,
  },
  checkmarkCircle: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: BRAND_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: BRAND_COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  modernPlanHeader: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  trialBadge: {
    backgroundColor: BRAND_COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  trialBadgeText: {
    color: BRAND_COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  savingsBadge: {
    backgroundColor: '#FFE5B4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  savingsBadgeText: {
    color: '#D97706',
    fontSize: 11,
    fontWeight: '700',
  },
  modernPlanName: {
    fontSize: 18,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 8,
  },
  modernPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  modernPrice: {
    fontSize: 32,
    fontWeight: '800',
    color: BRAND_COLORS.black,
  },
  modernPeriod: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666',
    marginLeft: 4,
  },
  modernPriceDetail: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  sharedFeaturesContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sharedFeaturesTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 10,
  },
  featuresList: {
    gap: 6,
  },
  featureItem: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  noPaymentContainer: {
    alignItems: 'center',
    paddingTop: 8,
  },
  noPaymentText: {
    fontSize: 14,
    color: BRAND_COLORS.primary,
    fontWeight: '600',
  },
});