import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navigations/RootNavigation';
import Router from './navigations';

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Router />
    </NavigationContainer>
  );
}
