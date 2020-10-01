import React from 'react';
import LottieView from 'lottie-react-native';
import { Block } from 'galio-framework';
import {
  Image,
  Text,
} from 'react-native';

import theme from '../constants/Theme';

export default function LoadingAnimation() {
  return (
    <Block>
      <Image source={require('../assets/images/qr-icon.png')} style={{ width: 200, height: 200 }} />
      <LottieView
        source={require('../assets/animations/scanning.json')}
        autoPlay
        loop
        style={{ width: 200, height: 200, position: 'absolute' }}
      />
      <Text
        style={{
          color: theme.COLORS.LIGHT_TEXT_COLOR,
          fontSize: 18,
          alignSelf: 'center',
        }}
      >
        Scanning Code ...
      </Text>
    </Block>
  );
}
