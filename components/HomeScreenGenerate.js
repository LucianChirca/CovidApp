import React, { useEffect } from 'react';
import {
  StyleSheet, Image, Text, TouchableOpacity,
} from 'react-native';
import { Block, Button, Icon } from 'galio-framework';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import QRCode from 'react-native-qrcode-svg';
import { useTranslation } from 'react-i18next';

import * as actions from '../actions';
import theme from '../constants/Theme';

export default function HomeScreenGenerate(props) {
  /* Translations */
  const { t } = useTranslation();
  // REDUX
  const mainState = useSelector((st) => st.main);
  const state = useSelector((st) => st.generator);
  const dispatch = useDispatch();

  return (
    <Block style={styles.container}>
      <Block flex>
        {state.generated && (
        <Block flex>
          <TouchableOpacity
            style={{
              width: 40, height: 40, alignSelf: 'flex-start', alignItems: 'center', top: 10,
            }}
            onPress={() => dispatch(actions.resetQr())}
          >
            <Icon
              name="chevron-left"
              family="entypo"
              size={40}
              color={theme.COLORS.PRIMARY}
            />
          </TouchableOpacity>
          <Block flex={1} middle>
            <Text style={{
              fontFamily: 'Futura',
              color: theme.COLORS.DARK_TEXT_COLOR,
              marginVertical: 10,
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
            }}
            >
              {t('Scan QR code')}
            </Text>
            <Text style={{
              fontFamily: 'Futura',
              color: theme.COLORS.LIGHT_TEXT_COLOR,
              marginBottom: 10,
              textAlign: 'center',
              fontSize: 15,
            }}
            >
              {t('Scan the QR code below to check in!')}
            </Text>
          </Block>
          <Block center flex={2}>
            <QRCode
              size={200}
              value="sup"
            />
          </Block>
        </Block>
        )}
        {!state.generated && (
        <Block flex>
          <Block flex middle>
            <Image style={{ width: 300, height: 300 }} source={require('../assets/images/holding-phone-qr.png')} />
          </Block>
          <Block>
            <Text style={{
              fontFamily: 'Futura',
              color: theme.COLORS.LIGHT_TEXT_COLOR,
              marginVertical: 10,
              textAlign: 'center',
              fontSize: 16,
            }}
            >
              {t('Press the button below to generate a QR code!')}
            </Text>
            <Button
              color={theme.COLORS.PRIMARY}
              onPress={() => dispatch(actions.generateQr())}
              shadowless
              style={{ width: '100%', alignSelf: 'center', borderRadius: 12 }}
            >
              {t('Generate QR code')}
            </Button>
          </Block>
        </Block>
        )}
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.SIZES.BASE,
    backgroundColor: 'white',
  },
});
