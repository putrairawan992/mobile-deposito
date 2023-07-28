import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from './interface';
import Splash from '../screens/Splash';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();


function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{animation: 'slide_from_right', headerShown: false}}>
      <Stack.Screen component={Splash} name="Splash" />
    </Stack.Navigator>
  );
}

const Router = () => {
  return (
    <>
      <StackNavigator />
    </>
  );
};

export default Router;
