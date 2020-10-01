import React from 'react';
import { Text } from 'galio-framework';
import theme from '../constants/Theme';

export default function MyText(props) {
  const { light } = props;
  return (
    <Text
      {...props}
      style={[{
        color: light ? theme.COLORS.LIGHT_TEXT_COLOR
          : theme.COLORS.DARK_TEXT_COLOR,
      },
      props.style,
      {
        fontFamily: 'Futura',
      }]}
    >
      {props.children}
    </Text>
  );
}
