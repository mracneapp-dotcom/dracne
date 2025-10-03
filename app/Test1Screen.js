// app/Test1Screen.js - End-of-Day Check with Results Integration (No Emoji)
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

export const Test1Screen = ({ 
  onBack, 
  onContinue,
  analysisData = null, // AI analysis data from photo capture
  style = {} 
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const questions = [
    {
      id: 'oiliness',
      question: 'How does your skin feel right now?',
      options: [
        { id: 'very_oily', text: 'Very oily and shiny', points: 4 },
        { id: 'slightly_oily', text: 'Slightly oily', points: 3 },
        { id: 'balanced', text: 'Comfortable and balanced', points: 2 },
        { id: 'tight', text: 'Tight and dry', points: 1 }
      ]
    },
    {
      id: 'appearance',
      question: 'How does your skin look?',
      options: [
        { id: 'very_shiny', text: 'Very shiny, especially T-zone', points: 4 },
        { id: 'some_shine', text: 'Some shine on forehead/nose', points: 3 },
        { id: 'matte', text: 'Matte and even', points: 2 },
        { id: 'dull_flaky', text: 'Dull or flaky patches', points: 1 }
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
      
      // Create comprehensive test result object for SkinTypeResultsScreen
      const testResult = {
        testName: 'End-of-Day Check',
        testType: 'sebum_production',
        completedAt: new Date().toISOString(),
        totalPoints: totalPoints,
        maxPoints: questions.length * 4, // Maximum possible points
        answers: selectedAnswers,
        questions: questions,
        metadata: {
          questionsCount: questions.length,
          answeredCount: Object.keys(selectedAnswers).length,
          averageScore: totalPoints / questions.length,
        }
      };
      
      // Check if onContinue function exists before calling
      if (onContinue && typeof onContinue === 'function') {
        onContinue(testResult, analysisData);
      } else {
        console.error('onContinue function not provided to Test1Screen');
      }
    }
  };

  const allQuestionsAnswered = Object.keys(selectedAnswers).length === questions.length;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <Text style={styles.title}>End-of-Day Check</Text>
        <Text style={styles.subtitle}>Check your skin 2-3 hours after cleansing</Text>

        <View style={styles.instructionsBox}>
          <Text style={styles.instructionsTitle}>How it works:</Text>
          <Text style={styles.instructionsText}>
            Cleanse your face normally, wait 2-3 hours without applying any products, then answer these questions.
          </Text>
        </View>

        <View style={styles.questionsContainer}>
          {questions.map((question, questionIndex) => (
            <View key={question.id} style={styles.questionCard}>
              <Text style={styles.questionText}>{question.question}</Text>
              
              <View style={styles.optionsContainer}>
                {question.options.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionButton,
                      selectedAnswers[question.id]?.id === option.id && styles.selectedOption
                    ]}
                    onPress={() => handleAnswerSelect(question.id, option)}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedAnswers[question.id]?.id === option.id && styles.selectedOptionText
                    ]}>
                      {option.text}
                    </Text>
                    {selectedAnswers[question.id]?.id === option.id && (
                      <View style={styles.selectedIndicator}>
                        <Text style={styles.checkmark}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <DrAcneButton
            title={allQuestionsAnswered ? "Reveal My Skin Type" : `Answer all questions (${Object.keys(selectedAnswers).length}/${questions.length})`}
            onPress={handleContinue}
            disabled={!allQuestionsAnswered}
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
  title: {
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
  instructionsBox: {
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  instructionsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 5,
  },
  instructionsText: {
    fontSize: 12,
    color: BRAND_COLORS.black,
    lineHeight: 16,
  },
  questionsContainer: {
    flex: 1,
    gap: 12,
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
});