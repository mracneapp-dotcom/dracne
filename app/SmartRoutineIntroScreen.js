// app/SmartRoutineIntroScreen.js - UPDATED WITH BOTTOM NAV
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
};

const CONCERN_INFO = {
  nodules: {
    name: 'Inflamed Acne (Nodules)',
    color: '#FF7A7A',
    icon: require('../assets/images/Nodule.png'),
    intro: 'Target deep, painful nodules with gentle anti-inflammatory actives',
    approach: 'We\'ll use calming ingredients like adapalene or azelaic acid to reduce inflammation without stripping your skin barrier.',
    keyIngredients: ['Adapalene 0.1%', 'Azelaic Acid 10-20%', 'Niacinamide 5-10%'],
  },
  blackheads: {
    name: 'Blackheads',
    color: '#4A90E2',
    icon: require('../assets/images/Blackhead.png'),
    intro: 'Dissolve oxidized sebum with chemical exfoliants',
    approach: 'BHA (salicylic acid) penetrates pores to clear oxidized sebum and prevent future blackheads.',
    keyIngredients: ['BHA 2-4%', 'Mandelic Acid', 'PHA'],
  },
  whiteheads: {
    name: 'Whiteheads',
    color: '#7CB342',
    icon: require('../assets/images/Whitehead.png'),
    intro: 'Accelerate cell turnover to prevent clogged pores',
    approach: 'Retinoids increase skin cell turnover, preventing pores from becoming clogged with dead skin and sebum.',
    keyIngredients: ['Adapalene 0.1%', 'Retinaldehyde', 'Low-strength Retinol'],
  },
  papules: {
    name: 'Papules & Pustules',
    color: '#F39C12',
    icon: require('../assets/images/Papule.png'),
    intro: 'Kill acne bacteria and reduce inflammation',
    approach: 'Benzoyl peroxide and niacinamide work together to eliminate bacteria and calm inflamed breakouts.',
    keyIngredients: ['Benzoyl Peroxide 2.5-5%', 'Niacinamide 10%', 'Tea Tree Oil'],
  },
  marks: {
    name: 'Post-Inflammatory Marks',
    color: '#9B59B6',
    icon: require('../assets/images/Mark.png'),
    intro: 'Fade dark spots with brightening actives',
    approach: 'Vitamin C, niacinamide, and alpha arbutin work to fade post-acne marks while retinoids accelerate cell turnover.',
    keyIngredients: ['Vitamin C 15-20%', 'Niacinamide 10%', 'Alpha Arbutin 2%', 'Retinoid'],
  },
};

export default function SmartRoutineIntroScreen({ 
  onNavigateHome,
  onNavigateBack,
  onContinue,
  concernId 
}) {
  const [concernData, setConcernData] = useState(null);

  useEffect(() => {
    if (concernId && CONCERN_INFO[concernId]) {
      setConcernData(CONCERN_INFO[concernId]);
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
          <View style={styles.header}>
            <View style={[styles.concernIconContainer, { backgroundColor: `${concernData.color}15` }]}>
              <Image 
                source={concernData.icon}
                style={[styles.concernIcon, { tintColor: concernData.color }]}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.concernTitle}>{concernData.name}</Text>
            <Text style={styles.concernIntro}>{concernData.intro}</Text>
          </View>

          <View style={[styles.approachBox, { borderLeftColor: concernData.color }]}>
            <Text style={styles.approachTitle}>Treatment Approach</Text>
            <Text style={styles.approachText}>{concernData.approach}</Text>
          </View>

          <View style={styles.ingredientsSection}>
            <Text style={styles.ingredientsTitle}>Key Ingredients</Text>
            {concernData.keyIngredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={[styles.ingredientDot, { backgroundColor: concernData.color }]} />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>

          <View style={styles.infoBox}>
            <Image 
              source={require('../assets/images/check.png')}
              style={styles.infoIcon}
              resizeMode="contain"
            />
            <Text style={styles.infoText}>
              This targeted routine complements your existing Day & Night routines. Apply these products after cleansing, before moisturizing.
            </Text>
          </View>

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title="Continue to Product Selection"
          onPress={() => onContinue && onContinue()}
          style={styles.continueButton}
        />
        <TouchableOpacity onPress={onNavigateBack} style={styles.backLink}>
          <Text style={styles.backLinkText}>Back to Concerns</Text>
        </TouchableOpacity>
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
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  concernIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  concernIcon: {
    width: 40,
    height: 40,
  },
  concernTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
  },
  concernIntro: {
    fontSize: 16,
    color: BRAND_COLORS.darkGray,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  approachBox: {
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
  approachTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 8,
  },
  approachText: {
    fontSize: 14,
    color: BRAND_COLORS.darkGray,
    lineHeight: 20,
  },
  ingredientsSection: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  ingredientsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 12,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredientDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  ingredientText: {
    fontSize: 14,
    color: BRAND_COLORS.darkGray,
    fontWeight: '500',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#C8E6C9',
  },
  infoIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    tintColor: BRAND_COLORS.primary,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    lineHeight: 17,
    fontWeight: '500',
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
  continueButton: {
    width: '100%',
    marginBottom: 12,
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