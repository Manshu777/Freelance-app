import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/HomeStyle';
import React from 'react';

const Students = () => {
  const coaches = [
    {
      id: '1',
      source: require('../assets/images/Stu3.png'),
      Name: 'Ridhi',
      Game: 'Table Tennis,  Distt',
    },
    {
      id: '2',
      source: require('../assets/images/Stu2.png'),
      Name: 'Dharmik',
      Game: 'Cricket,  State',
    },
    {
      id: '3',
      source: require('../assets/images/Stu1.png'),
      Name: 'Sujoy sen',
      Game: 'Kho kho,  State',
    },
  ];

  const {width} = Dimensions.get('window');
  const cardWidth = width * 0.4;

  return (

      <View style={styles.StuCards}>
        <FlatList
          data={coaches}
          horizontal
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="start"
          decelerationRate="fast"
          snapToInterval={cardWidth} // Makes sure cards snap to position
          renderItem={({item}) => (
            <View style={styles.StuCard}>
              <View  style={styles.StuCardImgShad} >
                <Image source={item.source} style={styles.StuCardImg} />
              </View>
              <Text style={styles.StuName}>{item.Name}</Text>
              <Text style={styles.StuGame}>{item.Game}</Text>
            </View>
          )}
        />
      </View>
  );
};

export default Students;
