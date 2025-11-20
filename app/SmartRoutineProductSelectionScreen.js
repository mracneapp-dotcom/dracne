// app/SmartRoutineProductSelectionScreen.js - UPDATED WITH VERIFIED WORKING LINKS
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
};

const SKIN_TYPE_INFO = {
  oily: { color: '#4A90E2', name: 'Oily Skin' },
  dry: { color: '#F39C12', name: 'Dry Skin' },
  combination: { color: BRAND_COLORS.primary, name: 'Combination Skin' },
  normal: { color: '#9B59B6', name: 'Normal Skin' },
  sensitive: { color: BRAND_COLORS.primary, name: 'Sensitive Skin' },
};

const CONCERN_INFO = {
  nodules: { name: 'Inflamed Acne (Nodules)', color: '#FF7A7A', icon: require('../assets/images/Nodule.png') },
  blackheads: { name: 'Blackheads', color: '#4A90E2', icon: require('../assets/images/Blackhead.png') },
  whiteheads: { name: 'Whiteheads', color: '#7CB342', icon: require('../assets/images/Whitehead.png') },
  papules: { name: 'Papules & Pustules', color: '#F39C12', icon: require('../assets/images/Papule.png') },
  marks: { name: 'Post-Inflammatory Marks', color: '#9B59B6', icon: require('../assets/images/Mark.png') },
};

