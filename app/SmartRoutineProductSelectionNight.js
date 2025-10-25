// app/SmartRoutineProductSelectionNight.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SmartRoutineCompletionModal from '../components/modals/SmartRoutineCompletionModal';
import { DrAcneButton } from '../components/ui/DrAcneButton';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#999999',
  darkGray: '#666666',
  lightGray: '#E5E5E5',
  smartBlue: '#82b2df',
};

const CONCERN_INFO = {
  nodules: { name: 'Inflamed Acne', color: '#FF7A7A' },
  papules: { name: 'Papules & Pustules', color: '#F39C12' },
  blackheads: { name: 'Blackheads', color: '#4A90E2' },
  whiteheads: { name: 'Whiteheads', color: '#7CB342' },
  marks: { name: 'Dark Spots & Marks', color: '#9B59B6' },
};

const NIGHT_PRODUCTS = [
  {
    id: 'night1',
    name: "Paula's Choice 2% BHA Liquid",
    description: 'Salicylic acid exfoliant',
    tags: ['Effective', 'Popular'],
  },
  {
    id: 'night2',
    name: 'The Ordinary Niacinamide 10% + Zinc 1%',
    description: 'Reduces blemishes',
    tags: ['Budget', 'Gentle'],
  },
  {
    id: 'night3',
    name: 'Some By Mi AHA BHA PHA Toner',
    description: 'Multi-acid gentle exfoliant',
    tags: ['Triple action', 'Gentle', 'K-Beauty'],
  },
  {
    id: 'night4',
    name: 'La Roche-Posay Effaclar Duo+',
    description: 'Anti-blemish treatment',
    tags: ['Dermatologist', 'Popular'],
  },
];

export default function SmartRoutineProductSelectionNight({ 
  onNavigateHome,
  onNavigateBack,
  onNavigateToSmartRoutineHub,
  concernId,
  dayProducts = [],
}) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [routineCompletionData, setRoutineCompletionData] = useState(null);

  useEffect(() => {
    console.log('=== NIGHT SCREEN LOADED ===');
    console.log('concernId:', concernId);
    console.log('dayProducts received:', dayProducts);
    console.log('dayProducts length:', dayProducts?.length);
  }, []);

  const concernData = concernId ? CONCERN_INFO[concernId] : null;

  const handleProductToggle = (product) => {
    setSelectedProducts((prev) => {
      const isSelected = prev.some((p) => p.id === product.id);
      if (isSelected) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleSaveRoutine = async () => {
    console.log('=== SAVING ROUTINE ===');
    console.log('Day products:', dayProducts);
    console.log('Night products:', selectedProducts);

    const routineData = {
      concernName: concernData?.name || 'Smart Routine',
      concernColor: concernData?.color || '#82b2df',
      dayProducts: dayProducts.map((product, index) => ({
        id: product.id || `day-${index}`,
        name: product.name,
      })),
      nightProducts: selectedProducts.map((product, index) => ({
        id: product.id || `night-${index}`,
        name: product.name,
      })),
    };

    console.log('Final routineData:', JSON.stringify(routineData, null, 2));

    try {
      await AsyncStorage.setItem('smartRoutine', JSON.stringify(routineData));
      console.log('✓ Saved to AsyncStorage');
    } catch (error) {
      console.error('Error saving routine:', error);
    }

    setRoutineCompletionData(routineData);
    setShowCompletionModal(true);
  };

  const totalSteps = 2;
  const currentStep = 2;

  return (
    <View style={styles.container}>
      <View style={styles.topNavigation}>
        <TouchableOpacity onPress={onNavigateHome} style={styles.logoButton}>
          <Image 
            source={require('../assets/images/dracne-logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.bannerContainer}
        onPress={onNavigateBack}
        activeOpacity={0.9}
      >
        <Image 
          source={require('../assets/images/Banner Smart Routine.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <TouchableOpacity
                onPress={onNavigateBack}
                style={styles.arrowButton}
                activeOpacity={0.7}
              >
                <Text style={styles.arrowText}>‹</Text>
              </TouchableOpacity>

              <Text style={styles.progressText}>Step {currentStep} of {totalSteps}</Text>

              <View style={styles.arrowButton} />
            </View>

            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(currentStep / totalSteps) * 100}%` }]} />
            </View>
          </View>

          <View style={styles.infoBox}>
            <Image 
              source={require('../assets/images/check.png')}
              style={styles.infoIcon}
              resizeMode="contain"
            />
            <Text style={styles.infoText}>
              Select evening products for your smart routine. You can choose multiple options to alternate between.
            </Text>
          </View>

          <View style={styles.sectionHeader}>
            <Image 
              source={require('../assets/images/jar cream.png')}
              style={styles.sectionIcon}
              resizeMode="contain"
            />
            <Text style={styles.sectionTitle}>
              Evening Products ({selectedProducts.length} selected)
            </Text>
          </View>

          {NIGHT_PRODUCTS.map((product) => {
            const isSelected = selectedProducts.some((p) => p.id === product.id);
            return (
              <TouchableOpacity
                key={product.id}
                style={[
                  styles.productCard,
                  isSelected && styles.productCardSelected,
                ]}
                onPress={() => handleProductToggle(product)}
                activeOpacity={0.7}
              >
                <View style={styles.productHeader}>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productDescription}>{product.description}</Text>
                  </View>
                  <View
                    style={[
                      styles.checkbox,
                      isSelected && styles.checkboxSelected,
                    ]}
                  >
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </View>
                <View style={styles.tagsContainer}>
                  {product.tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title="Save Smart Routine"
          onPress={handleSaveRoutine}
          disabled={selectedProducts.length === 0}
          style={styles.saveButton}
        />
      </View>

      <SmartRoutineCompletionModal
        visible={showCompletionModal}
        onClose={() => {
          setShowCompletionModal(false);
          if (onNavigateToSmartRoutineHub) {
            onNavigateToSmartRoutineHub();
          }
        }}
        routineData={routineCompletionData}
      />
    </View>
  );
}

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: '600',
    color: BRAND_COLORS.smartBlue,
    lineHeight: 28,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.darkGray,
    textAlign: 'center',
    minWidth: 100,
  },
  progressBar: {
    height: 6,
    backgroundColor: BRAND_COLORS.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: BRAND_COLORS.smartBlue,
    borderRadius: 3,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#BBDEFB',
    marginBottom: 20,
  },
  infoIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    tintColor: BRAND_COLORS.smartBlue,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    lineHeight: 17,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: BRAND_COLORS.black,
  },
  productCard: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: BRAND_COLORS.lightGray,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  productCardSelected: {
    borderColor: BRAND_COLORS.smartBlue,
    backgroundColor: '#F0F8FF',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  productInfo: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 13,
    color: BRAND_COLORS.gray,
    lineHeight: 18,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: BRAND_COLORS.lightGray,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: BRAND_COLORS.smartBlue,
    borderColor: BRAND_COLORS.smartBlue,
  },
  checkmark: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: BRAND_COLORS.cream,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: BRAND_COLORS.darkGray,
  },
  bottomSpacing: {
    height: 100,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 27,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 90,
    backgroundColor: '#FAFBFC',
    alignItems: 'center',
  },
  saveButton: {
    width: '100%',
  },
});