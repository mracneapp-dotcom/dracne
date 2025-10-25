// app/SmartRoutineProductSelectionDay.js - COMPLETE UPDATED
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
  },
  blackheads: {
    morning: [
      { id: 'bh_am_1', name: 'COSRX BHA Blackhead Power Liquid', description: 'Gentle 4% BHA exfoliant', benefits: ['Pore-clearing', 'Gentle', 'K-Beauty'] },
      { id: 'bh_am_2', name: 'Paula\'s Choice 2% BHA Liquid', description: 'Gold standard salicylic acid treatment', benefits: ['Effective', 'Gentle', 'Non-irritating'] },
      { id: 'bh_am_3', name: 'The Inkey List Beta Hydroxy Acid', description: 'Affordable BHA serum', benefits: ['Budget-friendly', 'Simple', 'Effective'] },
    ],
  },
  whiteheads: {
    morning: [
      { id: 'wh_am_1', name: 'The Ordinary Niacinamide 10%', description: 'Oil-control and pore-refining serum', benefits: ['Controls sebum', 'Affordable', 'Effective'] },
      { id: 'wh_am_2', name: 'Paula\'s Choice 10% Niacinamide', description: 'High-strength niacinamide booster', benefits: ['Pore-refining', 'Effective', 'Gentle'] },
      { id: 'wh_am_3', name: 'CeraVe AM Facial Moisturizer', description: 'Niacinamide moisturizer with SPF', benefits: ['All-in-one', 'Barrier support', 'Budget-friendly'] },
    ],
  },
  papules: {
    morning: [
      { id: 'pap_am_1', name: 'The Ordinary Niacinamide 10% + Zinc', description: 'Anti-inflammatory acne fighter', benefits: ['Calms inflammation', 'Controls oil', 'Affordable'] },
      { id: 'pap_am_2', name: 'Paula\'s Choice 10% Niacinamide', description: 'High-strength calming treatment', benefits: ['Reduces redness', 'Gentle', 'Effective'] },
      { id: 'pap_am_3', name: 'La Roche-Posay Effaclar Duo+', description: 'Anti-blemish treatment', benefits: ['Targeted', 'Dermatologist-tested', 'Fast-acting'] },
    ],
  },
  marks: {
    morning: [
      { id: 'marks_am_1', name: 'Timeless Vitamin C + E Serum', description: '20% L-ascorbic acid brightening serum', benefits: ['Fading', 'Antioxidant', 'Affordable'] },
      { id: 'marks_am_2', name: 'Melano CC Intensive Anti-Spot', description: 'Japanese vitamin C treatment', benefits: ['Targeted', 'Stable', 'Effective'] },
      { id: 'marks_am_3', name: 'The Ordinary Niacinamide 10% + Zinc', description: 'Brightening and oil-control', benefits: ['Fades PIH', 'Affordable', 'Gentle'] },
    ],
  },
};

export default function SmartRoutineProductSelectionDay({ 
  onNavigateHome,
  onNavigateBack,
  onContinueToNight,
  concernId
}) {
  const [concernData, setConcernData] = useState(null);
  const [skinType, setSkinType] = useState('normal');
  const [selectedDayProducts, setSelectedDayProducts] = useState([]);
  const [dayProducts, setDayProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, [concernId]);

  const loadData = async () => {
    if (concernId && CONCERN_INFO[concernId]) {
      setConcernData(CONCERN_INFO[concernId]);
      
      const dayProductList = SMART_PRODUCTS[concernId]?.morning || [];
      setDayProducts(dayProductList);
    }

    const savedSkinType = await AsyncStorage.getItem('userSkinType');
    if (savedSkinType) {
      setSkinType(savedSkinType);
    }
  };

  const toggleProduct = (product) => {
    setSelectedDayProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleContinue = () => {
    if (onContinueToNight) {
      onContinueToNight(selectedDayProducts);
    }
  };

  if (!concernData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Concern data not found</Text>
      </View>
    );
  }

  const skinTypeInfo = SKIN_TYPE_INFO[skinType] || SKIN_TYPE_INFO.normal;
  const totalSteps = 3;
  const currentStep = 2;
  const totalInternalSteps = 3;
  const internalStep = 2;

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

              <TouchableOpacity
                onPress={handleContinue}
                style={styles.arrowButton}
                activeOpacity={0.7}
              >
                <Text style={styles.arrowText}>›</Text>
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

          <View style={styles.concernHeader}>
            <View style={[styles.concernIconSmall, { backgroundColor: `${concernData.color}15` }]}>
              <Image 
                source={concernData.icon}
                style={[styles.concernIconImage, { tintColor: concernData.color }]}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.concernTitle}>{concernData.name}</Text>
          </View>

          <View style={styles.infoBox}>
            <Image 
              source={require('../assets/images/check.png')}
              style={styles.infoIcon}
              resizeMode="contain"
            />
            <Text style={styles.infoText}>
              Select morning products for your smart routine. You can choose multiple options to alternate between.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Image 
                source={require('../assets/images/sunscreen.png')}
                style={styles.sectionIcon}
                resizeMode="contain"
              />
              <Text style={styles.sectionTitle}>
                Morning Products {selectedDayProducts.length > 0 && `(${selectedDayProducts.length} selected)`}
              </Text>
            </View>

            {dayProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={[
                  styles.productCard,
                  selectedDayProducts.find(p => p.id === product.id) && styles.productCardSelected
                ]}
                onPress={() => toggleProduct(product)}
                activeOpacity={0.7}
              >
                <View style={styles.productCardHeader}>
                  <View style={styles.productCardLeft}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productDescription}>{product.description}</Text>
                  </View>
                  <View style={[
                    styles.checkbox,
                    selectedDayProducts.find(p => p.id === product.id) && styles.checkboxSelected
                  ]}>
                    {selectedDayProducts.find(p => p.id === product.id) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                </View>

                <View style={styles.benefitsRow}>
                  {product.benefits.map((benefit, idx) => (
                    <View key={idx} style={styles.benefitTag}>
                      <Text style={styles.benefitText}>{benefit}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title="Continue to Evening Products"
          onPress={handleContinue}
          style={styles.continueButton}
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
  concernHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  concernIconSmall: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  concernIconImage: {
    width: 28,
    height: 28,
  },
  concernTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: BRAND_COLORS.black,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 14,
    marginBottom: 25,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#BBDEFB',
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
  sectionContainer: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
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
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: BRAND_COLORS.lightGray,
  },
  productCardSelected: {
    borderColor: BRAND_COLORS.smartBlue,
    backgroundColor: `${BRAND_COLORS.smartBlue}05`,
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
    fontSize: 13,
    color: BRAND_COLORS.darkGray,
    lineHeight: 18,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: BRAND_COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: BRAND_COLORS.smartBlue,
    borderColor: BRAND_COLORS.smartBlue,
  },
  checkmark: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.white,
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
  benefitText: {
    fontSize: 10,
    color: BRAND_COLORS.darkGray,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 120,
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
  errorText: {
    fontSize: 16,
    color: BRAND_COLORS.secondary,
    textAlign: 'center',
    marginTop: 100,
  },
});