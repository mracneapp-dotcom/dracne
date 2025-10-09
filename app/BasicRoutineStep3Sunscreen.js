// app/BasicRoutineStep3Sunscreen.js
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

// Product data for each skin type - Step 3 (Sunscreen)
const SUNSCREEN_PRODUCTS = {
  oily: [
    {
      id: 'sunscreen_oily_1',
      name: 'TIZO Mineral Sun Defense',
      description: '100% mineral sunscreen with matte finish',
      benefits: ['Matte finish', 'Mineral', 'SPF 50'],
    },
    {
      id: 'sunscreen_oily_2',
      name: 'Beauty of Joseon Relief Sun',
      description: 'Lightweight new-gen chemical sunscreen',
      benefits: ['Lightweight', 'No white cast', 'SPF 50+'],
    },
    {
      id: 'sunscreen_oily_3',
      name: 'Isntree Hyaluronic Watery Sun Gel',
      description: 'Water-based gel sunscreen',
      benefits: ['Fresh finish', 'Hydrating', 'SPF 50+'],
    },
    {
      id: 'sunscreen_oily_4',
      name: 'EltaMD UV Clear',
      description: 'Mineral sunscreen for acne-prone skin',
      benefits: ['Oil-free', 'Niacinamide', 'SPF 46'],
    },
    {
      id: 'sunscreen_oily_5',
      name: 'La Roche-Posay Anthelios',
      description: 'Dermatologist-recommended sunscreen',
      benefits: ['Matte finish', 'Tested', 'SPF 50+'],
    },
  ],
  dry: [
    {
      id: 'sunscreen_dry_1',
      name: 'TIZO AM Replenish / Tinted',
      description: 'Hydrating mineral sunscreen',
      benefits: ['Moisturizing', 'Tinted option', 'SPF 40'],
    },
    {
      id: 'sunscreen_dry_2',
      name: 'Avene Solaire Mineral',
      description: 'Ultra-gentle mineral sunscreen',
      benefits: ['Hydrating', 'Thermal water', 'SPF 50+'],
    },
    {
      id: 'sunscreen_dry_3',
      name: 'Beauty of Joseon Relief Sun',
      description: 'Hydrating chemical sunscreen',
      benefits: ['Dewy finish', 'Comfortable', 'SPF 50+'],
    },
    {
      id: 'sunscreen_dry_4',
      name: 'La Roche-Posay Anthelios',
      description: 'Hydrating sunscreen for dry skin',
      benefits: ['Moisturizing', 'Professional', 'SPF 50+'],
    },
    {
      id: 'sunscreen_dry_5',
      name: 'CeraVe Hydrating Sunscreen',
      description: 'Moisturizing sunscreen with ceramides',
      benefits: ['Affordable', 'Ceramides', 'SPF 30'],
    },
  ],
  combination: [
    {
      id: 'sunscreen_combo_1',
      name: 'TIZO Mineral Sun Defense',
      description: 'Balanced mineral sunscreen',
      benefits: ['Versatile', 'Mineral', 'SPF 50'],
    },
    {
      id: 'sunscreen_combo_2',
      name: 'Beauty of Joseon Relief Sun',
      description: 'Perfect for combination skin',
      benefits: ['Balanced', 'Popular', 'SPF 50+'],
    },
    {
      id: 'sunscreen_combo_3',
      name: 'Isntree Watery Sun Gel',
      description: 'Fresh lightweight sunscreen',
      benefits: ['Light', 'Hydrating', 'SPF 50+'],
    },
    {
      id: 'sunscreen_combo_4',
      name: 'EltaMD UV Clear',
      description: 'Oil-free mineral sunscreen',
      benefits: ['Balanced', 'Professional', 'SPF 46'],
    },
    {
      id: 'sunscreen_combo_5',
      name: 'La Roche-Posay Anthelios',
      description: 'Dermatologist-recommended',
      benefits: ['Reliable', 'Tested', 'SPF 50+'],
    },
  ],
  normal: [
    {
      id: 'sunscreen_normal_1',
      name: 'TIZO Mineral Sun Defense',
      description: 'Professional mineral sunscreen',
      benefits: ['Reliable', 'Mineral', 'SPF 50'],
    },
    {
      id: 'sunscreen_normal_2',
      name: 'Beauty of Joseon Relief Sun',
      description: 'Perfect daily sunscreen',
      benefits: ['Elegant', 'Comfortable', 'SPF 50+'],
    },
    {
      id: 'sunscreen_normal_3',
      name: 'EltaMD UV Clear',
      description: 'Professional daily sunscreen',
      benefits: ['Professional', 'Clean', 'SPF 46'],
    },
    {
      id: 'sunscreen_normal_4',
      name: 'La Roche-Posay Anthelios',
      description: 'Dermatologist-recommended',
      benefits: ['Tested', 'Reliable', 'SPF 50+'],
    },
    {
      id: 'sunscreen_normal_5',
      name: 'Isntree Watery Sun Gel',
      description: 'Lightweight daily sunscreen',
      benefits: ['Fresh', 'Hydrating', 'SPF 50+'],
    },
  ],
  sensitive: [
    {
      id: 'sunscreen_sens_1',
      name: 'TIZO AM Replenish / Mineral Sun Defense',
      description: 'Ultra-gentle mineral sunscreen',
      benefits: ['100% mineral', 'Safe', 'SPF 40-50'],
    },
    {
      id: 'sunscreen_sens_2',
      name: 'Avene Solaire Mineral',
      description: 'Mineral sunscreen for reactive skin',
      benefits: ['Thermal water', 'Gentle', 'SPF 50+'],
    },
    {
      id: 'sunscreen_sens_3',
      name: 'EltaMD UV Physical',
      description: '100% mineral tinted sunscreen',
      benefits: ['Physical only', 'Safe', 'SPF 41'],
    },
    {
      id: 'sunscreen_sens_4',
      name: 'La Roche-Posay Anthelios Mineral',
      description: 'Gentle mineral formula',
      benefits: ['Tested', 'Fragrance-free', 'SPF 50'],
    },
    {
      id: 'sunscreen_sens_5',
      name: 'CeraVe Mineral Sunscreen',
      description: 'Affordable gentle sunscreen',
      benefits: ['Budget-friendly', 'Mineral', 'SPF 30'],
    },
  ],
};

