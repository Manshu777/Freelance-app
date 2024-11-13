import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const { width } = Dimensions.get('window');

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Certified Sports Coach',
      description:
        'Accredited certification in advanced coaching techniques for football, tennis, and basketball.',
      image: require('../../assets/images/Certificates.png'), // Static image
    },
  ]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // To store image URI
  const [editingProjectId, setEditingProjectId] = useState(null);

  // Save or update the project
  const handleSaveProject = () => {
    if (!title || !description) {
      Alert.alert('Please fill out all fields');
      return;
    }

    const newProject = { id: editingProjectId || Date.now(), title, description, image };

    if (editingProjectId) {
      setProjects(prevProjects =>
        prevProjects.map(project =>
          project.id === editingProjectId ? newProject : project,
        ),
      );
    } else {
      setProjects(prevProjects => [...prevProjects, newProject]);
    }

    // Reset form fields
    setTitle('');
    setDescription('');
    setImage(null); // Reset image state after save
    setEditingProjectId(null); // Reset editing state
  };

  // Pick an image
  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Image Picker Error', response.errorMessage);
      } else {
        setImage(response.assets[0].uri); // Set the picked image URI
      }
    });
  };

  // Delete the selected image
  const handleImageDelete = () => {
    setImage(null); // Clear the selected image
  };

  // Edit a project
  const handleEditProject = project => {
    setEditingProjectId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setImage(project.image); // Load project image into the state
  };

  // Delete a project
  const handleDeleteProject = id => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Your Projects</Text>

      <TextInput
        style={styles.input}
        placeholder="Project Title"
        value={title}
        placeholderTextColor={'#808080'}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Project Description"
        value={description}
        placeholderTextColor={'#808080'}
        onChangeText={setDescription}
        multiline
      />

      {/* Conditionally render image picker or selected image */}
      {!image ? (
        <TouchableOpacity
          onPress={handleImagePick}
          style={styles.chooseImageButton}>
          <Text style={{ color: 'white' }}>Choose Image</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.selectedImage} />
          <TouchableOpacity
            style={styles.deleteImageButton}
            onPress={handleImageDelete}>
            <Text style={styles.deleteButtonText}>Delete Image</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={handleSaveProject}
        style={styles.saveButton}>
        <Text style={{ color: 'white' }}>
          {editingProjectId ? 'Update Project' : 'Add Project'}
        </Text>
      </TouchableOpacity>

      {/* Display the list of projects */}
      <View>
        {projects.map(item => (
          <View key={item.id.toString()} style={styles.projectItem}>
            <Image
              source={
                typeof item.image === 'string' && item.image.startsWith('http')
                  ? { uri: item.image } // If it's a URI, use the URI
                  : item.image // If it's a local require() image, just use it as is
              }
              style={styles.projectImage}
            />
            <View style={styles.projectDetails}>
              <Text style={styles.projectTitle}>{item.title}</Text>
              <Text style={styles.projectDescription}>{item.description}</Text>
            </View>

            <View style={styles.projectActions}>
              <TouchableOpacity onPress={() => handleEditProject(item)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteProject(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#DE1F26',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#808080',
    borderRadius: 5,
    padding: 10,
    marginVertical: 2.5,
  },
  chooseImageButton: {
    backgroundColor: 'blue',
    borderRadius: 15,
    alignItems: 'center',
    paddingVertical: 7.5,
    marginVertical: 5,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  selectedImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  deleteImageButton: {
    backgroundColor: '#DE1F26',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: 'blue',
    borderRadius: 15,
    alignItems: 'center',
    paddingVertical: 7.5,
  },
  projectItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  projectImage: {
    width: '100%',
    height: 250,
    borderRadius: 5,
    marginBottom: 10,
  },
  projectDetails: {
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  projectDescription: {
    fontSize: 14,
    color: '#555',
  },
  projectActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    color: '#157B11',
    fontWeight: 'bold',
  },
  deleteButton: {
    color: '#DE1F26',
    fontWeight: 'bold',
  },
});

export default Projects;
