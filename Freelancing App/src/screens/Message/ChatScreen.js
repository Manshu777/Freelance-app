import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Tick from '../../assets/images/Tick.png';
import BlueTick from '../../assets/images/BlueTick.png';
import CoachDp from '../../assets/images/My.png';
import UserDp from '../../assets/images/CoachDp.webp';
import Back from '../../assets/images/LeftArrow.png';

const { width } = Dimensions.get('window');

const ChatScreen = ({ route }) => {
  const navigation = useNavigation();

  // const { coach } = route.params;
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi, how are you?', isSender: false, seen: true },
    {
      id: '2',
      text: 'I am good, thank you! How about you?',
      isSender: true,
      seen: true,
    },
    {
      id: '3',
      text: 'I’m doing well! Let’s discuss the project.',
      isSender: false,
      seen: false,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: newMessage,
          isSender: true,
          seen: false,
        },
      ]);
      setNewMessage('');
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderMessage = ({ item }) => (
    <View
      style={[styles.message, item.isSender ? styles.sender : styles.receiver]}
    >
      {!item.isSender && <Image source={CoachDp} style={styles.avatar} />}
      <View style={styles.messageContent}>
        <Text
          style={[
            styles.text,
            item.isSender ? styles.Textsender : styles.Textreceiver,
          ]}
        >
          {item.text}
        </Text>
        {item.isSender && (
          <Image source={item.seen ? BlueTick : Tick} style={styles.tickIcon} />
        )}
      </View>
      {item.isSender && <Image source={UserDp} style={styles.avatar} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerssection}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={handleBackPress}
        >
          <Image source={Back} style={styles.backButtonIcon} />
        </TouchableOpacity>
        <Text style={styles.header}>Xyz</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        inverted
        style={styles.chatList}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  backButtonContainer: {
    padding: 10,
  },
  backButtonIcon: {
    height: 25,
    aspectRatio: 1,
  },
  headerssection: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#000a24',
    padding: 16,
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  chatList: { paddingHorizontal: 16, flex: 1 },
  message: {
    flexDirection: 'row',
    marginVertical: 4,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    maxWidth: '80%',
    gap: 10,
  },
  sender: {
    borderBottomLeftRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  receiver: {
    borderBottomRightRadius: 10,
    backgroundColor: '#007AFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  messageContent: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    maxWidth: '85%',
  },
  text: { fontSize: 16, color: '#fff' },
  tickIcon: { width: 15, height: 15, marginLeft: 5 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginHorizontal: 0 },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    backgroundColor: '#F6F7F9',
    borderRadius: 10,
    padding: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  Textsender: {
    color: 'black',
  },
  sendText: { color: '#fff', fontSize: 16 },
});
