import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const STARTUP_DATA = [
  {
    id: '1',
    name: 'Visitrack360',
    symbol: 'VST',
    currentValue: 1250000,
    change: 85000,
    changePercent: 7.3,
    isPositive: true,
    historicalData: [
      500000, 600000, 750000, 900000, 1100000, 1250000
    ]
  },
  {
    id: '2',
    name: 'Lanfiatech',
    symbol: 'LNF',
    currentValue: 950000,
    change: -35000,
    changePercent: -3.5,
    isPositive: false,
    historicalData: [
      400000, 500000, 650000, 800000, 1000000, 950000
    ]
  },
  {
    id: '3',
    name: 'Myhot',
    symbol: 'MHT',
    currentValue: 750000,
    change: 25000,
    changePercent: 3.4,
    isPositive: true,
    historicalData: [
      300000, 400000, 550000, 700000, 900000, 750000
    ]
  }
];

const StartupStockDashboard = () => {
  const [selectedStartup, setSelectedStartup] = useState(STARTUP_DATA[0]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{selectedStartup.name}</Text>
      <Text style={styles.headerSymbol}>{selectedStartup.symbol}</Text>
    </View>
  );

  const renderStockPrice = () => (
    <View style={styles.priceContainer}>
      <Text style={styles.currentPrice}>
        {selectedStartup.currentValue.toLocaleString()} FCFA
      </Text>
      <View style={[
        styles.changeContainer, 
        { 
          backgroundColor: selectedStartup.isPositive 
            ? 'rgba(0, 255, 0, 0.1)' 
            : 'rgba(255, 0, 0, 0.1)' 
        }
      ]}>
        <Text style={[
          styles.changeText, 
          { 
            color: selectedStartup.isPositive 
              ? 'green' 
              : 'red' 
          }
        ]}>
          {selectedStartup.change > 0 ? '+' : ''}
          {selectedStartup.change.toLocaleString()} FCFA 
          ({selectedStartup.changePercent}%)
        </Text>
      </View>
    </View>
  );

  const renderChart = () => {
    const chartData = {
      labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin'],
      datasets: [
        {
          data: selectedStartup.historicalData,
          color: selectedStartup.isPositive 
            ? (opacity = 1) => `rgba(0, 255, 0, ${opacity})` 
            : (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          strokeWidth: 2
        }
      ]
    };

    return (
      <LineChart
        data={chartData}
        width={width}
        height={220}
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          color: () => selectedStartup.isPositive ? 'green' : 'red',
          labelColor: () => 'black',
          style: { borderRadius: 16 },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: selectedStartup.isPositive ? 'green' : 'red'
          }
        }}
        bezier
        style={styles.chart}
      />
    );
  };

  const renderTimeframeSelector = () => {
    const timeframes = ['1J', '1S', '1M', '3M', '6M', '1A'];
    return (
      <View style={styles.timeframeContainer}>
        {timeframes.map(frame => (
          <TouchableOpacity 
            key={frame}
            style={[
              styles.timeframeButton,
              selectedTimeframe === frame && styles.selectedTimeframe
            ]}
            onPress={() => setSelectedTimeframe(frame)}
          >
            <Text style={[
              styles.timeframeText,
              selectedTimeframe === frame && styles.selectedTimeframeText
            ]}>
              {frame}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderStartupList = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.startupListContainer}
    >
      {STARTUP_DATA.map(startup => (
        <TouchableOpacity
          key={startup.id}
          style={[
            styles.startupListItem,
            selectedStartup.id === startup.id && styles.selectedStartupItem
          ]}
          onPress={() => setSelectedStartup(startup)}
        >
          <Text style={styles.startupListName}>{startup.name}</Text>
          <View style={styles.startupListPriceContainer}>
            <Text style={[
              styles.startupListPrice,
              { 
                color: startup.isPositive 
                  ? 'green' 
                  : 'red' 
              }
            ]}>
              {startup.currentValue.toLocaleString()} FCFA
            </Text>
            <Text style={[
              styles.startupListChange,
              { 
                color: startup.isPositive 
                  ? 'green' 
                  : 'red' 
              }
            ]}>
              {startup.changePercent}%
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <ScrollView style={styles.container}>
      {renderHeader()}
      {renderStockPrice()}
      {renderChart()}
      {renderTimeframeSelector()}
      {renderStartupList()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSymbol: {
    fontSize: 16,
    color: 'gray',
  },
  priceContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  currentPrice: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  changeContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  changeText: {
    fontWeight: 'bold',
  },
  chart: {
    marginVertical: 8,
  },
  timeframeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  timeframeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  selectedTimeframe: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
  },
  timeframeText: {
    color: 'gray',
  },
  selectedTimeframeText: {
    color: 'black',
    fontWeight: 'bold',
  },
  startupListContainer: {
    paddingVertical: 16,
  },
  startupListItem: {
    width: 200,
    marginHorizontal: 8,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  selectedStartupItem: {
    backgroundColor: '#e0e0e0',
  },
  startupListName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  startupListPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  startupListPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  startupListChange: {
    fontSize: 16,
  },
});

export default StartupStockDashboard;