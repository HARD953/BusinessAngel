import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

// Mock data for Business Angels
const MOCK_BUSINESS_ANGELS = [
  {
    id: '1',
    name: 'Marie Dupont',
    avatar: require('../../assets/1.jpeg'),
    specialties: ['FinTech', 'GreenTech'],
    investmentRange: '50 000 € - 250 000 €',
    location: 'Paris',
    bio: 'Entrepreneur serial avec 15 ans d\'expérience en investissement tech. Passionnée par les solutions durables et innovantes.',
    successfulInvestments: 12,
    networkedStartups: 25,
  },
  {
    id: '2',
    name: 'Jean-Marc Leroux',
    avatar: require('../../assets/2.jpeg'),
    specialties: ['HealthTech', 'AITech'],
    investmentRange: '100 000 € - 500 000 €',
    location: 'Lyon',
    bio: 'Ancien dirigeant de groupe pharmaceutique, expert en transformation digitale et médecine de précision.',
    successfulInvestments: 8,
    networkedStartups: 18,
  },
  {
    id: '3',
    name: 'Sophie Martin',
    avatar: require('../../assets/3.jpeg'),
    specialties: ['EdTech', 'E-commerce'],
    investmentRange: '75 000 € - 300 000 €',
    location: 'Toulouse',
    bio: 'Investisseuse et mentor spécialisée dans les technologies éducatives et les plateformes de e-commerce.',
    successfulInvestments: 10,
    networkedStartups: 22,
  },
];

const BusinessAngelListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const SPECIALTY_FILTERS = [
    'FinTech', 'GreenTech', 'HealthTech', 'EdTech', 
    'AITech', 'E-commerce', 'AgriTech'
  ];

  const LOCATION_FILTERS = [
    'Paris', 'Lyon', 'Toulouse', 'Marseille', 
    'Bordeaux', 'Lille', 'Strasbourg'
  ];

  const filterBusinessAngels = () => {
    return MOCK_BUSINESS_ANGELS.filter(angel => {
      const matchesSearch = 
        angel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        angel.bio.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSpecialties = selectedSpecialties.length === 0 || 
        selectedSpecialties.some(specialty => 
          angel.specialties.includes(specialty)
        );
      
      const matchesLocation = !selectedLocation || 
        angel.location === selectedLocation;

      return matchesSearch && matchesSpecialties && matchesLocation;
    });
  };

  const renderBusinessAngelCard = ({ item }) => (
    <Animatable.View 
      animation="fadeIn" 
      duration={800} 
      style={styles.angelCard}
    >
      <View style={styles.angelCardHeader}>
        <Image source={item.avatar} style={styles.angelAvatar} />
        <View style={styles.angelHeaderInfo}>
          <Text style={styles.angelName}>{item.name}</Text>
          <Text style={styles.angelLocation}>
            <MaterialCommunityIcons name="map-marker" size={16} color="#4A148C" /> 
            {item.location}
          </Text>
        </View>
      </View>
      
      <View style={styles.specialtiesContainer}>
        {item.specialties.map(specialty => (
          <View key={specialty} style={styles.specialtyChip}>
            <Text style={styles.specialtyText}>{specialty}</Text>
          </View>
        ))}
      </View>
      
      <Text style={styles.angelBio} numberOfLines={3}>
        {item.bio}
      </Text>
      
      <View style={styles.angelStatsContainer}>
        <View style={styles.statItem}>
          <MaterialCommunityIcons name="chart-line" size={20} color="#4A148C" />
          <Text style={styles.statLabel}>Investissements réussis</Text>
          <Text style={styles.statValue}>{item.successfulInvestments}</Text>
        </View>
        <View style={styles.statItem}>
          <MaterialCommunityIcons name="network" size={20} color="#4A148C" />
          <Text style={styles.statLabel}>Startups accompagnées</Text>
          <Text style={styles.statValue}>{item.networkedStartups}</Text>
        </View>
      </View>
      
      <View style={styles.investmentRangeContainer}>
        <MaterialCommunityIcons name="cash" size={20} color="#4A148C" />
        <Text style={styles.investmentRangeLabel}>Gamme d'investissement</Text>
        <Text style={styles.investmentRangeValue}>{item.investmentRange}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.contactButton}
        onPress={() => navigation.navigate('BusinessAngelDetailScreen', { angel: item })}
      >
        <LinearGradient
          colors={['#4A148C', '#7B1FA2']}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.contactButtonText}>Voir le profil détaillé</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );

  const renderFilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isFilterModalVisible}
      onRequestClose={() => setIsFilterModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <Animatable.View 
          animation="slideInUp" 
          style={styles.filterModalContent}
        >
          <Text style={styles.filterModalTitle}>Filtrer les Business Angels</Text>
          
          <Text style={styles.filterSectionTitle}>Spécialités</Text>
          <View style={styles.chipContainer}>
            {SPECIALTY_FILTERS.map(specialty => (
              <Chip
                key={specialty}
                selected={selectedSpecialties.includes(specialty)}
                onPress={() => {
                  setSelectedSpecialties(prev => 
                    prev.includes(specialty) 
                    ? prev.filter(s => s !== specialty)
                    : [...prev, specialty]
                  );
                }}
                style={styles.filterChip}
              >
                {specialty}
              </Chip>
            ))}
          </View>
          
          <Text style={styles.filterSectionTitle}>Localisation</Text>
          <View style={styles.chipContainer}>
            {LOCATION_FILTERS.map(location => (
              <Chip
                key={location}
                selected={selectedLocation === location}
                onPress={() => setSelectedLocation(
                  selectedLocation === location ? null : location
                )}
                style={styles.filterChip}
              >
                {location}
              </Chip>
            ))}
          </View>
          
          <TouchableOpacity 
            style={styles.applyFilterButton}
            onPress={() => setIsFilterModalVisible(false)}
          >
            <Text style={styles.applyFilterButtonText}>Appliquer les filtres</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4A148C', '#7B1FA2']}
        style={styles.headerGradient}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.screenTitle}>Business Angels</Text>
          
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Rechercher un Business Angel"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
              left={<TextInput.Icon icon="magnify" />}
              right={
                <TouchableOpacity onPress={() => setIsFilterModalVisible(true)}>
                  <MaterialCommunityIcons name="filter" size={24} color="#4A148C" />
                </TouchableOpacity>
              }
            />
          </View>
        </View>
      </LinearGradient>
      
      {renderFilterModal()}
      
      <FlatList
        data={filterBusinessAngels()}
        renderItem={renderBusinessAngelCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>
              Aucun Business Angel ne correspond à vos critères
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
  },
  headerGradient: {
    paddingBottom: 16,
  },
  headerContainer: {
    paddingHorizontal: 16,
  },
  screenTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 12,
  },
  listContent: {
    padding: 16,
  },
  angelCard: {
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
  angelCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  angelAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 12,
  },
  angelHeaderInfo: {
    flex: 1,
  },
  angelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  angelLocation: {
    color: '#666',
    alignItems: 'center',
  },
  specialtiesContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  specialtyChip: {
    backgroundColor: 'rgba(74, 20, 140, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
  },
  specialtyText: {
    color: '#4A148C',
    fontSize: 12,
  },
  angelBio: {
    color: '#333',
    marginBottom: 12,
  },
  angelStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  statValue: {
    color: '#4A148C',
    fontWeight: 'bold',
  },
  investmentRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  investmentRangeLabel: {
    color: '#666',
    marginLeft: 8,
  },
  investmentRangeValue: {
    color: '#4A148C',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  contactButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  filterModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  filterModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A148C',
    textAlign: 'center',
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  filterChip: {
    marginRight: 10,
    marginBottom: 10,
  },
  applyFilterButton: {
    backgroundColor: '#4A148C',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  applyFilterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.2,
  },
  emptyListText: {
    fontSize: 18,
    color: '#666',
  },
});

export default BusinessAngelListScreen;