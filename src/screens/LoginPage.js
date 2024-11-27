import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  Dimensions,
  StatusBar,
  ScrollView,
  Keyboard
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const BusinessAngelLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    Keyboard.dismiss();
    if (!email || !password) {
      Alert.alert(
        'Champs requis',
        'Veuillez remplir tous les champs pour continuer',
        [{ text: 'Compris', style: 'default' }]
      );
      return;
    }

    // Authentification spécifique Business Angel
    setTimeout(() => {
      navigation.navigate('InvestmentDashboard');
    }, 1000);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#4A148C', '#7B1FA2']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
          <Text style={styles.brandName}>StartupConnect</Text>
          <Text style={styles.subtitle}>Plateforme de connexion pour Business Angels et Startuppeur</Text>
            <Image 
              source={require('../../assets/image.png')} 
              style={styles.logo} 
              resizeMode="contain"
            />
          </View>

          <Animatable.View 
            animation="slideInUp"
            duration={1000}
            style={styles.formContainer}
          >
            <Text style={styles.welcomeText}>Espace Investisseurs</Text>

            <TextInput
              label="E-mail professionnel"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              mode="outlined"
              error={email.length > 0 && !validateEmail(email)}
              theme={{
                colors: { 
                  primary: '#4A148C',
                  error: '#FF6B6B',
                  placeholder: '#666',
                },
                roundness: 12,
              }}
              left={<TextInput.Icon icon="email" color="#4A148C" />}
            />

            <TextInput
              label="Mot de passe"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry={!isPasswordVisible}
              mode="outlined"
              theme={{
                colors: { 
                  primary: '#4A148C',
                  placeholder: '#666',
                },
                roundness: 12,
              }}
              left={<TextInput.Icon icon="lock" color="#4A148C" />}
              right={
                <TextInput.Icon 
                  icon={isPasswordVisible ? "eye-off" : "eye"}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  color="#4A148C"
                />
              }
            />

            <TouchableOpacity 
              style={styles.forgotPassword}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => navigation.navigate('StartupListingScreen')}
              //onPress={() => navigation.navigate('BusinessAngelListScreen')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#4A148C', '#7B1FA2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.loginButtonText}>Connexion</Text>
                <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Nouveaux investisseurs/Startuppeur</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity 
              style={styles.ssoButton}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('BusinessAngelSignUpScreen')}
            >
              <MaterialCommunityIcons name="account-plus" size={24} color="#4A148C" />
              <Text style={styles.ssoButtonText}>Créer un compte investisseur</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.ssoButton}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('StartupSignupScreen')}
            >
              <MaterialCommunityIcons name="account-plus" size={24} color="#4A148C" />
              <Text style={styles.ssoButtonText}>Créer un compte Startuppeur</Text>
            </TouchableOpacity>

            <View style={styles.helpContainer}>
              <MaterialCommunityIcons name="help-circle-outline" size={20} color="#666" />
              <Text style={styles.helpText}>Besoin d'assistance ?</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.helpLink}>Contactez notre support</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3E5F5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height * 0.45,
  },
  scrollContent: {
    flexGrow: 1,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: height * 0.08,
    paddingBottom: height * 0.04,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop:10
  },
  brandName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    padding: 4,
  },
  forgotPasswordText: {
    color: '#4A148C',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#4A148C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  gradientButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#666',
    fontWeight: '500',
  },
  ssoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: '#4A148C',
  },
  ssoButtonText: {
    color: '#4A148C',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  helpText: {
    color: '#666',
    fontSize: 14,
  },
  helpLink: {
    color: '#4A148C',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default BusinessAngelLoginScreen;