import {
  Dimensions,
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import DefaultSettings from '../../components/UserProfile/DefaultSettings';
import ProfileInfo from '../../components/UserProfile/ProfileInfo';
import Verifyed from '../../assets/images/Verifyed.png';
import CoachDp from '../../assets/images/Rishav.jpg';
import Education from '../../assets/images/Education.png';
import Lang from '../../assets/images/Lang.png';
import Exp from '../../assets/images/Exp.png';

const {width, height} = Dimensions.get('window');

const Coach = () => {
  const [selectedTab, setSelectedTab] = useState('Settings');
  const navigation = useNavigation();

  const handleTabPress = tab => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedTab(tab);
  };

  return (
    <View>
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
            </View>

            <View style={{flex: 0, gap: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width * 0.5,
                  marginTop: 5,
                }}>
                <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
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
                  <Image source={Education} style={{width: 20, height: 20}} />
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
        </View>
      </View>

      <View
        style={{
          flex: 0,
          alignItems: '',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingVertical: 15,
          width: '80%',
        }}>
        <TouchableOpacity
          style={{padding: 5}}
          onPress={() => handleTabPress('Personal Info')}>
          <Text
            style={{
              color: selectedTab === 'Personal Info' ? '#000' : '#838383',
              fontSize: 16,
              fontWeight: '600',
            }}>
            Personal Info
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{padding: 5}}
          onPress={() => handleTabPress('Settings')}>
          <Text
            style={{
              color: selectedTab === 'Settings' ? '#000' : '#838383',
              fontSize: 16,
              fontWeight: '600',
            }}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerSection}>
        {selectedTab === 'Personal Info' ? (
          <ProfileInfo />
        ) : (
          <DefaultSettings />
        )}
      </View>
    </View>
  );
};

export default Coach;

const styles = StyleSheet.create({
  CoachCards: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    width: width * 0.95,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  CoachDetails: {
    flex: 0,
    flexDirection: 'row',
    gap: 20,
  },
  CoachImgSection: {
    position: 'relative',
  },
  CoachImage: {
    height: 160,
    aspectRatio: 4 / 5,
    borderRadius: 10,
  },
  Coachrating: {
    gap: 5,
    flex: 0,
    left: 28,
    bottom: -10,
    borderRadius: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    position: 'absolute',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  RatingStar: {
    width: 20,
    aspectRatio: 1,
  },
  RatingNumber: {
    fontSize: 16,
    color: 'black',
  },
  CoachButtons: {
    gap: 5,
    elevation: 4,
    borderRadius: 25,
    shadowRadius: 4,
    shadowOpacity: 0.3,
    marginVertical: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 5,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  CoachButtIcon: {
    width: 22.5,
    aspectRatio: 1,
  },
  header: {
    width: '100%',
    backgroundColor: '#DE1F26',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 35,
    gap: 15,
    paddingBottom: 15,
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  backButtonIcon: {
    height: 20,
    width: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
  },
  containerSection:{
    paddingHorizontal:10,
    width:'100%'
  },
});
