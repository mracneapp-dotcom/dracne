// Test3Screen.js - Updated with Test1/Test2 Logic Integration
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

export const Test3Screen = ({ 
  onBack,
  onContinue, // Changed from onTestComplete to match Test1Screen
  analysisData = null, // AI analysis data from photo capture
  style = {} 
}) => {
  const [currentScreen, setCurrentScreen] = useState('instructions'); // 'instructions' or 'questions'
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const questions = [
    {
      id: 'morning_feel',
      question: 'How does your skin feel when you wake up in the morning (before washing)?',
      options: [
        { id: 'very_oily', text: 'Very oily and greasy all over', points: 4 },
        { id: 'oily_tzone', text: 'Oily in T-zone, normal elsewhere', points: 3 },
        { id: 'balanced', text: 'Comfortable and balanced', points: 2 },
        { id: 'tight_dry', text: 'Tight, dry, or flaky', points: 1 }
      ]
    },
    {
      id: 'morning_appearance',
      question: 'How does your skin look in the mirror first thing in the morning?',
      options: [
        { id: 'shiny_oily', text: 'Shiny and oily throughout', points: 4 },
        { id: 'shiny_tzone', text: 'Shiny T-zone, normal cheeks', points: 3 },
        { id: 'fresh_even', text: 'Fresh and even-toned', points: 2 },
        { id: 'dull_tight', text: 'Dull, tight, or showing fine lines', points: 1 }
      ]
    }
  ];

  const handleAnswerSelect = (questionId, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option
    });
  };

  const handleContinue = () => {
    if (Object.keys(selectedAnswers).length === questions.length) {
      // Calculate total points for analysis
      const totalPoints = Object.values(selectedAnswers).reduce((sum, answer) => sum + answer.points, 0);
      
      // Create comprehensive test result object matching Test1Screen and Test2Screen structure
      const testResult = {
        testName: 'Overnight Assessment',
        testType: 'overnight_evaluation',
        completedAt: new Date().toISOString(),
        totalPoints: totalPoints,
        maxPoints: questions.length * 4, // Maximum possible points
        answers: selectedAnswers,
        questions: questions,
        metadata: {
          questionsCount: questions.length,
          answeredCount: Object.keys(selectedAnswers).length,
          averageScore: totalPoints / questions.length,
          testDescription: 'Natural oil production assessment after overnight sleep'
        }
      };
      
      // Check if onContinue function exists before calling (same as Test1Screen and Test2Screen)
      if (onContinue && typeof onContinue === 'function') {
        onContinue(testResult, analysisData);
      } else {
        console.error('onContinue function not provided to Test3Screen');
      }
    }
  };

  const isTestComplete = () => {
    return Object.keys(selectedAnswers).length === questions.length;
  };

  const getQuestionsButtonTitle = () => {
    const answered = Object.keys(selectedAnswers).length;
    const total = questions.length;
    
    if (answered === 0) return "Answer questions to continue";
    if (answered < total) return `Continue (${answered}/${total} answered)`;
    return "Reveal My Skin Type"; // Changed to match Test1Screen and Test2Screen
  };

  // Instructions Screen - KEPT EXACTLY THE SAME
  const renderInstructionsScreen = () => (
    <View style={styles.instructionsScreenContainer}>
      <Text style={styles.mainTitle}>Overnight Assessment</Text>
      <Text style={styles.subtitle}>Check how your skin behaves while you sleep</Text>

      <View style={styles.centeredInstructionsBox}>
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
          onPress={() => setCurrentScreen('questions')}
          style={styles.continueButton}
        />
      </View>
    </View>
  );

  // Questions Screen - UPDATED with consistent button logic
  const renderQuestionsScreen = () => (
    <View style={styles.questionsScreenContainer}>
      <Text style={styles.mainTitle}>Morning Assessment</Text>
      <Text style={styles.subtitle}>Based on your overnight test, answer these questions</Text>

      <View style={styles.questionsContainer}>
        {questions.map((question) => (
          <View key={question.id} style={styles.questionCard}>
            <Text style={styles.questionText}>{question.question}</Text>
            
            <View style={styles.optionsContainer}>
              {question.options.map((option) => {
                const isSelected = selectedAnswers[question.id]?.id === option.id;
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionButton,
                      isSelected && styles.selectedOption
                    ]}
                    onPress={() => handleAnswerSelect(question.id, option)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.optionText,
                      isSelected && styles.selectedOptionText
                    ]}>
                      {option.text}
                    </Text>
                    {isSelected && (
                      <View style={styles.selectedIndicator}>
                        <Text style={styles.checkmark}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <DrAcneButton
          title={isTestComplete() ? "Reveal My Skin Type" : `Answer all questions (${Object.keys(selectedAnswers).length}/${questions.length})`}
          onPress={handleContinue}
          disabled={!isTestComplete()}
          style={styles.completeButton}
        />
      </View>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        {currentScreen === 'instructions' && renderInstructionsScreen()}
        {currentScreen === 'questions' && renderQuestionsScreen()}
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
  },
  // Instructions Screen Styles - KEPT EXACTLY THE SAME
  instructionsScreenContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  centeredInstructionsBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
  },
  // Questions Screen Styles
  questionsScreenContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  questionsContainer: {
    flex: 1,
    gap: 12,
    marginBottom: 20,
    paddingBottom: 15,
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
    marginBottom: 12,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BRAND_COLORS.black,
    marginBottom: 8,
    textAlign: 'center',
  },
  instructionsText: {
    fontSize: 14,
    color: BRAND_COLORS.black,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  questionCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 10,
  },
  optionsContainer: {
    gap: 6,
  },
  optionButton: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#E8F5E9',
  },
  optionText: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    flex: 1,
  },
  selectedOptionText: {
    color: BRAND_COLORS.black,
    fontWeight: '500',
  },
  selectedIndicator: {
    backgroundColor: BRAND_COLORS.primary,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingVertical: 12,
  },
  continueButton: {
    paddingVertical: 14,
  },
  completeButton: {
    paddingVertical: 14,
  },
});