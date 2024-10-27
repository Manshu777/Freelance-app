import React, { useEffect } from 'react';
import { View, Image, Text, FlatList, BackHandler, Alert } from 'react-native';
import styles from '../../styles/HomeStyle';
import Profile from '../../components/Profile';
import DailyGuide from '../../components/DailyGuide';
import GetInTouch from '../../components/GetInTouch';
import HeroSection from '../../components/HeroSection';
import Coaches from '../../components/Coaches';
import CoachCard from '../../components/CoachCard';
import Students from '../../components/Students';
import Finance from '../../assets/images/Finance.png';
import Training from '../../components/Training';
import { ScrollView } from 'react-native-gesture-handler';

const coachDetails = [
  {
    id: '1',
    name: 'Manshu',
    rating: 4.5,
    verified: true,
    coachImage: require('../../assets/images/CoachImage.png'),
    skills: [
      'App Developer',
      'Website Developer',
     
    ],
    languages: ['Hindi', 'English', 'French'],
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
    id: '2',
    name: 'Manshu',
    rating: 4.5,
    verified: true,
    coachImage: require('../../assets/images/CoachImage.png'),
    skills: [
      'E-commerce  Developer',
      'Website Developer',
   
    ],
    languages: ['Hindi', 'Kannada', 'English', 'French'],
    experience: '15 Years',
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
    name: 'Manshu',
    rating: 4.5,
    verified: true,
    coachImage: require('../../assets/images/CoachImage.png'),
    skills: [
      'Web Developer',
      'App Development',
    ],
    languages: ['Hindi', 'Kannada', 'English', 'French'],
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
];

const trainingData = [
  {
    id: '1',
    backgroundColor: '#FAEADA',
    rodColor: '#BEBEBE',
    circleColor: '#CE853E',
    icon: require('../../assets/images/Clipboard.png'),
    heading: 'Onboarding & Assessment',
    paragraph:
      'Trainees undergo an initial assessment (e.g., fitness level, goals, etc.) to tailor the training plan.',
  },
  {
    id: '2',
    backgroundColor: '#DAF2F1',
    rodColor: '#BEBEBE',
    circleColor: '#32B2AD',
    icon: require('../../assets/images/Aim.png'),
    heading: 'Goal Setting & Planning',
    paragraph:
      "Coaches design a customized training plan based on the trainee's goals.",
  },
  {
    id: '3',
    backgroundColor: '#F6DDDE',
    rodColor: '#BEBEBE',
    circleColor: '#B55457',
    icon: require('../../assets/images/Weight.png'),
    heading: 'Training & Monitoring',
    paragraph:
      'The app tracks key metrics (e.g., calories burned, weights lifted) and provides analytics to visualize progress.',
  },
  {
    id: '4',
    backgroundColor: '#F1E6F6',
    rodColor: '#BEBEBE',
    circleColor: '#A05BBD',
    icon: require('../../assets/images/Check.png'),
    heading: 'Check-Ins & Adjustments',
    paragraph:
      'Coaches tweak the training plan based on performance, feedback, and evolving goals.',
  },
  {
    id: '5',
    backgroundColor: '#E9FBEE',
    rodColor: '#BEBEBE',
    circleColor: '#6EBD84',
    icon: require('../../assets/images/Trophy.png'),
    heading: 'Completion & Review',
    paragraph:
      'Trainees receive a certificate or badge for completing the training program, which they can share on social media or their profile.',
  },
];

const Home = () => {

  return (
    <View style={styles.HomeContainer}>
      <ScrollView>
        <Profile />
        <HeroSection />
        {/* <DailyGuide /> */}
        {/* <GetInTouch /> */}
        
        <Coaches />

  
        <View style={styles.FinanceSection}>
          <View style={styles.FinanceHeading}>
            <Text style={styles.FinanceText}>
              Lets know About Our
              <Text style={styles.FinanceStu}> Profiles....</Text>
            </Text>
            <Text style={styles.FinancePara}>
              Our Coaches are there to Guide/ help you
            </Text>
          </View>
          <Image source={Finance} style={styles.FinanceImage} />
        </View>

        <Students />
        <View style={styles.CoachListSection}>
          <Text style={styles.CoachSectionHead}>Most Rated</Text>
          {coachDetails.slice(0, 3).map((item, index) => (
            <View
              key={item.id}
              style={{
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 4,
                padding: 10,
                marginHorizontal: 10,
                marginTop: 0,
                marginLeft: 3,
                width: '97.5%',
                marginBottom: index === 2 ? 25 : 5,
                borderRadius: 15,
              }}
            >
              <CoachCard coach={item} />
            </View>
          ))}
        </View>
        <View style={styles.CoachListSection}>
          <Text style={styles.CoachSectionHead}>Training Journey</Text>
          {trainingData.map((item, index) => (
            <Training Trainning={item} key={item.id} index={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

