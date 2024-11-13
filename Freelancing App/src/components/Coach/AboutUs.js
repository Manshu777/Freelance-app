import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native';

const AboutUs = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [aboutDescription, setAboutDescription] = useState(
    'I am a dedicated freelancer with expertise in various fields to help clients achieve their goals.'
  );
  const [services, setServices] = useState([
    { id: 1, name: 'Web Development', description: 'Building responsive websites.' },
    { id: 2, name: 'SEO Optimization', description: 'Improving search engine rankings.' },
  ]);
  const [newService, setNewService] = useState({ name: '', description: '' });

  const handleSave = () => {
    setIsEditModalVisible(false);
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
  };

  const addService = () => {
    if (newService.name && newService.description) {
      setServices([...services, { ...newService, id: services.length + 1 }]);
      setNewService({ name: '', description: '' });
    }
  };

  const updateService = (index, key, value) => {
    const updatedServices = [...services];
    updatedServices[index][key] = value;
    setServices(updatedServices);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setIsEditModalVisible(true)}>
        <Text style={styles.editButtonText}>Edit About Us & Services</Text>
      </TouchableOpacity>

      <Text style={styles.contentText}>{aboutDescription}</Text>

      <Text style={styles.servicesTitle}>Services Provided:</Text>
      {services.map((service, index) => (
        <View key={service.id} style={styles.serviceContainer}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.serviceDescription}>{service.description}</Text>
        </View>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={handleCancel}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit About Us & Services</Text>
            <TextInput
              style={styles.input}
              value={aboutDescription}
              onChangeText={setAboutDescription}
              placeholder="About Us"
              multiline
            />

            <FlatList
              data={services}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.editItemContainer}>
                  <TextInput
                    style={styles.input}
                    value={item.name}
                    onChangeText={(text) => updateService(index, 'name', text)}
                    placeholder="Service Name"
                  />
                  <TextInput
                    style={styles.input}
                    value={item.description}
                    onChangeText={(text) => updateService(index, 'description', text)}
                    placeholder="Service Description"
                    multiline
                  />
                </View>
              )}
            />

            <View style={styles.addServiceContainer}>
              <TextInput
                style={styles.input}
                value={newService.name}
                onChangeText={(text) => setNewService({ ...newService, name: text })}
                placeholder="New Service Name"
              />
              <TextInput
                style={styles.input}
                value={newService.description}
                onChangeText={(text) =>
                  setNewService({ ...newService, description: text })
                }
                placeholder="New Service Description"
                multiline
              />
              <Button title="Add Service" onPress={addService} />
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Save" onPress={handleSave} />
              <Button title="Cancel" onPress={handleCancel} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  editItemContainer: {
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  editButton: {
    backgroundColor: '#386BF6',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  contentText: {
    fontSize: 16,
    padding: 10,
  },
  servicesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  serviceContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#000'
  },
  serviceDescription: {
    fontSize: 14,
    color: '#555',
  },
  addServiceContainer: {
    marginTop: 15,
  },
});
