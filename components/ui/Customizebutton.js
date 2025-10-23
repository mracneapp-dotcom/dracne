import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BRAND_COLORS = {
  primary: '#7CB342',
  white: '#FFFFFF',
};

export default function CustomizeButton({ navigation }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    checkIfShouldShow();
  }, []);

  const checkIfShouldShow = async () => {
    try {
      const count = await AsyncStorage.getItem('routineLogCount');
      if (count && parseInt(count) >= 1) {
        setShow(true);
      }
    } catch (e) {
      console.error('Error checking log count:', e);
    }
  };

  if (!show) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CustomizeRoutine')}
      >
        <Text style={styles.buttonText}>Customize Routine</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    backgroundColor: BRAND_COLORS.primary,
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: BRAND_COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});