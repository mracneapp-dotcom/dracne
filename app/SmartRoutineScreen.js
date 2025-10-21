// app/SmartRoutineScreen.js - SMART ROUTINE CONCERN SELECTION (FIXED)
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DrAcneButton } from '../components/ui/DrAcneButton';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#999999',
  darkGray: '#666666',
};

const SKIN_CONCERNS = [
  {
    id: 'nodules',
    label: 'Inflamed Acne (Nodules)',
    description: 'Deep, painful bumps under the skin',
    icon: require('../assets/images/Nodule.png'),
    color: '#FF7A7A', // Secondary - for inflammation
  },
  {
    id: 'blackheads',
    label: 'Blackheads',
    description: 'Open pores with oxidized sebum',
    icon: require('../assets/images/Blackhead.png'),
    color: '#4A90E2', // Blue - oily skin related
  },
  {
    id: 'whiteheads',
    label: 'Whiteheads',
    description: 'Closed comedones, clogged pores',
    icon: require('../assets/images/Whitehead.png'),
    color: '#7CB342', // Primary green
  },
  {
    id: 'papules',
    label: 'Papules & Pustules',
    description: 'Red bumps and white-topped pimples',
    icon: require('../assets/images/Papule.png'),
    color: '#F39C12', // Orange - active acne
  },
  {
    id: 'marks',
    label: 'Post-Inflammatory Marks',
    description: 'Dark spots and red marks from acne',
    icon: require('../assets/images/Mark.png'),
    color: '#9B59B6', // Purple - post-acne
  },
];

export default function SmartRoutineScreen({ 
  onNavigateHome, 
  onNavigateToDetail,
  preselectedConcern = null 
}) {
  const [selectedConcern, setSelectedConcern] = useState(preselectedConcern);

  const handleSelect = (concernId) => {
    setSelectedConcern(concernId);
  };

  const handleContinue = async () => {
    if (selectedConcern && onNavigateToDetail) {
      try {
        await AsyncStorage.setItem('selectedSmartConcern', selectedConcern);
        console.log('✅ Selected concern:', selectedConcern);
      } catch (error) {
        console.error('Error saving concern:', error);
      }
      onNavigateToDetail(selectedConcern);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Navigation */}
      <View style={styles.topNavigation}>
        <TouchableOpacity onPress={onNavigateHome} style={styles.logoButton}>
          <Image 
            source={require('../assets/images/dracne-logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              Choose Your <Text style={styles.titleHighlight}>Skin Concern</Text>
            </Text>
            <Text style={styles.subtitle}>
              Get a targeted routine to address your specific skin issue
            </Text>
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoIconContainer}>
              <Image 
                source={require('../assets/images/check.png')}
                style={styles.infoIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.infoText}>
              These advanced routines complement your basic Day & Night routines. Focus on one concern at a time for best results.
            </Text>
          </View>

          <View style={styles.concernsContainer}>
            {SKIN_CONCERNS.map((concern) => {
              const isSelected = selectedConcern === concern.id;
              return (
                <TouchableOpacity
                  key={concern.id}
                  style={[
                    styles.concernCard,
                    isSelected && {
                      borderColor: concern.color,
                      borderWidth: 3,
                      backgroundColor: `${concern.color}08`,
                    }
                  ]}
                  onPress={() => handleSelect(concern.id)}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.iconContainer,
                    { backgroundColor: isSelected ? concern.color : '#F5F5F5' }
                  ]}>
                    <Image
                      source={concern.icon}
                      style={[
                        styles.icon,
                        { tintColor: isSelected ? BRAND_COLORS.white : '#999' }
                      ]}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={[
                      styles.concernLabel,
                      isSelected && { color: concern.color, fontWeight: '700' }
                    ]}>
                      {concern.label}
                    </Text>
                    <Text style={styles.concernDescription}>{concern.description}</Text>
                  </View>
                  {isSelected && (
                    <View style={[styles.checkmark, { backgroundColor: concern.color }]}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {selectedConcern && (
            <View style={styles.selectionInfo}>
              <Text style={styles.selectionText}>
                Perfect! We'll create a targeted routine for {SKIN_CONCERNS.find(c => c.id === selectedConcern)?.label.toLowerCase()}
              </Text>
            </View>
          )}

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={selectedConcern ? "View Targeted Routine" : "Select Your Concern"}
          onPress={handleContinue}
          disabled={!selectedConcern}
          style={[
            styles.continueButton,
            !selectedConcern && styles.continueButtonDisabled
          ]}
        />
        <Text style={styles.helperText}>
          {selectedConcern ? 'Get your personalized treatment plan' : 'Choose one concern to focus on'}
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
  topNavigation: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: 'transparent',
  },
  logoButton: {
    alignSelf: 'flex-start',
  },
  logoImage: {
    width: 80,
    height: 50,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
    fontSize: 15,
    color: BRAND_COLORS.darkGray,
    textAlign: 'center',
    lineHeight: 22,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#C8E6C9',
  },
  infoIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoIcon: {
    width: 18,
    height: 18,
    tintColor: BRAND_COLORS.primary,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: BRAND_COLORS.darkGray,
    lineHeight: 17,
    fontWeight: '500',
  },
  concernsContainer: {
    marginBottom: 20,
  },
  concernCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  icon: {
    width: 26,
    height: 26,
  },
  textContainer: {
    flex: 1,
  },
  concernLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 3,
  },
  concernDescription: {
    fontSize: 13,
    color: BRAND_COLORS.gray,
    lineHeight: 18,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  checkmarkText: {
    color: BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  selectionInfo: {
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
  },
  selectionText: {
    fontSize: 14,
    color: BRAND_COLORS.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 140,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 27,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 90,
    backgroundColor: '#FAFBFC',
    alignItems: 'center',
  },
  continueButton: {
    width: '100%',
    marginBottom: 8,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  helperText: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    fontWeight: '500',
  },
});