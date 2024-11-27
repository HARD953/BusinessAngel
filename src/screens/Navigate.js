import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import { StyleSheet,View,Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import LoginPage from './LoginPage';
import CompanyList from './ListeStartup';
//import StartupDetailsScreen from './DetailScreen';
import InvestorListScreen from './InvestorListScreen';
import BusinessAngelLoginScreen from './LoginPage';
import BusinessAngelSignUpScreen from './BusinessAngelScreenPage';
import StartupSignupScreen from './StartupSignupScreen';
import DocumentUploadScreen from './DocumentUploadScreen';
import StartupDetailScreen from './StartupDetailScreen';
import StartupListingScreen from './StartupListingScreen';
import BusinessAngelListScreen from './BusinessAngelListScreen';
import BusinessAngelDetailScreen from './BusinessAngelDetailScreen';
import BusinessAngelPortfolioScreen from './BusinessAngelPortfolioScreen';

// import YourComponent1 from './Pages/Coordonne';
  
const Stack = createStackNavigator();

const CustomHeaderTitle = ({ title }) => (
  <View style={styles.headerTitleContainer}>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

export default function Navigue({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="BusinessAngelLoginScreen">
        <Stack.Screen name="BusinessAngelLoginScreen" component={BusinessAngelLoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="BusinessAngelSignUpScreen" component={BusinessAngelSignUpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="DocumentUploadScreen" component={DocumentUploadScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="StartupSignupScreen" component={StartupSignupScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="StartupDetailScreen" component={StartupDetailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="StartupListingScreen" component={StartupListingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="BusinessAngelListScreen" component={BusinessAngelListScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="BusinessAngelDetailScreen" component={BusinessAngelDetailScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="BusinessAngelPortfolioScreen" component={BusinessAngelPortfolioScreen} options={{ headerShown: false }}/>
      </Stack.Navigator> 
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    // Ajoutez un décalage à gauche selon votre préférence
    justifyContent:'flex-start'
  },
  headerTitle: {
    fontSize: 18, // Ajustez la taille de la police selon votre préférence
    fontWeight: 'bold',
    color: '#D0D3D4',
    marginLeft:15
  },
});
