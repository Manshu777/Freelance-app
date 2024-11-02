import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const LoginSuccess = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {userInfo} = route.params || {};

  console.log(userInfo);

  const saveUserInfo = async user => {
    try {
      const existingUserInfo = await AsyncStorage.getItem('userInfo');

      if (existingUserInfo) {
        console.log('User info already saved:');
        return;
      }

      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
      console.log('User info saved successfully!');
    } catch (error) {
      console.error('Failed to save user info:', error);
    }
  };

  const getUserInfo = async () => {
    try {
      const storedUserInfo = await AsyncStorage.getItem('userInfo');
      if (storedUserInfo) {
        console.log(`Retrieved User Info:, JSON.parse(storedUserInfo)`);
      } else {
        console.log('No user info found in local storage.');
      }
    } catch (error) {
      console.error('Failed to retrieve user info:', error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      saveUserInfo(userInfo);
    }

    getUserInfo();

    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 100);

    return () => clearTimeout(timer);
  }, [userInfo, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/Pana.png')}
        style={styles.ImageSet}
      />

      {userInfo && userInfo.data && userInfo.data.user ? (
        <Text style={styles.Welcome}>
          Welcome Mr. {userInfo.data.user.givenName}
        </Text>
      ) : null}
      <Text style={styles.successText}>Your Login is successfully</Text>
    </View>
  );
};

export default LoginSuccess;

const styles = StyleSheet.create({
  container: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageSet: {
    marginBottom: 25,
  },
  Welcome: {
    color: '#000',
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 10,
  },
  successText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '400',
  },
});
