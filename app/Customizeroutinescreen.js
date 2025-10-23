import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
};

export default function CustomizeRoutineScreen({ navigation }) {
  const [routineType, setRoutineType] = useState('day'); // 'day' | 'night' | 'smart'
  const [products, setProducts] = useState([]);
  const [productInput, setProductInput] = useState('');

  useEffect(() => {
    loadRoutine();
  }, [routineType]);

  const loadRoutine = async () => {
    try {
      let data;
      if (routineType === 'day') {
        data = await AsyncStorage.getItem('myDayRoutine');
      } else if (routineType === 'night') {
        data = await AsyncStorage.getItem('myNightRoutine');
      } else {
        // For smart, just show empty for now - you can extend this
        data = null;
      }

      if (data) {
        const parsed = JSON.parse(data);
        const productsList = routineType === 'day' 
          ? parsed.dayProducts || [] 
          : parsed.nightProducts || [];
        setProducts(productsList);
      } else {
        setProducts([]);
      }
    } catch (e) {
      console.error('Load error:', e);
    }
  };

  const addProduct = () => {
    if (!productInput.trim()) {
      Alert.alert('Error', 'Please enter a product name');
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: productInput.trim(),
      category: 'Custom',
    };

    setProducts([...products, newProduct]);
    setProductInput('');
  };

  const removeProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const saveRoutine = async () => {
    try {
      const routineData = {
        ...(routineType === 'day' 
          ? { dayProducts: products } 
          : { nightProducts: products }),
        createdAt: new Date().toISOString(),
        savedByUser: true,
      };

      const storageKey = routineType === 'day' ? 'myDayRoutine' : 'myNightRoutine';
      await AsyncStorage.setItem(storageKey, JSON.stringify(routineData));

      Alert.alert('Success', 'Routine saved!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (e) {
      Alert.alert('Error', 'Failed to save routine');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Customize Routine</Text>
      </View>

      {/* Dropdown */}
      <View style={styles.dropdown}>
        <TouchableOpacity
          style={[styles.dropdownBtn, routineType === 'day' && styles.dropdownBtnActive]}
          onPress={() => setRoutineType('day')}
        >
          <Text style={styles.dropdownText}>☀️ Day</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dropdownBtn, routineType === 'night' && styles.dropdownBtnActive]}
          onPress={() => setRoutineType('night')}
        >
          <Text style={styles.dropdownText}>🌙 Night</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dropdownBtn, routineType === 'smart' && styles.dropdownBtnActive]}
          onPress={() => setRoutineType('smart')}
        >
          <Text style={styles.dropdownText}>✨ Smart</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Add Product */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter product name"
            value={productInput}
            onChangeText={setProductInput}
          />
          <TouchableOpacity style={styles.addBtn} onPress={addProduct}>
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Products List */}
        <View style={styles.list}>
          {products.map((product, index) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productNum}>
                <Text style={styles.productNumText}>{index + 1}</Text>
              </View>
              <Text style={styles.productName}>{product.name}</Text>
              <TouchableOpacity onPress={() => removeProduct(product.id)}>
                <Text style={styles.removeBtn}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Save Button */}
      {products.length > 0 && (
        <TouchableOpacity style={styles.saveBtn} onPress={saveRoutine}>
          <Text style={styles.saveBtnText}>Save Routine</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND_COLORS.cream,
  },
  header: {
    padding: 20,
  },
  backText: {
    color: BRAND_COLORS.primary,
    fontSize: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: BRAND_COLORS.black,
  },
  dropdown: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  dropdownBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: BRAND_COLORS.white,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  dropdownBtnActive: {
    backgroundColor: BRAND_COLORS.primary,
    borderColor: BRAND_COLORS.primary,
  },
  dropdownText: {
    textAlign: 'center',
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: BRAND_COLORS.white,
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
  },
  addBtn: {
    backgroundColor: BRAND_COLORS.primary,
    paddingHorizontal: 25,
    borderRadius: 12,
    justifyContent: 'center',
  },
  addBtnText: {
    color: BRAND_COLORS.white,
    fontWeight: 'bold',
  },
  list: {
    gap: 10,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BRAND_COLORS.white,
    padding: 15,
    borderRadius: 12,
    gap: 12,
  },
  productNum: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BRAND_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productNumText: {
    color: BRAND_COLORS.white,
    fontWeight: 'bold',
  },
  productName: {
    flex: 1,
    fontSize: 16,
  },
  removeBtn: {
    color: BRAND_COLORS.secondary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  saveBtn: {
    backgroundColor: BRAND_COLORS.primary,
    padding: 18,
    margin: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  saveBtnText: {
    color: BRAND_COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});