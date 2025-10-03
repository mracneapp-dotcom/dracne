// app/SkinTypeResultsScreen.js - Enhanced to handle manual skin type selections
import React, { useEffect, useRef } from 'react';
import {
  Animated,
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
  lightGray: '#F5F5F5',
  gray: '#999999',
};

export const SkinTypeResultsScreen = ({ 
  testResults,
  analysisData,
  onContinue,
  onGoHome,
  style = {} 
}) => {

  // Animation values for reveal effect
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Simple reveal animation after component mounts
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // ENHANCED: Check if this is a manual selection and handle accordingly
  const isManualSelection = (testResult) => {
    return testResult && testResult.metadata && testResult.metadata.isManualSelection;
  };

  // Original logic for test-based results (maintains consistency)
  const analyzeSkinType = (testResult) => {
    if (!testResult || !testResult.totalPoints) return 'normal';
    
    const totalPoints = testResult.totalPoints;
    console.log('Analyzing skin type with points:', totalPoints);
    
    if (totalPoints >= 7) {
      return 'oily';
    } else if (totalPoints >= 5) {
      return 'combination';
    } else if (totalPoints >= 3) {
      return 'normal';
    } else {
      return 'dry';
    }
  };

  // NEW: Get manual selection types directly from metadata
  const getManualSelectionTypes = (testResult) => {
    if (testResult && testResult.metadata && testResult.metadata.selectedSkinTypes) {
      return testResult.metadata.selectedSkinTypes;
    }
    return [];
  };

  const getSkinTypeData = (skinType, manualSelectionTypes = []) => {
    // ENHANCED: Handle manual selections with multiple types
    if (manualSelectionTypes.length > 1) {
      return getCombinationSkinTypeData(manualSelectionTypes);
    }

    switch (skinType) {
      case 'dry':
        return {
          title: 'Dry',
          description: 'Reduced sebum and compromised barrier',
          signs: ['Tight sensation', 'Fine lines', 'Flaky patches'],
          color: '#2196F3',
          explanation: "Dry skin means your face tends to lose water throughout the day, which can leave it feeling tight or looking dull. Your barrier needs extra support to hold onto moisture.\n\nThe amazing thing about dry skin is how quickly it transforms with proper hydration. Within weeks, you'll notice smoother texture and that healthy glow returning.\n\nWe got you - let's build your most radiant skin!"
        };
      
      case 'oily':
        return {
          title: 'Oily',
          description: 'Excess sebum production throughout face',
          signs: ['Persistent shine', 'Enlarged pores', 'Acne-prone'],
          color: '#FF9800',
          explanation: "You've won the anti-aging lottery! That natural oil is like having a built-in moisturizer working 24/7, protecting your skin from wrinkles.\n\nWhile others worry about aging, your oily skin is busy preventing it. Once you master this balance, you'll achieve that coveted healthy glow.\n\nWe got you - let's turn your oil into your beauty asset!"
        };
      
      case 'normal':
        return {
          title: 'Normal',
          description: 'Well-balanced sebum and moisture levels',
          signs: ['Comfortable feel', 'Fine pores', 'Even texture'],
          color: '#4CAF50',
          explanation: "You have 'unicorn skin' - perfectly balanced and naturally resilient. Your skin maintains just the right amount of oil and moisture without you having to work for it.\n\nYour balanced skin gives you incredible flexibility to experiment with ingredients. You can focus on enhancement and protection, achieving that effortless, radiant look.\n\nWe got you - let's unlock your skin's full potential!"
        };
      
      case 'combination':
        return {
          title: 'Combination',
          description: 'Variable sebum production by facial zone',
          signs: ['Oily T-zone', 'Normal/dry cheeks', 'Mixed pore sizes'],
          color: '#9C27B0',
          explanation: "Your skin is smart enough to customize itself for different areas! This sophisticated behavior shows your skin actively responds to what each zone needs most.\n\nCombination skin is actually a strategic advantage once you understand it. You get anti-aging benefits where needed while maintaining smooth, refined areas elsewhere.\n\nWe got you - let's create your perfect routine!"
        };
      
      case 'sensitive':
        return {
          title: 'Sensitive',
          description: 'Heightened reactivity to stimuli',
          signs: ['Frequent irritation', 'Redness episodes', 'Product intolerance'],
          color: '#FF7A7A',
          explanation: "Your skin has a highly developed sensory system - like a built-in quality detector that immediately tells you what works and what doesn't work for you.\n\nSensitive skin often responds more dramatically to the right ingredients than other skin types. Once you find your perfect match, you'll see faster improvements.\n\nWe got you - let's find your gentle, effective routine!"
        };
      
      default:
        return {
          title: 'Your Skin Type',
          description: 'Unique characteristics',
          signs: ['Individual needs', 'Personal care', 'Custom approach'],
          color: '#4CAF50',
          explanation: "Your skin has unique characteristics that don't fit traditional categories - and that's actually a superpower! This means you get a completely customized approach.\n\nUnique skin means unlimited potential for discovering what works specifically for you. This personalized approach often leads to remarkable transformations.\n\nWe got you - let's embrace your skin's uniqueness!"
        };
    }
  };

  // NEW: Handle combination selections like "dry + sensitive"
  const getCombinationSkinTypeData = (selectedTypes) => {
    const titles = selectedTypes.map(type => type.title);
    const combinedTitle = titles.join(' + ');
    
    // Create combined signs from both types
    const allSigns = selectedTypes.flatMap(type => {
      switch (type.id) {
        case 'dry': return ['Tight sensation', 'Fine lines', 'Flaky patches'];
        case 'oily': return ['Persistent shine', 'Enlarged pores', 'Acne-prone'];
        case 'normal': return ['Comfortable feel', 'Fine pores', 'Even texture'];
        case 'combination': return ['Oily T-zone', 'Normal/dry cheeks', 'Mixed pore sizes'];
        case 'sensitive': return ['Frequent irritation', 'Redness episodes', 'Product intolerance'];
        default: return ['Individual needs'];
      }
    });
    
    // Take first 3 unique signs
    const uniqueSigns = [...new Set(allSigns)].slice(0, 3);
    
    // Generate combined explanation
    const explanation = generateCombinationExplanation(selectedTypes);
    
    return {
      title: combinedTitle,
      description: `Combined ${combinedTitle.toLowerCase()} characteristics`,
      signs: uniqueSigns,
      color: selectedTypes[0].color, // Use color from first selected type
      explanation: explanation
    };
  };

  // NEW: Generate explanations for combination skin types
  const generateCombinationExplanation = (selectedTypes) => {
    const typeIds = selectedTypes.map(type => type.id);
    
    // Handle common combinations
    if (typeIds.includes('dry') && typeIds.includes('sensitive')) {
      return "You have dry and sensitive skin - a combination that needs extra gentle care. Your skin loses moisture easily and can react to harsh ingredients, but this sensitivity is actually your skin's way of protecting itself.\n\nThe key is finding hydrating ingredients that don't trigger irritation. Once you master this balance, you'll see remarkable improvements in both comfort and appearance.\n\nWe got you - let's create your gentle hydration routine!";
    }
    
    if (typeIds.includes('oily') && typeIds.includes('sensitive')) {
      return "You have oily and sensitive skin - which means your skin produces oil but can still react to certain ingredients. This combination often happens when the skin barrier is compromised, causing both excess oil and sensitivity.\n\nYour routine needs to balance oil control with gentle care. The right approach can reduce both oiliness and sensitivity simultaneously for clearer, calmer skin.\n\nWe got you - let's find your balanced approach!";
    }
    
    if (typeIds.includes('combination') && typeIds.includes('sensitive')) {
      return "You have combination and sensitive skin - different areas need different care levels. Your T-zone might handle stronger ingredients while your cheeks need gentler treatment.\n\nThis combination gives you the opportunity to customize by zone. With the right targeted approach, you can address oil control and sensitivity needs simultaneously.\n\nWe got you - let's create your zone-specific routine!";
    }
    
    if (typeIds.includes('normal') && typeIds.includes('sensitive')) {
      return "You have normal and sensitive skin - generally balanced but with some reactive tendencies. Your skin maintains good moisture and oil balance but can be picky about ingredients.\n\nThis combination is often the easiest to manage once you identify your triggers. You can enjoy most ingredients while avoiding specific irritants.\n\nWe got you - let's build your gentle, effective routine!";
    }
    
    // Default combination explanation
    const titles = selectedTypes.map(type => type.title).join(' and ').toLowerCase();
    return `You have ${titles} skin - a unique combination that gives you the characteristics of both types. This means your routine can be customized to address multiple skin needs simultaneously.\n\nCombination skin types often see the most dramatic improvements because they benefit from targeted approaches. Your personalized routine will address each aspect of your skin.\n\nWe got you - let's create your multi-benefit routine!`;
  };

  const testResult = Array.isArray(testResults) ? testResults[0] : testResults;
  
  // ENHANCED: Determine skin type based on whether it's manual selection or test-based
  let primarySkinType;
  let manualSelectionTypes = [];
  
  if (isManualSelection(testResult)) {
    manualSelectionTypes = getManualSelectionTypes(testResult);
    primarySkinType = manualSelectionTypes.length > 0 ? manualSelectionTypes[0].id : 'normal';
  } else {
    primarySkinType = analyzeSkinType(testResult);
  }
  
  const skinData = getSkinTypeData(primarySkinType, manualSelectionTypes);

  console.log('Primary skin type determined:', primarySkinType);
  console.log('Manual selection types:', manualSelectionTypes);

  return (
    <View style={[styles.container, style]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        
        <Text style={styles.title}>Your Skin Type Analysis</Text>
        <Text style={styles.subtitle}>You have:</Text>

        {/* Animated skin type result card */}
        <Animated.View style={[
          styles.skinTypeCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <View style={styles.cardContent}>
            <View style={[styles.colorIndicator, { backgroundColor: skinData.color }]} />
            <View style={styles.cardInfo}>
              <Text style={styles.skinTypeTitle}>{skinData.title}</Text>
              <Text style={styles.skinTypeDescription}>{skinData.description}</Text>
              <View style={styles.signsRow}>
                <Text style={styles.signText}>{skinData.signs[0]}</Text>
                <Text style={styles.signDot}>•</Text>
                <Text style={styles.signText}>{skinData.signs[1]}</Text>
                <Text style={styles.signDot}>•</Text>
                <Text style={styles.signText}>{skinData.signs[2]}</Text>
              </View>
            </View>
            <View style={styles.selectedIndicator}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          </View>
        </Animated.View>

        {/* FIXED: Gray explanation box with proper height */}
        <Animated.View style={[
          styles.explanationBox,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <Text style={styles.explanationTitle}>What this means for you</Text>
          <Text style={styles.explanationText}>
            {skinData.explanation}
          </Text>
        </Animated.View>
        
        {/* Engaging green button - CONSISTENT FOR ALL SKIN TYPES */}
        <Animated.View style={[
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}>
          <DrAcneButton
            title="Continue Building My Routine"
            onPress={onContinue}
            style={styles.continueButton}
          />
        </Animated.View>

        {/* FIXED: Text link to go home - Now guaranteed to be visible */}
        <Animated.View style={[
          styles.skipAnimatedContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}>
          <TouchableOpacity onPress={onGoHome} style={styles.skipContainer}>
            <Text style={styles.skipText}>I'll do it later, go to main menu</Text>
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND_COLORS.white,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 150, // INCREASED: Much more bottom padding to ensure hyperlink visibility
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    marginBottom: 30,
  },
  skinTypeCard: {
    backgroundColor: BRAND_COLORS.cream,
    borderWidth: 2,
    borderColor: BRAND_COLORS.primary,
    borderRadius: 12,
    padding: 14,
    marginBottom: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorIndicator: {
    width: 4,
    height: 45,
    borderRadius: 2,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  skinTypeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BRAND_COLORS.primary,
    marginBottom: 2,
  },
  skinTypeDescription: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    marginBottom: 4,
  },
  signsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  signText: {
    fontSize: 11,
    color: BRAND_COLORS.gray,
  },
  signDot: {
    fontSize: 11,
    color: BRAND_COLORS.gray,
    marginHorizontal: 6,
  },
  selectedIndicator: {
    backgroundColor: BRAND_COLORS.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  explanationBox: {
    backgroundColor: BRAND_COLORS.lightGray,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30, // INCREASED: More space before button
    height: 300, // INCREASED: Space for 1 more line as requested
    justifyContent: 'flex-start', // Align content to top for better readability
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BRAND_COLORS.black,
    marginBottom: 12,
    textAlign: 'center',
  },
  explanationText: {
    fontSize: 14,
    color: BRAND_COLORS.black,
    lineHeight: 20,
    textAlign: 'center',
    flex: 1, // Take remaining space in fixed height box
  },
  continueButton: {
    paddingVertical: 16,
    marginBottom: 30, // INCREASED: More space before hyperlink
  },
  skipAnimatedContainer: {
    // Container for the animated hyperlink
    marginBottom: 40, // ADDED: Extra margin to ensure it's always visible
  },
  skipContainer: {
    alignItems: 'center',
    paddingVertical: 15, // INCREASED: More touch area
    paddingHorizontal: 20,
  },
  skipText: {
    fontSize: 14,
    color: BRAND_COLORS.primary,
    textDecorationLine: 'underline',
  },
});