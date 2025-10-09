// app/BasicRoutineProductSelection.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
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
};

const SKIN_TYPE_INFO = {
  oily: { color: '#4A90E2', name: 'Oily Skin' },
  dry: { color: '#F39C12', name: 'Dry Skin' },
  combination: { color: BRAND_COLORS.primary, name: 'Combination Skin' },
  normal: { color: '#9B59B6', name: 'Normal Skin' },
  sensitive: { color: BRAND_COLORS.primary, name: 'Sensitive Skin' },
};

// Product data for each skin type - Step 1 (Cleanser)
const CLEANSER_PRODUCTS = {
  oily: [
    {
      id: 'cleanser_oily_1',
      name: 'KraveBeauty Matcha Hemp',
      description: 'Low-pH gel cleanser with matcha and hemp seed oil',
      benefits: ['Gentle', 'Balancing', 'Non-stripping'],
    },
    {
      id: 'cleanser_oily_2',
      name: 'COSRX Low pH Good Morning',
      description: 'Mild gel cleanser with tea tree oil and BHA',
      benefits: ['pH 5.0-6.0', 'Refreshing', 'Daily use'],
    },
    {
      id: 'cleanser_oily_3',
      name: 'Round Lab 1025 Dokdo Cleanser',
      description: 'Mineral-rich gel cleanser from deep sea water',
      benefits: ['Hydrating', 'Soothing', 'K-Beauty'],
    },
    {
      id: 'cleanser_oily_4',
      name: 'La Roche-Posay Toleriane Purifying',
      description: 'Foaming cleanser for sensitive oily skin',
      benefits: ['Dermatologist-tested', 'Fragrance-free', 'Gentle'],
    },
    {
      id: 'cleanser_oily_5',
      name: 'CeraVe Foaming',
      description: 'Gentle foaming cleanser with ceramides',
      benefits: ['Affordable', 'Ceramides', 'Non-comedogenic'],
    },
  ],
  dry: [
    {
      id: 'cleanser_dry_1',
      name: 'KraveBeauty Oat So Simple Cleanser',
      description: 'Ultra-gentle cream cleanser with oat extract',
      benefits: ['Nourishing', 'Calming', 'Creamy texture'],
    },
    {
      id: 'cleanser_dry_2',
      name: 'Etude SoonJung pH 6.5 Whip',
      description: 'Whipped cream cleanser for sensitive dry skin',
      benefits: ['pH 6.5', 'Hypoallergenic', 'Moisturizing'],
    },
    {
      id: 'cleanser_dry_3',
      name: 'Vanicream Gentle Cleanser',
      description: 'Dermatologist-recommended gentle cleanser',
      benefits: ['Fragrance-free', 'Dye-free', 'Non-irritating'],
    },
    {
      id: 'cleanser_dry_4',
      name: 'Avene Tolerance',
      description: 'Ultra-gentle cream cleanser for reactive skin',
      benefits: ['Thermal water', 'Minimal ingredients', 'Soothing'],
    },
    {
      id: 'cleanser_dry_5',
      name: 'Cetaphil Gentle Cleanser',
      description: 'Classic gentle cleanser for dry sensitive skin',
      benefits: ['Budget-friendly', 'Soap-free', 'Mild'],
    },
  ],
  combination: [
    {
      id: 'cleanser_combo_1',
      name: 'KraveBeauty Matcha Hemp',
      description: 'Balanced gel cleanser suitable for all zones',
      benefits: ['Balancing', 'Gentle', 'Low pH'],
    },
    {
      id: 'cleanser_combo_2',
      name: 'Etude SoonJung pH 6.5 Whip',
      description: 'Gentle cleanser that respects skin barrier',
      benefits: ['pH-balanced', 'Soft foam', 'Non-drying'],
    },
    {
      id: 'cleanser_combo_3',
      name: 'La Roche-Posay Toleriane Purifying',
      description: 'Balanced cleansing for combination skin',
      benefits: ['Purifying', 'Comfortable', 'Tested'],
    },
    {
      id: 'cleanser_combo_4',
      name: 'Round Lab Dokdo Cleanser',
      description: 'Mineral-balanced gentle cleanser',
      benefits: ['Hydrating', 'Fresh', 'K-Beauty'],
    },
    {
      id: 'cleanser_combo_5',
      name: 'Neutrogena Ultra Gentle',
      description: 'Simple effective cleanser for daily use',
      benefits: ['Affordable', 'Effective', 'Gentle'],
    },
  ],
  normal: [
    {
      id: 'cleanser_normal_1',
      name: 'KraveBeauty Matcha Hemp',
      description: 'Perfect low-pH cleanser for healthy skin',
      benefits: ['Maintains balance', 'Gentle', 'Daily use'],
    },
    {
      id: 'cleanser_normal_2',
      name: 'Round Lab Dokdo Cleanser',
      description: 'Mineral-rich refreshing cleanser',
      benefits: ['Hydrating', 'Clean finish', 'Popular'],
    },
    {
      id: 'cleanser_normal_3',
      name: 'Cetaphil Gentle Cleanser',
      description: 'Classic gentle daily cleanser',
      benefits: ['Simple', 'Reliable', 'Budget-friendly'],
    },
    {
      id: 'cleanser_normal_4',
      name: 'La Roche-Posay Toleriane',
      description: 'Dermatologist-recommended daily cleanser',
      benefits: ['Professional', 'Gentle', 'Effective'],
    },
    {
      id: 'cleanser_normal_5',
      name: 'COSRX Low pH Good Morning',
      description: 'Refreshing morning cleanser',
      benefits: ['Low pH', 'Energizing', 'Light'],
    },
  ],
  sensitive: [
    {
      id: 'cleanser_sens_1',
      name: 'Avene Tolerance Extremely Gentle',
      description: 'Ultra-gentle cream cleanser for reactive skin',
      benefits: ['Minimal ingredients', 'Soothing', 'Safe'],
    },
    {
      id: 'cleanser_sens_2',
      name: 'Etude SoonJung pH 6.5 Whip',
      description: 'Hypoallergenic whipped cleanser',
      benefits: ['pH 6.5', 'Tested', 'Soft'],
    },
    {
      id: 'cleanser_sens_3',
      name: 'Vanicream Gentle Cleanser',
      description: 'Free of common irritants',
      benefits: ['Fragrance-free', 'Safe', 'Simple'],
    },
    {
      id: 'cleanser_sens_4',
      name: 'La Roche-Posay Toleriane',
      description: 'Dermatologist-recommended for sensitive skin',
      benefits: ['Tested', 'Gentle', 'Reliable'],
    },
    {
      id: 'cleanser_sens_5',
      name: 'CeraVe Hydrating',
      description: 'Gentle hydrating cleanser with ceramides',
      benefits: ['Ceramides', 'Affordable', 'Non-irritating'],
    },
  ],
};

