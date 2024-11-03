import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  StyleSheet,
} from 'react-native';
import styles from '../../styles/CoachProfilecss';

const FreelancerProjects = () => {
  const [projects, setProjects] = useState([
    {
      id: '1',
      title: 'Tech Solutions Website',
      description:
        'A responsive website for a technology solutions provider, featuring service listings, customer testimonials, and an engaging user interface.',
      image: require('../../assets/images/TechSolutions.png'),
    },
    {
      id: '2',
      title: 'Fitness Pro Website',
      description:
        'A modern fitness and training website offering online workout plans, video tutorials, and booking functionality for personal coaching sessions.',
      image: require('../../assets/images/FitnessPro.png'),
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const handleEdit = project => {
    setCurrentProject(project);
    setModalVisible(true);
  };

  const handleSave = () => {
    setProjects(prevProjects =>
      prevProjects.map(proj =>
        proj.id === currentProject.id ? currentProject : proj,
      ),
    );
    setModalVisible(false);
    setCurrentProject(null);
  };

  const handleDelete = id => {
    setProjects(prevProjects => prevProjects.filter(proj => proj.id !== id));
  };

  return (
    <View>
      <Text style={styles.sectionTitle}>Freelancing Projects</Text>
      <FlatList
        data={projects}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.projectContainer}>
            <Image source={item.image} style={styles.projectImage} />
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                onPress={() => handleEdit(item)}
                style={styles.editButton}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={styles.deleteButton}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Edit Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Project</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={currentProject?.title}
              onChangeText={text =>
                setCurrentProject({...currentProject, title: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={currentProject?.description}
              onChangeText={text =>
                setCurrentProject({...currentProject, description: text})
              }
            />
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FreelancerProjects;

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
