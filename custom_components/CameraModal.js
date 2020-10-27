/**
 * @Author: Lucian Chirca <Zombarian>
 * @Date:   2020-09-02T15:02:06+03:00
 * @Last modified by:   Zombarian
 * @Last modified time: 2020-10-22T15:51:11+03:00
 */

import React, { useEffect } from 'react';
import {
  StyleSheet, Image, Modal, TouchableOpacity,
} from 'react-native';
import {
  Block, Text, Button, Icon,
} from 'galio-framework';
import { useSelector, useDispatch } from 'react-redux';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

import * as actions from '../actions';
import theme from '../constants/Theme';
import { backendIp } from '../constants/constants';

import SymptomsForm from './SymptomsForm';

export default function CameraModal() {
  // REDUX
  const state = useSelector((st) => st.scanner);
  const userState = useSelector((st) => st.user);
  const dispatch = useDispatch();

  // On mount
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      // todo
    })();
  }, []);

  /* Functions */

  const checkIn = (code) => {
    const requestBody = {
      code,
    };
    axios({
      method: 'post',
      url: `${backendIp}users/checkin`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userState.token}`,
      },
      data: requestBody,
    }).then((response) => {
      console.log(response.data);
      dispatch(actions.setContentModalVisible(true, <SymptomsForm />, false));
      dispatch(actions.updateScan(false));
    }).catch((err) => {
      dispatch(actions.updateScan(false));
      console.log(err.response.data);
      alert(err);
    });
  };

  const handleBarCodeScanner = ({ type, data }) => {
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    dispatch(actions.updateScan(true));
    dispatch(actions.setCameraModalVisible(false));
    checkIn(data);
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
