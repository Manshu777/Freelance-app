import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import styles from '../styles/HomeStyle';

const HeroSection = () => {
  const images = [
    {
      id: '1',
      source: require('../assets/images/Night.jpg'),
      AbtImg: 'SomeTime Night brings Lights to Life',
    },
    {
      id: '2',
      source: require('../assets/images/Night.jpg'),
      AbtImg: 'SomeTime Night brings Lights to Life',
    },
    {
      id: '3',
      source: require('../assets/images/Night.jpg'),
      AbtImg: 'SomeTime Night brings Lights to Life',
    },
    {
      id: '4',
      source: require('../assets/images/Night.jpg'),
      AbtImg: 'SomeTime Night brings Lights to Life',
    },
    {
      id: '5',
      source: require('../assets/images/Night.jpg'),
      AbtImg: 'SomeTime Night brings Lights to Life',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const totalImages = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % totalImages;
        flatListRef.current.scrollToIndex({animated: true, index: nextIndex});
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [totalImages]);

  const handleDotPress = index => {
    setActiveIndex(index);
    flatListRef.current.scrollToIndex({animated: true, index});
  };

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={images}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        renderItem={({item}) => (
          <View style={styles.imageContainer}>
            <Image source={item.source} style={styles.image} />
          </View>
        )}
      />
      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handleDotPress(index)}>
            <View
              style={[styles.dot, activeIndex === index && styles.activeDot]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default HeroSection;
