// components/home/SkinTestButton.js - Skin Test Navigation Button
import React from 'react';
import {
    Image,
    StyleSheet,
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

export const SkinTestButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.testButton}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Image 
          source={require('../../assets/images/Skin Test Button.png')} 
          style={styles.buttonImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    paddingLeft: 20, // Only left padding to prevent going off left edge
    marginBottom: 20,
    marginRight: -10, // Negative margin to push it further right
  },
  testButton: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonImage: {
    width: 240,
    height: 75,
  },
});