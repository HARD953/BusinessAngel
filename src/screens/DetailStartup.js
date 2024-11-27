import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  RefreshControl
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LineChart, PieChart } from 'react-native-chart-kit';
import * as Progress from 'react-native-progress';
import * as Haptics from 'expo-haptics';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const StartupDetailScreen = ({ route, navigation }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);
  const headerScale = useSharedValue(1);

  const startup = {
    name: "EcoTech Solutions",
    logo: "https://placeholder.com/150",
    tagline: "Révolutionner l'industrie verte",
    fundraising: "2.5M€",
    valuation: "10M€",
    sector: "GreenTech",
    founded: "2022",
    location: "Paris, France",
    rating: 4.5,
    completionScore: 85,
    socialProof: {
      patents: 3,
      awards: 2,
      mediamentions: 5
    },
    kpis: {
      mrr: "150K€",
      growth: "+25%",
      customers: "45",
      burn_rate: "50K€/mois"
    },
    marketMetrics: {
      tam: "5B€",
      sam: "500M€",
      som: "50M€"
    },
    financials: {
      revenue: [0, 20, 45, 75, 100, 120],
      months: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"]
    },
    team: [
      { 
        name: "Marie Durant", 
        role: "CEO", 
        linkedin: "linkedin/mariedurant",
        experience: "Ex-Google, HEC Paris",
        image: "https://placeholder.com/50"
      },
      { 
        name: "Thomas Martin", 
        role: "CTO", 
        linkedin: "linkedin/thomasmartin",
        experience: "Ex-Amazon, École Polytechnique",
        image: "https://placeholder.com/50"
      }
    ],
    investors: [
      { name: "TechVentures", amount: "1M€", date: "2023" },
      { name: "Green Fund", amount: "1.5M€", date: "2024" }
    ],
    documents: [
      { name: "Business Plan", type: "pdf", size: "2.5 MB", date: "2024-02-15" },
      { name: "Pitch Deck", type: "pdf", size: "5.1 MB", date: "2024-02-15" },
      { name: "Prévisions Financières", type: "xlsx", size: "1.2 MB", date: "2024-02-15" },
      { name: "Due Diligence", type: "pdf", size: "3.7 MB", date: "2024-02-15" }
    ]
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 1500);
  }, []);

  const handleTabPress = (tab) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(tab);
  };

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: headerScale.value }]
    };
  });

  const touchableHighlight = () => {
    headerScale.value = withSpring(0.95);
    setTimeout(() => {
      headerScale.value = withSpring(1);
    }, 100);
  };

  const renderHeader = () => (
    <Animated.View 
      style={[styles.header, headerAnimatedStyle]}
      onTouchEnd={touchableHighlight}
    >
      <View style={styles.headerContent}>
        <Image style={styles.logo} source={{ uri: startup.logo }} />
        <View style={styles.headerInfo}>
          <Text style={styles.startupName}>{startup.name}</Text>
          <Text style={styles.tagline}>{startup.tagline}</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesome5 
                key={star}
                name={star <= startup.rating ? "star" : "star-half-alt"}
                size={16}
                color="#FFD700"
                style={{ marginRight: 2 }}
              />
            ))}
            <Text style={styles.ratingText}>({startup.rating})</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  const renderSocialProof = () => (
    <View style={styles.socialProofContainer}>
      <View style={styles.socialProofItem}>
        <MaterialIcons name="patent" size={24} color="#4A90E2" />
        <Text style={styles.socialProofText}>{startup.socialProof.patents} Patents</Text>
      </View>
      <View style={styles.socialProofItem}>
        <MaterialIcons name="stars" size={24} color="#F39C12" />
        <Text style={styles.socialProofText}>{startup.socialProof.awards} Awards</Text>
      </View>
      <View style={styles.socialProofItem}>
        <MaterialIcons name="article" size={24} color="#2ECC71" />
        <Text style={styles.socialProofText}>{startup.socialProof.mediamentions} Media Mentions</Text>
      </View>
    </View>
  );

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <Text style={styles.progressTitle}>Complétude du profil</Text>
      <Progress.Bar 
        progress={startup.completionScore / 100}
        width={null}
        height={8}
        color="#4A148C"
        unfilledColor="#E0E0E0"
        borderWidth={0}
        animated={true}
      />
      <Text style={styles.progressText}>{startup.completionScore}%</Text>
    </View>
  );

  const renderKPIs = () => (
    <View style={styles.kpiContainer}>
      <Text style={styles.sectionTitle}>KPIs</Text>
      <View style={styles.kpiGrid}>
        <View style={styles.kpiItem}>
          <Text style={styles.kpiValue}>{startup.kpis.mrr}</Text>
          <Text style={styles.kpiLabel}>MRR</Text>
        </View>
        <View style={styles.kpiItem}>
          <Text style={styles.kpiValue}>{startup.kpis.growth}</Text>
          <Text style={styles.kpiLabel}>Croissance</Text>
        </View>
        <View style={styles.kpiItem}>
          <Text style={styles.kpiValue}>{startup.kpis.customers}</Text>
          <Text style={styles.kpiLabel}>Clients</Text>
        </View>
        <View style={styles.kpiItem}>
          <Text style={styles.kpiValue}>{startup.kpis.burn_rate}</Text>
          <Text style={styles.kpiLabel}>Burn Rate</Text>
        </View>
      </View>
    </View>
  );

  const renderMarketMetrics = () => (
    <View style={styles.marketContainer}>
      <Text style={styles.sectionTitle}>Métriques de Marché</Text>
      <PieChart
        data={[
          {
            name: 'TAM',
            population: 5000,
            color: '#4A148C',
            legendFontColor: '#7F7F7F',
          },
          {
            name: 'SAM',
            population: 500,
            color: '#7B1FA2',
            legendFontColor: '#7F7F7F',
          },
          {
            name: 'SOM',
            population: 50,
            color: '#AB47BC',
            legendFontColor: '#7F7F7F',
          },
        ]}
        width={width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#FFFFFF',
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          color: (opacity = 1) => `rgba(74, 20, 140, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        center={[10, 0]}
        absolute
      />
    </View>
  );

  const renderFinancials = () => (
    <View style={styles.financialsContainer}>
      <Text style={styles.sectionTitle}>Évolution du Revenu</Text>
      <LineChart
        data={{
          labels: startup.financials.months,
          datasets: [{
            data: startup.financials.revenue
          }]
        }}
        width={width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#FFFFFF',
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(74, 20, 140, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );

  const renderTeam = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Équipe</Text>
      {startup.team.map((member, index) => (
        <View key={index} style={styles.teamMember}>
          <Image source={{ uri: member.image }} style={styles.memberImage} />
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberRole}>{member.role}</Text>
            <Text style={styles.memberExperience}>{member.experience}</Text>
          </View>
          <TouchableOpacity style={styles.linkedinButton}>
            <FontAwesome5 name="linkedin" size={20} color="#4A148C" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderInvestors = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Investisseurs</Text>
      {startup.investors.map((investor, index) => (
        <View key={index} style={styles.investorItem}>
          <View style={styles.investorInfo}>
            <Text style={styles.investorName}>{investor.name}</Text>
            <Text style={styles.investorDetails}>
              {investor.amount} • {investor.date}
            </Text>
          </View>
          <MaterialIcons name="verified" size={24} color="#4A148C" />
        </View>
      ))}
    </View>
  );

  const renderDocuments = () => (
    <View style={styles.tabContent}>
      {startup.documents.map((doc, index) => (
        <TouchableOpacity key={index} style={styles.documentItem}>
          <View style={styles.documentIcon}>
            <MaterialIcons 
              name={doc.type === 'pdf' ? 'picture-as-pdf' : 'table-chart'} 
              size={24} 
              color="#4A148C" 
            />
          </View>
          <View style={styles.documentInfo}>
            <Text style={styles.documentName}>{doc.name}</Text>
            <Text style={styles.documentMeta}>
              {doc.size} • Mis à jour le {doc.date}
            </Text>
          </View>
          <TouchableOpacity style={styles.downloadButton}>
            <MaterialIcons name="download" size={24} color="#4A148C" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4A148C', '#7B1FA2']}
            tintColor="#4A148C"
          />
        }
      >
        {renderHeader()}

        <View style={styles.contentContainer}>
          {renderSocialProof()}
          {renderProgressBar()}

          <View style={styles.tabsContainer}>
            {['overview', 'financials', 'documents'].map((tab) => (
              <TouchableOpacity 
                key={tab}
                style={[
                  styles.tab, 
                  activeTab === tab && styles.activeTab
                ]}
                onPress={() => handleTabPress(tab)}
              >
                <Text style={[
                  styles.tabText, 
                  activeTab === tab && styles.activeTabText
                ]}>
                  {tab === 'overview' ? 'Aperçu' : 
                   tab === 'financials' ? 'Financier' : 'Documents'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {activeTab === 'overview' && (
            <>
              {renderKPIs()}
              {renderMarketMetrics()}
              {renderTeam()}
              {renderInvestors()}
            </>
          )}

          {activeTab === 'financials' && (
            <>
              {renderFinancials()}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Documents Financiers</Text>
                {renderDocuments()}
              </View>
            </>
          )}

          {activeTab === 'documents' && renderDocuments()}
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('Chat', { startup })}
      >
        <MaterialIcons name="chat" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  headerInfo: {
    flex: 1,
  },
  startupName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  tagline: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 5,
},
contentContainer: {
    paddingHorizontal: 20,
},
sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 15,
},
kpiContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
},
kpiGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
},
kpiItem: {
    alignItems: 'center',
    width: '22%',
},
kpiValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A148C',
},
kpiLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 5,
},
marketContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
},
financialsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
},
section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
},
teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
},
memberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
},
memberInfo: {
    flex: 1,
},
memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A148C',
},
memberRole: {
    fontSize: 14,
    color: '#757575',
},
memberExperience: {
    fontSize: 12,
    color: '#9E9E9E',
},
linkedinButton: {
    padding: 10,
},
investorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
},
investorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A148C',
},
investorDetails: {
    fontSize: 14,
    color: '#757575',
},
tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
},
tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
},
activeTab: {
    backgroundColor: '#4A148C',
},
tabText: {
    color: '#4A148C',
    fontWeight: 'bold',
},
activeTabText: {
    color: '#FFFFFF',
},
documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
},
documentIcon: {
    marginRight: 15,
},
documentInfo: {
    flex: 1,
},
documentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A148C',
},
documentMeta: {
    fontSize: 12,
    color: '#757575',
},
downloadButton: {
    padding: 10,
},
fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4A148C',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
},
});

export default StartupDetailScreen;