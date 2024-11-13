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
  Dimensions,
} from 'react-native';


const {width, height} = Dimensions.get('window');

const Education = () => {
  const [educationEntries, setEducationEntries] = useState([
    {
      id: '1',
      title: 'Bachelor of Science in Sports Science',
      description:
        'Degree in Sports Science, focusing on athlete development and coaching techniques.',
    },
    {
      id: '2',
      title: 'Certified Strength and Conditioning Specialist',
      description:
        'Certification for advanced knowledge in strength and conditioning training for athletes.',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentEducation, setCurrentEducation] = useState(null);

  const handleAdd = () => {
    setCurrentEducation({
      id: Date.now().toString(),
      title: '',
      description: '',
      image: null,
    });
    setModalVisible(true);
  };

  const handleEdit = education => {
    setCurrentEducation(education);
    setModalVisible(true);
  };

  const handleSave = () => {
    if (currentEducation.id) {
      setEducationEntries(prevEntries =>
        prevEntries.map(entry =>
          entry.id === currentEducation.id ? currentEducation : entry,
        ),
      );
    } else {
      setEducationEntries(prevEntries => [
        ...prevEntries,
        {...currentEducation, id: Date.now().toString()},
      ]);
    }
    setModalVisible(false);
    setCurrentEducation(null);
  };

  const handleDelete = id => {
    setEducationEntries(prevEntries =>
      prevEntries.filter(entry => entry.id !== id),
    );
  };

  return (
    <View style={{width: width * 0.95}}>
      <Text style={{color: '#000', fontSize: 20, fontWeight: '600'}}>
        Education
      </Text>
      {educationEntries.map(item => (
        <View
          key={item.id}
          style={{
            marginBottom: 15,
            width: '95%',
            // backgroundColor:'cyan',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-between'
          }}>
          <View style={{flexDirection: 'row', gap: 10,width:'80%'}}>
            <Image
              source={require('../../assets/images/Education.png')}
              style={{height: 20, width: 20}}
            />
            <View>
              <Text style={{color: '#000'}}>{item.title}</Text>
              <Text style={{color: '#808080'}}>{item.description}</Text>
            </View>
          </View>
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
      ))}

      {/* Add Education Button */}
      {/* <Button title="Add Education" onPress={handleAdd} /> */}
      <TouchableOpacity
        onPress={handleAdd}
        style={{
          backgroundColor: 'blue',
          width: '95%',
          paddingVertical: 7.5,
          alignItems: 'center',
          borderRadius: 25,
        }}>
        <Text style={{color: 'white'}}>Add Education</Text>
      </TouchableOpacity>

      {/* Edit/Add Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {currentEducation?.id ? 'Edit Education' : 'Add Education'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={currentEducation?.title}
              placeholderTextColor={'#808080'}
              onChangeText={text =>
                setCurrentEducation({...currentEducation, title: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={currentEducation?.description}
              placeholderTextColor={'#808080'}
              onChangeText={text =>
                setCurrentEducation({...currentEducation, description: text})
              }
              multiline
            />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: 15,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}>
              <TouchableOpacity
                onPress={handleSave}
                style={{
                  width: '40%',
                  backgroundColor: 'blue',
                  alignItems: 'center',
                  paddingVertical: 5,
                  borderRadius: 25,
                }}>
                <Text style={{color: '#fff', fontSize: 18}}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  width: '40%',
                  backgroundColor: 'blue',
                  alignItems: 'center',
                  paddingVertical: 5,
                  borderRadius: 25,
                }}>
                <Text style={{color: 'white', fontSize: 18}}>Cancle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Education;

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: 'column',
    width:'13.5%',
    gap: 5,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
    width:'100%'
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
    color: '#808080',
  },
});
