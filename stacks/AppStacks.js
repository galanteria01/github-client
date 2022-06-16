import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home';
import Recents from '../screens/Recents';
import Profile from '../screens/Profile';
import App from '../App';
import Tabs from '../screens/Tabs';

const AppStack = createNativeStackNavigator();

export default function AppStacks() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
    </AppStack.Navigator>
  )
}