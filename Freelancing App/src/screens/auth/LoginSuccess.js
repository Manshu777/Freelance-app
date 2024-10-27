import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const LoginSuccess = () => {
  const navigation = useNavigation(); 

  useEffect(() => {
    
    const timer = setTimeout(() => {
      navigation.replace('Home'); 
    }, 100);

    
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/Pana.png')} />
      <Text style={styles.successText}>Login successfully</Text>
    </View>
  );
};

export default LoginSuccess;

const styles = StyleSheet.create({
  container: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
  },
  successText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '400',
  },
});
