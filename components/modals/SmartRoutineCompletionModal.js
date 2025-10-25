// components/modals/SmartRoutineCompletionModal.js
import React from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#999999',
  darkGray: '#666666',
  lightGray: '#E5E5E5',
  smartBlue: '#82b2df',
};

export default function SmartRoutineCompletionModal({ visible, onClose, routineData }) {
  if (!routineData) return null;

  const { concernName, concernColor, dayProducts = [], nightProducts = [] } = routineData;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.headerContainer}>
            <Image 
              source={require('../../assets/images/Banner Smart Routine.png')}
              style={styles.banner}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeTxt}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <Text style={styles.mainTitle}>
                Your <Text style={[styles.highlight, { color: concernColor }]}>Smart Routine</Text> is Ready!
              </Text>

              <View style={[styles.badge, { backgroundColor: `${concernColor}20` }]}>
                <Text style={[styles.badgeTxt, { color: concernColor }]}>
                  {concernName}
                </Text>
              </View>

              <Text style={styles.subtitle}>
                Your personalized {concernName?.toLowerCase()} treatment routine
              </Text>

              <Text style={styles.routineTitle}>
                Your {dayProducts.length + nightProducts.length}-Step Routine:
              </Text>

              {dayProducts.length > 0 && (
                <View style={styles.stepCard}>
                  <View style={styles.stepHeader}>
                    <Image
                      source={require('../../assets/images/sunscreen.png')}
                      style={styles.stepIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.stepTitle}>Morning ({dayProducts.length})</Text>
                  </View>
                  {dayProducts.map((product, index) => (
                    <View key={product.id || index} style={styles.productRow}>
                      <View style={[styles.productDot, { backgroundColor: concernColor }]} />
                      <Text style={styles.productName}>{product.name}</Text>
                    </View>
                  ))}
                </View>
              )}

              {nightProducts.length > 0 && (
                <View style={styles.stepCard}>
                  <View style={styles.stepHeader}>
                    <Image
                      source={require('../../assets/images/jar cream.png')}
                      style={styles.stepIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.stepTitle}>Evening ({nightProducts.length})</Text>
                  </View>
                  {nightProducts.map((product, index) => (
                    <View key={product.id || index} style={styles.productRow}>
                      <View style={[styles.productDot, { backgroundColor: concernColor }]} />
                      <Text style={styles.productName}>{product.name}</Text>
                    </View>
                  ))}
                </View>
              )}

              <Text style={styles.infoMessage}>
                You'll find your complete routine under "Smart Routine Hub"
              </Text>
              <Text style={styles.infoSubtext}>
                Access it anytime you need it!
              </Text>
            </ScrollView>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={[styles.primaryBtn, { backgroundColor: concernColor }]}
              onPress={onClose}
            >
              <Text style={styles.primaryBtnTxt}>Go to Smart Routine Hub</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 24,
    width: '100%',
    maxWidth: 500,
    height: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  headerContainer: {
    height: 100,
    position: 'relative',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BRAND_COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  closeTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: BRAND_COLORS.darkGray,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 32,
  },
  highlight: {
    fontWeight: '700',
  },
  badge: {
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 10,
  },
  badgeTxt: {
    fontSize: 13,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  routineTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 16,
  },
  stepCard: {
    backgroundColor: BRAND_COLORS.cream,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: BRAND_COLORS.lightGray,
  },
  stepIcon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: BRAND_COLORS.black,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  productDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
  },
  productName: {
    flex: 1,
    fontSize: 14,
    color: BRAND_COLORS.darkGray,
    lineHeight: 20,
  },
  infoMessage: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.primary,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  infoSubtext: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: BRAND_COLORS.lightGray,
  },
  primaryBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryBtnTxt: {
    color: BRAND_COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});