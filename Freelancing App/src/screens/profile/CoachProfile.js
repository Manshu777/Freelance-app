import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import CoachDp from '../../assets/images/Rishav.jpg';

import Verifyed from '../../assets/images/Verifyed.png';
import Star from '../../assets/images/Star.png';
import Exp from '../../assets/images/Exp.png';
import Lang from '../../assets/images/Lang.png';
import styles from '../../styles/CoachProfilecss';
import Coaches from '../../components/Coaches';
import ReviewList from '../../components/ReviewList';
import AboutUs from '../../components/Coach/AboutUs';
import Education from '../../components/Coach/Education';
import Projects from '../../components/Coach/Projects';

const {width, height} = Dimensions.get('window');

const CoachProfile = () => {
  const [activeSection, setActiveSection] = useState('AboutUs');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentAwardImageIndex, setCurrentAwardImageIndex] = useState(0);
  const navigation = useNavigation();

  //   {
  //     description:
  //       'I’m Rishav Agnihotri8u, a dedicated coach with a passion for football, tennis, and basketball. My journey spans from player to coach, focusing on skill development and personal growth. I’m committed to helping athletes of all levels reach their full potential.',
  //   },
  //   {
  //     category: 'Football Coaches',
  //     description:
  //       'Experienced professionals focusing on technical skills, tactical awareness, and fitness. They help players of all levels develop their game and passion for football.',
  //     expertise:
  //       'Experts in technique and strategy, dedicated to improving your game. They offer personalized coaching to help players of all ages enhance their skills.',
  //   },
  //   {
  //     category: 'Tennis Coaches',
  //     description:
  //       'Dynamic and experienced, focusing on skill development, game strategy, and teamwork. They tailor sessions to individual needs, fostering growth and sportsmanship.',
  //   },
  //   {
  //     category: 'Basketball Coaches',
  //     description:
  //       'Dynamic and experienced, focusing on skill development, game strategy, and teamwork. They tailor sessions to individual needs, fostering growth and sportsmanship.',
  //   },
  // ];

  // const achievements = [
  //   {
  //     title: 'Certificates',
  //     description:
  //       'Over the years, I’ve been honored with various awards for excellence in coaching and sports training, recognizing my commitment to developing athletes, innovative training methods, and significant contributions to youth sports.',
  //   },
  //   {
  //     title: 'Certified Sports Coach',
  //     description:
  //       'Accredited certification in advanced coaching techniques for football, tennis, and basketball, ensuring high standards in training and development.',
  //   },
  //   {
  //     title: 'Certificates',
  //     images: [
  //       {
  //         id: 1,
  //         url: require('../../assets/images/Certificates.png'),
  //         description: 'Advanced Coaching Certificate for Football',
  //       },
  //       {
  //         id: 2,
  //         url: require('../../assets/images/Certificates.png'),
  //         description: 'Tennis Coaching Certification',
  //       },
  //       {
  //         id: 3,
  //         url: require('../../assets/images/Certificates.png'),
  //         description: 'Basketball Coaching Excellence Award',
  //       },
  //       {
  //         id: 4,
  //         url: require('../../assets/images/Certificates.png'),
  //         description: 'Basketball Coaching Excellence Award',
  //       },
  //       {
  //         id: 5,
  //         url: require('../../assets/images/Certificates.png'),
  //         description: 'Basketball Coaching Excellence Award',
  //       },
  //     ],
  //   },
  // ];

  // const Awards = [
  //   {
  //     title: 'Awards',
  //     description:
  //       'Over the years, I’ve been honored with various awards for excellence in coaching and sports training, recognizing my commitment to developing athletes, innovative training methods, and significant contributions to youth sports.',
  //   },
  //   {
  //     title: 'Certified Sports Coach',
  //     description:
  //       'Accredited certification in advanced coaching techniques for football, tennis, and basketball, ensuring high standards in training and development.',
  //   },
  //   {
  //     title: 'Certificates',
  //     images: [
  //       {
  //         id: 1,
  //         url: require('../../assets/images/Certificates.png'),
  //         description: 'Advanced Coaching Certificate for Football',
  //       },
  //       {
  //         id: 2,
  //         url: require('../../assets/images/Certificates.png'),
  //         description: 'Tennis Coaching Certification',
  //       },
  //       {
  //         id: 3,
  //         url: require('../../assets/images/Certificates.png'),
  //         description: 'Basketball Coaching Excellence Award',
  //       },
  //     ],
  //   },
  // ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleDotPress = index => {
    setActiveImageIndex(index);
  };

  const handlePrevImage = () => {
    if (activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (activeImageIndex < achievements[2].images.length - 1) {
      setActiveImageIndex(activeImageIndex + 1);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'AboutUs':
        return (
          <View>
            <Text style={styles.contentText}>{coaches[0].description}</Text>
            {coaches.slice(1).map((coach, index) => (
              <View key={index} style={styles.coachContainer}>
                <Text style={styles.categoryText}>{coach.category}</Text>
                <Text style={styles.descriptionText}>{coach.description}</Text>
                {coach.expertise && (
                  <Text style={styles.expertiseText}>{coach.expertise}</Text>
                )}
              </View>
            ))}
          </View>
        );

      case 'Certificates':
        return (
          <View>
            <Text style={styles.contentText}>
              {achievements[0].description}
            </Text>
            <Text style={styles.contentText}>
              {achievements[1].description}
            </Text>

            <View style={styles.certificateContainer}>
              <Image
                source={achievements[2].images[activeImageIndex].url}
                style={styles.certificateImage}
              />
            </View>

            <View style={styles.dotContainer}>
              {achievements[2].images.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleDotPress(index)}
                  style={styles.dotButContainer}>
                  <View
                    style={[
                      styles.dot,
                      activeImageIndex === index && styles.activeDot,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'Awards':
        return (
          <View>
            {Awards.map((award, index) => (
              <View key={index} style={styles.awardContainer}>
                <Text style={styles.titleText}>{award.title}</Text>
                <Text style={styles.descriptionText}>{award.description}</Text>
                {award.images && (
                  <View>
                    <View style={styles.certificateContainer}>
                      <Image
                        source={award.images[activeImageIndex].url}
                        style={styles.certificateImage}
                      />
                    </View>

                    <View style={styles.dotContainer}>
                      {award.images.map((_, idx) => (
                        <TouchableOpacity
                          key={idx}
                          onPress={() => handleDotPress(idx)}
                          style={styles.dotButContainer}>
                          <View
                            style={[
                              styles.dot,
                              activeImageIndex === idx && styles.activeDot,
                            ]}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  // Toggle the section (Expand/Collapse)
  const toggleSection = sectionName => {
    setActiveSection(activeSection === sectionName ? null : sectionName);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.maincontainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={navigation.goBack}>
            <Image
              source={require('../../assets/images/LeftArrow.png')}
              style={styles.backButtonIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            paddingTop: 15,
          }}>
          <View style={styles.CoachCards}>
            <View style={styles.CoachDetails}>
              <View style={styles.CoachImgSection}>
                <Image source={CoachDp} style={styles.CoachImage} />

                <View style={styles.Coachrating}>
                  <Image source={Star} style={styles.RatingStar} />

                  <Text style={styles.RatingNumber}>-0.1</Text>
                </View>
              </View>

              <View style={{flex: 0, gap: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: width * 0.5,
                    marginTop: 5,
                  }}>
                  <Text
                    style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
                    Mr. Rishav Angihotri
                  </Text>

                  <Image source={Verifyed} style={{width: 25, height: 25}} />
                </View>

                <View style={{flex: 0, gap: 7.5}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Image
                      source={require('../../assets/images/Education.png')}
                      style={{width: 20, height: 20}}
                    />
                    <Text
                      style={{
                        color: '#616161',
                        width: width * 0.4,
                        fontSize: 16,
                      }}>
                      Tennis
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Image source={Lang} style={{width: 20, height: 20}} />
                    <Text
                      style={{
                        color: '#616161',
                        width: width * 0.5,
                        fontSize: 16,
                      }}>
                      Hindi, English
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Image source={Exp} style={{width: 20, height: 20}} />
                    <Text
                      style={{
                        color: '#616161',
                        width: width * 0.5,
                        fontSize: 16,
                      }}>
                      5 Years
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{marginTop: 15, flexDirection: 'row'}}>
              <TouchableOpacity style={styles.CoachButtons} activeOpacity={0.7}>
                <Image
                  source={require('../../assets/images/Chat.png')}
                  style={styles.CoachButtIcon}
                />
                <Text style={styles.buttTextCoach}>Chat Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.CoachButtons} activeOpacity={0.7}>
                <Image
                  source={require('../../assets/images/Call-Icon.png')}
                  style={styles.CoachButtIcon}
                />
                <Text style={styles.buttTextCoach}>Call Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.containerDetails}>
          <AboutUs />
          <Education />
          <Projects />
        </View>

        <ReviewList />
        <Coaches />
      </View>
    </ScrollView>
  );
};

export default CoachProfile;