export default function BasicRoutineStep3Sunscreen({ onBack, onComplete }) {
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
        setProducts(SUNSCREEN_PRODUCTS[savedSkinType] || SUNSCREEN_PRODUCTS.normal);
      } else {
        setProducts(SUNSCREEN_PRODUCTS.normal);
      }
    } catch (error) {
      console.error('Error loading skin type:', error);
      setProducts(SUNSCREEN_PRODUCTS.normal);
    }
  };

  const handleComplete = () => {
    if (selectedProduct && onComplete) {
      onComplete(selectedProduct);
    }
  };

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;
  const currentStep = 3;
  const totalSteps = 3;

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
                source={require('../assets/images/sunscreen.png')}
                style={styles.productIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.productTitle}>Sunscreen (SPF 30+)</Text>
            <Text style={styles.productSubtitle}>Morning Step 3</Text>
          </View>

          {/* Explanation Box */}
          <View style={styles.explanationBox}>
            <Text style={styles.explanationTitle}>Why this matters</Text>
            <Text style={styles.explanationText}>
              Sunscreen is the most important anti-aging and skin protection step. Apply 2-3 fingers worth for face and neck. Never mix with skincare or makeup - it must be a standalone layer for full protection. Reapply every 2 hours when exposed to sun.
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
          title="Complete Basic Routine Setup"
          onPress={handleComplete}
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
    textAlign: 'center',
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