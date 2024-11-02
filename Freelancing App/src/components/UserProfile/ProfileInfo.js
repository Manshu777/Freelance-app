import React, {useEffect, useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import AboutUs from '../Coach/AboutUs';

const {width, height} = Dimensions.get('window');

const ProfileInfo = ({UserInfo}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('male');
  const [location, setLocation] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [UserRole, setUserRole] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    dob: '',
    gender: '',
    location: '',
    zipCode: '',
  });

  // console.log(UserInfo);

  const handleGenderSelect = selectedGender => {
    setGender(selectedGender);
  };

  // const saveUserInfo = async updatedInfo => {
  //   try {
  //     const userInfoString = JSON.stringify(updatedInfo);
  //     await AsyncStorage.setItem('userInfo', userInfoString);
  //     console.log('User info saved successfully!');
  //   } catch (error) {
  //     console.error('Error saving userInfo:', error);
  //   }
  // };

  const handleSubmit = () => {
    saveUserInfo(userInfo);
    Alert.alert(
      'Form Submitted',
      `Name: ${userInfo.name}, Phone: ${userInfo.phoneNumber}, Email: ${userInfo.email}, DOB: ${userInfo.dob}, Gender: ${userInfo.gender}, Location: ${userInfo.location}, Zip Code: ${userInfo.zipCode}`,
    );
  };

  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     try {
  //       const userInfoString = await AsyncStorage.getItem('userInfo');
  //       if (userInfoString !== null) {
  //         const userInfo = JSON.parse(userInfoString);
  //         setUserInfo(userInfo);
  //       } else {
  //         console.log('No userInfo found in local storage.');
  //       }
  //     } catch (error) {
  //       console.error('Error retrieving userInfo:', error);
  //     }
  //   };

  //   getUserInfo();
  // }, []);

  return (
    <ScrollView>
      {UserRole === 'Coach' ? (
        <View>
          <AboutUs />
        </View>
      ) : (
        <View style={styles.container}>
          {/* <Text style={styles.label}>Name: {UserInfo.data.user.name}</Text> */}
          <Text style={styles.label}>Phone Number: {phoneNumber}</Text>
          {/* <Text style={styles.label}>Email: {UserInfo.data.user.email}</Text> */}
          <Text style={styles.label}>Date of Birth: {dob}</Text>
          <Text style={styles.label}>Gender: {gender}</Text>
          <Text style={styles.label}>Location: {location}</Text>
          <Text style={styles.label}>Zip Code: {zipCode}</Text>

          <Button title="Edit" onPress={() => setModalVisible(true)} />

          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.label}>Edit Details</Text>

                <Text style={styles.label}>Name:</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor={'#808080'}
                  placeholder="Enter your name"
                />

                <Text style={styles.label}>Phone Number:</Text>
                <TextInput
                  style={styles.input}
                  value={phoneNumber}
                  placeholderTextColor={'#808080'}
                  onChangeText={setPhoneNumber}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />

                <Text style={styles.label}>Email:</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  placeholderTextColor={'#808080'}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                />

                <Text style={styles.label}>Date of Birth:</Text>
                <TextInput
                  style={styles.input}
                  value={dob}
                  placeholderTextColor={'#808080'}
                  onChangeText={setDob}
                  placeholder="YYYY-MM-DD"
                />

                <Text style={styles.label}>Gender:</Text>
                <View style={styles.genderContainer}>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      gender === 'male' && styles.selectedButton,
                    ]}
                    onPress={() => handleGenderSelect('male')}>
                    <Text style={styles.genderText}>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      gender === 'female' && styles.selectedButton,
                    ]}
                    onPress={() => handleGenderSelect('female')}>
                    <Text style={styles.genderText}>Female</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      gender === 'other' && styles.selectedButton,
                    ]}
                    onPress={() => handleGenderSelect('other')}>
                    <Text style={styles.genderText}>Other</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.label}>Live Location:</Text>
                <GooglePlacesAutocomplete
                  placeholder="Search for your live location"
                  placeholderTextColor={'#808080'}
                  fetchDetails={true}
                  onPress={(data, details = null) => {
                    const location =
                      details?.formatted_address || data.description;
                    setLocation(location);
                  }}
                  query={{
                    key: 'YOUR_GOOGLE_API_KEY',
                    language: 'en',
                  }}
                  styles={{
                    textInput: styles.input,
                  }}
                />

                <Text style={styles.label}>Zip Code:</Text>
                <TextInput
                  style={styles.input}
                  value={zipCode}
                  placeholderTextColor={'#808080'}
                  onChangeText={setZipCode}
                  placeholder="Enter your zip code"
                  keyboardType="numeric"
                />

                <Button title="Save" onPress={handleSubmit} />
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    color: '#808080',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  genderButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '30%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007BFF',
  },
  genderText: {
    fontSize: 16,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    height: height * 0.95,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
});

export default ProfileInfo;
