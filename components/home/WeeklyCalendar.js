// components/home/WeeklyCalendar.js - Weekly Activity Calendar (Updated with Green)
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
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  dayContainer: {
    alignItems: 'center',
    position: 'relative',
    marginHorizontal: 6,
  },
  dayText: {
    fontSize: 11,
    color: BRAND_COLORS.gray,
    marginBottom: 6,
    textAlign: 'center',
  },
  dateCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  activeCircle: {
    backgroundColor: BRAND_COLORS.primary, // Changed from secondary to primary (green)
    borderColor: BRAND_COLORS.primary, // Changed from secondary to primary (green)
  },
  inactiveCircle: {
    backgroundColor: BRAND_COLORS.white,
    borderColor: BRAND_COLORS.lightGray,
    borderStyle: 'dotted',
  },
  dateText: {
    fontSize: 12,
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
    top: 30,
    left: 28,
    width: 12,
    height: 2,
    zIndex: -1,
  },
  activeLine: {
    backgroundColor: BRAND_COLORS.primary, // Changed from secondary to primary (green)
  },
  inactiveLine: {
    backgroundColor: BRAND_COLORS.lightGray,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: BRAND_COLORS.lightGray,
    height: 1,
  },
});