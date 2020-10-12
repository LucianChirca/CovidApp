import React, { useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Block, Text, Button } from 'galio-framework';
import { useSelector, useDispatch } from 'react-redux';
import { BarCodeScanner } from 'expo-barcode-scanner';
import LottieView from 'lottie-react-native';

import * as actions from '../actions';

export default function ScanScreen(props) {
  // REDUX
  const state = useSelector((st) => st);
  const dispatch = useDispatch();

  // On mount
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      // todo
    })();
  }, []);

  /* Functions */
  const handleBarCodeScanner = ({ type, data }) => {
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    dispatch(actions.updateScan(true));
  };

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
      {!state.user.scanned && (
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanner}
        style={StyleSheet.absoluteFillObject}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      />
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
