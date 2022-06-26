import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Tabs } from '../screens';

const AppStack = createNativeStackNavigator();

export default function AppStacks() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
    </AppStack.Navigator>
  )
}