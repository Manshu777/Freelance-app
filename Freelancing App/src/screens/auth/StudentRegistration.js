import React, {useState, useEffect} from 'react';
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
import {useNavigation, useRoute} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';

const StudentRegistration = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get the route to access params
  const [UserName, setUserName] = useState('');
  const [FullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [RegAs, setRegAs] = useState('Student');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [sportsCoach, setSportsCoach] = useState('');
  const [UserRole, setUserRole] = useState(null);
  const [gender, setGender] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [image, setImage] = useState(null);
  const [contact, setContact] = useState('');
  const [token, setToken] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const contactMethod = route.params?.logmethod || 'Phone';

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

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

  // const handleRegister = async () => {
  //   setLoading(true);
  //   try {
  //     navigation.navigate('LoginSuccess');
  //   } catch (error) {
  //     console.error('Registration error:', error);
  //     Alert.alert('An error occurred during registration.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleRegister = async () => {
    if (!UserName || !FullName) {
      Alert.alert('Please fill all fields and choose an image');
      return;
    }

    const formData = new FormData();

    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });
    formData.append('First_Name', UserName);
    formData.append('Full_Name', FullName);
    formData.append('Email', email);
    formData.append('Contact', contact);
    formData.append('Date-Of-Birth', dob.toISOString().split('T')[0]);
    formData.append('role', UserRole);
    formData.append('gender', gender);
    formData.append('password', password);

    // const token = await AsyncStorage.getItem('userToken');

    try {
      setLoading(true);
      const response = await fetch('http://10.0.2.2:8000/api/v1/user', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Registration Successful');
        setResponseMessage('Success: ' + JSON.stringify(data));
        navigation.navigate('LoginSuccess');
      } else {
        Alert.alert('Error', 'Please try again');
        setResponseMessage('Error: ' + JSON.stringify(data));
      }
    } catch (error) {
      setResponseMessage('Network Error: ' + error.message);
      Alert.alert('Network Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderRoleOption = (label, value) => (
    <TouchableOpacity
      style={[styles.genderOption, RegAs === value && styles.selectedGender]}
      onPress={() => setRegAs(value)}
      activeOpacity={0.8}>
      <Text
        style={[
          styles.genderText,
          {color: RegAs === value ? '#FFFFFF' : '#808080'},
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

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
          placeholder="User Name"
          value={UserName}
          placeholderTextColor="#808080"
          onChangeText={setUserName}
        />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={FullName}
          placeholderTextColor="#808080"
          onChangeText={setFullName}
        />

        {contactMethod === 'Email' ? (
          <>
            <TextInput
              style={styles.input}
              value={contact}
              onChangeText={setContact}
              placeholder="Enter your Phone Number"
              placeholderTextColor="#808080"
              maxLength={10}
              keyboardType="phone-pad"
            />
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your Email Address"
              placeholderTextColor="#808080"
              keyboardType="email-address"
            />
          </>
        )}

        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.input}>
          <Text style={{color: dob ? '#000' : '#808080'}}>
            {dob ? dob.toDateString() : 'Select Date of Birth'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            maximumDate={fiveYearsAgo}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDob(selectedDate);
              }
            }}
          />
        )}

        <View style={styles.genderContainer}>
          {renderRoleOption('Freelancer', 'Freelancer')}
          {renderRoleOption('Company', 'Company')}
        </View>

        <View style={styles.genderContainer}>
          {renderGenderOption('Male', 'male')}
          {renderGenderOption('Female', 'female')}
          {renderGenderOption('Other', 'other')}
        </View>

        <View style={[styles.inputContainer, {paddingRight: 15}]}>
          <Image
            source={require('../../assets/images/lock.png')}
            style={{width: 22.5, aspectRatio: 1}}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '92.5%',
              justifyContent: 'space-between',
            }}>
            <TextInput
              placeholder="******"
              placeholderTextColor={'#808080'}
              secureTextEntry={!isPasswordVisible}
              style={{width: '92.5%', color: '#808080'}}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.eyeButton}>
              <Image
                source={
                  isPasswordVisible
                    ? require('../../assets/images/eye.png')
                    : require('../../assets/images/eye-off.png')
                }
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
          </View>
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
    color: '#808080',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  imagePicker: {alignItems: 'center', marginBottom: 15},
  imagePickerText: {fontSize: 16, color: 'rgba(126,88,199,1)'},
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
  selectedGender: {backgroundColor: '#FFB900'},
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
  checkboxSelected: {backgroundColor: '#4CAF50'},
  checkboxLabel: {fontSize: 16},
  registerButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {fontSize: 18, color: '#fff', fontWeight: 'bold'},
  disabledButton: {backgroundColor: '#ccc'},
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
});

export default StudentRegistration;
