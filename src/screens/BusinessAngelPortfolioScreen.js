import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput, Switch } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

// Mock data for startup portfolio (unchanged)
const MOCK_STARTUP_PORTFOLIO = [
  {
    id: '1',
    name: 'GreenPower Solutions',
    logo: require('../../assets/1.jpeg'),
    sector: 'GreenTech',
    foundedYear: 2021,
    investmentAmount: 200000,
    status: 'Actif',
    description: 'Développe des solutions innovantes d\'énergie renouvelable pour les entreprises et les particuliers.',
    founders: ['Emma Dupont', 'Lucas Martin'],
    performanceScore: 85,
    reportingFrequency: 'Trimestriel',
    nextMilestone: 'Levée de série A en Q3 2024',
  },
  {
    id: '2',
    name: 'MedTech Innovations',
    logo: require('../../assets/2.jpeg'),
    sector: 'HealthTech',
    foundedYear: 2022,
    investmentAmount: 150000,
    status: 'En développement',
    description: 'Plateforme de télémédecine avancée utilisant l\'intelligence artificielle pour améliorer les diagnostics.',
    founders: ['Sophie Leroy', 'Antoine Dupuis'],
    performanceScore: 72,
    reportingFrequency: 'Mensuel',
    nextMilestone: 'Obtention certification médicale',
  },
  {
    id: '3',
    name: 'EduLearn Platform',
    logo: require('../../assets/3.jpeg'),
    sector: 'EdTech',
    foundedYear: 2023,
    investmentAmount: 100000,
    status: 'Nouveau',
    description: 'Plateforme d\'apprentissage personnalisé utilisant l\'IA pour adapter les parcours éducatifs.',
    founders: ['Clara Rousseau', 'Thomas Mercier'],
    performanceScore: 65,
    reportingFrequency: 'Semestriel',
    nextMilestone: 'Lancement version beta',
  },
];

// Status color mapping
const STATUS_COLORS = {
  'Actif': '#4CAF50',      // Green for active
  'En développement': '#FF9800', // Orange for in development
  'Nouveau': '#2196F3',    // Blue for new
  'Suspendu': '#F44336',   // Red for suspended
};

const BusinessAngelPortfolioScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [activeOnly, setActiveOnly] = useState(false);
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const SECTORS = ['GreenTech', 'HealthTech', 'EdTech', 'FinTech', 'AITech'];
  const STATUSES = Object.keys(STATUS_COLORS);

  const filterStartups = () => {
    return MOCK_STARTUP_PORTFOLIO.filter(startup => {
      const matchesSearch = 
        startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesActiveFilter = !activeOnly || startup.status === 'Actif';
      
      const matchesSectorFilter = !selectedSector || startup.sector === selectedSector;
      
      const matchesStatusFilter = !selectedStatus || startup.status === selectedStatus;

      return matchesSearch && 
             matchesActiveFilter && 
             matchesSectorFilter && 
             matchesStatusFilter;
    });
  };

  const renderStartupCard = ({ item }) => (
    <Animatable.View 
      animation="fadeIn" 
      duration={800} 
      style={styles.startupCard}
    >
      <View style={styles.startupCardHeader}>
        <Image source={item.logo} style={styles.startupLogo} />
        <View style={styles.startupHeaderInfo}>
          <View style={styles.nameStatusContainer}>
            <Text style={styles.startupName}>{item.name}</Text>
            <View 
              style={[
                styles.statusBadge, 
                { backgroundColor: STATUS_COLORS[item.status] + '20' }
              ]}
            >
              <Text 
                style={[
                  styles.statusText, 
                  { color: STATUS_COLORS[item.status] }
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
          <View style={styles.sectorBadge}>
            <Text style={styles.sectorText}>{item.sector}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.startupDescription} numberOfLines={3}>
        {item.description}
      </Text>
      
      {/* Rest of the card remains the same */}
      <View style={styles.startupStats}>
        <View style={styles.statItem}>
          <MaterialCommunityIcons name="calendar" size={20} color="#4A148C" />
          <Text style={styles.statLabel}>Fondée en</Text>
          <Text style={styles.statValue}>{item.foundedYear}</Text>
        </View>
        <View style={styles.statItem}>
          <MaterialCommunityIcons name="cash" size={20} color="#4A148C" />
          <Text style={styles.statLabel}>Investissement</Text>
          <Text style={styles.statValue}>{item.investmentAmount} €</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.detailButton}
        onPress={() => navigation.navigate('StartupDetailScreen', { startup: item })}
      >
        <LinearGradient
          colors={['#4A148C', '#7B1FA2']}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.detailButtonText}>Détails du projet</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );

  const renderFilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={filterModalVisible}
      onRequestClose={() => setFilterModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <Animatable.View 
          animation="slideInUp" 
          style={styles.filterModalContent}
        >
          <Text style={styles.filterModalTitle}>Filtrer mes investissements</Text>
          
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Afficher uniquement les startups actives</Text>
            <Switch
              value={activeOnly}
              onValueChange={setActiveOnly}
              color="#4A148C"
            />
          </View>
          
          <Text style={styles.filterSectionTitle}>Secteur</Text>
          <View style={styles.chipContainer}>
            {SECTORS.map(sector => (
              <TouchableOpacity
                key={sector}
                style={[
                  styles.sectorChip,
                  selectedSector === sector && styles.selectedSectorChip
                ]}
                onPress={() => setSelectedSector(
                  selectedSector === sector ? null : sector
                )}
              >
                <Text style={[
                  styles.sectorChipText,
                  selectedSector === sector && styles.selectedSectorChipText
                ]}>{sector}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.filterSectionTitle}>Statut</Text>
          <View style={styles.chipContainer}>
            {STATUSES.map(status => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusChip,
                  selectedStatus === status && {
                    backgroundColor: STATUS_COLORS[status],
                  }
                ]}
                onPress={() => setSelectedStatus(
                  selectedStatus === status ? null : status
                )}
              >
                <Text style={[
                  styles.statusChipText,
                  selectedStatus === status && styles.selectedStatusChipText
                ]}>{status}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity 
            style={styles.applyFilterButton}
            onPress={() => setFilterModalVisible(false)}
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
          <Text style={styles.screenTitle}>Mon Portefeuille</Text>
          
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Rechercher une startup"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
              left={<TextInput.Icon icon="magnify" />}
              right={
                <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
                  <MaterialCommunityIcons name="filter" size={24} color="#4A148C" />
                </TouchableOpacity>
              }
            />
          </View>
        </View>
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
  ...StyleSheet.flatten(StyleSheet.create({
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
    startupCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    startupLogo: {
      width: 70,
      height: 70,
      borderRadius: 35,
      marginRight: 12,
    },
    startupHeaderInfo: {
      flex: 1,
    },
    startupName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#4A148C',
      marginBottom: 8,
    },
    sectorBadge: {
      backgroundColor: 'rgba(74, 20, 140, 0.1)',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
      alignSelf: 'flex-start',
    },
    sectorText: {
      color: '#4A148C',
      fontSize: 12,
    },
    startupDescription: {
      color: '#333',
      marginBottom: 12,
      lineHeight: 20,
    },
    startupStats: {
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
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    statusText: {
      marginLeft: 8,
      color: '#333',
    },
    detailButton: {
      borderRadius: 12,
      overflow: 'hidden',
    },
    gradientButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
    },
    detailButtonText: {
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
    filterRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    filterLabel: {
      fontSize: 16,
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
    sectorChip: {
      backgroundColor: 'rgba(74, 20, 140, 0.1)',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 10,
      marginBottom: 10,
    },
    selectedSectorChip: {
      backgroundColor: '#4A148C',
    },
    sectorChipText: {
      color: '#4A148C',
    },
    selectedSectorChipText: {
      color: 'white',
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
    nameStatusContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
    },
    statusText: {
      fontSize: 12,
      fontWeight: '600',
    },
    statusChip: {
      backgroundColor: 'rgba(74, 20, 140, 0.1)',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 10,
      marginBottom: 10,
    },
    statusChipText: {
      color: '#4A148C',
    },
    selectedStatusChipText: {
      color: 'white',
    },
  })),
});

export default BusinessAngelPortfolioScreen;
