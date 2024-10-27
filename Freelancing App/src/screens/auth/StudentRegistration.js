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
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const StudentRegistration = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [sportsCoach, setSportsCoach] = useState('');
  const [gender, setGender] = useState(null); // 'male' | 'female' | 'other'
  const [termsAccepted, setTermsAccepted] = useState(false);

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = () => {
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
    const userInfo = {firstName, lastName, email, age, sportsCoach};
    Alert.alert('Registration Successful', `Welcome, ${firstName}!`);
    navigation.navigate('LoginSuccess',{userInfo});
  };

  const renderGenderOption = (label, value) => (
    <TouchableOpacity
      style={[styles.genderOption, gender === value && styles.selectedGender]}
      onPress={() => setGender(value)}
      activeOpacity={0.8}>
      <Text style={styles.genderText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Student Registration</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          placeholderTextColor={'#808080'}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          placeholderTextColor={'#808080'}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          placeholderTextColor={'#808080'}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          placeholderTextColor={'#808080'}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={sportsCoach}
          placeholder="Looking for which sports coach?"
          placeholderTextColor={'#808080'}
          onChangeText={setSportsCoach}
        />

        <View style={styles.genderContainer}>
          {renderGenderOption('Male', 'male')}
          {renderGenderOption('Female', 'female')}
          {renderGenderOption('Other', 'other')}
        </View>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setTermsAccepted(!termsAccepted)}>
          <View
            style={[styles.checkbox, termsAccepted && styles.checkboxSelected]}
          />
          <Text style={styles.checkboxLabel}>
            I agree to the terms and conditions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.registerButton,
            !termsAccepted && styles.disabledButton,
          ]}
          onPress={handleRegister}
          disabled={!termsAccepted}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
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
    borderColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedGender: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  genderText: {
    color: '#333',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: '#4CAF50',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default StudentRegistration;
