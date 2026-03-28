// app/onboardingScreens/OnboardingProducts.js
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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

const PRODUCT_CATEGORIES = [
  { id: 'cleanser',    labelKey: 'onboarding.products.cleanser',    color: '#4A90E2' },
  { id: 'toner',       labelKey: 'onboarding.products.toner',       color: '#1ABC9C' },
  { id: 'vitamin_c',   labelKey: 'onboarding.products.vitamin_c',   color: '#F39C12' },
  { id: 'niacinamide', labelKey: 'onboarding.products.niacinamide', color: '#9B59B6' },
  { id: 'hyaluronic',  labelKey: 'onboarding.products.hyaluronic',  color: '#4A90E2' },
  { id: 'moisturizer', labelKey: 'onboarding.products.moisturizer', color: '#7CB342' },
  { id: 'spf',         labelKey: 'onboarding.products.spf',         color: '#F1C40F' },
  { id: 'retinoid',    labelKey: 'onboarding.products.retinoid',    color: '#E67E22' },
  { id: 'bha_aha',     labelKey: 'onboarding.products.bha_aha',     color: '#E74C3C' },
  { id: 'eye_cream',   labelKey: 'onboarding.products.eye_cream',   color: '#9B59B6' },
  { id: 'face_oil',    labelKey: 'onboarding.products.face_oil',    color: '#27AE60' },
  { id: 'sheet_mask',  labelKey: 'onboarding.products.sheet_mask',  color: '#FF7A7A' },
];

export default function OnboardingProducts({ onNext }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [brandNotes, setBrandNotes] = useState('');

  const handleToggleProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleContinue = () => {
    if (selectedProducts.length > 0) {
      onNext('onboardingComparison', { products: selectedProducts, brandNotes: brandNotes.trim() });
    }
  };

  const handleSkip = () => {
    onNext('onboardingComparison', { products: [], brandNotes: '' });
  };

  const getSelectionMessage = () => {
    const count = selectedProducts.length;
    if (count === 0) {
      return '';
    } else if (count === 1) {
      return t('onboarding.products.selected_one').replace('{{count}}', '1');
    } else {
      return t('onboarding.products.selected_many').replace('{{count}}', String(count));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            {t('onboarding.products.title1')}{' '}
            <Text style={styles.titleHighlight}>{t('onboarding.products.title2')}</Text>
          </Text>
          <Text style={styles.subtitle}>{t('onboarding.products.subtitle')}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {PRODUCT_CATEGORIES.map((product) => {
            const isSelected = selectedProducts.includes(product.id);
            return (
              <TouchableOpacity
                key={product.id}
                style={[
                  styles.optionCard,
                  isSelected && {
                    borderColor: product.color,
                    borderWidth: 2,
                    backgroundColor: `${product.color}10`,
                  },
                ]}
                onPress={() => handleToggleProduct(product.id)}
              >
                <View style={[
                  styles.iconCircle,
                  { backgroundColor: isSelected ? product.color : '#F5F5F5' },
                ]}>
                  <Image
                    source={require('../../assets/images/check.png')}
                    style={[styles.icon, { tintColor: isSelected ? BRAND_COLORS.white : '#999' }]}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[
                    styles.optionLabel,
                    isSelected && { color: product.color, fontWeight: '600' },
                  ]}>
                    {t(product.labelKey)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TextInput
          style={styles.brandInput}
          placeholder={t('onboarding.products.brand_placeholder')}
          placeholderTextColor="#999"
          value={brandNotes}
          onChangeText={setBrandNotes}
          multiline={false}
          returnKeyType="done"
        />

        {selectedProducts.length > 0 && (
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionText}>{getSelectionMessage()}</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedProducts.length === 0 && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={selectedProducts.length === 0}
        >
          <Text style={[
            styles.continueButtonText,
            selectedProducts.length === 0 && styles.continueButtonTextDisabled,
          ]}>
            {t('onboarding.products.button')}
          </Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>{t('onboarding.products.helper')}</Text>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>{t('onboarding.products.skip')}</Text>
        </TouchableOpacity>
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
  content: {
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 140,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
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
  optionsContainer: {
    marginBottom: 20,
  },
  optionCard: {
    flexDirection: 'row',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  icon: {
    width: 22,
    height: 22,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  optionLabel: {
    fontSize: 16,
    color: BRAND_COLORS.black,
  },
  brandInput: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: BRAND_COLORS.black,
    marginBottom: 16,
  },
  selectionInfo: {
    alignItems: 'center',
    marginTop: 4,
  },
  selectionText: {
    fontSize: 14,
    color: BRAND_COLORS.primary,
    fontWeight: '500',
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
  continueButtonDisabled: {
    backgroundColor: '#E5E5E5',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  continueButtonTextDisabled: {
    color: '#999',
  },
  helperText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  skipButton: {
    paddingVertical: 6,
  },
  skipText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
