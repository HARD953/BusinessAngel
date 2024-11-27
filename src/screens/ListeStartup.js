import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Palette de couleurs
const COLORS = {
  primary: '#2C3E50',    // Bleu marine principal
  secondary: '#34495E',  // Version plus claire du bleu marine
  accent: '#3498DB',     // Bleu clair pour les accents
  background: '#F5F6F8', // Fond légèrement gris
  white: '#FFFFFF',
  text: {
    primary: '#2C3E50',
    secondary: '#7F8C8D',
    light: '#BDC3C7',
  },
  border: '#ECF0F1',
};

// Données exemple
const companies = [
  {
    id: 1,
    name: "Tech Innovate",
    sector: "Technologies",
    employees: "10-50",
    location: "Paris",
    description: "Startup spécialisée en IA et machine learning",
    funding: "2M€",
    icon: "💡",
    trending: true,
  },
  {
    id: 2,
    name: "Green Solutions",
    sector: "Environnement",
    employees: "5-20",
    location: "Lyon",
    description: "Solutions écologiques pour entreprises",
    funding: "800K€",
    icon: "🌱",
    trending: false,
  },
  {
    id: 3,
    name: "Digital Health",
    sector: "Santé",
    employees: "20-100",
    location: "Bordeaux",
    description: "Applications de santé connectée",
    funding: "1.5M€",
    icon: "⚕️",
    trending: true,
  },
  {
    id: 4,
    name: "Digital Health",
    sector: "Santé",
    employees: "20-100",
    location: "Bordeaux",
    description: "Applications de santé connectée",
    funding: "1.5M€",
    icon: "⚕️",
    trending: true,
  },
  {
    id: 5,
    name: "Digital Health",
    sector: "Santé",
    employees: "20-100",
    location: "Bordeaux",
    description: "Applications de santé connectée",
    funding: "1.5M€",
    icon: "⚕️",
    trending: true,
  },
];

const CompanyList = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Découvrir</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>Explorez les startups innovantes</Text>
        
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={COLORS.text.secondary} />
          <Text style={styles.searchPlaceholder}>Rechercher une startup...</Text>
        </View>
      </View>

      {/* Filtres */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.filtersContainer}
      >
        {['Tous', 'Tech', 'Santé', 'Environnement', 'Finance'].map((filter, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.filterButton, 
              index === 0 && styles.filterButtonActive
            ]}
          >
            <Text style={[
              styles.filterText,
              index === 0 && styles.filterTextActive
            ]}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Liste des entreprises */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {companies.map((company) => (
          <TouchableOpacity key={company.id} style={styles.companyCard}>
            <View style={styles.companyHeader}>
              <View style={styles.companyHeaderLeft}>
                <View style={styles.iconContainer}>
                  <Text style={styles.companyIcon}>{company.icon}</Text>
                </View>
                <View style={styles.companyInfo}>
                  <Text style={styles.companyName}>{company.name}</Text>
                  <Text style={styles.companySector}>{company.sector}</Text>
                </View>
              </View>
              {company.trending && (
                <View style={styles.trendingBadge}>
                  <Ionicons name="trending-up" size={14} color={COLORS.accent} />
                  <Text style={styles.trendingText}>Trending</Text>
                </View>
              )}
            </View>

            <View style={styles.companyDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="people-outline" size={16} color={COLORS.text.secondary} />
                <Text style={styles.detailText}>{company.employees}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="location-outline" size={16} color={COLORS.text.secondary} />
                <Text style={styles.detailText}>{company.location}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="trending-up-outline" size={16} color={COLORS.text.secondary} />
                <Text style={styles.detailText}>{company.funding}</Text>
              </View>
            </View>

            <Text style={styles.companyDescription}>{company.description}</Text>

            <View style={styles.cardFooter}>
              <TouchableOpacity style={styles.contactButton}>
                <Text style={styles.contactButtonText}>En savoir plus</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.favoriteButton}>
                <Ionicons name="bookmark-outline" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingTop: 50,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.text.light,
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: COLORS.text.secondary,
    fontSize: 15,
  },
  filtersContainer: {
    padding: 15,
    backgroundColor: COLORS.white,
    height:'10%'
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: COLORS.background,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.text.secondary,
    fontWeight: '500',
  },
  filterTextActive: {
    color: COLORS.white,
  },
  scrollView: {
    padding: 15,
  },
  companyCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  companyHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyIcon: {
    fontSize: 24,
  },
  companyInfo: {
    marginLeft: 12,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  companySector: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendingText: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  companyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 12,
    backgroundColor: COLORS.background,
    borderRadius: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 6,
    color: COLORS.text.secondary,
    fontSize: 14,
  },
  companyDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
    marginBottom: 15,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
    marginRight: 12,
  },
  contactButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  favoriteButton: {
    padding: 10,
    backgroundColor: COLORS.background,
    borderRadius: 12,
  },
});

export default CompanyList;