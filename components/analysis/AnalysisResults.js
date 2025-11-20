// components/analysis/AnalysisResults.js - REMOVED WHITE BACKGROUND FROM CITATION
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');
const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
};

const BrainLoader = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
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
              source={require('../../assets/images/brain.png')} 
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

const AI_TO_CONCERN_MAP = {
  'dark_spot': 'marks',
  'dark spot': 'marks',
  'dark_spots': 'marks',
  'papules': 'papules',
  'papule': 'papules',
  'pustules': 'papules',
  'pustule': 'papules',
  'blackheads': 'blackheads',
  'blackhead': 'blackheads',
  'whiteheads': 'whiteheads',
  'whitehead': 'whiteheads',
  'nodules': 'nodules',
  'nodule': 'nodules',
};

const ACNE_TYPE_INFO = {
  papules: {
    name: 'Papules',
    description: 'Small, raised, red bumps without pus. They form when pores become clogged and inflamed.'
  },
  pustules: {
    name: 'Pustules',
    description: 'Red bumps with white or yellow pus at the center. Similar to papules but with visible pus.'
  },
  blackheads: {
    name: 'Blackheads',
    description: 'Open pores clogged with oil and dead skin cells. They appear dark due to oxidation, not dirt.'
  },
  whiteheads: {
    name: 'Whiteheads',
    description: 'Closed pores clogged with oil and dead skin cells. They appear as small white or flesh-colored bumps.'
  },
  dark_spots: {
    name: 'Dark Spots',
    description: 'Post-inflammatory marks left after acne heals. They fade over time but can be treated with specific ingredients.'
  },
  dark_spot: {
    name: 'Dark Spots',
    description: 'Post-inflammatory marks left after acne heals. They fade over time but can be treated with specific ingredients.'
  },
  nodules: {
    name: 'Nodules',
    description: 'Large, painful bumps deep under the skin. They form when clogged pores develop deeper in the skin.'
  },
};

