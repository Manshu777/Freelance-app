import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Message from '../../assets/Svgs/MessageIcon';
import Home from '../../assets/Svgs/HomeIcon';
import Search from '../../assets/Svgs/SearchIcon';
import Profile from '../../assets/Svgs/ProfileIcon';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const Navigation = React.memo(({currentRoute}) => {
  const [activeTab, setActiveTab] = useState(currentRoute);
  const [loginRole, setLoginRole] = useState(null);
  const [NavigationPath, setNavigationPath] = useState(null)
  const navigation = useNavigation();

  // console.log('navigation path is ',NavigationPath)

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        if (userInfo) {
          const parsedInfo = JSON.parse(userInfo);
          setLoginRole(parsedInfo.LoginRole);

          if (parsedInfo.LoginRole === 'Coach') {
            setNavigationPath('Coach')
          } else {
            setNavigationPath('User')
            // navigation.navigate('User');
          }
        } else {
          console.log('No userInfo found in local storage.');
        }
      } catch (error) {
        console.error('Error retrieving userInfo:', error);
      }
    };

    getUserRole();
  }, [navigation]);

  const icons = useMemo(
    () => [
      {id: 3, name: 'Home', Component: Home, label: 'Home'},
      {id: 2, name: 'OurCoaches', Component: Search, label: 'Search'},
      {id: 1, name: 'Chat', Component: Message, label: 'Chat'},
      {id: 4, name: 'Profile', Component: Profile, label: 'Profile'},
    ],
    [NavigationPath],
  );

  const handlePress = useCallback(
    name => {
      if (activeTab !== name) {
        setActiveTab(name);
        navigation.navigate(name);
      }
    },
    [activeTab, navigation],
  );

  return (
    <View style={styles.container}>
      {icons.map(({id, name, Component, label}) => {
        const isActive = activeTab === name;
        const iconColor = isActive ? '#386BF6' : '#B6C5DA';
        const IconSize = isActive ? 22.5 : 32.5;
        const textColor = isActive ? '#386BF6' : '#B6C5DA';
        const textVisible = isActive ? 'flex' : 'none';
        const displayLabel = isActive ? label : '';

        const scale = useRef(new Animated.Value(isActive ? 1.1 : 1)).current;

        useEffect(() => {
          // Reset scale for all icons
          Animated.spring(scale, {
            toValue: isActive ? 1.1 : 1,
            friction: 3,
            tension: 100,
            useNativeDriver: true,
          }).start();
        }, [isActive, scale]);

        return (
          <TouchableOpacity
            key={id}
            style={styles.iconContainer}
            onPress={() => handlePress(name)}>
            <Animated.View style={{transform: [{scale}]}}>
              <Component
                color={iconColor}
                height={IconSize}
                width={IconSize}
                style={{marginBottom: 10}}
              />
            </Animated.View>
            <Text
              style={[
                styles.iconLabel,
                {color: textColor},
                {display: textVisible},
              ]}>
              {displayLabel}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    width: width,
    backgroundColor: 'white',
    height: 65,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconLabel: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default Navigation;
