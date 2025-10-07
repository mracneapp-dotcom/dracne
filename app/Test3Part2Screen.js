// app/Test3Part2Screen.js - Overnight Assessment Part 2 (Properly Centered)
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

export const Test3Part2Screen = ({ 
  onBack, 
  onContinue,
  onNavigateHome,
  firstAnswer,
  analysisData = null,
  style = {} 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const question = {
    id: 'morning_appearance',
    question: 'How does your skin look in the mirror first thing in the morning?',
    options: [
      { id: 'shiny_oily', text: 'Shiny and oily throughout', points: 4 },
      { id: 'shiny_tzone', text: 'Shiny T-zone, normal cheeks', points: 3 },
      { id: 'fresh_even', text: 'Fresh and even-toned', points: 2 },
      { id: 'dull_tight', text: 'Dull, tight, or showing fine lines', points: 1 }
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
      const totalPoints = firstAnswer.points + selectedAnswer.points;
      
      const testResult = {
        testName: 'Overnight Assessment',
        testType: 'overnight_evaluation',
        completedAt: new Date().toISOString(),
        totalPoints: totalPoints,
        maxPoints: 8,
        answers: {
          morning_feel: firstAnswer,
          morning_appearance: selectedAnswer
        },
        metadata: {
          questionsCount: 2,
          answeredCount: 2,
          averageScore: totalPoints / 2,
          testDescription: 'Natural oil production assessment after overnight sleep'
        }
      };
      
      onContinue(testResult, analysisData);
    }
  };

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

      <View style={styles.centerWrapper}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              Morning <Text style={styles.titleHighlight}>Assessment</Text>
            </Text>
            <Text style={styles.subtitle}>Question 2 of 2</Text>
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
              title={selectedAnswer ? "Reveal My Skin Type (2/2)" : "Answer question (1/2)"}
              onPress={handleContinue}
              disabled={!selectedAnswer}
              style={styles.continueButton}
            />
          </View>
        </View>
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