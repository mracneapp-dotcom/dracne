// app/BasicRoutineStep2Moisturizer.js
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

// Product data for each skin type - Step 2 (Moisturizer)
const MOISTURIZER_PRODUCTS = {
  oily: [
    {
      id: 'moisturizer_oily_1',
      name: 'Beauty of Joseon Dynasty Cream Light',
      description: 'Lightweight gel-cream with rice and probiotics',
      benefits: ['Non-greasy', 'Hydrating', 'K-Beauty'],
    },
    {
      id: 'moisturizer_oily_2',
      name: 'Isntree Hyaluronic Aqua Gel Cream',
      description: 'Water-based gel with 5 types of hyaluronic acid',
      benefits: ['Lightweight', 'Plumping', 'Fresh finish'],
    },
    {
      id: 'moisturizer_oily_3',
      name: 'Innisfree Green Tea Seed Cream',
      description: 'Light gel-cream with green tea extract',
      benefits: ['Oil-control', 'Antioxidant', 'Popular'],
    },
    {
      id: 'moisturizer_oily_4',
      name: 'Neutrogena Hydro Boost',
      description: 'Gel-cream with hyaluronic acid',
      benefits: ['Affordable', 'Oil-free', 'Hydrating'],
    },
    {
      id: 'moisturizer_oily_5',
      name: 'Clinique Dramatically Different Gel',
      description: 'Classic lightweight moisturizing gel',
      benefits: ['Oil-free', 'Trusted', 'Dermatologist-tested'],
    },
  ],
  dry: [
    {
      id: 'moisturizer_dry_1',
      name: 'COSRX Snail 92 All In One Cream',
      description: 'Rich cream with 92% snail mucin',
      benefits: ['Nourishing', 'Repairing', 'Hydrating'],
    },
    {
      id: 'moisturizer_dry_2',
      name: 'Illiyoon Ceramide Ato Concentrate',
      description: 'Intensive barrier cream with ceramides',
      benefits: ['Rich', 'Barrier repair', 'K-Beauty favorite'],
    },
    {
      id: 'moisturizer_dry_3',
      name: "Kiehl's Ultra Facial Cream",
      description: 'Classic rich moisturizer with squalane',
      benefits: ['24-hour hydration', 'Luxurious', 'Iconic'],
    },
    {
      id: 'moisturizer_dry_4',
      name: 'CeraVe Moisturizing Cream',
      description: 'Rich cream with ceramides and hyaluronic acid',
      benefits: ['Affordable', 'Ceramides', 'Dermatologist-loved'],
    },
    {
      id: 'moisturizer_dry_5',
      name: 'First Aid Beauty Ultra Repair',
      description: 'Intensive cream with colloidal oatmeal',
      benefits: ['Soothing', 'Rich', 'Fast-absorbing'],
    },
  ],
  combination: [
    {
      id: 'moisturizer_combo_1',
      name: 'Beauty of Joseon Dynasty Cream',
      description: 'Balanced cream suitable for all zones',
      benefits: ['Balanced', 'Versatile', 'Elegant'],
    },
    {
      id: 'moisturizer_combo_2',
      name: 'Isntree Aloe Soothing Gel',
      description: 'Light gel with aloe and centella',
      benefits: ['Soothing', 'Lightweight', 'Fresh'],
    },
    {
      id: 'moisturizer_combo_3',
      name: 'Clinique Moisture Surge',
      description: 'Auto-replenishing hydration',
      benefits: ['Oil-free', 'Hydrating', 'Balanced'],
    },
    {
      id: 'moisturizer_combo_4',
      name: 'Neutrogena Hydro Boost',
      description: 'Gel-cream for combination skin',
      benefits: ['Versatile', 'Affordable', 'Effective'],
    },
    {
      id: 'moisturizer_combo_5',
      name: 'COSRX Snail 92',
      description: 'Lightweight yet nourishing cream',
      benefits: ['Adaptable', 'Repairing', 'Popular'],
    },
  ],
  normal: [
    {
      id: 'moisturizer_normal_1',
      name: 'COSRX Snail 92 All In One Cream',
      description: 'Perfect hydrating cream for balanced skin',
      benefits: ['Balanced', 'Repairing', 'Versatile'],
    },
    {
      id: 'moisturizer_normal_2',
      name: 'Beauty of Joseon Dynasty Cream',
      description: 'Classic K-beauty moisturizer',
      benefits: ['Elegant', 'Balanced', 'Popular'],
    },
    {
      id: 'moisturizer_normal_3',
      name: 'Clinique Moisture Surge',
      description: 'Auto-replenishing hydration',
      benefits: ['Hydrating', 'Reliable', 'Oil-free'],
    },
    {
      id: 'moisturizer_normal_4',
      name: 'Eucerin Lotion',
      description: 'Simple effective daily moisturizer',
      benefits: ['Lightweight', 'Budget-friendly', 'Gentle'],
    },
    {
      id: 'moisturizer_normal_5',
      name: 'Neutrogena Hydro Boost',
      description: 'Gel-cream with hyaluronic acid',
      benefits: ['Hydrating', 'Fresh', 'Affordable'],
    },
  ],
  sensitive: [
    {
      id: 'moisturizer_sens_1',
      name: 'Illiyoon Ceramide Ato',
      description: 'Gentle barrier repair cream',
      benefits: ['Minimal ingredients', 'Ceramides', 'Safe'],
    },
    {
      id: 'moisturizer_sens_2',
      name: 'La Roche-Posay Toleriane Dermallergo',
      description: 'Ultra-gentle moisturizer for reactive skin',
      benefits: ['Dermatologist-tested', 'Fragrance-free', 'Safe'],
    },
    {
      id: 'moisturizer_sens_3',
      name: 'CeraVe Moisturizing Cream',
      description: 'Gentle ceramide cream',
      benefits: ['Affordable', 'Ceramides', 'Non-irritating'],
    },
    {
      id: 'moisturizer_sens_4',
      name: 'A-Derma Dermalibour',
      description: 'Repairing cream for sensitive skin',
      benefits: ['Soothing', 'Repairing', 'Gentle'],
    },
    {
      id: 'moisturizer_sens_5',
      name: 'First Aid Beauty Ultra Repair',
      description: 'Gentle intensive moisturizer',
      benefits: ['Colloidal oatmeal', 'Safe', 'Soothing'],
    },
  ],
};

