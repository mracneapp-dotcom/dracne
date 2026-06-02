import * as Notifications from 'expo-notifications';
import { Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const EN_AM = [
  'Rise and glow! Your skin works hard for you -- return the favor. 🌿',
  'Morning! 2 minutes of care today = skin that thanks you tomorrow.',
  'Your skin healed overnight. Now help it shine through the day. 🌅',
  'Good morning! Consistency is your best skincare ingredient -- don\'t skip today.',
  'New day, fresh start. Your skin is ready -- are you? ✨',
];

const EN_PM = [
  'Day done. Your skin collected everything -- pollution, stress, sun. Time to reset. 🌙',
  'Tonight\'s routine is tomorrow\'s glow. Don\'t go to bed without it.',
  'Your skin repairs itself while you sleep -- give it what it needs first. ✨',
  '2 minutes before bed. That\'s all your skin is asking for tonight.',
  'Wash the day off. Literally. Your skin deserves a clean slate. 🌿',
  'Night mode: ON. Skincare mode: ON. You\'ve got this.',
  'The best thing you can do for tomorrow-you? Your routine. Right now.',
];

const ES_AM = [
  '¡Buenos días! Tu piel trabajó toda la noche -- ahora dale lo que necesita. 🌿',
  'Nuevo día, piel radiante. 2 minutos es todo lo que necesitas hoy. ✨',
  '¡Empieza el día con intención! Tu rutina de mañana marca la diferencia.',
  'Tu piel se renovó mientras dormías. Ayúdala a brillar hoy. 🌅',
  'Consistencia es el mejor ingrediente. ¡No te saltes hoy!',
];

const ES_PM = [
  'Fin del día. Tu piel acumuló todo -- es hora de resetear. 🌙',
  'La rutina de noche de hoy es el brillo de mañana. Vale la pena.',
  'Tu piel se repara mientras duermes -- dale lo que necesita primero. ✨',
  '2 minuticos antes de dormir. Tu piel te lo agradecerá.',
  'Límpiate el día. Literalmente. Tu piel merece empezar de cero. 🌿',
  'Modo noche: activado. Rutina: activada. Tú puedes.',
  'Lo mejor que puedes hacer por tu yo de mañana? Tu rutina. Ahora mismo.',
];

export const scheduleDailyReminders = async (
  morningTime = '8:00 AM',
  eveningTime = '10:00 PM'
) => {
  try {
    // Cancel existing reminders first
    await Notifications.cancelAllScheduledNotificationsAsync();

    const parseMorning = parseTime(morningTime);
    const parseEvening = parseTime(eveningTime);

    const lang = (await AsyncStorage.getItem('userLanguage')) || 'en';
    const day = new Date().getDay();
    const amMessages = lang === 'es' ? ES_AM : EN_AM;
    const pmMessages = lang === 'es' ? ES_PM : EN_PM;
    const amTitle = lang === 'es' ? '¡Buenos días!' : 'Good morning!';
    const pmTitle = lang === 'es' ? '¡Es hora de tu rutina!' : 'Evening routine time!';

    // Schedule morning notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: amTitle,
        body: amMessages[day % amMessages.length],
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
        title: pmTitle,
        body: pmMessages[day % pmMessages.length],
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

export const scheduleTrialReminders = async () => {
  try {
    const lang = (await AsyncStorage.getItem('userLanguage')) || 'en';

    const messages = [
      {
        seconds: 3600,
        title: lang === 'es' ? '¡Bienvenido a Dr. Acne Premium! 🌿' : 'Welcome to Dr. Acne Premium! 🌿',
        body: lang === 'es'
          ? 'Tu prueba gratuita de 3 dias ha comenzado. Esta noche, prueba tu rutina personalizada.'
          : 'Your 3-day free trial has started. Tonight, try your personalized routine and see the difference.',
      },
      {
        seconds: 86400,
        title: lang === 'es' ? '¿Como se siente tu piel? ✨' : 'How is your skin feeling? ✨',
        body: lang === 'es'
          ? 'Dia 2 de tu prueba. La consistencia es todo -- no te saltes esta noche.'
          : 'Day 2 of your free trial. Consistency is everything -- don\'t skip tonight.',
      },
      {
        seconds: 172800,
        title: lang === 'es' ? 'Tu prueba gratuita termina mañana 🌙' : 'Your free trial ends tomorrow 🌙',
        body: lang === 'es'
          ? 'Has llegado hasta aquí -- tu piel lo ha notado. Mantén tus resultados con Dr. Acne Premium.'
          : 'You have made it this far -- your skin has noticed. Keep your results with Dr. Acne Premium.',
      },
    ];

    for (const msg of messages) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: msg.title,
          body: msg.body,
          sound: true,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: msg.seconds,
          repeats: false,
        },
      });
    }

    console.log('Trial reminders scheduled');
    return true;
  } catch (error) {
    console.log('Trial reminder schedule error:', error.message);
    return false;
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
