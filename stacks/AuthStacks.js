import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login';

const AuthStack = createNativeStackNavigator();

export default function AuthStacks() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={Login} options={
        {
          headerShown: false
        }
      } />
    </AuthStack.Navigator>
  )
}