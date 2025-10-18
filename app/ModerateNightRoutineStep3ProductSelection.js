// app/ModerateNightRoutineStep3ProductSelection.js
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
import RoutineCompletionModal from '../components/modals/RoutineCompletionModal';
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

const PORE_CARE_PRODUCTS = [
  {
    id: 'porecare_night_1',
    name: 'COSRX BHA Power Liquid',
    description: '4% betaine salicylate for gentle pore care',
    benefits: ['BHA exfoliant', 'Pore clearing', 'Non-irritating'],
  },
  {
    id: 'porecare_night_2',
    name: 'By Wishtrend Mandelic 5%',
    description: 'Gentle mandelic acid for sensitive skin',
    benefits: ['Large molecule', 'Less irritating', 'Pore care'],
  },
  {
    id: 'porecare_night_3',
    name: "Paula's Choice 2% BHA",
    description: 'Cult-favorite salicylic acid treatment',
    benefits: ['Classic formula', 'Effective', 'Well-tolerated'],
  },
  {
    id: 'porecare_night_4',
    name: 'The Inkey List Beta Hydroxy Acid',
    description: 'Affordable 2% salicylic acid serum',
    benefits: ['Budget-friendly', 'Simple', 'Effective'],
  },
  {
    id: 'porecare_night_5',
    name: 'Some By Mi AHA BHA PHA Toner',
    description: 'Multi-acid toner with gentle exfoliation',
    benefits: ['Triple action', 'Daily use', 'Balancing'],
  },
];

export default function ModerateNightRoutineStep3ProductSelection({ 
  onNavigateHome,
  onNavigateToNightRoutine,
  onBack, 
  onComplete, 
  currentStep = 3,
  internalStep = 6
}) {
  const [skinType, setSkinType] = useState('normal');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completeRoutineData, setCompleteRoutineData] = useState(null);

  useEffect(() => {
    loadSkinType();
  }, []);

  const loadSkinType = async () => {
    try {
      const savedSkinType = await AsyncStorage.getItem('userSkinType');
      if (savedSkinType) {
        setSkinType(savedSkinType);
      }
    } catch (error) {
      console.error('Error loading skin type:', error);
    }
  };

  const handleComplete = async () => {
    if (selectedProduct) {
      try {
        const routineData = await AsyncStorage.getItem('myModerateNightRoutine');
        const currentRoutine = routineData ? JSON.parse(routineData) : {};
        
        currentRoutine.poreCare = [selectedProduct];
        currentRoutine.lastUpdated = new Date().toISOString();
        currentRoutine.completedAt = new Date().toISOString();
        
        await AsyncStorage.setItem('myModerateNightRoutine', JSON.stringify(currentRoutine));
        
        console.log('Complete Moderate Night Routine Saved:', currentRoutine);
        console.log('Cleansers:', currentRoutine.cleansers);
        console.log('Moisturizers:', currentRoutine.moisturizers);
        console.log('Pore Care:', currentRoutine.poreCare);
        
        setCompleteRoutineData(currentRoutine);
        setShowCompletionModal(true);
      } catch (error) {
        console.error('Error saving complete Moderate Night routine:', error);
      }
    }
  };

  const handleModalClose = () => {
    console.log('Modal closed - navigating to Home');
    setShowCompletionModal(false);
    if (onNavigateHome) {
      setTimeout(() => {
        onNavigateHome();
      }, 300);
    }
  };

  const handleViewRoutine = () => {
    console.log('Viewing Moderate Night Routine');
    setShowCompletionModal(false);
    if (onNavigateToNightRoutine) {
      setTimeout(() => {
        onNavigateToNightRoutine();
      }, 300);
    }
  };

  const handlePreviousStep = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleNextStep = () => {
    if (selectedProduct) {
      handleComplete();
    }
  };

  const getButtonText = () => {
    if (!selectedProduct) {
      return 'Choose My Pore Care Treatment';
    }
    return 'Complete Moderate Night Routine';
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
              Choose your pore care treatment to complete your moderate night routine. Use 2-4 times per week in the evening for clear, healthy pores. Start with 2x per week.
            </Text>
          </View>

          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>
              Choose Your Product {selectedProduct && '(1 selected)'}
            </Text>
            
            {PORE_CARE_PRODUCTS.map((product) => {
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
              <Text style={styles.helperText}>Select 1 product to complete your routine</Text>
            </View>
          )}

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={getButtonText()}
          onPress={handleComplete}
          disabled={!selectedProduct}
          style={[styles.continueButton, !selectedProduct && styles.continueButtonDisabled]}
        />
      </View>

      <RoutineCompletionModal
        visible={showCompletionModal}
        onClose={handleModalClose}
        onViewRoutine={handleViewRoutine}
        routineData={completeRoutineData}
        routineType="moderate"
        isNightRoutine={true}
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