import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import addressList from './addressList';
import map from './map';
 
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MY PLACES" component={addressList} />
        <Stack.Screen name="MAP" component={map} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

