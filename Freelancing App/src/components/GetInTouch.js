import { StyleSheet, Text, View ,Image} from 'react-native'
import styles from '../styles/HomeStyle';
import Notepad from '../assets/images/Notepad.png';
import Call from '../assets/images/Call.png';
import Chat from '../assets/images/Chat.png';
import React from 'react'

const HetinTouch = () => {
  return (
    <View style={styles.GuideSection}>
    <Text style={styles.GuideHeading}>Get In touch</Text>
    <View style={styles.ContactCards}>
      <View style={styles.ContactCard}>
        <View style={styles.ImageShadEff}>
          <Image source={Call} style={styles.ContactCardImg} />
        </View>
        <Text style={styles.ContactText}>Call</Text>
      </View>
      <View style={styles.ContactCard}>
        <View style={styles.ImageShadEff}>
          <Image source={Chat} style={styles.ContactCardImg} />
        </View>
        <Text style={styles.ContactText}>Chat Support</Text>
      </View>
      <View style={styles.ContactCard}>
        <View style={styles.ImageShadEff}>
          <Image source={Notepad} style={styles.ContactCardImg} />
        </View>
        <Text style={styles.ContactText}>Daily Report</Text>
      </View>
    </View>
  </View>

  )
}

export default HetinTouch

