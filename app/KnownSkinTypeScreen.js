// app/KnownSkinTypeScreen.js - Updated to go to SkinTypeResultsScreen first
import React, { useState } from 'react';
import {
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
  lightGray: '#F5F5F5',
  gray: '#999999',
};

export const KnownSkinTypeScreen = ({ 
  onBack, 
  onContinueToResults, // CHANGED: Now goes to results first, not directly to profile creation
  style = {} 
}) => {
  const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);

  const skinTypes = [
    {
      id: 'normal',
      title: 'Normal',
      description: 'Well-balanced with minimal concerns',
      signs: ['Comfortable feel', 'Small pores', 'Even skin tone', 'Rarely sensitive'],
      color: '#4CAF50'
    },
    {
      id: 'oily',
      title: 'Oily',
      description: 'Excess oil production, especially T-zone',
      signs: ['Shiny appearance', 'Large pores', 'Prone to acne', 'Makeup slides off'],
      color: '#FF9800'
    },
    {
      id: 'dry',
      title: 'Dry',
      description: 'Lacks moisture, may feel tight',
      signs: ['Tight feeling', 'Flaky patches', 'Fine lines', 'Dull appearance'],
      color: '#2196F3'
    },
    {
      id: 'combination',
      title: 'Combination',
      description: 'Mix of oily and dry areas',
      signs: ['Oily T-zone', 'Dry cheeks', 'Mixed texture', 'Varies by season'],
      color: '#9C27B0'
    },
    {
      id: 'sensitive',
      title: 'Sensitive',
      description: 'Easily irritated or reactive',
      signs: ['Easily irritated', 'Redness prone', 'Product reactions', 'Tender skin'],
      color: '#FF7A7A'
    }
  ];

  const handleSkinTypeSelect = (skinType) => {
    const isCurrentlySelected = selectedSkinTypes.some(type => type.id === skinType.id);
    
    if (isCurrentlySelected) {
      // Deselect if already selected
      setSelectedSkinTypes(selectedSkinTypes.filter(type => type.id !== skinType.id));
    } else {
      // Add to selection if less than 2 types selected
      if (selectedSkinTypes.length < 2) {
        setSelectedSkinTypes([...selectedSkinTypes, skinType]);
      }
    }
  };

  // UPDATED: Create mock test result and go to SkinTypeResultsScreen first
  const handleContinue = () => {
    if (selectedSkinTypes.length > 0) {
      // Create a mock test result based on selected skin type
      const primarySkinType = selectedSkinTypes[0]; // Use first selected as primary
      
      // Create mock test result that will produce the correct skin type analysis
      const mockTestResult = createMockTestResult(primarySkinType.id);
      
      // Pass both the mock test result and the original selection
      onContinueToResults(mockTestResult, selectedSkinTypes);
    }
  };

  // Create mock test result with points that will analyze to the correct skin type
  const createMockTestResult = (skinTypeId) => {
    let totalPoints;
    
    // Map skin types to point values that will produce correct analysis
    switch (skinTypeId) {
      case 'oily':
        totalPoints = 8; // >= 7 = oily
        break;
      case 'combination': 
        totalPoints = 5; // 5-6 = combination
        break;
      case 'normal':
        totalPoints = 3; // 3-4 = normal
        break;
      case 'dry':
        totalPoints = 2; // < 3 = dry
        break;
      case 'sensitive':
        totalPoints = 3; // Default to normal points, will show as normal with sensitive traits
        break;
      default:
        totalPoints = 3; // Default to normal
    }

    return {
      testName: 'Manual Skin Type Selection',
      testType: 'manual_selection',
      completedAt: new Date().toISOString(),
      totalPoints: totalPoints,
      maxPoints: 8,
      answers: {
        manual_selection: {
          id: skinTypeId,
          text: `User selected: ${skinTypeId}`,
          points: totalPoints
        }
      },
      questions: [],
      metadata: {
        questionsCount: 0,
        answeredCount: 1,
        averageScore: totalPoints,
        testDescription: 'Manual skin type selection by user',
        isManualSelection: true,
        selectedSkinTypes: selectedSkinTypes
      }
    };
  };

  const isSelected = (skinType) => {
    return selectedSkinTypes.some(type => type.id === skinType.id);
  };

  const getButtonText = () => {
    if (selectedSkinTypes.length === 0) {
      return "Select at least 1 type";
    }
    
    if (selectedSkinTypes.length === 1) {
      return `Continue with My ${selectedSkinTypes[0].title} Skin`;
    }
    
    // For 2 selections, show both types
    const skinTypeNames = selectedSkinTypes.map(type => type.title).join(' + ');
    return `Continue with My ${skinTypeNames} Skin`;
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <Text style={styles.mainTitle}>Select Your Skin Type</Text>
        <Text style={styles.subtitle}>Choose 1 or 2 types that best describe your skin</Text>

        <View style={styles.optionsContainer}>
          {skinTypes.map((skinType) => (
            <TouchableOpacity
              key={skinType.id}
              style={[
                styles.skinTypeCard,
                isSelected(skinType) && styles.selectedCard
              ]}
              onPress={() => handleSkinTypeSelect(skinType)}
              activeOpacity={0.7}
            >
              <View style={styles.cardContent}>
                <View style={[styles.colorIndicator, { backgroundColor: skinType.color }]} />
                <View style={styles.cardInfo}>
                  <Text style={styles.skinTypeTitle}>{skinType.title}</Text>
                  <Text style={styles.skinTypeDescription}>{skinType.description}</Text>
                  <View style={styles.signsRow}>
                    <Text style={styles.signText}>{skinType.signs[0]}</Text>
                    <Text style={styles.signDot}>•</Text>
                    <Text style={styles.signText}>{skinType.signs[1]}</Text>
                    <Text style={styles.signDot}>•</Text>
                    <Text style={styles.signText}>{skinType.signs[2]}</Text>
                    <Text style={styles.signDot}>•</Text>
                    <Text style={styles.signText}>{skinType.signs[3]}</Text>
                  </View>
                </View>
                {isSelected(skinType) && (
                  <View style={styles.selectedIndicator}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <DrAcneButton
            title={getButtonText()}
            onPress={handleContinue}
            disabled={selectedSkinTypes.length === 0}
            style={styles.continueButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND_COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    marginBottom: 15,
  },
  optionsContainer: {
    flex: 1,
    gap: 10,
  },
  skinTypeCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  selectedCard: {
    backgroundColor: '#E8F5E9',
    elevation: 3,
    shadowOpacity: 0.12,
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
    color: BRAND_COLORS.black,
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
    marginHorizontals: 6,
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
  buttonContainer: {
    paddingVertical: 12,
  },
  continueButton: {
    paddingVertical: 14,
  },
});