// app/onboardingScreens/OnboardingResultsTimeline.js
import React from 'react';
import {
  Image,
  ScrollView,
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
    description: 'Skin begins adjusting to your new routine',
    icon: require('../../assets/images/check.png'),
  },
  {
    week: 'Weeks 2-3',
    title: 'First visible improvements',
    description: "You'll start noticing clearer patches",
    icon: require('../../assets/images/check.png'),
  },
  {
    week: 'Weeks 4-6',
    title: 'Significant progress',
    description: 'Friends notice your skin looks better',
    icon: require('../../assets/images/check.png'),
  },
  {
    week: 'Week 8+',
    title: 'Goal achieved!',
    description: 'Consistently clear, healthy-looking skin',
    icon: require('../../assets/images/check.png'),
  },
];

export default function OnboardingResultsTimeline({ onNext }) {
  const handleContinue = () => {
    onNext('onboardingConsistency', { sawTimeline: true });
  };

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Here's What to Expect</Text>
          <Text style={styles.subtitle}>Your skin transformation timeline</Text>
        </View>

        {/* Timeline Section */}
        <View style={styles.timelineContainer}>
          {TIMELINE_MILESTONES.map((milestone, index) => (
            <View key={index} style={styles.milestoneRow}>
              {/* Timeline Connector */}
              <View style={styles.timelineTrack}>
                <View style={styles.iconContainer}>
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

              {/* Milestone Content */}
              <View style={styles.milestoneContent}>
                <Text style={styles.weekLabel}>{milestone.week}</Text>
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
      </ScrollView>

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
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingBottom: 40, // ✓ INCREASED from 20 to 40 - gives more space before button
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  timelineContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  milestoneRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  timelineTrack: {
    width: 50,
    alignItems: 'center',
    marginRight: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BRAND_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
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
    minHeight: 60,
  },
  milestoneContent: {
    flex: 1,
    paddingBottom: 24,
  },
  weekLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.primary,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  milestoneTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    marginBottom: 6,
    lineHeight: 24,
  },
  milestoneDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 21,
  },
  proofContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 60, // ✓ INCREASED from 32 to 60 - provides more space so text is fully visible
    alignItems: 'center',
  },
  proofText: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.primary,
    textAlign: 'center',
    marginBottom: 12, // ✓ INCREASED from 8 to 12 - more space between the two texts
    lineHeight: 20,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 20,
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