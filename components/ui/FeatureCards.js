// components/ui/FeatureCards.js - Only Individual Cards Gray on White Background
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
};

const CameraIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M23 19C23 20.1046 22.1046 21 21 21H3C1.89543 21 1 20.1046 1 19V8C1 6.89543 1.89543 6 3 6H7L9 3H15L17 6H21C22.1046 6 23 6.89543 23 8V19Z" stroke={BRAND_COLORS.primary} strokeWidth="2"/>
    <Path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke={BRAND_COLORS.primary} strokeWidth="2"/>
  </Svg>
);

const RoutineIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4" stroke={BRAND_COLORS.secondary} strokeWidth="2" strokeLinecap="round"/>
    <Path d="M12 8V12L15 15" stroke={BRAND_COLORS.secondary} strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

const ClockIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#666" strokeWidth="2"/>
    <Path d="M12 6V12L16 14" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

export const FeatureCards = () => {
  const features = [
    {
      icon: CameraIcon,
      title: "AI Photo Analysis",
      description: "Medical-grade acne detection with confidence scores",
      color: BRAND_COLORS.primary,
    },
    {
      icon: RoutineIcon, 
      title: "Personalized Routines",
      description: "Custom morning & evening skincare recommendations",
      color: BRAND_COLORS.secondary,
    },
    {
      icon: ClockIcon,
      title: "Fast Results", 
      description: "Get your analysis in under 30 seconds",
      color: "#666",
    }
  ];

  return (
    <View style={styles.container}>
      {features.map((feature, index) => (
        <View key={index} style={styles.card}>
          <View style={[styles.iconContainer, { backgroundColor: `${feature.color}15` }]}>
            <feature.icon />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{feature.title}</Text>
            <Text style={styles.description}>{feature.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF', // White container background
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA', // Only individual cards have gray background
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    elevation: 1, // Very subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    borderWidth: 0.5,
    borderColor: '#F0F0F0', // Very subtle border
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});