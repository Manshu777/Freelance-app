import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';

import myImage from '../../assets/images/Tabletlogin-bro.png';
import studentImage from '../../assets/images/StudentSelection.png';
import coachImage from '../../assets/images/CoachSelection.png';

const {width, height} = Dimensions.get('window');

const RoleSelectionScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);


  const handleRoleSelection = role => {
    if (role === 'StudentLogin') {
      navigation.navigate('LoginScreen', { role: 'Student' }); 
    } else if (role === 'CoachLogin') {
      navigation.navigate('LoginScreen', { role: 'Coach' });
    }
  };


  return (
    <View style={localStyles.container}>
      <View style={localStyles.imagedesign}>
        <View style={localStyles.Cirdes}></View>
        <View style={localStyles.imagebox}>
          <Image source={myImage} style={localStyles.image} />
        </View>
      </View>

      <View style={localStyles.contentContainer}>
        <Text style={localStyles.title}>Who Are You?</Text>
        <Text style={localStyles.titleAns}>
          Select your role to proceed. Your experience will be customized based
          on your choice.
        </Text>

        <View style={localStyles.roleContainer}>
          <TouchableOpacity
            style={localStyles.roleOption}
            onPress={() => handleRoleSelection('StudentLogin')}
            disabled={loading}>
            <Image source={studentImage} style={localStyles.roleImage} />
            <Text style={localStyles.roleText}>Freelancer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={localStyles.roleOption}
            onPress={() => handleRoleSelection('CoachLogin')}
            disabled={loading}>
            <Image source={coachImage} style={localStyles.roleImage} />
            <Text style={localStyles.roleText}>Hire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  imagedesign: {
    flex: 0,
    width: width,
    paddingTop: 78,
    position: 'relative',
  },
  Cirdes: {
    height: 458,
    width: 458,
    backgroundColor: '#FFB900',
    position: 'absolute',
    top: -256,
    right: -284,
    borderRadius: 250,
  },
  imagebox: {
    flex: 0,
    alignItems: 'center',
    height: height * 0.25,
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: 300,
  },
  contentContainer: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 1,
    backgroundColor: 'rgba(126,88,199,1)',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    paddingTop: 0,
    paddingBottom: 20,
    gap: 0,
    height: '55%',
  },
  title: {
    textAlign: 'left',
    width: '90%',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
  },
  titleAns: {
    width: '90%',
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 30,
    color: '#fff',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    gap: 20,
  },
  roleOption: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 20,
    paddingVertical: 20,
    width:'47.5%',
    gap: 20,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  roleImage: {
    width: 120,
    height: 120,
  },
  roleText: {
    fontSize: 22,
    fontWeight: '400',
    color: 'black',
  },
});

export default RoleSelectionScreen;
