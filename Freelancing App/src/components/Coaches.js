import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/HomeStyle';
import { useNavigation } from '@react-navigation/native';

const Coaches = ( ) => {
  const navigation = useNavigation();


  const coaches = [
    {
      id: '1',
      source: require('../assets/images/Coach1.png'),
      Name: 'Leo',
      Game: 'Mern',
    },
    {
      id: '2',
      source: require('../assets/images/Coach2.png'),
      Name: 'Venis',
      Game: 'Laravel',
    },
    {
      id: '3',
      source: require('../assets/images/Coach3.png'),
      Name: 'Phil',
      Game: 'Node, Mongoose',
    },
    {
      id: '4',
      source: require('../assets/images/Coach1.png'),
      Name: 'Joe',
      Game: 'Football',
    },
    {
      id: '5',
      source: require('../assets/images/Coach2.png'),
      Name: 'Tylor',
      Game: 'Tennis',
    },
    {
      id: '6',
      source: require('../assets/images/Coach3.png'),
      Name: 'Mark',
      Game: 'Basketball',
    },
  ];

  const { width } = Dimensions.get('window');
  const cardWidth = width * 0.4;

  const handleChatPress = (coach) => { // Accept the coach as a parameter
    navigation.navigate('CoachProfile', { coach }); // Pass the coach data
  };

  return (
    <View style={styles.CoachSection}>
      <Text style={styles.CoachHeading}>Recomended For You</Text>
      <View style={styles.GuideCards}>
        <FlatList
          data={coaches}
          horizontal
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          decelerationRate="fast"
          snapToInterval={cardWidth}
          renderItem={({ item }) => (
            <View style={styles.CoachCard}>
              <Image source={item.source} style={styles.CoachCardImg} />
              <Text style={styles.CoachName}>{item.Name}</Text>
              <Text style={styles.CoachGame}>{item.Game}</Text>
              <TouchableOpacity 
                style={styles.CoachConnect}
                onPress={() => handleChatPress(item)} // Pass the item (coach) to the function
              >
                <Text style={styles.CoachConnecttext}>Connect</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Coaches;
