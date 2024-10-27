import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  Linking,
  Alert,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import myImage from '../../assets/images/Mobile.png';
import Emailicon from '../../assets/images/GoogleLogo.png';
import downicon from '../../assets/images/carat-down.png';
import styles from '../../styles/styles';

const LoginScreen = () => {
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'India',
    code: '+91',
    flag: 'https://flagcdn.com/w320/in.png',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [page, setPage] = useState(0);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const countriesPerPage = 25;
  const navigation = useNavigation();

  useEffect(() => {
    if (modalVisible) {
      loadInitialCountries();
    }
  }, [modalVisible]);

  const loadInitialCountries = () => {
    setLoadingCountries(true);
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const formattedData = data
          .map(country => ({
            name: country.name.common,
            code:
              country.idd.root +
              (country.idd.suffixes ? country.idd.suffixes[0] : ''),
            flag: country.flags.png,
          }))
          .filter(
            (country, index, self) =>
              country.code &&
              self.findIndex(c => c.code === country.code) === index,
          );
        const sortedData = formattedData.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        const india = sortedData.find(country => country.name === 'India');
        setSelectedCountry(india || sortedData[0]);
        setCountryOptions(sortedData.slice(0, countriesPerPage)); // Load first 25
        setPage(1);
        setLoadingCountries(false);
      })
      .catch(error => {
        setErrorMessage('Failed to fetch country data. Please try again.');
        setLoadingCountries(false);
      });
  };

  const loadMoreCountries = () => {
    if (isMoreLoading || loadingCountries) return; // Prevent duplicate loads
    setIsMoreLoading(true);

    const nextPage = page + 1;
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const formattedData = data
          .map(country => ({
            name: country.name.common,
            code:
              country.idd.root +
              (country.idd.suffixes ? country.idd.suffixes[0] : ''),
            flag: country.flags.png,
          }))
          .filter(
            (country, index, self) =>
              country.code &&
              self.findIndex(c => c.code === country.code) === index,
          );

        const newCountries = formattedData.slice(
          (nextPage - 1) * countriesPerPage,
          nextPage * countriesPerPage,
        );

        setCountryOptions(prevOptions => [...prevOptions, ...newCountries]);
        setPage(nextPage);
        setIsMoreLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsMoreLoading(false);
      });
  };

  const handlePhoneSubmit = () => {
    const phonePattern = /^\d{10}$/;

    if (!phonePattern.test(phoneNumber.trim())) {
      setErrorMessage('Please enter a valid mobile number (10 digits).');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    const formattedPhoneNumber = `${selectedCountry.code}${phoneNumber}`;

    // Alert.alert(
    //   'Number Submitted',
    //   `Your mobile number ${formattedPhoneNumber} has been submitted.`,
    // );

    navigation.navigate('Home');

    setLoading(false);
  };

  const handleEmailPress = () => {
    navigation.navigate('LoginWithEmail');
  };

  const renderFooter = () => {
    return isMoreLoading ? (
      <ActivityIndicator size="small" color="#0000ff" />
    ) : null;
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '991067537705-cekh0cc7ov0a8877h8veu6f3n12pp1k2.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);
      navigation.navigate('LoginSuccess');
    } catch (error) {
      console.error(error);
      Alert.alert('Login Failed', 'An error occurred during Google Sign-In.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagedesign}>
        <View style={styles.Cirdes}></View>
        <View style={styles.imagebox}>
          <Image source={myImage} style={styles.image} />
        </View>
      </View>
      <Text style={styles.enterfullnio}></Text>
      <View style={styles.singin}>
        <Text style={styles.welcomeText}>Hi Welcome!</Text>
        <Text style={styles.MobileNo}>Submit your Mobile number</Text>

        <View style={styles.textdecor}>
          <View style={styles.line} />
          <Text style={styles.Login}>Log in or Sign up</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.countrySelector}>
            {selectedCountry && (
              <>
                <Image
                  source={{uri: selectedCountry.flag}}
                  style={styles.flag}
                />
                <Text style={styles.countryCode}>{selectedCountry.code}</Text>
              </>
            )}
            <Image source={downicon} style={styles.downicon} />
          </TouchableOpacity>
          <TextInput
            style={styles.Inputnumber}
            placeholder="Enter Mobile number"
            placeholderTextColor="#808080"
            keyboardType="phone-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            accessibilityLabel="Mobile number input"
          />
        </View>

        {errorMessage ? (
          <Text style={styles.enterfullnio}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.SendOTP}
          onPress={handlePhoneSubmit}
          disabled={loading}
          accessibilityLabel="Submit Phone Number button">
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>SUBMIT</Text>
          )}
        </TouchableOpacity>

        <View style={styles.textdecor}>
          <View style={styles.line} />
          <Text style={styles.Login}>Or</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity
          style={styles.ContWithEmail}
          onPress={handleGoogleSignIn}
          accessibilityLabel="Continue with Google">
          <Image source={Emailicon} style={styles.icon} />
          <Text style={styles.buttonEmail}>
            {loading ? 'Loading...' : 'Continue with Google'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By signing up, you agree to our{' '}
          <Text
            style={styles.linkText}
            onPress={() => Linking.openURL('https://example.com/terms')}
            accessibilityLabel="Terms of Use">
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text
            style={styles.linkText}
            onPress={() => Linking.openURL('https://example.com/privacy')}
            accessibilityLabel="Privacy Policy">
            Privacy Policy
          </Text>
        </Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={countryOptions}
              keyExtractor={(item, index) =>
                `${item.name}-${item.code}-${index}`
              }
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.countryOption}
                  onPress={() => {
                    setSelectedCountry(item);
                    setModalVisible(false);
                  }}>
                  <Image source={{uri: item.flag}} style={styles.flag} />
                  <Text style={styles.countryName}>{item.name}</Text>
                  <Text style={styles.countryCode}>{item.code}</Text>
                </TouchableOpacity>
              )}
              onEndReached={loadMoreCountries}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
