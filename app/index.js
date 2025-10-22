// app/index.js - UPDATED WITH COMPREHENSIVE ROUTINE COMPLETE
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Animated, // ← ADD THIS LINE
  BackHandler,
  Image,
  PanResponder,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { AnalysisResults } from '../components/analysis/AnalysisResults';
import { PhotoCapture } from '../components/camera/PhotoCapture';
import SmartRoutineSuggestionModal from '../components/modals/SmartRoutineSuggestionModal';
import { BottomNavigation } from '../components/ui/BottomNavigation';
import { DrAcneButton } from '../components/ui/DrAcneButton';
import { FeatureCards } from '../components/ui/FeatureCards';
import { ProgressBar } from '../components/ui/ProgressBar';
import { analyzeImageWithRoboflow, analyzeImageWithRoboflowVisual, handleAPIError } from '../services/RoboflowAPI';

// Basic Routine Screens
import BasicRoutineProductSelection from './BasicRoutineProductSelection';
import BasicRoutineStep1Info from './BasicRoutineStep1Info';
import BasicRoutineStep2Info from './BasicRoutineStep2Info';
import BasicRoutineStep2ProductSelection from './BasicRoutineStep2ProductSelection';
import BasicRoutineStep3Info from './BasicRoutineStep3Info';
import BasicRoutineStep3ProductSelection from './BasicRoutineStep3ProductSelection';

// Moderate Routine Screens
import ModerateRoutineStep1Info from './ModerateRoutineStep1Info';
import ModerateRoutineStep1ProductSelection from './ModerateRoutineStep1ProductSelection';
import ModerateRoutineStep2Info from './ModerateRoutineStep2Info';
import ModerateRoutineStep2ProductSelection from './ModerateRoutineStep2ProductSelection';
import ModerateRoutineStep3Info from './ModerateRoutineStep3Info';
import ModerateRoutineStep3ProductSelection from './ModerateRoutineStep3ProductSelection';
import ModerateRoutineStep4Info from './ModerateRoutineStep4Info';
import ModerateRoutineStep4ProductSelection from './ModerateRoutineStep4ProductSelection';

// Comprehensive Routine Screens
import ComprehensiveRoutineStep1Info from './ComprehensiveRoutineStep1Info';
import ComprehensiveRoutineStep1ProductSelection from './ComprehensiveRoutineStep1ProductSelection';
import ComprehensiveRoutineStep2Info from './ComprehensiveRoutineStep2Info';
import ComprehensiveRoutineStep2ProductSelection from './ComprehensiveRoutineStep2ProductSelection';
import ComprehensiveRoutineStep3Info from './ComprehensiveRoutineStep3Info';
import ComprehensiveRoutineStep3ProductSelection from './ComprehensiveRoutineStep3ProductSelection';
import ComprehensiveRoutineStep4Info from './ComprehensiveRoutineStep4Info';
import ComprehensiveRoutineStep4ProductSelection from './ComprehensiveRoutineStep4ProductSelection';
import ComprehensiveRoutineStep5Info from './ComprehensiveRoutineStep5Info';
import ComprehensiveRoutineStep5ProductSelection from './ComprehensiveRoutineStep5ProductSelection';

// Basic Night Routine Screens
import BasicNightRoutineStep1Info from './BasicNightRoutineStep1Info';
import BasicNightRoutineStep1ProductSelection from './BasicNightRoutineStep1ProductSelection';
import BasicNightRoutineStep2Info from './BasicNightRoutineStep2Info';
import BasicNightRoutineStep2ProductSelection from './BasicNightRoutineStep2ProductSelection';

// Moderate Night Routine Screens
import ModerateNightRoutineStep1Info from './ModerateNightRoutineStep1Info';
import ModerateNightRoutineStep1ProductSelection from './ModerateNightRoutineStep1ProductSelection';
import ModerateNightRoutineStep2Info from './ModerateNightRoutineStep2Info';
import ModerateNightRoutineStep2ProductSelection from './ModerateNightRoutineStep2ProductSelection';
import ModerateNightRoutineStep3Info from './ModerateNightRoutineStep3Info';
import ModerateNightRoutineStep3ProductSelection from './ModerateNightRoutineStep3ProductSelection';

// Comprehensive Night Routine Screens
import ComprehensiveNightRoutineStep1Info from './ComprehensiveNightRoutineStep1Info';
import ComprehensiveNightRoutineStep1ProductSelection from './ComprehensiveNightRoutineStep1ProductSelection';
import ComprehensiveNightRoutineStep2Info from './ComprehensiveNightRoutineStep2Info';
import ComprehensiveNightRoutineStep2ProductSelection from './ComprehensiveNightRoutineStep2ProductSelection';
import ComprehensiveNightRoutineStep3Info from './ComprehensiveNightRoutineStep3Info';
import ComprehensiveNightRoutineStep3ProductSelection from './ComprehensiveNightRoutineStep3ProductSelection';
import ComprehensiveNightRoutineStep4Info from './ComprehensiveNightRoutineStep4Info';
import ComprehensiveNightRoutineStep4ProductSelection from './ComprehensiveNightRoutineStep4ProductSelection';

// Main App Screens
import DayRoutineScreen from './DayRoutineScreen';
import { HomeScreen } from './HomeScreen';
import { KnownSkinTypeScreen } from './KnownSkinTypeScreen';
import MyDayRoutine from './MyDayRoutine';
import MyNightRoutine from './MyNightRoutine';
import NightRoutineScreen from './NightRoutineScreen';
import RoutinesScreen from './RoutinesScreen';
import { SkinTestScreen } from './SkinTestScreen';
import { SkinTypeResultsScreen } from './SkinTypeResultsScreen';
import { Test1Part2Screen } from './Test1Part2Screen';
import { Test1Screen } from './Test1Screen';
import { Test2Part2Screen } from './Test2Part2Screen';
import { Test2Screen } from './Test2Screen';
import { Test3Part2Screen } from './Test3Part2Screen';
import { Test3Screen } from './Test3Screen';

// Onboarding Screens
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

// Smart Routine Screens
import { LibraryScreen } from './LibraryScreen';
import MySmartRoutine from './MySmartRoutine';
import SmartRoutineHubScreen from './SmartRoutineHubScreen';
import SmartRoutineIntroScreen from './SmartRoutineIntroScreen';
import SmartRoutineProductSelectionDay from './SmartRoutineProductSelectionDay';
import SmartRoutineProductSelectionNight from './SmartRoutineProductSelectionNight';
import SmartRoutineScreen from './SmartRoutineScreen';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
};

// Professional Brain Loader Component
const BrainLoader = () => {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  const glowAnim = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.8,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    );

    pulseAnimation.start();
    glowAnimation.start();

    return () => {
      pulseAnimation.stop();
      glowAnimation.stop();
    };
  }, []);

  return (
    <View style={styles.brainLoaderContainer}>
      <Animated.View 
        style={[
          styles.brainIconContainer,
          { transform: [{ scale: pulseAnim }] }
        ]}
      >
        <View style={styles.brainIcon}>
          <View style={styles.brainCircle}>
            <Image 
              source={require('../assets/images/brain.png')} 
              style={styles.brainImage}
              resizeMode="contain"
            />
          </View>
          
          <Animated.View 
            style={[
              styles.glowRing,
              { 
                opacity: glowAnim,
                borderColor: BRAND_COLORS.primary 
              }
            ]}
          />
        </View>
      </Animated.View>
    </View>
  );
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
  
  // Smart Routine State
  const [selectedSmartConcern, setSelectedSmartConcern] = useState(null);
  const [smartRoutineDayProducts, setSmartRoutineDayProducts] = useState([]);
  const [showSmartRoutineSuggestion, setShowSmartRoutineSuggestion] = useState(false);
  const [confirmedConcern, setConfirmedConcern] = useState(null);

  // Product Selection State
  const [selectedProducts, setSelectedProducts] = useState({
    cleansers: [],
    moisturizers: [],
    sunscreens: [],
  });
  
  // Basic Routine State
  const [showProductSelection, setShowProductSelection] = useState(false);
  const [showProductSelectionStep2, setShowProductSelectionStep2] = useState(false);
  const [showProductSelectionStep3, setShowProductSelectionStep3] = useState(false);
  
  // Moderate Routine State
  const [showModerateProductSelection, setShowModerateProductSelection] = useState(false);
  const [showModerateProductSelectionStep2, setShowModerateProductSelectionStep2] = useState(false);
  const [showModerateProductSelectionStep3, setShowModerateProductSelectionStep3] = useState(false);
  const [showModerateProductSelectionStep4, setShowModerateProductSelectionStep4] = useState(false);
  
  // Comprehensive Routine State
  const [showComprehensiveProductSelection, setShowComprehensiveProductSelection] = useState(false);
  const [showComprehensiveProductSelectionStep2, setShowComprehensiveProductSelectionStep2] = useState(false);
  const [showComprehensiveProductSelectionStep3, setShowComprehensiveProductSelectionStep3] = useState(false);
  const [showComprehensiveProductSelectionStep4, setShowComprehensiveProductSelectionStep4] = useState(false);
  const [showComprehensiveProductSelectionStep5, setShowComprehensiveProductSelectionStep5] = useState(false);
  
  // Basic Night Routine State
