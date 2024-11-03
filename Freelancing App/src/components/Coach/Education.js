import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles/CoachProfilecss';

const Education = ({ activeImageIndex, handleDotPress }) => {
  const achievements = [
    {
      title: 'Certificates',
      description:
        'Over the years, I’ve been honored with various awards for excellence in coaching and sports training, recognizing my commitment to developing athletes, innovative training methods, and significant contributions to youth sports.',
    },
    {
      title: 'Certified Sports Coach',
      description:
        'Accredited certification in advanced coaching techniques for football, tennis, and basketball, ensuring high standards in training and development.',
    },
    {
      title: 'Certificates',
      images: [
        {
          id: 1,
          url: require('../../assets/images/Certificates.png'),
          description: 'Advanced Coaching Certificate for Football',
        },
        {
          id: 2,
          url: require('../../assets/images/Certificates.png'),
          description: 'Tennis Coaching Certification',
        },
        {
          id: 3,
          url: require('../../assets/images/Certificates.png'),
          description: 'Basketball Coaching Excellence Award',
        },
      ],
    },
  ];

  return (
    <View>
      <Text style={styles.contentText}>{achievements[0].description}</Text>
      <Text style={styles.contentText}>{achievements[1].description}</Text>

      <View style={styles.certificateContainer}>
        <Image source={achievements[2].images[activeImageIndex].url} style={styles.certificateImage} />
      </View>

      <View style={styles.dotContainer}>
        {achievements[2].images.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handleDotPress(index)} style={styles.dotButContainer}>
            <View style={[styles.dot, activeImageIndex === index && styles.activeDot]} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Education;
