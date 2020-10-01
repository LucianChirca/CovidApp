import React from 'react';
import {
  StyleSheet, Image, Text, TouchableOpacity,
} from 'react-native';
import { Block, Button, Icon } from 'galio-framework';
import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';

import * as actions from '../actions';
import theme from '../constants/Theme';
import StepByStepList from '../custom_components/StepByStepList';

import {
  CameraModal,
  ContentModal,
  LoadingAnimation,
  ButtonWithIcon,
} from '../custom_components';

export default function HomeScreenScan(props) {
  // REDUX
  const state = useSelector((st) => st.scanner);
  const dispatch = useDispatch();

  const animating = state.scanning || state.showCheckinAnimation;

  return (
    <Block style={styles.container}>
      {
        // Camera Modal
      }
      <CameraModal />

      {
        // Content Modal
      }
      <ContentModal />

      {
        // Main block
      }
      <Block flex>
        {
        // Animations

        animating && (
        <Block flex center middle>
          {(state.scanning) && (
          <LoadingAnimation />
          )}
          {(state.showCheckinAnimation) && (
          <LottieView
            source={require('../assets/animations/done.json')}
            autoPlay
            loop={false}
            onAnimationFinish={() => dispatch({ type: actions.HIDE_CHECKIN_ANIMATION })}
            style={{ width: 200, height: 200, position: 'absolute' }}
          />
          )}
        </Block>
        )
      }
        {
          // Content
        }
        {!animating && (
        <Block flex>
          <Block flex middle>
            <Image style={{ width: 300, height: 300 }} source={require('../assets/images/holding-phone-qr.png')} />
            {
              // Holds the buttons
            }
            <Block
              flex
              style={{ marginTop: theme.SIZES.BASE }}
              middle
            >
              <ButtonWithIcon
                text="Show GGD key"
                iconName="key"
                onPress={() => dispatch(actions.setContentModalVisible(true, <StepByStepList />))}
              />
            </Block>
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
              Press the button below to read a qr code with your camera!
            </Text>
            <Button
              color={theme.COLORS.PRIMARY}
              onPress={() => dispatch(actions.setCameraModalVisible(true))}
              style={{
                width: '100%',
                alignSelf: 'center',
                borderRadius: theme.SIZES.BASE / 2,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,
              }}
            >
              Scan QR code
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
