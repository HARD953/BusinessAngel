import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Image } from 'react-native';
import LoginPage from './src/screens/LoginPage';
import CompanyList from './src/screens/ListeStartup';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('./assets/3.jpeg')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Cadre circulaire pour le logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              {/* <Image
                source={require('./assets/3.jpeg')}
                style={styles.logo}
                resizeMode="contain"
              /> */}
            </View>
          </View>
          
          <LoginPage />
          
          {/* Texte en bas de page */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              © 2024 InvesTrack360 - Tous droits réservés
            </Text>
            <Text style={styles.footerSubText}>
              Version 1.0.0 | Politique de confidentialité
            </Text>
          </View>
          
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: windowWidth,
    height: windowHeight,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  logoContainer: {
    width: '100%',
    height: windowHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: '80%',
    height: '80%',
  },
  // Nouveaux styles pour le footer
  footerContainer: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginTop: 'auto', // Pousse le conteneur vers le bas
  },
  footerText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  footerSubText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  }
});