// components/analysis/AnalysisResults.js - WITH BLOCKED BUTTON STATE
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
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

// Map AI classes to Smart Routine concern IDs
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

export const AnalysisResults = ({ 
  analysisData, 
  annotatedImageBlob,
  onConfirmedConcern,
  style = {} 
}) => {
  const [annotatedImageUri, setAnnotatedImageUri] = useState(null);
  const [confirmedType, setConfirmedType] = useState(null);

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
    // Toggle selection - if already selected, unselect it
    const newSelection = confirmedType === type ? null : type;
    setConfirmedType(newSelection);
    
    // Pass the concern ID to parent if selected
    if (newSelection && onConfirmedConcern) {
      const concernId = AI_TO_CONCERN_MAP[newSelection];
      if (concernId) {
        onConfirmedConcern(concernId);
      }
    } else if (onConfirmedConcern) {
      onConfirmedConcern(null);
    }
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

  // Group predictions by type for compact display
  const groupedPredictions = predictions.reduce((groups, prediction) => {
    const type = prediction.class.toLowerCase().replace(' ', '_');
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(prediction);
    return groups;
  }, {});

  const acneTypes = {
    papules: { color: '#FF6B6B', name: 'Papules', emoji: '🔴' },
    pustules: { color: '#4ECDC4', name: 'Pustules', emoji: '🟡' },
    blackheads: { color: '#45B7D1', name: 'Blackheads', emoji: '⚫' },
    whiteheads: { color: '#96CEB4', name: 'Whiteheads', emoji: '⚪' },
    dark_spots: { color: '#FECA57', name: 'Dark Spots', emoji: '🔵' },
    dark_spot: { color: '#FECA57', name: 'Dark Spots', emoji: '🔵' },
    nodules: { color: '#FF6B6B', name: 'Nodules', emoji: '🔴' },
  };

  return (
    <View style={[styles.container, style]}>
      {/* Logo - Top Left */}
      <View style={styles.logoHeader}>
        <Image 
          source={require('../../assets/images/dracne-logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Header Section */}
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

      {/* Annotated Image Section */}
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
            <ActivityIndicator size="large" color={BRAND_COLORS.primary} />
            <Text style={styles.imageLoadingText}>Processing visual annotations...</Text>
          </View>
        ) : (
          <View style={[styles.imageCard, styles.noImageContainer]}>
            <Text style={styles.noImageEmoji}>✨</Text>
            <Text style={styles.noImageText}>No detections to visualize</Text>
          </View>
        )}
      </View>

      {/* Detection Results with Confirmation */}
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
                emoji: '🎯'
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
                  <Text style={styles.detectionEmoji}>{typeInfo.emoji}</Text>
                  <Text style={styles.detectionName}>{typeInfo.name}</Text>
                  <View style={styles.detectionStats}>
                    <Text style={styles.detectionCount}>×{detections.length}</Text>
                    <View style={styles.confidenceBadge}>
                      <Text style={styles.detectionConfidence}>{avgConfidence}%</Text>
                    </View>
                  </View>
                  
                  {/* Confirmation Circle */}
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
          <Text style={styles.successEmoji}>🎉</Text>
          <Text style={styles.successTitle}>Great News!</Text>
          <Text style={styles.successText}>
            No visible acne detected in your photo.
          </Text>
        </View>
      )}
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
    marginTop: 12,
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  noImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageEmoji: {
    fontSize: 48,
    marginBottom: 12,
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
  detectionEmoji: {
    fontSize: 24,
    width: 36,
  },
  detectionName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.black,
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
  successEmoji: {
    fontSize: 56,
    marginBottom: 16,
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
});