import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ProgressBar, Card } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { Video, ResizeMode } from 'expo-av';
const { width, height } = Dimensions.get('window');

const StartupDetailScreen = ({ route, navigation }) => {
  const { startup } = route.params;
  const [activeTab, setActiveTab] = useState('Overview');
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  // Mock financial projections data
  const financialProjections = [
    { year: 2024, revenue: 250000, profit: 50000, growth: 0.3 },
    { year: 2025, revenue: 500000, profit: 125000, growth: 0.5 },
    { year: 2026, revenue: 1000000, profit: 300000, growth: 0.8 },
  ];

  // Mock market analysis data
  const marketAnalysis = {
    marketSize: '5 milliards €',
    growthRate: '12% par an',
    competitiveLandscape: 'Faible concurrence',
    targetCustomers: 'Entreprises PME et grands groupes',
  };

  // Mock documents data
  const documents = [
    { name: 'Business Plan', type: 'PDF', size: '2.3 MB', date: '15/03/2024' },
    { name: 'Présentation Investisseurs', type: 'PPTX', size: '5.1 MB', date: '10/02/2024' },
    { name: 'États Financiers', type: 'XLSX', size: '1.7 MB', date: '05/01/2024' },
  ];

  const renderOverviewTab = () => (
    <Animatable.View animation="fadeIn" style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Description du Projet</Text>
      <Text style={styles.descriptionText}>{startup.description}</Text>
      
      <View style={styles.fundingContainer}>
        <View style={styles.fundingRow}>
          <Text style={styles.fundingLabel}>Financement recherché</Text>
          <Text style={styles.fundingValue}>{startup.fundingNeeded}</Text>
        </View>
        <View style={styles.fundingRow}>
          <Text style={styles.fundingLabel}>Total levé à ce jour</Text>
          <Text style={styles.fundingValue}>{startup.totalFundRaised}</Text>
        </View>
        <ProgressBar 
          progress={parseFloat(startup.totalFundRaised.replace(' €', '')) / parseFloat(startup.fundingNeeded.replace(' €', ''))} 
          color="#4A148C" 
          style={styles.progressBar}
        />
      </View>
    </Animatable.View>
  );

  const renderFinancialsTab = () => (
    <Animatable.View animation="fadeIn" style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Projections Financières</Text>
      {financialProjections.map((projection, index) => (
        <Card key={index} style={styles.financialCard}>
          <Card.Content>
            <View style={styles.financialRow}>
              <Text style={styles.financialLabel}>Année</Text>
              <Text style={styles.financialValue}>{projection.year}</Text>
            </View>
            <View style={styles.financialRow}>
              <Text style={styles.financialLabel}>Revenus</Text>
              <Text style={styles.financialValue}>{projection.revenue.toLocaleString()} €</Text>
            </View>
            <View style={styles.financialRow}>
              <Text style={styles.financialLabel}>Profit</Text>
              <Text style={styles.financialValue}>{projection.profit.toLocaleString()} €</Text>
            </View>
            <View style={styles.financialRow}>
              <Text style={styles.financialLabel}>Croissance</Text>
              <Text style={styles.financialValue}>{(projection.growth * 100).toFixed(0)}%</Text>
            </View>
          </Card.Content>
        </Card>
      ))}
    </Animatable.View>
  );

  const renderMarketTab = () => (
    <Animatable.View animation="fadeIn" style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Analyse de Marché</Text>
      <Card style={styles.marketAnalysisCard}>
        <Card.Content>
          <View style={styles.marketRow}>
            <MaterialCommunityIcons name="chart-line" size={24} color="#4A148C" />
            <View>
              <Text style={styles.marketLabel}>Taille du Marché</Text>
              <Text style={styles.marketValue}>{marketAnalysis.marketSize}</Text>
            </View>
          </View>
          <View style={styles.marketRow}>
            <MaterialCommunityIcons name="trending-up" size={24} color="#4A148C" />
            <View>
              <Text style={styles.marketLabel}>Taux de Croissance</Text>
              <Text style={styles.marketValue}>{marketAnalysis.growthRate}</Text>
            </View>
          </View>
          <View style={styles.marketRow}>
            <MaterialCommunityIcons name="shield-check" size={24} color="#4A148C" />
            <View>
              <Text style={styles.marketLabel}>Paysage Concurrentiel</Text>
              <Text style={styles.marketValue}>{marketAnalysis.competitiveLandscape}</Text>
            </View>
          </View>
          <View style={styles.marketRow}>
            <MaterialCommunityIcons name="account-group" size={24} color="#4A148C" />
            <View>
              <Text style={styles.marketLabel}>Clients Cibles</Text>
              <Text style={styles.marketValue}>{marketAnalysis.targetCustomers}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </Animatable.View>
  );

  const renderFounderTab = () => (
    <Animatable.View animation="fadeIn" style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Équipe Fondatrice</Text>
      <Card style={styles.founderCard}>
        <Card.Content>
          <View style={styles.founderHeader}>
            <Image 
              source={startup.logo} 
              style={styles.founderImage} 
              resizeMode="cover"
            />
            <View style={styles.founderInfo}>
              <Text style={styles.founderName}>{startup.founder}</Text>
              <Text style={styles.founderRole}>Fondateur & CEO</Text>
            </View>
          </View>
          <Text style={styles.founderBio}>
            Entrepreneur passionné avec plus de 10 ans d'expérience dans le secteur {startup.sector}. 
            A précédemment fondé et dirigé deux startups technologiques avec succès.
          </Text>
        </Card.Content>
      </Card>
    </Animatable.View>
  );

  const renderVideoTab = () => {

  
    return (
      <Animatable.View animation="fadeIn" style={styles.tabContent}>
        <Text style={styles.sectionTitle}>Présentation Vidéo</Text>
        <View style={styles.videoContainer}>
          <Video
            ref={video}
            style={styles.video}
            source={require('../../assets/Nahawa.mp4')} 
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() =>
                status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
              }
            >
              <MaterialCommunityIcons 
                name={status.isPlaying ? "pause" : "play"} 
                size={24} 
                color="white" 
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.videoDescriptionText}>
          Découvrez en quelques minutes l'histoire, la vision et les ambitions de {startup.name}.
        </Text>
      </Animatable.View>
    );
  };

  const renderDocumentsTab = () => (
    <Animatable.View animation="fadeIn" style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Documents</Text>
      {documents.map((doc, index) => (
        <Card key={index} style={styles.documentCard}>
          <Card.Content style={styles.documentCardContent}>
            <View style={styles.documentIconContainer}>
              <MaterialCommunityIcons 
                name={
                  doc.type === 'PDF' ? 'file-pdf-box' : 
                  doc.type === 'PPTX' ? 'file-powerpoint-box' : 
                  doc.type === 'XLSX' ? 'file-excel-box' : 
                  'file-document'
                } 
                size={40} 
                color="#4A148C" 
              />
            </View>
            <View style={styles.documentDetails}>
              <Text style={styles.documentName}>{doc.name}</Text>
              <View style={styles.documentMetaContainer}>
                <Text style={styles.documentMeta}>{doc.type}</Text>
                <Text style={styles.documentMeta}>{doc.size}</Text>
                <Text style={styles.documentMeta}>{doc.date}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.downloadButton}>
              <MaterialCommunityIcons name="download" size={24} color="#4A148C" />
            </TouchableOpacity>
          </Card.Content>
        </Card>
      ))}
      <TouchableOpacity style={styles.uploadDocumentButton}>
        <LinearGradient
          colors={['#4A148C', '#7B1FA2']}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.uploadDocumentButtonText}>Télécharger un Document</Text>
          <MaterialCommunityIcons name="upload" size={20} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'Overview': return renderOverviewTab();
      case 'Financials': return renderFinancialsTab();
      case 'Market': return renderMarketTab();
      case 'Founder': return renderFounderTab();
      case 'Documents': return renderDocumentsTab();
      case 'Video': return renderVideoTab(); // Nouveau cas
      default: return renderOverviewTab();
    }
  };

  const tabs = [
    { name: 'Overview', icon: 'information' },
    { name: 'Financials', icon: 'chart-bar' },
    { name: 'Market', icon: 'earth' },
    { name: 'Founder', icon: 'account' },
    { name: 'Documents', icon: 'file-document' },
    { name: 'Video', icon: 'video' } // Nouvel onglet
  ];

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
        <View style={styles.headerContent}>
          <Image source={startup.logo} style={styles.startupLogo} />
          <Text style={styles.startupTitle}>{startup.name}</Text>
          <Text style={styles.startupSector}>{startup.sector}</Text>
        </View>

        <ScrollView 
  horizontal 
  showsHorizontalScrollIndicator={false}
  style={styles.tabScrollContainer}
