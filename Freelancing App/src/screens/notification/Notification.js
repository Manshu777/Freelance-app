import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  LayoutAnimation,
  UIManager,
  Platform,
  SectionList,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../../styles/CoachProfilecss';
import Down from '../../assets/images/down-arr.png';

const {width, height} = Dimensions.get('window');

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const notificationsData = [
  {
    title: 'Notification',
    data: [
      {
        id: 1,
        type: 'Career',
        message:
          'Reminder: Your 1-year career report is ready! Download your career report...',
        time: '45 minutes ago',
      },
      {
        id: 2,
        type: 'Career',
        message:
          'Reminder: Your 1-year career report is ready! Download your career report...',
        time: '45 minutes ago',
      },
      {
        id: 3,
        type: 'Career',
        message:
          'Reminder: Your 1-year career report is ready! Download your career report...',
        time: '45 minutes ago',
      },
      {
        id: 4,
        type: 'Career',
        message:
          'Reminder: Your 1-year career report is ready! Download your career report...',
        time: '45 minutes ago',
      },
      {
        id: 5,
        type: 'Career',
        message:
          'Reminder: Your 1-year career report is ready! Download your career report...',
        time: '45 minutes ago',
      },
    ],
  },
  {
    title: 'Training Notification',
    data: [
      {
        id: 2,
        type: 'Training',
        message:
          'Reminder: Your Train for the day has been rescheduled for Tennis by 5:30 PM...',
        time: '30 seconds ago',
      },
    ],
  },
  {
    title: 'Coach Notification',
    data: [
      {
        id: 3,
        type: 'Coach',
        message:
          'Reminder: Your Coach of Badminton will be on Holiday on 25th August...',
        time: '25 minutes ago',
      },
      {
        id: 4,
        type: 'Coach',
        message:
          'Reminder: Congratulations, Your coach issued a Certificate for the Tennis...',
        time: '48 minutes ago',
      },
    ],
  },
  {
    title: 'More Updates',
    data: [
      {
        id: 3,
        type: 'Coach',
        message:
          'Reminder: Your Coach of Badminton will be on Holiday on 25th August...',
        time: '25 minutes ago',
      },
      {
        id: 4,
        type: 'Coach',
        message:
          'Reminder: Congratulations, Your coach issued a Certificate for the Tennis...',
        time: '48 minutes ago',
      },
    ],
  },
];

const Notification = () => {
  const navigation = useNavigation();
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = sectionTitle => {
    // Add animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  const renderNotificationItem = ({item}) => {
    return (
      <View style={notificationStyles.notificationContainer}>
        <Text style={notificationStyles.notificationMessage}>
          {item.message}
        </Text>
        <Text style={notificationStyles.notificationTime}>{item.time}</Text>
      </View>
    );
  };

  const renderSectionHeader = ({section: {title}}) => {
    const isExpanded = expandedSections[title];

    const getImageSource = sectionTitle => {
      switch (sectionTitle) {
        case 'Notification':
          return require('../../assets/images/Notify.png');
        case 'Training Notification':
          return require('../../assets/images/Trainning.png');
        case 'Coach Notification':
          return require('../../assets/images/Coachess.png');
        case 'More Updates':
          return require('../../assets/images/Updates.png');
        default:
          return require('../../assets/images/Notify.png');
      }
    };

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
          paddingHorizontal: 10,
          marginVertical: 10,
        }}>
        <Image
          source={getImageSource(title)}
          style={{height: 50, width: 50, marginRight: 0}}
        />

        <TouchableOpacity
          onPress={() => toggleSection(title)}
          style={notificationStyles.sectionHeaderContainer}>
          <Text style={notificationStyles.sectionHeader}>{title}</Text>
          <Image
            source={Down}
            style={[
              notificationStyles.downArrow,
              isExpanded && notificationStyles.upArrow,
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{paddingBottom:60,}}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={navigation.goBack}>
          <Image
            source={require('../../assets/images/LeftArrow.png')}
            style={styles.backButtonIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <SectionList
        sections={notificationsData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, section}) =>
          expandedSections[section.title]
            ? renderNotificationItem({item})
            : null
        }
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </View>
  );
};

const notificationStyles = StyleSheet.create({
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: '90%',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  downArrow: {
    width: 20.5,
    height: 12.16,
    transform: [{rotate: '0deg'}],
  },
  upArrow: {
    transform: [{rotate: '180deg'}],
  },
  notificationContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#333',
  },
  notificationTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});

export default Notification;
