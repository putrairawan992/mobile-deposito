import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './navigation';
import {navigationRef} from './navigation/RootNavigation';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Router />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}
