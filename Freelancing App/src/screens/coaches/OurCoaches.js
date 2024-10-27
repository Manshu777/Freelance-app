import React, {useRef, useState, useMemo, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Animated,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import styles from '../../styles/OurCoaches';
import CoachCard from '../../components/CoachCard';

const coachDetails = [
  {
    id: '1',
    name: 'Manshu Mehra',
    rating: 4.5,
    verified: true,
    coachImage: require('../../assets/images/CoachImage.png'),
    skills: ['Web developer', 'App developer'],
    languages: ['Hindi', 'English'],
    experience: '10 Years',
    buttons: [
      {id: '1', title: 'Chat', image: require('../../assets/images/Chat.png')},
      {
        id: '2',
        title: 'Call Now',
        image: require('../../assets/images/Call-Icon.png'),
      },
    ],
  },
  {
    id: '2',
    name: 'Himanshu',
    rating: 4.2,
    verified: true,
    coachImage: require('../../assets/images/CoachImage.png'),
    skills: ['Web developer', 'App developer'],
    languages: ['Kannada', 'French'],
    experience: '8 Years',
    buttons: [
      {id: '1', title: 'Chat', image: require('../../assets/images/Chat.png')},
      {
        id: '2',
        title: 'Call Now',
        image: require('../../assets/images/Call-Icon.png'),
      },
    ],
  },
  {
    id: '3',
    name: 'Rahul',
    rating: 4.8,
    verified: true,
    coachImage: require('../../assets/images/CoachImage.png'),
    skills: ['E-Commerce Developer', 'Wordpress Developer'],
    languages: ['English', 'Hindi'],
    experience: '12 Years',
    buttons: [
      {id: '1', title: 'Chat', image: require('../../assets/images/Chat.png')},
      {
        id: '2',
        title: 'Call Now',
        image: require('../../assets/images/Call-Icon.png'),
      },
    ],
  },
  {
    id: '4',
    name: 'Sofia',
    rating: 4.7,
    verified: true,
    coachImage: require('../../assets/images/CoachImage.png'),
    skills: ['E-Commerce Developer', 'Wordpress Developer'],
    languages: ['Spanish', 'English'],
    experience: '7 Years',
    buttons: [
      {id: '1', title: 'Chat', image: require('../../assets/images/Chat.png')},
      {
        id: '2',
        title: 'Call Now',
        image: require('../../assets/images/Call-Icon.png'),
      },
    ],
  },
  {
    id: '5',
    name: 'Karan',
    rating: 4.3,
    verified: false,
    coachImage: require('../../assets/images/CoachImage.png'),
    skills: ['E-Commerce Developer', 'Wordpress Developer'],
    languages: ['French', 'Hindi'],
    experience: '5 Years',
    buttons: [
      {id: '1', title: 'Chat', image: require('../../assets/images/Chat.png')},
      {
        id: '2',
        title: 'Call Now',
        image: require('../../assets/images/Call-Icon.png'),
      },
    ],
  },
];

const OurCoaches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const filterAnim = useRef(new Animated.Value(1)).current;

  const handleSearch = useCallback(text => {
    setSearchTerm(text);
  }, []);

  const handleFilterBySport = useCallback(sport => {
    setSelectedSport(sport);
  }, []);

  const filteredData = useMemo(() => {
    return coachDetails.filter(coach => {
      return (
        coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.skills.some(skill =>
          skill.toLowerCase().includes(searchTerm.toLowerCase()),
        ) ||
        (coach.languages.some(language =>
          language.toLowerCase().includes(searchTerm.toLowerCase()),
        ) &&
          (selectedSport ? coach.skills.includes(selectedSport) : true))
      );
    });
  }, [searchTerm, selectedSport]);

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedSport('');
  };

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY === 0) {
      Animated.timing(filterAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(filterAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={{backgroundColor: 'white', flex: 2}}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={navigation.goBack}>
          <Image
            source={require('../../assets/images/LeftArrow.png')}
            style={styles.backButtonIcon}
          />
          <Text style={styles.headerTitle}>Freelncer</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/Filter.png')}
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/back-arrow.png')}
            style={styles.backarrowimg}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.Searchinput}
          placeholder="Search Coach"
          value={searchTerm}
          onChangeText={handleSearch}
          clearButtonMode="always"
          placeholderTextColor={'#808080'}
        />
        <TouchableOpacity onPress={clearSearch}>
          <Image
            source={require('../../assets/images/close.png')}
            style={{height: 20, width: 20}}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.chessButtonContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            'Football',
            'Basketball',
            'Tennis',
            'Baseball',
            'Volleyball',
            'Hockey',
            'Cricket',
          ].map(sport => (
            <TouchableOpacity
              key={sport}
              style={[
                styles.chessButtons,
                selectedSport === sport && {backgroundColor: '#ccc'},
              ]}
              onPress={() => handleFilterBySport(sport)}>
              <Text style={styles.chessButtonText}>{sport}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        ref={flatListRef}
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <View
            style={{
              paddingTop: 20,
              borderBottomWidth: 1,
              paddingHorizontal: 15,
              borderStyle: 'dashed',
              borderColor: '#CCCCCC',
              paddingBottom: index === filteredData.length - 1 ? 0 : 15,
            }}>
            <CoachCard coach={item} />
          </View>
        )}
        showsVerticalScrollIndicator={true}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        initialNumToRender={5} // Adjust based on your needs
      />

    </View>
  );
};

export default OurCoaches;
