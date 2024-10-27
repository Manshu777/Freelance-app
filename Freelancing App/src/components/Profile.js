import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import Dp from '../assets/images/My.png';
import Bell from '../assets/images/Bell.png';
import styles from '../styles/HomeStyle';
import {useNavigation} from '@react-navigation/native';

const notificationsData = [
  {id: '1', message: 'Your profile has been updated.'},
  {id: '2', message: 'You have a new message.'},
  {id: '3', message: 'Reminder: Meeting at 3 PM.'},
];

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();


  const handleEmailPress = () => {
    navigation.navigate('User');
  };

  const handleNotificatios = () => {
    navigation.navigate('Notification');

  };


  return (
    <View style={styles.Userprofile}>
      <View style={styles.ProfileDet}>

        <TouchableOpacity
          style={styles.imageShadoweff}
          onPress={handleEmailPress}>
          <Image source={Dp} style={styles.dp} />
        </TouchableOpacity>
        <View style={styles.UserDetails}>
          <Text style={styles.UserName}>User Mehra</Text>
          <Text style={styles.UserLocation}>Sec 34, Ambala</Text>
        </View>
      </View>

      <View style={styles.bellIconDes}>
        <TouchableOpacity
          // onPress={() => setModalVisible(true)}
          onPress={() => handleNotificatios()}
        >
          <Image source={Bell} style={styles.BellIcon} />
          <View style={styles.NotiDot}></View>
        </TouchableOpacity>
      </View>

      {/* Modal for Notifications */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notifications</Text>
            <FlatList
              data={notificationsData}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Text style={styles.notificationText}>{item.message}</Text>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// const styles = StyleSheet.create({
//   // Your existing styles
//   Userprofile: {
//     // Your user profile styles
//   },
//   ProfileDet: {
//     // Your profile details styles
//   },
//   imageShadoweff: {
//     // Your image shadow effect styles
//   },
//   dp: {
//     // Your dp styles
//   },
//   UserDetails: {
//     // Your user details styles
//   },
//   UserName: {
//     // Your user name styles
//   },
//   UserLocation: {
//     // Your user location styles
//   },
//   bellIconDes: {
//     // Your bell icon styles
//   },
//   BellIcon: {
//     // Your bell icon styles
//   },
//   NotiDot: {
//     // Your notification dot styles
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
//   },
//   modalContent: {
//     width: '80%',
//     padding: 20,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   notificationText: {
//     marginVertical: 5,
//   },
//   closeButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: '#386BF6',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

export default Profile;
