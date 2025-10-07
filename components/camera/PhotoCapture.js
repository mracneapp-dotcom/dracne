// components/camera/PhotoCapture.js - Pulse Animation Matching OnboardingReady
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
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
  gray: '#999999',
};

// Camera icon component
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

export const PhotoCapture = ({ onPhotoSelected, onNavigateHome, style }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Animation values matching OnboardingReady
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;

  // Pulse animation effect (same as OnboardingReady)
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
  }, [pulseAnim, glowAnim]);

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

  const handleLogoPress = () => {
    if (onNavigateHome) {
      onNavigateHome();
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* Logo Header - Home Button */}
      <View style={styles.logoHeader}>
        <TouchableOpacity 
          onPress={handleLogoPress}
          activeOpacity={0.7}
        >
          <Image 
            source={require('../../assets/images/dracne-logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Animated Camera Icon (matching OnboardingReady style) */}
        <View style={styles.cameraSection}>
          <Animated.View 
            style={[
              styles.cameraIconContainer,
              { transform: [{ scale: pulseAnim }] }
            ]}
          >
            <View style={styles.cameraIcon}>
              <View style={styles.cameraCircle}>
                <CameraIconImage size={50} />
              </View>
              <Animated.View 
                style={[
                  styles.glowRing,
                  { opacity: glowAnim }
                ]}
              />
            </View>
          </Animated.View>
        </View>
        
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>
            Upload Your Photo <Text style={styles.titleHighlight}>for AI Analysis</Text>
          </Text>
        </View>
        
        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.description}>
            Take a clear photo of your face in good lighting for accurate AI detection
          </Text>
        </View>

        {/* Information Box */}
        <View style={styles.infoSection}>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>For Best AI Analysis:</Text>
            <Text style={styles.infoItem}>• Minimum 600x600 pixels</Text>
            <Text style={styles.infoItem}>• Clear face photo with good lighting</Text>
            <Text style={styles.infoItem}>• Face camera directly, hair pulled back</Text>
            <Text style={styles.infoItem}>• JPG/PNG format, up to 10MB</Text>
          </View>
        </View>

        {/* Action Buttons */}
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
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 160,
    paddingTop: 20,
  },
  cameraSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  cameraIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
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
    shadowOpacity: 0.2,
    shadowRadius: 8,
    zIndex: 1,
  },
  glowRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: BRAND_COLORS.primary,
    backgroundColor: 'transparent',
  },
  titleSection: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    lineHeight: 30,
  },
  titleHighlight: {
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  descriptionSection: {
    paddingVertical: 10,
  },
  description: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  infoSection: {
    paddingVertical: 15,
  },
  infoBox: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 10,
    textAlign: 'center',
  },
  infoItem: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    paddingLeft: 4,
    marginBottom: 4,
  },
  buttonSection: {
    paddingVertical: 10,
    gap: 15,
  },
  primaryButton: {
    backgroundColor: BRAND_COLORS.primary,
    paddingVertical: 16,
    borderRadius: 25,
    elevation: 4,
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  primaryButtonText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: BRAND_COLORS.primary,
  },
  secondaryButtonText: {
    color: BRAND_COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});