const SMART_PRODUCTS = {
  nodules: {
    morning: [
      { id: 'nod_am_1', name: 'La Roche-Posay Effaclar Duo+', description: 'Anti-blemish treatment with niacinamide', benefits: ['Calming', 'Anti-inflammatory', 'Non-comedogenic'] },
      { id: 'nod_am_2', name: 'CeraVe AM with Niacinamide', description: 'Lightweight moisturizer with SPF and niacinamide', benefits: ['Barrier support', 'SPF 30', 'Budget-friendly'] },
      { id: 'nod_am_3', name: 'Paula\'s Choice 10% Niacinamide', description: 'High-strength niacinamide booster', benefits: ['Calms redness', 'Controls oil', 'Anti-inflammatory'] },
    ],
    evening: [
      { id: 'nod_pm_1', name: 'Differin Gel (Adapalene 0.1%)', description: 'OTC retinoid for acne and inflammation', benefits: ['Proven effective', 'Anti-inflammatory', 'Affordable'] },
      { id: 'nod_pm_2', name: 'The Ordinary Azelaic Acid 10%', description: 'Multi-functional azelaic acid treatment', benefits: ['Calms redness', 'Fights bacteria', 'Gentle'] },
      { id: 'nod_pm_3', name: 'Geek & Gorgeous A-Game 5', description: 'Gentle retinaldehyde treatment', benefits: ['Less irritating', 'Effective', 'Targeted'] },
    ],
  },
  blackheads: {
    morning: [
      { id: 'bh_am_1', name: 'COSRX BHA Blackhead Power Liquid', description: 'Gentle 4% BHA exfoliant', benefits: ['Pore-clearing', 'Gentle', 'K-Beauty'] },
      { id: 'bh_am_2', name: 'Paula\'s Choice 2% BHA Liquid', description: 'Gold standard salicylic acid treatment', benefits: ['Effective', 'Gentle', 'Non-irritating'] },
      { id: 'bh_am_3', name: 'The Inkey List Beta Hydroxy Acid', description: 'Affordable BHA serum', benefits: ['Budget-friendly', 'Simple', 'Effective'] },
    ],
    evening: [
      { id: 'bh_pm_1', name: 'Paula\'s Choice 2% BHA Liquid', description: 'Evening BHA treatment', benefits: ['Deep-cleaning', 'Proven', 'Gentle'] },
      { id: 'bh_pm_2', name: 'COSRX BHA Blackhead Power Liquid', description: 'Nighttime pore treatment', benefits: ['Gentle', 'Effective', 'Popular'] },
      { id: 'bh_pm_3', name: 'Some By Mi AHA BHA PHA Toner', description: 'Multi-acid gentle exfoliant', benefits: ['Triple action', 'Gentle', 'K-Beauty'] },
    ],
  },
  whiteheads: {
    morning: [
      { id: 'wh_am_1', name: 'The Ordinary Niacinamide 10%', description: 'Oil-control and pore-refining serum', benefits: ['Controls sebum', 'Affordable', 'Effective'] },
      { id: 'wh_am_2', name: 'Paula\'s Choice 10% Niacinamide', description: 'High-strength niacinamide booster', benefits: ['Pore-refining', 'Effective', 'Gentle'] },
      { id: 'wh_am_3', name: 'CeraVe AM Facial Moisturizer', description: 'Niacinamide moisturizer with SPF', benefits: ['All-in-one', 'Barrier support', 'Budget-friendly'] },
    ],
    evening: [
      { id: 'wh_pm_1', name: 'Differin Gel (Adapalene 0.1%)', description: 'OTC retinoid for comedones', benefits: ['Proven effective', 'Prevents clogging', 'Affordable'] },
      { id: 'wh_pm_2', name: 'Geek & Gorgeous A-Game 5', description: 'Gentle retinaldehyde treatment', benefits: ['Less irritating', 'Effective', 'Gentle'] },
      { id: 'wh_pm_3', name: 'The Ordinary Granactive Retinoid 2%', description: 'Beginner-friendly retinoid', benefits: ['Gentle', 'Effective', 'Affordable'] },
    ],
  },
  papules: {
    morning: [
      { id: 'pap_am_1', name: 'The Ordinary Niacinamide 10% + Zinc', description: 'Anti-inflammatory acne fighter', benefits: ['Calms inflammation', 'Controls oil', 'Affordable'] },
      { id: 'pap_am_2', name: 'Paula\'s Choice 10% Niacinamide', description: 'High-strength calming treatment', benefits: ['Reduces redness', 'Gentle', 'Effective'] },
      { id: 'pap_am_3', name: 'La Roche-Posay Effaclar Duo+', description: 'Anti-blemish treatment', benefits: ['Targeted', 'Dermatologist-tested', 'Fast-acting'] },
    ],
    evening: [
      { id: 'pap_pm_1', name: 'Paula\'s Choice CLEAR 2.5% Benzoyl Peroxide', description: 'Gentle BP treatment', benefits: ['Kills bacteria', 'Non-drying', 'Effective'] },
      { id: 'pap_pm_2', name: 'La Roche-Posay Effaclar Duo+', description: 'BP and LHA combo treatment', benefits: ['Dual action', 'Gentle', 'Proven'] },
      { id: 'pap_pm_3', name: 'CeraVe Acne Foaming Cream Cleanser 4% BP', description: 'BP wash for short-contact therapy', benefits: ['Gentle', 'Ceramides', 'Affordable'] },
    ],
  },
  marks: {
    morning: [
      { id: 'marks_am_1', name: 'Timeless Vitamin C + E Serum', description: '20% L-ascorbic acid brightening serum', benefits: ['Fading', 'Antioxidant', 'Affordable'] },
      { id: 'marks_am_2', name: 'Melano CC Intensive Anti-Spot', description: 'Japanese vitamin C treatment', benefits: ['Targeted', 'Stable', 'Effective'] },
      { id: 'marks_am_3', name: 'The Ordinary Niacinamide 10% + Zinc', description: 'Brightening and oil-control', benefits: ['Fades PIH', 'Affordable', 'Gentle'] },
    ],
    evening: [
      { id: 'marks_pm_1', name: 'The Ordinary Alpha Arbutin 2%', description: 'Gentle brightening treatment', benefits: ['Fades marks', 'Gentle', 'Affordable'] },
      { id: 'marks_pm_2', name: 'Differin Gel (Adapalene 0.1%)', description: 'Retinoid for cell turnover', benefits: ['Fades marks', 'Prevents acne', 'Proven'] },
      { id: 'marks_pm_3', name: 'Geek & Gorgeous A-Game 5', description: 'Gentle retinaldehyde for marks', benefits: ['Cell turnover', 'Gentle', 'Effective'] },
    ],
  },
};

