/**
 * @Author: Lucian Chirca <Zombarian>
 * @Date:   2020-09-01T11:47:21+03:00
 * @Last modified by:   Zombarian
 * @Last modified time: 2020-10-22T15:49:03+03:00
 */

import React, { useEffect } from 'react';
import { StyleSheet, Imag, Vibration } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { createStore } from 'redux';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import { Block, Text } from 'galio-framework';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-community/async-storage';

import rootReducer from './reducers';
import HomeScreenScan from './components/HomeScreenScan';
import HomeScreenGenerate from './components/HomeScreenGenerate';
import { Onboarding } from './custom_components';
import * as actions from './actions';
import i18n from './components/i18n';
import { backendIp } from './constants/constants';
import StepByStepList from './custom_components/StepByStepList';

const jwtDecode = require('jwt-decode');

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
  const mainState = useSelector((st) => st.main);
  const userState = useSelector((st) => st.user);
  const dispatch = useDispatch();

  /* On mount */
  useEffect(() => {
    // Check if a user exists, if not create one
    handleUserAsync();

    const subscription = Notifications.addNotificationReceivedListener(handleNotification);
    const notifInteractionSubscription = Notifications.addNotificationResponseReceivedListener(
      handleNotificationInteraction,
    );
    return () => {
      subscription.remove();
      notifInteractionSubscription.remove();
    };
  }, []);

  /* Functions */

  const handleNotificationInteraction = (response) => {
    dispatch(actions.setContentModalVisible(true, <StepByStepList />));
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (e) {
      return null;
    }
  };

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
    // saving error
    }
  };

  const handleUserAsync = async () => {
    const storedUser = await getData('user');
    const expoToken = await registerForPushNotificationsAsync();

    if (storedUser === null) {
      // Fetch a new user token
      fetchNewUserToken(expoToken);
    } else {
      const userAsObject = JSON.parse(storedUser);
      dispatch(actions.updateAuthState(
        userAsObject.token,
        userAsObject.userId,
      ));
    }
  };

  const handleOnboardingAsync = async () => {
    const storedOnboarding = await getData('onboarding');
    if (storedOnboarding) {
      // TEMP
      // dispatch(actions.updateOnboarding(false));
    }
  };

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true,
          },
        });
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get permissions!');
      }
      const expoToken = await Notifications.getExpoPushTokenAsync();
      console.log(expoToken);
      return expoToken ? expoToken.data : null;
    }
    alert('Must use physical device!');
    return null;
  };

  const handleNotification = async () => {
    dispatch(actions.setContentModalVisible(true, <StepByStepList />));
    setTimeout(() => {
      alert('You have been marked as at risk! Infrom the GGD please!');
    }, 100);
  };

  const fetchNewUserToken = (expoToken) => {
    const requestBody = {
      type: 'customer',
      notification_token: expoToken,
    };

    axios({
      method: 'post',
      url: `${backendIp}users`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: requestBody,
    }).then((response) => {
      const responseData = response.data;
      console.log(responseData);
      const { token } = responseData;
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const newUser = {
        token,
        userId,
      };

      storeData('user', JSON.stringify(newUser));
      dispatch(actions.updateAuthState(token, userId));

      // console.log(token);
    }).catch((err) => {
      alert(err);
    });
  };

  const handleStartupAsync = async () => Promise.all([
    ...cacheImages(assetsToLoad),
    /* If onboarding has been closed before,
       don't show it anymore */
    handleOnboardingAsync(),
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

  const handleFinishOnboarding = async () => {
    dispatch(actions.updateOnboarding(false));
    storeData('onboarding', 'completed');
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
      {!mainState.finishedLoading && (
      <AppLoading
        startAsync={handleStartupAsync}
        onError={handleLoadingError}
        onFinish={handleFinishLoading}
      />
      )}

      {
        // If done loading, but have to show onboarding, show Onboarding
        mainState.finishedLoading && mainState.showOnboarding && (
        <Onboarding
          data={onboardingData}
          onClose={handleFinishOnboarding}
          finishLabel={t('FINISH')}
        />
        )
}

      {
        // Otherwise show the main app
        mainState.finishedLoading && !mainState.showOnboarding && (<HomeScreenScan />)
}
    </NavigationContainer>

  );
}
