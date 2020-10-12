import React, { useEffect } from 'react';
import {
  StyleSheet, Image, Modal, TouchableOpacity,
} from 'react-native';
import {
  Block, Text, Button, Icon,
} from 'galio-framework';
import { useSelector, useDispatch } from 'react-redux';
import { BarCodeScanner } from 'expo-barcode-scanner';

import * as actions from '../actions';
import theme from '../constants/Theme';

import SymptomsForm from './SymptomsForm';

export default function CameraModal() {
  // REDUX
  const state = useSelector((st) => st.scanner);
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
    dispatch(actions.setCameraModalVisible(false));
    // TEMP
    setTimeout(() => {
      dispatch(actions.setContentModalVisible(true, <SymptomsForm />));
      dispatch(actions.updateScan(false));
    }, 2000);
  };

  return (
    <Modal
      visible={state.cameraModalVisible}
      animationType="fade"
    >

      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanner}
        style={[StyleSheet.absoluteFillObject]}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      >
        {
        // QR code frame
      }
        <Block flex style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/images/qr-frame.png')} style={{ width: 250, height: 250 }} />
        </Block>

        {
        // Toggles off modal
      }
        <TouchableOpacity
          style={{
            margin: theme.SIZES.BASE,
            position: 'absolute',
            right: 0,
          }}
          onPress={() => dispatch(actions.setCameraModalVisible(false))}
        >
          <Icon name="close" family="font-awesome" color="white" size={50} />
        </TouchableOpacity>
      </BarCodeScanner>

    </Modal>
  );
}
