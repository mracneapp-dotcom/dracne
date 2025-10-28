// app/SkinGoalsScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Alert,
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
  lightGray: '#E5E5E5',
};

const GOALS = [
  { 
    id: 'clear_acne', 
    label: 'Clear existing acne',
    icon: require('../assets/images/check.png'),
    color: BRAND_COLORS.primary,
  },
  { 
    id: 'prevent_breakouts', 
    label: 'Prevent future breakouts',
    icon: require('../assets/images/check.png'),
    color: '#4A90E2',
  },
  { 
    id: 'reduce_scars', 
    label: 'Reduce acne scars',
    icon: require('../assets/images/check.png'),
    color: BRAND_COLORS.secondary,
  },
  { 
    id: 'even_tone', 
    label: 'Even out skin tone',
    icon: require('../assets/images/check.png'),
    color: '#9B59B6',
  },
  { 
    id: 'healthy_glow', 
    label: 'Achieve healthy glow',
    icon: require('../assets/images/check.png'),
    color: '#F39C12',
  },
];

export default function SkinGoalsScreen({ onBack, onNavigateHome }) {
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [initialGoals, setInitialGoals] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadSavedGoals();
  }, []);

  const loadSavedGoals = async () => {
    try {
      // First try to load previously saved goals
      const savedGoals = await AsyncStorage.getItem('userSkinGoals');
      if (savedGoals) {
        const goals = JSON.parse(savedGoals);
        setSelectedGoals(goals);
        setInitialGoals(goals);
        return;
      }
      
      // If no saved goals, check if there are onboarding goals
      const onboardingData = await AsyncStorage.getItem('onboardingData');
      if (onboardingData) {
        const data = JSON.parse(onboardingData);
        if (data.goals && Array.isArray(data.goals)) {
          setSelectedGoals(data.goals);
          setInitialGoals(data.goals);
          // Save these goals so they persist
          await AsyncStorage.setItem('userSkinGoals', JSON.stringify(data.goals));
        }
      }
    } catch (error) {
      console.error('Error loading skin goals:', error);
    }
  };

  const handleToggleGoal = (goalId) => {
    const newGoals = selectedGoals.includes(goalId)
      ? selectedGoals.filter(id => id !== goalId)
      : [...selectedGoals, goalId];
    
    setSelectedGoals(newGoals);
    
    // Check if goals changed from initial state
    const changed = JSON.stringify(newGoals.sort()) !== JSON.stringify(initialGoals.sort());
    setHasChanges(changed);
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('userSkinGoals', JSON.stringify(selectedGoals));
      Alert.alert(
        'Goals Updated',
        'Your skincare goals have been saved successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              if (onBack) onBack();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Unable to save your goals. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNavigation}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
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
        <View style={styles.header}>
          <Text style={styles.title}>
            Update Your <Text style={styles.titleHighlight}>Skincare Goals</Text>
          </Text>
          <Text style={styles.subtitle}>Select all that apply to you</Text>
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
      </ScrollView>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={hasChanges ? "Save Changes" : "No Changes"}
          onPress={handleSave}
          disabled={!hasChanges || selectedGoals.length === 0}
          style={styles.saveButton}
        />
        {selectedGoals.length === 0 && (
          <Text style={styles.helperText}>Select at least one goal</Text>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 18,
    fontWeight: '600',
    color: BRAND_COLORS.primary,
  },
  logoButton: {
    padding: 8,
  },
  logoImage: {
    width: 70,
    height: 45,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 40,
    backgroundColor: '#FAFBFC',
    alignItems: 'center',
  },
  saveButton: {
    width: '100%',
  },
  helperText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
});