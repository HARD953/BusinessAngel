import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';

const StartupSignupScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    founders: [''],
    sector: '',
    foundedYear: '',
    logo: null,
    email: '',
    linkedin: '',
    description: '',
    fundraising: '',
    mrr: '',
    kpis: {
      customers: '',
      growth: ''
    }
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addFounder = () => {
    setFormData(prev => ({
      ...prev,
      founders: [...prev.founders, '']
    }));
  };

  const updateFounder = (index, value) => {
    const updatedFounders = [...formData.founders];
    updatedFounders[index] = value;
    setFormData(prev => ({
      ...prev,
      founders: updatedFounders
    }));
  };

  const pickLogo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData(prev => ({
        ...prev,
        logo: result.assets[0].uri
      }));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const handleSubmit = () => {
    // Validation logique à ajouter
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('StartupDetail', { startup: formData });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Inscription Startup</Text>

        <TouchableOpacity 
          style={styles.logoUpload} 
          onPress={pickLogo}
        >
          {formData.logo ? (
            <Image 
              source={{ uri: formData.logo }} 
              style={styles.uploadedLogo} 
            />
          ) : (
            <>
              <MaterialIcons name="add-a-photo" size={40} color="#4A148C" />
              <Text style={styles.logoUploadText}>Logo de la startup</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nom de l'entreprise</Text>
          <TextInput
            style={styles.input}
            value={formData.companyName}
            onChangeText={(text) => updateFormData('companyName', text)}
            placeholder="Nom de votre startup"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fondateurs</Text>
          {formData.founders.map((founder, index) => (
            <TextInput
              key={index}
              style={styles.input}
              value={founder}
              onChangeText={(text) => updateFounder(index, text)}
              placeholder={`Nom du fondateur ${index + 1}`}
            />
          ))}
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={addFounder}
          >
            <MaterialIcons name="add" size={24} color="#4A148C" />
            <Text style={styles.addButtonText}>Ajouter un fondateur</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Secteur d'activité</Text>
          <TextInput
            style={styles.input}
            value={formData.sector}
            onChangeText={(text) => updateFormData('sector', text)}
            placeholder="Ex: FinTech, GreenTech..."
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Année de création</Text>
          <TextInput
            style={styles.input}
            value={formData.foundedYear}
            onChangeText={(text) => updateFormData('foundedYear', text)}
            placeholder="Année"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Levée de fonds actuelle</Text>
          <TextInput
            style={styles.input}
            value={formData.fundraising}
            onChangeText={(text) => updateFormData('fundraising', text)}
            placeholder="Montant en €"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Revenus Récurrents (MRR)</Text>
          <TextInput
            style={styles.input}
            value={formData.mrr}
            onChangeText={(text) => updateFormData('mrr', text)}
            placeholder="Montant mensuel en €"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={()=>{navigation.navigate('DocumentUploadScreen')}}
          >
            <Text style={styles.submitButtonText}>Téléchargement de document</Text>
            <MaterialIcons name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // Styles similaires à StartupDetailScreen pour une cohérence visuelle
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 44 : 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 20,
    textAlign: 'center',
  },
  logoUpload: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadedLogo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  logoUploadText: {
    color: '#4A148C',
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: '#4A148C',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#4A148C',
    marginLeft: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#4A148C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  }
});

export default StartupSignupScreen;