>
  {tabs.map(tab => (
    <TouchableOpacity
      key={tab.name}
      style={[
        styles.tabItem,
        activeTab === tab.name && styles.activeTabItem
      ]}
      onPress={() => setActiveTab(tab.name)}
    >
      <MaterialCommunityIcons 
        name={tab.icon} 
        size={20} 
        color={activeTab === tab.name ? '#4A148C' : 'white'} 
      />
      <Text 
        style={[
          styles.tabText,
          activeTab === tab.name && styles.activeTabText
        ]}
      >
        {tab.name}
      </Text>
    </TouchableOpacity>
  ))}
</ScrollView>
      </LinearGradient>

      <ScrollView 
        style={styles.contentContainer}
        contentContainerStyle={styles.scrollViewContent}
      >
        
        {renderTabContent()}
        
        <TouchableOpacity style={styles.contactButton}>
          <LinearGradient
            colors={['#4A148C', '#7B1FA2']}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.contactButtonText}>Contacter la Startup</Text>
            <MaterialCommunityIcons name="message" size={20} color="white" />
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
    paddingBottom: 16,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 10,
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: 20,
  },
  startupLogo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 12,
  },
  startupTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  startupSector: {
    color: 'white',
    opacity: 0.8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  activeTabItem: {
    backgroundColor: 'white',
  },
  tabText: {
    color: 'white',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#4A148C',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 16,
  },
  descriptionText: {
    color: '#333',
    lineHeight: 22,
  },
  fundingContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  fundingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  fundingLabel: {
    color: '#666',
  },
  fundingValue: {
    fontWeight: 'bold',
    color: '#4A148C',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  financialCard: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  financialLabel: {
    color: '#666',
  },
  financialValue: {
    fontWeight: 'bold',
    color: '#4A148C',
  },
  marketAnalysisCard: {
    backgroundColor: 'white',
  },
  marketRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  marketLabel: {
    marginLeft: 12,
    color: '#666',
  },
  marketValue: {
    marginLeft: 12,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  founderCard: {
    backgroundColor: 'white',
  },
  founderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  founderImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  founderInfo: {
    marginLeft: 16,
  },
  founderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  founderRole: {
    color: '#666',
  },
  founderBio: {
    color: '#333',
    lineHeight: 22,
  },
  contactButton: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  contactButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
  },
  // Nouveaux styles pour l'onglet Documents
  documentCard: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  documentCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentIconContainer: {
    marginRight: 16,
  },
  documentDetails: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  documentMetaContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  documentMeta: {
    color: '#666',
    marginRight: 12,
    fontSize: 12,
  },
  downloadButton: {
    padding: 8,
  },
  uploadDocumentButton: {
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  uploadDocumentButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
  },
  tabScrollContainer: {
    flexGrow: 0,
    paddingHorizontal: 16,
    paddingTop:10
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,

    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10, // Space between tabs
  },
  videoCard: {
    backgroundColor: 'white',
    marginBottom: 16,
  },
  videoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    backgroundColor: '#F3E5F5',
    borderRadius: 12,
  },
  videoPlaceholderText: {
    marginTop: 16,
    color: '#4A148C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoDescriptionText: {
    textAlign: 'center',
    color: '#666',
    marginHorizontal: 16,
    lineHeight: 22,
  },
  videoContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: 250,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 30,
  },
  button: {
    padding: 10,
  },
});

export default StartupDetailScreen;