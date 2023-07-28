import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import Login from '../screens/Login';
import Splash from '../screens/Splash';
import {RootStackParamList} from './interface';
import OTP from '../screens/OTP';

const Stack = createNativeStackNavigator<RootStackParamList>();

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{animation: 'slide_from_right', headerShown: false}}>
      <Stack.Screen component={Splash} name="Splash" />
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={OTP} name="OTP" />
    </Stack.Navigator>
  );
}

export default function Router() {
  return <StackNavigator />;
}