export default function SmartRoutineProductSelectionScreen({ 
  onNavigateHome,
  onNavigateBack,
  onNavigateToSmartRoutineHub,
  concernId
}) {
  const [concernData, setConcernData] = useState(null);
  const [skinType, setSkinType] = useState('normal');
  const [selectedDayProducts, setSelectedDayProducts] = useState([]);
  const [selectedNightProducts, setSelectedNightProducts] = useState([]);
  const [dayProducts, setDayProducts] = useState([]);
  const [nightProducts, setNightProducts] = useState([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completeRoutineData, setCompleteRoutineData] = useState(null);

  useEffect(() => {
    loadData();
  }, [concernId]);

  const loadData = async () => {
    if (concernId && CONCERN_INFO[concernId]) {
      setConcernData(CONCERN_INFO[concernId]);
      
      const dayProductList = SMART_PRODUCTS[concernId]?.morning || [];
      const nightProductList = SMART_PRODUCTS[concernId]?.evening || [];
      setDayProducts(dayProductList);
      setNightProducts(nightProductList);
    }

    try {
      const savedSkinType = await AsyncStorage.getItem('userSkinType');
      if (savedSkinType) {
        setSkinType(savedSkinType);
      }
    } catch (error) {
      console.error('Error loading skin type:', error);
    }
  };

  const toggleDayProductSelection = (product) => {
    setSelectedDayProducts(prev => {
      const isSelected = prev.some(p => p.id === product.id);
      
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 2) {
          return [prev[1], product];
        }
        return [...prev, product];
      }
    });
  };

  const toggleNightProductSelection = (product) => {
    setSelectedNightProducts(prev => {
      const isSelected = prev.some(p => p.id === product.id);
      
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 2) {
          return [prev[1], product];
        }
        return [...prev, product];
      }
    });
  };

  const handleComplete = async () => {
    const totalSelected = selectedDayProducts.length + selectedNightProducts.length;
    
    if (totalSelected > 0) {
      try {
        const routineData = {
          concernId,
          concernName: concernData.name,
          concernColor: concernData.color,
          dayProducts: selectedDayProducts,
          nightProducts: selectedNightProducts,
          completedAt: new Date().toISOString(),
        };
        
        const storageKey = `mySmartRoutine_${concernId}`;
        await AsyncStorage.setItem(storageKey, JSON.stringify(routineData));
        
        console.log('✅ Smart Routine Saved:', routineData);
        
        setCompleteRoutineData(routineData);
        setShowCompletionModal(true);
      } catch (error) {
        console.error('❌ Error saving smart routine:', error);
      }
    }
  };

  const handleModalClose = () => {
    console.log('🏠 Modal closed - navigating to Smart Routine Hub');
    setShowCompletionModal(false);
    if (onNavigateToSmartRoutineHub) {
      setTimeout(() => {
        onNavigateToSmartRoutineHub();
      }, 300);
    }
  };

  const handleViewRoutine = () => {
    console.log('📋 Viewing Smart Routine Hub');
    setShowCompletionModal(false);
    if (onNavigateToSmartRoutineHub) {
      setTimeout(() => {
        onNavigateToSmartRoutineHub();
      }, 300);
    }
  };

  const getButtonText = () => {
    const totalSelected = selectedDayProducts.length + selectedNightProducts.length;
    if (totalSelected === 0) {
      return 'Select Product(s)';
    }
    return 'Complete Smart Routine';
  };

  if (!concernData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Concern data not found</Text>
      </View>
    );
  }

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;
  const totalSelected = selectedDayProducts.length + selectedNightProducts.length;

  return (
    <View style={styles.container}>
      <View style={styles.topNavigation}>
        <TouchableOpacity onPress={onNavigateHome} style={styles.logoButton}>
          <Image source={require('../assets/images/dracne-logo.png')} style={styles.logoImage} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={[styles.concernIconContainer, { backgroundColor: `${concernData.color}20` }]}>
              <Image source={concernData.icon} style={styles.concernIcon} resizeMode="contain" />
            </View>
            <Text style={styles.title}>
              Build Your <Text style={styles.titleHighlight}>Smart Routine</Text>
            </Text>
            <View style={[styles.skinTypeBadge, { backgroundColor: `${skinTypeInfo.color}20` }]}>
              <Text style={[styles.skinTypeText, { color: skinTypeInfo.color }]}>{skinTypeInfo.name}</Text>
            </View>
          </View>

          <View style={styles.explanationBox}>
            <Text style={styles.explanationText}>
              Select 1-2 products for morning and/or evening to target <Text style={{ fontWeight: '700' }}>{concernData.name}</Text>. 
              Your routine will be saved in Smart Routine Hub.
            </Text>
          </View>

          <View style={styles.routineSection}>
            <View style={styles.routineSectionHeader}>
              <View style={styles.routineTitleContainer}>
                <Text style={styles.routineSectionTitle}>Morning Products</Text>
                <View style={[styles.timeBadge, { backgroundColor: '#FFF9E6' }]}>
                  <Text style={[styles.timeBadgeText, { color: '#B8860B' }]}>AM • {dayProducts.length} Options</Text>
                </View>
              </View>
            </View>

            <View style={styles.selectionContainer}>
              <Text style={styles.selectionTitle}>Select 0-2 Morning Products (Optional)</Text>
              {dayProducts.map((product) => {
                const isSelected = selectedDayProducts.some(p => p.id === product.id);
                
                return (
                  <TouchableOpacity
                    key={product.id}
                    style={[
                      styles.productCard,
                      isSelected && [styles.productCardSelected, { borderColor: concernData.color }]
                    ]}
                    onPress={() => toggleDayProductSelection(product)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.productCardHeader}>
                      <View style={styles.productCardLeft}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productDescription}>{product.description}</Text>
                      </View>
                      {isSelected && (
                        <View style={[styles.checkmark, { backgroundColor: concernData.color }]}>
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
          </View>

          <View style={styles.routineSection}>
            <View style={styles.routineSectionHeader}>
              <View style={styles.routineTitleContainer}>
                <Text style={styles.routineSectionTitle}>Evening Products</Text>
                <View style={[styles.timeBadge, { backgroundColor: '#E8E9FF' }]}>
                  <Text style={[styles.timeBadgeText, { color: '#5A5FCC' }]}>PM • {nightProducts.length} Options</Text>
                </View>
              </View>
            </View>

            <View style={styles.selectionContainer}>
              <Text style={styles.selectionTitle}>Select 0-2 Evening Products (Optional)</Text>
              {nightProducts.map((product) => {
                const isSelected = selectedNightProducts.some(p => p.id === product.id);
                
                return (
                  <TouchableOpacity
                    key={product.id}
                    style={[
                      styles.productCard,
                      isSelected && [styles.productCardSelected, { borderColor: concernData.color }]
                    ]}
                    onPress={() => toggleNightProductSelection(product)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.productCardHeader}>
                      <View style={styles.productCardLeft}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productDescription}>{product.description}</Text>
                      </View>
                      {isSelected && (
                        <View style={[styles.checkmark, { backgroundColor: concernData.color }]}>
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
          </View>

          {totalSelected === 0 && (
            <View style={styles.helperBox}>
              <Text style={styles.helperText}>Select at least 1 product to complete your Smart Routine</Text>
            </View>
          )}

          <View style={styles.citationContainer}>
            <Text style={styles.citationText}>
              Product recommendations curated using{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://www.cir-safety.org')}
              >
                Cosmetic Ingredient Review safety data
              </Text>
              , clinical research on{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/26201312/')}
              >
                optimal timing for active ingredient application and combination therapy protocols
              </Text>
              , and{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://www.aad.org/public/diseases/acne/skin-care/tips')}
              >
                dermatological guidelines for concern-specific treatment approaches
              </Text>
              . Smart routines complement your daily care - always patch test new products and consult a dermatologist for comprehensive treatment plans.
            </Text>
          </View>

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={getButtonText()}
          onPress={handleComplete}
          disabled={totalSelected === 0}
          style={[styles.continueButton, totalSelected === 0 && styles.continueButtonDisabled]}
        />
        <TouchableOpacity onPress={onNavigateBack} style={styles.backLink}>
          <Text style={styles.backLinkText}>← Back to Concern Selection</Text>
        </TouchableOpacity>
      </View>

      <RoutineCompletionModal
        visible={showCompletionModal}
        onClose={handleModalClose}
        onViewRoutine={handleViewRoutine}
        routineData={completeRoutineData}
        routineType="smart"
        smartBlueColor="#82B2DF"
        concernData={concernData}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  concernIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  concernIcon: {
    width: 32,
    height: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
  },
  titleHighlight: {
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  skinTypeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  skinTypeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  explanationBox: {
    backgroundColor: `${BRAND_COLORS.primary}10`,
    borderLeftWidth: 4,
    borderLeftColor: BRAND_COLORS.primary,
    borderRadius: 8,
    padding: 14,
    marginBottom: 24,
  },
  explanationText: {
    fontSize: 13,
    color: BRAND_COLORS.darkGray,
    lineHeight: 19,
  },
  routineSection: {
    marginBottom: 30,
  },
  routineSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  routineTitleContainer: {
    flex: 1,
  },
  routineSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 6,
  },
  timeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  selectionContainer: {
    marginBottom: 10,
  },
  selectionTitle: {
    fontSize: 15,
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
    fontSize: 14,
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
    fontSize: 15,
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
    marginBottom: 12,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  backLink: {
    paddingVertical: 8,
  },
  backLinkText: {
    fontSize: 14,
    color: BRAND_COLORS.primary,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: BRAND_COLORS.secondary,
    textAlign: 'center',
    marginTop: 100,
  },
});