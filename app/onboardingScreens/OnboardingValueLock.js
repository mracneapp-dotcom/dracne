// app/onboardingScreens/OnboardingValueLock.js
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { t } from '../i18n';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
};

const HISTORY_MAP = {
  severe:   'Post-severe acne, now in recovery',
  moderate: 'Post-acne skin, building strength',
  mild:     'Mild acne history, mostly clear',
  none:     'No acne history, maintaining health',
};

const CONCERN_MAP = {
  pih:         'Dark spots and hyperpigmentation',
  dryness:     'Dryness and tightness',
  aging:       'Fine lines and early aging',
  pores:       'Visible and enlarged pores',
  texture:     'Uneven skin texture',
  redness:     'Redness and sensitivity',
  oiliness:    'Excess oil and shine',
  sensitivity: 'Reactive and sensitive skin',
  glow:        'Dullness and lack of glow',
  breakouts:   'Active breakouts',
};

const SENSITIVITY_MAP = {
  fragrance:      'Fragrance',
  alcohol:        'Alcohol',
  essential_oils: 'Essential oils',
  silicones:      'Silicones',
  sulfates:       'Sulfates',
  parabens:       'Parabens',
  comedogenic:    'Heavy oils',
  acids:          'Strong acids',
};

const SKIN_TYPE_MAP = {
  oily:        'Oily skin',
  dry:         'Dry skin',
  combination: 'Combination skin',
  normal:      'Normal skin',
  sensitive:   'Sensitive skin',
};

function buildConcernValue(skinConcerns) {
  if (!skinConcerns || skinConcerns.length === 0) return 'Skin concerns noted';
  const primary = CONCERN_MAP[skinConcerns[0]] || 'Skin concerns noted';
  const extra = skinConcerns.length - 1;
  if (extra > 0) return `${primary} + ${extra} more`;
  return primary;
}

function buildSensitivityValue(sensitivities) {
  if (
    !sensitivities ||
    sensitivities.length === 0 ||
    (sensitivities.length === 1 && sensitivities[0] === 'none_above')
  ) {
    return 'No known sensitivities';
  }
  const filtered = sensitivities.filter((s) => s !== 'none_above');
  if (filtered.length === 0) return 'No known sensitivities';
  return filtered
    .slice(0, 2)
    .map((s) => SENSITIVITY_MAP[s] || s)
    .join(', ');
}

function buildProductsValue(products) {
  const count = products && products.length ? products.length : 0;
  if (count === 0) return 'Starting fresh - we will guide you';
  if (count <= 3) return `${count} product categories - building your kit`;
  if (count <= 7) return `${count} product categories - solid foundation`;
  return `${count} product categories - well equipped`;
}

const PROFILE_ROWS = [
  {
    key: 'history',
    label: 'SKIN HISTORY',
    icon: '\u25C9',
    iconColor: BRAND_COLORS.primary,
    getValue: (d) => HISTORY_MAP[d?.acneHistory] || 'Skin history noted',
  },
  {
    key: 'concern',
    label: 'MAIN CONCERN',
    icon: '\u25CE',
    iconColor: '#F39C12',
    getValue: (d) => buildConcernValue(d?.skinConcerns),
  },
  {
    key: 'sensitivities',
    label: 'SENSITIVITIES',
    icon: '\u25C8',
    iconColor: '#9B59B6',
    getValue: (d) => buildSensitivityValue(d?.sensitivities),
  },
  {
    key: 'products',
    label: 'PRODUCTS OWNED',
    icon: '\u25A7',
    iconColor: '#4A90E2',
    getValue: (d) => buildProductsValue(d?.products),
  },
  {
    key: 'skinType',
    label: 'SKIN TYPE',
    icon: '\u25C9',
    iconColor: '#1ABC9C',
    getValue: (d) => SKIN_TYPE_MAP[d?.skinType] || 'Skin type noted',
  },
];

export default function OnboardingValueLock({ onNext, onboardingData }) {
  const pulse1 = useRef(new Animated.Value(1)).current;
  const pulse2 = useRef(new Animated.Value(1)).current;
  const pulse3 = useRef(new Animated.Value(1)).current;
  const pulse4 = useRef(new Animated.Value(1)).current;
  const pulse5 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const createPulse = (value, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(value, {
            toValue: 1.08,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 1.0,
            duration: 900,
            useNativeDriver: true,
          }),
        ])
      );

    const animations = [
      createPulse(pulse1, 0),
      createPulse(pulse2, 300),
      createPulse(pulse3, 600),
      createPulse(pulse4, 900),
      createPulse(pulse5, 1200),
    ];
    animations.forEach((a) => a.start());
    return () => animations.forEach((a) => a.stop());
  }, []);

  const handleContinue = () => {
    onNext('onboardingReady', { sawValueLock: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>YOUR SKIN PROFILE</Text>
          <Text style={styles.title}>
            {t('onboarding.valueLock.title1')}{' '}
            <Text style={styles.titleHighlight}>
              {t('onboarding.valueLock.title2')}
            </Text>
          </Text>
          <Text style={styles.subtitle}>
            Here is everything we have learned about you
          </Text>
        </View>

        <View style={styles.profileCard}>
          {PROFILE_ROWS.map((row, index) => {
            const pulseValues = [pulse1, pulse2, pulse3, pulse4, pulse5];
            const pulseAnim = pulseValues[index];
            return (
              <View key={row.key}>
                <View style={styles.profileRow}>
                  <Animated.View
                    style={[
                      styles.iconCircle,
                      { backgroundColor: row.iconColor + '26' },
                      { transform: [{ scale: pulseAnim }] },
                    ]}
                  >
                    <Text style={[styles.iconText, { color: row.iconColor }]}>
                      {row.icon}
                    </Text>
                  </Animated.View>
                  <View style={styles.rowContent}>
                    <Text style={styles.rowLabel}>{row.label}</Text>
                    <Text style={styles.rowValue}>
                      {row.getValue(onboardingData)}
                    </Text>
                  </View>
                </View>
                {index < PROFILE_ROWS.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>
            {t('onboarding.valueLock.button')}
          </Text>
        </TouchableOpacity>
        <Text style={styles.footerNote}>
          Your routine is built around this profile
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 140,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '600',
    color: BRAND_COLORS.primary,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a1a',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 4,
  },
  titleHighlight: {
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 20,
  },
  profileCard: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconText: {
    fontSize: 16,
    lineHeight: 20,
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  rowValue: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '600',
    marginTop: 2,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#F5F5F5',
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: BRAND_COLORS.primary,
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 12,
    width: '100%',
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  footerNote: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
});
