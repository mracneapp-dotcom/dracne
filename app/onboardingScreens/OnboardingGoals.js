// app/onboardingScreens/OnboardingGoals.js
import React, { useState } from 'react';
import {
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

const GOALS = [
  { 
    id: 'clear_acne', 
    label: 'Clear existing acne',
    icon: require('../../assets/images/check.png'),
    color: BRAND_COLORS.primary,
  },
  { 
    id: 'prevent_breakouts', 
    label: 'Prevent future breakouts',
    icon: require('../../assets/images/check.png'),
    color: '#4A90E2',
  },
  { 
    id: 'reduce_scars', 
    label: 'Reduce acne scars',
    icon: require('../../assets/images/check.png'),
    color: BRAND_COLORS.secondary,
  },
  { 
    id: 'even_tone', 
    label: 'Even out skin tone',
    icon: require('../../assets/images/check.png'),
    color: '#9B59B6',
  },
  { 
    id: 'healthy_glow', 
    label: 'Achieve healthy glow',
    icon: require('../../assets/images/check.png'),
    color: '#F39C12',
  },
];

export default function OnboardingGoals({ onNext }) {
  const [selectedGoals, setSelectedGoals] = useState([]);

  const handleToggleGoal = (goalId) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter(id => id !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const handleContinue = () => {
    if (selectedGoals.length > 0) {
      onNext('onboardingTimeline', { goals: selectedGoals });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            What are your <Text style={styles.titleHighlight}>skincare goals?</Text>
          </Text>
          <Text style={styles.subtitle}>Select all that apply</Text>
        </View>

        <View style={styles.goalsContainer}>
          {GOALS.map((goal) => {
            const isSelected = selectedGoals.includes(goal.id);
            return (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.goalCard,
                  isSelected && { 
                    borderColor: goal.color,
                    borderWidth: 2,
                    backgroundColor: `${goal.color}10`,
                  }
                ]}
                onPress={() => handleToggleGoal(goal.id)}
              >
                <View style={[
                  styles.iconContainer,
                  { backgroundColor: isSelected ? goal.color : '#F5F5F5' }
                ]}>
                  <Image
                    source={goal.icon}
                    style={[
                      styles.icon,
                      { tintColor: isSelected ? BRAND_COLORS.white : '#999' }
                    ]}
                    resizeMode="contain"
                  />
                </View>
                <Text style={[
                  styles.goalLabel,
                  isSelected && { color: goal.color, fontWeight: '600' }
                ]}>
                  {goal.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.selectionInfo}>
          <Text style={styles.selectionText}>
            {selectedGoals.length} goal{selectedGoals.length !== 1 ? 's' : ''} selected
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedGoals.length === 0 && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={selectedGoals.length === 0}
        >
          <Text style={[
            styles.continueButtonText,
            selectedGoals.length === 0 && styles.continueButtonTextDisabled
          ]}>
            Continue
          </Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>Choose at least one goal</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
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
  },
  goalsContainer: {
    marginBottom: 24,
  },
  goalCard: {
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
  goalLabel: {
    fontSize: 16,
    color: BRAND_COLORS.black,
    flex: 1,
  },
  selectionInfo: {
    alignItems: 'center',
    marginTop: 10,
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
  },
});