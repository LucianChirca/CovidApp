import React from 'react';
import { Block, Button } from 'galio-framework';
import {
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../actions';

import theme from '../constants/Theme';

import MyText from './MyText';

function SymptomsForm() {
  const formState = useSelector((state) => state.form);
  const dispatch = useDispatch();

  // Prettify the JSON code:
  const prettyFormState = JSON.stringify(formState, null, 2);
  /* Functions */

  const submit = () => {
    dispatch(actions.setContentModalVisible(false, null));
    dispatch({ type: actions.SHOW_CHECKIN_ANIMATION });
  };

  const button = (text, value, onChange, last) => {
    const selected = value === text;
    return (
      <TouchableOpacity
        onPress={() => { onChange(text); }}
        style={{ flex: 1, marginRight: last ? 0 : theme.SIZES.BASE }}
      >
        <Block
          style={{
            borderColor: selected ? theme.COLORS.DARK_TEXT_COLOR : theme.COLORS.LIGHT_TEXT_COLOR,
            backgroundColor: selected ? theme.COLORS.BACKGROUND_COLOR : '#fff',
            borderWidth: 1,
            padding: 10,
            borderRadius: theme.SIZES.BASE / 2,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1,
          }}
        >
          <MyText>{text}</MyText>
        </Block>
      </TouchableOpacity>
    );
  };

  const yesno = (name) => (
    <Block row>
      <Field
        name={name}
        component={({ input: { onChange, value, ...input }, ...rest }) => button('No', value, onChange)}
      />
      <Field
        name={name}
        component={({ input: { onChange, value, ...input }, ...rest }) => button('Yes', value, onChange, true)}
      />
    </Block>
  );

  const forms = [
    {
      title: 'Have you lately been in contact with anyone sick with Covid-19?',
      content: yesno('douhavecovid'),
    },
    {
      title: 'Are you lying?',
      content: yesno('areyoulying'),
    },
    {
      title: 'Are you sure?',
      content: yesno('areyousure'),
    },
  ];

  return (
    <ScrollView>
      <Block style={styles.container}>
        <Block style={{ width: '100%', alignItems: 'center' }}>
          <Image source={require('../assets/images/covidIllustration.png')} style={{ width: 250, height: 250 }} />
        </Block>
        {
      forms.map((element) => (
        <Block style={{ marginBottom: theme.SIZES.BASE * 2 }}>
          <MyText bold style={{ marginBottom: theme.SIZES.BASE / 2 }}>{element.title}</MyText>
          {element.content}
        </Block>
      ))
    }
        <Button
          color={theme.COLORS.PRIMARY}
          onPress={submit}
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
          Submit
        </Button>
      </Block>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: theme.SIZES.BASE,
    backgroundColor: 'white',
  },
});

export default reduxForm({ form: 'symptoms-form' })(SymptomsForm);
