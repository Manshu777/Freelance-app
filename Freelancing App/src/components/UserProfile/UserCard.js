import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const UserCard = ({userInfo}) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          height: 104,
          width: 104,
          borderColor: 'white',
          borderWidth: 2,
          borderRadius: 75,
          marginTop: -50,
        }}>
        <Image
          source={require('../../assets/images/My.png')}
          style={{ height: 100, width: 100, borderRadius: 75 }}
        />
      </View>
      <View
        style={{
          flex: 0,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
          marginTop: 10,
        }}>
        <Text style={{ color: 'black', fontSize: 18, fontWeight: '600' }}>
          Random User
        </Text>
        <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/Phone.png')}
            style={{ width: 20, aspectRatio: 1, marginRight: 5 }}
          />
          <Text style={{ color: 'black', fontSize: 18, fontWeight: '400' }}>
            1234567890
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({});
