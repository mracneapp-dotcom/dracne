// app/index.js - Complete with Product Selection Screens
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Image,
  PanResponder,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AnalysisResults } from '../components/analysis/AnalysisResults';
import { PhotoCapture } from '../components/camera/PhotoCapture';
import { BottomNavigation } from '../components/ui/BottomNavigation';
import { DrAcneButton } from '../components/ui/DrAcneButton';
import { FeatureCards } from '../components/ui/FeatureCards';
import { ProgressBar } from '../components/ui/ProgressBar';
import { analyzeImageWithRoboflow, analyzeImageWithRoboflowVisual, handleAPIError } from '../services/RoboflowAPI';
import BasicRoutineProductSelection from './BasicRoutineProductSelection';
import BasicRoutineStep2Moisturizer from './BasicRoutineStep2Moisturizer';
import BasicRoutineStep3Sunscreen from './BasicRoutineStep3Sunscreen';
import DayRoutineScreen from './DayRoutineScreen';
import { HomeScreen } from './HomeScreen';
import { KnownSkinTypeScreen } from './KnownSkinTypeScreen';
import NightRoutineScreen from './NightRoutineScreen';
import { SkinTestScreen } from './SkinTestScreen';
import { SkinTypeResultsScreen } from './SkinTypeResultsScreen';
import { Test1Part2Screen } from './Test1Part2Screen';
import { Test1Screen } from './Test1Screen';
import { Test2Part2Screen } from './Test2Part2Screen';
import { Test2Screen } from './Test2Screen';
import { Test3Part2Screen } from './Test3Part2Screen';
import { Test3Screen } from './Test3Screen';

// Onboarding Screens - Import Order Matches Flow
import OnboardingBarrierHealth1 from './onboardingScreens/OnboardingBarrierHealth1';
import OnboardingBarrierHealth2 from './onboardingScreens/OnboardingBarrierHealth2';
import OnboardingComparison from './onboardingScreens/OnboardingComparison';
import OnboardingConsistency from './onboardingScreens/OnboardingConsistency';
import OnboardingDiscovery from './onboardingScreens/OnboardingDiscovery';
import OnboardingExperience from './onboardingScreens/OnboardingExperience';
import OnboardingGenerating from './onboardingScreens/OnboardingGenerating';
import OnboardingGoals from './onboardingScreens/OnboardingGoals';
import OnboardingPaywall from './onboardingScreens/OnboardingPaywall';
import OnboardingPlanReady from './onboardingScreens/OnboardingPlanReady';
import OnboardingPrivacy from './onboardingScreens/OnboardingPrivacy';
import OnboardingRating from './onboardingScreens/OnboardingRating';
import OnboardingReady from './onboardingScreens/OnboardingReady';
import OnboardingReminders from './onboardingScreens/OnboardingReminders';
import OnboardingResultsTimeline from './onboardingScreens/OnboardingResultsTimeline';
import OnboardingRoutine from './onboardingScreens/OnboardingRoutine';
import OnboardingSaveProgress from './onboardingScreens/OnboardingSaveProgress';
import OnboardingSkinType from './onboardingScreens/OnboardingSkinType';
import OnboardingStruggle from './onboardingScreens/OnboardingStruggle';
import OnboardingTimeline from './onboardingScreens/OnboardingTimeline';
import OnboardingWelcome from './onboardingScreens/OnboardingWelcome';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
};

