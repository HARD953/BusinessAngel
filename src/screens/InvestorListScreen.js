import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  Animated,
  Platform,
  RefreshControl,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 80;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const CATEGORIES = [
  'Tous',
  'Tech & IA',
  'Fintech',
  'E-commerce',
  'Biotech',
  'CleanTech',
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const InvestorListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [investors, setInvestors] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    loadInvestors();
  }, []);

  const loadInvestors = () => {
    const mockInvestors = [
      {
        id: '1',
        name: 'Sophie Martin',
        expertise: 'Tech & IA',
        investments: 12,
        portfolio: '2.5M€',
        avatar: 'https://placeholder.com/150',
        rating: 4.8,
        successfulExits: 5,
        preferredTicketSize: '100K€ - 500K€',
        sectors: ['IA', 'SaaS', 'Mobile'],
        location: 'Paris',
        verified: true,
      },
      {
        id: '2',
        name: 'Thomas Dubois',
        expertise: 'Fintech',
        investments: 8,
        portfolio: '1.8M€',
        avatar: 'https://placeholder.com/150',
        rating: 4.5,
        successfulExits: 3,
        preferredTicketSize: '50K€ - 200K€',
        sectors: ['Fintech', 'Blockchain', 'InsurTech'],
        location: 'Lyon',
        verified: true,
      },
      {
        id: '3',
        name: 'Marie Bernard',
        expertise: 'E-commerce',
        investments: 15,
        portfolio: '3.2M€',
        avatar: 'https://placeholder.com/150',
        rating: 4.9,
        successfulExits: 7,
        preferredTicketSize: '200K€ - 1M€',
        sectors: ['E-commerce', 'D2C', 'Retail'],
        location: 'Bordeaux',
        verified: true,
      },
    ];

    setInvestors(mockInvestors);
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadInvestors();
    setIsRefreshing(false);
  };

  const filterInvestors = () => {
    return investors
      .filter(investor => {
        const matchesSearch = investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          investor.expertise.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'Tous' || investor.expertise === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'investments':
            return b.investments - a.investments;
          case 'portfolio':
            return parseFloat(b.portfolio) - parseFloat(a.portfolio);
          default:
            return a.name.localeCompare(b.name);
        }
      });
  };

  const StatItem = ({ icon, value, label }) => (
    <View style={styles.statItem}>
      <Feather name={icon} size={16} color="#2C3E50" />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const InvestorCard = ({ item, index }) => {
    const scale = scrollY.interpolate({
      inputRange: [-1, 0, 180 * index, 180 * (index + 2)],
      outputRange: [1, 1, 1, 0.8],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <View style={styles.cardHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: item.avatar }}
              style={styles.avatar}
            />
            {item.verified && (
              <View style={styles.verifiedBadge}>
                <Feather name="check" size={12} color="#FFF" />
              </View>
            )}
          </View>
          <View style={styles.investorInfo}>
            <Text style={styles.investorName}>{item.name}</Text>
            <Text style={styles.expertise}>{item.expertise}</Text>
            <View style={styles.ratingContainer}>
              <Feather name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <StatItem
            icon="trending-up"
            value={item.investments}
            label="Investissements"
          />
          <StatItem
            icon="pie-chart"
            value={item.portfolio}
            label="Portfolio"
          />
          <StatItem
            icon="check-circle"
            value={item.successfulExits}
            label="Exits"
          />
        </View>

        <View style={styles.sectorTags}>
          {item.sectors.map((sector, idx) => (
            <View key={idx} style={styles.tag}>
              <Text style={styles.tagText}>{sector}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.locationContainer}>
            <Feather name="map-pin" size={14} color="#7F8C8D" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => {
              // Implement contact action
            }}
          >
            <Text style={styles.contactButtonText}>Contacter</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -(HEADER_SCROLL_DISTANCE - 40)],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.8, 0.6],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const renderHeader = () => (
    <Animated.View
      style={[
        styles.header,
        {
          transform: [{ translateY: headerTranslateY }],
          height: headerHeight,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        },
      ]}
    >
      <View style={styles.headerBackground}>
        <View style={styles.headerContent}>
          <Animated.Text
            style={[
              styles.title,
              {
                transform: [{ scale: titleScale }],
                opacity: headerOpacity,
              },
            ]}
          >
            Investisseurs
          </Animated.Text>
          <Animated.View
            style={[
              styles.searchContainer,
              {
                opacity: headerOpacity,
                transform: [
                  {
                    translateY: scrollY.interpolate({
                      inputRange: [0, HEADER_SCROLL_DISTANCE],
                      outputRange: [0, -10],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}
          >
            <Feather name="search" size={20} color="#2C3E50" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un investisseur..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#95A5A6"
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.categoriesContainer,
              {
                opacity: scrollY.interpolate({
                  inputRange: [0, HEADER_SCROLL_DISTANCE],
                  outputRange: [1, 0],
                  extrapolate: 'clamp',
                }),
                transform: [
                  {
                    translateY: scrollY.interpolate({
                      inputRange: [0, HEADER_SCROLL_DISTANCE],
                      outputRange: [0, -20],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === category && styles.categoryButtonTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2C3E50" />
      {renderHeader()}
      <AnimatedFlatList
        contentContainerStyle={[
          styles.listContainer,
          {
            paddingTop: HEADER_MAX_HEIGHT + 10,
            paddingBottom: 80,
          },
        ]}
        data={filterInvestors()}
        renderItem={({ item, index }) => <InvestorCard item={item} index={index} />}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor="#2C3E50"
            progressViewOffset={HEADER_MAX_HEIGHT}
          />
        }
      />
      <TouchableOpacity
        style={[styles.sortButton, { bottom: 30 }]}
        onPress={() => {
          const nextSort = {
            name: 'investments',
            investments: 'portfolio',
            portfolio: 'name',
          }[sortBy];
          setSortBy(nextSort);
        }}
      >
        <Feather name="filter" size={24} color="#2C3E50" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    backgroundColor: '#2C3E50',
    paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight,
  },
  headerBackground: {
    flex: 1,
    backgroundColor: '#2C3E50',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  headerContent: {
    flex: 1,
    padding: 15,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  searchContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },
  categoriesContainer: {
    marginTop: 12,
    marginBottom: 5,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  categoryButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  categoryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: '#2C3E50',
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#2C3E50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  verifiedBadge: {
    position: 'absolute',
    right: 12,
    bottom: 0,
    backgroundColor: '#27AE60',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  investorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  investorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  expertise: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
},
rating: {
  marginLeft: 5,
  color: '#2C3E50',
  fontWeight: '600',
},
statsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: '#ECF0F1',
  paddingVertical: 15,
  marginBottom: 15,
},
statItem: {
  alignItems: 'center',
},
statValue: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#2C3E50',
  marginTop: 5,
  marginBottom: 2,
},
statLabel: {
  fontSize: 12,
  color: '#7F8C8D',
},
sectorTags: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginBottom: 15,
},
tag: {
  backgroundColor: '#ECF0F1',
  borderRadius: 15,
  paddingHorizontal: 12,
  paddingVertical: 6,
  marginRight: 8,
  marginBottom: 8,
},
tagText: {
  fontSize: 12,
  color: '#2C3E50',
},
footerContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
locationContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
locationText: {
  marginLeft: 5,
  color: '#7F8C8D',
  fontSize: 14,
},
contactButton: {
  backgroundColor: '#2C3E50',
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 20,
},
contactButtonText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '600',
},
sortButton: {
  position: 'absolute',
  right: 20,
  bottom: 20,
  backgroundColor: '#FFFFFF',
  borderRadius: 30,
  width: 60,
  height: 60,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#2C3E50',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 5,
},
});

export default InvestorListScreen;
  