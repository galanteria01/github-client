import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppStacks from './stacks/AppStacks';
import AuthStacks from './stacks/AuthStacks';
import { useSelector } from 'react-redux';
import { selectUser } from './features/user/userSlice';

export default function App() {
  const user = useSelector(selectUser)
  return (
    <NavigationContainer>
      {
        Object.keys(user).length !== 0 ? (
          <AppStacks />
        ) : (
          <AuthStacks />
        )
      }
    </NavigationContainer>
  );
}


