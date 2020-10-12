import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { createStore } from 'redux';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import { Block, Text } from 'galio-framework';
import { useTranslation } from 'react-i18next';

import rootReducer from './reducers';
import HomeScreenScan from './components/HomeScreenScan';
import HomeScreenGenerate from './components/HomeScreenGenerate';
import { Onboarding } from './custom_components';
import * as actions from './actions';
import i18n from './components/i18n';

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
  /* Translations */
  const { t } = useTranslation();
  /* REDUX */
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

  const onboardingData = [
    {
      title: t('We value your privacy.'),
      image: require('./assets/images/privacy.png'),
      description: t('Our application does not store any personal information, therefore your data is guaranteed to be safe!'),
    },
    {
      title: t('It\'s simple!'),
      image: require('./assets/images/holding_phone.png'),
      description: t('Scan a QR code to check in at a place!'),
    },
    {
      title: t('Get notified!'),
      image: require('./assets/images/GGD.png'),
      description: t('If you have been in contact with an active case of Covid-19, you will be notified!'),
    },
  ];

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

      {
        // If done loading, but have to show onboarding, show Onboarding
        state.finishedLoading && state.showOnboarding && (
        <Onboarding
          data={onboardingData}
          onFinish={() => dispatch(actions.updateOnboarding(false))}
          finishLabel={t('FINISH')}
        />
        )
}

      {
        // Otherwise show the main app
        state.finishedLoading && !state.showOnboarding && (<HomeScreenScan />)
}
    </NavigationContainer>

  );
}
