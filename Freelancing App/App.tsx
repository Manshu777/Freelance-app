import React, {useEffect, useState} from 'react';
import {BackHandler, Alert, ToastAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {UserProvider, UserContext} from './src/components/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// App all Screens and components
import SplashScreen from './src/screens/auth/SplashScreen';
import CoachRegistration from './src/screens/auth/CoachRegistration';
import StudentRegistration from './src/screens/auth/StudentRegistration';
import Selection from './src/screens/auth/Selection';
import LoginScreen from './src/screens/auth/LoginScreen';
import LoginSuccess from './src/screens/auth/LoginSuccess';
import LoginOTPverify from './src/screens/auth/LoginOTPverify';
import Home from './src/screens/home/Home';
import User from './src/screens/profile/User';
import Coach from './src/screens/profile/Coach';
import OurCoaches from './src/screens/coaches/OurCoaches';
import Message from './src/screens/Message/Message';
import ChatScreen from './src/screens/Message/ChatScreen';
import Notification from './src/screens/notification/Notification';
import CoachProfile from './src/screens/profile/CoachProfile';
import Navigation from './src/components/navigation/Navigation';
import Loading from './src/screens/Loading/Loading';

// import Testing from './src/components/Testing';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

const Stack = createStackNavigator();

const App = () => {
  const [currentRoute, setCurrentRoute] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Token,setToken] = useState(null)
  let lastBackPressed = 0;

  const onStateChange = state => {
    if (state) {
      const routeName = state.routes[state.index].name;
      const matchedRoutes = ['Home', 'OurCoaches', 'Chat'];
      if (matchedRoutes.includes(routeName)) {
        setCurrentRoute(routeName);
      } else {
        setCurrentRoute(null);
      }
    }
  };


  useEffect(() => {
    const checkSession = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
        navigation.navigate('Home');
      }
    };
    checkSession();
  }, []);


  useEffect(() => {
    const handleBackPress = () => {
      if (['SplashScreen', 'Home'].includes(currentRoute)) {
        const now = Date.now();
        if (lastBackPressed && now - lastBackPressed < 2000) {
          BackHandler.exitApp();
        } else {
          lastBackPressed = now;
          ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        }
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [currentRoute]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfoString = await AsyncStorage.getItem('userInfo');
        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          setUserInfo(userInfo);
          setCurrentRoute('Home');
        } else {
          setCurrentRoute('SplashScreen');
        }
      } catch (error) {
        console.error('Failed to load user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Provider store={store}>
    <UserProvider>
      <UserContext.Consumer>
        {({userInfo, loading}) => {
          if (loading) {
            return <Loading />;
          }

          return (
            <NavigationContainer onStateChange={onStateChange}>
              <Stack.Navigator
                initialRouteName={userInfo ? 'Home' : 'SplashScreen'}
                screenOptions={{
                  headerShown: false,
                  gestureEnabled: false,
                }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Selection" component={Selection} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen
                  name="LoginOTPverify"
                  component={LoginOTPverify}
                />
                <Stack.Screen name="LoginSuccess" component={LoginSuccess} />
                <Stack.Screen name="Loading" component={Loading} />
                <Stack.Screen
                  name="CoachRegistration"
                  component={CoachRegistration}
                />
                <Stack.Screen
                  name="StudentRegistration"
                  component={StudentRegistration}
                />
                {/* <Stack.Screen name="Testing" component={Testing} /> */}
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="User" component={User} />
                <Stack.Screen name="Coach" component={Coach} />
                <Stack.Screen name="OurCoaches" component={OurCoaches} />
                <Stack.Screen name="Chat" component={Message} />
                <Stack.Screen name="ChatScreen" component={ChatScreen} />
                <Stack.Screen name="Notification" component={Notification} />
                <Stack.Screen name="CoachProfile" component={CoachProfile} />
              </Stack.Navigator>
              {userInfo && currentRoute && (
                <Navigation currentRoute={currentRoute} />
              )}
            </NavigationContainer>
          );
        }}
      </UserContext.Consumer>
    </UserProvider>
    </Provider>
  );
};
export default App;
