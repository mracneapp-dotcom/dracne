// app/Test2Part2Screen.js - UPDATED WITH i18n
import React, { useState } from 'react';
import {
  Image,
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
  lightGray: '#F5F5F5',
  gray: '#999999',
};

export const Test2Part2Screen = ({ 
  onBack, 
  onContinue,
  onNavigateHome,
  firstAnswer,
  analysisData = null,
  style = {} 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const question = {
    id: 'cheeks_results',
    question: t('test2Part2.question'),
    options: [
      { id: 'oily', text: t('test2Part2.option_1'), points: 4 },
      { id: 'some_oil', text: t('test2Part2.option_2'), points: 3 },
      { id: 'very_little', text: t('test2Part2.option_3'), points: 2 },
      { id: 'no_oil', text: t('test2Part2.option_4'), points: 1 }
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
        testName: 'Blotting Paper Test',
        testType: 'oil_absorption',
        completedAt: new Date().toISOString(),
        totalPoints: totalPoints,
        maxPoints: 8,
        answers: {
          tzone_results: firstAnswer,
          cheeks_results: selectedAnswer
        },
        metadata: {
          questionsCount: 2,
          answeredCount: 2,
          averageScore: totalPoints / 2,
          testDescription: 'Oil absorption analysis using blotting paper method'
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

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {t('test2Part2.title')} <Text style={styles.titleHighlight}>{t('test2Part2.title_highlight')}</Text>
            </Text>
            <Text style={styles.subtitle}>{t('test2Part2.subtitle')}</Text>
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
              title={selectedAnswer ? t('test2Part2.button_reveal') : t('test2Part2.button_answer')}
              onPress={handleContinue}
              disabled={!selectedAnswer}
              style={styles.continueButton}
            />
          </View>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingBottom: 140,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 32,
  },
  titleHighlight: {
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  questionCard: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 14,
    lineHeight: 22,
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 14,
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
    fontSize: 14,
    color: '#666',
    flex: 1,
    lineHeight: 20,
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
    paddingVertical: 16,
  },
  continueButton: {
    paddingVertical: 16,
  },
});