// Test2Screen.js - Optimized with Fast Image Loading
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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

export const Test2Screen = ({ 
  onBack,
  onContinue,
  analysisData = null,
  style = {} 
}) => {
  const [currentScreen, setCurrentScreen] = useState('instructions');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  // Preload image when component mounts
  useEffect(() => {
    const preloadImage = () => {
      const image = Image.resolveAssetSource(require('../assets/images/BlottingPapper.png'));
      Image.prefetch(image.uri)
        .then(() => {
          setImageLoaded(true);
          setShowPlaceholder(false);
        })
        .catch(() => {
          setImageLoaded(true); // Still hide placeholder even if preload fails
          setShowPlaceholder(false);
        });
    };

    // Small delay to prevent blocking UI
    const timer = setTimeout(preloadImage, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const questions = [
    {
      id: 'tzone_results',
      question: 'What does the blotting paper show in your T-zone (forehead, nose, chin)?',
      options: [
        { id: 'very_oily', text: 'Very oily - paper is soaked/transparent', points: 4 },
        { id: 'moderately_oily', text: 'Moderately oily - clear oil spots', points: 3 },
        { id: 'slight_oil', text: 'Slight oil - barely visible marks', points: 2 },
        { id: 'no_oil', text: 'No oil - paper stays dry', points: 1 }
      ]
    },
    {
      id: 'cheeks_results',
      question: 'What does the blotting paper show on your cheeks?',
      options: [
        { id: 'oily', text: 'Oily - clear oil absorption', points: 4 },
        { id: 'some_oil', text: 'Some oil - light marks visible', points: 3 },
        { id: 'very_little', text: 'Very little oil - faint marks', points: 2 },
        { id: 'no_oil', text: 'No oil - completely dry', points: 1 }
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
      const totalPoints = Object.values(selectedAnswers).reduce((sum, answer) => sum + answer.points, 0);
      
      const testResult = {
        testName: 'Blotting Paper Test',
        testType: 'oil_absorption',
        completedAt: new Date().toISOString(),
        totalPoints: totalPoints,
        maxPoints: questions.length * 4,
        answers: selectedAnswers,
        questions: questions,
        metadata: {
          questionsCount: questions.length,
          answeredCount: Object.keys(selectedAnswers).length,
          averageScore: totalPoints / questions.length,
          testDescription: 'Oil absorption analysis using blotting paper method'
        }
      };
      
      if (onContinue && typeof onContinue === 'function') {
        onContinue(testResult, analysisData);
      } else {
        console.error('onContinue function not provided to Test2Screen');
      }
    }
  };

  const isTestComplete = () => {
    return Object.keys(selectedAnswers).length === questions.length;
  };

  // OPTIMIZED: Simple loader placeholder 
  const renderImagePlaceholder = () => (
    <View style={styles.imagePlaceholderContainer}>
      <ActivityIndicator 
        size="large" 
        color={BRAND_COLORS.primary} 
      />
    </View>
  );

  // OPTIMIZED: Image with instant fallback
  const renderOptimizedImage = () => {
    if (showPlaceholder) {
      return renderImagePlaceholder();
    }

    return (
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/images/BlottingPapper.png')} 
          style={styles.blottingPaperImage}
          resizeMode="contain"
          fadeDuration={0}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            console.warn('BlottingPapper image failed to load');
            setImageLoaded(true);
          }}
        />
        {!imageLoaded && (
          <View style={styles.imageOverlay}>
            <ActivityIndicator size="small" color={BRAND_COLORS.primary} />
          </View>
        )}
      </View>
    );
  };

  // Instructions Screen
  const renderInstructionsScreen = () => (
    <View style={styles.instructionsScreenContainer}>
      <Text style={styles.mainTitle}>Blotting Paper Test</Text>
      <Text style={styles.subtitle}>Use blotting paper to determine your skin's oil production</Text>

      {/* OPTIMIZED: Fast loading image with placeholder */}
      {renderOptimizedImage()}

      <View style={styles.instructionsBox}>
        <Text style={styles.instructionsTitle}>What is blotting paper?</Text>
        <Text style={styles.instructionsText}>
          Thin, absorbent paper sheets that soak up oil from your skin. You can find them at drugstores, beauty stores, or use clean tissue paper as an alternative.
        </Text>
        
        <Text style={styles.instructionsTitle}>How to do this test:</Text>
        <Text style={styles.instructionsText}>
          1. Start with clean skin (wash your face){'\n'}
          2. Wait 1-2 hours without applying products{'\n'}
          3. Gently press blotting paper on different areas{'\n'}
          4. Hold the paper up to light to see oil absorption{'\n\n'}
          Complete these steps, then come back to record your results!
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <DrAcneButton
          title="Record My Results"
          onPress={() => setCurrentScreen('questions')}
          style={styles.continueButton}
        />
      </View>
    </View>
  );

  // Questions Screen
  const renderQuestionsScreen = () => (
    <View style={styles.questionsScreenContainer}>
      <Text style={styles.mainTitle}>Record Your Results</Text>
      <Text style={styles.subtitle}>Based on your blotting paper test, answer these questions</Text>

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
  // Instructions Screen Styles
  instructionsScreenContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  // OPTIMIZED: Image optimization styles
  imageContainer: {
    alignSelf: 'center',
    marginVertical: 12,
    position: 'relative',
  },
  blottingPaperImage: {
    width: 140,
    height: 160,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  // OPTIMIZED: Simple placeholder styles
  imagePlaceholderContainer: {
    width: 140,
    height: 160,
    alignSelf: 'center',
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionsBox: {
    backgroundColor: '#E6E6E6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  // Questions Screen Styles  
  questionsScreenContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
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
    fontSize: 14,
    fontWeight: 'bold',
    color: BRAND_COLORS.black,
    marginBottom: 6,
  },
  instructionsText: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    lineHeight: 16,
    marginBottom: 10,
  },
  questionsContainer: {
    flex: 1,
    gap: 12,
    marginBottom: 20,
    paddingBottom: 15,
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