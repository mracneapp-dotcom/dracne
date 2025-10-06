// app/onboardingScreens/OnboardingRating.js
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  Linking,
  Modal,
  Platform,
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

const TESTIMONIALS = [
  {
    name: 'Sarah',
    text: 'Dr. Acne helped me understand my skin better. My routine is finally working!',
    isRight: true,
  },
  {
    name: 'Mike',
    text: 'The AI analysis was spot-on. I wish I had this app years ago when I struggled with acne.',
    isRight: false,
  },
  {
    name: 'Emma',
    text: 'Finally, a skincare app that actually knows what it is talking about. My skin has never looked better.',
    isRight: true,
  },
];

export default function OnboardingRating({ onNext }) {
  const [showPopup, setShowPopup] = useState(false);
  const [userRating, setUserRating] = useState(0);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const testimonialsAnim = useRef(TESTIMONIALS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
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
      setShowPopup(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleStarPress = async (rating) => {
    setUserRating(rating);
    setShowPopup(false);
    
    Alert.alert(
      'Thank you for rating!',
      `You selected ${rating} star${rating > 1 ? 's' : ''}. Would you like to leave a review in the ${Platform.OS === 'ios' ? 'App Store' : 'Play Store'}?`,
      [
        {
          text: 'Not Now',
          style: 'cancel',
          onPress: () => {
            onNext('onboardingSaveProgress', {
              rating: rating,
              ratedInStore: false,
              ratingCompleted: true,
            });
          }
        },
        {
          text: 'Yes, Review',
          onPress: async () => {
            const storeUrl = Platform.select({
              ios: 'itms-apps://itunes.apple.com/app/id6741170145',
              android: 'market://details?id=com.dracne.app',
            });

            try {
              const canOpen = await Linking.canOpenURL(storeUrl);
              if (canOpen) {
                await Linking.openURL(storeUrl);
              } else {
                throw new Error('Store app not available');
              }
            } catch {
              const webUrl = Platform.select({
                ios: 'https://apps.apple.com/app/id6741170145',
                android: 'https://play.google.com/store/apps/details?id=com.dracne.app',
              });
              
              try {
                await Linking.openURL(webUrl);
              } catch {
                Alert.alert(
                  'Store Not Available',
                  'Unable to open the app store. Please search for "Dr. Acne" in your app store manually.',
                  [{ text: 'OK' }]
                );
              }
            }
            
            onNext('onboardingSaveProgress', {
              rating: rating,
              ratedInStore: true,
              ratingCompleted: true,
            });
          }
        }
      ]
    );
  };

  const handleNotNow = () => {
    setShowPopup(false);
    onNext('onboardingSaveProgress', {
      rating: 0,
      ratedInStore: false,
      ratingSkipped: true,
    });
  };

  const handleContinue = () => {
    onNext('onboardingSaveProgress', {
      rating: 0,
      ratedInStore: false,
      ratingSkipped: true,
    });
  };

  const closePopup = () => {
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

  const renderTestimonial = (testimonial, index) => (
    <Animated.View
      key={testimonial.name}
      style={[
        styles.testimonial,
        { opacity: testimonialsAnim[index] }
      ]}
    >
      {testimonial.isRight ? (
        <>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{testimonial.name[0]}</Text>
          </View>
          <View style={[styles.testimonialBox, styles.testimonialBoxRight]}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{testimonial.name}</Text>
              {renderStars(false, 12)}
            </View>
            <Text style={styles.testimonialText}>{testimonial.text}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={[styles.testimonialBox, styles.testimonialBoxLeft]}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{testimonial.name}</Text>
              {renderStars(false, 12)}
            </View>
            <Text style={styles.testimonialText}>{testimonial.text}</Text>
          </View>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{testimonial.name[0]}</Text>
          </View>
        </>
      )}
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Give us a rating</Text>
      </Animated.View>

      <Animated.View style={[styles.socialProofContainer, { opacity: fadeAnim }]}>
        <Text style={styles.socialProofTitle}>Dr. Acne was made for people like you</Text>
        <View style={styles.usersContainer}>
          <View style={styles.userAvatarsContainer}>
            {Array.from({ length: 3 }).map((_, index) => (
              <View key={index} style={[styles.userAvatar, { marginLeft: index > 0 ? -10 : 0 }]}>
                <Text style={styles.userAvatarText}>U</Text>
              </View>
            ))}
          </View>
          <Text style={styles.usersCount}>Dr. Acne Users</Text>
        </View>
      </Animated.View>

      <View style={styles.testimonialsContainer}>
        {TESTIMONIALS.map((testimonial, index) => renderTestimonial(testimonial, index))}
      </View>

      <View style={styles.buttonContainer}>
        <DrAcneButton
          title="Continue"
          onPress={handleContinue}
          style={styles.button}
        />
      </View>

      {/* ✓ NATIVE iOS/Android Rating Popup - DO NOT CHANGE */}
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
              
              <Text style={styles.popupTitle}>Enjoying Dr. Acne?</Text>
              <Text style={styles.popupSubtitle}>
                Tap a star to rate it on the{'\n'}{Platform.OS === 'ios' ? 'App Store' : 'Play Store'}.
              </Text>
              
              <View style={styles.separator} />
              
              <View style={styles.popupStarsContainer}>
                {renderStars(true, 24)}
              </View>
              
              <View style={styles.separator} />
              
              <TouchableOpacity style={styles.notNowButton} onPress={handleNotNow}>
                <Text style={styles.notNowButtonText}>Not Now</Text>
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
    paddingBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
  },
  socialProofContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    alignItems: 'center',
  },
  socialProofTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 16,
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
  testimonialsContainer: {
    paddingHorizontal: 24,
    flex: 1,
  },
  testimonial: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    padding: 16,
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
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginRight: 8,
  },
  testimonialText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
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
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: 'transparent',
  },
  button: {
    paddingVertical: 16,
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