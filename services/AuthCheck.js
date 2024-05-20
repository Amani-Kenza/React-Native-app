import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';

const Stack = createStackNavigator();

const AuthCheck = () => {
  const { user } = useContext(AuthContext);

  return (
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        ) : (
          <Stack.Screen name="Account" component={LoginScreen} />
        )}
      </Stack.Navigator>
  );
};

export default AuthCheck;
