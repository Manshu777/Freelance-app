import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  Animated,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import myImage from '../../assets/images/Tabletlogin-bro.png';

import Logo from '../../assets/images/mallamlogo.png'

const {width, height} = Dimensions.get('window');

// Paragraphs Data
const contentData = [
  {
    Url: require('../../assets/images/Technology.png'),
    heading: 'Empowering Freelancers with Technology',
    content:
      'Leverage technology to connect with talented freelancers across the globe, streamlining projects.',
  },
  {
    Url: require('../../assets/images/MentalHealth.png'),
    heading: 'Supporting Freelancer Well-being',
    content:
      'Prioritizing mental health in freelancing ensures sustained productivity, reducing burnout .',
  },
  {
    Url: require('../../assets/images/RegularExercise.png'),
    heading: 'Work-Life Balance for Freelancers',
    content:
      'Regular breaks and balanced routines enhance focus, reduce stress in freelancing careers.',
  },
  {
    Url: require('../../assets/images/PersonalGrowth.png'),
    heading: 'Skill Growth through Freelance Opportunities',
    content:
      'Freelancing offers continuous learning, expanding expertise through diverse projects.',
  },
];

const SplashScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;

  // Auto-scroll effect every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % contentData.length;
      scrollViewRef.current.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScroll = event => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {contentData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {backgroundColor: index === currentIndex ? '#fff' : '#888'},
          ]}
        />
      ))}
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}>
      <View style={styles.imagedesign}>
        {/* <View style={styles.Cirdes}></View> */}
        <View style={styles.imagebox}>
          <Image source={Logo} style={styles.image} />
        </View>
      </View>

      <View style={styles.contentContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
            style={{alignSelf: 'stretch'}}>
            {contentData.map((item, index) => (
              <View
                key={index}
                style={{
                  width: width,
                  paddingHorizontal: 20,
                  paddingTop: 20,
                  paddingBottom: 20,
                  alignItems: 'center',
                }}>
                <Image style={styles.splashImage} source={item.Url} />
                <Text style={styles.heading}>{item.heading}</Text>
                <Text style={styles.paragraph}>{item.content}</Text>
              </View>
            ))}
          </ScrollView>

          {renderDots()}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Selection')}>
          <Text style={styles.buttonText}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  imagedesign: {
    flex: 0,
    width: width,
    height: height * 0.37,
    paddingTop: 78,
    position: 'relative',
  },
  Cirdes: {
    height: 458,
    width: 458,
    backgroundColor: '#78e0cc',
    position: 'absolute',
    top: -256,
    right: -284,
    borderRadius: 250,
  },
  imagebox: {
    flex: 0,
    alignItems: 'center',
    height: height * 0.25,
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: 250,
  },
  contentContainer: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: width * 1,
    backgroundColor: 'rgba(126,88,199,1)',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    paddingTop: 0,
    paddingBottom: 20,
    gap:0,
  },
  splashImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  button: {
    // backgroundColor: '#fff',
    backgroundColor: '#78e0cc',

    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
