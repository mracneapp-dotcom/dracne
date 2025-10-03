// components/ui/DrAcneButton.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// EXACT brand colors from working web app
const BRAND_COLORS = {
  primary: '#7CB342',    // Primary green
  secondary: '#FF7A7A',  // Coral pink  
  cream: '#FDF5E6',      // Cream white
  black: '#000000',      // Black
};

export const DrAcneButton = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false,
  style = {},
  loading = false,
  ...props 
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    disabled && styles.disabled,
    style
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>
        {loading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25, // More rounded like web version
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  primary: {
    backgroundColor: BRAND_COLORS.primary,
  },
  secondary: {
    backgroundColor: BRAND_COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: BRAND_COLORS.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: BRAND_COLORS.primary,
  },
});