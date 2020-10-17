import React from 'react';
import { Block } from 'galio-framework';
import {
  Image,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import theme from '../constants/Theme';

export default function CountryFlag() {
  /* Translations */
  const { i18n } = useTranslation();

  /* Flags */
  const flags = [
    {
      name: 'en',
      src: require('../assets/images/flags/en.png'),
    },
    {
      name: 'nl',
      src: require('../assets/images/flags/nl.png'),
    },
  ];

  /* Functions */

  const changeLanguage = () => {
    const currentLanguage = i18n.language;
    const nextLanguage = currentLanguage === 'nl' ? 'en' : 'nl';
    i18n.changeLanguage(nextLanguage);
  };

  return (
    <Block style={{ alignSelf: 'flex-end' }}>
      {flags.map((flag) => (i18n.language === flag.name
        && (
        <TouchableOpacity
          key={flag.name}
          onPress={changeLanguage}
          style={{ padding: 2 }}
        >
          <Image
            source={flag.src}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
        )))}
    </Block>
  );
}
