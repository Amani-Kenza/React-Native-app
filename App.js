import React, {useEffect} from 'react';
import {firebaseApp} from './firebaseConfig';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProductScreen from './screens/ProductScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import { AuthProvider } from './services/AuthContext';
import AuthCheck from './services/AuthCheck';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProductStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AllProducts" component={ProductScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="Details" component={ProductDetailsScreen} />
  </Stack.Navigator>
);

const App = () => {
   useEffect(() => {
    console.log('Firebase App initialized:', firebaseApp);
  }, []);
  return (
    <AuthProvider>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Products" component={ProductStack} options={{ headerShown: false }} />
        <Tab.Screen
          name="account"
          component={AuthCheck}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
  
  }
  
export default App;