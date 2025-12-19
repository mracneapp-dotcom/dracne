// app/SmartRoutineDetailScreen.js - FULLY TRANSLATED (COMPLETE)
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DrAcneButton } from '../components/ui/DrAcneButton';
import { t } from './i18n';

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

const CONCERN_DATA = {
  nodules: {
    nameKey: 'smartRoutine.nodules_name',
    color: '#FF7A7A',
    icon: require('../assets/images/Nodule.png'),
    descriptionKey: 'smartRoutine.nodules_description',
    goalKey: 'smartRoutine.nodules_goal',
    amRoutine: [
      { step: 1, titleKey: 'smartRoutine.nodules_am_step1_title', descriptionKey: 'smartRoutine.nodules_am_step1_desc' },
      { step: 2, titleKey: 'smartRoutine.nodules_am_step2_title', descriptionKey: 'smartRoutine.nodules_am_step2_desc' },
      { step: 3, titleKey: 'smartRoutine.nodules_am_step3_title', descriptionKey: 'smartRoutine.nodules_am_step3_desc' },
    ],
    pmRoutine: [
      { step: 1, titleKey: 'smartRoutine.nodules_pm_step1_title', descriptionKey: 'smartRoutine.nodules_pm_step1_desc' },
      { step: 2, titleKey: 'smartRoutine.nodules_pm_step2_title', descriptionKey: 'smartRoutine.nodules_pm_step2_desc' },
      { step: 3, titleKey: 'smartRoutine.nodules_pm_step3_title', descriptionKey: 'smartRoutine.nodules_pm_step3_desc' },
    ],
    products: {
      cleansers: [
        { name: 'KraveBeauty Matcha Hemp Cleanser', benefit: 'Low-pH, balancing' },
        { name: 'La Roche-Posay Toleriane Purifying', benefit: 'Gentle, tested' },
        { name: 'Round Lab 1025 Dokdo Cleanser', benefit: 'Mineral-rich, soothing' },
        { name: 'CeraVe Foaming Cleanser', benefit: 'Affordable, ceramides' },
      ],
      actives: [
        { name: 'Differin Gel (Adapalene 0.1%)', benefit: 'Proven retinoid for acne' },
        { name: 'Geek & Gorgeous A-Game 5', benefit: 'Gentle adapalene alternative' },
        { name: 'The Ordinary Azelaic Acid 10%', benefit: 'Calms redness & bacteria' },
        { name: 'FaceTheory Lumizela A15 Serum', benefit: 'Azelaic acid 15%' },
      ],
      moisturizers: [
        { name: 'Isntree Hyaluronic Aqua Gel Cream', benefit: 'Lightweight, hydrating' },
        { name: 'Illiyoon Ceramide Ato Concentrate', benefit: 'Barrier repair' },
        { name: 'Beauty of Joseon Dynasty Cream Light', benefit: 'Gel-cream, K-beauty' },
        { name: 'Clinique Dramatically Different Gel', benefit: 'Oil-free classic' },
      ],
      sunscreens: [
        { name: 'TIZO Mineral Sun Defense SPF 50', benefit: 'Matte mineral finish' },
        { name: 'Beauty of Joseon Relief Sun SPF 50+', benefit: 'Lightweight, no cast' },
        { name: 'EltaMD UV Clear SPF 46', benefit: 'Mineral with niacinamide' },
        { name: 'Isntree Hyaluronic Aqua Sun Gel SPF 50+', benefit: 'Water-based gel' },
      ],
    },
    extraCare: [
      'smartRoutine.nodules_tip1',
      'smartRoutine.nodules_tip2',
      'smartRoutine.nodules_tip3',
      'smartRoutine.nodules_tip4',
      'smartRoutine.nodules_tip5',
    ],
  },
  blackheads: {
    nameKey: 'smartRoutine.blackheads_name',
    color: '#4A90E2',
    icon: require('../assets/images/Blackhead.png'),
    descriptionKey: 'smartRoutine.blackheads_description',
    goalKey: 'smartRoutine.blackheads_goal',
    amRoutine: [
      { step: 1, titleKey: 'smartRoutine.blackheads_am_step1_title', descriptionKey: 'smartRoutine.blackheads_am_step1_desc' },
      { step: 2, titleKey: 'smartRoutine.blackheads_am_step2_title', descriptionKey: 'smartRoutine.blackheads_am_step2_desc' },
      { step: 3, titleKey: 'smartRoutine.blackheads_am_step3_title', descriptionKey: 'smartRoutine.blackheads_am_step3_desc' },
    ],
    pmRoutine: [
      { step: 1, titleKey: 'smartRoutine.blackheads_pm_step1_title', descriptionKey: 'smartRoutine.blackheads_pm_step1_desc' },
      { step: 2, titleKey: 'smartRoutine.blackheads_pm_step2_title', descriptionKey: 'smartRoutine.blackheads_pm_step2_desc' },
      { step: 3, titleKey: 'smartRoutine.blackheads_pm_step3_title', descriptionKey: 'smartRoutine.blackheads_pm_step3_desc' },
      { step: 4, titleKey: 'smartRoutine.blackheads_pm_step4_title', descriptionKey: 'smartRoutine.blackheads_pm_step4_desc' },
    ],
    products: {
      cleansers: [
        { name: 'KraveBeauty Matcha Hemp Cleanser', benefit: 'Gentle, low-pH' },
        { name: 'COSRX Low pH Good Morning Cleanser', benefit: 'pH 5.0-6.0, refreshing' },
        { name: 'Round Lab Dokdo Cleanser', benefit: 'Mineral-rich, hydrating' },
        { name: 'La Roche-Posay Toleriane', benefit: 'Dermatologist-tested' },
      ],
      oilCleansers: [
        { name: 'Beauty of Joseon Radiance Cleansing Balm', benefit: 'Gentle, effective' },
        { name: 'Banila Co Clean It Zero', benefit: 'K-beauty favorite' },
        { name: 'Heimish All Clean Balm', benefit: 'Hypoallergenic' },
        { name: 'The Face Shop Rice Water Bright Cleansing Oil', benefit: 'Affordable, gentle' },
      ],
      bhaExfoliants: [
        { name: 'COSRX BHA Blackhead Power Liquid', benefit: 'Gentle 4% BHA' },
        { name: 'Paula\'s Choice 2% BHA Liquid Exfoliant', benefit: 'Gold standard BHA' },
        { name: 'By Wishtrend Mandelic 5% Prep Water', benefit: 'Gentler alternative' },
        { name: 'Some By Mi AHA BHA PHA 30 Days Miracle Toner', benefit: 'Multi-acid blend' },
      ],
      moisturizers: [
        { name: 'Isntree Hyaluronic Aqua Gel', benefit: 'Lightweight, fresh' },
        { name: 'Clinique Moisture Surge', benefit: 'Oil-free hydration' },
        { name: 'Neutrogena Hydro Boost Gel', benefit: 'Affordable, effective' },
        { name: 'Beauty of Joseon Dynasty Light', benefit: 'Gel-cream texture' },
      ],
    },
    extraCare: [
      'smartRoutine.blackheads_tip1',
      'smartRoutine.blackheads_tip2',
      'smartRoutine.blackheads_tip3',
      'smartRoutine.blackheads_tip4',
      'smartRoutine.blackheads_tip5',
    ],
  },
  whiteheads: {
    nameKey: 'smartRoutine.whiteheads_name',
    color: '#7CB342',
    icon: require('../assets/images/Whitehead.png'),
    descriptionKey: 'smartRoutine.whiteheads_description',
    goalKey: 'smartRoutine.whiteheads_goal',
    amRoutine: [
      { step: 1, titleKey: 'smartRoutine.whiteheads_am_step1_title', descriptionKey: 'smartRoutine.whiteheads_am_step1_desc' },
      { step: 2, titleKey: 'smartRoutine.whiteheads_am_step2_title', descriptionKey: 'smartRoutine.whiteheads_am_step2_desc' },
      { step: 3, titleKey: 'smartRoutine.whiteheads_am_step3_title', descriptionKey: 'smartRoutine.whiteheads_am_step3_desc' },
    ],
    pmRoutine: [
      { step: 1, titleKey: 'smartRoutine.whiteheads_pm_step1_title', descriptionKey: 'smartRoutine.whiteheads_pm_step1_desc' },
      { step: 2, titleKey: 'smartRoutine.whiteheads_pm_step2_title', descriptionKey: 'smartRoutine.whiteheads_pm_step2_desc' },
      { step: 3, titleKey: 'smartRoutine.whiteheads_pm_step3_title', descriptionKey: 'smartRoutine.whiteheads_pm_step3_desc' },
    ],
    products: {
      cleansers: [
        { name: 'KraveBeauty Matcha Hemp', benefit: 'Gentle, balancing' },
        { name: 'Etude SoonJung pH 6.5 Whip Cleanser', benefit: 'Hypoallergenic' },
        { name: 'Vanicream Gentle Cleanser', benefit: 'Fragrance-free' },
        { name: 'La Roche-Posay Toleriane', benefit: 'Dermatologist-recommended' },
      ],
      retinoids: [
        { name: 'Geek & Gorgeous A-Game 5', benefit: 'Gentle retinaldehyde' },
        { name: 'Differin Gel (Adapalene 0.1%)', benefit: 'OTC retinoid' },
        { name: 'The Inkey List Retinol', benefit: 'Affordable starter' },
        { name: 'Beauty of Joseon Revive Serum', benefit: 'K-beauty retinal' },
      ],
      moisturizers: [
        { name: 'Illiyoon Ceramide Ato Concentrate', benefit: 'Rich barrier repair' },
        { name: 'CeraVe PM Facial Lotion', benefit: 'Ceramides & niacinamide' },
        { name: 'Axis-Y Dark Spot Correcting Glow Serum', benefit: 'Niacinamide boost' },
        { name: 'KraveBeauty Great Barrier Relief', benefit: 'Tamanu & ceramides' },
      ],
    },
    extraCare: [
      'smartRoutine.whiteheads_tip1',
      'smartRoutine.whiteheads_tip2',
      'smartRoutine.whiteheads_tip3',
      'smartRoutine.whiteheads_tip4',
      'smartRoutine.whiteheads_tip5',
    ],
  },
  papules: {
    nameKey: 'smartRoutine.papules_name',
    color: '#F39C12',
    icon: require('../assets/images/Papule.png'),
    descriptionKey: 'smartRoutine.papules_description',
    goalKey: 'smartRoutine.papules_goal',
    amRoutine: [
      { step: 1, titleKey: 'smartRoutine.papules_am_step1_title', descriptionKey: 'smartRoutine.papules_am_step1_desc' },
      { step: 2, titleKey: 'smartRoutine.papules_am_step2_title', descriptionKey: 'smartRoutine.papules_am_step2_desc' },
      { step: 3, titleKey: 'smartRoutine.papules_am_step3_title', descriptionKey: 'smartRoutine.papules_am_step3_desc' },
      { step: 4, titleKey: 'smartRoutine.papules_am_step4_title', descriptionKey: 'smartRoutine.papules_am_step4_desc' },
    ],
    pmRoutine: [
      { step: 1, titleKey: 'smartRoutine.papules_pm_step1_title', descriptionKey: 'smartRoutine.papules_pm_step1_desc' },
      { step: 2, titleKey: 'smartRoutine.papules_pm_step2_title', descriptionKey: 'smartRoutine.papules_pm_step2_desc' },
      { step: 3, titleKey: 'smartRoutine.papules_pm_step3_title', descriptionKey: 'smartRoutine.papules_pm_step3_desc' },
    ],
    products: {
      cleansers: [
        { name: 'KraveBeauty Matcha Hemp', benefit: 'Gentle, antimicrobial' },
        { name: 'Round Lab Dokdo Cleanser', benefit: 'Mineral-rich, soothing' },
        { name: 'COSRX Low pH Good Morning', benefit: 'Tea tree oil' },
        { name: 'La Roche-Posay Effaclar', benefit: 'Purifying foam' },
      ],
      niacinamide: [
        { name: 'The Ordinary Niacinamide 10% + Zinc 1%', benefit: 'Affordable, effective' },
        { name: 'Beauty of Joseon Glow Serum', benefit: 'Niacinamide + propolis' },
        { name: 'Axis-Y Dark Spot Correcting', benefit: 'Brightening serum' },
        { name: 'Paula\'s Choice 10% Niacinamide Booster', benefit: 'High concentration' },
      ],
      benzoylPeroxide: [
        { name: 'Paula\'s Choice CLEAR 2.5% BP', benefit: 'Gentle daily treatment' },
        { name: 'La Roche-Posay Effaclar Duo', benefit: 'BP + LHA combo' },
        { name: 'CeraVe Acne Foaming Cream Cleanser', benefit: 'BP wash 4%' },
        { name: 'PanOxyl Acne Wash 4%', benefit: 'Short-contact therapy' },
      ],
      moisturizers: [
        { name: 'Isntree Hyaluronic Aqua Gel', benefit: 'Lightweight, soothing' },
        { name: 'Clinique Moisture Surge', benefit: 'Oil-free hydration' },
        { name: 'Beauty of Joseon Dynasty Light', benefit: 'Gel-cream' },
        { name: 'Neutrogena Hydro Boost', benefit: 'Affordable gel' },
      ],
    },
    extraCare: [
      'smartRoutine.papules_tip1',
      'smartRoutine.papules_tip2',
      'smartRoutine.papules_tip3',
      'smartRoutine.papules_tip4',
      'smartRoutine.papules_tip5',
    ],
  },
  marks: {
    nameKey: 'smartRoutine.marks_name',
    color: '#9B59B6',
    icon: require('../assets/images/Mark.png'),
    descriptionKey: 'smartRoutine.marks_description',
    goalKey: 'smartRoutine.marks_goal',
    amRoutine: [
      { step: 1, titleKey: 'smartRoutine.marks_am_step1_title', descriptionKey: 'smartRoutine.marks_am_step1_desc' },
      { step: 2, titleKey: 'smartRoutine.marks_am_step2_title', descriptionKey: 'smartRoutine.marks_am_step2_desc' },
      { step: 3, titleKey: 'smartRoutine.marks_am_step3_title', descriptionKey: 'smartRoutine.marks_am_step3_desc' },
      { step: 4, titleKey: 'smartRoutine.marks_am_step4_title', descriptionKey: 'smartRoutine.marks_am_step4_desc' },
    ],
    pmRoutine: [
      { step: 1, titleKey: 'smartRoutine.marks_pm_step1_title', descriptionKey: 'smartRoutine.marks_pm_step1_desc' },
      { step: 2, titleKey: 'smartRoutine.marks_pm_step2_title', descriptionKey: 'smartRoutine.marks_pm_step2_desc' },
      { step: 3, titleKey: 'smartRoutine.marks_pm_step3_title', descriptionKey: 'smartRoutine.marks_pm_step3_desc' },
      { step: 4, titleKey: 'smartRoutine.marks_pm_step4_title', descriptionKey: 'smartRoutine.marks_pm_step4_desc' },
    ],
    products: {
      cleansers: [
        { name: 'KraveBeauty Matcha Hemp', benefit: 'Gentle, barrier-safe' },
        { name: 'La Roche-Posay Toleriane', benefit: 'Soothing formula' },
        { name: 'Vanicream Gentle Cleanser', benefit: 'Fragrance-free' },
        { name: 'Round Lab Dokdo', benefit: 'Mineral-rich' },
      ],
      vitaminC: [
        { name: 'Timeless Vitamin C + E Serum', benefit: '20% L-AA, affordable' },
        { name: 'Klairs Freshly Juiced Vitamin Drop', benefit: 'Gentle 5% ascorbic' },
        { name: 'Melano CC Intensive Anti-Spot', benefit: 'Japanese favorite' },
        { name: 'Beauty of Joseon Glow Serum', benefit: 'Niacinamide + propolis' },
      ],
      fadingSerums: [
        { name: 'The Ordinary Niacinamide 10% + Zinc', benefit: 'PIH fading' },
        { name: 'The Ordinary Alpha Arbutin 2%', benefit: 'Gentle brightening' },
        { name: 'Axis-Y Dark Spot Correcting', benefit: 'Multi-brightening' },
        { name: 'Naturium Tranexamic Topical Acid 5%', benefit: 'Advanced brightening' },
      ],
      retinoids: [
        { name: 'Differin Gel 0.1%', benefit: 'OTC adapalene' },
        { name: 'Geek & Gorgeous A-Game 5', benefit: 'Gentle retinaldehyde' },
        { name: 'Beauty of Joseon Revive Serum', benefit: 'K-beauty retinal' },
        { name: 'The Ordinary Granactive Retinoid 2%', benefit: 'Beginner-friendly' },
      ],
    },
    extraCare: [
      'smartRoutine.marks_tip1',
      'smartRoutine.marks_tip2',
      'smartRoutine.marks_tip3',
      'smartRoutine.marks_tip4',
      'smartRoutine.marks_tip5',
    ],
  },
};