export default function BasicRoutineProductSelection({ onBack, onContinue, currentStep = 1 }) {
  const [skinType, setSkinType] = useState('normal');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadSkinType();
  }, []);

  const loadSkinType = async () => {
    try {
      const savedSkinType = await AsyncStorage.getItem('userSkinType');
      if (savedSkinType) {
        setSkinType(savedSkinType);
        setProducts(CLEANSER_PRODUCTS[savedSkinType] || CLEANSER_PRODUCTS.normal);
      } else {
        setProducts(CLEANSER_PRODUCTS.normal);
      }
    } catch (error) {
      console.error('Error loading skin type:', error);
      setProducts(CLEANSER_PRODUCTS.normal);
    }
  };

  const handleContinue = () => {
    if (selectedProduct && onContinue) {
      onContinue(selectedProduct);
    }
  };

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;
  const totalSteps = 3; // Basic routine has 3 steps: Cleanser, Moisturizer, Sunscreen

  return (
    <View style={styles.container}>
      {/* Top Navigation with Logo */}
      <View style={styles.topNavigation}>
        <TouchableOpacity onPress={onBack} style={styles.logoButton}>
          <Image 
            source={require('../assets/images/dracne-logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Banner Image */}
      <View style={styles.bannerContainer}>
        <Image 
          source={require('../assets/images/Banner Day Routine 1.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Step {currentStep} of {totalSteps}</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(currentStep / totalSteps) * 100}%` }]} />
            </View>
          </View>

          {/* Skin Type Badge */}
          <View style={[styles.skinTypeBadge, { backgroundColor: `${skinTypeInfo.color}15` }]}>
            <Text style={[styles.skinTypeText, { color: skinTypeInfo.color }]}>
              For {skinTypeInfo.name}
            </Text>
          </View>

          {/* Product Header */}
          <View style={styles.productHeader}>
            <View style={styles.productIconContainer}>
              <Image 
                source={require('../assets/images/cream.png')}
                style={styles.productIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.productTitle}>Gentle Cleanser</Text>
            <Text style={styles.productSubtitle}>Morning Step 1</Text>
          </View>

          {/* Explanation Box */}
          <View style={styles.explanationBox}>
            <Text style={styles.explanationTitle}>Why this matters</Text>
            <Text style={styles.explanationText}>
              A gentle cleanser removes dirt, oil, and impurities without stripping your skin's natural moisture barrier. Look for low-pH formulas (pH 4.5-6.5) with mild surfactants that leave your skin feeling clean but not tight.
            </Text>
          </View>

          {/* Product Selection */}
          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>Choose Your Product</Text>
            
            {products.map((product, index) => (
              <TouchableOpacity
                key={product.id}
                style={[
                  styles.productCard,
                  selectedProduct?.id === product.id && [styles.productCardSelected, { borderColor: skinTypeInfo.color }]
                ]}
                onPress={() => setSelectedProduct(product)}
                activeOpacity={0.7}
              >
                <View style={styles.productCardHeader}>
                  <View style={styles.productCardLeft}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productDescription}>{product.description}</Text>
                  </View>
                  {selectedProduct?.id === product.id && (
                    <View style={[styles.checkmark, { backgroundColor: skinTypeInfo.color }]}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.benefitsRow}>
                  {product.benefits.map((benefit, idx) => (
                    <View key={idx} style={styles.benefitTag}>
                      <Text style={styles.benefitTagText}>{benefit}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bottom spacing */}
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomSection}>
        <DrAcneButton
          title="Continue to Next Step"
          onPress={handleContinue}
          disabled={!selectedProduct}
          style={[styles.continueButton, !selectedProduct && styles.continueButtonDisabled]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
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
    marginBottom: 15,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.darkGray,
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 6,
    backgroundColor: BRAND_COLORS.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: BRAND_COLORS.primary,
    borderRadius: 3,
  },
  skinTypeBadge: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  skinTypeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  productHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  productIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productIcon: {
    width: 50,
    height: 50,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 4,
  },
  productSubtitle: {
    fontSize: 14,
    color: BRAND_COLORS.gray,
    fontWeight: '500',
  },
  explanationBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 6,
  },
  explanationText: {
    fontSize: 13,
    color: BRAND_COLORS.darkGray,
    lineHeight: 18,
  },
  selectionContainer: {
    marginBottom: 10,
  },
  selectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 12,
  },
  productCard: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  productCardSelected: {
    borderWidth: 2.5,
    shadowOpacity: 0.15,
    elevation: 4,
  },
  productCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  productCardLeft: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 15,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    lineHeight: 16,
  },
  checkmark: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: BRAND_COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
  benefitsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  benefitTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  benefitTagText: {
    fontSize: 10,
    color: BRAND_COLORS.darkGray,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 90,
    backgroundColor: '#FAFBFC',
    alignItems: 'center',
  },
  continueButton: {
    width: '100%',
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
});