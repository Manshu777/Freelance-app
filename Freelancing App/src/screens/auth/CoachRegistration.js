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
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'react-native-image-picker';
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
  {label: 'Select specialization needed', value: ''},
  {label: 'Web Development', value: 'web_development'},
  {label: 'Graphic Design', value: 'graphic_design'},
  {label: 'Digital Marketing', value: 'digital_marketing'},
  {label: 'Writing & Translation', value: 'writing_translation'},
  {label: 'Video Editing', value: 'video_editing'},
];

const CoachRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [contact, setContact] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [city, setCity] = useState('');
  const [image, setImage] = useState(null);
  const [availabilityDays, setAvailabilityDays] = useState([]);
  const [availableFrom, setAvailableFrom] = useState('');
  const [availableTo, setAvailableTo] = useState('');
  const [budget, setBudget] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [selectedFromTime, setSelectedFromTime] = useState(new Date());
  const [selectedToTime, setSelectedToTime] = useState(new Date());

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.contactMethod) {
      setContactMethod(route.params.contactMethod);
    }
  }, [route.params]);

  const handleNext = () => currentStep < 2 && setCurrentStep(prev => prev + 1);
  const handlePrev = () => currentStep > 1 && setCurrentStep(prev => prev - 1);

  const handleDayToggle = day => {
    setAvailabilityDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day],
    );
  };

  const handleTimeChange = (setTime, setPickerVisible, selectedTime) => {
    setPickerVisible(false);
    if (selectedTime)
      setTime(
        selectedTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      );
  };

  const handleImagePicker = () => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) return console.log('User cancelled image picker');
      if (response.errorMessage)
        return console.error('Image Picker Error:', response.errorMessage);
      if (response.assets?.length) setImage(response.assets[0].uri);
    });
  };

  const handleSubmit = () => {
    if (!agreedTerms)
      return Alert.alert('Terms & Conditions', 'Please agree to the terms.');

    const hiringInfo = {
      firstName,
      lastName,
      contact,
      projectDescription,
      specialization,
      city,
      availabilityDays,
      availableFrom,
      availableTo,
      budget,
      contactMethod,
    };

    Alert.alert('Success', 'Freelancer hiring request submitted successfully!');
    navigation.navigate('HiringSuccess', {hiringInfo});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Freelancer Hiring</Text>

      {currentStep === 1 && (
        <View style={styles.stepContainer}>
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={handleImagePicker}>
            {image ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  justifyContent: 'flex-start',
                }}>
                <Image source={{uri: image}} style={styles.imagePre} />
                <Text style={styles.imagePickerText}>
                  Change Profile Picture
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  justifyContent: 'flex-start',
                }}>
                <Image
                  source={require('../../assets/images/icosnds.png')}
                  style={styles.imagePre}
                />
                <Text style={styles.imagePickerText}>
                  Select Profile Picture
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your First name"
            placeholderTextColor="#808080"
          />
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter your Last name"
            placeholderTextColor="#808080"
          />
          {contactMethod === 'Email' ? (
            <>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={contact}
                onChangeText={setContact}
                placeholder="Enter your Email Address"
                placeholderTextColor="#808080"
                keyboardType="email-address"
              />
            </>
          ) : (
            <>
              <Text style={styles.label}>Phone Number</Text>
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
          )}
          <Text style={styles.label}>Project Description</Text>
          <TextInput
            style={styles.input}
            value={projectDescription}
            onChangeText={setProjectDescription}
            placeholder="Describe the project details"
            placeholderTextColor="#808080"
          />
          <Text style={styles.label}>Specialization Needed</Text>
          <TextInput
            style={styles.input}
            value={specialization}
            onChangeText={setSpecialization}
            placeholder="Enter required specialization (e.g., Web Development)"
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

          <Text style={styles.label}>Budget</Text>
          <TextInput
            style={styles.input}
            value={budget}
            onChangeText={setBudget}
            placeholder="Enter your budget"
            placeholderTextColor="#808080"
            keyboardType="numeric"
          />

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
              <Text style={styles.checkboxText}>
                I agree to Terms & Conditions
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.buttonContainer}>
        {currentStep < 2 ? (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        )}
        {currentStep > 1 && (
          <TouchableOpacity style={styles.button} onPress={handlePrev}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
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
  imagePicker: {alignItems: 'center', marginBottom: 15},
  imagePickerText: {fontSize: 16, color: 'rgba(126,88,199,1)'},
  imagePreview: {width: 100, height: 100, borderRadius: 50},
  imagePre: {width: 75, height: 75, borderRadius: 50},
});

export default CoachRegistration;