export default function AIScannerScreen() {
  // Onboarding State
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState('onboardingWelcome');
  const [onboardingData, setOnboardingData] = useState({});

  // Existing App State
  const [currentStep, setCurrentStep] = useState('capture');
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [annotatedImageBlob, setAnnotatedImageBlob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('routines');
  const [analysisSteps, setAnalysisSteps] = useState([
    { name: 'Processing image', active: false },
    { name: 'Detecting acne spots', active: false },
    { name: 'Generating results', active: false },
    { name: 'Analysis complete', active: false },
  ]);
  const [skinProfile, setSkinProfile] = useState({});
  const [selectedSkinType, setSelectedSkinType] = useState(null);
  const [test1Results, setTest1Results] = useState(null);
  const [test1Part1Answer, setTest1Part1Answer] = useState(null);
  const [test2Results, setTest2Results] = useState(null);
  const [test2Part1Answer, setTest2Part1Answer] = useState(null);
  const [test3Results, setTest3Results] = useState(null);
  const [test3Part1Answer, setTest3Part1Answer] = useState(null);
  const [currentTestResult, setCurrentTestResult] = useState(null);
  const [manualSkinTypeSelection, setManualSkinTypeSelection] = useState(null);
  
  // 🆕 Product Selection State
  const [selectedProducts, setSelectedProducts] = useState({
    cleanser: null,
    moisturizer: null,
    sunscreen: null,
  });
  
  // Home Screen State
  const [userStreak, setUserStreak] = useState(5);
  const [lastActiveDate, setLastActiveDate] = useState(new Date().toDateString());
  const [weeklyActivity, setWeeklyActivity] = useState([
    { day: 'Mon', date: 5, active: true },
    { day: 'Tue', date: 6, active: true },
    { day: 'Wed', date: 7, active: true },
    { day: 'Thu', date: 8, active: true },
    { day: 'Fri', date: 9, active: true },
    { day: 'Sat', date: 10, active: false },
    { day: 'Sun', date: 11, active: false },
  ]);

  // Onboarding Navigation Handler
  const handleOnboardingNext = (nextStep, data = {}) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
    
    if (nextStep === 'complete') {
      setIsOnboardingComplete(true);
      setCurrentStep('home');
    } else {
      setCurrentOnboardingStep(nextStep);
    }
  };

  // ✓ CORRECT Onboarding Back Navigation Handler - Follows Exact Flow
  const handleOnboardingBack = () => {
    if (currentOnboardingStep === 'onboardingWelcome') {
      return;
    } else if (currentOnboardingStep === 'onboardingDiscovery') {
      setCurrentOnboardingStep('onboardingWelcome');
    } else if (currentOnboardingStep === 'onboardingExperience') {
      setCurrentOnboardingStep('onboardingDiscovery');
    } else if (currentOnboardingStep === 'onboardingStruggle') {
      setCurrentOnboardingStep('onboardingExperience');
    } else if (currentOnboardingStep === 'onboardingBarrierHealth1') {
      setCurrentOnboardingStep('onboardingStruggle');
    } else if (currentOnboardingStep === 'onboardingBarrierHealth2') {
      setCurrentOnboardingStep('onboardingBarrierHealth1');
    } else if (currentOnboardingStep === 'onboardingSkinType') {
      setCurrentOnboardingStep('onboardingBarrierHealth2');
    } else if (currentOnboardingStep === 'onboardingRoutine') {
      setCurrentOnboardingStep('onboardingSkinType');
    } else if (currentOnboardingStep === 'onboardingGoals') {
      setCurrentOnboardingStep('onboardingRoutine');
    } else if (currentOnboardingStep === 'onboardingTimeline') {
      setCurrentOnboardingStep('onboardingGoals');
    } else if (currentOnboardingStep === 'onboardingResultsTimeline') {
      setCurrentOnboardingStep('onboardingTimeline');
    } else if (currentOnboardingStep === 'onboardingConsistency') {
      setCurrentOnboardingStep('onboardingResultsTimeline');
    } else if (currentOnboardingStep === 'onboardingComparison') {
      setCurrentOnboardingStep('onboardingConsistency');
    } else if (currentOnboardingStep === 'onboardingReady') {
      setCurrentOnboardingStep('onboardingComparison');
    } else if (currentOnboardingStep === 'onboardingPrivacy') {
      setCurrentOnboardingStep('onboardingReady');
    } else if (currentOnboardingStep === 'onboardingGenerating') {
      setCurrentOnboardingStep('onboardingPrivacy');
    } else if (currentOnboardingStep === 'onboardingPlanReady') {
      setCurrentOnboardingStep('onboardingGenerating');
    } else if (currentOnboardingStep === 'onboardingReminders') {
      setCurrentOnboardingStep('onboardingPlanReady');
    } else if (currentOnboardingStep === 'onboardingRating') {
      setCurrentOnboardingStep('onboardingReminders');
    } else if (currentOnboardingStep === 'onboardingSaveProgress') {
      setCurrentOnboardingStep('onboardingRating');
    } else if (currentOnboardingStep === 'onboardingPaywall') {
      setCurrentOnboardingStep('onboardingSaveProgress');
    }
  };

  // ✓ CORRECT Progress Bar: 4.7% to 100% across 21 screens (4.76% per step)
  const getProgressPercentage = () => {
    const stepProgress = {
      'onboardingWelcome': 4.7,
      'onboardingDiscovery': 9.5,
      'onboardingExperience': 14.2,
      'onboardingStruggle': 19.0,
      'onboardingBarrierHealth1': 23.8,
      'onboardingBarrierHealth2': 28.5,
      'onboardingSkinType': 33.3,
      'onboardingRoutine': 38.1,
      'onboardingGoals': 42.8,
      'onboardingTimeline': 47.6,
      'onboardingResultsTimeline': 52.4,
      'onboardingConsistency': 57.1,
      'onboardingComparison': 61.9,
      'onboardingReady': 66.6,
      'onboardingPrivacy': 71.4,
      'onboardingGenerating': 76.2,
      'onboardingPlanReady': 81.0,
      'onboardingReminders': 85.7,
      'onboardingRating': 90.5,
      'onboardingSaveProgress': 95.2,
      'onboardingPaywall': 100.0,
      'home': 0,
      'dayRoutine': 0,
      'nightRoutine': 0,
      'basicRoutineStep1': 0,
      'basicRoutineStep2': 0,
      'basicRoutineStep3': 0,
      'capture': 0,
      'analyzing': 0,
      'results': 0,
      'skinTest': 0,
      'test1': 0,
      'test1Part2': 0,
      'test2': 0,
      'test2Part2': 0,
      'test3': 0,
      'test3Part2': 0,
      'skinTypeResults': 0,
      'knownSkinType': 0,
      'routine': 0
    };
    return stepProgress[isOnboardingComplete ? currentStep : currentOnboardingStep] || 0;
  };

  const handleProgressBarBack = () => {
    if (currentStep === 'capture') {
      setCurrentStep('home');
    } else if (currentStep === 'analyzing') {
      return;
    } else if (currentStep === 'results') {
      setCurrentStep('capture');
    } else if (currentStep === 'dayRoutine') {
      setCurrentStep('home');
    } else if (currentStep === 'nightRoutine') {
      setCurrentStep('home');
    } else if (currentStep === 'basicRoutineStep1') {
      setCurrentStep('dayRoutine');
    } else if (currentStep === 'basicRoutineStep2') {
      setCurrentStep('basicRoutineStep1');
    } else if (currentStep === 'basicRoutineStep3') {
      setCurrentStep('basicRoutineStep2');
    } else if (currentStep === 'skinTest') {
      setCurrentStep('results');
    } else if (currentStep === 'test1') {
      setCurrentStep('skinTest');
    } else if (currentStep === 'test1Part2') {
      setCurrentStep('test1');
    } else if (currentStep === 'test2') {
      setCurrentStep('skinTest');
    } else if (currentStep === 'test2Part2') {
      setCurrentStep('test2');
    } else if (currentStep === 'test3') {
      setCurrentStep('skinTest');
    } else if (currentStep === 'test3Part2') {
      setCurrentStep('test3');
    } else if (currentStep === 'skinTypeResults') {
      if (test1Results) {
        setCurrentStep('test1Part2');
      } else if (test2Results) {
        setCurrentStep('test2Part2');
      } else if (test3Results) {
        setCurrentStep('test3Part2');
      } else {
        setCurrentStep('skinTest');
      }
    } else if (currentStep === 'knownSkinType') {
      if (test1Results || test2Results || test3Results) {
        setCurrentStep('skinTypeResults');
      } else {
        setCurrentStep('skinTest');
      }
    }
  };

  const updateUserStreak = () => {
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();
    
    if (lastActiveDate === today) {
      return;
    } else if (lastActiveDate === yesterdayString) {
      setUserStreak(prev => prev + 1);
      setLastActiveDate(today);
    } else {
      setUserStreak(1);
      setLastActiveDate(today);
    }
  };

  const handleNavigateToSkinTest = () => {
    setCurrentStep('skinTest');
  };

  const handleNavigateToDayRoutine = () => {
    console.log('Navigate to Day Routine');
    setCurrentStep('dayRoutine');
  };

  const handleNavigateToNightRoutine = () => {
    console.log('Navigate to Night Routine');
    setCurrentStep('nightRoutine');
  };

  const handleNavigateToScanSkin = () => {
    setCurrentStep('capture');
  };

  const handleNavigateToMyJourney = () => {
    console.log('Navigate to My Journey');
    Alert.alert('Coming Soon', 'My Journey feature will be available soon!');
  };

  const handleNavigateHomeFromCapture = () => {
    setCurrentStep('home');
  };

  // 🆕 Product Selection Handlers
  const handleRoutineSelection = (level, timeOfDay, routineData) => {
    console.log(`Selected ${level} ${timeOfDay} routine:`, routineData);
    
    // Navigate to product selection flow
    if (level === 'basic') {
      setCurrentStep('basicRoutineStep1');
    } else {
      // For moderate and comprehensive, we'll add those later
      Alert.alert(
        'Coming Soon',
        `${level.charAt(0).toUpperCase() + level.slice(1)} routine product selection will be available soon!`,
        [{ text: 'OK', onPress: () => setCurrentStep('home') }]
      );
    }
  };

  const handleCleanserSelected = (product) => {
    console.log('Cleanser selected:', product);
    setSelectedProducts(prev => ({ ...prev, cleanser: product }));
    setCurrentStep('basicRoutineStep2');
  };

  const handleMoisturizerSelected = (product) => {
    console.log('Moisturizer selected:', product);
    setSelectedProducts(prev => ({ ...prev, moisturizer: product }));
    setCurrentStep('basicRoutineStep3');
  };

  const handleSunscreenSelected = (product) => {
    console.log('Sunscreen selected:', product);
    setSelectedProducts(prev => ({ ...prev, sunscreen: product }));
    
    // Show success message with all selected products
    Alert.alert(
      '🎉 Routine Complete!',
      `Your Basic Morning Routine:\n\n` +
      `1️⃣ Cleanser: ${selectedProducts.cleanser?.name}\n` +
      `2️⃣ Moisturizer: ${selectedProducts.moisturizer?.name}\n` +
      `3️⃣ Sunscreen: ${product.name}\n\n` +
      `Your personalized routine has been saved!`,
      [{ 
        text: 'View Routine', 
        onPress: () => {
          // TODO: Navigate to a routine summary screen
          setCurrentStep('home');
        }
      }]
    );
  };

  useEffect(() => {
    updateUserStreak();
    
    const backAction = () => {
      if (currentStep === 'analyzing') {
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [currentStep]);

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 20 && currentStep !== 'analyzing';
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dx } = gestureState;
        if (dx > 50) {
          handleSwipeBack();
        } else if (dx < -50) {
          handleSwipeForward();
        }
      },
    })
  ).current;

  const handleSwipeBack = () => {
    if (isOnboardingComplete) {
      handleProgressBarBack();
    }
  };

  const handleSwipeForward = () => {
    if (isOnboardingComplete) {
      if (currentStep === 'home') {
        setCurrentStep('capture');
      } else if (currentStep === 'capture' && selectedImageUri) {
        startAnalysis(selectedImageUri);
      }
    }
  };

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'upload') {
      setCurrentStep('capture');
    } else if (tabId === 'routines') {
      setCurrentStep('home');
    } else {
      Alert.alert('Coming Soon', `${tabId} feature will be available soon!`);
    }
  };

  const handlePhotoSelected = (imageUri) => {
    console.log('Photo selected:', imageUri);
    setSelectedImageUri(imageUri);
    setTimeout(() => {
      startAnalysis(imageUri);
    }, 1500);
  };

  const startAnalysis = async (imageUri) => {
    console.log('Starting OPTIMIZED analysis for:', imageUri);
    const analysisStartTime = Date.now();
    
    setCurrentStep('analyzing');
    setIsLoading(true);
    animateAnalysisSteps();

    try {
      console.log('Calling JSON API...');
      const analysisResult = await analyzeImageWithRoboflow(imageUri);
      console.log('JSON API result:', {
        success: analysisResult.success,
        detections: analysisResult.total_found,
        processingTime: analysisResult.processing_time
      });
      
      if (!analysisResult.success) {
        throw new Error('Analysis failed');
      }

      setAnalysisData(analysisResult);
      
      if (analysisResult.predictions && analysisResult.predictions.length > 0) {
        console.log('Starting visual API call...');
        const visualStartTime = Date.now();
        
        try {
          const dataUri = await analyzeImageWithRoboflowVisual(imageUri);
          console.log(`Visual API completed in ${Date.now() - visualStartTime}ms, setting state immediately...`);
          
          setAnnotatedImageBlob(dataUri);
          console.log(`Total analysis time: ${Date.now() - analysisStartTime}ms`);
        } catch (visualError) {
          console.warn('Visual API failed:', visualError);
          setAnnotatedImageBlob(null);
        }
      } else {
        console.log('No detections found, skipping visual API');
        setAnnotatedImageBlob(null);
      }

      setCurrentStep('results');
      
    } catch (error) {
      console.error('Analysis error:', error);
      const friendlyMessage = handleAPIError(error);
      Alert.alert(
        'Analysis Failed',
        friendlyMessage,
        [{ text: 'Try Again', onPress: () => setCurrentStep('home') }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const animateAnalysisSteps = () => {
    const steps = [...analysisSteps];
    let currentStepIndex = 0;

    const activateStep = () => {
      if (currentStepIndex < steps.length) {
        steps[currentStepIndex].active = true;
        setAnalysisSteps([...steps]);
        currentStepIndex++;
        setTimeout(activateStep, 800);
      }
    };

    steps.forEach(step => step.active = false);
    setAnalysisSteps([...steps]);
    setTimeout(activateStep, 300);
  };

  const handleContinueToSkinTest = () => {
    setCurrentStep('skinTest');
  };

  const handleContinueToTest = (testType) => {
    console.log('Navigating to test:', testType);
    if (testType === 'End-of-Day Check') {
      setCurrentStep('test1');
    } else if (testType === 'Blotting Paper Test') {
      setCurrentStep('test2');
    } else if (testType === 'Overnight Assessment') {
      setCurrentStep('test3');
    } else {
      Alert.alert('Coming Soon', `${testType} test will be available soon!`);
    }
  };

  const handleSkipToKnownSkinType = () => {
    setCurrentStep('knownSkinType');
  };

  const handleTest1Part1Complete = (answer) => {
    console.log('Test1 Part 1 completed:', answer);
    setTest1Part1Answer(answer);
    setCurrentStep('test1Part2');
  };

  const handleTest1Complete = (testResult, aiAnalysisData = null) => {
    console.log('Test1 completed with new format:', testResult);
    setTest1Results(testResult);
    setCurrentTestResult(testResult);
    setCurrentStep('skinTypeResults');
  };

  const handleTest2Part1Complete = (answer) => {
    console.log('Test2 Part 1 completed:', answer);
    setTest2Part1Answer(answer);
    setCurrentStep('test2Part2');
  };

  const handleTest2Complete = (testResult, aiAnalysisData = null) => {
    console.log('Test2 completed with new format:', testResult);
    setTest2Results(testResult);
    setCurrentTestResult(testResult);
    setCurrentStep('skinTypeResults');
  };

  const handleTest3Part1Complete = (answer) => {
    console.log('Test3 Part 1 completed:', answer);
    setTest3Part1Answer(answer);
    setCurrentStep('test3Part2');
  };

  const handleTest3Complete = (testResult, aiAnalysisData = null) => {
    console.log('Test3 completed with new format:', testResult);
    setTest3Results(testResult);
    setCurrentTestResult(testResult);
    setCurrentStep('skinTypeResults');
  };

  const handleSkinTypeResultsContinue = () => {
    console.log('Skin type results completed, continuing to routine generation...');
    
    if (manualSkinTypeSelection) {
      handleContinueWithSkinType(manualSkinTypeSelection);
    } else {
      setCurrentStep('knownSkinType');
    }
  };

  const handleManualSkinTypeSelection = (mockTestResult, selectedSkinTypes) => {
    console.log('Manual skin type selected:', selectedSkinTypes);
    setCurrentTestResult(mockTestResult);
    setManualSkinTypeSelection(selectedSkinTypes);
    setCurrentStep('skinTypeResults');
  };

  const handleSkinTypeResultsGoHome = () => {
    console.log('User chose to skip routine building, going to home...');
    setCurrentStep('home');
  };

  const handleContinueWithSkinType = (skinTypeData) => {
    setSelectedSkinType(skinTypeData);
    
    const allTestResults = {
      test1Results,
      test2Results, 
      test3Results
    };
    
    setSkinProfile({
      acne: analysisData ? analysisData.total_found : 0,
      skinType: Array.isArray(skinTypeData) ? skinTypeData.map(st => st.id) : skinTypeData.id,
      skinTypeName: Array.isArray(skinTypeData) ? skinTypeData.map(st => st.title).join(' + ') : skinTypeData.title,
      allTestResults,
      hasTestResults: !!(test1Results || test2Results || test3Results),
      onboardingData,
    });
    
    const skinTypeNames = Array.isArray(skinTypeData) 
      ? skinTypeData.map(st => st.title).join(' + ')
      : skinTypeData.title;
    
    const testCount = [test1Results, test2Results, test3Results].filter(Boolean).length;
    const testInfo = testCount > 0 ? `${testCount} test(s) included!` : '';
    
    Alert.alert(
      'Skin Profile Created!', 
      `Your ${skinTypeNames} profile has been saved. ${testInfo}\n\nNext: Complete skincare routine!`,
      [{ text: 'Continue', onPress: () => setCurrentStep('home') }]
    );
  };

  const resetToHome = () => {
    setCurrentStep('home');
    setSelectedImageUri(null);
    setAnalysisData(null);
    setAnnotatedImageBlob(null);
    setIsLoading(false);
    setActiveTab('routines');
    setSkinProfile({});
    setSelectedSkinType(null);
    setTest1Results(null);
    setTest1Part1Answer(null);
    setTest2Results(null);
    setTest2Part1Answer(null);
    setTest3Results(null);
    setTest3Part1Answer(null);
    setCurrentTestResult(null);
    
    const resetSteps = analysisSteps.map(step => ({ ...step, active: false }));
    setAnalysisSteps(resetSteps);
  };

  const shouldShowProgressBar = () => {
    return !isOnboardingComplete;
  };

  // ONBOARDING RENDER FUNCTIONS
  const renderOnboardingWelcome = () => (
    <OnboardingWelcome onNext={handleOnboardingNext} style={styles.screenContent} />
  );

  const renderOnboardingDiscovery = () => (
    <OnboardingDiscovery onNext={handleOnboardingNext} style={styles.screenContent} />
  );

  const renderOnboardingExperience = () => (
    <OnboardingExperience onNext={handleOnboardingNext} style={styles.screenContent} />
  );

  const renderOnboardingStruggle = () => (
    <OnboardingStruggle onNext={handleOnboardingNext} style={styles.screenContent} />
  );

  const renderOnboardingBarrierHealth1 = () => (
    <OnboardingBarrierHealth1 onNext={handleOnboardingNext} style={styles.screenContent} />
  );

  const renderOnboardingBarrierHealth2 = () => (
    <OnboardingBarrierHealth2 onNext={handleOnboardingNext} style={styles.screenContent} />
  );

  const renderOnboardingSkinType = () => (
    <OnboardingSkinType onNext={handleOnboardingNext} style={styles.screenContent} />
  );

  const renderOnboardingRoutine = () => (
    <OnboardingRoutine onNext={handleOnboardingNext} style={styles.screenContent} />
  );

  const renderOnboardingGoals = () => (
    <OnboardingGoals onNext={handleOnboardingNext} style={styles.screenContent} />
  );

  const renderOnboardingTimeline = () => (
    <OnboardingTimeline onNext={handleOnboardingNext} style={styles.screenContent} />
  );

  const renderOnboardingResultsTimeline = () => (
    <OnboardingResultsTimeline onNext={handleOnboardingNext} style={styles.screenContent} />
  );

  const renderOnboardingConsistency = () => (
    <OnboardingConsistency onNext={handleOnboardingNext} style={styles.screenContent} />
  );

  const renderOnboardingComparison = () => (
    <OnboardingComparison onNext={handleOnboardingNext} style={styles.screenContent} />
  );

  const renderOnboardingReady = () => (
    <OnboardingReady onNext={handleOnboardingNext} style={styles.screenContent} />
  );

  const renderOnboardingPrivacy = () => (
    <OnboardingPrivacy onNext={handleOnboardingNext} style={styles.screenContent} />
  );

  const renderOnboardingGenerating = () => (
    <OnboardingGenerating onNext={handleOnboardingNext} style={styles.screenContent} />
  );

  const renderOnboardingPlanReady = () => (
    <OnboardingPlanReady onNext={handleOnboardingNext} style={styles.screenContent} />
  );

  const renderOnboardingReminders = () => (
    <OnboardingReminders onNext={handleOnboardingNext} style={styles.screenContent} />
  );

  const renderOnboardingRating = () => (
    <OnboardingRating onNext={handleOnboardingNext} style={styles.screenContent} />
  );

  const renderOnboardingSaveProgress = () => (
    <OnboardingSaveProgress onNext={handleOnboardingNext} onboardingData={onboardingData} style={styles.screenContent} />
  );

  const renderOnboardingPaywall = () => (
    <OnboardingPaywall onNext={handleOnboardingNext} onboardingData={onboardingData} style={styles.screenContent} />
  );

  const renderHomeScreen = () => (
    <View style={styles.homeScreenContainer}>
      <HomeScreen
        onNavigateToSkinTest={handleNavigateToSkinTest}
        onNavigateToDayRoutine={handleNavigateToDayRoutine}
        onNavigateToNightRoutine={handleNavigateToNightRoutine}
        onNavigateToScanSkin={handleNavigateToScanSkin}
        onNavigateToMyJourney={handleNavigateToMyJourney}
        userStreak={userStreak}
        weeklyActivity={weeklyActivity}
        activeTab={activeTab}
        onTabPress={handleTabPress}
        style={styles.homeScreenContent}
      />
    </View>
  );

  const renderHome = () => (
    <ScrollView 
      style={styles.homeContainer} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.homeContentContainer}
    >
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/dracne-logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>AI-Powered Acne Analysis &</Text>
          <Text style={styles.headerTitle}>Skincare</Text>
        </View>
      </View>

      <FeatureCards />

      <View style={styles.startButtonContainer}>
        <DrAcneButton
          title="Start Your Skin Analysis"
          onPress={() => setCurrentStep('capture')}
          style={styles.startButton}
        />
      </View>
    </ScrollView>
  );

  const renderDayRoutine = () => (
    <View style={styles.screenContainer}>
      <DayRoutineScreen
        onBack={() => setCurrentStep('home')}
        onSelectRoutine={handleRoutineSelection}
        onNavigateToSkinTest={handleNavigateToSkinTest}
        style={styles.screenContent}
      />
    </View>
  );

  const renderNightRoutine = () => (
    <View style={styles.screenContainer}>
      <NightRoutineScreen
        onBack={() => setCurrentStep('home')}
        onSelectRoutine={handleRoutineSelection}
        style={styles.screenContent}
      />
    </View>
  );

  // 🆕 BASIC ROUTINE PRODUCT SELECTION SCREENS
  const renderBasicRoutineStep1 = () => (
    <View style={styles.screenContainer}>
      <BasicRoutineProductSelection
        onBack={() => setCurrentStep('dayRoutine')}
        onContinue={handleCleanserSelected}
        style={styles.screenContent}
      />
    </View>
  );

  const renderBasicRoutineStep2 = () => (
    <View style={styles.screenContainer}>
      <BasicRoutineStep2Moisturizer
        onBack={() => setCurrentStep('basicRoutineStep1')}
        onContinue={handleMoisturizerSelected}
        style={styles.screenContent}
      />
    </View>
  );

  const renderBasicRoutineStep3 = () => (
    <View style={styles.screenContainer}>
      <BasicRoutineStep3Sunscreen
        onBack={() => setCurrentStep('basicRoutineStep2')}
        onComplete={handleSunscreenSelected}
        style={styles.screenContent}
      />
    </View>
  );

  const renderCapture = () => (
    <View style={styles.captureContainer}>
      <PhotoCapture
        onPhotoSelected={handlePhotoSelected}
        onNavigateHome={handleNavigateHomeFromCapture}
        style={styles.photoCapture}
      />
    </View>
  );

  const renderAnalyzing = () => (
    <View style={styles.analyzingContainer}>
      <View style={styles.analyzingContent}>
        <ActivityIndicator size="large" color={BRAND_COLORS.primary} />
        
        <View style={styles.analysisStepsContainer}>
          {analysisSteps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <View style={[styles.stepDot, step.active && styles.stepDotActive]} />
              <Text style={[styles.stepText, step.active && styles.stepTextActive]}>
                {step.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderResults = () => (
    <View style={styles.resultsContainer}>
      <AnalysisResults
        analysisData={analysisData}
        annotatedImageBlob={annotatedImageBlob}
        style={styles.resultsContent}
      />
      
      <View style={styles.resultsActionsRow}>
        <DrAcneButton
          title="New Analysis"
          variant="outline"
          onPress={resetToHome}
          style={styles.actionButtonLeft}
        />
        <DrAcneButton
          title="Continue"
          onPress={handleContinueToSkinTest}
          style={styles.actionButtonRight}
        />
      </View>
    </View>
  );

  const renderSkinTest = () => (
    <View style={styles.screenContainer}>
      <SkinTestScreen
        onBack={handleProgressBarBack}
        onContinueToTest={handleContinueToTest}
        onSkipToKnownSkinType={handleSkipToKnownSkinType}
        onNavigateHome={() => setCurrentStep('home')}
        style={styles.screenContent}
      />
    </View>
  );

  const renderTest1 = () => (
    <View style={styles.screenContainer}>
      <Test1Screen
        onBack={handleProgressBarBack}
        onContinue={handleTest1Part1Complete}
        onNavigateHome={() => setCurrentStep('home')}
        analysisData={analysisData}
        style={styles.screenContent}
      />
    </View>
  );

  const renderTest1Part2 = () => (
    <View style={styles.screenContainer}>
      <Test1Part2Screen
        onBack={() => setCurrentStep('test1')}
        onContinue={handleTest1Complete}
        onNavigateHome={() => setCurrentStep('home')}
        firstAnswer={test1Part1Answer}
        analysisData={analysisData}
        style={styles.screenContent}
      />
    </View>
  );

  const renderTest2 = () => (
    <View style={styles.screenContainer}>
      <Test2Screen
        onBack={handleProgressBarBack}
        onContinue={handleTest2Part1Complete}
        onNavigateHome={() => setCurrentStep('home')}
        analysisData={analysisData}
        style={styles.screenContent}
      />
    </View>
  );

  const renderTest2Part2 = () => (
    <View style={styles.screenContainer}>
      <Test2Part2Screen
        onBack={() => setCurrentStep('test2')}
        onContinue={handleTest2Complete}
        onNavigateHome={() => setCurrentStep('home')}
        firstAnswer={test2Part1Answer}
        analysisData={analysisData}
        style={styles.screenContent}
      />
    </View>
  );

  const renderTest3 = () => (
    <View style={styles.screenContainer}>
      <Test3Screen
        onBack={handleProgressBarBack}
        onContinue={handleTest3Part1Complete}
        onNavigateHome={() => setCurrentStep('home')}
        analysisData={analysisData}
        style={styles.screenContent}
      />
    </View>
  );

  const renderTest3Part2 = () => (
    <View style={styles.screenContainer}>
      <Test3Part2Screen
        onBack={() => setCurrentStep('test3')}
        onContinue={handleTest3Complete}
        onNavigateHome={() => setCurrentStep('home')}
        firstAnswer={test3Part1Answer}
        analysisData={analysisData}
        style={styles.screenContent}
      />
    </View>
  );

  const renderSkinTypeResults = () => {
    return (
      <View style={styles.skinTypeResultsContainer}>
        <SkinTypeResultsScreen
          testResults={currentTestResult}
          analysisData={analysisData}
          onContinue={handleSkinTypeResultsContinue}
          onGoHome={handleSkinTypeResultsGoHome}
          style={styles.screenContent}
        />
      </View>
    );
  };

  const renderKnownSkinType = () => (
    <View style={styles.screenContainer}>
      <KnownSkinTypeScreen
        onBack={handleProgressBarBack}
        onContinueToResults={handleManualSkinTypeSelection}
        onNavigateHome={() => setCurrentStep('home')}
        test1Results={test1Results}
        test2Results={test2Results}
        test3Results={test3Results}
        style={styles.screenContent}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFBFC" translucent={false} />
      
      {/* GLOBAL BACKGROUND WITH STATIC DECORATIVE DOTS */}
      <View style={styles.globalBackground}>
        <View style={styles.decorativeDot1} />
        <View style={styles.decorativeDot2} />
        <View style={styles.decorativeDot3} />
        <View style={styles.decorativeDot4} />
        <View style={styles.decorativeDot5} />
      </View>
      
      {shouldShowProgressBar() && (
        <ProgressBar 
          progress={getProgressPercentage()}
          onBack={handleOnboardingBack}
          showBackButton={true}
        />
      )}
      
      <View style={styles.content} {...panResponder.panHandlers}>
        {/* ✓ ONBOARDING FLOW - CORRECT ORDER (21 SCREENS) */}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingWelcome' && renderOnboardingWelcome()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingDiscovery' && renderOnboardingDiscovery()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingExperience' && renderOnboardingExperience()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingStruggle' && renderOnboardingStruggle()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingBarrierHealth1' && renderOnboardingBarrierHealth1()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingBarrierHealth2' && renderOnboardingBarrierHealth2()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingSkinType' && renderOnboardingSkinType()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingRoutine' && renderOnboardingRoutine()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingGoals' && renderOnboardingGoals()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingTimeline' && renderOnboardingTimeline()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingResultsTimeline' && renderOnboardingResultsTimeline()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingConsistency' && renderOnboardingConsistency()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingComparison' && renderOnboardingComparison()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingReady' && renderOnboardingReady()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingPrivacy' && renderOnboardingPrivacy()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingGenerating' && renderOnboardingGenerating()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingPlanReady' && renderOnboardingPlanReady()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingReminders' && renderOnboardingReminders()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingRating' && renderOnboardingRating()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingSaveProgress' && renderOnboardingSaveProgress()}
        {!isOnboardingComplete && currentOnboardingStep === 'onboardingPaywall' && renderOnboardingPaywall()}
        
        {/* Main App Flow */}
        {isOnboardingComplete && currentStep === 'home' && renderHomeScreen()}
        {isOnboardingComplete && currentStep === 'dayRoutine' && renderDayRoutine()}
        {isOnboardingComplete && currentStep === 'nightRoutine' && renderNightRoutine()}
        {isOnboardingComplete && currentStep === 'basicRoutineStep1' && renderBasicRoutineStep1()}
        {isOnboardingComplete && currentStep === 'basicRoutineStep2' && renderBasicRoutineStep2()}
        {isOnboardingComplete && currentStep === 'basicRoutineStep3' && renderBasicRoutineStep3()}
        {isOnboardingComplete && currentStep === 'capture' && renderCapture()}
        {isOnboardingComplete && currentStep === 'analyzing' && renderAnalyzing()}
        {isOnboardingComplete && currentStep === 'results' && renderResults()}
        {isOnboardingComplete && currentStep === 'skinTest' && renderSkinTest()}
        {isOnboardingComplete && currentStep === 'test1' && renderTest1()}
        {isOnboardingComplete && currentStep === 'test1Part2' && renderTest1Part2()}
        {isOnboardingComplete && currentStep === 'test2' && renderTest2()}
        {isOnboardingComplete && currentStep === 'test2Part2' && renderTest2Part2()}
        {isOnboardingComplete && currentStep === 'test3' && renderTest3()}
        {isOnboardingComplete && currentStep === 'test3Part2' && renderTest3Part2()}
        {isOnboardingComplete && currentStep === 'skinTypeResults' && renderSkinTypeResults()}
        {isOnboardingComplete && currentStep === 'knownSkinType' && renderKnownSkinType()}
      </View>

      {/* Bottom Navigation - Shows on home, dayRoutine, nightRoutine, skinTest, and all test screens */}
      {isOnboardingComplete && (
        currentStep === 'home' || 
        currentStep === 'results' || 
        currentStep === 'dayRoutine' || 
        currentStep === 'nightRoutine' || 
        currentStep === 'skinTest' || 
        currentStep === 'knownSkinType' || 
        currentStep === 'skinTypeResults' || 
        currentStep === 'test1' || 
        currentStep === 'test1Part2' || 
        currentStep === 'test2' || 
        currentStep === 'test2Part2' || 
        currentStep === 'test3' || 
        currentStep === 'test3Part2'
      ) && (
        <BottomNavigation
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  globalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FAFBFC',
    zIndex: -1,
  },
  decorativeDot1: {
    position: 'absolute',
    top: 80,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: BRAND_COLORS.primary,
    opacity: 0.1,
  },
  decorativeDot2: {
    position: 'absolute',
    top: 180,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BRAND_COLORS.secondary,
    opacity: 0.1,
  },
  decorativeDot3: {
    position: 'absolute',
    bottom: 200,
    right: 40,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    opacity: 0.08,
  },
  decorativeDot4: {
    position: 'absolute',
    top: 350,
    left: 50,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: BRAND_COLORS.primary,
    opacity: 0.06,
  },
  decorativeDot5: {
    position: 'absolute',
    bottom: 350,
    left: 30,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: BRAND_COLORS.secondary,
    opacity: 0.07,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  homeScreenContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  homeScreenContent: {
    flex: 1,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  homeContentContainer: {
    paddingBottom: 140,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  logoImage: {
    width: 120,
    height: 80,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    lineHeight: 22,
  },
  startButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'transparent',
  },
  startButton: {
    paddingVertical: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  captureContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingBottom: 140,
  },
  photoCapture: {
    flex: 1,
  },
  analyzingContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  analyzingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 140,
  },
  analysisStepsContainer: {
    marginTop: 40,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    maxWidth: 250,
  },
  stepDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E5E5E5',
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  stepDotActive: {
    backgroundColor: BRAND_COLORS.primary,
    borderColor: BRAND_COLORS.primary,
  },
  stepText: {
    fontSize: 16,
    color: '#999',
    flex: 1,
  },
  stepTextActive: {
    color: BRAND_COLORS.primary,
    fontWeight: '600',
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 20,
  },
  resultsContent: {
    flex: 1,
  },
  resultsActionsRow: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'transparent',
    gap: 12,
    zIndex: 10,
  },
  actionButtonLeft: {
    flex: 1,
    paddingVertical: 12,
    marginVertical: 0,
  },
  actionButtonRight: {
    flex: 1,
    paddingVertical: 12,
    marginVertical: 0,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingBottom: 0,
  },
  skinTypeResultsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  screenContent: {
    flex: 1,
  },
});