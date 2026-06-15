import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import Purchases from 'react-native-purchases';
import { t } from '../i18n';

const SLIDE2_OPTIONS = [
  'slide2_option1',
  'slide2_option2',
  'slide2_option3',
  'slide2_option4',
];

export default function SurveyModal({ visible, onComplete, onClose }) {
  const [slide, setSlide] = useState(1);
  const [slide2Answer, setSlide2Answer] = useState(null);
  const [slide3Answer, setSlide3Answer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getDeviceId = async () => {
    try {
      let id = await AsyncStorage.getItem('@dracne_device_id');
      if (!id) {
        id = Math.random().toString(36).slice(2) + Date.now().toString(36);
        await AsyncStorage.setItem('@dracne_device_id', id);
      }
      return id;
    } catch (_) {
      return 'unknown';
    }
  };

  const saveAnswers = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const db = getFirestore();
      const data = {
        slide2Answer,
        slide3Answer,
        timestamp: serverTimestamp(),
        platform: Platform.OS,
      };
      if (user) {
        await setDoc(doc(db, 'users', user.uid, 'surveyResponses', 'exit'), data);
      } else {
        const deviceId = await getDeviceId();
        await setDoc(doc(db, 'anonymous', deviceId, 'surveyResponses', 'exit'), data);
      }
    } catch (_) {}
    try {
      await AsyncStorage.setItem('surveyShown', 'true');
    } catch (_) {}
  };

  const handleClaim = async () => {
    setIsLoading(true);
    const answers = { slide2Answer, slide3Answer };
    try {
      await saveAnswers();
      if (Purchases.isConfigured) {
        const offerings = await Purchases.getOfferings();
        const surveyOffering = offerings.all['survey_free_trial'];
        const pkg = surveyOffering?.monthly ?? surveyOffering?.availablePackages?.[0];
        if (pkg) {
          await Purchases.purchasePackage(pkg);
          setIsLoading(false);
          setSlide(4);
          setTimeout(() => onComplete(answers), 2000);
          return;
        }
      }
    } catch (_) {
      try { await saveAnswers(); } catch (_2) {}
    }
    setIsLoading(false);
    onComplete(answers);
  };

  const handleClose = async () => {
    try { await AsyncStorage.setItem('surveyShown', 'true'); } catch (_) {}
    onClose();
  };

  const renderDots = () => (
    <View style={styles.dotsRow}>
      {[1, 2, 3].map((n) => (
        <View key={n} style={[styles.dot, slide >= n && styles.dotActive]} />
      ))}
    </View>
  );

  const renderSlide1 = () => (
    <View style={styles.slideContent}>
      <Text style={styles.slideHeadline}>{t('onboarding.survey.slide1_headline')}</Text>
      <Text style={styles.slideSubtext}>{t('onboarding.survey.slide1_subtext')}</Text>
      <TouchableOpacity style={styles.primaryBtn} onPress={() => setSlide(2)} activeOpacity={0.85}>
        <Text style={styles.primaryBtnText}>{t('onboarding.survey.slide1_button')}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSlide2 = () => (
    <View style={styles.slideContent}>
      <Text style={styles.slideHeadline2}>{t('onboarding.survey.slide2_headline')}</Text>
      {SLIDE2_OPTIONS.map((key) => {
        const selected = slide2Answer === key;
        return (
          <TouchableOpacity
            key={key}
            style={[styles.optionBtn, selected && styles.optionBtnSelected]}
            onPress={() => setSlide2Answer(key)}
            activeOpacity={0.85}
          >
            <Text style={[styles.optionBtnText, selected && styles.optionBtnTextSelected]}>
              {t(`onboarding.survey.${key}`)}
            </Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        style={[styles.primaryBtn, !slide2Answer && styles.primaryBtnDisabled]}
        onPress={() => slide2Answer && setSlide(3)}
        activeOpacity={0.85}
        disabled={!slide2Answer}
      >
        <Text style={styles.primaryBtnText}>{t('onboarding.survey.slide2_next')}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSlide3 = () => (
    <View style={styles.slideContent}>
      <Text style={styles.slideHeadline2}>{t('onboarding.survey.slide3_headline')}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={t('onboarding.survey.slide3_placeholder')}
        placeholderTextColor="#aaa"
        multiline
        numberOfLines={3}
        maxLength={500}
        value={slide3Answer}
        onChangeText={setSlide3Answer}
      />
      <Text style={styles.charCounter}>{slide3Answer.length}/500</Text>
      <TouchableOpacity
        style={[styles.primaryBtn, isLoading && styles.primaryBtnDisabled]}
        onPress={handleClaim}
        activeOpacity={0.85}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.primaryBtnText}>{t('onboarding.survey.slide3_button')}</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.disclaimer}>{t('onboarding.survey.slide3_disclaimer')}</Text>
    </View>
  );

  const renderSuccess = () => (
    <View style={styles.successContent}>
      <View style={styles.checkCircle}>
        <Text style={styles.checkMark}>✓</Text>
      </View>
      <Text style={styles.successText}>{t('onboarding.survey.success_message')}</Text>
    </View>
  );

  if (slide === 4) {
    return (
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
          {renderSuccess()}
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>DrAcne</Text>
            <TouchableOpacity onPress={handleClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={styles.closeBtn}>X</Text>
            </TouchableOpacity>
          </View>
          {renderDots()}
          {slide === 1 && renderSlide1()}
          {slide === 2 && renderSlide2()}
          {slide === 3 && renderSlide3()}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    maxWidth: 340,
    width: '90%',
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#5B8C3E',
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeaderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
  closeBtn: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  dotActive: {
    backgroundColor: '#5B8C3E',
  },
  slideContent: {
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  slideHeadline: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  slideHeadline2: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  slideSubtext: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 23,
  },
  optionBtn: {
    borderWidth: 1.5,
    borderColor: '#5B8C3E',
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
    marginBottom: 10,
    alignItems: 'center',
  },
  optionBtnSelected: {
    backgroundColor: '#5B8C3E',
  },
  optionBtnText: {
    color: '#5B8C3E',
    fontSize: 15,
    fontWeight: '600',
  },
  optionBtnTextSelected: {
    color: '#fff',
  },
  primaryBtn: {
    backgroundColor: '#5B8C3E',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 4,
  },
  primaryBtnDisabled: {
    backgroundColor: '#aaa',
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: '#5B8C3E',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#1a1a1a',
    minHeight: 90,
    textAlignVertical: 'top',
    marginBottom: 6,
  },
  charCounter: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginBottom: 14,
  },
  disclaimer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
  successContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#5B8C3E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkMark: {
    fontSize: 40,
    color: '#fff',
    fontWeight: '800',
  },
  successText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
});
