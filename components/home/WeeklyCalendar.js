// components/home/WeeklyCalendar.js - Weekly Activity Calendar
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#999999',
  lightGray: '#E0E0E0',
};

export const WeeklyCalendar = ({ weeklyActivity = [] }) => {
  return (
    <View style={styles.container}>
      {weeklyActivity.map((day, index) => (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dayText}>{day.day}</Text>
          <View style={[
            styles.dateCircle,
            day.active ? styles.activeCircle : styles.inactiveCircle
          ]}>
            <Text style={[
              styles.dateText,
              day.active ? styles.activeDateText : styles.inactiveDateText
            ]}>
              {day.date}
            </Text>
          </View>
          
          {/* Connection line to next day */}
          {index < weeklyActivity.length - 1 && (
            <View style={[
              styles.connectionLine,
              day.active && weeklyActivity[index + 1].active 
                ? styles.activeLine 
                : styles.inactiveLine
            ]} />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10, // Increased from 5 for more horizontal space
    paddingVertical: 10, // Added vertical padding for height
  },
  dayContainer: {
    alignItems: 'center',
    position: 'relative',
    marginHorizontal: 6, // Increased from 3 for more horizontal spacing
  },
  dayText: {
    fontSize: 11, // Slightly increased from 10
    color: BRAND_COLORS.gray,
    marginBottom: 6, // Increased from 4 for more vertical space
    textAlign: 'center',
  },
  dateCircle: {
    width: 28, // Increased from 24
    height: 28, // Increased from 24
    borderRadius: 14, // Adjusted for new size
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  activeCircle: {
    backgroundColor: BRAND_COLORS.secondary,
    borderColor: BRAND_COLORS.secondary,
  },
  inactiveCircle: {
    backgroundColor: BRAND_COLORS.white,
    borderColor: BRAND_COLORS.lightGray,
    borderStyle: 'dotted',
  },
  dateText: {
    fontSize: 12, // Increased from 11
    fontWeight: '600',
  },
  activeDateText: {
    color: BRAND_COLORS.white,
  },
  inactiveDateText: {
    color: BRAND_COLORS.gray,
  },
  connectionLine: {
    position: 'absolute',
    top: 30, // Adjusted for new circle size (was 26)
    left: 28, // Adjusted for new circle size (was 24)
    width: 12, // Increased from 6 for longer connection lines
    height: 2,
    zIndex: -1,
  },
  activeLine: {
    backgroundColor: BRAND_COLORS.secondary,
  },
  inactiveLine: {
    backgroundColor: BRAND_COLORS.lightGray,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: BRAND_COLORS.lightGray,
    height: 1,
  },
});