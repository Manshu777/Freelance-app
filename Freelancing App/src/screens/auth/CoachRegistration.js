import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation, useRoute} from '@react-navigation/native';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const specializationOptions = [
  {label: 'Select your specialization', value: ''},
  {label: 'Football', value: 'football'},
  {label: 'Basketball', value: 'basketball'},
  {label: 'Tennis', value: 'tennis'},
  {label: 'Swimming', value: 'swimming'},
  {label: 'Athletics', value: 'athletics'},
];

const CoachRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [FName, setFName] = useState('');
  const [LName, setLName] = useState('');
  const [LoginMethod, setLoginMethod] = useState('');
  const [LoginRole, setLoginRole] = useState('');
  const [Contact, setContact] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [coachingExperience, setCoachingExperience] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [city, setCity] = useState('');
  const [availabilityDays, setAvailabilityDays] = useState([]);
  const [availableFrom, setAvailableFrom] = useState('');
  const [availableTo, setAvailableTo] = useState('');
  const [socialLinks, setSocialLinks] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);

  // Time Picker State
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [selectedFromTime, setSelectedFromTime] = useState(new Date());
  const [selectedToTime, setSelectedToTime] = useState(new Date());

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.logmethod && route.params?.role) {
      setLoginMethod(route.params.logmethod);
      setLoginRole(route.params.role);
    }
  }, [route.params]);

  const handleNext = () => {
    if (currentStep < 2) setCurrentStep(prev => prev + 1);
  };
  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleDayToggle = day => {
    setAvailabilityDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day],
    );
  };

  const handleFromTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedFromTime;
    setShowFromPicker(false);
    setSelectedFromTime(currentDate);
    setAvailableFrom(
      `${currentDate.getHours()}:${
        currentDate.getMinutes() < 10
          ? '0' + currentDate.getMinutes()
          : currentDate.getMinutes()
      }`,
    );
  };

  const handleToTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedToTime;
    setShowToPicker(false);
    setSelectedToTime(currentDate);
    setAvailableTo(
      `${currentDate.getHours()}:${
        currentDate.getMinutes() < 10
          ? '0' + currentDate.getMinutes()
          : currentDate.getMinutes()
      }`,
    );
  };

  const handleSubmit = () => {
    if (!agreedTerms) {
      Alert.alert('Terms & Conditions', 'Please agree to the terms.');
      return;
    }
    Alert.alert('Success', 'Registration submitted successfully!');

    const userInfo = {
      FName,
      LName,
      Contact,
      coachingExperience,
      specialization,
      city,
      availabilityDays,
      availableFrom,
      availableTo,
      socialLinks,
      LoginRole,
    };
    // console.log(userInfo);
    navigation.navigate('LoginSuccess', {userInfo});
  };

  const handleConfirm = () => {
    setModalVisible(false);
    Alert.alert('Success', 'Registration submitted successfully!');
  };

  const toggleLoginMethod = () => {
    setLoginMethod(prevMethod => (prevMethod === 'Email' ? 'Email' : 'Phone'));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Coach Registration</Text>

      {currentStep === 1 && (
        <View style={styles.stepContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={FName}
            onChangeText={setFName}
            placeholder="Enter your First name"
            placeholderTextColor="#808080"
          />
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={LName}
            onChangeText={setLName}
            placeholder="Enter your Last name"
            placeholderTextColor="#808080"
          />
          {LoginMethod === 'Email' ? (
            <>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={Contact}
                onChangeText={setContact}
                placeholder="Enter your Phone Number"
                placeholderTextColor="#808080"
                maxLength={10}
                keyboardType="phone-pad"
              />
            </>
          ) : (
            <>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={Contact}
                onChangeText={setContact}
                placeholder="Enter your Email Address"
                placeholderTextColor="#808080"
                keyboardType="email-address"
              />
            </>
          )}
          <Text style={styles.label}>Experience</Text>
          <TextInput
            style={styles.input}
            value={coachingExperience}
            onChangeText={setCoachingExperience}
            placeholder="Enter years of experience"
            placeholderTextColor="#808080"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Specialization</Text>
          <TextInput
            style={styles.input}
            value={specialization}
            onChangeText={setSpecialization}
            placeholder="Enter your specialization (e.g., Football)"
            placeholderTextColor="#808080"
          />
        </View>
      )}

      {currentStep === 2 && (
        <View style={styles.stepContainer}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="Enter your city"
            placeholderTextColor="#808080"
          />
          <Text style={styles.label}>Select Available Days:</Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              rowGap: 5,
              columnGap: 10,
              marginTop: 5,
              marginBottom: 10,
            }}>
            {daysOfWeek.map(day => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayButton,
                  availabilityDays.includes(day) && styles.selectedDay,
                ]}
                onPress={() => handleDayToggle(day)}>
                <Text
                  style={[
                    styles.dayButtonText,
                    availabilityDays.includes(day) && styles.dayButtonTextt,
                  ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{flexDirection: 'row', gap: 10}}>
            <View style={{width: '47.5%'}}>
              <Text style={styles.label}>Available From</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowFromPicker(true)}>
                <Text style={{color: '#808080'}}>
                  {availableFrom || 'HH:MM (e.g., 09:00)'}
                </Text>
              </TouchableOpacity>
              {showFromPicker && (
                <DateTimePicker
                  value={selectedFromTime}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={handleFromTimeChange}
                />
              )}
            </View>
            <View style={{width: '47.5%'}}>
              <Text style={styles.label}>Available To</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowToPicker(true)}>
                <Text style={{color: '#808080'}}>
                  {availableTo || 'HH:MM (e.g., 17:00)'}
                </Text>
              </TouchableOpacity>
              {showToPicker && (
                <DateTimePicker
                  value={selectedToTime}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={handleToTimeChange}
                />
              )}
            </View>
          </View>

          <Text style={styles.label}>Social Media Links</Text>
          <TextInput
            style={styles.input}
            value={socialLinks}
            onChangeText={setSocialLinks}
            placeholder="Enter social media links (optional)"
            placeholderTextColor="#808080"
          />
          <View style={styles.termsContainer}>
            <Text style={styles.label}>Terms and Conditions</Text>
            <Text style={styles.termsText}>
              By registering, you agree to our Terms and Conditions.
            </Text>
            <TouchableOpacity onPress={() => setAgreedTerms(!agreedTerms)}>
              <View style={styles.checkbox}>
                <Image
                  source={
                    agreedTerms
                      ? require('../../assets/images/Thik.png')
                      : require('../../assets/images/Uncheck.png')
                  }
                  style={styles.checkboxImage}
                />
                <Text style={styles.checkboxText}>I agree</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.buttonContainer}>
        {currentStep < 2 && (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
        {currentStep > 1 && (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity style={styles.button} onPress={handlePrev}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Registration</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f7f9fc',
    alignItems: 'center',
    height: '100%',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  stepContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#808080',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#808080',
  },
  dayButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    width: '30%',
  },
  selectedDay: {
    backgroundColor: '#007BFF',
  },
  dayButtonText: {
    color: '#333',
  },
  dayButtonTextt: {
    color: '#fff',
  },
  termsContainer: {
    marginVertical: 10,
  },
  termsText: {
    marginVertical: 10,
    fontSize: 14,
    color: '#555',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxImage: {
    height: 21.5,
    width: 21.5,
    marginRight: 5,
  },
  checkboxText: {
    color: '#808080',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#808080',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalDetail: {
    fontSize: 14,
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CoachRegistration;
