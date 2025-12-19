// app/EditNameScreen.js - WITH SPANISH I18N (COMPLETE)
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { DrAcneButton } from '../components/ui/DrAcneButton';
import { t } from './i18n';

const BRAND_COLORS = {
  primary: '#7CB342',
  secondary: '#FF7A7A',
  cream: '#FDF5E6',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#999999',
  lightGray: '#E5E5E5',
};

export default function EditNameScreen({ onBack, onNavigateHome }) {
  const [name, setName] = useState('');
  const [initialName, setInitialName] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadCurrentName();
  }, []);

  const loadCurrentName = async () => {
    try {
      const savedName = await AsyncStorage.getItem('userName');
      if (savedName) {
        setName(savedName);
        setInitialName(savedName);
      }
    } catch (error) {
      console.error('Error loading name:', error);
    }
  };

  const handleNameChange = (text) => {
    setName(text);
    setHasChanges(text.trim() !== initialName && text.trim().length > 0);
  };

  const handleSave = async () => {
    const trimmedName = name.trim();
    
    if (trimmedName.length === 0) {
      Alert.alert(t('editName.alert_error_title'), t('editName.alert_error_message'));
      return;
    }

    try {
      await AsyncStorage.setItem('userName', trimmedName);
      Alert.alert(
        t('editName.alert_saved_title'),
        t('editName.alert_saved_message'),
        [
          {
            text: t('editName.alert_ok'),
            onPress: () => {
              if (onBack) onBack();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert(t('editName.alert_error_title'), t('editName.alert_save_error'));
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.topNavigation}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>{t('editName.back')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNavigateHome} style={styles.logoButton}>
            <Image 
              source={require('../assets/images/dracne-logo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>
            {t('editName.title')} <Text style={styles.titleHighlight}>{t('editName.title_highlight')}</Text>
          </Text>
          <Text style={styles.subtitle}>{t('editName.subtitle')}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t('editName.label')}</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={handleNameChange}
            placeholder={t('editName.placeholder')}
            placeholderTextColor={BRAND_COLORS.gray}
            autoFocus
            maxLength={50}
          />
          <Text style={styles.helperText}>
            {t('editName.characters', { count: name.length })}
          </Text>
        </View>

        <View style={styles.avatarPreview}>
          <Text style={styles.previewLabel}>{t('editName.preview')}</Text>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {name.trim().length > 0 ? name.trim().charAt(0).toUpperCase() : '?'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <DrAcneButton
          title={hasChanges ? t('editName.save_changes') : t('editName.no_changes')}
          onPress={handleSave}
          disabled={!hasChanges}
          style={styles.saveButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 18,
    fontWeight: '600',
    color: BRAND_COLORS.primary,
  },
  logoButton: {
    padding: 8,
  },
  logoImage: {
    width: 70,
    height: 45,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: BRAND_COLORS.black,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 34,
  },
  titleHighlight: {
    color: BRAND_COLORS.primary,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 8,
  },
  input: {
    backgroundColor: BRAND_COLORS.white,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: BRAND_COLORS.black,
    borderWidth: 2,
    borderColor: BRAND_COLORS.lightGray,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  helperText: {
    fontSize: 12,
    color: BRAND_COLORS.gray,
    marginTop: 8,
    textAlign: 'right',
  },
  avatarPreview: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: BRAND_COLORS.black,
    marginBottom: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: BRAND_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BRAND_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: BRAND_COLORS.white,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 40,
    backgroundColor: '#FAFBFC',
    alignItems: 'center',
  },
  saveButton: {
    width: '100%',
  },
});