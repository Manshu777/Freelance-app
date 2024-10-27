import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import styles from '../styles/HomeStyle';
import Football from '../assets/images/football.png';
import Tennis from '../assets/images/tennis.png';
import Shoot from '../assets/images/shoot.png';
import Cricket from '../assets/images/football.png';
import Baseball from '../assets/images/tennis.png';
import Rugby from '../assets/images/shoot.png';
import Volleyball from '../assets/images/football.png';

// Get the screen width to calculate card width
const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.7; // 70% of the screen width

// Sports data to map through
const sportsData = [
  {id: '1', name: 'Football', image: Football},
  {id: '2', name: 'Tennis', image: Tennis},
  {id: '3', name: 'Basketball', image: Shoot},
  {id: '4', name: 'Cricket', image: Cricket},
  {id: '5', name: 'Baseball', image: Baseball},
  {id: '6', name: 'Rugby', image: Rugby},
  {id: '7', name: 'Volleyball', image: Volleyball},
];

const DailyGuide = () => {
  return (
    <View style={styles.GuideSection}>
      <Text style={styles.GuideHeading}>Your Daily Guide</Text>
      <Text style={styles.GuidePara}>
        Let’s begin your day with the best coaches in your area with our best
        guide!
      </Text>

      <View style={styles.CoachCards}>
        <FlatList
          data={sportsData}
          horizontal
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          decelerationRate="fast"
          renderItem={({item}) => (
            <View key={item.id} style={styles.GuideCard}>
              <Image source={item.image} style={styles.GuideCardImg} />
              <Text style={styles.GuideText}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default DailyGuide;
