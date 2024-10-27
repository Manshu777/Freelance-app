import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles/CoachProfilecss';

const Awards = ({ currentImageIndex, handleDotPress }) => {
  const awards = [
    {
      title: 'Awards',
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
      {awards.map((award, index) => (
        <View key={index} style={styles.awardContainer}>
          <Text style={styles.titleText}>{award.title}</Text>
          <Text style={styles.descriptionText}>{award.description}</Text>
          {award.images && (
            <View style={styles.certificateContainer}>
              <Image source={award.images[currentImageIndex].url} style={styles.certificateImage} />
              <View style={styles.dotContainer}>
                {award.images.map((_, idx) => (
                  <TouchableOpacity key={idx} onPress={() => handleDotPress(idx)} style={styles.dotButContainer}>
                    <View style={[styles.dot, currentImageIndex === idx && styles.activeDot]} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default Awards;
