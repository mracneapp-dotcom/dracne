// components/analysis/AnalysisResults.js - UPDATED with moved up title
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  lightGray: '#F5F5F5',
};

export const AnalysisResults = ({ 
  analysisData, 
  annotatedImageBlob, 
  style = {} 
}) => {
  const [annotatedImageUri, setAnnotatedImageUri] = useState(null);

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

  if (!analysisData) {
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.errorText}>No analysis data available</Text>
      </View>
    );
  }

  const { success, predictions = [], total_found = 0, model_used = '', processing_time = 0 } = analysisData;
  
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
      {/* MOVED UP: Main title section */}
      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>Your AI Analysis Results are Ready!</Text>
        <Text style={styles.detectionCount}>
          {total_found} detection{total_found !== 1 ? 's' : ''} found
        </Text>
      </View>

      {/* Prominent Image - no frame */}
      <View style={styles.imageSection}>
        {annotatedImageUri ? (
          <Image 
            source={{ uri: annotatedImageUri }}
            style={styles.prominentImage}
            resizeMode="contain"
          />
        ) : total_found > 0 ? (
          <View style={[styles.prominentImage, styles.imageLoadingContainer]}>
            <ActivityIndicator size="large" color={BRAND_COLORS.primary} />
            <Text style={styles.imageLoadingText}>Processing visual annotations...</Text>
          </View>
        ) : (
          <View style={[styles.prominentImage, styles.noImageContainer]}>
            <Text style={styles.noImageText}>No detections to visualize</Text>
          </View>
        )}
      </View>

      {/* Detection Results with Gray Background */}
      {total_found > 0 ? (
        <View style={styles.compactResults}>
          {Object.entries(groupedPredictions).map(([type, detections]) => {
            const typeInfo = acneTypes[type] || { 
              color: '#999', 
              name: type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' '),
              emoji: '🎯'
            };
            
            const avgConfidence = Math.round(
              detections.reduce((sum, d) => sum + d.confidence, 0) / detections.length * 100
            );
            
            return (
              <View key={type} style={styles.detectionRow}>
                <Text style={styles.detectionEmoji}>{typeInfo.emoji}</Text>
                <Text style={styles.detectionName}>{typeInfo.name}</Text>
                <Text style={styles.detectionCount}>×{detections.length}</Text>
                <Text style={styles.detectionConfidence}>{avgConfidence}%</Text>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={styles.successMessage}>
          <Text style={styles.successEmoji}>🎉</Text>
          <Text style={styles.successText}>Great news! No visible acne detected.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND_COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 20, // ADDED: Move content up since header title is removed
  },
  // Main title section - moved up
  titleSection: {
    alignItems: 'center',
    marginBottom: 25, // INCREASED spacing after title
    marginTop: 0, // REMOVED top margin since we're higher up now
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 5,
  },
  detectionCount: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.secondary,
    textAlign: 'center',
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  prominentImage: {
    width: width - 80,
    height: Math.min(width - 80, 280), // SLIGHTLY reduced height to save space
    borderRadius: 12,
  },
  imageLoadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  imageLoadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  noImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ccc',
  },
  noImageText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  compactResults: {
    backgroundColor: BRAND_COLORS.lightGray,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  detectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  detectionEmoji: {
    fontSize: 20,
    width: 30,
  },
  detectionName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.black,
  },
  detectionCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BRAND_COLORS.primary,
    marginRight: 15,
  },
  detectionConfidence: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    width: 50,
    textAlign: 'right',
  },
  successMessage: {
    alignItems: 'center',
    backgroundColor: BRAND_COLORS.primary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  successEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  successText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: BRAND_COLORS.secondary,
    textAlign: 'center',
    padding: 20,
  },
});