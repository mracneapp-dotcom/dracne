// app/LibraryScreen.js - Modern Design with Banner
import React, { useState } from 'react';
import {
  Image,
  Modal,
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
};

const SKINCARE_TIPS = [
  {
    id: 1,
    title: 'Pillowcase Care',
    icon: require('../assets/images/pillow.png'),
    shortDescription: 'Change regularly for clearer skin',
    fullDescription: 'Your pillowcase collects oil, bacteria, and dead skin cells every night. These can clog your pores and cause breakouts.\n\n✓ Change pillowcases 2-3 times per week\n✓ Use cotton or silk fabric (avoid synthetic materials)\n✓ Wash with fragrance-free detergent\n✓ Consider having 4-6 pillowcases in rotation\n\nThis simple habit can significantly reduce acne breakouts and improve skin clarity.',
  },
  {
    id: 2,
    title: 'Cotton Pads',
    icon: require('../assets/images/cotton-pad.png'),
    shortDescription: 'The right way to apply products',
    fullDescription: 'Cotton pads help apply products evenly and hygienically without transferring bacteria from your hands.\n\n✓ Use 100% cotton pads (avoid synthetic blends)\n✓ Perfect for toners and essences\n✓ Apply with gentle patting motions\n✓ Never rub or drag across skin\n✓ Use separate pads for different products\n\nThis ensures even product distribution and prevents contamination.',
  },
  {
    id: 3,
    title: 'Phone Hygiene',
    icon: require('../assets/images/phone.png'),
    shortDescription: 'Clean your phone screen daily',
    fullDescription: 'Your phone touches your face multiple times daily and harbors more bacteria than most surfaces.\n\n✓ Clean screen with alcohol wipes 2x daily\n✓ Use speakerphone when possible\n✓ Never place phone on dirty surfaces\n✓ Consider using earbuds for calls\n\nReducing phone-to-face contact can prevent jawline and cheek acne.',
  },
  {
    id: 4,
    title: 'Hair Products',
    icon: require('../assets/images/hair.png'),
    shortDescription: 'Keep hair products off your face',
    fullDescription: 'Hair products can migrate to your skin and cause clogged pores, especially along the hairline and forehead.\n\n✓ Tie hair back during skincare routine\n✓ Rinse hair products completely in shower\n✓ Apply hair products away from hairline\n✓ Use non-comedogenic hair products when possible\n✓ Wash pillowcase after using heavy styling products\n\nThis prevents pomade acne and forehead breakouts.',
  },
  {
    id: 5,
    title: 'Towel Hygiene',
    icon: require('../assets/images/towel.png'),
    shortDescription: 'Use clean towels for your face',
    fullDescription: 'Damp towels are breeding grounds for bacteria that can transfer to your freshly cleansed skin.\n\n✓ Use a dedicated face towel separate from body towels\n✓ Change face towel every 2-3 days\n✓ Pat dry gently, never rub\n✓ Consider disposable face towels for acne-prone skin\n✓ Wash towels in hot water with mild detergent\n\nThis simple switch prevents recontamination after cleansing.',
  },
  {
    id: 6,
    title: 'Hydration',
    icon: require('../assets/images/water.png'),
    shortDescription: 'Drink water for healthy skin',
    fullDescription: 'Proper hydration supports skin cell function and helps flush toxins that can contribute to breakouts.\n\n✓ Aim for 8 glasses (2 liters) of water daily\n✓ Drink more during exercise or hot weather\n✓ Hydrated skin heals faster from acne\n✓ Water helps regulate oil production\n✓ Supports overall skin barrier function\n\nDehydrated skin can overproduce oil, leading to more breakouts.',
  },
  {
    id: 7,
    title: 'Sun Protection',
    icon: require('../assets/images/sun.png'),
    shortDescription: 'SPF every day, rain or shine',
    fullDescription: 'UV damage worsens acne scarring and can trigger inflammation in acne-prone skin.\n\n✓ Apply SPF 30-50 broad spectrum daily\n✓ Reapply every 2 hours when outdoors\n✓ Choose oil-free, non-comedogenic formulas\n✓ Mineral sunscreens (zinc oxide) are gentler\n✓ SPF prevents dark spots from acne\n\nConsistent sun protection is crucial for preventing post-acne marks.',
  },
  {
    id: 8,
    title: 'Hand Hygiene',
    icon: require('../assets/images/hands.png'),
    shortDescription: 'Never touch your face',
    fullDescription: 'Touching your face transfers bacteria, oil, and dirt from your hands directly to your pores.\n\n✓ Avoid touching face throughout the day\n✓ Never pick or pop pimples\n✓ Wash hands before skincare routine\n✓ Use tissues instead of fingers when needed\n✓ Be mindful of unconscious face-touching\n\nThis single habit can dramatically reduce breakouts.',
  },
];

