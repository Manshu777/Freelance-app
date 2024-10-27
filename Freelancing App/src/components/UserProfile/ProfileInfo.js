import React, {useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import 'react-native-get-random-values';



const ProfileInfo = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('male');
  const [location, setLocation] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = () => {
    Alert.alert(
      'Form Submitted',
      `Name: ${name}, Phone: ${phoneNumber}, Email: ${email}, DOB: ${dob}, Gender: ${gender}, Location: ${location}, Zip Code: ${zipCode}`,
    );
  };

  const handleGenderSelect = selectedGender => {
    setGender(selectedGender);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
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
            const location = details?.formatted_address || data.description;
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

        <Button title="Submit" onPress={handleSubmit} />
      </View>
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
});

export default ProfileInfo;
