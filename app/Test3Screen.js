// app/Test3Screen.js - Overnight Assessment Part 1 (Properly Centered)
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

export const Test3Screen = ({ 
  onBack,
  onContinue,
  onNavigateHome,
  analysisData = null,
  style = {} 
}) => {
  const [currentScreen, setCurrentScreen] = useState('instructions');
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const question = {
    id: 'morning_feel',
    question: 'How does your skin feel when you wake up in the morning (before washing)?',
    options: [
      { id: 'very_oily', text: 'Very oily and greasy all over', points: 4 },
      { id: 'oily_tzone', text: 'Oily in T-zone, normal elsewhere', points: 3 },
      { id: 'balanced', text: 'Comfortable and balanced', points: 2 },
      { id: 'tight_dry', text: 'Tight, dry, or flaky', points: 1 }
    ]
  };

  const handleLogoPress = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      console.log('Navigate to home screen');
    }
  };

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleContinue = () => {
    if (selectedAnswer && onContinue) {
      onContinue(selectedAnswer);
    }
  };

  const renderInstructionsScreen = () => (
    <View style={styles.centerWrapper}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Overnight <Text style={styles.titleHighlight}>Assessment</Text>
          </Text>
          <Text style={styles.subtitle}>
            Check how your skin behaves while you sleep
          </Text>
        </View>

        <View style={styles.instructionsBox}>
          <Text style={styles.instructionsTitle}>How this test works:</Text>
          <Text style={styles.instructionsText}>
            This test reveals your skin's natural oil production while you sleep - the most accurate way to understand your skin type!
          </Text>
          
          <Text style={styles.instructionsTitle}>Tonight:</Text>
          <Text style={styles.instructionsText}>
            1. Cleanse your face before bed{'\n'}
            2. Don't apply any moisturizers or treatments{'\n'}
            3. Sleep normally
          </Text>

          <Text style={styles.instructionsTitle}>Tomorrow morning:</Text>
          <Text style={styles.instructionsText}>
            4. Look in the mirror before washing your face{'\n'}
            5. Notice how your skin feels and looks{'\n'}
            6. Come back here to record your results!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <DrAcneButton
            title="Log My Morning Check"
            onPress={() => setCurrentScreen('question')}
            style={styles.continueButton}
          />
        </View>
      </View>
    </View>
  );

  const renderQuestionScreen = () => (
    <View style={styles.centerWrapper}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Morning <Text style={styles.titleHighlight}>Assessment</Text>
          </Text>
          <Text style={styles.subtitle}>Question 1 of 2</Text>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{question.question}</Text>
          
          <View style={styles.optionsContainer}>
            {question.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionButton,
                  selectedAnswer?.id === option.id && styles.selectedOption
                ]}
                onPress={() => handleAnswerSelect(option)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.optionText,
                  selectedAnswer?.id === option.id && styles.selectedOptionText
                ]}>
                  {option.text}
                </Text>
                {selectedAnswer?.id === option.id && (
                  <View style={styles.selectedIndicator}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <DrAcneButton
            title={selectedAnswer ? "Next Question (1/2)" : "Answer question (0/2)"}
            onPress={handleContinue}
            disabled={!selectedAnswer}
            style={styles.continueButton}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
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

      {currentScreen === 'instructions' && renderInstructionsScreen()}
      {currentScreen === 'question' && renderQuestionScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  logoHeader: {
    paddingTop: 8,
    paddingLeft: 20,
    paddingBottom: 6,
    backgroundColor: 'transparent',
  },
  logo: {
    width: 60,
    height: 42,
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  content: {
    width: '100%',
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 30,
  },
  titleHighlight: {
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  instructionsBox: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  instructionsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: BRAND_COLORS.primary,
    marginBottom: 6,
  },
  instructionsText: {
    fontSize: 12,
    color: BRAND_COLORS.black,
    lineHeight: 17,
    marginBottom: 8,
  },
  questionCard: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 12,
    lineHeight: 21,
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: `${BRAND_COLORS.primary}10`,
    borderColor: BRAND_COLORS.primary,
  },
  optionText: {
    fontSize: 13,
    color: '#666',
    flex: 1,
    lineHeight: 19,
  },
  selectedOptionText: {
    color: BRAND_COLORS.black,
    fontWeight: '600',
  },
  selectedIndicator: {
    backgroundColor: BRAND_COLORS.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
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