import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const BUSINESS_ANGEL_DATA = {
  name: 'Marc Rousseau',
  avatar: require('../../assets/1.jpeg'),
  age: 42,
  expertise: ['GreenTech', 'HealthTech', 'FinTech'],
  totalInvestments: 750000,
  activeStartups: 5,
  bio: 'Investisseur passionné avec plus de 15 ans d\'expérience dans le développement de startups innovantes. Je crois au potentiel transformateur des technologies émergentes.',
  contacts: {
    email: 'marc.rousseau@investangel.fr',
    linkedin: 'marcrousseau',
    phone: '+33 6 12 34 56 78'
  },
  investmentPhilosophy: [
    'Soutenir des solutions technologiques durables',
    'Privilégier des équipes avec une vision long terme',
    'Investir dans des secteurs à fort impact sociétal'
  ],
  networkStats: {
    mentors: 12,
    startupsMentored: 18,
    successfulExits: 3
  }
};

const BusinessAngelProfileScreen = ({ navigation }) => {
  const renderStatCard = (icon, title, value) => (
    <Animatable.View 
      animation="fadeIn" 
      duration={800}
      style={styles.statCard}
    >
      <MaterialCommunityIcons name={icon} size={30} color="#4A148C" />
      <Text style={styles.statCardTitle}>{title}</Text>
      <Text style={styles.statCardValue}>{value}</Text>
    </Animatable.View>
  );

  const renderNetworkStat = (icon, label, value) => (
    <View style={styles.networkStatItem}>
      <MaterialCommunityIcons name={icon} size={24} color="#4A148C" />
      <View style={styles.networkStatDetails}>
        <Text style={styles.networkStatLabel}>{label}</Text>
        <Text style={styles.networkStatValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4A148C', '#7B1FA2']}
        style={styles.headerGradient}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Profil Investisseur</Text>
      </LinearGradient>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <Image 
            source={BUSINESS_ANGEL_DATA.avatar} 
            style={styles.avatar} 
          />
          <Text style={styles.businessAngelName}>
            {BUSINESS_ANGEL_DATA.name}
          </Text>
          <Text style={styles.businessAngelExpertise}>
            {BUSINESS_ANGEL_DATA.expertise.join(' • ')}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          {renderStatCard('cash', 'Total Investi', `${BUSINESS_ANGEL_DATA.totalInvestments} €`)}
          {renderStatCard('startup', 'Startups Actives', BUSINESS_ANGEL_DATA.activeStartups)}
          {renderStatCard('trophy', 'Âge', `${BUSINESS_ANGEL_DATA.age} ans`)}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Bio</Text>
          <Text style={styles.bioText}>{BUSINESS_ANGEL_DATA.bio}</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Philosophie d'Investissement</Text>
          {BUSINESS_ANGEL_DATA.investmentPhilosophy.map((principle, index) => (
            <View key={index} style={styles.principleItem}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
              <Text style={styles.principleText}>{principle}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Réseau et Impact</Text>
          {renderNetworkStat('account-group', 'Mentors', BUSINESS_ANGEL_DATA.networkStats.mentors)}
          {renderNetworkStat('lightbulb-on', 'Startups Accompagnées', BUSINESS_ANGEL_DATA.networkStats.startupsMentored)}
          {renderNetworkStat('chart-line', 'Sorties Réussies', BUSINESS_ANGEL_DATA.networkStats.successfulExits)}
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <View style={styles.contactDetails}>
            <MaterialCommunityIcons name="email" size={24} color="#4A148C" />
            <Text style={styles.contactText}>{BUSINESS_ANGEL_DATA.contacts.email}</Text>
          </View>
          <View style={styles.contactDetails}>
            <MaterialCommunityIcons name="phone" size={24} color="#4A148C" />
            <Text style={styles.contactText}>{BUSINESS_ANGEL_DATA.contacts.phone}</Text>
          </View>
          <View style={styles.contactDetails}>
            <MaterialCommunityIcons name="linkedin" size={24} color="#4A148C" />
            <Text style={styles.contactText}>LinkedIn: {BUSINESS_ANGEL_DATA.contacts.linkedin}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 16,
  },
  screenTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#4A148C',
  },
  businessAngelName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    marginTop: 10,
  },
  businessAngelExpertise: {
    color: '#666',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: width * 0.28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statCardTitle: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
  statCardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  sectionContainer: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 15,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 10,
  },
  bioText: {
    color: '#333',
    lineHeight: 22,
  },
  principleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  principleText: {
    marginLeft: 10,
    color: '#333',
  },
  networkStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  networkStatDetails: {
    marginLeft: 15,
  },
  networkStatLabel: {
    color: '#666',
    fontSize: 14,
  },
  networkStatValue: {
    color: '#4A148C',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactSection: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  contactDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    marginLeft: 15,
    color: '#333',
  },
});

export default BusinessAngelProfileScreen;