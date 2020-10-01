import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import { Block, Icon } from 'galio-framework';

import theme from '../constants/Theme';

export default function ButtonWithIcon(props) {
  const { text, iconName, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Block
        row
        style={{
          borderColor: theme.COLORS.LIGHT_TEXT_COLOR,
          borderWidth: 1,
          padding: 10,
          borderRadius: theme.SIZES.BASE,
          alignItems: 'center',
        }}
      >
        <Icon
          name={iconName}
          family="entypo"
          size={20}
          color={theme.COLORS.LIGHT_TEXT_COLOR}
          style={{ marginRight: 8 }}
        />

        <Text style={{
          fontFamily: 'Futura',
          color: theme.COLORS.LIGHT_TEXT_COLOR,
          textAlign: 'center',
          fontSize: 16,
        }}
        >
          {text}
        </Text>
      </Block>
    </TouchableOpacity>
  );
}