export const AnalysisResults = ({ 
  analysisData, 
  annotatedImageBlob,
  onConfirmedConcern,
  onNavigateHome,
  style = {} 
}) => {
  const [annotatedImageUri, setAnnotatedImageUri] = useState(null);
  const [confirmedType, setConfirmedType] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedInfoType, setSelectedInfoType] = useState(null);

  useEffect(() => {
    if (annotatedImageBlob) {
      if (typeof annotatedImageBlob === 'string' && annotatedImageBlob.startsWith('data:')) {
        setAnnotatedImageUri(annotatedImageBlob);
      } else {
        setAnnotatedImageUri(null);
      }
    } else {
      setAnnotatedImageUri(null);
    }
  }, [annotatedImageBlob]);

  const handleConfirmSelection = (type) => {
    const newSelection = confirmedType === type ? null : type;
    setConfirmedType(newSelection);
    
    if (newSelection && onConfirmedConcern) {
      const concernId = AI_TO_CONCERN_MAP[newSelection];
      if (concernId) {
        onConfirmedConcern(concernId);
      }
    } else if (onConfirmedConcern) {
      onConfirmedConcern(null);
    }
  };

  const handleInfoPress = (type) => {
    setSelectedInfoType(type);
    setShowInfoModal(true);
  };

  const closeInfoModal = () => {
    setShowInfoModal(false);
    setSelectedInfoType(null);
  };

  if (!analysisData) {
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.errorText}>No analysis data available</Text>
      </View>
    );
  }

  const { success, predictions = [], total_found = 0 } = analysisData;
  
  if (!success) {
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.errorText}>
          Analysis failed: {analysisData.error || 'Unknown error'}
        </Text>
      </View>
    );
  }

  const groupedPredictions = predictions.reduce((groups, prediction) => {
    const type = prediction.class.toLowerCase().replace(' ', '_');
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(prediction);
    return groups;
  }, {});

  const acneTypes = {
    papules: { color: '#FF6B6B', name: 'Papules', indicator: '●' },
    pustules: { color: '#4ECDC4', name: 'Pustules', indicator: '●' },
    blackheads: { color: '#45B7D1', name: 'Blackheads', indicator: '●' },
    whiteheads: { color: '#96CEB4', name: 'Whiteheads', indicator: '●' },
    dark_spots: { color: '#FECA57', name: 'Dark Spots', indicator: '●' },
    dark_spot: { color: '#FECA57', name: 'Dark Spots', indicator: '●' },
    nodules: { color: '#FF6B6B', name: 'Nodules', indicator: '●' },
  };

  return (
    <ScrollView 
      style={[styles.container, style]} 
      showsVerticalScrollIndicator={true}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.logoHeader}>
        <TouchableOpacity onPress={onNavigateHome} style={styles.logoButton}>
          <Image 
            source={require('../../assets/images/dracne-logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>
          Your <Text style={styles.titleHighlight}>AI Analysis</Text>
        </Text>
        <Text style={styles.subtitle}>
          {total_found > 0 
            ? `We detected ${total_found} spot${total_found !== 1 ? 's' : ''} on your skin`
            : 'Your skin analysis is complete'
          }
        </Text>
      </View>

      <View style={styles.imageSection}>
        {annotatedImageUri ? (
          <View style={styles.imageCard}>
            <Image 
              source={{ uri: annotatedImageUri }}
              style={styles.prominentImage}
              resizeMode="contain"
            />
          </View>
        ) : total_found > 0 ? (
          <View style={[styles.imageCard, styles.imageLoadingContainer]}>
            <BrainLoader />
            <Text style={styles.imageLoadingText}>Processing visual annotations...</Text>
          </View>
        ) : (
          <View style={[styles.imageCard, styles.noImageContainer]}>
            <View style={styles.successIcon}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
            <Text style={styles.noImageText}>No detections to visualize</Text>
          </View>
        )}
      </View>

      {total_found > 0 ? (
        <View style={styles.resultsSection}>
          <View style={styles.confirmHeader}>
            <Text style={styles.resultsTitle}>Detection Breakdown</Text>
            <Text style={styles.confirmTitle}>Confirm</Text>
          </View>
          
          <View style={styles.compactResults}>
            {Object.entries(groupedPredictions).map(([type, detections], index) => {
              const typeInfo = acneTypes[type] || { 
                color: '#999', 
                name: type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' '),
                indicator: '●'
              };
              
              const avgConfidence = Math.round(
                detections.reduce((sum, d) => sum + d.confidence, 0) / detections.length * 100
              );
              
              const isLast = index === Object.entries(groupedPredictions).length - 1;
              const isConfirmed = confirmedType === type;
              
              return (
                <View 
                  key={type} 
                  style={[
                    styles.detectionRow,
                    isLast && styles.detectionRowLast
                  ]}
                >
                  <Text style={[styles.detectionIndicator, { color: typeInfo.color }]}>
                    {typeInfo.indicator}
                  </Text>
                  
                  <View style={styles.nameWithInfo}>
                    <Text style={styles.detectionName}>{typeInfo.name}</Text>
                    <TouchableOpacity 
                      onPress={() => handleInfoPress(type)}
                      style={styles.infoButton}
                      activeOpacity={0.6}
                    >
                      <View style={styles.infoIcon}>
                        <Text style={styles.infoIconText}>i</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.detectionStats}>
                    <Text style={styles.detectionCount}>×{detections.length}</Text>
                    <View style={styles.confidenceBadge}>
                      <Text style={styles.detectionConfidence}>{avgConfidence}%</Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity 
                    style={[
                      styles.confirmCircle,
                      isConfirmed && styles.confirmCircleSelected
                    ]}
                    onPress={() => handleConfirmSelection(type)}
                    activeOpacity={0.7}
                  >
                    {isConfirmed && (
                      <Text style={styles.confirmCheckmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      ) : (
        <View style={styles.successMessage}>
          <View style={styles.successIconLarge}>
            <Text style={styles.checkmarkLarge}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Great News!</Text>
          <Text style={styles.successText}>
            No visible acne detected in your photo.
          </Text>
        </View>
      )}

      <View style={styles.citationContainer}>
        <Text style={styles.citationText}>
          AI detection powered by Roboflow facial-acne-detection model. Educational purposes only - not medical diagnosis. Consult a dermatologist for professional evaluation and treatment.
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.aad.org/public/diseases/acne')}>
          <Text style={styles.citationLink}>Sources</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showInfoModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closeInfoModal}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={closeInfoModal}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedInfoType && ACNE_TYPE_INFO[selectedInfoType]?.name}
            </Text>
            <Text style={styles.modalDescription}>
              {selectedInfoType && ACNE_TYPE_INFO[selectedInfoType]?.description}
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingBottom: 150,
  },
  logoHeader: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  logoButton: {
    alignSelf: 'flex-start',
  },
  logo: {
    width: 70,
    height: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
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
  imageSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  imageCard: {
    width: width - 48,
    height: Math.min(width - 48, 280),
    borderRadius: 16,
    backgroundColor: BRAND_COLORS.white,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  prominentImage: {
    width: '100%',
    height: '100%',
  },
  imageLoadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLoadingText: {
    marginTop: 16,
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
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
  noImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: BRAND_COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  checkmark: {
    fontSize: 36,
    color: BRAND_COLORS.white,
    fontWeight: '700',
  },
  noImageText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  resultsSection: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  confirmHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: BRAND_COLORS.black,
  },
  confirmTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  compactResults: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  detectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detectionRowLast: {
    borderBottomWidth: 0,
  },
  detectionIndicator: {
    fontSize: 20,
    width: 36,
    fontWeight: '700',
  },
  nameWithInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detectionName: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.black,
  },
  infoButton: {
    padding: 2,
  },
  infoIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIconText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7CB342',
    fontStyle: 'normal',
  },
  detectionStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 12,
  },
  detectionCount: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.primary,
  },
  confidenceBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  detectionConfidence: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4CAF50',
  },
  confirmCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#DDD',
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmCircleSelected: {
    borderColor: BRAND_COLORS.primary,
    backgroundColor: BRAND_COLORS.primary,
  },
  confirmCheckmark: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  successMessage: {
    alignItems: 'center',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 32,
    marginHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  successIconLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: BRAND_COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  checkmarkLarge: {
    fontSize: 48,
    color: BRAND_COLORS.white,
    fontWeight: '700',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: BRAND_COLORS.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  errorText: {
    fontSize: 16,
    color: BRAND_COLORS.secondary,
    textAlign: 'center',
    padding: 20,
  },
  citationContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  citationText: {
    fontSize: 11,
    color: '#999999',
    lineHeight: 16,
    textAlign: 'center',
  },
  citationLink: {
    fontSize: 11,
    color: '#999999',
    textAlign: 'center',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  modalContent: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: BRAND_COLORS.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    textAlign: 'center',
  },
});