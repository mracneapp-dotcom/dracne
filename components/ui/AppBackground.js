import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
};

export default function AppBackground({ children, style }) {
  return (
    <View style={[styles.container, style]}>
      <Svg
        width="100%"
        height="100%"
        style={styles.svgBackground}
        preserveAspectRatio="none"
      >
        <Circle cx="10%" cy="8%" r="40"
          fill={BRAND_COLORS.primary} opacity="0.06" />
        <Circle cx="92%" cy="5%" r="60"
          fill={BRAND_COLORS.primary} opacity="0.07" />
        <Circle cx="5%" cy="40%" r="25"
          fill={BRAND_COLORS.secondary} opacity="0.05" />
        <Circle cx="95%" cy="35%" r="30"
          fill={BRAND_COLORS.primary} opacity="0.05" />
        <Circle cx="8%" cy="75%" r="35"
          fill={BRAND_COLORS.secondary} opacity="0.05" />
        <Circle cx="90%" cy="80%" r="25"
          fill={BRAND_COLORS.primary} opacity="0.06" />
        <Circle cx="50%" cy="95%" r="20"
          fill={BRAND_COLORS.primary} opacity="0.04" />
      </Svg>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
