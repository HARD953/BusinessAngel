import React, { useState, useEffect } from 'react';
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
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

// Mock data - replace with actual API call
const MOCK_STARTUPS = [
  {
    id: '1',
    name: 'Visitrack360',
    sector: 'SocialNetwork',
    fundingNeeded: '500 000 FCFA',
    description: 'Mise en place de plateforme pour la gestion des supports publicitaires',
    founder: 'Diabagate',
    logo: require('../../assets/1.jpeg'), // Replace with actual logo path
    fundingStage: 'Pré-amorçage',
    totalFundRaised: '100 000 FCFA'
  },
  {
    id: '2',
    name: 'Lanfiatech',
    sector: 'Finance',
    fundingNeeded: '1000 000 FCFA',
    description: 'Intelligence artificielle pour le diagnostic précoce des maladies.',
    founder: 'Diabagate',
    logo: require('../../assets/2.jpeg'), // Replace with actual logo path
    fundingStage: 'Amorçage',
    totalFundRaised: '300 000 FCFA'
  },
  {
    id: '3',
    name: 'Myhot',
    sector: 'Social',
    fundingNeeded: '1000 000 FCFA',
    description: 'Gestion hotel et de residence meublée.',
    founder: 'Issa Ouedraogo',
    logo: require('../../assets/3.jpeg'), // Replace with actual logo path
    fundingStage: 'Amorçage',
    totalFundRaised: '300 000 FCFA'
  },
  // Add more startup entries
];

const StartupListingScreen = ({ navigation }) => {
    const [startups, setStartups] = useState(MOCK_STARTUPS);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSectors, setSelectedSectors] = useState([]);
    const [selectedFundingStage, setSelectedFundingStage] = useState(null);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status

  const SECTOR_FILTERS = [
    'GreenTech', 'HealthTech', 'FinTech', 'EdTech', 
    'AgriTech', 'AITech', 'E-commerce'
  ];

  const FUNDING_STAGES = [
    'Pré-amorçage', 'Amorçage', 'Série A', 'Série B'
  ];

  const STARTUP_CATEGORIES = [
    'Tous', 'GreenTech', 'HealthTech', 'FinTech', 
    'EdTech', 'AgriTech', 'AITech', 'E-commerce'
  ];

  const filterStartups = () => {
    return startups.filter(startup => {
      const matchesSearch = startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            startup.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSector = selectedSectors.length === 0 || 
                             selectedSectors.includes(startup.sector);
      
      const matchesFundingStage = !selectedFundingStage || 
                                   startup.fundingStage === selectedFundingStage;

      const matchesCategory = !selectedCategory || 
                               selectedCategory === 'Tous' || 
                               startup.sector === selectedCategory;

      return matchesSearch && matchesSector && matchesFundingStage && matchesCategory;
    });
  };

  const renderStartupCard = ({ item }) => (
    <Animatable.View 
      animation="fadeIn" 
      duration={800} 
      style={styles.startupCard}
    >
      <View style={styles.cardHeader}>
        <Image source={item.logo} style={styles.startupLogo} />
        <View style={styles.startupHeaderInfo}>
          <Text style={styles.startupName}>{item.name}</Text>
          <Text style={styles.startupSector}>{item.sector}</Text>
        </View>
      </View>
      
      <Text style={styles.startupDescription} numberOfLines={3}>
        {item.description}
      </Text>
      
      <View style={styles.startupDetailsContainer}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="account" size={20} color="#4A148C" />
          <Text style={styles.detailText}>Fondateur: {item.founder}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="cash" size={20} color="#4A148C" />
          <Text style={styles.detailText}>Recherche: {item.fundingNeeded}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="chart-line" size={20} color="#4A148C" />
          <Text style={styles.detailText}>Étape: {item.fundingStage}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.viewDetailsButton}
        onPress={() => navigation.navigate('StartupDetailScreen', { startup: item })}
      >
        <LinearGradient
          colors={['#4A148C', '#7B1FA2']}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.viewDetailsButtonText}>Voir les détails</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );

  const handleAuthentication = () => {
    // Toggle login state (in real app, this would involve actual authentication)
    setIsLoggedIn(!isLoggedIn);
  };

  const renderCategoryHeaders = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.categoryScrollView}
    >
      {STARTUP_CATEGORIES.map(category => (
        <TouchableOpacity 
          key={category}
          style={[
            styles.categoryHeader, 
            selectedCategory === category && styles.selectedCategoryHeader
          ]}
          onPress={() => setSelectedCategory(category)}
        >
          <Text 
            style={[
              styles.categoryHeaderText, 
              selectedCategory === category && styles.selectedCategoryHeaderText
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
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
          <Text style={styles.filterModalTitle}>Filtrer les Startups</Text>
          
          <Text style={styles.filterSectionTitle}>Secteurs</Text>
          <View style={styles.chipContainer}>
            {SECTOR_FILTERS.map(sector => (
              <Chip
                key={sector}
                selected={selectedSectors.includes(sector)}
                onPress={() => {
                  setSelectedSectors(prev => 
                    prev.includes(sector) 
                    ? prev.filter(s => s !== sector)
                    : [...prev, sector]
                  );
                }}
                style={styles.filterChip}
              >
                {sector}
              </Chip>
            ))}
          </View>
          
          <Text style={styles.filterSectionTitle}>Étape de Financement</Text>
          <View style={styles.chipContainer}>
            {FUNDING_STAGES.map(stage => (
              <Chip
                key={stage}
                selected={selectedFundingStage === stage}
                onPress={() => setSelectedFundingStage(
                  selectedFundingStage === stage ? null : stage
                )}
                style={styles.filterChip}
              >
                {stage}
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
        <View style={styles.topHeaderContainer}>
          <Text style={styles.appTitle}>StartupHub</Text>
          <TouchableOpacity 
            style={styles.authButton} 
            onPress={handleAuthentication}
          >
            <MaterialCommunityIcons 
              name={isLoggedIn ? "logout" : "login"} 
              size={24} 
              color="white" 
            />
            <Text style={styles.authButtonText}>
              {isLoggedIn ? 'Déconnexion' : 'Connexion'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Rechercher une startup"
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

        {renderCategoryHeaders()}
      </LinearGradient>
      
      {renderFilterModal()}
      
      <FlatList
        data={filterStartups()}
        renderItem={renderStartupCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>
              Aucune startup ne correspond à vos critères
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 12,
  },
  listContent: {
    padding: 16,
  },
  startupCard: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  startupLogo: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  startupHeaderInfo: {
    flex: 1,
  },
  startupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  startupSector: {
    color: '#666',
  },
  startupDescription: {
    marginBottom: 12,
    color: '#333',
  },
  startupDetailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    color: '#333',
  },
  viewDetailsButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  viewDetailsButtonText: {
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
  topHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  appTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  authButtonText: {
    color: 'white',
    marginLeft: 8,
  },
  categoryScrollView: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  categoryHeader: {
    marginRight: 12,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  selectedCategoryHeader: {
    backgroundColor: 'white',
  },
  categoryHeaderText: {
    color: 'white',
    fontWeight: '500',
  },
  selectedCategoryHeaderText: {
    color: '#4A148C',
  },
});

export default StartupListingScreen;