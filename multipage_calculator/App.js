
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import calculatorApp from './calculator';
import history from './history';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={calculatorApp} />
        <Stack.Screen name="History" component={history} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}