const [showNightProductSelection, setShowNightProductSelection] = useState(false);
const [showNightProductSelectionStep2, setShowNightProductSelectionStep2] = useState(false);

// Moderate Night Routine State
const [showModerateNightProductSelection, setShowModerateNightProductSelection] = useState(false);
const [showModerateNightProductSelectionStep2, setShowModerateNightProductSelectionStep2] = useState(false);
const [showModerateNightProductSelectionStep3, setShowModerateNightProductSelectionStep3] = useState(false);

// Comprehensive Night Routine State
const [showComprehensiveNightProductSelection, setShowComprehensiveNightProductSelection] = useState(false);
const [showComprehensiveNightProductSelectionStep2, setShowComprehensiveNightProductSelectionStep2] = useState(false);
const [showComprehensiveNightProductSelectionStep3, setShowComprehensiveNightProductSelectionStep3] = useState(false);
const [showComprehensiveNightProductSelectionStep4, setShowComprehensiveNightProductSelectionStep4] = useState(false);

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
      'myDayRoutine': 0,
      'myNightRoutine': 0,
      'basicNightRoutineStep1': 0,
      'basicNightRoutineStep2': 0,
      'basicNightRoutineStep2': 0,
      'moderateNightRoutineStep1': 0,
      'moderateNightRoutineStep2': 0,
      'moderateNightRoutineStep3': 0,
      'basicRoutineStep1': 0,
      'basicRoutineStep1': 0,
      'basicRoutineStep2': 0,
      'basicRoutineStep3': 0,
      'moderateRoutineStep1': 0,
      'moderateRoutineStep2': 0,
      'moderateRoutineStep3': 0,
      'moderateRoutineStep4': 0,
      'comprehensiveRoutineStep1': 0,
      'comprehensiveRoutineStep2': 0,
      'comprehensiveRoutineStep3': 0,
      'comprehensiveRoutineStep4': 0,
      'comprehensiveRoutineStep5': 0,
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
    } else if (currentStep === 'myDayRoutine') {
      setCurrentStep('dayRoutine');
    } else if (currentStep === 'basicRoutineStep1') {
      setShowProductSelection(false);
      setCurrentStep('dayRoutine');
    } else if (currentStep === 'basicRoutineStep2') {
      setShowProductSelectionStep2(false);
      setCurrentStep('basicRoutineStep1');
    } else if (currentStep === 'basicRoutineStep3') {
      setShowProductSelectionStep3(false);
      setCurrentStep('basicRoutineStep2');
    } else if (currentStep === 'moderateRoutineStep1') {
      setShowModerateProductSelection(false);
      setCurrentStep('dayRoutine');
    } else if (currentStep === 'moderateRoutineStep2') {
      setShowModerateProductSelectionStep2(false);
      setCurrentStep('moderateRoutineStep1');
    } else if (currentStep === 'moderateRoutineStep3') {
      setShowModerateProductSelectionStep3(false);
      setCurrentStep('moderateRoutineStep2');
    } else if (currentStep === 'moderateRoutineStep4') {
      setShowModerateProductSelectionStep4(false);
      setCurrentStep('moderateRoutineStep3');
    } else if (currentStep === 'comprehensiveRoutineStep1') {
      setShowComprehensiveProductSelection(false);
      setCurrentStep('dayRoutine');
    } else if (currentStep === 'comprehensiveRoutineStep2') {
      setShowComprehensiveProductSelectionStep2(false);
      setCurrentStep('comprehensiveRoutineStep1');
    } else if (currentStep === 'comprehensiveRoutineStep3') {
      setShowComprehensiveProductSelectionStep3(false);
      setCurrentStep('comprehensiveRoutineStep2');
    } else if (currentStep === 'comprehensiveRoutineStep4') {
      setShowComprehensiveProductSelectionStep4(false);
      setCurrentStep('comprehensiveRoutineStep3');
    } else if (currentStep === 'comprehensiveRoutineStep5') {
      setShowComprehensiveProductSelectionStep5(false);
      setCurrentStep('comprehensiveRoutineStep4');
    } else if (currentStep === 'myNightRoutine') {
      setCurrentStep('nightRoutine');
    } else if (currentStep === 'basicNightRoutineStep1') {
      setShowNightProductSelection(false);
      setCurrentStep('nightRoutine');
    } else if (currentStep === 'basicNightRoutineStep2') {
      setShowNightProductSelectionStep2(false);
      setCurrentStep('basicNightRoutineStep1');
    } else if (currentStep === 'moderateNightRoutineStep1') {
      setShowModerateNightProductSelection(false);
      setCurrentStep('nightRoutine');
    } else if (currentStep === 'moderateNightRoutineStep2') {
      setShowModerateNightProductSelectionStep2(false);
      setCurrentStep('moderateNightRoutineStep1');
    } else if (currentStep === 'moderateNightRoutineStep3') {
      setShowModerateNightProductSelectionStep3(false);
      setCurrentStep('moderateNightRoutineStep2');
    } else if (currentStep === 'comprehensiveNightRoutineStep1') {
      setShowComprehensiveNightProductSelection(false);
      setCurrentStep('nightRoutine');
    } else if (currentStep === 'comprehensiveNightRoutineStep2') {
      setShowComprehensiveNightProductSelectionStep2(false);
      setCurrentStep('comprehensiveNightRoutineStep1');
    } else if (currentStep === 'comprehensiveNightRoutineStep3') {
      setShowComprehensiveNightProductSelectionStep3(false);
      setCurrentStep('comprehensiveNightRoutineStep2');
    } else if (currentStep === 'comprehensiveNightRoutineStep4') {
      setShowComprehensiveNightProductSelectionStep4(false);
      setCurrentStep('comprehensiveNightRoutineStep3');
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

  const handleNavigateToMyDayRoutine = () => {
    console.log('Navigate to My Day Routine');
    setCurrentStep('myDayRoutine');
  };

  const handleNavigateToMyNightRoutine = () => {
    console.log('Navigate to My Night Routine');
    setCurrentStep('myNightRoutine');
  };

 // Smart Routine Navigation Handlers
const handleNavigateToSmartRoutineHub = () => {
  console.log('📱 Navigating to Smart Routine Hub');
  setCurrentStep('smartRoutineHub');
};

const handleNavigateToSmartRoutine = () => {
  console.log('📱 Navigating to Smart Routine (Create)');
  setCurrentStep('smartRoutine');
};

const handleNavigateToMySmartRoutine = () => {
  console.log('📱 Navigating to My Smart Routine');
  setCurrentStep('mySmartRoutine');
};

const handleNavigateToSmartRoutineIntro = (concernId) => {
  console.log('📱 Navigating to Smart Routine Intro:', concernId);
  setSelectedSmartConcern(concernId);
  setCurrentStep('smartRoutineIntro');
};

const handleNavigateToSmartProductSelection = () => {
  console.log('📱 Navigating to Smart Product Selection (Day)');
  setSmartRoutineDayProducts([]);
  setCurrentStep('smartRoutineProductSelectionDay');
};

const handleSmartRoutineDayComplete = (dayProducts) => {
  console.log('📱 Day products selected:', dayProducts.length);
  setSmartRoutineDayProducts(dayProducts);
  setCurrentStep('smartRoutineProductSelectionNight');
};

const handleSmartRoutineBackToDay = () => {
  console.log('📱 Going back to Day products');
  setCurrentStep('smartRoutineProductSelectionDay');
};

const handleConcernConfirmed = (concernId) => {
  console.log('✅ User confirmed concern:', concernId);
  setConfirmedConcern(concernId);
  setShowSmartRoutineSuggestion(true);
};

const handleCreateSmartRoutineFromAnalysis = () => {
  console.log('📱 Creating Smart Routine from analysis with pre-selection:', confirmedConcern);
  setShowSmartRoutineSuggestion(false);
  setSelectedSmartConcern(confirmedConcern); // Pre-select the confirmed concern
  setCurrentStep('smartRoutine'); // Go to list screen, not intro
};

const handleSkipSmartRoutine = () => {
  console.log('⏭️ User skipped Smart Routine creation');
  setShowSmartRoutineSuggestion(false);
  setConfirmedConcern(null);
};

const handleNavigateBackToSmartRoutine = () => {
  console.log('📱 Navigating back to Smart Routine');
  setCurrentStep('smartRoutine');
};

const handleNavigateBackToSmartRoutineHub = () => {
  console.log('📱 Navigating back to Smart Routine Hub');
  setCurrentStep('smartRoutineHub');
};
  
  // ✅ NEW: Navigate to Comprehensive Night Routine for editing
  const handleNavigateToComprehensiveNightRoutine = () => {
    console.log('Navigate to Comprehensive Night Routine');
    setShowComprehensiveNightProductSelection(false);
    setShowComprehensiveNightProductSelectionStep2(false);
    setShowComprehensiveNightProductSelectionStep3(false);
    setShowComprehensiveNightProductSelectionStep4(false);
    setCurrentStep('comprehensiveNightRoutineStep1');
  };

  const handleRoutineSelection = (level, timeOfDay, routineData) => {
    console.log(`Selected ${level} ${timeOfDay} routine:`, routineData);
  // Save the selected routine to skin profile  
    if (timeOfDay === 'evening') {
      // Night Routine Selection
      if (level === 'basic') {
        setShowNightProductSelection(false);
        setShowNightProductSelectionStep2(false);
        setCurrentStep('basicNightRoutineStep1');
      } else if (level === 'moderate') {
        setShowModerateNightProductSelection(false);
        setShowModerateNightProductSelectionStep2(false);
        setShowModerateNightProductSelectionStep3(false);
        setCurrentStep('moderateNightRoutineStep1');
      } else if (level === 'comprehensive' || level === 'intensive') {
        setShowComprehensiveNightProductSelection(false);
        setShowComprehensiveNightProductSelectionStep2(false);
        setShowComprehensiveNightProductSelectionStep3(false);
        setShowComprehensiveNightProductSelectionStep4(false);
        setCurrentStep('comprehensiveNightRoutineStep1');
      }
    } else {
      // Day Routine Selection
      if (level === 'basic') {
        setShowProductSelection(false);
        setShowProductSelectionStep2(false);
        setShowProductSelectionStep3(false);
        setCurrentStep('basicRoutineStep1');
      } else if (level === 'moderate') {
        setShowModerateProductSelection(false);
        setShowModerateProductSelectionStep2(false);
        setShowModerateProductSelectionStep3(false);
        setShowModerateProductSelectionStep4(false);
        setCurrentStep('moderateRoutineStep1');
      } else if (level === 'comprehensive' || level === 'intensive') {
        setShowComprehensiveProductSelection(false);
        setShowComprehensiveProductSelectionStep2(false);
        setShowComprehensiveProductSelectionStep3(false);
        setShowComprehensiveProductSelectionStep4(false);
        setShowComprehensiveProductSelectionStep5(false);
        setCurrentStep('comprehensiveRoutineStep1');
      } else {
        Alert.alert(
          'Coming Soon',
          `${level.charAt(0).toUpperCase() + level.slice(1)} routine will be available soon!`,
          [{ text: 'OK', onPress: () => setCurrentStep('home') }]
        );
      }
    }
  };

  // Basic Routine Handlers
  const handleCleanserSelected = (products) => {
    console.log('Cleansers selected:', products);
    setSelectedProducts(prev => ({ ...prev, cleansers: products }));
    setShowProductSelectionStep2(false);
    setShowProductSelectionStep3(false);
    setCurrentStep('basicRoutineStep2');
  };

  const handleMoisturizerSelected = (products) => {
    console.log('Moisturizers selected:', products);
    setSelectedProducts(prev => ({ ...prev, moisturizers: products }));
    setShowProductSelectionStep3(false);
    setCurrentStep('basicRoutineStep3');
  };

  const handleSunscreenSelected = (products) => {
    console.log('Sunscreens selected:', products);
    setSelectedProducts(prev => ({ ...prev, sunscreens: products }));
  };

  // Basic Night Routine Handlers
const handleNightCleanserSelected = (products) => {
  console.log('Night - Cleansers selected:', products);

  // Save cleanser selection to profile
  setSkinProfile(prev => ({
    ...prev,
    nightRoutine: {
      ...prev.nightRoutine,
      level: 'basic',
      timeOfDay: 'evening',
      products: {
        ...prev.nightRoutine?.products,
        cleansers: products
      }
    }
  }));
  
  setShowNightProductSelectionStep2(false);
  setCurrentStep('basicNightRoutineStep2');
};

const handleNightMoisturizerSelected = (products) => {
  console.log('Night - Moisturizers selected:', products);
  
  // Save the night routine to state
  setSkinProfile(prev => ({
    ...prev,
    nightRoutine: {
      level: 'basic',
      timeOfDay: 'evening',
      products: {
        cleansers: prev.nightRoutine?.products?.cleansers || [],
        moisturizers: products
      },
      completedAt: new Date().toISOString()
    }
  }));
  
  // Show success message
  Alert.alert(
    'Night Routine Saved!',
    'Your basic night routine has been saved successfully.',
    [{ text: 'OK', onPress: () => setCurrentStep('nightRoutine') }]
  );
};

  // Moderate Routine Handlers
  const handleModerateCleanserSelected = (products) => {
    console.log('Moderate - Cleansers selected:', products);
    setShowModerateProductSelectionStep2(false);
    setShowModerateProductSelectionStep3(false);
    setShowModerateProductSelectionStep4(false);
    setCurrentStep('moderateRoutineStep2');
  };

  const handleModerateMoisturizerSelected = (products) => {
    console.log('Moderate - Moisturizers selected:', products);
    setShowModerateProductSelectionStep3(false);
    setShowModerateProductSelectionStep4(false);
    setCurrentStep('moderateRoutineStep3');
  };

  const handleModerateSpecializedSelected = (products) => {
    console.log('Moderate - Specialized products selected:', products);
    setShowModerateProductSelectionStep4(false);
    setCurrentStep('moderateRoutineStep4');
  };

  const handleModerateSunscreenSelected = (products) => {
    console.log('Moderate - Sunscreens selected:', products);
  };

  // Comprehensive Night Routine Handlers
  const handleComprehensiveNightCleanserSelected = (products) => {
    console.log('Comprehensive Night - Cleansers selected:', products);
    setShowComprehensiveNightProductSelectionStep2(false);
    setShowComprehensiveNightProductSelectionStep3(false);
    setShowComprehensiveNightProductSelectionStep4(false);
    setCurrentStep('comprehensiveNightRoutineStep2');
  };

const handleComprehensiveNightMoisturizerSelected = (products) => {
  console.log('Comprehensive Night - Moisturizers selected:', products);
  setShowComprehensiveNightProductSelectionStep3(false);
  setShowComprehensiveNightProductSelectionStep4(false);
  setCurrentStep('comprehensiveNightRoutineStep3');
};

const handleComprehensiveNightPoreCareSelected = (products) => {
  console.log('Comprehensive Night - Pore Care selected:', products);
  setShowComprehensiveNightProductSelectionStep4(false);
  setCurrentStep('comprehensiveNightRoutineStep4');
};

const handleComprehensiveNightAdvancedSelected = (products) => {
  console.log('Comprehensive Night - Advanced treatments selected:', products);
  // This will show completion modal from within the component
};
  // Comprehensive Routine Handlers
  const handleComprehensiveCleanserSelected = (products) => {
    console.log('Comprehensive - Cleansers selected:', products);
    setShowComprehensiveProductSelectionStep2(false);
    setShowComprehensiveProductSelectionStep3(false);
    setShowComprehensiveProductSelectionStep4(false);
    setShowComprehensiveProductSelectionStep5(false);
    setCurrentStep('comprehensiveRoutineStep2');
  };

  const handleComprehensiveMoisturizerSelected = (products) => {
    console.log('Comprehensive - Moisturizers selected:', products);
    setShowComprehensiveProductSelectionStep3(false);
    setShowComprehensiveProductSelectionStep4(false);
    setShowComprehensiveProductSelectionStep5(false);
    setCurrentStep('comprehensiveRoutineStep3');
  };

  const handleComprehensiveSpecializedSelected = (products) => {
    console.log('Comprehensive - Specialized products selected:', products);
    setShowComprehensiveProductSelectionStep4(false);
    setShowComprehensiveProductSelectionStep5(false);
    setCurrentStep('comprehensiveRoutineStep4');
  };

  const handleComprehensiveAdvancedSelected = (products) => {
    console.log('Comprehensive - Advanced treatments selected:', products);
    setShowComprehensiveProductSelectionStep5(false);
    setCurrentStep('comprehensiveRoutineStep5');
  };

  const handleComprehensiveSunscreenSelected = (products) => {
    console.log('Comprehensive - Sunscreens selected:', products);
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
    console.log('🔥 TAB PRESSED:', tabId);
    setActiveTab(tabId);
    if (tabId === 'upload') {
      setCurrentStep('capture');
    } else if (tabId === 'routines') {
      setCurrentStep('routinesHub');
    } else if (tabId === 'library') {
      console.log('🔥 LIBRARY TAB DETECTED!');
      setCurrentStep('library');
    } else {
      console.log('🔥 WENT TO ELSE BLOCK FOR:', tabId);
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
    setShowProductSelection(false);
    setShowProductSelectionStep2(false);
    setShowProductSelectionStep3(false);
    setShowNightProductSelection(false);
    setShowNightProductSelectionStep2(false);
    setShowModerateProductSelection(false);
    setShowModerateProductSelectionStep2(false);
    setShowModerateProductSelectionStep3(false);
    setShowModerateProductSelectionStep4(false);
    setShowComprehensiveProductSelection(false);
    setShowComprehensiveProductSelectionStep2(false);
    setShowComprehensiveProductSelectionStep3(false);
    setShowComprehensiveProductSelectionStep4(false);
    setShowComprehensiveProductSelectionStep5(false);
    setShowSmartRoutineSuggestion(false);
    setConfirmedConcern(null);
    
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

  const renderRoutinesHub = () => {
    console.log('📱 Rendering RoutinesHub screen');
    return (
      <View style={styles.screenContainer}>
        <RoutinesScreen
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToMyDayRoutine={() => setCurrentStep('myDayRoutine')}
          onNavigateToMyNightRoutine={() => setCurrentStep('myNightRoutine')}
          onNavigateToSmartRoutineHub={() => {
            console.log('🔵 onNavigateToSmartRoutineHub called from RoutinesScreen');
            handleNavigateToSmartRoutineHub();
          }}
          style={styles.screenContent}
        />
      </View>
    );
  };
  const renderLibrary = () => {
    console.log('📱 Rendering Library screen');
    return (
      <View style={styles.screenContainer}>
        <LibraryScreen 
          onNavigateHome={() => {
          setCurrentStep('home');
          setActiveTab('home');  // THIS FIXES THE SELECTION ISSUE
        }}
        />
      </View>
    );
  };

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
        onNavigateHome={() => setCurrentStep('home')}
        onSelectRoutine={handleRoutineSelection}
        onNavigateToSkinTest={handleNavigateToSkinTest}
        onNavigateToMyRoutine={handleNavigateToMyDayRoutine}
        style={styles.screenContent}
      />
    </View>
  );

  const renderNightRoutine = () => (
    <View style={styles.screenContainer}>
      <NightRoutineScreen
        onNavigateHome={() => setCurrentStep('home')}
        onSelectRoutine={handleRoutineSelection}
        onNavigateToSkinTest={handleNavigateToSkinTest}
        onNavigateToMyNightRoutine={handleNavigateToMyNightRoutine}
        skinProfile={skinProfile} // ADD THIS LINE
        style={styles.screenContent}
      />
    </View>
  );

  const renderMyDayRoutine = () => (
    <View style={styles.screenContainer}>
      <MyDayRoutine
        onNavigateHome={() => setCurrentStep('home')}
        onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
        onNavigateToBasicRoutine={() => {
          setShowProductSelection(false);
          setShowProductSelectionStep2(false);
          setShowProductSelectionStep3(false);
          setCurrentStep('basicRoutineStep1');
        }}
        onBack={() => setCurrentStep('dayRoutine')}
        style={styles.screenContent}
      />
    </View>
  );

  const renderMyNightRoutine = () => (
    <View style={styles.screenContainer}>
      <MyNightRoutine
        onNavigateHome={() => setCurrentStep('home')}
        onNavigateToNightRoutine={() => setCurrentStep('nightRoutine')}
        onNavigateToBasicNightRoutine={() => {
          setShowNightProductSelection(false);
          setShowNightProductSelectionStep2(false);
          setCurrentStep('basicNightRoutineStep1');
        }}
        onNavigateToModerateNightRoutine={() => {
          setShowModerateNightProductSelection(false);
          setShowModerateNightProductSelectionStep2(false);
          setShowModerateNightProductSelectionStep3(false);
          setCurrentStep('moderateNightRoutineStep1');
        }}
        onNavigateToComprehensiveNightRoutine={handleNavigateToComprehensiveNightRoutine}
        onBack={() => setCurrentStep('nightRoutine')}
        style={styles.screenContent}
      />
    </View>
  );

 // SMART ROUTINE RENDERS
const renderSmartRoutineHub = () => (
  <View style={styles.screenContainer}>
    <SmartRoutineHubScreen
      onNavigateHome={() => setCurrentStep('home')}
      onNavigateToCreate={handleNavigateToSmartRoutine}
      onNavigateToMySmartRoutine={handleNavigateToMySmartRoutine}
      style={styles.screenContent}
    />
  </View>
);

const renderSmartRoutine = () => (
  <View style={styles.screenContainer}>
    <SmartRoutineScreen
      onNavigateHome={() => setCurrentStep('home')}
      onNavigateToDetail={handleNavigateToSmartRoutineIntro}
      preselectedConcern={selectedSmartConcern}
      style={styles.screenContent}
    />
  </View>
);

const renderMySmartRoutine = () => (
  <View style={styles.screenContainer}>
    <MySmartRoutine
      onNavigateHome={() => setCurrentStep('home')}
      onNavigateToSmartRoutineHub={handleNavigateToSmartRoutineHub}
      onNavigateToCreate={handleNavigateToSmartRoutine}
      style={styles.screenContent}
    />
  </View>
);

const renderSmartRoutineIntro = () => (
  <View style={styles.screenContainer}>
    <SmartRoutineIntroScreen
      onNavigateHome={() => setCurrentStep('home')}
      onNavigateBack={handleNavigateBackToSmartRoutine}
      onContinue={handleNavigateToSmartProductSelection}
      concernId={selectedSmartConcern}
      style={styles.screenContent}
    />
  </View>
);

const renderSmartRoutineProductSelectionDay = () => (
  <View style={styles.screenContainer}>
    <SmartRoutineProductSelectionDay
      onNavigateHome={() => setCurrentStep('home')}
      onNavigateBack={() => setCurrentStep('smartRoutineIntro')}
      onContinueToNight={handleSmartRoutineDayComplete}
      concernId={selectedSmartConcern}
      style={styles.screenContent}
    />
  </View>
);

const renderSmartRoutineProductSelectionNight = () => (
  <View style={styles.screenContainer}>
    <SmartRoutineProductSelectionNight
      onNavigateHome={() => setCurrentStep('home')}
      onNavigateBack={handleSmartRoutineBackToDay}
      onNavigateToSmartRoutineHub={handleNavigateToSmartRoutineHub}
      concernId={selectedSmartConcern}
      dayProducts={smartRoutineDayProducts}
      style={styles.screenContent}
    />
  </View>
);
  
  // BASIC NIGHT ROUTINE RENDERS
  const renderBasicNightRoutineStep1 = () => {
    if (!showNightProductSelection) {
      return (
        <View style={styles.screenContainer}>
          <BasicNightRoutineStep1Info
            onNavigateHome={() => setCurrentStep('home')}
            onNavigateToNightRoutine={() => setCurrentStep('nightRoutine')}
            onBack={() => {
              setShowNightProductSelection(false);
              setCurrentStep('nightRoutine');
            }}
            onContinue={() => setShowNightProductSelection(true)}
            currentStep={1}
            internalStep={1}
            style={styles.screenContent}
          />
        </View>
      );
    }
    
    return (
      <View style={styles.screenContainer}>
        <BasicNightRoutineStep1ProductSelection
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToNightRoutine={() => setCurrentStep('nightRoutine')}
          onBack={() => setShowNightProductSelection(false)}
          onContinue={handleNightCleanserSelected}
          currentStep={1}
          internalStep={2}
          style={styles.screenContent}
        />
      </View>
    );
  };
  
  const renderBasicNightRoutineStep2 = () => {
    if (!showNightProductSelectionStep2) {
      return (
        <View style={styles.screenContainer}>
          <BasicNightRoutineStep2Info
            onNavigateHome={() => setCurrentStep('home')}
            onNavigateToNightRoutine={() => setCurrentStep('nightRoutine')}
            onBack={() => {
              setShowNightProductSelectionStep2(false);
              setCurrentStep('basicNightRoutineStep1');
            }}
            onContinue={() => setShowNightProductSelectionStep2(true)}
            currentStep={2}
            internalStep={3}
            style={styles.screenContent}
          />
        </View>
      );
    }
    
    return (
      <View style={styles.screenContainer}>
        <BasicNightRoutineStep2ProductSelection
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToNightRoutine={() => setCurrentStep('nightRoutine')}
          onBack={() => setShowNightProductSelectionStep2(false)}
          onComplete={handleNightMoisturizerSelected}
          currentStep={2}
          internalStep={4}
          style={styles.screenContent}
        />
      </View>
    );
  };

  // MODERATE NIGHT ROUTINE RENDERS
const renderModerateNightRoutineStep1 = () => {
  if (!showModerateNightProductSelection) {
    return (
      <View style={styles.screenContainer}>
        <ModerateNightRoutineStep1Info
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToNightRoutine={() => setCurrentStep('nightRoutine')}
          onBack={() => {
            setShowModerateNightProductSelection(false);
            setCurrentStep('nightRoutine');
          }}
          onContinue={() => setShowModerateNightProductSelection(true)}
          currentStep={1}
          internalStep={1}
          style={styles.screenContent}
        />
      </View>
    );
  }
  
  return (
    <View style={styles.screenContainer}>
      <ModerateNightRoutineStep1ProductSelection
        onNavigateHome={() => setCurrentStep('home')}
        onNavigateToNightRoutine={() => setCurrentStep('nightRoutine')}
        onBack={() => setShowModerateNightProductSelection(false)}
        onContinue={(products) => {  // ✅ FIXED: Changed from onComplete to onContinue
          console.log('Moderate Night - Cleansers selected:', products);
          setShowModerateNightProductSelectionStep2(false);
          setShowModerateNightProductSelectionStep3(false);
          setCurrentStep('moderateNightRoutineStep2');
        }}
        currentStep={1}
        internalStep={2}
        style={styles.screenContent}
      />
    </View>
  );
};

const renderModerateNightRoutineStep2 = () => {
  if (!showModerateNightProductSelectionStep2) {
    return (
      <View style={styles.screenContainer}>
        <ModerateNightRoutineStep2Info
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToNightRoutine={() => setCurrentStep('nightRoutine')}
          onBack={() => {
            setShowModerateNightProductSelectionStep2(false);
            setCurrentStep('moderateNightRoutineStep1');
          }}
          onContinue={() => setShowModerateNightProductSelectionStep2(true)}
          currentStep={2}
          internalStep={3}
          style={styles.screenContent}
        />
      </View>
    );
  }
  
  return (
    <View style={styles.screenContainer}>
      <ModerateNightRoutineStep2ProductSelection
        onNavigateHome={() => setCurrentStep('home')}
        onNavigateToNightRoutine={() => setCurrentStep('nightRoutine')}
        onBack={() => setShowModerateNightProductSelectionStep2(false)}
        onContinue={(products) => {  // ✅ Make sure this says onContinue
          console.log('Moderate Night - Moisturizers selected:', products);
          setShowModerateNightProductSelectionStep3(false);
          setCurrentStep('moderateNightRoutineStep3');
        }}
        currentStep={2}
        internalStep={4}
        style={styles.screenContent}
      />
    </View>
  );
};

const renderModerateNightRoutineStep3 = () => {
  if (!showModerateNightProductSelectionStep3) {
    return (
      <View style={styles.screenContainer}>
        <ModerateNightRoutineStep3Info
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToNightRoutine={() => setCurrentStep('nightRoutine')}
          onBack={() => {
            setShowModerateNightProductSelectionStep3(false);
            setCurrentStep('moderateNightRoutineStep2');
          }}
          onContinue={() => setShowModerateNightProductSelectionStep3(true)}
          currentStep={3}
          internalStep={5}
          style={styles.screenContent}
        />
      </View>
    );
  }
  
  return (
    <View style={styles.screenContainer}>
      <ModerateNightRoutineStep3ProductSelection
        onNavigateHome={() => setCurrentStep('home')}
        onNavigateToNightRoutine={() => setCurrentStep('nightRoutine')}
        onBack={() => setShowModerateNightProductSelectionStep3(false)}
        onComplete={(products) => {  // ✅ Step 3 can use onComplete (final step)
          console.log('Moderate Night - Pore Care selected:', products);
          // This will show completion modal from within the component
        }}
        currentStep={3}
        internalStep={6}
        style={styles.screenContent}
      />
    </View>
  );
};

// COMPREHENSIVE NIGHT ROUTINE RENDERS
const renderComprehensiveNightRoutineStep1 = () => {
  if (!showComprehensiveNightProductSelection) {
    return (
      <View style={styles.screenContainer}>
        <ComprehensiveNightRoutineStep1Info
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToNightRoutine={() => setCurrentStep('nightRoutine')}
          onBack={() => {
            setShowComprehensiveNightProductSelection(false);
            setCurrentStep('nightRoutine');
          }}
          onContinue={() => setShowComprehensiveNightProductSelection(true)}
          currentStep={1}
          internalStep={1}
          style={styles.screenContent}
        />
      </View>
    );
  }
  
  return (
    <View style={styles.screenContainer}>
      <ComprehensiveNightRoutineStep1ProductSelection
        onNavigateHome={() => setCurrentStep('home')}
        onNavigateToNightRoutine={() => setCurrentStep('nightRoutine')}
        onBack={() => setShowComprehensiveNightProductSelection(false)}
        onContinue={handleComprehensiveNightCleanserSelected}
        currentStep={1}
        internalStep={2}
        style={styles.screenContent}
      />
    </View>
  );
};

const renderComprehensiveNightRoutineStep2 = () => {
  if (!showComprehensiveNightProductSelectionStep2) {
    return (
      <View style={styles.screenContainer}>
        <ComprehensiveNightRoutineStep2Info
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToNightRoutine={() => setCurrentStep('nightRoutine')}
          onBack={() => {
            setShowComprehensiveNightProductSelectionStep2(false);
            setCurrentStep('comprehensiveNightRoutineStep1');
          }}
          onContinue={() => setShowComprehensiveNightProductSelectionStep2(true)}
          currentStep={2}
          internalStep={3}
          style={styles.screenContent}
        />
      </View>
    );
  }
  
  return (
    <View style={styles.screenContainer}>
      <ComprehensiveNightRoutineStep2ProductSelection
        onNavigateHome={() => setCurrentStep('home')}
        onNavigateToNightRoutine={() => setCurrentStep('nightRoutine')}
        onBack={() => setShowComprehensiveNightProductSelectionStep2(false)}
        onContinue={handleComprehensiveNightMoisturizerSelected}
        currentStep={2}
        internalStep={4}
        style={styles.screenContent}
      />
    </View>
  );
};

const renderComprehensiveNightRoutineStep3 = () => {
  if (!showComprehensiveNightProductSelectionStep3) {
    return (
      <View style={styles.screenContainer}>
        <ComprehensiveNightRoutineStep3Info
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToNightRoutine={() => setCurrentStep('nightRoutine')}
          onBack={() => {
            setShowComprehensiveNightProductSelectionStep3(false);
            setCurrentStep('comprehensiveNightRoutineStep2');
          }}
          onContinue={() => setShowComprehensiveNightProductSelectionStep3(true)}
          currentStep={3}
          internalStep={5}
          style={styles.screenContent}
        />
      </View>
    );
  }
  
  return (
    <View style={styles.screenContainer}>
      <ComprehensiveNightRoutineStep3ProductSelection
        onNavigateHome={() => setCurrentStep('home')}
        onNavigateToNightRoutine={() => setCurrentStep('nightRoutine')}
        onBack={() => setShowComprehensiveNightProductSelectionStep3(false)}
        onContinue={handleComprehensiveNightPoreCareSelected}
        currentStep={3}
        internalStep={6}
        style={styles.screenContent}
      />
    </View>
  );
};

const renderComprehensiveNightRoutineStep4 = () => {
  if (!showComprehensiveNightProductSelectionStep4) {
    return (
      <View style={styles.screenContainer}>
        <ComprehensiveNightRoutineStep4Info
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToNightRoutine={() => setCurrentStep('nightRoutine')}
          onBack={() => {
            setShowComprehensiveNightProductSelectionStep4(false);
            setCurrentStep('comprehensiveNightRoutineStep3');
          }}
          onContinue={() => setShowComprehensiveNightProductSelectionStep4(true)}
          currentStep={4}
          internalStep={7}
          style={styles.screenContent}
        />
      </View>
    );
  }
  
  return (
    <View style={styles.screenContainer}>
      <ComprehensiveNightRoutineStep4ProductSelection
        onNavigateHome={() => setCurrentStep('home')}
        onNavigateToNightRoutine={() => setCurrentStep('nightRoutine')}
        onBack={() => setShowComprehensiveNightProductSelectionStep4(false)}
        onComplete={handleComprehensiveNightAdvancedSelected}
        currentStep={4}
        internalStep={8}
        style={styles.screenContent}
      />
    </View>
  );
};

  // BASIC ROUTINE RENDERS
  const renderBasicRoutineStep1 = () => {
    if (!showProductSelection) {
      return (
        <View style={styles.screenContainer}>
          <BasicRoutineStep1Info
            onNavigateHome={() => setCurrentStep('home')}
            onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
            onBack={() => {
              setShowProductSelection(false);
              setCurrentStep('dayRoutine');
            }}
            onContinue={() => setShowProductSelection(true)}
            currentStep={1}
            internalStep={1}
            style={styles.screenContent}
          />
        </View>
      );
    }
    
    return (
      <View style={styles.screenContainer}>
        <BasicRoutineProductSelection
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
          onBack={() => setShowProductSelection(false)}
          onContinue={handleCleanserSelected}
          currentStep={1}
          internalStep={2}
          style={styles.screenContent}
        />
      </View>
    );
  };

  const renderBasicRoutineStep2 = () => {
    if (!showProductSelectionStep2) {
      return (
        <View style={styles.screenContainer}>
          <BasicRoutineStep2Info
            onNavigateHome={() => setCurrentStep('home')}
            onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
            onBack={() => {
              setShowProductSelectionStep2(false);
              setCurrentStep('basicRoutineStep1');
            }}
            onContinue={() => setShowProductSelectionStep2(true)}
            currentStep={2}
            internalStep={3}
            style={styles.screenContent}
          />
        </View>
      );
    }
    
    return (
      <View style={styles.screenContainer}>
        <BasicRoutineStep2ProductSelection
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
          onBack={() => setShowProductSelectionStep2(false)}
          onContinue={handleMoisturizerSelected}
          currentStep={2}
          internalStep={4}
          style={styles.screenContent}
        />
      </View>
    );
  };

  const renderBasicRoutineStep3 = () => {
    if (!showProductSelectionStep3) {
      return (
        <View style={styles.screenContainer}>
          <BasicRoutineStep3Info
            onNavigateHome={() => setCurrentStep('home')}
            onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
            onBack={() => {
              setShowProductSelectionStep3(false);
              setCurrentStep('basicRoutineStep2');
            }}
            onContinue={() => setShowProductSelectionStep3(true)}
            currentStep={3}
            internalStep={5}
            style={styles.screenContent}
          />
        </View>
      );
    }
    
    return (
      <View style={styles.screenContainer}>
        <BasicRoutineStep3ProductSelection
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
          onBack={() => setShowProductSelectionStep3(false)}
          onComplete={handleSunscreenSelected}
          currentStep={3}
          internalStep={6}
          style={styles.screenContent}
        />
      </View>
    );
  };

  // MODERATE ROUTINE RENDERS
  const renderModerateRoutineStep1 = () => {
    if (!showModerateProductSelection) {
      return (
        <View style={styles.screenContainer}>
          <ModerateRoutineStep1Info
            onNavigateHome={() => setCurrentStep('home')}
            onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
            onBack={() => {
              setShowModerateProductSelection(false);
              setCurrentStep('dayRoutine');
            }}
            onContinue={() => setShowModerateProductSelection(true)}
            currentStep={1}
            internalStep={1}
            style={styles.screenContent}
          />
        </View>
      );
    }
    
    return (
      <View style={styles.screenContainer}>
        <ModerateRoutineStep1ProductSelection
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
          onBack={() => setShowModerateProductSelection(false)}
          onContinue={handleModerateCleanserSelected}
          currentStep={1}
          internalStep={2}
          style={styles.screenContent}
        />
      </View>
    );
  };

  const renderModerateRoutineStep2 = () => {
    if (!showModerateProductSelectionStep2) {
      return (
        <View style={styles.screenContainer}>
          <ModerateRoutineStep2Info
            onNavigateHome={() => setCurrentStep('home')}
            onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
            onBack={() => {
              setShowModerateProductSelectionStep2(false);
              setCurrentStep('moderateRoutineStep1');
            }}
            onContinue={() => setShowModerateProductSelectionStep2(true)}
            currentStep={2}
            internalStep={3}
            style={styles.screenContent}
          />
        </View>
      );
    }
    
    return (
      <View style={styles.screenContainer}>
        <ModerateRoutineStep2ProductSelection
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
          onBack={() => setShowModerateProductSelectionStep2(false)}
          onContinue={handleModerateMoisturizerSelected}
          currentStep={2}
          internalStep={4}
          style={styles.screenContent}
        />
      </View>
    );
  };

  const renderModerateRoutineStep3 = () => {
    if (!showModerateProductSelectionStep3) {
      return (
        <View style={styles.screenContainer}>
          <ModerateRoutineStep3Info
            onNavigateHome={() => setCurrentStep('home')}
            onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
            onBack={() => {
              setShowModerateProductSelectionStep3(false);
              setCurrentStep('moderateRoutineStep2');
            }}
            onContinue={() => setShowModerateProductSelectionStep3(true)}
            currentStep={3}
            internalStep={5}
            style={styles.screenContent}
          />
        </View>
      );
    }
    
    return (
      <View style={styles.screenContainer}>
        <ModerateRoutineStep3ProductSelection
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
          onBack={() => setShowModerateProductSelectionStep3(false)}
          onContinue={handleModerateSpecializedSelected}
          currentStep={3}
          internalStep={6}
          style={styles.screenContent}
        />
      </View>
    );
  };

  const renderModerateRoutineStep4 = () => {
    if (!showModerateProductSelectionStep4) {
      return (
        <View style={styles.screenContainer}>
          <ModerateRoutineStep4Info
            onNavigateHome={() => setCurrentStep('home')}
            onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
            onBack={() => {
              setShowModerateProductSelectionStep4(false);
              setCurrentStep('moderateRoutineStep3');
            }}
            onContinue={() => setShowModerateProductSelectionStep4(true)}
            currentStep={4}
            internalStep={7}
            style={styles.screenContent}
          />
        </View>
      );
    }
    
    return (
      <View style={styles.screenContainer}>
        <ModerateRoutineStep4ProductSelection
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
          onBack={() => setShowModerateProductSelectionStep4(false)}
          onComplete={handleModerateSunscreenSelected}
          currentStep={4}
          internalStep={8}
          style={styles.screenContent}
        />
      </View>
    );
  };

  // COMPREHENSIVE ROUTINE RENDERS
  const renderComprehensiveRoutineStep1 = () => {
    if (!showComprehensiveProductSelection) {
      return (
        <View style={styles.screenContainer}>
          <ComprehensiveRoutineStep1Info
            onNavigateHome={() => setCurrentStep('home')}
            onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
            onBack={() => {
              setShowComprehensiveProductSelection(false);
              setCurrentStep('dayRoutine');
            }}
            onContinue={() => setShowComprehensiveProductSelection(true)}
            currentStep={1}
            internalStep={1}
            style={styles.screenContent}
          />
        </View>
      );
    }
    
    return (
      <View style={styles.screenContainer}>
        <ComprehensiveRoutineStep1ProductSelection
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
          onBack={() => setShowComprehensiveProductSelection(false)}
          onContinue={handleComprehensiveCleanserSelected}
          currentStep={1}
          internalStep={2}
          style={styles.screenContent}
        />
      </View>
    );
  };

  const renderComprehensiveRoutineStep2 = () => {
    if (!showComprehensiveProductSelectionStep2) {
      return (
        <View style={styles.screenContainer}>
          <ComprehensiveRoutineStep2Info
            onNavigateHome={() => setCurrentStep('home')}
            onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
            onBack={() => {
              setShowComprehensiveProductSelectionStep2(false);
              setCurrentStep('comprehensiveRoutineStep1');
            }}
            onContinue={() => setShowComprehensiveProductSelectionStep2(true)}
            currentStep={2}
            internalStep={3}
            style={styles.screenContent}
          />
        </View>
      );
    }
    
    return (
      <View style={styles.screenContainer}>
        <ComprehensiveRoutineStep2ProductSelection
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
          onBack={() => setShowComprehensiveProductSelectionStep2(false)}
          onContinue={handleComprehensiveMoisturizerSelected}
          currentStep={2}
          internalStep={4}
          style={styles.screenContent}
        />
      </View>
    );
  };

  const renderComprehensiveRoutineStep3 = () => {
    if (!showComprehensiveProductSelectionStep3) {
      return (
        <View style={styles.screenContainer}>
          <ComprehensiveRoutineStep3Info
            onNavigateHome={() => setCurrentStep('home')}
            onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
            onBack={() => {
              setShowComprehensiveProductSelectionStep3(false);
              setCurrentStep('comprehensiveRoutineStep2');
            }}
            onContinue={() => setShowComprehensiveProductSelectionStep3(true)}
            currentStep={3}
            internalStep={5}
            style={styles.screenContent}
          />
        </View>
      );
    }
    
    return (
      <View style={styles.screenContainer}>
        <ComprehensiveRoutineStep3ProductSelection
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
          onBack={() => setShowComprehensiveProductSelectionStep3(false)}
          onContinue={handleComprehensiveSpecializedSelected}
          currentStep={3}
          internalStep={6}
          style={styles.screenContent}
        />
      </View>
    );
  };

  const renderComprehensiveRoutineStep4 = () => {
    if (!showComprehensiveProductSelectionStep4) {
      return (
        <View style={styles.screenContainer}>
          <ComprehensiveRoutineStep4Info
            onNavigateHome={() => setCurrentStep('home')}
            onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
            onBack={() => {
              setShowComprehensiveProductSelectionStep4(false);
              setCurrentStep('comprehensiveRoutineStep3');
            }}
            onContinue={() => setShowComprehensiveProductSelectionStep4(true)}
            currentStep={4}
            internalStep={7}
            style={styles.screenContent}
          />
        </View>
      );
    }
    
    return (
      <View style={styles.screenContainer}>
        <ComprehensiveRoutineStep4ProductSelection
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
          onBack={() => setShowComprehensiveProductSelectionStep4(false)}
          onContinue={handleComprehensiveAdvancedSelected}
          currentStep={4}
          internalStep={8}
          style={styles.screenContent}
        />
      </View>
    );
  };

  const renderComprehensiveRoutineStep5 = () => {
    if (!showComprehensiveProductSelectionStep5) {
      return (
        <View style={styles.screenContainer}>
          <ComprehensiveRoutineStep5Info
            onNavigateHome={() => setCurrentStep('home')}
            onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
            onBack={() => {
              setShowComprehensiveProductSelectionStep5(false);
              setCurrentStep('comprehensiveRoutineStep4');
            }}
            onContinue={() => setShowComprehensiveProductSelectionStep5(true)}
            currentStep={5}
            internalStep={9}
            style={styles.screenContent}
          />
        </View>
      );
    }
    
    return (
      <View style={styles.screenContainer}>
        <ComprehensiveRoutineStep5ProductSelection
          onNavigateHome={() => setCurrentStep('home')}
          onNavigateToDayRoutine={() => setCurrentStep('dayRoutine')}
          onBack={() => setShowComprehensiveProductSelectionStep5(false)}
          onComplete={handleComprehensiveSunscreenSelected}
          currentStep={5}
          internalStep={10}
          style={styles.screenContent}
        />
      </View>
    );
  };

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
      <BrainLoader />
        
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

  const renderResults = () => {
    const hasDetections = analysisData?.total_found > 0;
    const isConfirmed = confirmedConcern !== null;
    
    const handleContinuePress = () => {
      if (hasDetections && !isConfirmed) {
        // Show gentle reminder popup
        Alert.alert(
          'Confirm Detection',
          'Please confirm the detection breakdown to continue with your personalized routine.',
          [{ text: 'OK', style: 'default' }]
        );
        return;
      }
      
      if (isConfirmed) {
        setShowSmartRoutineSuggestion(true);
      } else {
        handleContinueToSkinTest();
      }
    };
  
    const getButtonTitle = () => {
      if (hasDetections && !isConfirmed) {
        return 'Confirm';
      }
      return isConfirmed ? 'Create Routine' : 'Continue';
    };
  
    return (
      <View style={styles.resultsContainer}>
        <AnalysisResults
          analysisData={analysisData}
          annotatedImageBlob={annotatedImageBlob}
          onConfirmedConcern={handleConcernConfirmed}
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
            title={getButtonTitle()}
            onPress={handleContinuePress}
            disabled={hasDetections && !isConfirmed}
            style={[
              styles.actionButtonRight,
              hasDetections && !isConfirmed && styles.actionButtonDisabled
            ]}
          />
        </View>
  
        <SmartRoutineSuggestionModal
          visible={showSmartRoutineSuggestion}
          onClose={handleSkipSmartRoutine}
          onCreateRoutine={handleCreateSmartRoutineFromAnalysis}
          selectedConcern={confirmedConcern}
        />
      </View>
    );
  };

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
        {/* ONBOARDING FLOW */}
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
        {isOnboardingComplete && currentStep === 'routinesHub' && renderRoutinesHub()}
        {isOnboardingComplete && currentStep === 'dayRoutine' && renderDayRoutine()}
        {isOnboardingComplete && currentStep === 'nightRoutine' && renderNightRoutine()}
        {isOnboardingComplete && currentStep === 'myDayRoutine' && renderMyDayRoutine()}
        {isOnboardingComplete && currentStep === 'myNightRoutine' && renderMyNightRoutine()}
        {isOnboardingComplete && currentStep === 'library' && renderLibrary()}

        {/* Smart Routine Flow */}
        {isOnboardingComplete && currentStep === 'smartRoutineHub' && renderSmartRoutineHub()}
        {isOnboardingComplete && currentStep === 'smartRoutine' && renderSmartRoutine()}
        {isOnboardingComplete && currentStep === 'mySmartRoutine' && renderMySmartRoutine()}
        {isOnboardingComplete && currentStep === 'smartRoutineIntro' && renderSmartRoutineIntro()}
        {isOnboardingComplete && currentStep === 'smartRoutineProductSelectionDay' && renderSmartRoutineProductSelectionDay()}
        {isOnboardingComplete && currentStep === 'smartRoutineProductSelectionNight' && renderSmartRoutineProductSelectionNight()}

        {/* Basic Night Routine Flow */}
        {isOnboardingComplete && currentStep === 'basicNightRoutineStep1' && renderBasicNightRoutineStep1()}
        {isOnboardingComplete && currentStep === 'basicNightRoutineStep2' && renderBasicNightRoutineStep2()}
        {isOnboardingComplete && currentStep === 'basicNightRoutineStep2' && renderBasicNightRoutineStep2()}
        
        {/* Moderate Night Routine Flow */}
        {isOnboardingComplete && currentStep === 'moderateNightRoutineStep1' && renderModerateNightRoutineStep1()}
        {isOnboardingComplete && currentStep === 'moderateNightRoutineStep2' && renderModerateNightRoutineStep2()}
        {isOnboardingComplete && currentStep === 'moderateNightRoutineStep3' && renderModerateNightRoutineStep3()}
        
        {/* Comprehensive Night Routine Flow */}
        {isOnboardingComplete && currentStep === 'comprehensiveNightRoutineStep1' && renderComprehensiveNightRoutineStep1()}
        {isOnboardingComplete && currentStep === 'comprehensiveNightRoutineStep2' && renderComprehensiveNightRoutineStep2()}
        {isOnboardingComplete && currentStep === 'comprehensiveNightRoutineStep3' && renderComprehensiveNightRoutineStep3()}
        {isOnboardingComplete && currentStep === 'comprehensiveNightRoutineStep4' && renderComprehensiveNightRoutineStep4()}

        {/* Basic Routine Flow */}
        {isOnboardingComplete && currentStep === 'basicRoutineStep1' && renderBasicRoutineStep1()}
        {isOnboardingComplete && currentStep === 'basicRoutineStep2' && renderBasicRoutineStep2()}
        {isOnboardingComplete && currentStep === 'basicRoutineStep3' && renderBasicRoutineStep3()}
        
        {/* Moderate Routine Flow */}
        {isOnboardingComplete && currentStep === 'moderateRoutineStep1' && renderModerateRoutineStep1()}
        {isOnboardingComplete && currentStep === 'moderateRoutineStep2' && renderModerateRoutineStep2()}
        {isOnboardingComplete && currentStep === 'moderateRoutineStep3' && renderModerateRoutineStep3()}
        {isOnboardingComplete && currentStep === 'moderateRoutineStep4' && renderModerateRoutineStep4()}
        
        {/* Comprehensive Routine Flow */}
        {isOnboardingComplete && currentStep === 'comprehensiveRoutineStep1' && renderComprehensiveRoutineStep1()}
        {isOnboardingComplete && currentStep === 'comprehensiveRoutineStep2' && renderComprehensiveRoutineStep2()}
        {isOnboardingComplete && currentStep === 'comprehensiveRoutineStep3' && renderComprehensiveRoutineStep3()}
        {isOnboardingComplete && currentStep === 'comprehensiveRoutineStep4' && renderComprehensiveRoutineStep4()}
        {isOnboardingComplete && currentStep === 'comprehensiveRoutineStep5' && renderComprehensiveRoutineStep5()}
        
        {/* Analysis Flow */}
        {isOnboardingComplete && currentStep === 'capture' && renderCapture()}
        {isOnboardingComplete && currentStep === 'analyzing' && renderAnalyzing()}
        {isOnboardingComplete && currentStep === 'results' && renderResults()}
        
        {/* Skin Test Flow */}
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

      {/* Bottom Navigation */}
      {isOnboardingComplete && (
        currentStep === 'home' ||
        currentStep === 'routinesHub' ||
        currentStep === 'smartRoutine' ||
        currentStep === 'smartRoutineHub' ||
        currentStep === 'library' ||
        currentStep === 'smartRoutine' ||
        currentStep === 'mySmartRoutine' ||
        currentStep === 'smartRoutineIntro' ||
        currentStep === 'smartRoutineProductSelectionDay' ||
        currentStep === 'smartRoutineProductSelectionNight' || 
        currentStep === 'results' || 
        currentStep === 'dayRoutine' || 
        currentStep === 'nightRoutine' ||
        currentStep === 'myDayRoutine' ||
        currentStep === 'myNightRoutine' ||
        currentStep === 'smartRoutine' ||
        currentStep === 'smartRoutineDetail' ||
        currentStep === 'basicNightRoutineStep1' ||
        currentStep === 'basicNightRoutineStep2' ||
        currentStep === 'moderateNightRoutineStep1' ||
        currentStep === 'moderateNightRoutineStep2' ||
        currentStep === 'moderateNightRoutineStep3' ||
        currentStep === 'comprehensiveNightRoutineStep1' ||
        currentStep === 'comprehensiveNightRoutineStep2' ||
        currentStep === 'comprehensiveNightRoutineStep3' ||
        currentStep === 'comprehensiveNightRoutineStep4' ||
        currentStep === 'basicRoutineStep1' ||
        currentStep === 'basicRoutineStep2' ||
        currentStep === 'basicRoutineStep3' ||
        currentStep === 'moderateRoutineStep1' ||
        currentStep === 'moderateRoutineStep2' ||
        currentStep === 'moderateRoutineStep3' ||
        currentStep === 'moderateRoutineStep4' ||
        currentStep === 'comprehensiveRoutineStep1' ||
        currentStep === 'comprehensiveRoutineStep2' ||
        currentStep === 'comprehensiveRoutineStep3' ||
        currentStep === 'comprehensiveRoutineStep4' ||
        currentStep === 'comprehensiveRoutineStep5' ||
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
  actionButtonRight: {
    flex: 1,
    paddingVertical: 12,
    marginVertical: 0,
  },
  brainLoaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  brainIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  brainIcon: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brainCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: BRAND_COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  brainImage: {
    width: 56,
    height: 56,
    tintColor: BRAND_COLORS.white,
  },
  glowRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    backgroundColor: 'transparent',
  },
});