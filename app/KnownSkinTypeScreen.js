// app/KnownSkinTypeScreen.js - Following AnalysisResults Design
import React, { useState } from 'react';
import {
  Image,
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
  onContinueToResults,
  onNavigateHome,
  style = {} 
}) => {
  const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);

  const skinTypes = [
    {
      id: 'normal',
      title: 'Normal',
      description: 'Well-balanced with minimal concerns',
      icon: require('../assets/images/check.png'),
      color: '#4CAF50'
    },
    {
      id: 'oily',
      title: 'Oily',
      description: 'Excess oil production, especially T-zone',
      icon: require('../assets/images/check.png'),
      color: '#FF9800'
    },
    {
      id: 'dry',
      title: 'Dry',
      description: 'Lacks moisture, may feel tight',
      icon: require('../assets/images/check.png'),
      color: '#2196F3'
    },
    {
      id: 'combination',
      title: 'Combination',
      description: 'Mix of oily and dry areas',
      icon: require('../assets/images/check.png'),
      color: '#9C27B0'
    },
    {
      id: 'sensitive',
      title: 'Sensitive',
      description: 'Easily irritated or reactive',
      icon: require('../assets/images/check.png'),
      color: '#FF7A7A'
    }
  ];

  const handleLogoPress = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      console.log('Navigate to home screen');
    }
  };

  const handleSkinTypeSelect = (skinType) => {
    const isCurrentlySelected = selectedSkinTypes.some(type => type.id === skinType.id);
    
    if (isCurrentlySelected) {
      setSelectedSkinTypes(selectedSkinTypes.filter(type => type.id !== skinType.id));
    } else {
      if (selectedSkinTypes.length < 2) {
        setSelectedSkinTypes([...selectedSkinTypes, skinType]);
      }
    }
  };

  const handleContinue = () => {
    if (selectedSkinTypes.length > 0) {
      const primarySkinType = selectedSkinTypes[0];
      const mockTestResult = createMockTestResult(primarySkinType.id);
      onContinueToResults(mockTestResult, selectedSkinTypes);
    }
  };

  const createMockTestResult = (skinTypeId) => {
    let totalPoints;
    
    switch (skinTypeId) {
      case 'oily':
        totalPoints = 8;
        break;
      case 'combination': 
        totalPoints = 5;
        break;
      case 'normal':
        totalPoints = 3;
        break;
      case 'dry':
        totalPoints = 2;
        break;
      case 'sensitive':
        totalPoints = 3;
        break;
      default:
        totalPoints = 3;
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
      return "You can select up to 2 skin types";
    }
    
    if (selectedSkinTypes.length === 1) {
      return `Continue with ${selectedSkinTypes[0].title}`;
    }
    
    const skinTypeNames = selectedSkinTypes.map(type => type.title).join(' + ');
    return `Continue with ${skinTypeNames}`;
  };

  return (
    <View style={[styles.container, style]}>
      {/* Logo - Top Left */}
      <View style={styles.logoHeader}>
        <TouchableOpacity 
          onPress={handleLogoPress}
          activeOpacity={0.7}
        >
          <Image 
            source={require('../assets/images/dracne-logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Select Your <Text style={styles.titleHighlight}>Skin Type</Text>
          </Text>
          <Text style={styles.subtitle}>
            Choose 1 or 2 types that best describe your skin
          </Text>
        </View>

        {/* Skin Type Options */}
        <View style={styles.optionsContainer}>
          {skinTypes.map((skinType) => {
            const isCurrentlySelected = isSelected(skinType);
            return (
              <TouchableOpacity
                key={skinType.id}
                style={[
                  styles.typeCard,
                  isCurrentlySelected && {
                    borderColor: skinType.color,
                    borderWidth: 2,
                    backgroundColor: `${skinType.color}10`,
                  }
                ]}
                onPress={() => handleSkinTypeSelect(skinType)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.iconContainer,
                  { backgroundColor: isCurrentlySelected ? skinType.color : '#F5F5F5' }
                ]}>
                  <Image
                    source={skinType.icon}
                    style={[
                      styles.icon,
                      { tintColor: isCurrentlySelected ? BRAND_COLORS.white : '#999' }
                    ]}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[
                    styles.typeLabel,
                    isCurrentlySelected && { color: skinType.color, fontWeight: '600' }
                  ]}>
                    {skinType.title}
                  </Text>
                  <Text style={styles.typeDescription}>{skinType.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Continue Button - Fixed at Bottom */}
      <View style={styles.buttonContainer}>
        <DrAcneButton
          title={getButtonText()}
          onPress={handleContinue}
          disabled={selectedSkinTypes.length === 0}
          style={styles.continueButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  logoHeader: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  logo: {
    width: 70,
    height: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 34,
  },
  titleHighlight: {
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  textContainer: {
    flex: 1,
  },
  typeLabel: {
    fontSize: 17,
    color: BRAND_COLORS.black,
    marginBottom: 3,
  },
  typeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 19,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  continueButton: {
    width: '100%',
    paddingVertical: 16,
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});