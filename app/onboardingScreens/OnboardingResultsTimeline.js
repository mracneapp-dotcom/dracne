// app/onboardingScreens/OnboardingResultsTimeline.js
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { DrAcneButton } from '../../components/ui/DrAcneButton';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
};

const TIMELINE_MILESTONES = [
  {
    week: 'Week 1',
    title: 'Your routine is working',
    description: 'Skin begins adjusting',
    icon: require('../../assets/images/check.png'),
    color: '#4A90E2',
  },
  {
    week: 'Weeks 2-3',
    title: 'First visible improvements',
    description: "You'll start noticing clearer patches",
    icon: require('../../assets/images/check.png'),
    color: '#9B59B6',
  },
  {
    week: 'Weeks 4-6',
    title: 'Significant progress',
    description: 'Friends notice your skin',
    icon: require('../../assets/images/check.png'),
    color: '#F39C12',
  },
  {
    week: 'Week 8+',
    title: 'Goal achieved!',
    description: 'Consistently clear skin',
    icon: require('../../assets/images/check.png'),
    color: BRAND_COLORS.primary,
  },
];

export default function OnboardingResultsTimeline({ onNext }) {
  const handleContinue = () => {
    onNext('onboardingConsistency', { sawTimeline: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Here's What to <Text style={styles.titleHighlight}>Expect</Text>
          </Text>
          <Text style={styles.subtitle}>Your skin transformation timeline</Text>
        </View>

        {/* Modern Timeline with Cards */}
        <View style={styles.timelineContainer}>
          {TIMELINE_MILESTONES.map((milestone, index) => (
            <View key={index} style={styles.milestoneRow}>
              {/* Timeline Track */}
              <View style={styles.timelineTrack}>
                <View style={[
                  styles.iconCircle,
                  { backgroundColor: milestone.color }
                ]}>
                  <Image
                    source={milestone.icon}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </View>
                {index < TIMELINE_MILESTONES.length - 1 && (
                  <View style={styles.connector} />
                )}
              </View>

              {/* Milestone Card */}
              <View style={styles.milestoneCard}>
                <Text style={[
                  styles.weekLabel,
                  { color: milestone.color }
                ]}>
                  {milestone.week}
                </Text>
                <Text style={styles.milestoneTitle}>{milestone.title}</Text>
                <Text style={styles.milestoneDescription}>
                  {milestone.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Social Proof Section */}
        <View style={styles.proofContainer}>
          <Text style={styles.proofText}>
            Timeline supported by peer-reviewed skincare science
          </Text>
          <Text style={styles.disclaimerText}>
            Results may vary based on skin type and routine consistency
          </Text>
        </View>
      </View>

      {/* Fixed Button at Bottom */}
      <View style={styles.buttonContainer}>
        <DrAcneButton
          title="I'm ready for this journey"
          onPress={handleContinue}
          style={styles.button}
        />
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
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 140,
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
    lineHeight: 24,
  },
  timelineContainer: {
    marginBottom: 30,
  },
  milestoneRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  timelineTrack: {
    width: 40,
    alignItems: 'center',
    marginRight: 14,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: BRAND_COLORS.white,
  },
  connector: {
    flex: 1,
    width: 2,
    backgroundColor: '#E0E0E0',
    marginTop: 4,
    marginBottom: 4,
  },
  milestoneCard: {
    flex: 1,
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  weekLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 3,
    lineHeight: 20,
  },
  milestoneDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 19,
  },
  proofContainer: {
    backgroundColor: `${BRAND_COLORS.primary}10`,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  proofText: {
    fontSize: 13,
    fontWeight: '600',
    color: BRAND_COLORS.primary,
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 19,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 17,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: 'transparent',
  },
  button: {
    paddingVertical: 16,
  },
});