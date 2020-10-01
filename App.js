import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { createStore } from 'redux';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import { Block, Text } from 'galio-framework';

import rootReducer from './reducers';
import HomeScreenScan from './components/HomeScreenScan';
import HomeScreenGenerate from './components/HomeScreenGenerate';
import * as actions from './actions';

const store = createStore(rootReducer);

// Disable yellow warnings in expo app
console.disableYellowBox = true;

const assetsToLoad = [
  require('./assets/images/qr-icon.png'),
  require('./assets/images/holding-phone-qr.png'),
  require('./assets/images/qr-frame.png'),
  require('./assets/images/covidIllustration.png'),
  require('./assets/images/GGD.png'),
];

function cacheImages(images) {
  return images.map((image) => Asset.loadAsync(image));
}

export default function MyApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export function App() {
  // REDUX
  const state = useSelector((st) => st.main);
  const dispatch = useDispatch();

  /* Functions */

  const loadResourcesAsync = async () => Promise.all([
    ...cacheImages(assetsToLoad),
  ]);
  const handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  const handleFinishLoading = async () => {
    // TODO
    dispatch({ type: actions.FINISH_LOADING });
  };

  return (
    <NavigationContainer>
      <StatusBar hidden />
      {!state.finishedLoading && (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={handleFinishLoading}
      />
      )}
      {state.finishedLoading && (
        <HomeScreenScan />

      )}
    </NavigationContainer>

  );
}
