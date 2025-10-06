<DrAcneButton
  title="Button Text"
  onPress={handleContinue}
  style={styles.continueButton}
/>

// Standard button style for all onboarding screens:
continueButton: {
  paddingVertical: 16,
  shadowColor: BRAND_COLORS.primary,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 5,
}