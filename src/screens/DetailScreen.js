import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome';

const StartupDetailsScreen = () => {
  // Données fictives pour l'exemple
  const startup = {
    name: "TechStart",
    logo: "https://placeholder.com/150",
    description: "Solution innovante de gestion d'énergie pour maison connectée",
    foundedYear: 2022,
    stage: "Seed",
    targetAmount: "150K€",
    amountRaised: "85K€",
    metrics: {
      minInvestment: "1000€",
      investors: 12,
      avgInvestment: "7083€",
      remainingDays: 45
    },
    investors: [
      {
        name: "Thomas Martin",
        profession: "Consultant IT",
        location: "Paris",
        investment: "15K€",
        joinedDate: "15 Mars 2024",
        image: "https://placeholder.com/50",
        portfolio: {
          totalInvestments: 5,
          successfulExits: 2
        },
        interests: ["Tech", "IoT", "Green Energy"]
      },
      {
        name: "Sophie Dubois",
        profession: "Entrepreneur",
        location: "Lyon",
        investment: "25K€",
        joinedDate: "10 Mars 2024",
        image: "https://placeholder.com/50",
        portfolio: {
          totalInvestments: 8,
          successfulExits: 3
        },
        interests: ["FinTech", "IoT", "AI"]
      },
      {
        name: "Marc Leroy",
        profession: "Médecin",
        location: "Bordeaux",
        investment: "10K€",
        joinedDate: "1 Mars 2024",
        image: "https://placeholder.com/50",
        portfolio: {
          totalInvestments: 3,
          successfulExits: 1
        },
        interests: ["HealthTech", "BioTech"]
      }
    ]
  };

  return (
    <ScrollView style={styles.container}>
      {/* En-tête avec progression de la levée de fonds */}
      <View style={styles.fundingHeader}>
        <Text style={styles.fundingTitle}>Levée de fonds en cours</Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${(parseInt(startup.amountRaised) / parseInt(startup.targetAmount.replace('K€', '000'))) * 100}%` }]} />
        </View>
        <View style={styles.fundingDetails}>
          <Text style={styles.fundingAmount}>{startup.amountRaised} / {startup.targetAmount}</Text>
          <Text style={styles.fundingDays}>🕒 {startup.metrics.remainingDays} jours restants</Text>
        </View>
      </View>

      {/* Métriques clés */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricBox}>
          <Text style={styles.metricValue}>{startup.metrics.minInvestment}</Text>
          <Text style={styles.metricLabel}>Ticket minimum</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricValue}>{startup.metrics.investors}</Text>
          <Text style={styles.metricLabel}>Investisseurs</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricValue}>{startup.metrics.avgInvestment}</Text>
          <Text style={styles.metricLabel}>Ticket moyen</Text>
        </View>
      </View>

      {/* Liste des investisseurs */}
      <View style={styles.investorsSection}>
        <Text style={styles.sectionTitle}>Communauté d'investisseurs</Text>
        {startup.investors.map((investor, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.investorCard}
          >
            <View style={styles.investorHeader}>
              <View style={styles.investorMain}>
                <Image 
                  source={{ uri: investor.image }} 
                  style={styles.investorImage}
                />
                <View style={styles.investorBasicInfo}>
                  <Text style={styles.investorName}>{investor.name}</Text>
                  <Text style={styles.investorProfession}>{investor.profession}</Text>
                  <View style={styles.locationContainer}>
                    <Icon name="map-marker" size={14} color="#2C3E50" />
                    <Text style={styles.locationText}>{investor.location}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.investmentInfo}>
                <Text style={styles.investmentAmount}>{investor.investment}</Text>
                <Text style={styles.investmentDate}>Investi le {investor.joinedDate}</Text>
              </View>
            </View>
            
            <View style={styles.investorStats}>
              <View style={styles.statItem}>
                <Icon name="briefcase" size={14} color="#2C3E50" />
                <Text style={styles.statText}>
                  {investor.portfolio.totalInvestments} investissements
                </Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="line-chart" size={14} color="#2C3E50" />
                <Text style={styles.statText}>
                  {investor.portfolio.successfulExits} exits réussis
                </Text>
              </View>
            </View>

            <View style={styles.interestsContainer}>
              {investor.interests.map((interest, i) => (
                <View key={i} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  fundingHeader: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  fundingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2C3E50',
  },
  fundingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  fundingAmount: {
    color: '#2C3E50',
    fontWeight: '600',
  },
  fundingDays: {
    color: '#7f8c8d',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  metricBox: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  metricLabel: {
    color: '#7f8c8d',
    fontSize: 12,
    marginTop: 5,
  },
  investorsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  investorCard: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 15,
  },
  investorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  investorMain: {
    flexDirection: 'row',
    flex: 1,
  },
  investorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  investorBasicInfo: {
    marginLeft: 15,
    flex: 1,
  },
  investorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  investorProfession: {
    color: '#7f8c8d',
    fontSize: 14,
    marginTop: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    color: '#7f8c8d',
    fontSize: 12,
    marginLeft: 4,
  },
  investmentInfo: {
    alignItems: 'flex-end',
  },
  investmentAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  investmentDate: {
    color: '#7f8c8d',
    fontSize: 12,
    marginTop: 4,
  },
  investorStats: {
    flexDirection: 'row',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    color: '#2C3E50',
    fontSize: 12,
    marginLeft: 6,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  interestTag: {
    backgroundColor: '#2C3E50',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    marginRight: 8,
    marginTop: 5,
  },
  interestText: {
    color: '#ffffff',
    fontSize: 12,
  }
});

export default StartupDetailsScreen;