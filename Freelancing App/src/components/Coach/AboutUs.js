import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import styles from '../../styles/CoachProfilecss';

const AboutUs = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [coaches, setCoaches] = useState([
    {
      description:
        'I’m Rishav Agnihotri, a dedicated coach with a passion for football, tennis, and basketball. My journey spans from player to coach, focusing on skill development and personal growth. I’m committed to helping athletes of all levels reach their full potential.',
    },
    {
      category: 'Football Coaches',
      description:
        'Experienced professionals focusing on technical skills, tactical awareness, and fitness. They help players of all levels develop their game and passion for football.',
      expertise:
        'Experts in technique and strategy, dedicated to improving your game. They offer personalized coaching to help players of all ages enhance their skills.',
    },
    {
      category: 'Tennis Coaches',
      description:
        'Dynamic and experienced, focusing on skill development, game strategy, and teamwork. They tailor sessions to individual needs, fostering growth and sportsmanship.',
    },
    {
      category: 'Basketball Coaches',
      description:
        'Dynamic and experienced, focusing on skill development, game strategy, and teamwork. They tailor sessions to individual needs, fostering growth and sportsmanship.',
    },
  ]);

  const handleSave = () => {
    setIsEditModalVisible(false);
    // Here, you would save the data to the server or update the state
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
    // Optionally, reset any changes made during editing
  };

  const updateField = (index, key, value) => {
    const updatedCoaches = [...coaches];
    updatedCoaches[index][key] = value;
    setCoaches(updatedCoaches);
  };

  return (
    <View>
      <TouchableOpacity
        style={styless.editButton}
        onPress={() => setIsEditModalVisible(true)}>
        <Text style={styless.editButtonText}>Edit About Us</Text>
      </TouchableOpacity>

      <Text style={styles.contentText}>{coaches[0].description}</Text>
      {coaches.slice(1).map((coach, index) => (
        <View key={index} style={styles.coachContainer}>
          <Text style={styles.categoryText}>{coach.category}</Text>
          <Text style={styles.descriptionText}>{coach.description}</Text>
          {coach.expertise && (
            <Text style={styles.expertiseText}>{coach.expertise}</Text>
          )}
        </View>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={handleCancel}>
        <View style={styless.modalOverlay}>
          <View style={styless.modalContainer}>
            <Text style={styless.modalTitle}>Edit About Us</Text>
            <TextInput
              style={styless.input}
              value={coaches[0].description}
              onChangeText={text => updateField(0, 'description', text)}
              placeholder="Description"
              multiline
            />
            {coaches.slice(1).map((coach, index) => (
              <View key={index} style={styless.editItemContainer}>
                <TextInput
                  style={styless.input}
                  value={coach.category}
                  onChangeText={text => updateField(index + 1, 'category', text)}
                  placeholder="Category"
                />
                <TextInput
                  style={styless.input}
                  value={coach.description}
                  onChangeText={text => updateField(index + 1, 'description', text)}
                  placeholder="Description"
                  multiline
                />
                {coach.expertise && (
                  <TextInput
                    style={styless.input}
                    value={coach.expertise}
                    onChangeText={text =>
                      updateField(index + 1, 'expertise', text)
                    }
                    placeholder="Expertise"
                  />
                )}
              </View>
            ))}

            <View style={styless.buttonContainer}>
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

const styless = StyleSheet.create({
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
});
