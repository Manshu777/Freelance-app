import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
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

const LoginScreen = ({route}) => {
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
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [role, setRole] = useState('');
  const navigation = useNavigation();
  const countriesPerPage = 15;

  useEffect(() => {
    if (modalVisible) {
      loadInitialCountries();
    }
  }, [modalVisible]);

  useEffect(() => {
    if (route.params?.role) {
      setRole(route.params.role);
    }
  }, [route.params]);

  const fetchCountryData = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();

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

      return formattedData.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      throw new Error('Failed to fetch country data. Please try again.');
    }
  };

  const loadInitialCountries = async () => {
    setLoadingCountries(true);
    try {
      const sortedData = await fetchCountryData();

      const india = sortedData.find(country => country.name === 'India');
      setSelectedCountry(india || sortedData[0]);
      setCountryOptions(sortedData.slice(0, countriesPerPage));
      setPage(1);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoadingCountries(false);
    }
  };

  const loadMoreCountries = async () => {
    if (isMoreLoading || loadingCountries) return;
    setIsMoreLoading(true);

    try {
      const sortedData = await fetchCountryData();

      const newCountries = sortedData.slice(
        page * countriesPerPage,
        (page + 1) * countriesPerPage,
      );

      setCountryOptions(prevOptions => [...prevOptions, ...newCountries]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsMoreLoading(false);
    }
  };

  async function signInWithPhoneNumber(phoneNumber) {
    if (!role) {
      Alert.alert('Select Role', 'Please select a role before signing in.');
      return;
    }

    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      Alert.alert(
        'OTP Sent',
        'Please check your phone for the verification code.',
      );
      // handlePhoneLogin(role);
      navigation.navigate('LoginOTPverify',{role});
    } catch (error) {
      console.error('Error during phone number sign-in:', error);
      setErrorMessage('Failed to send OTP. Please try again.');
    }
  }

  async function confirmCode() {
    if (!code) {
      setErrorMessage('Please enter the verification code.');
      return;
    }
    try {
      await confirm.confirm(code);
      navigation.navigate('CoachRegistration');
    } catch (error) {
      console.log('Invalid code:', error);
      setErrorMessage('Invalid verification code. Please try again.');
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        console.log('User logged in:', user);
      }
    });
    return subscriber;
  }, []);

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
    if (!role) {
      Alert.alert('Select Role', 'Please select a role before signing in.');
      return;
    }

    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo && userInfo.data.user && userInfo.data.idToken) {
        handleEmailLogin(role, userInfo);
      } else {
        throw {code: statusCodes.SIGN_IN_CANCELLED, message: 'Login canceled.'};
      }
    } catch (error) {
      console.log('Full Error:', error);

      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert(
          'Sign-In Canceled',
          'You canceled the Google sign-in process.',
        );
      } else {
        Alert.alert('Login Failed', 'An error occurred during Google Sign-In.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = (role, userInfo) => {
    if (role === 'Student') {
      navigation.navigate('StudentRegistration',{userInfo,role});
    } else if (role === 'Coach') {
      navigation.navigate('CoachRegistration', {userInfo, logmethod: 'Email',role});
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
          onPress={() =>
            signInWithPhoneNumber(selectedCountry.code + phoneNumber)
          }
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
