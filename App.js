import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from './reducers';
import Screens from './components/Screens';

const store = createStore(rootReducer);

// Disable yellow warnings in expo app
console.disableYellowBox = true;

export default function App() {
  return (

    <Provider store={store}>
      <StatusBar hidden />
      <NavigationContainer>
        <Screens />

      </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
