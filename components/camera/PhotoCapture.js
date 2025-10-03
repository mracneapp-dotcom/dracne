// components/camera/PhotoCapture.js - FIXED: Removed duplicate logo, correct image path
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
};

// Using the correct camera image
const CameraIconImage = ({ size = 50 }) => (
  <Image 
    source={require('../../assets/images/camera1.png')} 
    style={{ 
      width: size, 
      height: size,
      tintColor: BRAND_COLORS.white
    }}
    resizeMode="contain"
  />
);

export const PhotoCapture = ({ onPhotoSelected, style }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const requestPermissions = async () => {
    const cameraResult = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraResult.status !== 'granted') {
      Alert.alert('Permission Required', 'Camera permission is required to take photos.');
      return false;
    }

    const mediaResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (mediaResult.status !== 'granted') {
      Alert.alert('Permission Required', 'Gallery permission is required to select photos.');
      return false;
    }

    return true;
  };

  const openCamera = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        exif: false,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        onPhotoSelected(imageUri);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const openGallery = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        exif: false,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        onPhotoSelected(imageUri);
      }
    } catch (error) {
      console.error('Gallery error:', error);
      Alert.alert('Error', 'Failed to select photo. Please try again.');
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* NO DUPLICATE LOGO HERE - Logo is only in ProgressBar now */}
      
      {/* Main Content - Better spaced distribution */}
      <View style={styles.mainContent}>
        {/* Camera Circle with uploaded image */}
        <View style={styles.cameraSection}>
          <View style={styles.cameraCircle}>
            <CameraIconImage size={50} />
          </View>
        </View>
        
        {/* Title Section with better spacing */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Upload Your Photo</Text>
          <Text style={styles.mainTitle}>for AI Analysis</Text>
        </View>
        
        {/* Description with spacing */}
        <View style={styles.descriptionSection}>
          <Text style={styles.description}>
            Take a clear photo of your face in good lighting for accurate AI detection
          </Text>
        </View>

        {/* Information Box with better margins */}
        <View style={styles.infoSection}>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>For Best AI Analysis:</Text>
            <Text style={styles.infoItem}>• Minimum 600x600 pixels</Text>
            <Text style={styles.infoItem}>• Clear face photo with good lighting</Text>
            <Text style={styles.infoItem}>• Face camera directly, hair pulled back</Text>
            <Text style={styles.infoItem}>• JPG/PNG format, up to 10MB</Text>
          </View>
        </View>

        {/* Action Buttons with proper spacing */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.primaryButton} onPress={openCamera}>
            <Text style={styles.primaryButtonText}>Take Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={openGallery}>
            <Text style={styles.secondaryButtonText}>Choose from Gallery</Text>
          </TouchableOpacity>
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
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 160, // Account for navigation
    paddingTop: 30, // Top padding for spacing
  },
  cameraSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  cameraCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: BRAND_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  titleSection: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    lineHeight: 28,
  },
  descriptionSection: {
    paddingVertical: 10,
  },
  description: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  infoSection: {
    paddingVertical: 15,
  },
  infoBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 0.5,
    borderColor: '#E5E5E5',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 8,
    textAlign: 'center',
  },
  infoItem: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    paddingLeft: 4,
    marginBottom: 3,
  },
  buttonSection: {
    paddingVertical: 10,
    gap: 15,
  },
  primaryButton: {
    backgroundColor: BRAND_COLORS.primary,
    paddingVertical: 16,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  primaryButtonText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: BRAND_COLORS.white,
    paddingVertical: 16,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: BRAND_COLORS.primary,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  secondaryButtonText: {
    color: BRAND_COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});