import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const BusinessAngelDetailScreen = ({ route, navigation }) => {
  const { angel } = route.params;

  const renderDetailSection = (title, content, icon) => (
    <View style={styles.detailSection}>
      <View style={styles.sectionHeader}>
        {icon}
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <Text style={styles.sectionContent}>{content}</Text>
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
        <Text style={styles.screenTitle}>Profil Business Angel</Text>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <View style={styles.profileHeader}>
          <Image 
            source={angel.avatar} 
            style={styles.largeAvatar} 
          />
          <Text style={styles.angelName}>{angel.name}</Text>
          <View style={styles.locationContainer}>
            <MaterialCommunityIcons name="map-marker" size={20} color="#4A148C" />
            <Text style={styles.locationText}>{angel.location}</Text>
          </View>
        </View>

        <View style={styles.specialtiesContainer}>
          {angel.specialties.map(specialty => (
            <View key={specialty} style={styles.specialtyChip}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="chart-line" size={24} color="#4A148C" />
            <Text style={styles.statLabel}>Investissements réussis</Text>
            <Text style={styles.statValue}>{angel.successfulInvestments}</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="network" size={24} color="#4A148C" />
            <Text style={styles.statLabel}>Startups accompagnées</Text>
            <Text style={styles.statValue}>{angel.networkedStartups}</Text>
          </View>
        </View>

        {renderDetailSection(
          'Biographie', 
          angel.bio, 
          <MaterialCommunityIcons name="account" size={24} color="#4A148C" />
        )}

        {renderDetailSection(
          'Gamme d\'investissement', 
          angel.investmentRange, 
          <MaterialCommunityIcons name="cash" size={24} color="#4A148C" />
        )}

        <TouchableOpacity style={styles.contactButton}>
          <LinearGradient
            colors={['#4A148C', '#7B1FA2']}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.contactButtonText}>Contacter</Text>
            <MaterialCommunityIcons name="send" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
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
    paddingVertical: 16,
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
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  largeAvatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#4A148C',
  },
  angelName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    marginTop: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    color: '#666',
    marginLeft: 8,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  specialtyChip: {
    backgroundColor: 'rgba(74, 20, 140, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginHorizontal: 4,
  },
  specialtyText: {
    color: '#4A148C',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statLabel: {
    color: '#666',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  statValue: {
    color: '#4A148C',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 4,
  },
  detailSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A148C',
    marginLeft: 12,
  },
  sectionContent: {
    color: '#333',
    lineHeight: 22,
  },
  contactButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 16,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 16,
  },
});

export default BusinessAngelDetailScreen;