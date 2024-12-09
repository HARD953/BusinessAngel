import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Image } from 'react-native';
import LoginPage from './src/screens/LoginPage';
import CompanyList from './src/screens/ListeStartup';
//import StartupDetailsScreen from './src/screens/DetailScreen';
//import StartupDetailScreen from './src/screens/DetailStartup';
import InvestorListScreen from './src/screens/InvestorListScreen';
import BusinessAngelLoginScreen from './src/screens/LoginPage';
import BusinessAngelSignUpScreen from './src/screens/BusinessAngelScreenPage';
import StartupSignupScreen from './src/screens/StartupSignupScreen';
import Navigators from './src/screens/Navigators';
import DocumentUploadScreen from './src/screens/DocumentUploadScreen';
import StartupListingScreen from './src/screens/StartupListingScreen';
import StartupDetailScreen from './src/screens/StartupDetailScreen';
//import StartupMarketDashboard from './src/screens/StartupMarketDashboard';
import BusinessAngelListScreen from './src/screens/BusinessAngelListScreen';
const windowWidth = Dimensions.get('window').width;
import BusinessAngelPortfolioScreen from './src/screens/BusinessAngelPortfolioScreen';
import BusinessAngelProfileScreen from './src/screens/BusinessAngelProfileScreen';
const windowHeight = Dimensions.get('window').height;

export default function App() {
  return (
    <Navigators />
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