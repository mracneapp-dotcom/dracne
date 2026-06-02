import React, { useState, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, { Path, G, Text as SvgText, TSpan, Circle } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from '../i18n';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = Math.min(width * 0.82, 320);
const R = WHEEL_SIZE / 2;
const CX = R;
const CY = R;

const SEGMENTS = [
  { label: '10%\nOFF',      short: '10% OFF',      color: '#9C27B0' },
  { label: '20%\nOFF',      short: '20% OFF',      color: '#00BCD4' },
  { label: '10%\nOFF',      short: '10% OFF',      color: '#FF9800' },
  { label: '30%\nOFF',      short: '30% OFF',      color: '#4CAF50' },
  { label: '20%\nOFF',      short: '20% OFF',      color: '#2196F3' },
  { label: '50%\nOFF',      short: '50% OFF',      color: '#F44336' },
  { label: '10%\nOFF',      short: '10% OFF',      color: '#FFC107' },
  { label: '1 MONTH\nFREE', short: '1 Month Free', color: '#388E3C' },
];

const WINNER_INDICES = [3, 4];
// Rotation to land segment N at top: 360*7 - (N*45 + 22.5)
const TARGET_ROTATION = {
  3: 2362.5,
  4: 2317.5,
};
const MAX_ROTATION = 2520;

const toRad = (deg) => (deg * Math.PI) / 180;

const slicePath = (cx, cy, r, startDeg, endDeg) => {
  const x1 = cx + r * Math.sin(toRad(startDeg));
  const y1 = cy - r * Math.cos(toRad(startDeg));
  const x2 = cx + r * Math.sin(toRad(endDeg));
  const y2 = cy - r * Math.cos(toRad(endDeg));
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;
};

export default function SpinWheelModal({ visible, onClose, onClaim }) {
  const [phase, setPhase] = useState('idle');
  const [winner, setWinner] = useState(null);
  const spinAnim = useRef(new Animated.Value(0)).current;

  const handleSpin = () => {
    if (phase !== 'idle') return;
    const idx = WINNER_INDICES[Math.floor(Math.random() * WINNER_INDICES.length)];
    setPhase('spinning');
    spinAnim.setValue(0);
    Animated.timing(spinAnim, {
      toValue: TARGET_ROTATION[idx],
      duration: 3500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setWinner(SEGMENTS[idx]);
      setPhase('result');
    });
  };

  const handleClaim = async () => {
    await AsyncStorage.setItem('spinWheelShown', 'true');
    onClaim(winner?.short || '');
  };

  const handleDismiss = async () => {
    await AsyncStorage.setItem('spinWheelShown', 'true');
    onClose();
  };

  const rotate = spinAnim.interpolate({
    inputRange: [0, MAX_ROTATION],
    outputRange: ['0deg', `${MAX_ROTATION}deg`],
  });

  const fontSize = R * 0.085;
  const lineHeight = R * 0.1;
  const labelR = R * 0.63;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.header}>{t('onboarding.spinWheel.header')}</Text>
          <Text style={styles.subtext}>{t('onboarding.spinWheel.subtext')}</Text>

          <View style={styles.wheelWrapper}>
            <View style={styles.pointerWrap}>
              <View style={styles.pointerTriangle} />
            </View>

            <Animated.View style={{ transform: [{ rotate }] }}>
              <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
                {SEGMENTS.map((seg, i) => {
                  const startDeg = i * 45;
                  const endDeg = (i + 1) * 45;
                  const centerDeg = i * 45 + 22.5;
                  const lx = CX + labelR * Math.sin(toRad(centerDeg));
                  const ly = CY - labelR * Math.cos(toRad(centerDeg));
                  const lines = seg.label.split('\n');
                  return (
                    <G key={i}>
                      <Path
                        d={slicePath(CX, CY, R - 1, startDeg, endDeg)}
                        fill={seg.color}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                      <SvgText
                        x={lx}
                        y={ly}
                        textAnchor="middle"
                        fill="white"
                        fontSize={fontSize}
                        fontWeight="bold"
                        transform={`rotate(${centerDeg}, ${lx}, ${ly})`}
                      >
                        {lines.map((line, li) => (
                          <TSpan
                            key={li}
                            x={lx}
                            dy={li === 0 ? -(lineHeight * (lines.length - 1)) / 2 : lineHeight}
                          >
                            {line}
                          </TSpan>
                        ))}
                      </SvgText>
                    </G>
                  );
                })}
                <Circle cx={CX} cy={CY} r={R * 0.11} fill="#fff" />
              </Svg>
            </Animated.View>
          </View>

          {phase === 'idle' && (
            <>
              <TouchableOpacity style={styles.spinBtn} onPress={handleSpin} activeOpacity={0.85}>
                <Text style={styles.spinBtnText}>{t('onboarding.spinWheel.spin_button')}</Text>
              </TouchableOpacity>
              <Text style={styles.expires}>{t('onboarding.spinWheel.expires_text')}</Text>
              <TouchableOpacity onPress={handleDismiss}>
                <Text style={styles.noThanks}>{t('onboarding.spinWheel.no_thanks')}</Text>
              </TouchableOpacity>
            </>
          )}

          {phase === 'spinning' && (
            <TouchableOpacity style={[styles.spinBtn, styles.spinBtnDisabled]} disabled>
              <Text style={styles.spinBtnText}>{t('onboarding.spinWheel.spin_button')}</Text>
            </TouchableOpacity>
          )}

          {phase === 'result' && winner && (
            <>
              <Text style={styles.youWon}>{t('onboarding.spinWheel.you_won')}</Text>
              <Text style={styles.wonValue}>{winner.short}</Text>
              <TouchableOpacity style={styles.claimBtn} onPress={handleClaim} activeOpacity={0.85}>
                <Text style={styles.claimBtnText}>{t('onboarding.spinWheel.claim_button')}</Text>
              </TouchableOpacity>
              <Text style={styles.expires}>{t('onboarding.spinWheel.expires_text')}</Text>
              <TouchableOpacity onPress={handleDismiss}>
                <Text style={styles.noThanks}>{t('onboarding.spinWheel.no_thanks')}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 36,
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtext: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 18,
  },
  wheelWrapper: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 16,
  },
  pointerWrap: {
    position: 'absolute',
    top: 0,
    zIndex: 10,
    alignItems: 'center',
  },
  pointerTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 13,
    borderRightWidth: 13,
    borderTopWidth: 22,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FF5722',
  },
  spinBtn: {
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 60,
    marginBottom: 12,
  },
  spinBtnDisabled: {
    backgroundColor: '#aaa',
  },
  spinBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 1,
  },
  expires: {
    fontSize: 12,
    color: '#E53935',
    textAlign: 'center',
    marginBottom: 10,
  },
  noThanks: {
    fontSize: 13,
    color: '#999',
    textDecorationLine: 'underline',
    marginTop: 2,
  },
  youWon: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  wonValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#4CAF50',
    marginBottom: 16,
  },
  claimBtn: {
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 60,
    marginBottom: 12,
  },
  claimBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
