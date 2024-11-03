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
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {nanoid} from 'nanoid'; // Generate unique ID for token

const StudentRegistration = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [RegAs, setRegAs] = useState('Student');
  const [sportsCoach, setSportsCoach] = useState('');
  const [gender, setGender] = useState(null); // 'male' | 'female' | 'other'
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [image, setImage] = useState(null); // Store image URI
  const [loading, setLoading] = useState(false); // Track loading state

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !age || !sportsCoach) {
      Alert.alert('Incomplete Fields', 'Please fill out all fields.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!termsAccepted) {
      Alert.alert(
        'Terms not accepted',
        'You must accept the terms to register.',
      );
      return;
    }

    setLoading(true);

    const tokenID = nanoid(64);
    const userInfo = {
      first_name: firstName,
      last_name: lastName,
      email,
      age,
      sports_coach: sportsCoach,
      reg_as: RegAs,
      gender,
      token_id: tokenID,
    };

    const formData = new FormData();
    formData.append('user_info', JSON.stringify(userInfo));
    if (image) {
      formData.append('profile_image', {
        uri: image,
        name: 'profile.jpg',
        type: 'image/jpeg',
      });
    }

    try {
      const response = await fetch(
        'http://192.168.1.3:8000/api/v1/students/create', // Update to your backend URL
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );

      if (response.ok) {
        const result = await response.json();
        Alert.alert('Success', 'Registration successful!');
        // Optionally navigate or reset the form
        // navigation.navigate('LoginSuccess'); // Uncomment if needed
      } else {
        const errorResult = await response.json();
        Alert.alert(
          'Error',
          errorResult.message || 'Registration failed. Please try again.',
        );
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error',
        'An unexpected error occurred. Please try again later.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImagePicker = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('Image Picker Error:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = response.assets[0].uri;
        setImage(source);
      }
    });
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
          onPress={handleImagePicker}>
          {image ? (
            
            <View style={{flexDirection:'row',alignItems:'center',gap:10,justifyContent:'flex-start'}}>
              <Image source={{uri: image}} style={styles.imagePre} />
              <Text style={styles.imagePickerText}>Change Profile Picture</Text>
            </View>
          ) : (
            <View style={{flexDirection:'row',alignItems:'center',gap:10,justifyContent:'flex-start'}}>
              <Image source={require('../../assets/images/icosnds.png')} style={styles.imagePre} />
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
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          placeholderTextColor="#808080"
          onChangeText={setAge}
          keyboardType="numeric"
        />
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
