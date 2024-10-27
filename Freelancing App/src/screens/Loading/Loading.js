import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Animated, Image, Easing} from 'react-native';

const Loading = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(25)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim, rotateAnim, scaleAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '0deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/images/Logo2.png')}
        style={[
          styles.image,
          {
            opacity: fadeAnim,
            transform: [{rotate}, {scale: scaleAnim}],
          },
        ]}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 183.82,
    height: 150,
  },
});
