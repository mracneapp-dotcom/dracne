// components/home/WeeklyCalendar.js - FULL CODE WITH STRONGER CHECK
import React, { useEffect, useState } from 'react';
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

// Generate week data based on current date
const getWeekData = () => {
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Adjust so Monday = 0, Sunday = 6
  const adjustedDay = currentDay === 0 ? 6 : currentDay - 1;
  
  // Calculate Monday of this week
  const monday = new Date(today);
  monday.setDate(today.getDate() - adjustedDay);
  
  // Generate week array
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weekData = weekDays.map((day, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    
    const isPast = index < adjustedDay;
    const isToday = index === adjustedDay;
    
    return {
      day,
      date: date.getDate(),
      active: isPast,
      isToday: isToday,
    };
  });
  
  return weekData;
};

export const WeeklyCalendar = ({ weeklyActivity }) => {
  const [weekData, setWeekData] = useState(getWeekData());

  useEffect(() => {
    // ALWAYS generate from current date - ignore prop
    setWeekData(getWeekData());
  }, []);

  return (
    <View style={styles.container}>
      {weekData.map((day, index) => (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dayText}>{day.day}</Text>
          <View style={[
            styles.dateCircle,
            day.active ? styles.activeCircle : null,
            day.isToday ? styles.todayCircle : null,
            !day.active && !day.isToday ? styles.inactiveCircle : null,
          ]}>
            <Text style={[
              styles.dateText,
              day.active || day.isToday ? styles.activeDateText : styles.inactiveDateText
            ]}>
              {day.date}
            </Text>
          </View>
          
          {/* Connection line to next day */}
          {index < weekData.length - 1 && (
            <View style={[
              styles.connectionLine,
              (day.active || day.isToday) && (weekData[index + 1].active || weekData[index + 1].isToday)
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
    backgroundColor: BRAND_COLORS.primary,
    borderColor: BRAND_COLORS.primary,
  },
  todayCircle: {
    backgroundColor: BRAND_COLORS.primary,
    borderColor: BRAND_COLORS.primary,
    borderWidth: 2.5,
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
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
    backgroundColor: BRAND_COLORS.primary,
  },
  inactiveLine: {
    backgroundColor: BRAND_COLORS.lightGray,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: BRAND_COLORS.lightGray,
    height: 1,
  },
});