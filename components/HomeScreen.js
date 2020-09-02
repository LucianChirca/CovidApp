import React, { useEffect } from 'react';
import {
  StyleSheet, Image, Text, ScrollView,
} from 'react-native';
import { Block, Button } from 'galio-framework';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';

import * as actions from '../actions';
import theme from '../constants/Theme';
import CameraModal from './CameraModal';
import LoadingAnimation from './LoadingAnimation';

export default function HomeScreen(props) {
  // Dummy data
  const tips = [
    {
      name: 'Wash hands',
      color: '#F9CBB5',
    },
    {
      name: 'Don\'t eat corona',
      color: '#D4D7FE',
    },
    {
      name: 'Don\'t eat corona',
      color: '#FEEED6',
    },
    {
      name: 'Don\'t eat corona',
      color: '#FBE4E6',
    },
  ];

  // REDUX
  const state = useSelector((st) => st);
  const dispatch = useDispatch();

  if (state.scanner.scanned && !state.scanner.successful) {
    setTimeout(() => {
      dispatch(actions.scan(true));
    }, 2000);
  }

  if (state.scanner.scanned && state.scanner.successful) {
    setTimeout(() => {
      dispatch({ type: actions.RESET_SCANNER });
    }, 2000);
  }

  return (
    <Block style={styles.container}>
      <CameraModal />
      <Block flex>
        <Block flex center middle>
          {(state.scanner.scanned && !state.scanner.successful) && (
            <LoadingAnimation />
          )}
          {(state.scanner.scanned && state.scanner.successful) && (
          <LottieView
            source={require('../assets/animations/done.json')}
            autoPlay
            loop={false}
            style={{ width: 200, height: 200, position: 'absolute' }}
          />
          )}
          {!state.scanner.scanned && (
            <Block>
              <Text style={{
                fontWeight: 'bold',
                fontSize: 20,
                fontFamily: 'Futura',
                color: theme.COLORS.DARK_TEXT_COLOR,
                marginBottom: 10,
                alignSelf: 'center',
              }}
              >
                Welcome to Covid App!
              </Text>
              <Image style={{ width: 300, height: 300 }} source={require('../assets/images/holding-phone-qr.png')} />
            </Block>
          )}
        </Block>
        {!state.scanner.scanned && (
        <Block>
          <Text style={{
            fontFamily: 'Futura',
            color: theme.COLORS.LIGHT_TEXT_COLOR,
            marginVertical: 10,
            textAlign: 'center',
            fontSize: 16,
          }}
          >
            Press the button below to read a qr code with your camera!
          </Text>
          <Button
            color={theme.COLORS.PRIMARY}
            onPress={() => dispatch(actions.setModalVisible(true))}
            shadowless
            style={{ width: '100%', alignSelf: 'center', borderRadius: 12 }}
          >
            Scan QR code
          </Button>
        </Block>
        )}
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: theme.SIZES.BASE,
  },
});
