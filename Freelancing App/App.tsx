import React, { useEffect, useState } from 'react'; 
import { BackHandler, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// App Screens and Components
import SplashScreen from './src/screens/auth/SplashScreen';
import CoachRegistration from './src/screens/auth/CoachRegistration';
import StudentRegistration from './src/screens/auth/StudentRegistration';
import LoginScreen from './src/screens/auth/LoginScreen';
import LoginSuccess from './src/screens/auth/LoginSuccess';
import LoginOTPverify from './src/screens/auth/LoginOTPverify';
import Home from './src/screens/home/Home';
import OurCoaches from './src/screens/coaches/OurCoaches';
import Message from './src/screens/Message/Message';
import ChatScreen from './src/screens/Message/ChatScreen';
import Notification from './src/screens/notification/Notification';
import CoachProfile from './src/screens/profile/CoachProfile';
import Loading from './src/screens/Loading/Loading';
import Navigation from './src/components/navigation/Navigation';

// Redux
import { Provider } from 'react-redux';
import { store } from './src/store/store';

const Stack = createStackNavigator();

const App = () => {
  const [currentRoute, setCurrentRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  let lastBackPressed = 0;

  // Function to handle state changes in the navigator
  const onStateChange = (state) => {
    if (state) {
      const routeName = state.routes[state.index].name;
      const matchedRoutes = [ 'Home', 'OurCoaches', 'Chat'];
      if (matchedRoutes.includes(routeName)) {
        setCurrentRoute(routeName);
      } else {
        setCurrentRoute(null);
      }
    }
  };

  // Check if the user has a valid token stored
  useEffect(() => {
    const checkSession = async () => {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken); // Set the token if it exists
      }
      setLoading(false); // Stop loading once we have checked the session
    };
    checkSession();
  }, []);

  // BackHandler logic to confirm exit on back press
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
        return true; // Prevent default back action
      }
      return false; // Let the default back action happen for other screens
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [currentRoute]);

  // If the app is still loading, show the Loading screen
  if (loading) {
    return <Loading />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer onStateChange={onStateChange}>
        <Stack.Navigator
          initialRouteName={token ? 'Home' : 'SplashScreen'}
          screenOptions={{
            headerShown: false, // Disable the header for all screens
            gestureEnabled: false,
          }}
        >
          {/* Authentication Flow */}
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="LoginOTPverify" component={LoginOTPverify} />
          <Stack.Screen name="LoginSuccess" component={LoginSuccess} />

          {/* App Flow */}
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="OurCoaches" component={OurCoaches} />
          <Stack.Screen name="Chat" component={Message} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Profile" component={CoachProfile} />
          <Stack.Screen name="CoachRegistration" component={CoachRegistration} />
          <Stack.Screen name="StudentRegistration" component={StudentRegistration} />
        </Stack.Navigator>

        {/* Only display the navigation bar on these routes */}
        {currentRoute && ['LoginSuccess', 'Home', 'OurCoaches', 'Chat'].includes(currentRoute) && (
          <Navigation currentRoute={currentRoute} />
        )}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
