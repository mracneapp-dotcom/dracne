// app/ModerateNightRoutineStep2ProductSelection.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Linking,
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

const MOISTURIZER_PRODUCTS = {
  oily: [
    {
      id: 'moisturizer_night_oily_1',
      name: 'Beauty of Joseon Dynasty Cream Light',
      description: 'Lightweight gel-cream with rice and probiotics',
      benefits: ['Non-greasy', 'Hydrating', 'K-Beauty'],
    },
    {
      id: 'moisturizer_night_oily_2',
      name: 'Isntree Hyaluronic Aqua Gel Cream',
      description: 'Water-based gel with 5 types of hyaluronic acid',
      benefits: ['Lightweight', 'Plumping', 'Fresh finish'],
    },
    {
      id: 'moisturizer_night_oily_3',
      name: 'Innisfree Green Tea Seed Cream',
      description: 'Light gel-cream with green tea extract',
      benefits: ['Oil-control', 'Antioxidant', 'Popular'],
    },
    {
      id: 'moisturizer_night_oily_4',
      name: 'Neutrogena Hydro Boost',
      description: 'Gel-cream with hyaluronic acid',
      benefits: ['Affordable', 'Oil-free', 'Hydrating'],
    },
    {
      id: 'moisturizer_night_oily_5',
      name: 'Clinique Dramatically Different Gel',
      description: 'Classic lightweight moisturizing gel',
      benefits: ['Oil-free', 'Trusted', 'Dermatologist-tested'],
    },
  ],
  dry: [
    {
      id: 'moisturizer_night_dry_1',
      name: 'COSRX Snail 92 All In One Cream',
      description: 'Rich cream with 92% snail mucin',
      benefits: ['Nourishing', 'Repairing', 'Hydrating'],
    },
    {
      id: 'moisturizer_night_dry_2',
      name: 'Illiyoon Ceramide Ato Concentrate',
      description: 'Intensive barrier cream with ceramides',
      benefits: ['Rich', 'Barrier repair', 'K-Beauty favorite'],
    },
    {
      id: 'moisturizer_night_dry_3',
      name: "Kiehl's Ultra Facial Cream",
      description: 'Classic rich moisturizer with squalane',
      benefits: ['24-hour hydration', 'Luxurious', 'Iconic'],
    },
    {
      id: 'moisturizer_night_dry_4',
      name: 'CeraVe Moisturizing Cream',
      description: 'Rich cream with ceramides and hyaluronic acid',
      benefits: ['Affordable', 'Ceramides', 'Dermatologist-loved'],
    },
    {
      id: 'moisturizer_night_dry_5',
      name: 'First Aid Beauty Ultra Repair',
      description: 'Intensive cream with colloidal oatmeal',
      benefits: ['Soothing', 'Rich', 'Fast-absorbing'],
    },
  ],
  combination: [
    {
      id: 'moisturizer_night_combo_1',
      name: 'Beauty of Joseon Dynasty Cream',
      description: 'Balanced cream suitable for all zones',
      benefits: ['Balanced', 'Versatile', 'Elegant'],
    },
    {
      id: 'moisturizer_night_combo_2',
      name: 'Isntree Aloe Soothing Gel',
      description: 'Light gel with aloe and centella',
      benefits: ['Soothing', 'Lightweight', 'Fresh'],
    },
    {
      id: 'moisturizer_night_combo_3',
      name: 'Clinique Moisture Surge',
      description: 'Auto-replenishing hydration',
      benefits: ['Oil-free', 'Hydrating', 'Balanced'],
    },
    {
      id: 'moisturizer_night_combo_4',
      name: 'Neutrogena Hydro Boost',
      description: 'Gel-cream for combination skin',
      benefits: ['Versatile', 'Affordable', 'Effective'],
    },
    {
      id: 'moisturizer_night_combo_5',
      name: 'COSRX Snail 92',
      description: 'Lightweight yet nourishing cream',
      benefits: ['Adaptable', 'Repairing', 'Popular'],
    },
  ],
  normal: [
    {
      id: 'moisturizer_night_normal_1',
      name: 'COSRX Snail 92 All In One Cream',
      description: 'Perfect hydrating cream for balanced skin',
      benefits: ['Balanced', 'Repairing', 'Versatile'],
    },
    {
      id: 'moisturizer_night_normal_2',
      name: 'Beauty of Joseon Dynasty Cream',
      description: 'Classic K-beauty moisturizer',
      benefits: ['Elegant', 'Balanced', 'Popular'],
    },
    {
      id: 'moisturizer_night_normal_3',
      name: 'Clinique Moisture Surge',
      description: 'Auto-replenishing hydration',
      benefits: ['Hydrating', 'Reliable', 'Oil-free'],
    },
    {
      id: 'moisturizer_night_normal_4',
      name: 'Eucerin Lotion',
      description: 'Simple effective daily moisturizer',
      benefits: ['Lightweight', 'Budget-friendly', 'Gentle'],
    },
    {
      id: 'moisturizer_night_normal_5',
      name: 'Neutrogena Hydro Boost',
      description: 'Gel-cream with hyaluronic acid',
      benefits: ['Hydrating', 'Fresh', 'Affordable'],
    },
  ],
  sensitive: [
    {
      id: 'moisturizer_night_sens_1',
      name: 'Illiyoon Ceramide Ato',
      description: 'Gentle barrier repair cream',
      benefits: ['Minimal ingredients', 'Ceramides', 'Safe'],
    },
    {
      id: 'moisturizer_night_sens_2',
      name: 'La Roche-Posay Toleriane Dermallergo',
      description: 'Ultra-gentle moisturizer for reactive skin',
      benefits: ['Dermatologist-tested', 'Fragrance-free', 'Safe'],
    },
    {
      id: 'moisturizer_night_sens_3',
      name: 'CeraVe Moisturizing Cream',
      description: 'Gentle ceramide cream',
      benefits: ['Affordable', 'Ceramides', 'Non-irritating'],
    },
    {
      id: 'moisturizer_night_sens_4',
      name: 'A-Derma Dermalibour',
      description: 'Repairing cream for sensitive skin',
      benefits: ['Soothing', 'Repairing', 'Gentle'],
    },
    {
      id: 'moisturizer_night_sens_5',
      name: 'First Aid Beauty Ultra Repair',
      description: 'Gentle intensive moisturizer',
      benefits: ['Colloidal oatmeal', 'Safe', 'Soothing'],
    },
  ],
};