export const LibraryScreen = ({ onNavigateHome }) => {
  const [selectedTip, setSelectedTip] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCardPress = (tip) => {
    setSelectedTip(tip);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedTip(null), 300);
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation with Logo */}
      <View style={styles.topNavigation}>
        <TouchableOpacity 
          style={styles.logoButton}
          onPress={onNavigateHome}
          activeOpacity={0.7}
        >
          <Image 
            source={require('../assets/images/dracne-logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image 
          source={require('../assets/images/Banner Library.png')} 
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>

      {/* Header Title */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Skincare <Text style={styles.headerTitleGreen}>Library</Text>
        </Text>
        <Text style={styles.headerSubtitle}>Expert tips for clearer skin</Text>
      </View>

      {/* Tip Cards Grid */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.cardsContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
      >
        <View style={styles.cardsGrid}>
          {SKINCARE_TIPS.map((tip) => (
            <TouchableOpacity
              key={tip.id}
              style={styles.card}
              onPress={() => handleCardPress(tip)}
              activeOpacity={0.7}
            >
              <View style={styles.cardIconWrapper}>
                <Image 
                  source={tip.icon} 
                  style={styles.cardIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.cardTitle}>{tip.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Detail Modal - Modern Centered Style */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          {/* Decorative Background Dots */}
          <View style={styles.decorativeDot1} />
          <View style={styles.decorativeDot2} />
          <View style={styles.decorativeDot3} />
          <View style={styles.decorativeDot4} />
          <View style={styles.decorativeDot5} />
          
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedTip && (
                <>
                  {/* Modal Header - Centered Icon */}
                  <View style={styles.modalHeader}>
                    <View style={styles.modalIconWrapper}>
                      <Image 
                        source={selectedTip.icon} 
                        style={styles.modalHeaderIcon}
                        resizeMode="contain"
                      />
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.closeButton}
                      onPress={closeModal}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                    
                    <Text style={styles.modalTitle}>{selectedTip.title}</Text>
                  </View>

                  {/* Modal Body */}
                  <ScrollView 
                    style={styles.modalScrollView}
                    contentContainerStyle={styles.modalScrollContent}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    overScrollMode="never"
                  >
                    <Text style={styles.modalDescription}>
                      {selectedTip.fullDescription}
                    </Text>
                  </ScrollView>

                  {/* Modal Footer */}
                  <View style={styles.modalFooter}>
                    <TouchableOpacity 
                      style={styles.modalButton}
                      onPress={closeModal}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.modalButtonText}>Got it!</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingBottom: 100,
  },
  topNavigation: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: 'transparent',
  },
  logoButton: {
    alignSelf: 'flex-start',
  },
  logoImage: {
    width: 80,
    height: 50,
  },
  bannerContainer: {
    width: '100%',
    height: 120,
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 5,
  },
  headerTitleGreen: {
    color: BRAND_COLORS.primary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: BRAND_COLORS.gray,
  },
  scrollView: {
    flex: 1,
  },
  cardsContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    aspectRatio: 0.75,
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  cardIconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: `${BRAND_COLORS.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    width: 36,
    height: 36,
    tintColor: BRAND_COLORS.primary,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    lineHeight: 20,
  },
  
  // Modal Styles - Modern Centered Design
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  decorativeDot1: {
    position: 'absolute',
    top: 80,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: BRAND_COLORS.primary,
    opacity: 0.1,
  },
  decorativeDot2: {
    position: 'absolute',
    top: 180,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BRAND_COLORS.secondary,
    opacity: 0.1,
  },
  decorativeDot3: {
    position: 'absolute',
    bottom: 200,
    right: 40,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    opacity: 0.08,
  },
  decorativeDot4: {
    position: 'absolute',
    top: 350,
    left: 50,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: BRAND_COLORS.primary,
    opacity: 0.06,
  },
  decorativeDot5: {
    position: 'absolute',
    bottom: 350,
    left: 30,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: BRAND_COLORS.secondary,
    opacity: 0.07,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalContent: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 10,
    paddingTop: 30,
  },
  modalHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: 'relative',
  },
  modalIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: `${BRAND_COLORS.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalHeaderIcon: {
    width: 44,
    height: 44,
    tintColor: BRAND_COLORS.primary,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: BRAND_COLORS.darkGray,
    fontWeight: '600',
  },
  modalScrollView: {
    maxHeight: 350,
  },
  modalScrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 15,
    color: BRAND_COLORS.darkGray,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'left',
  },
  modalFooter: {
    padding: 24,
    paddingTop: 10,
  },
  modalButton: {
    backgroundColor: BRAND_COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  modalButtonText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});