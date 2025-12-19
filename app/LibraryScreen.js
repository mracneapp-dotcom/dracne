// app/LibraryScreen.js - WITH SPANISH I18N (COMPLETE)
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
import { t } from './i18n';

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
    title: 'library.tips.pillowcase.title',
    icon: require('../assets/images/pillow.png'),
    shortDescription: 'library.tips.pillowcase.short',
    fullDescription: 'library.tips.pillowcase.full',
  },
  {
    id: 2,
    title: 'library.tips.cotton.title',
    icon: require('../assets/images/cotton-pad.png'),
    shortDescription: 'library.tips.cotton.short',
    fullDescription: 'library.tips.cotton.full',
  },
  {
    id: 3,
    title: 'library.tips.phone.title',
    icon: require('../assets/images/phone.png'),
    shortDescription: 'library.tips.phone.short',
    fullDescription: 'library.tips.phone.full',
  },
  {
    id: 4,
    title: 'library.tips.hair.title',
    icon: require('../assets/images/hair.png'),
    shortDescription: 'library.tips.hair.short',
    fullDescription: 'library.tips.hair.full',
  },
  {
    id: 5,
    title: 'library.tips.towel.title',
    icon: require('../assets/images/towel.png'),
    shortDescription: 'library.tips.towel.short',
    fullDescription: 'library.tips.towel.full',
  },
  {
    id: 6,
    title: 'library.tips.hydration.title',
    icon: require('../assets/images/water.png'),
    shortDescription: 'library.tips.hydration.short',
    fullDescription: 'library.tips.hydration.full',
  },
  {
    id: 7,
    title: 'library.tips.sun.title',
    icon: require('../assets/images/sun.png'),
    shortDescription: 'library.tips.sun.short',
    fullDescription: 'library.tips.sun.full',
  },
  {
    id: 8,
    title: 'library.tips.hands.title',
    icon: require('../assets/images/hands.png'),
    shortDescription: 'library.tips.hands.short',
    fullDescription: 'library.tips.hands.full',
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
          {t('library.title')} <Text style={styles.headerTitleGreen}>{t('library.title_highlight')}</Text>
        </Text>
        <Text style={styles.headerSubtitle}>{t('library.subtitle')}</Text>
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
              <Text style={styles.cardTitle}>{t(tip.title)}</Text>
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
                    
                    <Text style={styles.modalTitle}>{t(selectedTip.title)}</Text>
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
                      {t(selectedTip.fullDescription)}
                    </Text>
                  </ScrollView>

                  {/* Modal Footer */}
                  <View style={styles.modalFooter}>
                    <TouchableOpacity 
                      style={styles.modalButton}
                      onPress={closeModal}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.modalButtonText}>{t('library.modal_button')}</Text>
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
    paddingBottom: 10,
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
    paddingBottom: 20,
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