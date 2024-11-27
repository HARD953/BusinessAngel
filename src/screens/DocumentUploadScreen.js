import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  Modal,
  Image
} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';

const DocumentUploadScreen = ({ navigation, route }) => {
  const [documents, setDocuments] = useState([
    { 
      name: 'Business Plan', 
      type: null, 
      uri: null, 
      size: null,
      required: true,
      description: 'Un document détaillant votre modèle économique, stratégie et projections'
    },
    { 
      name: 'Pitch Deck', 
      type: null, 
      uri: null, 
      size: null,
      required: true,
      description: 'Présentation concise et percutante de votre startup'
    },
    { 
      name: 'Prévisions Financières', 
      type: null, 
      uri: null, 
      size: null,
      required: true,
      description: 'Projections financières détaillées sur 3-5 ans'
    },
    { 
      name: 'Autres Documents', 
      type: null, 
      uri: null, 
      size: null,
      required: false,
      description: 'Tout document complémentaire (brevets, lettres de recommandation, etc.)'
    }
  ]);

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const pickDocument = async (index) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf', 
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ],
        multiple: false
      });

      if (result.type === 'success') {
        const fileInfo = await FileSystem.getInfoAsync(result.uri);
        
        // Vérification de la taille du fichier (max 10 MB)
        if (fileInfo.size > 10 * 1024 * 1024) {
          Alert.alert('Erreur', 'Le fichier ne doit pas dépasser 10 Mo');
          return;
        }

        const updatedDocuments = [...documents];
        updatedDocuments[index] = {
          ...updatedDocuments[index],
          type: result.mimeType,
          uri: result.uri,
          size: `${(fileInfo.size / (1024 * 1024)).toFixed(2)} MB`
        };

        setDocuments(updatedDocuments);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de télécharger le document');
    }
  };

  const uploadDocuments = () => {
    const requiredDocumentsUploaded = documents
      .filter(doc => doc.required)
      .every(doc => doc.uri);
    
    if (requiredDocumentsUploaded) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      navigation.navigate('StartupDetail', { documents });
    } else {
      Alert.alert(
        'Documents incomplets', 
        'Veuillez télécharger tous les documents requis'
      );
    }
  };

  const showDocumentDetails = (doc) => {
    setSelectedDocument(doc);
    setModalVisible(true);
  };

  const renderDocumentItem = (doc, index) => (
    <TouchableOpacity 
      key={index} 
      style={[
        styles.documentItem, 
        !doc.uri && doc.required && styles.missingRequiredDocument
      ]} 
      onPress={() => pickDocument(index)}
      onLongPress={() => showDocumentDetails(doc)}
    >
      <View style={styles.documentIcon}>
        <MaterialIcons 
          name={
            doc.type === 'application/pdf' ? 'picture-as-pdf' : 
            doc.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? 'table-chart' : 
            'attach-file'
          } 
          size={24} 
          color="#4A148C" 
        />
      </View>
      <View style={styles.documentInfo}>
        <View style={styles.documentTitleRow}>
          <Text style={styles.documentName}>{doc.name}</Text>
          {doc.required && <Text style={styles.requiredTag}>Obligatoire</Text>}
        </View>
        <Text style={styles.documentMeta}>
          {doc.uri 
            ? `${doc.type} • ${doc.size}` 
            : 'Aucun document téléchargé'}
        </Text>
      </View>
      <MaterialIcons 
        name={doc.uri ? 'check-circle' : 'add-circle'} 
        size={24} 
        color={doc.uri ? '#2ECC71' : '#4A148C'} 
      />
    </TouchableOpacity>
  );

  const renderDocumentDetailsModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <BlurView intensity={50} style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedDocument?.name}</Text>
          <Text style={styles.modalDescription}>
            {selectedDocument?.description}
          </Text>
          <TouchableOpacity 
            style={styles.modalCloseButton} 
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalCloseButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Téléchargement des Documents</Text>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {documents.map(renderDocumentItem)}
        
        <View style={styles.additionalInfoContainer}>
          <View style={styles.infoCard}>
            <FontAwesome5 name="info-circle" size={24} color="#4A148C" style={styles.infoIcon} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoCardTitle}>Conseils de Candidature</Text>
              <Text style={styles.infoCardText}>
                Assurez-vous que vos documents soient clairs, récents et bien formatés. 
                Un dossier bien préparé augmente vos chances de succès.
              </Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <MaterialIcons name="attach-file" size={24} color="#4A148C" />
              <Text style={styles.statText}>Max 10 Mo par fichier</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="file-upload" size={24} color="#4A148C" />
              <Text style={styles.statText}>PDF, XLSX, DOCX acceptés</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.uploadButton} 
          onPress={uploadDocuments}
        >
          <Text style={styles.uploadButtonText}>Finaliser l'inscription</Text>
          <MaterialIcons name="cloud-upload" size={24} color="white" />
        </TouchableOpacity>
      </ScrollView>
      
      {renderDocumentDetailsModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  // ... [Tous les styles précédents restent identiques]

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'ios' ? 44 : 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  uploadButton: {
    backgroundColor: '#4A148C',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
  // Nouveaux styles
  missingRequiredDocument: {
    borderWidth: 1,
    borderColor: '#E74C3C',
  },
  documentTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  requiredTag: {
    backgroundColor: '#E74C3C',
    color: 'white',
    fontSize: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalCloseButton: {
    backgroundColor: '#4A148C',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  additionalInfoContainer: {
    marginTop: 20,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoIcon: {
    marginRight: 15,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 5,
  },
  infoCardText: {
    fontSize: 12,
    color: '#757575',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    flex: 0.48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#4A148C',
  }
});

export default DocumentUploadScreen;
