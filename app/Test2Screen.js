// app/Test2Screen.js - Blotting Paper Test Part 1 (SINGLE SCREEN FIT) - UPDATED WITH i18n
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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

export const Test2Screen = ({ 
  onBack,
  onContinue,
  onNavigateHome,
  analysisData = null,
  style = {} 
}) => {
  const [currentScreen, setCurrentScreen] = useState('instructions');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => {
    const preloadImage = () => {
      const image = Image.resolveAssetSource(require('../assets/images/BlottingPapper.png'));
      Image.prefetch(image.uri)
        .then(() => {
          setImageLoaded(true);
          setShowPlaceholder(false);
        })
        .catch(() => {
          setImageLoaded(true);
          setShowPlaceholder(false);
        });
    };

    const timer = setTimeout(preloadImage, 100);
    return () => clearTimeout(timer);
  }, []);

  const question = {
    id: 'tzone_results',
    question: t('test2.question'),
    options: [
      { id: 'very_oily', text: t('test2.option_1'), points: 4 },
      { id: 'moderately_oily', text: t('test2.option_2'), points: 3 },
      { id: 'slight_oil', text: t('test2.option_3'), points: 2 },
      { id: 'no_oil', text: t('test2.option_4'), points: 1 }
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

  const renderImagePlaceholder = () => (
    <View style={styles.imagePlaceholderContainer}>
      <ActivityIndicator size="large" color={BRAND_COLORS.primary} />
    </View>
  );

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
          onError={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <View style={styles.imageOverlay}>
            <ActivityIndicator size="small" color={BRAND_COLORS.primary} />
          </View>
        )}
      </View>
    );
  };

  const renderInstructionsScreen = () => (
    <View style={styles.contentWrapper}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {t('test2.title')} <Text style={styles.titleHighlight}>{t('test2.title_highlight')}</Text>
          </Text>
          <Text style={styles.subtitle}>
            {t('test2.subtitle')}
          </Text>
        </View>

        {renderOptimizedImage()}

        <View style={styles.instructionsBox}>
          <Text style={styles.instructionsTitle}>{t('test2.what_is_title')}</Text>
          <Text style={styles.instructionsText}>
            {t('test2.what_is_text')}
          </Text>
          
          <Text style={styles.instructionsTitle}>{t('test2.how_to_title')}</Text>
          <Text style={styles.instructionsText}>
            {t('test2.how_to_text')}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <DrAcneButton
            title={t('test2.button_record')}
            onPress={() => setCurrentScreen('question')}
            style={styles.continueButton}
          />
        </View>
      </View>
    </View>
  );

  const renderQuestionScreen = () => (
    <ScrollView 
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      bounces={true}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {t('test2.question_title')} <Text style={styles.titleHighlight}>{t('test2.question_title_highlight')}</Text>
          </Text>
          <Text style={styles.subtitle}>{t('test2.question_subtitle')}</Text>
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
            title={selectedAnswer ? t('test2.button_next') : t('test2.button_answer')}
            onPress={handleContinue}
            disabled={!selectedAnswer}
            style={styles.continueButton}
          />
        </View>
      </View>
    </ScrollView>
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
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 140,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 4,
    backgroundColor: 'transparent',
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
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
  imageContainer: {
    alignSelf: 'center',
    marginVertical: 10,
    position: 'relative',
  },
  blottingPaperImage: {
    width: 110,
    height: 130,
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
  imagePlaceholderContainer: {
    width: 110,
    height: 130,
    alignSelf: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingVertical: 12,
  },
  continueButton: {
    paddingVertical: 14,
  },
});