import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfoString = await AsyncStorage.getItem('userInfo');
        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          setUserInfo(userInfo);
        }
      } catch (error) {
        console.error('Failed to load user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const saveUserInfo = async (newUserInfo) => {
    try {
      const userInfoString = JSON.stringify(newUserInfo);
      await AsyncStorage.setItem('userInfo', userInfoString);
      setUserInfo(newUserInfo);
    } catch (error) {
      console.error('Failed to save user info:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, saveUserInfo, loading }}>
      {children}
    </UserContext.Provider>
  );
};
