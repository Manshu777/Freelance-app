import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Search from '../../assets/images/Search.png';
import CoachDp from '../../assets/images/My.png';

const {width, height} = Dimensions.get('window');

const coaches = [
  {
    id: '1',
    name: 'Manshu',
    lastMessage: 'Let’s discuss further...',
    time: '14:05',
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'John Doe',
    lastMessage: 'See you tomorrow!',
    time: '09:30',
    unreadCount: 1,
  },
  {
    id: '3',
    name: 'Jane Smith',
    lastMessage: 'Don’t forget the meeting at 5 PM.',
    time: '11:45',
    unreadCount: 3,
  },
  {
    id: '4',
    name: 'Emily Johnson',
    lastMessage: 'Great session today!',
    time: '12:15',
    unreadCount: 0,
  },
  {
    id: '5',
    name: 'Michael Scott',
    lastMessage: 'Please review the document.',
    time: '13:10',
    unreadCount: 1,
  },
  {
    id: '6',
    name: 'Sarah Lee',
    lastMessage: 'I will join the meeting soon.',
    time: '08:45',
    unreadCount: 0,
  },
  {
    id: '7',
    name: 'David Miller',
    lastMessage: 'Thanks for your help!',
    time: '16:20',
    unreadCount: 4,
  },
  {
    id: '8',
    name: 'Sophia Turner',
    lastMessage: 'Can we reschedule?',
    time: '10:05',
    unreadCount: 1,
  },
  {
    id: '9',
    name: 'Chris Evans',
    lastMessage: 'Looking forward to our session.',
    time: '15:30',
    unreadCount: 3,
  },
  {
    id: '10',
    name: 'Olivia Brown',
    lastMessage: 'Let’s catch up soon.',
    time: '17:40',
    unreadCount: 0,
  },
  {
    id: '11',
    name: 'Ethan Clark',
    lastMessage: 'I will send the files tomorrow.',
    time: '18:50',
    unreadCount: 2,
  },
  {
    id: '12',
    name: 'Isabella Martinez',
    lastMessage: 'Great progress today!',
    time: '11:15',
    unreadCount: 5,
  },
  {
    id: '13',
    name: 'Ava Wilson',
    lastMessage: 'See you next week!',
    time: '14:50',
    unreadCount: 0,
  },
  {
    id: '14',
    name: 'James Hall',
    lastMessage: 'Thanks for the feedback!',
    time: '19:05',
    unreadCount: 1,
  },
  {
    id: '15',
    name: 'Mia Thomas',
    lastMessage: 'I’m almost done with the task.',
    time: '09:20',
    unreadCount: 0,
  },
  {
    id: '16',
    name: 'William Harris',
    lastMessage: 'Let’s review the project tomorrow.',
    time: '13:35',
    unreadCount: 2,
  },
  {
    id: '17',
    name: 'Benjamin Martin',
    lastMessage: 'Just checking in.',
    time: '15:10',
    unreadCount: 0,
  },
  {
    id: '18',
    name: 'Lucas Young',
    lastMessage: 'Are you available for a call?',
    time: '10:40',
    unreadCount: 3,
  },
  {
    id: '19',
    name: 'Charlotte Anderson',
    lastMessage: 'Don’t forget to update the doc.',
    time: '12:55',
    unreadCount: 1,
  },
  {
    id: '20',
    name: 'Harper Walker',
    lastMessage: 'Let me know your availability.',
    time: '16:00',
    unreadCount: 0,
  },
  {
    id: '21',
    name: 'Elijah White',
    lastMessage: 'The presentation is ready.',
    time: '18:20',
    unreadCount: 2,
  },
  {
    id: '22',
    name: 'Amelia Harris',
    lastMessage: 'We need to finalize the details.',
    time: '11:35',
    unreadCount: 4,
  },
  {
    id: '23',
    name: 'Mason Lewis',
    lastMessage: 'Thanks for the update!',
    time: '09:50',
    unreadCount: 1,
  },
  {
    id: '24',
    name: 'Liam Robinson',
    lastMessage: 'Can you send the latest report?',
    time: '08:25',
    unreadCount: 2,
  },
  {
    id: '25',
    name: 'Ella Davis',
    lastMessage: 'Meeting at 3 PM today.',
    time: '17:10',
    unreadCount: 3,
  },
];

const Message = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoachImage, setSelectedCoachImage] = useState(null);
  const navigation = useNavigation();

  const handleImageClick = image => {
    setSelectedCoachImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCoachImage(null);
  };

  const handleChatPress = coach => {
    navigation.navigate('ChatScreen', { coach});

  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Image source={Search} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Coach"
          placeholderTextColor={'#808080'}
          clearButtonMode="always"
        />
      </View>

      <FlatList
        data={coaches}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.messageItem}
            onPress={() => handleChatPress(item)}>
            <TouchableOpacity onPress={() => handleImageClick(CoachDp)}>
              <Image source={CoachDp} style={styles.coachImage} />
            </TouchableOpacity>
            <View style={styles.messageDetails}>
              <View style={styles.messageHeader}>
                <Text style={styles.coachName}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <View style={styles.messageContent}>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
                {item.unreadCount > 0 && (
                  <Text style={styles.unreadCount}>{item.unreadCount}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={closeModal}
            style={styles.modalCloseButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          {selectedCoachImage && (
            <Image source={selectedCoachImage} style={styles.fullImage} />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchIcon: {
    width: 35,
    height: 35,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    backgroundColor: '#F6F7F9',
    borderRadius: 10,
    paddingLeft: 15,
    paddingVertical: 5,
    color: '#000',
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  coachImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  messageDetails: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  coachName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  time: {
    fontSize: 14,
    color: '#808080',
  },
  messageContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 16,
    color: '#000',
  },
  unreadCount: {
    fontSize: 14,
    backgroundColor: '#FF6347',
    color: '#fff',
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 30,
    color: '#fff',
  },
  fullImage: {
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: 10,
  },
});
