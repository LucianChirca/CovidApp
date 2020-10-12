import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { Block, Icon } from 'galio-framework';
import { useTranslation } from 'react-i18next';

import theme from '../constants/Theme';
import MyText from './MyText';

export default function ButtonWithIcon() {
  /* Translation */

  const { t } = useTranslation();
  /* Helper functions */
  const codeContainer = (code) => (
    <Block
      center
      middle
      style={{
        height: theme.SIZES.CODE_CONTAINER_HEIGHT,
        width: theme.SIZES.CODE_CONTAINER_WIDTH,
        borderRadius: theme.SIZES.CODE_CONTAINER_BORDER_RADIUS,
        backgroundColor: theme.COLORS.BACKGROUND_COLOR,
      }}
    >
      <MyText size={25}>{code}</MyText>
    </Block>
  );

  const foreword = t('In case you have been tested positive for Covid-19, please follow the steps below.');
  const steps = [

    {
      title: t('Give the code below to a GGD employee'),
      content: codeContainer('696 - 969'),
    },
    {
      title: t('Wait until the code is being entered and verified'),
    },
  ];

  return (
    <ScrollView>
      <Block style={styles.container}>
        <Block style={{ width: '100%', alignItems: 'center' }}>
          <Image source={require('../assets/images/GGD.png')} style={{ width: 250, height: 250 }} />
        </Block>
        <MyText
          light
          style={{
            textAlign: 'center',
            marginBottom: theme.SIZES.BASE * 2,
            marginHorizontal: theme.SIZES.BASE,
          }}
        >
          {foreword}
        </MyText>

        {
        steps.map((element, index) => (
          <Block style={{ marginBottom: theme.SIZES.BASE }} key={element.title}>
            {
            // Title thing
          }
            <Block row>
              <Block
                style={{
                  height: theme.SIZES.STEP_BUBBLE_SIZE,
                  width: theme.SIZES.STEP_BUBBLE_SIZE,
                  borderRadius: theme.SIZES.STEP_BUBBLE_SIZE / 2,
                  marginHorizontal: theme.SIZES.BASE / 2,
                  backgroundColor: theme.COLORS.PRIMARY,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MyText style={{ color: theme.COLORS.WHITE }}>{index + 1}</MyText>
              </Block>
              <MyText
                style={{ marginRight: theme.SIZES.BASE + theme.SIZES.STEP_BUBBLE_SIZE }}
              >
                {element.title}
              </MyText>
            </Block>
            {
            // Content
          }
            <Block center style={{ marginTop: theme.SIZES.BASE }}>
              {element.content}
            </Block>
          </Block>
        ))
      }
      </Block>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
