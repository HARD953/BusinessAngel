import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Dimensions
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { height } = Dimensions.get('window');

const BusinessAngelSignUpScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    profession: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    investmentPreference: ''
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const { firstName, lastName,profession, email, phone, password, confirmPassword } = formData;
    
    if (!firstName || !profession || !lastName || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Champs incomplets', 'Veuillez remplir tous les champs');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Email invalide', 'Veuillez entrer un email valide');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Mot de passe incorrect', 'Les mots de passe ne correspondent pas');
      return false;
    }
    return true;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      // Logique d'inscription
      navigation.navigate('ProfileCompletionScreen');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#4A148C', '#7B1FA2']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animatable.View 
            animation="fadeIn"
            duration={1000}
            style={styles.formContainer}
          >
            <Text style={styles.title}>Inscription Business Angel</Text>
            <Text style={styles.subtitle}>Rejoignez notre réseau d'investisseurs</Text>

            <View style={styles.nameContainer}>
              <TextInput
                label="Prénom"
                value={formData.firstName}
                onChangeText={(text) => updateFormData('firstName', text)}
                style={[styles.input, styles.halfInput]}
                mode="outlined"
                theme={inputTheme}
                left={<TextInput.Icon icon="account" />}
              />
              <TextInput
                label="Nom"
                value={formData.lastName}
                onChangeText={(text) => updateFormData('lastName', text)}
                style={[styles.input, styles.halfInput]}
                mode="outlined"
                theme={inputTheme}
                left={<TextInput.Icon icon="account" />}
              />
            </View>

            <TextInput
              label="Profession"
              value={formData.profession}
              onChangeText={(text) => updateFormData('profession', text)}
              style={styles.input}
              mode="outlined"
              keyboardType="email-address"
              theme={inputTheme}
              left={<TextInput.Icon icon="briefcase" />}
            />

            <TextInput
              label="Email professionnel"
              value={formData.email}
              onChangeText={(text) => updateFormData('email', text)}
              style={styles.input}
              mode="outlined"
              keyboardType="email-address"
              theme={inputTheme}
              left={<TextInput.Icon icon="email" />}
            />

            <TextInput
              label="Téléphone"
              value={formData.phone}
              onChangeText={(text) => updateFormData('phone', text)}
              style={styles.input}
              mode="outlined"
              keyboardType="phone-pad"
              theme={inputTheme}
              left={<TextInput.Icon icon="phone" />}
            />

            <TextInput
              label="Mot de passe"
              value={formData.password}
              onChangeText={(text) => updateFormData('password', text)}
              style={styles.input}
              mode="outlined"
              secureTextEntry={!passwordVisibility.password}
              theme={inputTheme}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={passwordVisibility.password ? "eye-off" : "eye"}
                  onPress={() => setPasswordVisibility(prev => ({
                    ...prev, 
                    password: !prev.password
                  }))}
                />
              }
            />

            <TextInput
              label="Confirmation du mot de passe"
              value={formData.confirmPassword}
              onChangeText={(text) => updateFormData('confirmPassword', text)}
              style={styles.input}
              mode="outlined"
              secureTextEntry={!passwordVisibility.confirmPassword}
              theme={inputTheme}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={passwordVisibility.confirmPassword ? "eye-off" : "eye"}
                  onPress={() => setPasswordVisibility(prev => ({
                    ...prev, 
                    confirmPassword: !prev.confirmPassword
                  }))}
                />
              }
            />

            <TouchableOpacity 
              style={styles.signUpButton}
              onPress={handleSignUp}
            >
              <LinearGradient
                colors={['#4A148C', '#7B1FA2']}
                style={styles.gradientButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.signUpButtonText}>Créer mon compte</Text>
                <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Déjà un compte ?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('BusinessAngelLoginScreen')}>
                <Text style={styles.loginLink}>Connectez-vous</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const inputTheme = {
  colors: { 
    primary: '#4A148C',
    error: '#FF6B6B',
    placeholder: '#666'
  },
  roundness: 12,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3E5F5',
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height * 0.45,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 30,
    margin: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A148C',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  halfInput: {
    width: '48%',
  },
  signUpButton: {
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    color: '#666',
    marginRight: 8,
  },
  loginLink: {
    color: '#4A148C',
    fontWeight: 'bold',
  },
});

export default BusinessAngelSignUpScreen;