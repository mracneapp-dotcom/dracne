// app/onboardingScreens/OnboardingRating.js - ANDROID DEBUG FIX
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
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

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
};

const TESTIMONIALS = [
  {
    nameKey: 'onboarding.rating.testimonial1_name',
    textKey: 'onboarding.rating.testimonial1_text',
    isRight: true,
  },
  {
    nameKey: 'onboarding.rating.testimonial2_name',
    textKey: 'onboarding.rating.testimonial2_text',
    isRight: false,
  },
  {
    nameKey: 'onboarding.rating.testimonial3_name',
    textKey: 'onboarding.rating.testimonial3_text',
    isRight: true,
  },
];

export default function OnboardingRating({ onNext }) {
  const [showPopup, setShowPopup] = useState(false);
  const [userRating, setUserRating] = useState(0);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const testimonialsAnim = useRef(TESTIMONIALS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    console.log('📱 OnboardingRating mounted - Platform:', Platform.OS);
    
    const animations = [
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      ...testimonialsAnim.map((anim, index) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 600,
          delay: 400 + (index * 200),
          useNativeDriver: true,
        })
      ),
    ];

    Animated.parallel(animations).start();

    const timer = setTimeout(() => {
      console.log('⏰ Showing rating popup');
      setShowPopup(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const openAppStore = async () => {
    console.log('🏪 Opening app store - Platform:', Platform.OS);
    
    const storeUrl = Platform.select({
      ios: 'itms-apps://itunes.apple.com/app/id6741170145',
      android: 'market://details?id=com.aleboshi.dracne',
    });

    console.log('🔗 Store URL:', storeUrl);

    try {
      const canOpen = await Linking.canOpenURL(storeUrl);
      console.log('✅ Can open store URL:', canOpen);
      
      if (canOpen) {
        await Linking.openURL(storeUrl);
        console.log('✅ Store opened successfully');
      } else {
        throw new Error('Store app not available');
      }
    } catch (error) {
      console.log('⚠️ Store app failed, trying web URL:', error.message);
      
      const webUrl = Platform.select({
        ios: 'https://apps.apple.com/app/id6741170145',
        android: 'https://play.google.com/store/apps/details?id=com.aleboshi.dracne',
      });
      
      try {
        await Linking.openURL(webUrl);
        console.log('✅ Web store opened successfully');
      } catch (webError) {
        console.error('❌ Both store URLs failed:', webError);
        Alert.alert(
          'Store Not Available',
          'Unable to open the app store. Please search for "Dr. Acne" in your app store manually.',
          [{ text: 'OK' }]
        );
      }
    }
  };

  const handleStarPress = async (rating) => {
    console.log('⭐ Star pressed:', rating);
    setUserRating(rating);
    setShowPopup(false);
    
    try {
      if (rating === 5) {
        console.log('🎉 5 stars - opening store');
        await openAppStore();
        console.log('✅ Store opened, user stays on screen');
      } else {
        console.log('👍 ' + rating + ' stars - showing thank you');
        Alert.alert(
          t('onboarding.rating.thank_you_title'),
          t('onboarding.rating.thank_you_message'),
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('❌ Error in handleStarPress:', error);
    }
  };

  const handleNotNow = () => {
    console.log('⏭️ Not now pressed - closing popup');
    setShowPopup(false);
  };

  const handleContinue = () => {
    console.log('▶️ Continue pressed');
    console.log('📊 Rating data:', {
      userRating,
      ratedInStore: userRating === 5,
      ratingCompleted: userRating > 0,
      ratingSkipped: userRating === 0,
    });
    
    try {
      console.log('🚀 Calling onNext with screen: onboardingSaveProgress');
      onNext('onboardingSaveProgress', {
        rating: userRating,
        ratedInStore: userRating === 5,
        ratingCompleted: userRating > 0,
        ratingSkipped: userRating === 0,
      });
      console.log('✅ onNext called successfully');
    } catch (error) {
      console.error('❌ Error calling onNext:', error);
      Alert.alert('Navigation Error', error.message);
    }
  };

  const handleSkip = () => {
    console.log('⏩ Skip pressed');
    try {
      onNext('onboardingSaveProgress', {
        rating: 0,
        ratedInStore: false,
        ratingSkipped: true,
      });
      console.log('✅ Skip navigation called');
    } catch (error) {
      console.error('❌ Error in skip:', error);
    }
  };

  const handleRateUs = () => {
    console.log('⭐ Rate us pressed - showing popup');
    setShowPopup(true);
  };

  const closePopup = () => {
    console.log('❌ Popup closed');
    setShowPopup(false);
  };

  const renderStars = (interactive = false, size = 14) => {
    return (
      <View style={styles.starsContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={interactive ? () => handleStarPress(index + 1) : undefined}
            disabled={!interactive}
            style={interactive ? styles.interactiveStarButton : undefined}
          >
            <Text style={[
              styles.star,
              { fontSize: size },
              interactive ? styles.starInteractive : styles.starFilled
            ]}>
              {interactive ? '☆' : '★'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderTestimonial = (testimonial, index) => {
    const name = t(testimonial.nameKey);
    const text = t(testimonial.textKey);
    
    return (
      <Animated.View
        key={index}
        style={[
          styles.testimonial,
          { opacity: testimonialsAnim[index] }
        ]}
      >
        {testimonial.isRight ? (
          <>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{name[0]}</Text>
            </View>
            <View style={[styles.testimonialBox, styles.testimonialBoxRight]}>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{name}</Text>
                {renderStars(false, 12)}
              </View>
              <Text style={styles.testimonialText}>{text}</Text>
            </View>
          </>
        ) : (
          <>
            <View style={[styles.testimonialBox, styles.testimonialBoxLeft]}>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{name}</Text>
                {renderStars(false, 12)}
              </View>
              <Text style={styles.testimonialText}>{text}</Text>
            </View>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{name[0]}</Text>
            </View>
          </>
        )}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Text style={styles.title}>{t('onboarding.rating.title')}</Text>
      </Animated.View>

      <Animated.View style={[styles.socialProofContainer, { opacity: fadeAnim }]}>
        <Text style={styles.socialProofTitle}>{t('onboarding.rating.social_proof_title')}</Text>
        <View style={styles.usersContainer}>
          <View style={styles.userAvatarsContainer}>
            {Array.from({ length: 3 }).map((_, index) => (
              <View key={index} style={[styles.userAvatar, { marginLeft: index > 0 ? -10 : 0 }]}>
                <Text style={styles.userAvatarText}>U</Text>
              </View>
            ))}
          </View>
          <Text style={styles.usersCount}>{t('onboarding.rating.users_label')}</Text>
        </View>
      </Animated.View>

      <ScrollView 
        style={styles.testimonialsScrollView}
        contentContainerStyle={styles.testimonialsContainer}
        showsVerticalScrollIndicator={false}
      >
        {TESTIMONIALS.map((testimonial, index) => renderTestimonial(testimonial, index))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipButtonText}>{t('onboarding.rating.skip')}</Text>
        </TouchableOpacity>
        
        <DrAcneButton
          title={t('onboarding.rating.button')}
          onPress={handleContinue}
          style={styles.button}
        />
      </View>

      {showPopup && (
        <Modal transparent={true} animationType="fade">
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={closePopup}
          >
            <TouchableOpacity
              style={styles.popupContainer}
              activeOpacity={1}
              onPress={() => {}}
            >
              <View style={styles.appIconContainer}>
                <View style={styles.appIcon}>
                  <Image
                    source={require('../../assets/images/dracne-logo.png')}
                    style={styles.appIconImage}
                    resizeMode="contain"
                  />
                </View>
              </View>
              
              <Text style={styles.popupTitle}>{t('onboarding.rating.popup_title')}</Text>
              <Text style={styles.popupSubtitle}>
                {Platform.OS === 'ios' 
                  ? t('onboarding.rating.popup_subtitle_ios')
                  : t('onboarding.rating.popup_subtitle_android')
                }
              </Text>
              
              <View style={styles.separator} />
              
              <View style={styles.popupStarsContainer}>
                {renderStars(true, 24)}
              </View>
              
              <View style={styles.separator} />
              
              <TouchableOpacity style={styles.notNowButton} onPress={handleNotNow}>
                <Text style={styles.notNowButtonText}>{t('onboarding.rating.popup_not_now')}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    lineHeight: 32,
  },
  socialProofContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
  },
  socialProofTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 14,
  },
  usersContainer: {
    alignItems: 'center',
  },
  userAvatarsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BRAND_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: BRAND_COLORS.white,
  },
  userAvatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.white,
  },
  usersCount: {
    fontSize: 14,
    color: '#666',
  },
  testimonialsScrollView: {
    flex: 1,
  },
  testimonialsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  testimonial: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: BRAND_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: BRAND_COLORS.white,
  },
  testimonialBox: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 14,
  },
  testimonialBoxRight: {
    marginLeft: 12,
  },
  testimonialBoxLeft: {
    marginRight: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginRight: 8,
  },
  testimonialText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 1,
  },
  starFilled: {
    color: '#FFD700',
  },
  starInteractive: {
    color: '#007AFF',
  },
  interactiveStarButton: {
    padding: 4,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 28,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  skipButtonText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  button: {
    paddingVertical: 16,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  popupContainer: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 14,
    alignItems: 'center',
    width: 280,
    maxWidth: 280,
    minHeight: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  appIconContainer: {
    paddingTop: 24,
    paddingBottom: 12,
    alignItems: 'center',
  },
  appIcon: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  appIconImage: {
    width: 54,
    height: 54,
  },
  popupTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 6,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  popupSubtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 17,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  separator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C6C6C8',
  },
  popupStarsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notNowButton: {
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
    minHeight: 44,
    justifyContent: 'center',
  },
  notNowButtonText: {
    fontSize: 17,
    color: '#007AFF',
  },
});