export default function ModerateNightRoutineStep2ProductSelection({ 
  onNavigateHome,
  onNavigateToNightRoutine,
  onBack, 
  onContinue,
  currentStep = 2,
  internalStep = 4
}) {
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

  const handleContinue = async () => {
    if (selectedProduct) {
      try {
        const routineData = await AsyncStorage.getItem('myModerateNightRoutine');
        const currentRoutine = routineData ? JSON.parse(routineData) : {};
        
        currentRoutine.moisturizers = [selectedProduct];
        currentRoutine.lastUpdated = new Date().toISOString();
        
        await AsyncStorage.setItem('myModerateNightRoutine', JSON.stringify(currentRoutine));
        
        console.log('Moderate Night Step 2 Saved:', currentRoutine);
        console.log('Cleansers:', currentRoutine.cleansers);
        console.log('Moisturizers:', currentRoutine.moisturizers);
        
        if (onContinue) {
          onContinue([selectedProduct]);
        }
      } catch (error) {
        console.error('Error saving Moderate Night routine step 2:', error);
      }
    }
  };

  const handlePreviousStep = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleNextStep = () => {
    if (selectedProduct) {
      handleContinue();
    }
  };

  const getButtonText = () => {
    if (!selectedProduct) {
      return 'Choose My Moisturizer';
    }
    return 'Continue to Step 3';
  };

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;
  const totalSteps = 3;
  const totalInternalSteps = 6;
  const canGoNext = !!selectedProduct;

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
        onPress={onNavigateToNightRoutine}
        activeOpacity={0.9}
      >
        <Image 
          source={require('../assets/images/Banner Night Routine 1.png')}
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
                onPress={handlePreviousStep}
                style={styles.arrowButton}
                activeOpacity={0.7}
              >
                <Text style={styles.arrowText}>‹</Text>
              </TouchableOpacity>

              <Text style={styles.progressText}>Step {currentStep} of {totalSteps}</Text>

              <TouchableOpacity
                onPress={handleNextStep}
                disabled={!canGoNext}
                style={[styles.arrowButton, !canGoNext && styles.arrowButtonDisabled]}
                activeOpacity={0.7}
              >
                <Text style={[styles.arrowText, !canGoNext && styles.arrowTextDisabled]}>
                  ›
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(internalStep / totalInternalSteps) * 100}%` }]} />
            </View>
          </View>

          <View style={[styles.skinTypeBadge, { backgroundColor: `${skinTypeInfo.color}15` }]}>
            <Text style={[styles.skinTypeText, { color: skinTypeInfo.color }]}>
              For {skinTypeInfo.name}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Product Recommendations</Text>

          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>
              Choose your evening moisturizer. This will support your skin's natural overnight repair process with enhanced hydration.
            </Text>
          </View>

          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>
              Choose Your Product {selectedProduct && '(1 selected)'}
            </Text>
            
            {products.map((product) => {
              const isSelected = selectedProduct?.id === product.id;
              
              return (
                <TouchableOpacity
                  key={product.id}
                  style={[
                    styles.productCard,
                    isSelected && [styles.productCardSelected, { borderColor: skinTypeInfo.color }]
                  ]}
                  onPress={() => setSelectedProduct(product)}
                  activeOpacity={0.7}
                >
                  <View style={styles.productCardHeader}>
                    <View style={styles.productCardLeft}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productDescription}>{product.description}</Text>
                    </View>
                    {isSelected && (
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
              );
            })}
          </View>

          {!selectedProduct && (
            <View style={styles.helperBox}>
              <Text style={styles.helperText}>Select 1 product to continue to Step 3</Text>
            </View>
          )}

          <View style={styles.citationContainer}>
            <Text style={styles.citationText}>
              Product selections curated using safety data from the{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://www.cir-safety.org/ingredients')}
              >
                Cosmetic Ingredient Review
              </Text>
              , formulation research from the{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://onlinelibrary.wiley.com/journal/14682494')}
              >
                International Journal of Cosmetic Science
              </Text>
              , and clinical studies on{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6751381/')}
              >
                skin type-specific nighttime moisturization and barrier repair
              </Text>
              . These are educational suggestions - always patch test new products and consult a dermatologist for personalized treatment.
            </Text>
          </View>

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={getButtonText()}
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
    marginBottom: 15,
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
  arrowButtonDisabled: {
    backgroundColor: '#F5F5F5',
    shadowOpacity: 0,
    elevation: 0,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: '600',
    color: BRAND_COLORS.primary,
    lineHeight: 28,
  },
  arrowTextDisabled: {
    color: '#CCCCCC',
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
  },
  explanationBox: {
    backgroundColor: `${BRAND_COLORS.primary}10`,
    borderLeftWidth: 4,
    borderLeftColor: BRAND_COLORS.primary,
    borderRadius: 8,
    padding: 14,
    marginBottom: 18,
  },
  explanationText: {
    fontSize: 13,
    color: BRAND_COLORS.darkGray,
    lineHeight: 19,
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
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
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
  helperBox: {
    backgroundColor: '#FFF9E6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  helperText: {
    fontSize: 13,
    color: '#B8860B',
    fontWeight: '600',
    textAlign: 'center',
  },
  citationContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  citationText: {
    fontSize: 11,
    color: '#999999',
    lineHeight: 16,
    textAlign: 'center',
  },
  citationLink: {
    fontSize: 11,
    color: '#666666',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 160,
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
  continueButton: {
    width: '100%',
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
});