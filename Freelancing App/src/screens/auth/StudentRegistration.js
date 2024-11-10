import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  ActivityIndicator,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';




const StudentRegistration = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [RegAs, setRegAs] = useState('Student');
  const [sportsCoach, setSportsCoach] = useState('');
  const [gender, setGender] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [image, setImage] = useState(null);
  const [token, setToken] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChooseImage = () => {
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', includeBase64: false},
      response => {
        if (response.didCancel) {
          Alert.alert('Cancelled image selection');
        } else if (response.errorMessage) {
          Alert.alert('Error: ' + response.errorMessage);
        } else {
          setImage(response.assets[0]);
        }
      },
    );
  };

  const handleRegister = async () => {
    Alert.alert('subbmitting');
    if (!firstName || !lastName || !email || !image) {
      Alert.alert('Please fill all fields and choose an image');
      return;
    }

    const formData = new FormData();

    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('age', dob.toISOString().split('T')[0]);
    formData.append('sports', sportsCoach);
    formData.append('gender', gender);
    formData.append('reg_as', RegAs);
    // formData.append('termsAccepted', termsAccepted.toString()); // Convert boolean to string

    console.log(formData);

    try {
      const response = await fetch('http://10.0.2.2:8000/api/v1/students', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Done');
        setResponseMessage('Success: ' + JSON.stringify(data));
        navigation.navigate('Home');
      } else {
        Alert.alert('Error');
        setResponseMessage('Error: ' + JSON.stringify(data));
        console.log(JSON.stringify(data))
      }
    } catch (error) {
      setResponseMessage('Network Error: ' + error.message);
    }
  };

  const renderGenderOption = (label, value) => (
    <TouchableOpacity
      style={[styles.genderOption, gender === value && styles.selectedGender]}
      onPress={() => setGender(value)}
      activeOpacity={0.8}>
      <Text
        style={[
          styles.genderText,
          {color: gender === value ? '#FFFFFF' : '#808080'},
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Student Registration</Text>

        <TouchableOpacity
          style={styles.imagePicker}
          onPress={handleChooseImage}>
          {image ? (
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Image source={{uri: image.uri}} style={styles.imagePre} />
              <Text style={styles.imagePickerText}>Change Profile Picture</Text>
            </View>
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Image
                source={require('../../assets/images/icosnds.png')}
                style={styles.imagePre}
              />
              <Text style={styles.imagePickerText}>Select Profile Picture</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          placeholderTextColor="#808080"
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          placeholderTextColor="#808080"
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          placeholderTextColor="#808080"
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.input}>
          <Text style={{color: dob ? '#000' : '#808080'}}>
            {dob ? dob.toDateString() : 'Select Date of Birth'}
          </Text>
        </TouchableOpacity>


        <TextInput
          style={styles.input}
          value={sportsCoach}
          placeholder="What Skills You Have?"
          placeholderTextColor="#808080"
          onChangeText={setSportsCoach}
        />

        <View style={styles.genderContainer}>
          {renderGenderOption('Male', 'male')}
          {renderGenderOption('Female', 'female')}
          {renderGenderOption('Other', 'other')}
        </View>

        <View style={{flexDirection: 'row', alignItems: 'flex-end', gap: 10}}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setTermsAccepted(!termsAccepted)}>
            <View
              style={[
                styles.checkbox,
                termsAccepted && styles.checkboxSelected,
              ]}
            />
          </TouchableOpacity>
          <Text style={[styles.checkboxLabel, {color: '#808080'}]}>
            I agree to the terms and conditions
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          <TouchableOpacity
            style={[
              styles.registerButton,
              !termsAccepted && styles.disabledButton,
            ]}
            onPress={handleRegister}
            disabled={!termsAccepted}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  imagePicker: {alignItems: 'center', marginBottom: 15},
  imagePickerText: {fontSize: 16, color: 'rgba(126,88,199,1)'},
  imagePreview: {width: 100, height: 100, borderRadius: 50},
  imagePre: {width: 75, height: 75, borderRadius: 50},
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  genderOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedGender: {backgroundColor: 'rgba(126,88,199,1)'},
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#333',
  },
  checkboxSelected: {backgroundColor: 'rgba(126,88,199,1)'},
  registerButton: {
    backgroundColor: 'rgba(126,88,199,1)',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  disabledButton: {backgroundColor: '#ccc'},
  buttonText: {color: '#fff', textAlign: 'center', fontSize: 18},
});

export default StudentRegistration;
