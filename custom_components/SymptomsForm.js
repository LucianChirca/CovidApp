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
import { useTranslation } from 'react-i18next';

import * as actions from '../actions';

import theme from '../constants/Theme';

import MyText from './MyText';

function SymptomsForm() {
  /* Translations */
  const { t } = useTranslation();

  const formState = useSelector((state) => state.form);
  const dispatch = useDispatch();

  // Prettify the JSON code:
  const prettyFormState = JSON.stringify(formState, null, 2);
  /* Functions */

  const submit = () => {
    dispatch(actions.setContentModalVisible(false, null));
    dispatch(actions.updateCheckinAnimation(true));
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
        component={({ input: { onChange, value, ...input }, ...rest }) => button(t('No'), value, onChange)}
      />
      <Field
        name={name}
        component={({ input: { onChange, value, ...input }, ...rest }) => button(t('Yes'), value, onChange, true)}
      />
    </Block>
  );

  const forms = [
    {
      title: t('Have you been in contact with anyone sick with Covid-19 in the last 14 days?'),
      content: yesno('douhavecovid'),
    },
    {
      title: t('Do you have any Covid-19 symptoms? (fever, coughing, etc.)'),
      content: yesno('douhavecovidsymptoms'),
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <Block style={styles.container}>
        <Block style={{ width: '100%', alignItems: 'center' }}>
          <Image source={require('../assets/images/covidIllustration.png')} style={{ width: 250, height: 250 }} />
        </Block>
        {
      forms.map((element) => (
        <Block style={{ marginBottom: theme.SIZES.BASE * 2 }} key={element.title}>
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
