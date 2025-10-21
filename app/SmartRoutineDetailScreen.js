// app/SmartRoutineDetailScreen.js - DETAILED SMART ROUTINE (FIXED)
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
};

const CONCERN_DATA = {
  nodules: {
    name: 'Inflamed Acne (Nodules)',
    color: '#FF7A7A', // Secondary
    icon: require('../assets/images/Nodule.png'),
    description: 'Deep, painful bumps that form beneath the skin surface. Requires gentle, anti-inflammatory approach.',
    goal: 'Calm inflammation, regulate oil, and prevent infection without stripping skin barrier.',
    amRoutine: [
      { step: 1, title: 'Gentle Low-pH Cleanser', description: 'Non-stripping formula to cleanse without irritation' },
      { step: 2, title: 'Barrier Moisturizer', description: 'Light gel-cream to maintain skin barrier' },
      { step: 3, title: 'Mineral or Hybrid SPF', description: 'Non-comedogenic sun protection' },
    ],
    pmRoutine: [
      { step: 1, title: 'Gentle Cleanser', description: 'Same as morning cleanser' },
      { step: 2, title: 'Targeted Active', description: 'Adapalene 0.1% (3-4x/week) or Azelaic Acid 10-20%' },
      { step: 3, title: 'Lightweight Moisturizer', description: 'Barrier support without heaviness' },
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
      'Never pop or touch nodules - they form deep beneath the skin',
      'Use disposable cotton pads instead of towels to prevent bacteria spread',
      'Change pillowcases 2-3 times per week',
      'Apply ice wrapped in gauze for 30 seconds to reduce swelling',
      'Introduce actives slowly - start 2x per week',
    ],
  },
  blackheads: {
    name: 'Blackheads (Open Comedones)',
    color: '#4A90E2', // Blue
    icon: require('../assets/images/Blackhead.png'),
    description: 'Oxidized sebum in open pores. Requires chemical exfoliation to dissolve buildup.',
    goal: 'Dissolve oxidized sebum and keep pores clear with BHA exfoliants.',
    amRoutine: [
      { step: 1, title: 'Gentle Gel Cleanser', description: 'Low-pH formula for clean skin' },
      { step: 2, title: 'Lightweight Gel-Cream', description: 'Oil-free hydration' },
      { step: 3, title: 'Broad-Spectrum SPF', description: 'Daily sun protection' },
    ],
    pmRoutine: [
      { step: 1, title: 'Double Cleanse', description: 'Oil-based balm first if using sunscreen' },
      { step: 2, title: 'Basic Cleanser', description: 'Gentle daily cleanser' },
      { step: 3, title: 'BHA Exfoliant (2-3x/week)', description: 'Salicylic acid to clear pores' },
      { step: 4, title: 'Gel-Cream Moisturizer', description: 'Lightweight barrier support' },
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
      'Avoid physical scrubs or pore strips - they damage the barrier',
      'Steam once weekly before BHA application to enhance penetration',
      'Never over-cleanse - skin should never feel tight',
      'Be patient - results take 6-8 weeks of consistent use',
      'Don\'t mix BHA with retinoids on the same night',
    ],
  },
  whiteheads: {
    name: 'Whiteheads (Closed Comedones)',
    color: '#7CB342', // Primary green
    icon: require('../assets/images/Whitehead.png'),
    description: 'Closed pores filled with sebum and dead skin. Needs cell turnover acceleration.',
    goal: 'Accelerate cell turnover and prevent clogged follicles with retinoids.',
    amRoutine: [
      { step: 1, title: 'Gentle Cleanser', description: 'Non-stripping daily cleanser' },
      { step: 2, title: 'Niacinamide Moisturizer', description: 'Anti-inflammatory hydration' },
      { step: 3, title: 'Non-Comedogenic Sunscreen', description: 'Essential daily protection' },
    ],
    pmRoutine: [
      { step: 1, title: 'Gentle Cleanser', description: 'Same as morning' },
      { step: 2, title: 'Retinoid (2-3x/week)', description: 'Adapalene or low-strength retinol' },
      { step: 3, title: 'Hydrating Moisturizer', description: 'Ceramide or gel-cream formula' },
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
      'Never pick or squeeze whiteheads - causes scarring',
      'Introduce retinoids slowly: 2x per week for first month',
      'Always use SPF when using retinoids - increased sun sensitivity',
      'Sleep on clean pillowcases changed every 2-3 days',
      'Remove all makeup thoroughly every night',
    ],
  },
  papules: {
    name: 'Papules & Pustules',
    color: '#F39C12', // Orange
    icon: require('../assets/images/Papule.png'),
    description: 'Surface acne with bacterial involvement. Requires antimicrobial treatment.',
    goal: 'Kill acne bacteria and reduce inflammation with benzoyl peroxide and niacinamide.',
    amRoutine: [
      { step: 1, title: 'Antimicrobial Cleanser', description: 'Gentle cleanser with antibacterial properties' },
      { step: 2, title: 'Niacinamide Serum (5-10%)', description: 'Reduces inflammation' },
      { step: 3, title: 'Lightweight Oil-Free Moisturizer', description: 'Barrier support' },
      { step: 4, title: 'SPF Protection', description: 'Daily sun protection' },
    ],
    pmRoutine: [
      { step: 1, title: 'Basic Cleanser', description: 'Gentle daily cleanser' },
      { step: 2, title: 'Benzoyl Peroxide 2.5-5%', description: 'Spot treatment or short-contact wash' },
      { step: 3, title: 'Gel-Cream Moisturizer', description: 'Lightweight hydration' },
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
      'Never apply BP and retinoids at the same time - alternate nights',
      'Use cotton pillowcases (not synthetic) and change frequently',
      'BP can bleach fabrics - use white towels and sheets',
      'Start with 2.5% BP - higher isn\'t always better',
      'Moisturize before BP application to reduce irritation',
    ],
  },
  marks: {
    name: 'Post-Inflammatory Marks (PIE/PIH)',
    color: '#9B59B6', // Purple
    icon: require('../assets/images/Mark.png'),
    description: 'Dark spots and red marks left after acne heals. Requires brightening and barrier support.',
    goal: 'Fade dark/red spots with brightening actives while maintaining strong barrier.',
    amRoutine: [
      { step: 1, title: 'Gentle Cleanser', description: 'Maintain barrier integrity' },
      { step: 2, title: 'Vitamin C or Brightening Serum', description: 'Antioxidant protection & fading' },
      { step: 3, title: 'Lightweight Moisturizer', description: 'Barrier support' },
      { step: 4, title: 'SPF (Non-Negotiable)', description: 'Prevents darkening of marks' },
    ],
    pmRoutine: [
      { step: 1, title: 'Gentle Cleanser', description: 'Same as morning' },
      { step: 2, title: 'Niacinamide or Alpha Arbutin', description: 'Fading serum' },
      { step: 3, title: 'Retinoid (2-3x/week)', description: 'Accelerate cell turnover' },
      { step: 4, title: 'Moisturizer', description: 'Lock in treatment' },
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
      'SPF every day, even indoors - UV darkens marks',
      'Avoid "miracle" spot creams with harsh acids',
      'Use soothing sheet masks (Dr. Jart Cicapair, Beauty of Joseon)',
      'Be patient - fading takes 6-12 weeks minimum',
      'Never pick at acne - causes more marks',
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
        <Text style={styles.errorText}>Concern data not found</Text>
      </View>
    );
  }

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
            <Text style={styles.concernTitle}>{concernData.name}</Text>
            <Text style={styles.concernDescription}>{concernData.description}</Text>
          </View>

          {/* Goal Box */}
          <View style={[styles.goalBox, { borderLeftColor: concernData.color }]}>
            <Text style={styles.goalTitle}>Treatment Goal</Text>
            <Text style={styles.goalText}>{concernData.goal}</Text>
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
              <Text style={styles.routineTitle}>Morning Routine</Text>
            </View>
            {concernData.amRoutine.map((item) => (
              <View key={item.step} style={styles.stepCard}>
                <View style={[styles.stepNumber, { backgroundColor: concernData.color }]}>
                  <Text style={styles.stepNumberText}>{item.step}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{item.title}</Text>
                  <Text style={styles.stepDescription}>{item.description}</Text>
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
              <Text style={styles.routineTitle}>Evening Routine</Text>
            </View>
            {concernData.pmRoutine.map((item) => (
              <View key={item.step} style={styles.stepCard}>
                <View style={[styles.stepNumber, { backgroundColor: concernData.color }]}>
                  <Text style={styles.stepNumberText}>{item.step}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{item.title}</Text>
                  <Text style={styles.stepDescription}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Product Recommendations */}
          <View style={styles.productsSection}>
            <Text style={styles.sectionTitle}>Product Recommendations</Text>
            {Object.keys(concernData.products).map((category) => (
              <View key={category} style={styles.productCategory}>
                <Text style={styles.categoryTitle}>
                  {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
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
            <Text style={styles.sectionTitle}>Extra Care Tips</Text>
            {concernData.extraCare.map((tip, index) => (
              <View key={index} style={styles.tipCard}>
                <Image 
                  source={require('../assets/images/check.png')}
                  style={styles.tipIcon}
                  resizeMode="contain"
                />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title="Back to Concerns"
          onPress={onNavigateBack}
          style={styles.backButton}
        />
        <Text style={styles.helperText}>
          Consistency is key - results take 6-12 weeks
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