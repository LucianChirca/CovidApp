import React, { useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Block, Text, Button } from 'galio-framework';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';

import * as actions from '../actions';

export default function HistoryScreen(props) {
  // REDUX
  const state = useSelector((st) => st);
  // const dispatch = useDispatch();

  return (
    <Block style={styles.container}>
      {state.user.scanned && (
      <Block>
        <Image source={require('../assets/images/qr-icon.png')} style={{ width: 200, height: 200 }} />
        <LottieView
          source={require('../assets/animations/scanning.json')}
          autoPlay
          loop
          style={{ width: 200, height: 200, position: 'absolute' }}
        />
      </Block>
      )}
    </Block>
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