export default function BasicRoutineStep2Moisturizer({ onBack, onContinue }) {
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
        setProducts(MOISTURIZER_PRODUCTS[savedSkinType] || MOISTURIZER_PRODUCTS.normal);
      } else {
        setProducts(MOISTURIZER_PRODUCTS.normal);
      }
    } catch (error) {
      console.error('Error loading skin type:', error);
      setProducts(MOISTURIZER_PRODUCTS.normal);
    }
  };

  const handleContinue = () => {
    if (selectedProduct && onContinue) {
      onContinue(selectedProduct);
    }
  };

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;
  const currentStep = 2;
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
                source={require('../assets/images/jar cream.png')}
                style={styles.productIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.productTitle}>
              {skinType === 'oily' ? 'Lightweight Gel-Cream' : skinType === 'dry' ? 'Rich Moisturizer' : 'Light/Medium Moisturizer'}
            </Text>
            <Text style={styles.productSubtitle}>Morning Step 2</Text>
          </View>

          {/* Explanation Box */}
          <View style={styles.explanationBox}>
            <Text style={styles.explanationTitle}>Why this matters</Text>
            <Text style={styles.explanationText}>
              {skinType === 'oily' 
                ? 'Lightweight gel-creams provide essential hydration without adding excess oil. Look for humectants like hyaluronic acid and glycerin with light occlusives like dimethicone or squalane.'
                : skinType === 'dry'
                ? 'Rich moisturizers lock in hydration with nourishing ingredients. Look for ceramides, cholesterol, and richer occlusives like petrolatum or shea butter to strengthen your skin barrier.'
                : 'A balanced moisturizer provides optimal hydration without being too heavy or too light. Look for versatile formulas that adapt to your skin\'s needs.'}
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