export default function SmartRoutineDetailScreen({ onNavigateHome, onNavigateBack, concernId }) {
  const [concernData, setConcernData] = useState(null);

  useEffect(() => {
    if (concernId && CONCERN_DATA[concernId]) {
      setConcernData(CONCERN_DATA[concernId]);
    }
  }, [concernId]);

  if (!concernData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{t('smartRoutineDetail.error')}</Text>
      </View>
    );
  }

  // ✅ Helper to format category names
  const formatCategoryName = (category) => {
    return category
      .charAt(0).toUpperCase() + 
      category.slice(1).replace(/([A-Z])/g, ' $1');
  };

  return (
    <View style={styles.container}>
      {/* Logo Navigation */}
      <View style={styles.topNavigation}>
        <TouchableOpacity onPress={onNavigateHome} style={styles.logoButton}>
          <Image 
            source={require('../assets/images/dracne-logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* ✅ ADDED: Banner with Proper Text */}
      <TouchableOpacity 
        style={styles.bannerContainer}
        onPress={onNavigateBack}
        activeOpacity={0.9}
      >
        <ImageBackground
          source={require('../assets/images/banner-scan-skin-base.png')}
          style={styles.bannerImageBackground}
          imageStyle={styles.bannerImage}
        >
          <View style={styles.smartBannerTextContainer}>
            <Text style={styles.smartBannerLine1}>{t('smartRoutineBanners.smart')}</Text>
            <Text style={styles.smartBannerLine2}>{t('smartRoutineBanners.routine')}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.concernIconContainer, { backgroundColor: `${concernData.color}15` }]}>
              <Image 
                source={concernData.icon}
                style={[styles.concernIcon, { tintColor: concernData.color }]}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.concernTitle}>{t(concernData.nameKey)}</Text>
            <Text style={styles.concernDescription}>{t(concernData.descriptionKey)}</Text>
          </View>

          {/* Goal Box */}
          <View style={[styles.goalBox, { borderLeftColor: concernData.color }]}>
            <Text style={styles.goalTitle}>{t('smartRoutineDetail.treatment_goal')}</Text>
            <Text style={styles.goalText}>{t(concernData.goalKey)}</Text>
          </View>

          {/* AM Routine */}
          <View style={styles.routineSection}>
            <View style={styles.routineHeader}>
              <View style={styles.routineIconContainer}>
                <Image 
                  source={require('../assets/images/sunscreen.png')}
                  style={styles.routineIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.routineTitle}>{t('smartRoutineDetail.morning_routine')}</Text>
            </View>
            {concernData.amRoutine.map((item) => (
              <View key={item.step} style={styles.stepCard}>
                <View style={[styles.stepNumber, { backgroundColor: concernData.color }]}>
                  <Text style={styles.stepNumberText}>{item.step}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{t(item.titleKey)}</Text>
                  <Text style={styles.stepDescription}>{t(item.descriptionKey)}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* PM Routine */}
          <View style={styles.routineSection}>
            <View style={styles.routineHeader}>
              <View style={styles.routineIconContainer}>
                <Image 
                  source={require('../assets/images/jar cream.png')}
                  style={styles.routineIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.routineTitle}>{t('smartRoutineDetail.evening_routine')}</Text>
            </View>
            {concernData.pmRoutine.map((item) => (
              <View key={item.step} style={styles.stepCard}>
                <View style={[styles.stepNumber, { backgroundColor: concernData.color }]}>
                  <Text style={styles.stepNumberText}>{item.step}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{t(item.titleKey)}</Text>
                  <Text style={styles.stepDescription}>{t(item.descriptionKey)}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Product Recommendations */}
          <View style={styles.productsSection}>
            <Text style={styles.sectionTitle}>{t('smartRoutineDetail.product_recommendations')}</Text>
            {Object.keys(concernData.products).map((category) => (
              <View key={category} style={styles.productCategory}>
                <Text style={styles.categoryTitle}>
                  {formatCategoryName(category)}
                </Text>
                {concernData.products[category].map((product, index) => (
                  <View key={index} style={styles.productCard}>
                    <View style={styles.productDot} />
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productBenefit}>{product.benefit}</Text>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* Extra Care */}
          <View style={styles.extraCareSection}>
            <Text style={styles.sectionTitle}>{t('smartRoutineDetail.extra_care')}</Text>
            {concernData.extraCare.map((tipKey, index) => (
              <View key={index} style={styles.tipCard}>
                <Image 
                  source={require('../assets/images/check.png')}
                  style={styles.tipIcon}
                  resizeMode="contain"
                />
                <Text style={styles.tipText}>{t(tipKey)}</Text>
              </View>
            ))}
          </View>

          <View style={styles.citationContainer}>
            <Text style={styles.citationText}>
              {t('smartRoutineDetail.citation_intro')}{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://www.jaad.org/article/S0190-9622(15)02614-6/fulltext')}
              >
                {t('smartRoutineDetail.citation_link1')}
              </Text>
              {t('smartRoutineDetail.citation_part2')}{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4554394/')}
              >
                {t('smartRoutineDetail.citation_link2')}
              </Text>
              {t('smartRoutineDetail.citation_part3')}{' '}
              <Text 
                style={styles.citationLink}
                onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5574737/')}
              >
                {t('smartRoutineDetail.citation_link3')}
              </Text>
              {t('smartRoutineDetail.citation_disclaimer')}
            </Text>
          </View>

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={t('smartRoutineDetail.back_button')}
          onPress={onNavigateBack}
          style={styles.backButton}
        />
        <Text style={styles.helperText}>
          {t('smartRoutineDetail.helper')}
        </Text>
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
  // ✅ ADDED: Banner Styles
  bannerContainer: {
    width: '100%',
    height: 120,
    marginBottom: 20,
  },
  bannerImageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  bannerImage: {
    borderRadius: 0,
  },
  smartBannerTextContainer: {
    alignItems: 'flex-end',
    paddingRight: 24,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    justifyContent: 'center',
  },
  smartBannerLine1: {
    fontFamily: 'Baloo',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 38,
    color: BRAND_COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    includeFontPadding: false,
  },
  smartBannerLine2: {
    fontFamily: 'Baloo',
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 38,
    color: BRAND_COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginTop: -4,
    includeFontPadding: false,
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
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  concernIcon: {
    width: 36,
    height: 36,
  },
  concernTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 8,
  },
  concernDescription: {
    fontSize: 14,
    color: BRAND_COLORS.darkGray,
    textAlign: 'center',
    lineHeight: 20,
  },
  goalBox: {
    backgroundColor: BRAND_COLORS.white,
    borderLeftWidth: 4,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  goalTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 6,
  },
  goalText: {
    fontSize: 13,
    color: BRAND_COLORS.darkGray,
    lineHeight: 19,
  },
  routineSection: {
    marginBottom: 20,
  },
  routineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  routineIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  routineIcon: {
    width: 24,
    height: 24,
    tintColor: BRAND_COLORS.primary,
  },
  routineTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: BRAND_COLORS.black,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 3,
  },
  stepDescription: {
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    lineHeight: 17,
  },
  productsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 12,
  },
  productCategory: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: BRAND_COLORS.primary,
    marginBottom: 8,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  productDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: BRAND_COLORS.primary,
    marginTop: 6,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 2,
  },
  productBenefit: {
    fontSize: 11,
    color: BRAND_COLORS.gray,
    lineHeight: 15,
  },
  extraCareSection: {
    marginBottom: 20,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  tipIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
    marginTop: 2,
    tintColor: BRAND_COLORS.primary,
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    lineHeight: 17,
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
    height: 140,
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
  backButton: {
    width: '100%',
    marginBottom: 8,
  },
  helperText: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 16,
    color: BRAND_COLORS.secondary,
    textAlign: 'center',
    marginTop: 100,
  },
});