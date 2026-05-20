import * as Notifications from 'expo-notifications';
import { Linking, Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const requestNotificationPermissions = async () => {
  try {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    if (existingStatus === 'granted') return true;

    if (existingStatus === 'denied') {
      if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
      } else {
        Linking.openSettings();
      }
      return false;
    }

    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.log('Notification permission error:', error.message);
    return false;
  }
};

export const scheduleDailyReminders = async (
  morningTime = '8:00 AM',
  eveningTime = '10:00 PM'
) => {
  try {
    // Cancel existing reminders first
    await Notifications.cancelAllScheduledNotificationsAsync();

    const parseMorning = parseTime(morningTime);
    const parseEvening = parseTime(eveningTime);

    // Schedule morning notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Good morning!',
        body: 'Time for your morning skincare routine. Your skin will thank you.',
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: parseMorning.hour,
        minute: parseMorning.minute,
      },
    });

    // Schedule evening notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Evening routine time!',
        body: 'Do not forget your night routine. Consistency is the key to clear skin.',
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: parseEvening.hour,
        minute: parseEvening.minute,
      },
    });

    console.log('Daily reminders scheduled:', morningTime, eveningTime);
    return true;
  } catch (error) {
    console.log('Schedule notification error:', error.message);
    return false;
  }
};

export const cancelAllReminders = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('All reminders cancelled');
  } catch (error) {
    console.log('Cancel notification error:', error.message);
  }
};

const parseTime = (timeString) => {
  // Parse "8:00 AM" or "10:00 PM" format
  const [time, period] = timeString.split(' ');
  const [hourStr, minuteStr] = time.split(':');
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);

  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;

  return { hour, minute };
};
