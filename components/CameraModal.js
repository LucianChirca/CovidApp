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
    dispatch(actions.scan(false));
    dispatch(actions.setModalVisible(false));
  };

  return (
    <Modal
      visible={state.main.modalVisible}
      animationType="fade"
    >
      {
      // Toggles off modal
    }

      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanner}
        style={StyleSheet.absoluteFillObject}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      />
      <TouchableOpacity
        style={{
          margin: theme.SIZES.BASE,
          alignItems: 'flex-end',
        }}
        onPress={() => dispatch(actions.setModalVisible(false))}
      >
        <Icon name="close" family="font-awesome" color="white" size={50} />
      </TouchableOpacity>

    </Modal>
  );
}

const styles = StyleSheet.create({

});
